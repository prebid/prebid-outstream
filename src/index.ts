import OutstreamPlayer from './OutstreamPlayer';
import logger from './Logger';
import { prebidjs } from './types/prebidjs';

declare const window: {
    outstreamPlayer: (bid: prebidjs.IBid, elementId: string, config) => OutstreamPlayer;
};

window.outstreamPlayer =
    window.outstreamPlayer ||
    ((bid, elementId, config) => {
        logger.log('Inside window.outstreamPlayer.');
        return new OutstreamPlayer(bid, elementId, config);
    });
