import { OnVisibilityChanged } from '.';
import logger from '../../Logger';

/**
 * onVisibilityChange implementation using a scroll event listener.
 *
 * Note that this should only be used if none of the other implementations suit your needs.
 */
export const onVisibilityChangedViaManualScrollCheck: OnVisibilityChanged = (
    elementId,
    listener
) => {
    const isVisibleAtStart = isOnScreen(elementId);
    if (isVisibleAtStart) {
        listener(true);
    }

    window.addEventListener('scroll', () => {
        logger.log('Scroll event listener called!');
        listener(isOnScreen(elementId));
    });
};

export const isOnScreen = (elementId: string): boolean => {
    logger.debug('Inside Utils.isOnScreen for element ID: ' + elementId);
    // if the element doesn't exist, abort
    const element = document.getElementById(elementId);
    if (!element) {
        logger.warn('No element present with element ID: ' + elementId);
        return false;
    }

    const viewport_top = getScrollTop();
    const viewport_height = screen.availHeight;
    const viewport_bottom = viewport_top + viewport_height;

    const top = getOffset(element).top;
    const height = element.clientHeight;
    const bottom = top + height;

    return (
        (top >= viewport_top && top < viewport_bottom) ||
        (bottom > viewport_top && bottom <= viewport_bottom) ||
        (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom)
    );
};

export const getScrollTop = (): number => {
    logger.debug('Inside Utils.getScrollTop method.');
    if (typeof pageYOffset !== 'undefined') {
        //most browsers except IE before #9
        return pageYOffset;
    } else {
        //IE 'quirks' / IE with doctype
        const rootNodeOrBody = document.documentElement.clientHeight
            ? document.documentElement
            : document.body;
        return rootNodeOrBody.scrollTop;
    }
};

export const getOffset = (element: HTMLElement): { top: number; left: number } => {
    logger.debug('Inside Utils.getOffset for element');
    const scrollLeft = window.pageXOffset ?? document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset ?? document.documentElement.scrollTop;
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
    };
};
