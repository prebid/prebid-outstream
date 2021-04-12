export default class GenericConfiguration {
    constructor(config){
        config = config || {};

        // Number type - positive integer
        this.width = ( typeof config.width === 'number' ) ?
            Math.abs(parseInt(config.width, 10)) :
            640;
        this.height = ( typeof config.height === 'number' ) ?
            Math.abs(parseInt(config.height, 10)) :
            480;
        this.vastTimeout = ( typeof config.vastTimeout === 'number' ) ?
            Math.abs(parseInt(config.vastTimeout, 10)) :
            5000;
        this.maxAllowedVastTagRedirects = ( typeof config.maxAllowedVastTagRedirects === 'number' ) ?
            Math.abs(parseInt(config.maxAllowedVastTagRedirects, 10)) :
            3;

        // Boolean type
        this.allowVpaid = ( typeof config.allowVpaid === 'boolean' ) ?
            config.allowVpaid :
            false;
        this.autoPlay = ( typeof config.autoPlay === 'boolean' ) ?
            config.autoPlay :
            true;
        this.preload = ( typeof config.preload === 'boolean' ) ?
            config.preload :
            true;
        this.mute = ( typeof config.mute === 'boolean' ) ?
            config.mute :
            true;

        // String type
        this.adText =  ( typeof config.adText === 'string' ) ?
            config.adText :
            '';

        // Object type
        this.playerOverrides = ( typeof config.playerOverrides === 'object') ?
            config.playerOverrides :
            {};
    }
}
