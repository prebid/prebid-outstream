import logger from '../../Logger';

export default class FluidPlayerConfig{
    constructor(bid, elementId, genericConfiguration){
        this.vastOptions = {
            skipButtonCaption:          'Skip ad in [seconds]',
            skipButtonClickCaption:     'Skip ad <span class="skip_button_icon"></span>',
            adText:                     genericConfiguration.adText,
            adTextPosition:             'top left',
            adCTAText:                  false,
            adCTATextPosition:          'bottom right',
            vastTimeout:                genericConfiguration.vastTimeout,
            showPlayButton:             true, // Default false
            maxAllowedVastTagRedirects: genericConfiguration.maxAllowedVastTagRedirects,
            allowVPAID:                 genericConfiguration.allowVpaid, // Default false.
            showProgressbarMarkers:     true, // Default false
            adClickable:                true, // Default true
            adList: [
                {
                    roll:               'preRoll',
                    vastTag:            ''
                }
            ],
            vastAdvanced: {
                vastLoadedCallback:       (() => {
                    logger.info("vastLoadedCallback - VAST loaded"); 
                }),
                noVastVideoCallback:      (() => {
                    logger.info("noVastVideoCallback - empty VAST");
                    if(document.getElementById(elementId) !== null){
                        logger.log("noVastVideoCallback - remove element from DOM.");
                        document.getElementById(elementId).style.display = 'none';
                    }
                }),
                vastVideoSkippedCallback: (() => {
                    logger.info("vastVideoSkippedCallback - Ad is skipped");
                    if(document.getElementById(elementId) !== null){
                        logger.log("vastVideoSkippedCallback - remove element from DOM.");
                        document.getElementById(elementId).style.display = 'none';
                    }
                }),
                vastVideoEndedCallback:   (() => {
                    logger.info("vastVideoEndedCallback - Ad ended");
                    if(document.getElementById(elementId) !== null){
                        logger.log("vastVideoEndedCallback - remove element from DOM.");
                        document.getElementById(elementId).style.display = 'none';
                    }
                })
            }
        };
        this.layoutControls = {
            playButtonShowing:      true,
            autoPlay:               false,
            preload:                genericConfiguration.preload,
            mute:                   genericConfiguration.mute,
            doubleclickFullscreen:  true,
            controlBar: {
                autoHide:           true, // Default false
                autoHideTimeout:    5, // Default 3
                animated:           true // Default true
            },
            captions: {
                play:               'Play',
                pause:              'Pause',
                mute:               'Mute',
                unmute:             'Unmute',
                fullscreen:         'Fullscreen',
                exitFullscreen:     'Exit Fullscreen'
            },
            controlForwardBackward: {
                show:               false // Default: false
            },
            playerInitCallback: (() => {
                logger.log('Fluid player loaded callback!');
            }),
            persistentSettings: {
                volume:             false, // Default true
                quality:            false, // Default true
                speed:              false, // Default true
                theatre:            false // Default true
            },
            allowTheatre:           true, // Default true
            theatreSettings: {
                width:              '100%', // Default '100%'
                height:             '60%', // Default '60%'
                marginTop:          10, // Default 0
                horizontalAlign:    'center' // 'left', 'right' or 'center'
            },
            playbackRateEnabled:    false, // Default false
            allowDownload:          false, // Default false
            layout:                 'default', // Default 'default'
            htmlOnPauseBlock: {
                html:               '<b>Paused</b>', // Default null
                height:             50, // Default null
                width:              100 // Default null
            },
            logo: {
                imageUrl:           null, // Default null
                position:           'top right', // Default 'top left'
                clickUrl:           null, // Default null
                opacity:            0.8, // Default 1
                mouseOverImageUrl:  null, // Default null
                imageMargin:        '10px', // Default '2px'
                hideWithControls:   true, // Default false
                showOverAds:        'false' // Default false
            },
            loop:                   false, // Default false
            title:                  '',
            keyboardControl:        true, // Default true
            subtitlesEnabled:       false, // Default false
            fillToContainer:        true, // Default true
            playPauseAnimation:     true, // Default true
            posterImage:            false, // Default false
            showCardBoardView:      false,
            showCardBoardJoystick:  false
        };

        let ad;
        if( !(bid.ad === undefined || bid.ad === null) ){
            logger.log("Bid object contains bid.ad with value: " + bid.ad);
            ad = bid.ad;
        }else if( !(bid.vastXml === undefined || bid.vastXml === null) ){
            logger.log("Bid object contains bid.vastXml with value: " + bid.vastXml);
            ad = bid.vastXml;
        }

        if (ad) {
            if (ad.search(/<VAST/ig) !== -1) {
                // No direct support for VAST tag, so creating a Data URI
                logger.log("VAST type creative: " + ad);
                logger.log("VAST type creativrr base 64: " + btoa(ad.replace(/\\"/g, "\"")));
                this.vastOptions.adList[0].vastTag ='data:text/xml;charset=utf-8;base64,' + btoa(ad.replace(/\\"/g, "\""));
            } else if (ad.startsWith('http')) {
                logger.log("Ad tag type creativrr: " + ad);
                this.vastOptions.adList[0].vastTag = ad;
            }
        }else{
            logger.error("Bid object doesn't contain bid.ad or bid.vastXml object, so no VAST tag or XML is available.");
        }
    }
}