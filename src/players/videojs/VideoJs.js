import GenericPlayer from '../GenericPlayer';
import logger from '../../Logger';


export default class VideoJs extends GenericPlayer{
    constructor(){
        super();
        logger.debug("Inside videojs player constructor.");
    }

    generatePlayerConfig(bid, elementId, genericConfiguration){
        logger.debug("Inside VideoJs.generatePlayerConfig method.");
        this.bid = bid;
        this.elementId = elementId;
        this.genericConfiguration = genericConfiguration;
    }

    setupPlayer(videoPlayerId){
        logger.debug("Inside VideoJs.generatePlayerConfig method with player ID: " + videoPlayerId);
    }

    play(){
        logger.debug("Inside VideoJs.play");
    }

    pause(){
        logger.debug("Inside VideoJs.pause");
    }

    getIsVideoPlaying(){
        logger.debug("Inside VideoJs.getIsVideoPlaying");
    }
}
