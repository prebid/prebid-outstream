import GenericPlayer from '../GenericPlayer';
import fluidPlayer from 'fluid-player';
import FluidPlayerConfig from './FluidPlayerConfig';
import '~/fluid-player/src/css/fluidplayer.css';
import logger from '../../Logger';
import utils from '../../Utils';
import './fluidPlayer.css';

export default class FluidPlayer extends GenericPlayer{
    constructor(){
        super();
        logger.debug("Inside fluid player constructor.");
        logger.log("Fluid player object: " + fluidPlayer);
        this.fluidPlayerConfig = null;
        this.player = null;
        this.bid = null;
        this.elementId = null;
        this.element = null;
        this.isVideoPlaying = false;
    }

    generatePlayerConfig(bid, elementId, genericConfiguration){
        logger.debug("Inside FluidPlayer.generatePlayerConfig");
        this.bid = bid;

        // Check if valid elementId
        if(document.getElementById(elementId) === null){
            logger.error("No element present with element ID: " + elementId);
            throw new Error('Please provide a valid element ID.');
        }
        this.elementId = elementId;
        this.element = document.getElementById(this.elementId);

        this.genericConfiguration = genericConfiguration;
        logger.log("FluidPlayer-generatePlayerConfig" + JSON.stringify( this.genericConfiguration));

        this.fluidPlayerConfig = new FluidPlayerConfig(this.bid, this.elementId, this.genericConfiguration);
        logger.log("this.fluidPlayerConfigObj" + JSON.stringify(this.fluidPlayerConfig));
    }

    setupPlayer(videoPlayerId){
        logger.debug("Insid FluidPlayer.setupPlayer with player ID: " + videoPlayerId);

        this.element.style.display = 'block';
        if(document.getElementById(videoPlayerId) ===  null){
            logger.error("No element is present with videoPlayeId: " + videoPlayerId);
            throw new Error('Please provide a valid video player ID.');
        }
        document.getElementById(videoPlayerId).style.display = 'block';

        this.player = fluidPlayer(
            videoPlayerId, 
            this.fluidPlayerConfig
        );
        this.registerFluidPlayerCallbacks();
    }

    play(){
        logger.debug("Inside FluidPlayer.play");
        this.player.play();
    }

    pause(){
        logger.debug("Inside FluidPlayer.pause");
        this.player.pause();
    }

    registerFluidPlayerCallbacks(){
        this.player.on('pause', () => {
            logger.log('Video is now paused.');
            this.isVideoPlaying = false;
        });
        this.player.on('playing', () => {
            logger.log('Video is now playing - playing.');
            this.isVideoPlaying = true;
        });
        this.player.on('ended', () => {
            logger.log('Video is now ended.');
            this.isVideoPlaying = false;
            if(this.player) {
                // Exit fullscreen mode
                logger.log('Exit full screen mode to continue using normal mode.');
                utils.closeFullscreen();
            }
        });
        this.player.on('play', () => {
            logger.log('Video is playing - play.');
        });
        this.player.on('seeked', () => {
            logger.log('Video is now seeked.');
        });
        this.player.on('theatreModeOn', () => {
            logger.log('Theatre mode is enabled.');
        });
        this.player.on('theatreModeOff', () => {
            logger.log('Theatre mode is disabled.');
        });
        this.player.on('timeupdate', (time) => {
            logger.log("Time updated with value: " + time);
        });
    }

    getIsVideoPlaying(){
        logger.debug("Inside FluidPlayer.getIsVideoPlaying. Returning the value: " + this.isVideoPlaying);
        return this.isVideoPlaying;
    }
}

