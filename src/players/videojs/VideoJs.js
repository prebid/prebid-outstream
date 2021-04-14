import videojs from 'video.js';

// Manually load in window.videojs
window.videojs = videojs;
// Use require to force vast plugin to load in after video.js
require('@prebid/videojs-vast/bin/videojs_5.vast.vpaid');
import 'video.js/dist/video-js.css';

import GenericPlayer from '../GenericPlayer';
import logger from '../../Logger';
import VideoJsConfig from './VideoJsConfig';

export default class VideoJs extends GenericPlayer{
    constructor(){
        super();
        logger.debug("Inside videojs player constructor.");
        logger.log("Player object: ", videojs);
        this.playerConfig = null;
        this.player = null;
        this.bid = null;
        this.elementId = null;
        this.element = null;
        this.isVideoPlaying = false;
    }

    generatePlayerConfig(bid, elementId, genericConfiguration){
        logger.debug("Inside generatePlayerConfig");
        this.bid = bid;

        // Check if valid elementId
        if(document.getElementById(elementId) === null){
            logger.error("No element present with element ID: " + elementId);
            throw new Error('Please provide a valid element ID.');
        }

        this.elementId = elementId;
        this.element = document.getElementById(this.elementId);

        this.genericConfiguration = genericConfiguration;
        logger.log("configuration: ", JSON.stringify( this.genericConfiguration));

        this.playerConfig = new VideoJsConfig(this.bid, this.elementId, this.genericConfiguration);
        logger.log("this.playerConfig: " + JSON.stringify(this.playerConfig));
    }

    setupPlayer(videoPlayerId){
        logger.debug("Inside setupPlayer with player ID: ", videoPlayerId);

        if(document.getElementById(videoPlayerId) ===  null){
            logger.error("No element is present with videoPlayerId: ", videoPlayerId);
            throw new Error('Please provide a valid video player ID.');
        }

        const video = document.getElementById(videoPlayerId);

        video.className += ' video-js vjs-big-play-centered';

        this.player = videojs(videoPlayerId, this.playerConfig);
        this.player.src("https://d2zihajmogu5jn.cloudfront.net/tiny.mp4");
        this.player.on('error', e => console.log('vjs error:', e, this.player.error()));
        this.player.on('vast.adError', e => console.log('vjs ad error:', e));
        this.player.on(["adFinished", "vast.contentStart"], () => {
            // don't play the video ever
            this.player.pause();
            this.player.dispose();
        });
    }

    play(){
        logger.debug("player play");
        this.player.play();
    }

    pause(){
        logger.debug("player pause");
        this.player.pause();
    }

    getIsVideoPlaying(){
        logger.debug("player getIsVideoPlaying. Returning the value: ", this.isVideoPlaying);
        return this.isVideoPlaying;
    }
}
