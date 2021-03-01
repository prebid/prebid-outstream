import { GenericPlayer } from '../GenericPlayer';
import logger from '../../Logger';
import { prebidjs } from '../../types/prebidjs';
import { GenericConfiguration } from '../../GenericConfiguration';

export default class VideoJs implements GenericPlayer {
    constructor() {
        logger.debug('Inside videojs player constructor.');
    }

    generatePlayerConfig = (
        _bid: prebidjs.IBid,
        _elementId: string,
        _genericConfiguration: GenericConfiguration
    ) => {
        logger.debug('Inside VideoJs.generatePlayerConfig method.');
    };

    setupPlayer(videoPlayerId) {
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
