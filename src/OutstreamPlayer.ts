import { GenericConfiguration, genericConfigurationWithDefaults } from './GenericConfiguration';
import { getPlayer as getConfiguredPlayer } from './PlayerFactory';
import logger from './Logger';
import { GenericPlayer } from './players/GenericPlayer';
import { Bid } from './types/bid';
import { isOnScreen } from './Utils';

const isBidObject = (bid: unknown): bid is Bid =>
    typeof bid === 'object' && bid !== null && !Array.isArray(bid) ? true : false;

const isElementId = (elementId: unknown): elementId is string =>
    typeof elementId === 'string' && !!elementId.length && !!document.getElementById(elementId);

const isGenericConfiguration = (config: unknown): config is GenericConfiguration =>
    typeof config === 'object' && config !== null;

export default class OutstreamPlayer {
    public bid: Bid;
    public elementId: string;
    public config: GenericConfiguration;
    public element: HTMLElement | null;
    public playerAvailable: boolean;
    public isVideoPausedDueToScroll: boolean;
    public player: GenericPlayer;
    public videoPlayerId?: string;

    constructor(bid: unknown, elementId: unknown, config?: unknown) {
        logger.debug(
            'Inside OutstreamPlayer constructor with parameters: ' +
                JSON.stringify(bid) +
                elementId +
                JSON.stringify(config)
        );

        // Check if bid object is available
        if (!isBidObject(bid)) {
            logger.error(`Bid object not provided or of wrong type: ${bid}`);
            throw new Error('Please provide bid object.');
        }

        // Check if element ID is available
        if (!isElementId(elementId)) {
            logger.error(`Valid element ID is not provided: ${elementId}`);
            throw new Error('Please provide a valid element ID.');
        }

        this.bid = bid;
        this.elementId = elementId;
        this.element = document.getElementById(elementId);

        // Create config object
        this.config = genericConfigurationWithDefaults(
            isGenericConfiguration(config) ? config : {}
        );
        logger.log(`Generic configuration: ${this.config}`);

        this.playerAvailable = false;
        this.isVideoPausedDueToScroll = false;
        this.player = getConfiguredPlayer();
        logger.log(`Player object: ${JSON.stringify(this.player)}`);
        const outerThis = this;

        if (this.bid.hasOwnProperty('vastUrl') && this.bid.vastUrl && !this.bid.hasOwnProperty('vastXml') && !this.bid.hasOwnProperty('ad')) {
            logger.warn('Bid lacking vastXml and ad properties but included vastUrl. Trying to fetch vastXml from vastUrl.', this.bid);
            this.fetchVastXml(this.bid.vastUrl, function () {
                outerThis.player.generatePlayerConfig(outerThis.bid, outerThis.elementId, outerThis.config);
                outerThis.insertPlayer();
            });
        } else {
            this.player.generatePlayerConfig(this.bid, this.elementId, this.config);
            this.insertPlayer();
        }
    }

    insertPlayer() {
        logger.debug('Inside OutstreamPlayer.insertPlayer method.');

        if (isOnScreen(this.elementId)) {
            logger.log('Element is visible on the screen on document load, so setup the player.');
            this.setupPlayer();
        }
        this.setupEventListener();
    }

    setupPlayer() {
        logger.debug('Inside OutstreamPlayer.setupPlayer method.');

        // Once set, do not unset it
        this.playerAvailable = true;

        if (this.element) {
            this.element.style.display = 'block';
        }

        this.insertVideoElement();

        if (this.videoPlayerId) {
            this.player.setupPlayer(this.videoPlayerId);
        }

        if (this.config.autoPlay) {
            logger.log('Calling the play function as autoplay is true.');
            this.player.play();
        }
    }

    setupEventListener() {
        logger.debug('Inside OutstreamPlayer.setupEventListener method.');

        window.addEventListener('scroll', () => {
            logger.log('Scroll event listener called!');
            // Player div is visible on the scren
            if (isOnScreen(this.elementId)) {
                /* Pass element id/class you want to check */
                logger.log('Element is visible on the player.');
                if (this.playerAvailable) {
                    logger.log('Player is visible.');
                    // Player is already visible
                    if (!this.player.getIsVideoPlaying() && this.isVideoPausedDueToScroll) {
                        logger.log('Player is visible again, so play the paused video.');
                        this.player.play();
                        // Unset the flag as video is now resumed
                        this.isVideoPausedDueToScroll = false;
                    }
                } else {
                    logger.log('Player is visible for the first time.');
                    this.setupPlayer();
                }
            } else {
                logger.log('Element is not visible on the screen.');
                // Check if video is playing
                if (this.playerAvailable && this.player.getIsVideoPlaying()) {
                    logger.log('Player is not visible on the screen, so pause the video.');
                    // Player was visible in the past, but now not visible, so pause it
                    this.player.pause();
                    // Set the flag that video is paused due to scrolling
                    this.isVideoPausedDueToScroll = true;
                }
            }
        });
    }

    insertVideoElement() {
        const divAdunit = this.element;
        // create ID for video element
        this.videoPlayerId = `videoPlayer-${this.elementId}`;

        if (divAdunit) {
            // create video element
            let videoElement =
                '<video id="' +
                this.videoPlayerId +
                '" ' +
                'controls style="width:' +
                this.config.width +
                'px;' +
                'height:' +
                this.config.height +
                'px;"';
            if (this.config.autoPlay) {
                videoElement += 'autoplay="true"';
            }
            if (this.config.mute) {
                videoElement += 'muted="muted"';
            }
            videoElement += '></video>';

            logger.log(`Generated video element string: ${videoElement}`);
            divAdunit.insertAdjacentHTML('beforeend', videoElement);
        } else {
            logger.error(`No element is present with provided element ID: ${this.elementId}`);
            throw new Error(`No element is present with provided element ID: ${this.elementId}`);
        }
    }

    fetchVastXml(vastUrl: string, callback: Function) {
        logger.debug('Inside OutstreamPlayer.fetchVastXml method.');
        let xhr = new XMLHttpRequest();
        xhr.open('GET', vastUrl, true);
        xhr.responseType = 'document';
        xhr.overrideMimeType('text/xml');
        xhr.onload = () => {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200 && xhr.responseXML) {
                    logger.log('OutstreamPlayer.fetchVastXml: Received XML response', xhr.responseXML.documentElement);
                    const serializer = new XMLSerializer();
                    this.bid.vastXml = serializer.serializeToString(xhr.responseXML.documentElement);
                    callback.apply(this, []);
                }
            }
        };

        xhr.onerror = (err) => {
            logger.error('OutstreamPlayer.fetchVastXml: fetching vastUrl error', err);
            callback.apply(this, []);
        };

        xhr.ontimeout = () => {
            logger.error('OutstreamPlayer.fetchVastXml: fetching vastUrl timed out');
            callback.apply(this, []);
        };

        xhr.send();
    }

}
