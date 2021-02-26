import logger from '../Logger';

// Treat it like an interface.
// Provide implementation of the below methods in each player's derived class.
export default class GenericPlayer{
    generatePlayerConfig (bid, elementId, genericConfiguration){
        logger.debug("Create player config from generic configuration." + JSON.stringify(bid) + elementId + JSON.stringify(genericConfiguration));
        throw new Error('Please provide concrete implementation for generatePlayerConfig method.');
    }

    setupPlayer(videoPlayerId){
        logger.debug("Inside GenericPlayer.setupPlayer with player ID: " + videoPlayerId);
        throw new Error('Please provide concrete implementation for setupPlayer method.');
    }

    play(){
        logger.debug("Inside GenericPlayer.play");
        throw new Error('Please provide concrete implementation for play method.');
    }

    pause(){
        logger.debug("Inside GenericPlayer.pause");
        throw new Error('Please provide concrete implementation for pause method.');
    }

    getIsVideoPlaying(){
        logger.debug("Inside GenericPlayer.getIsVideoPlaying");
        throw new Error('Please provide concrete implementation for getIsVideoPlaying method to return the boolean value representing whether the video is playing or not.');
    }
}