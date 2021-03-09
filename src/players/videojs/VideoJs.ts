import { GenericPlayer } from '../GenericPlayer';
import logger from '../../Logger';
import { GenericConfiguration } from '../../GenericConfiguration';
import { Bid } from '../../types/bid';

export default class VideoJs implements GenericPlayer {
    bid?: Bid;
    elementId?: string;
    genericConfiguration?: GenericConfiguration;

    constructor() {
        logger.debug('Inside videojs player constructor.');
    }

    generatePlayerConfig = (
        bid: Bid,
        elementId: string,
        genericConfiguration: GenericConfiguration
    ) => {
        logger.debug('Inside VideoJs.generatePlayerConfig method.');
        this.bid = bid;
        this.elementId = elementId;
        this.genericConfiguration = genericConfiguration;
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
