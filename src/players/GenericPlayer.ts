import { GenericConfiguration } from '../GenericConfiguration';
import { Bid } from '../types/bid';

export type GenericPlayer = {
    generatePlayerConfig: (
        bid: Bid,
        elementId: string,
        genericConfiguration: GenericConfiguration
    ) => void;
    setupPlayer: (videoPlayerId: string) => void;
    play: () => void;
    pause: () => void;
    getIsVideoPlaying: () => boolean;
};
