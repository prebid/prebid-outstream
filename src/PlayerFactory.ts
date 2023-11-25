import logger from './Logger';
import { GenericPlayer } from './players/GenericPlayer';

export type PlayerType = ArrayElement<typeof allPlayerTypes>;

export const allPlayerTypes = ['FLUID_PLAYER', 'VIDEO_JS'] as const;
export const getSelectedPlayer = () =>
    allPlayerTypes.find(t => t === process.env.SELECTED_PLAYER) || 'FLUID_PLAYER';

// #if process.env.SELECTED_PLAYER === 'VIDEO_JS'
logger.info(
    `Conditional import of videojs as environment variable process.env.SELECTED_PLAYER value is: ${process.env.SELECTED_PLAYER}`
);
import VideoJs from './players/videojs/VideoJs';
// #endif

// #if process.env.SELECTED_PLAYER === 'FLUID_PLAYER' || process.env.SELECTED_PLAYER === undefined || process.env.SELECTED_PLAYER === ''
logger.info(
    `Conditional import of fluid player as environment variable process.env.SELECTED_PLAYER value is: ${process.env.SELECTED_PLAYER}`
);
import FluidPlayer from './players/fluid-player/FluidPlayer';
// #endif

export const getPlayer = (): GenericPlayer => {
    const selectedPlayer = getSelectedPlayer();

    logger.log(`process.env.SELECTED_PLAYER: ${process.env.SELECTED_PLAYER}`);
    logger.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);

    // This switch at runtime is necessary to be able to run tests without webpack
    switch (selectedPlayer) {
        case 'FLUID_PLAYER':
            logger.log('FLUID_PLAYER selected.');
            return new FluidPlayer();
        case 'VIDEO_JS':
            logger.log('VIDEO_JS selected.');
            return new VideoJs();
    }
};
