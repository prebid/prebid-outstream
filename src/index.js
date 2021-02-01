import OutstreamPlayer from './OutstreamPlayer';
import logger from './Logger';

// eslint-disable-next-line no-unused-vars
var player = window.outstreamPlayer || ( (bid, elementId, config) =>  {
    logger.log("Inside window.outstreamPlayer.");
    return new OutstreamPlayer(bid, elementId, config);
});

export { player };
