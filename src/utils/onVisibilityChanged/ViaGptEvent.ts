import { OnVisibilityChanged } from '.';
import logger from '../../Logger';

declare const window: Window & {
    googletag?: googletag.Googletag;
};

/**
 * onVisibilityChange implementation using google publisher tag's api.
 */
export const onVisibilityChangedViaGpt: OnVisibilityChanged = (elementId, listener) => {
    if (!window.googletag) {
        logger.error(`window.googletag is not defined. Either provide the googletag or choose another
            viewability implementation using the VIEWABILITY_IMPLEMENTATION env variable.`);
        return;
    }

    window.googletag.pubads().addEventListener('slotVisibilityChanged', event => {
        if (event.slot.getSlotElementId() === elementId) {
            listener(event.inViewPercentage > 0);
        }
    });
};
