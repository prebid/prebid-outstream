import { GenericConfiguration, genericConfigurationWithDefaults } from './GenericConfiguration';
import { getPlayer as getConfiguredPlayer } from './PlayerFactory';
import utils from './Utils';
import logger from './Logger';
import { prebidjs } from './types/prebidjs';
import { GenericPlayer } from './players/GenericPlayer';

const isBidObject = (bid: unknown): bid is prebidjs.IBid =>
    bid && typeof bid === 'object' && !Array.isArray(bid);

const isElementId = (elementId: unknown): elementId is string =>
    typeof elementId === 'string' && !!elementId.length && !!document.getElementById(elementId);

export default class OutstreamPlayer {
    private bid: prebidjs.IBid;
    private elementId: string;
    private config: GenericConfiguration;
    private element: HTMLElement;
    private playerAvailable: boolean;
    private isVideoPausedDueToScroll: boolean;
    private player: GenericPlayer;
    private videoPlayerId?: string;

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
        this.config = genericConfigurationWithDefaults(typeof config === 'object' ? config : {});
        logger.log(`Generic configuration: ${this.config}`);

        this.playerAvailable = false;
        this.isVideoPausedDueToScroll = false;
        this.player = getConfiguredPlayer();
        logger.log(`Player object: ${JSON.stringify(this.player)}`);

        this.player.generatePlayerConfig(this.bid, this.elementId, this.config);
        this.insertPlayer();
    }

    insertPlayer() {
        logger.debug('Inside OutstreamPlayer.insertPlayer method.');

        if (utils.isOnScreen(this.elementId)) {
            logger.log('Element is visible on the screen on document load, so setup the player.');
            this.setupPlayer();
        }
        this.setupEventListener();
    }

    setupPlayer() {
        logger.debug('Inside OutstreamPlayer.setupPlayer method.');

        // Once set, do not unset it
        this.playerAvailable = true;
        this.element.style.display = 'block';
        this.insertVideoElement();
        this.player.setupPlayer(this.videoPlayerId);
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
            if (utils.isOnScreen(this.elementId)) {
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
}
