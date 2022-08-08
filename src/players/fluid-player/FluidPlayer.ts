import { GenericPlayer } from '../GenericPlayer';
import fluidPlayer, { FluidPlayerConfig, FluidPlayer as FluidPlayerLib } from 'fluid-player';
import { fluidPlayerConfig } from './FluidPlayerConfig';
import '~/fluid-player/src/css/fluidplayer.css';
import logger from '../../Logger';
import './fluidPlayer.css';
import { GenericConfiguration } from '../../GenericConfiguration';
import { Bid } from '../../types/bid';
import { closeFullscreen } from '../../Utils';

export default class FluidPlayer implements GenericPlayer {
    public fluidPlayerConfig?: FluidPlayerConfig;
    public player?: FluidPlayerLib;
    public element: HTMLElement | null;
    public isVideoPlaying = false;

    constructor() {
        logger.debug('Inside fluid player constructor.');
        logger.log(`Fluid player object: ${fluidPlayer}`);
    }

    generatePlayerConfig = (
        bid: Bid,
        elementId: string,
        genericConfiguration: GenericConfiguration
    ): void => {
        logger.debug('Inside FluidPlayer.generatePlayerConfig');

        // Check if valid elementId
        this.element = document.getElementById(elementId);
        if (!this.element) {
            logger.error(`No element present with element ID: ${elementId}`);
            throw new Error('Please provide a valid element ID.');
        }

        logger.log(`FluidPlayer-generatePlayerConfig ${JSON.stringify(genericConfiguration)}`);

        this.fluidPlayerConfig = fluidPlayerConfig(bid, elementId, genericConfiguration);
        logger.log(`this.fluidPlayerConfigObj ${JSON.stringify(this.fluidPlayerConfig)}`);
    };

    setupPlayer(videoPlayerId: string): void {
        logger.debug(`Insid FluidPlayer.setupPlayer with player ID: ${videoPlayerId}`);

        if (this.element) {
            this.element.style.display = 'block';
        }

        const videoPlayerElement = document.getElementById(videoPlayerId);
        if (videoPlayerElement === null) {
            logger.error(`No element is present with videoPlayeId: ${videoPlayerId}`);
            throw new Error('Please provide a valid video player ID.');
        }
        videoPlayerElement.style.display = 'block';

        if (this.fluidPlayerConfig) {
            this.player = fluidPlayer(videoPlayerId, this.fluidPlayerConfig);
        }

        this.registerFluidPlayerCallbacks();
    }

    play(): void {
        logger.debug('Inside FluidPlayer.play');
        this.player?.play();
    }

    pause(): void {
        logger.debug('Inside FluidPlayer.pause');
        this.player?.pause();
    }

    registerFluidPlayerCallbacks(): void {
        this.player?.on('pause', () => {
            logger.log('Video is now paused.');
            this.isVideoPlaying = false;
        });
        this.player?.on('playing', () => {
            logger.log('Video is now playing - playing.');
            this.isVideoPlaying = true;
        });
        this.player?.on('ended', () => {
            logger.log('Video is now ended.');
            this.isVideoPlaying = false;
            if (this.player) {
                // Exit fullscreen mode
                logger.log('Exit full screen mode to continue using normal mode.');
                closeFullscreen();
            }
        });
        this.player?.on('play', () => {
            logger.log('Video is playing - play.');
        });
        this.player?.on('seeked', () => {
            logger.log('Video is now seeked.');
        });
        this.player?.on('theatreModeOn', () => {
            logger.log('Theatre mode is enabled.');
        });
        this.player?.on('theatreModeOff', () => {
            logger.log('Theatre mode is disabled.');
        });
        this.player?.on('timeupdate', time => {
            logger.log('Time updated with value: ' + time);
        });
    }

    getIsVideoPlaying(): boolean {
        logger.debug(
            `Inside FluidPlayer.getIsVideoPlaying. Returning the value: ${this.isVideoPlaying}`
        );
        return this.isVideoPlaying;
    }
}
