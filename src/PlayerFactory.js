/* eslint-disable no-undef */
import logger from './Logger';

// #if process.env.SELECTED_PLAYER === 'VIDEO_JS'
logger.info("Conditional import of videojs as environment variable process.env.SELECTED_PLAYER value is: " + process.env.SELECTED_PLAYER);
import VideoJs from './players/videojs/VideoJs';
// #endif

// #if process.env.SELECTED_PLAYER === 'FLUID_PLAYER' || process.env.SELECTED_PLAYER === undefined || process.env.SELECTED_PLAYER === ''
logger.info("Conditional import of fluid player as environment variable process.env.SELECTED_PLAYER value is: " + process.env.SELECTED_PLAYER);
import FluidPlayer from './players/fluid-player/FluidPlayer';
// #endif

// #if process.env.SELECTED_PLAYER === 'JWPLAYER'
logger.info("Conditional import of jwplayer as environment variable process.env.SELECTED_PLAYER value is: " + process.env.SELECTED_PLAYER);
import JWPlayer from './players/jwplayer/JWPlayer';
// #endif


// Factory pattern.
// Returns the actual player object.
export default class PlayerFactory{
    constructor(){
        logger.log("process.env.SELECTED_PLAYER: " + process.env.SELECTED_PLAYER);
        logger.log("process.env.NODE_ENV: " + process.env.NODE_ENV);
        switch(process.env.SELECTED_PLAYER){
        case 'FLUID_PLAYER':
            logger.log("FLUID_PLAYER selected.");
            return new FluidPlayer();
        case 'VIDEO_JS':
            logger.log("VIDEO_JS selected.");
            return new VideoJs();
        case 'JWPLAYER':
            logger.log("JWPLAYER selected.");
            return new JWPlayer();
        default:
            logger.log("Default player selected.");
            return new FluidPlayer();
        }
    }
}
