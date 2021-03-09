import VideoJs from '../../../src/players/videojs/VideoJs';
jest.mock('../../../src/players/GenericPlayer');
import logger from '../../../src/Logger';
import { genericConfigurationWithDefaults } from '../../../src/GenericConfiguration';
jest.mock('../../../src/Logger');

describe('Test cases for players/videojs/VideoJs.js file', () => {
    let videoJs = new VideoJs();

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('generatePlayerConfig method', () => {
        test('it should assign bid, elementId and genericConfiguration', () => {
            let bid = {};
            let elementId = 'test';
            let genericConfiguration = genericConfigurationWithDefaults({});

            let res = videoJs.generatePlayerConfig(bid, elementId, genericConfiguration);
            expect(res).toBeUndefined();
            expect(videoJs.bid).toEqual(bid);
            expect(videoJs.elementId).toEqual(elementId);
            expect(videoJs.genericConfiguration).toEqual(genericConfiguration);
        });
    });

    describe('setupPlayer method', () => {
        test('it should call logger.debug with given message', () => {
            let videoPlayerId = 'testPlayer';

            let res = videoJs.setupPlayer(videoPlayerId);
            expect(res).toBeUndefined();
            expect(logger.debug).toHaveBeenCalledTimes(1);
            expect(logger.debug).toHaveBeenNthCalledWith(
                1,
                'Inside VideoJs.generatePlayerConfig method with player ID: testPlayer'
            );
        });
    });

    describe('play method', () => {
        test('it should call logger.debug with given message', () => {
            let res = videoJs.play();
            expect(res).toBeUndefined();
            expect(logger.debug).toHaveBeenCalledTimes(1);
            expect(logger.debug).toHaveBeenNthCalledWith(1, 'Inside VideoJs.play');
        });
    });

    describe('pause method', () => {
        test('it should call logger.debug with given message', () => {
            let res = videoJs.pause();
            expect(res).toBeUndefined();
            expect(logger.debug).toHaveBeenCalledTimes(1);
            expect(logger.debug).toHaveBeenNthCalledWith(1, 'Inside VideoJs.pause');
        });
    });

    describe('getIsVideoPlaying method', () => {
        test('it should call logger.debug with given message', () => {
            let res = videoJs.getIsVideoPlaying();
            expect(res).toBe(false);
            expect(logger.debug).toHaveBeenCalledTimes(1);
            expect(logger.debug).toHaveBeenNthCalledWith(1, 'Inside VideoJs.getIsVideoPlaying');
        });
    });
});
