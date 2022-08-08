import OutstreamPlayer from './OutstreamPlayer';
import logger from './Logger';
import { Bid } from './types/bid';
import { GenericConfiguration } from './GenericConfiguration';

export type OutStreamPlayerWindow = {
  outstreamPlayer?: (
    bid: Bid,
    elementId: string,
    config: GenericConfiguration
  ) => OutstreamPlayer;
};

declare const window: Window & OutStreamPlayerWindow;

var player = window.outstreamPlayer = window.outstreamPlayer ||
  ((bid, elementId, config) => {
    logger.log('Inside window.outstreamPlayer.');
    return new OutstreamPlayer(bid, elementId, config);
  });

export { player };