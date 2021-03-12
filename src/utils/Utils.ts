import logger from '../Logger';

declare const document: Document & {
    mozCancelFullScreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
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
