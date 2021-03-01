export type GenericConfiguration = {
    width: number;
    height: number;
    vastTimeout: number;
    maxAllowedVastTagRedirects: number;
    allowVpaid: boolean;
    autoPlay: boolean;
    preload: boolean;
    mute: boolean;
    adText: string;
};

const defaultConfiguration: GenericConfiguration = {
    width: 640,
    height: 480,
    vastTimeout: 5000,
    maxAllowedVastTagRedirects: 3,
    allowVpaid: false,
    autoPlay: true,
    preload: true,
    mute: true,
    adText: ''
};

export const genericConfigurationWithDefaults = (
    config: Partial<Record<keyof GenericConfiguration, unknown>>
): GenericConfiguration => {
    return {
        width:
            typeof config.width === 'number'
                ? Math.abs(Number(config.width))
                : defaultConfiguration.width,
        height:
            typeof config.height === 'number'
                ? Math.abs(Number(config.height))
                : defaultConfiguration.height,
        vastTimeout:
            typeof config.vastTimeout === 'number'
                ? Math.abs(Number(config.vastTimeout))
                : defaultConfiguration.vastTimeout,
        maxAllowedVastTagRedirects:
            typeof config.maxAllowedVastTagRedirects === 'number'
                ? Math.abs(Number(config.maxAllowedVastTagRedirects))
                : defaultConfiguration.maxAllowedVastTagRedirects,
        allowVpaid:
            typeof config.allowVpaid === 'boolean'
                ? config.allowVpaid
                : defaultConfiguration.allowVpaid,
        autoPlay:
            typeof config.autoPlay === 'boolean' ? config.autoPlay : defaultConfiguration.autoPlay,
        preload:
            typeof config.preload === 'boolean' ? config.preload : defaultConfiguration.preload,
        mute: typeof config.mute === 'boolean' ? config.mute : defaultConfiguration.mute,
        adText: typeof config.adText === 'string' ? config.adText : defaultConfiguration.adText
    };
};
