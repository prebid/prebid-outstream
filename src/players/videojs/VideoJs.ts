import { GenericPlayer } from '../GenericPlayer';
import logger from '../../Logger';
import { GenericConfiguration } from '../../GenericConfiguration';
import { Bid } from '../../types/bid';

export default class VideoJs implements GenericPlayer {
    constructor() {
        logger.debug('Inside videojs player constructor.');
    }

    generatePlayerConfig = (
        _bid: Bid,
        _elementId: string,
        _genericConfiguration: GenericConfiguration
    ) => {
        logger.debug('Inside VideoJs.generatePlayerConfig method.');
    };

    setupPlayer(videoPlayerId: string) {
        logger.debug('Inside VideoJs.generatePlayerConfig method with player ID: ' + videoPlayerId);
    }

    play() {
        logger.debug('Inside VideoJs.play');
    }

    pause() {
        logger.debug('Inside VideoJs.pause');
    }

    getIsVideoPlaying() {
        logger.debug('Inside VideoJs.getIsVideoPlaying');
        return false;
    }
}
