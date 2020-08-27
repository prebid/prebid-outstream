import FluidPlayer from '../../../src/players/fluid-player/FluidPlayer';
import GenericPlayer from '../../../src/players/GenericPlayer';
jest.mock('../../../src/players/GenericPlayer');
import fluidPlayer from 'fluid-player';
import FluidPlayerConfig from '../../../src/players/fluid-player/FluidPlayerConfig';
jest.mock('../../../src/players/fluid-player/FluidPlayerConfig');
jest.mock('../../../src/Logger');
jest.mock('../../../src/Utils');

describe('Test cases for players/fluid-player/FluidPlayer.js file', () => {
    const bid = {
        "id":"C4722BF1-599B-4CFC-A018-6CF7814DTEST",
        "impid":"2fcbd3083f4088",
        "price":1.26,
        "adm":"<VAST version=\"3.0\"> <Ad id=\"1\"> <Wrapper> <AdSystem>PubMatic</AdSystem> <VASTAdTagURI><![CDATA[https://staging.pubmatic.com:8443/video/vpaid/outstream.xml]]></VASTAdTagURI> <Error><![CDATA[https://aktrack.pubmatic.com/track?operId=7&p=158011&s=551324&a=1954502&wa=165&ts=1560335696&crId=0&impid=74973DA7-A6B8-448F-9A3F-14A465B6CED4&ecpm=1.200000&er=[ERRORCODE]]]></Error> <Error><![CDATA[https://image8.pubmatic.com/AdServer/ImgSync?&fp=1&mpc=10&p=158011&gdpr=0&gdpr_consent=1&pmc=-1&pu=https%3A%2F%2Fimage4.pubmatic.com%2FAdServer%2FSPug%3Fpmc%3D-1%26partnerID%3D158011%26partnerUID%3D%28null%29]]></Error> <Impression><![CDATA[https://aktrack.pubmatic.com/AdServer/AdDisplayTrackerServlet?operId=1&pubId=158011&siteId=551324&adId=1954502&adType=13&adServerId=165&kefact={PSPM}&kaxefact={PSPM}&kadNetFrequecy=0&kadwidth=0&kadheight=0&kadsizeid=0&kltstamp=1560335696&indirectAdId=1720711&adServerOptimizerId=1&ranreq=NORANDOMNUMBERSPECIFIED&kpbmtpfact={PSPM}&tldId=0&passback=25&ekefact={PSPM}&ekaxefact={PSPM}&ekpbmtpfact={PSPM}&svr=ADS55003U&crID=0&campaignId=0&isRTB=0&kuip=115.114.134.174&imprId=74973DA7-A6B8-448F-9A3F-14A465B6CED4&oid=74973DA7-A6B8-448F-9A3F-14A465B6CED4&cntryId=107&sec=1]]></Impression> <Impression><![CDATA[https://image8.pubmatic.com/AdServer/ImgSync?&fp=1&mpc=10&p=158011&gdpr=0&gdpr_consent=1&pmc=-1&pu=https%3A%2F%2Fimage4.pubmatic.com%2FAdServer%2FSPug%3Fpmc%3D-1%26partnerID%3D158011%26partnerUID%3D%28null%29]]></Impression> <Creatives> <Creative> <Linear> <TrackingEvents> <Tracking event=\"creativeView\"><![CDATA[https://aktrack.pubmatic.com/track?operId=7&p=158011&s=551324&a=1954502&wa=165&ts=1560335696&crId=0&impid=74973DA7-A6B8-448F-9A3F-14A465B6CED4&ecpm=1.200000&e=1]]></Tracking> <Tracking event=\"start\"><![CDATA[https://aktrack.pubmatic.com/track?operId=7&p=158011&s=551324&a=1954502&wa=165&ts=1560335696&crId=0&impid=74973DA7-A6B8-448F-9A3F-14A465B6CED4&ecpm=1.200000&e=2]]></Tracking> <Tracking event=\"midpoint\"><![CDATA[https://aktrack.pubmatic.com/track?operId=7&p=158011&s=551324&a=1954502&wa=165&ts=1560335696&crId=0&impid=74973DA7-A6B8-448F-9A3F-14A465B6CED4&ecpm=1.200000&e=3]]></Tracking> <Tracking event=\"firstQuartile\"><![CDATA[https://aktrack.pubmatic.com/track?operId=7&p=158011&s=551324&a=1954502&wa=165&ts=1560335696&crId=0&impid=74973DA7-A6B8-448F-9A3F-14A465B6CED4&ecpm=1.200000&e=4]]></Tracking> <Tracking event=\"thirdQuartile\"><![CDATA[https://aktrack.pubmatic.com/track?operId=7&p=158011&s=551324&a=1954502&wa=165&ts=1560335696&crId=0&impid=74973DA7-A6B8-448F-9A3F-14A465B6CED4&ecpm=1.200000&e=5]]></Tracking> <Tracking event=\"complete\"><![CDATA[https://aktrack.pubmatic.com/track?operId=7&p=158011&s=551324&a=1954502&wa=165&ts=1560335696&crId=0&impid=74973DA7-A6B8-448F-9A3F-14A465B6CED4&ecpm=1.200000&e=6]]></Tracking> </TrackingEvents> <VideoClicks> <ClickTracking><![CDATA[https://aktrack.pubmatic.com/track?operId=7&p=158011&s=551324&a=1954502&wa=165&ts=1560335696&crId=0&impid=74973DA7-A6B8-448F-9A3F-14A465B6CED4&ecpm=1.200000&e=99]]></ClickTracking> </VideoClicks> </Linear> </Creative> </Creatives> <Extensions> <Extension> <Meta><![CDATA[name=pm-pixel;ver=1.0]]></Meta> <Pixel purpose=\"1\" loc=\"0\"> <Code type=\"0\"><![CDATA[<script>(function (){try{var window = window ? window.parent : this.parent; /*Copyright (c) 2011-2016 Moat Inc. All Rights Reserved.*/ function initMoatTracking(b,c,g,p){var l=document.createElement(\"script\"),f={events:[],addEvent:function(a){d.sendEvent?(f.events&&(d.sendEvent(f.events),f.events=!1),d.sendEvent(a)):f.events.push(a)}},a=function(a){return function(){var d=-1,h;b&&b.getAdVolume&&(h=b.getAdVolume());\"number\"==typeof h&&!isNaN(h)&&0<=h&&(d=h);f.addEvent({type:a,adVolume:d});if(-1!==q.indexOf(a)&&b&&b.unsubscribe&&!n){n=!0;for(var c in e)if(e.hasOwnProperty&&e.hasOwnProperty(c))try{b.unsubscribe(e[c],c)}catch(g){}}}}, d={adData:{ids:g,vpaid:b,build:\"cc07a80-clean\"},dispatchEvent:f.addEvent};g=\"_moatApi\"+Math.floor(1E8*Math.random());var e={AdStarted:a(\"AdStarted\"),AdStopped:a(\"AdStopped\"),AdSkipped:a(\"AdSkipped\"),AdLoaded:a(\"AdLoaded\"),AdLinearChange:a(\"AdLinearChange\"),AdSizeChange:a(\"AdSizeChange\"),AdExpandedChange:a(\"AdExpandedChange\"),AdSkippableStateChange:a(\"AdSkippableStateChange\"),AdDurationChange:a(\"AdDurationChange\"),AdRemainingTimeChange:a(\"AdRemainingTimeChange\"),AdVolumeChange:a(\"AdVolumeChange\"), AdImpression:a(\"AdImpression\"),AdClickThru:a(\"AdClickThru\"),AdInteraction:a(\"AdInteraction\"),AdVideoStart:a(\"AdVideoStart\"),AdVideoFirstQuartile:a(\"AdVideoFirstQuartile\"),AdVideoMidpoint:a(\"AdVideoMidpoint\"),AdVideoThirdQuartile:a(\"AdVideoThirdQuartile\"),AdVideoComplete:a(\"AdVideoComplete\"),AdUserAcceptInvitation:a(\"AdUserAcceptInvitation\"),AdUserMinimize:a(\"AdUserMinimize\"),AdUserClose:a(\"AdUserClose\"),AdPaused:a(\"AdPaused\"),AdPlaying:a(\"AdPlaying\"),AdError:a(\"AdError\")},n=!1,q=[\"AdStopped\",\"AdSkipped\", \"AdVideoComplete\"];(function(){if(b&&b.subscribe)for(var a in e)e.hasOwnProperty&&e.hasOwnProperty(a)&&b.subscribe(e[a],a)})();var k,m;try{k=c.ownerDocument,m=k.defaultView||k.parentWindow}catch(r){k=document,m=window}m[g]=d;l.type=\"text/javascript\";c&&c.insertBefore(l,c.childNodes[0]||null);l.src=\"https://z.moatads.com/\"+p+\"/moatvideo.js#\"+g;return d}; let pmVPAIDRef = window.getVPAIDAd(); let playerRef = window.AdParamConfigReader.vpaid && window.AdParamConfigReader.vpaid._slot; let ids = {\"zMoatTagType\":\"video\", \"zMoatImp\":\"74973DA7-A6B8-448F-9A3F-14A465B6CED4\", \"level1\":\"158011\", \"level2\":\"551324\", \"level3\":\"1954502\", \"zMoatPP\":\"1.2\", \"slicer1\":\"\", \"level4\":\"1\", \"slicer2\":\"\", \"zMoatCntry\":\"107\", \"zMoatAdv\":\"1\", \"zMoatCamp\":\"0\", \"slicer3\":\"0\", \"zMoatDSP\":\"0\", \"zMoatBid\":\"\", \"zMoatUCR\":\"0\"}; let partnerCode=\"pubmaticvpaidjsint469815710312\"; var MoatApiReference = initMoatTracking(pmVPAIDRef, playerRef, ids, partnerCode); console.log(\"Pixel: \" + MoatApiReference);} catch(ex) {console.error(\"Error in pixel execution: \" + ex)} })();</script>]]></Code> </Pixel> </Extension> <Extension> <Meta><![CDATA[name=pm-forcepixel;ver=1.0]]></Meta> <Pixel loc=\"0\"> <Code type=\"1\"><![CDATA[https://ads.pubmatic.com/AdServer/js/showad.js#PIX&ptask=DSP&SPug=1&fp=1&mpc=10&u=47256CAB-25DF-4C1F-9B45-A2E16EBC6D5A&p=158011&s=551324&d=4&cp=0&sc=1&rs=0&os=0&gdpr=0&gdpr_consent=1]]></Code> </Pixel> </Extension> </Extensions> </Wrapper> </Ad> </VAST>",
        "adomain":[
            "news.americanexpress.com"
        ],
        "cid":"16939",
        "crid":"12345",
        "ext":{
            "dspid":6,
            "advid":5863
        }
    };
    const elementId = 'test';
    const videoPlayerId = 'testPlayer';
    const genericConfiguration = {
        width: 40,
        height: 80,
        vastTimeout: 4000,
        maxAllowedVastTagRedirects: 4,
        allowVpaid: true,
        autoPlay: false,
        preload: false,
        mute: true,
        adText: 'Hi Valid Object'
    };
    let fluidPlayerObj = new FluidPlayer();

    beforeEach(() => {
        document.body.innerHTML = '<div id="'+ elementId + '"><video id="' + videoPlayerId + '"></video>></div>';
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });


    describe('FluidPlayer constructor', () => {

        test('it should be a derived class of GenericPlayer', () => {
            let obj = new FluidPlayer();
            expect(obj).toBeInstanceOf(GenericPlayer);
        });

        test('it should assign default values', () => {
            let obj = new FluidPlayer();
            expect(obj.fluidPlayerConfig).toBeNull();
            expect(obj.player).toBeNull();
            expect(obj.bid).toBeNull();
            expect(obj.elementId).toBeNull();
            expect(obj.element).toBeNull();
            expect(obj.isVideoPlaying).toBe(false);
        });
    });


    describe('generatePlayerConfig method', () => {

        test('it should assign bid, elementId and genericConfiguration', () => {            
            let res = fluidPlayerObj.generatePlayerConfig(bid, elementId, genericConfiguration);
            expect(res).toBeUndefined();
            expect(fluidPlayerObj.bid).toEqual(bid);
            expect(fluidPlayerObj.elementId).toEqual(elementId);
            expect(fluidPlayerObj.genericConfiguration).toEqual(genericConfiguration);
        });

        test('it should create FluidPlayerConfig object', () => {            
            let res = fluidPlayerObj.generatePlayerConfig(bid, elementId, genericConfiguration);
            expect(res).toBeUndefined();
            expect(FluidPlayerConfig).toHaveBeenNthCalledWith(1, bid, elementId, genericConfiguration);
            expect(fluidPlayerObj.fluidPlayerConfig).toBeInstanceOf(FluidPlayerConfig);
        });

        test('it should throw error, if valid elementId is not provided', () => {
            expect(() => {
                let res = fluidPlayerObj.generatePlayerConfig(bid, 'wrongID', genericConfiguration);
            }).toThrowError('Please provide a valid element ID.');
        });
    });


    describe('setupPlayer method', () => {

        beforeAll(() => {        
            fluidPlayerObj.registerFluidPlayerCallbacks = jest.fn();
        });

        afterEach(() => {
            fluidPlayerObj.registerFluidPlayerCallbacks.mockReset();
        });

        test('it should throw error, if video player ID is not provided', () => {
            expect(() => {
                let res = fluidPlayerObj.setupPlayer();
            }).toThrowError('Please provide a valid video player ID.');
        });


        test('it should make element visible', () => {  
            let res = fluidPlayerObj.setupPlayer(videoPlayerId);
            expect(res).toBeUndefined();
            expect(document.getElementById(videoPlayerId).style.display).toBe('block');
        });

        test('it should call fluidPlayer', () => {
            let res = fluidPlayerObj.setupPlayer(videoPlayerId);
            expect(res).toBeUndefined();
            expect(fluidPlayer).toHaveBeenNthCalledWith(1, videoPlayerId, fluidPlayerObj.fluidPlayerConfig);
        });

        test('it should call registerFluidPlayerCallbacks', () => {
            let res = fluidPlayerObj.setupPlayer(videoPlayerId);
            expect(res).toBeUndefined();
            expect(fluidPlayerObj.registerFluidPlayerCallbacks).toHaveBeenCalledTimes(1);
        });
    });


    describe('play method', () => {

        test('it should call player.play method', () => {
            let res = fluidPlayerObj.play();
            expect(res).toBeUndefined();
            expect(fluidPlayerObj.player.play).toHaveBeenCalledTimes(1);
        });
    });


    describe('pause method', () => {

        test('it should call player.play method', () => {
            let res = fluidPlayerObj.pause();
            expect(res).toBeUndefined();
            expect(fluidPlayerObj.player.pause).toHaveBeenCalledTimes(1);
        });
    });

    describe('registerFluidPlayerCallbacks method', () => {

        test('it should return undefined', () => {
            let fluidPlayer = new FluidPlayer();
            fluidPlayer.player = {
                on: function(){

                }
            };

            let res = fluidPlayer.registerFluidPlayerCallbacks();
            expect(res).toBeUndefined();
        });
    });


    describe('getIsVideoPlaying method', () => {

        test('it should return value of isVideoPlaying - true', () => {
            fluidPlayerObj.isVideoPlaying = true;

            let res = fluidPlayerObj.getIsVideoPlaying();
            expect(res).toBe(true);
        });

        test('it should return value of isVideoPlaying - false', () => {
            fluidPlayerObj.isVideoPlaying = false;

            let res = fluidPlayerObj.getIsVideoPlaying();
            expect(res).toBe(false);
        });
    });
});