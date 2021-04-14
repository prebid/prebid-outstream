import GenericPlayer from '../GenericPlayer';
import JWPlayerConfig from './JWPlayerConfig';
import logger from '../../Logger';

export default class JWPlayer extends GenericPlayer{
    constructor(){
        super();
        logger.debug("Inside JW player constructor.");
        this.playerConfig = null;
        this.player = null;
        this.bid = null;
        this.elementId = null;
        this.element = null;
        this.isVideoPlaying = false;
    }

    generatePlayerConfig(bid, elementId, genericConfiguration){
        logger.debug("Inside JWPlayer.generatePlayerConfig");
        this.bid = bid;

        // Check if valid elementId
        if(document.getElementById(elementId) === null){
            logger.error("No element present with element ID: " + elementId);
            throw new Error('Please provide a valid element ID.');
        }

        this.elementId = elementId;
        this.element = document.getElementById(this.elementId);

        this.genericConfiguration = genericConfiguration;
        logger.log("JWPlayer configuration: ", JSON.stringify( this.genericConfiguration));

        this.playerConfig = new JWPlayerConfig(this.bid, this.elementId, this.genericConfiguration);
        logger.log("this.playerConfig: " + JSON.stringify(this.playerConfig));
    }

    setupPlayer(videoPlayerId){
        logger.debug("Inside setupPlayer with player ID: ", videoPlayerId);

        this.element.style.display = 'block';
        if(document.getElementById(videoPlayerId) ===  null){
            logger.error("No element is present with videoPlayerId: ", videoPlayerId);
            throw new Error('Please provide a valid video player ID.');
        }

        document.getElementById(videoPlayerId).style.display = 'block';

        // Embed script into DOM if it hasn't been run yet
        if (!window.jwplayer) {
            const script = document.createElement('script');
            script.async = true;
            script.src = "https://cdn.jwplayer.com/libraries/lqsWlr4Z.js";
            script.onload = () => {
                this.player = window.jwplayer(videoPlayerId).setup(this.playerConfig);
                this.registerCallbacks(videoPlayerId);
            }
            document.body.appendChild(script);
        } else if (window.jwplayer) {
            this.player = window.jwplayer(videoPlayerId).setup(this.playerConfig);
            this.registerCallbacks(videoPlayerId);
        }
    }

    play(){
        logger.debug("player play");
        if (this.player) {
            this.player.play();
        }
    }

    pause(){
        logger.debug("player pause");
        if (this.player) {
            this.player.pause();
        }
    }

    registerCallbacks(videoPlayerId) {
        // Stop content from playing
        const cleanup = () => {
            logger.log('Ad completed, cleaning up player...');
            this.isVideoPlaying = false;
            this.player.pause();
            this.player.remove();

            // Remove video elem
            const video = document.getElementById(videoPlayerId);
            if (video) {
                video.remove();
            }
        }

        this.player.on('adComplete', cleanup)
        this.player.on('play', cleanup)
    }

    getIsVideoPlaying(){
        logger.debug("Inside getIsVideoPlaying. Returning the value: ", this.isVideoPlaying);
        return this.isVideoPlaying;
    }
}

