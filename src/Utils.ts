import logger from './Logger';

declare const document: Document & {
    mozCancelFullScreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
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
    logger.debug('Inside Utils.getOffset for element: ' + JSON.stringify(element));
    const scrollLeft = window.pageXOffset ?? document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset ?? document.documentElement.scrollTop;
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
    };
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

    // TODO: Fix this assertion. style.height is actually a string.
    const height = (element.style.height as any) as number;

    const bottom = top + height;

    return (
        (top >= viewport_top && top < viewport_bottom) ||
        (bottom > viewport_top && bottom <= viewport_bottom) ||
        (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom)
    );
};

export const closeFullscreen = () => {
    logger.debug('Inside Utils.closeFullscreen method.');

    const executeBrowserSpecificClose = (): Promise<void> => {
        if (document.exitFullscreen) {
            logger.log('Calling document.exitFullscreen.');
            return document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            /* Firefox */
            logger.log('Calling document.mozCancelFullScreen.');
            return document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            /* Chrome, Safari and Opera */
            logger.log('Calling document.webkitExitFullscreen.');
            return document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            /* IE/Edge */
            logger.log('Calling document.msExitFullscreen.');
            return document.msExitFullscreen();
        }

        return Promise.reject();
    };

    executeBrowserSpecificClose()
        .then(() => logger.debug('Document exited from full screen mode.'))
        .catch(err =>
            logger.debug(
                'Not able to exit from full screen mode. Received error: ' + JSON.stringify(err)
            )
        );
};
