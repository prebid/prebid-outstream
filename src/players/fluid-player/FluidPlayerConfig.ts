import { FluidPlayerConfig } from 'fluid-player';
import { GenericConfiguration } from '../../GenericConfiguration';
import logger from '../../Logger';
import { Bid } from '../../types/bid';

export const fluidPlayerConfig = (
    bid: Bid,
    elementId: string,
    genericConfiguration: GenericConfiguration
): FluidPlayerConfig => {
    const result: FluidPlayerConfig = {
        vastOptions: {
            skipButtonCaption: 'Skip ad in [seconds]',
            skipButtonClickCaption: 'Skip ad <span class="skip_button_icon"></span>',
            adText: genericConfiguration.adText,
            adTextPosition: 'top left',
            adCTAText: false,
            adCTATextPosition: 'bottom right',
            vastTimeout: genericConfiguration.vastTimeout,
            showPlayButton: true,
            maxAllowedVastTagRedirects: genericConfiguration.maxAllowedVastTagRedirects,
            allowVPAID: genericConfiguration.allowVpaid,
            showProgressbarMarkers: true,
            adClickable: true,
            adList: [
                {
                    roll: 'preRoll',
                    vastTag: ''
                }
            ],
            vastAdvanced: {
                vastLoadedCallback: () => {
                    logger.info('vastLoadedCallback - VAST loaded');
                },
                noVastVideoCallback: () => {
                    logger.info('noVastVideoCallback - empty VAST');
                    const element = document.getElementById(elementId);
                    if (element !== null) {
                        logger.log('noVastVideoCallback - remove element from DOM.');
                        element.style.display = 'none';
                    }
                },
                vastVideoSkippedCallback: () => {
                    logger.info('vastVideoSkippedCallback - Ad is skipped');
                    const element = document.getElementById(elementId);
                    if (element !== null) {
                        logger.log('vastVideoSkippedCallback - remove element from DOM.');
                        element.style.display = 'none';
                    }
                },
                vastVideoEndedCallback: () => {
                    logger.info('vastVideoEndedCallback - Ad ended');
                    const element = document.getElementById(elementId);
                    if (element !== null) {
                        logger.log('vastVideoEndedCallback - remove element from DOM.');
                        element.style.display = 'none';
                    }
                }
            }
        },
        layoutControls: {
            playButtonShowing: true,
            autoPlay: false,
            preload: genericConfiguration.preload,
            mute: genericConfiguration.mute,
            doubleclickFullscreen: true,
            controlBar: {
                autoHide: true,
                autoHideTimeout: 5,
                animated: true
            },
            captions: {
                play: 'Play',
                pause: 'Pause',
                mute: 'Mute',
                unmute: 'Unmute',
                fullscreen: 'Fullscreen',
                exitFullscreen: 'Exit Fullscreen'
            },
            controlForwardBackward: {
                show: false
            },
            playerInitCallback: () => {
                logger.log('Fluid player loaded callback!');
            },
            persistentSettings: {
                volume: false,
                quality: false,
                speed: false,
                theatre: false
            },
            allowTheatre: true,
            theatreSettings: {
                width: '100%',
                height: '60%',
                marginTop: 10,
                horizontalAlign: 'center' // 'left', 'right' or 'center'
            },
            playbackRateEnabled: false,
            allowDownload: false,
            layout: 'default',
            htmlOnPauseBlock: {
                html: '<b>Paused</b>',
                height: 50,
                width: 100
            },
            logo: {
                imageUrl: null,
                position: 'top right',
                clickUrl: null,
                opacity: 0.8,
                mouseOverImageUrl: null,
                imageMargin: '10px',
                hideWithControls: true,
                showOverAds: 'false'
            },
            loop: false,
            title: '',
            keyboardControl: true,
            subtitlesEnabled: false,
            fillToContainer: true,
            playPauseAnimation: true,
            posterImage: false,
            showCardBoardView: false,
            showCardBoardJoystick: false
        }
    };

    // Make this immutability one day
    let ad;
    if (!(bid.ad === undefined || bid.ad === null)) {
        logger.log('Bid object contains bid.ad with value: ' + bid.ad);
        ad = bid.ad;
    } else if (!(bid.vastXml === undefined || bid.vastXml === null)) {
        logger.log('Bid object contains bid.vastXml with value: ' + bid.vastXml);
        ad = bid.vastXml;
    }

    if (ad) {
        if (ad.search(/<VAST/gi) !== -1) {
            // No direct support for VAST tag, so creating a Data URI
            logger.log('VAST type creative: ' + ad);
            logger.log('VAST type creativrr base 64: ' + btoa(ad.replace(/\\"/g, '"')));
            result.vastOptions.adList[0].vastTag =
                'data:text/xml;charset=utf-8;base64,' + btoa(ad.replace(/\\"/g, '"'));
        } else if (ad.startsWith('http')) {
            logger.log('Ad tag type creativrr: ' + ad);
            result.vastOptions.adList[0].vastTag = ad;
        }
    } else {
        logger.error(
            "Bid object doesn't contain bid.ad or bid.vastXml object, so no VAST tag or XML is available."
        );
    }

    return result;
};
