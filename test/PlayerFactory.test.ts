import PlayerFactory  from '../src/PlayerFactory';
jest.mock('../src/Logger');
import VideoJs from '../src/players/videojs/VideoJs';
jest.mock('../src/players/videojs/VideoJs');
import FluidPlayer from '../src/players/fluid-player/FluidPlayer';
jest.mock('../src/players/fluid-player/FluidPlayer');

describe('Test cases for PlayerFactory.js file', () => {

    test('it should return Fluid Player object', () => {
        process.env.SELECTED_PLAYER = 'FLUID_PLAYER';

        let obj = new PlayerFactory();
        expect(obj).toBeInstanceOf(FluidPlayer);
    });

    test('it should return VideoJS object', () => {
        process.env.SELECTED_PLAYER = 'VIDEO_JS';

        let obj = new PlayerFactory();
        expect(obj).toBeInstanceOf(VideoJs);
    });

    test('it should return default player which is Fluid player, if process.env.SELECTED_PLAYER is empty', () => {
        process.env.SELECTED_PLAYER = '';

        let obj = new PlayerFactory();
        expect(obj).toBeInstanceOf(FluidPlayer);
    });

    test('it should return default player which is Fluid player, if process.env.SELECTED_PLAYER is undefined', () => {
        process.env.SELECTED_PLAYER = undefined;

        let obj = new PlayerFactory();
        expect(obj).toBeInstanceOf(FluidPlayer);
    });
});