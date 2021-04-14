import logger from '../../Logger';
import merge from 'lodash.merge'

export default class VideoJsConfig{
    constructor(bid, elementId, genericConfiguration){
        videojs.log.level('debug');
        this.controls = true;
        this.preload = 'none';
        this.height = genericConfiguration.height;
        this.width = genericConfiguration.width;
        this.muted = genericConfiguration.mute;
        this.plugins = {
            vastClient: {
                adsEnabled: true,
                playAdAlways: true,
                initialAudio: 'off',
            }
        };

        // Allow player config overrides
        merge(this, genericConfiguration.playerOverrides);

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
                this.plugins.vastClient.adTagXML = callback => callback(null, ad);
            } else if (ad.startsWith('http')) {
                logger.log("Ad tag type creativrr: " + ad);
                this.plugins.vastClient.adTagUrl = ad;
            }
        } else {
            logger.error("Bid object doesn't contain bid.ad or bid.vastXml object, so no VAST tag or XML is available.");
        }
    }
}