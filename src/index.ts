import OutstreamPlayer from './OutstreamPlayer';
import logger from './Logger';
import { Bid } from './types/bid';
import { GenericConfiguration } from './GenericConfiguration';

declare const window: {
    outstreamPlayer: (bid: Bid, elementId: string, config: GenericConfiguration) => OutstreamPlayer;
};

window.outstreamPlayer =
    window.outstreamPlayer ||
    ((bid, elementId, config) => {
        logger.log('Inside window.outstreamPlayer.');
        return new OutstreamPlayer(bid, elementId, config);
    });
