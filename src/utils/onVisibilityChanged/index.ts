/**
 * All viewability implementations have this signature.
 */
export type OnVisibilityChanged = (
    elementId: string,
    listener: (isVisible: boolean) => void
) => void;

// #if process.env.VIEWABILITY_IMPLEMENTATION === 'MANUAL_SCROLL_CHECK' || process.env.VIEWABILITY_IMPLEMENTATION === undefined || process.env.VIEWABILITY_IMPLEMENTATION === ''
import { onVisibilityChangedViaManualScrollCheck } from './ViaManualScrollCheck';
// #endif

// #if process.env.VIEWABILITY_IMPLEMENTATION === 'INTERSECTION_OBSERVER'
import { onVisibilityChangedViaIntersectionObserver } from './ViaIntersectionObserver';
// #endif

// #if process.env.VIEWABILITY_IMPLEMENTATION === 'GPT_IMPRESSION_VIEWABLE_EVENT'
import { onVisibilityChangedViaGpt } from './ViaGptEvent';
// #endif

export const onVisibilityChanged: OnVisibilityChanged = (elementId, listener) => {
    // This switch at runtime is necessary to be able to run tests without webpack
    switch (process.env.VIEWABILITY_IMPLEMENTATION) {
        case 'INTERSECTION_OBSERVER':
            return onVisibilityChangedViaIntersectionObserver(elementId, listener);
        case 'GPT_EVENT':
            return onVisibilityChangedViaGpt(elementId, listener);
        case 'MANUAL_SCROLL_CHECK':
        default:
            return onVisibilityChangedViaManualScrollCheck(elementId, listener);
    }
};
