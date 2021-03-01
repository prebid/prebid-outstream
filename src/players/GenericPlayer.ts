import { GenericConfiguration } from '../GenericConfiguration';
import { prebidjs } from '../types/prebidjs';

export type GenericPlayer = {
    generatePlayerConfig: (
        bid: prebidjs.IBid,
        elementId: string,
        genericConfiguration: GenericConfiguration
    ) => void;
    setupPlayer: (videoPlayerId: string) => void;
    play: () => void;
    pause: () => void;
    getIsVideoPlaying: () => boolean;
};
