import logger from '../../Logger';
import merge from 'lodash.merge'

export default class JWPlayerConfig{
    constructor(bid, elementId, genericConfiguration){
        this.playlist = [{
            file: "https://d2zihajmogu5jn.cloudfront.net/tiny.mp4",
        }];
        this.aspectratio = '16:9';
        this.autostart = true;
        this.width = genericConfiguration.width;
        this.height = genericConfiguration.height;
        this.advertising = {
            endstate :'close',
            adscheduleid: 'sample01',
            autoplayadsmuted: true,
            client: 'vast',
            schedule: {
                'preroll': {
                    "offset": "pre"
                }
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
                logger.log("VAST type creativrr base 64: " + btoa(ad.replace(/\\"/g, "\"")));
                this.advertising.schedule.preroll.vastxml = ad;
            } else if (ad.startsWith('http')) {
                logger.log("Ad tag type creativrr: " + ad);
                this.advertising.schedule.preroll.tag = ad;
            }
        } else {
            logger.error("Bid object doesn't contain bid.ad or bid.vastXml object, so no VAST tag or XML is available.");
        }
    }
}