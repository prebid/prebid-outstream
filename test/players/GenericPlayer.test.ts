import GenericPlayer from '../../src/players/GenericPlayer';
jest.mock('../../src/Logger');

describe('Test cases for players/GenericPlayer.js file', () => {

    describe('generatePlayerConfig method', () => {

        test('it should throw error with given error message', () => {
            let genericPlayer = new GenericPlayer();
            expect(genericPlayer.generatePlayerConfig).toThrowError('Please provide concrete implementation for generatePlayerConfig method.');
        });
    });


    describe('setupPlayer method', () => {

        test('it should throw error with given error message', () => {
            let genericPlayer = new GenericPlayer();
            expect(genericPlayer.setupPlayer).toThrowError('Please provide concrete implementation for setupPlayer method.');
        });
    });


    describe('play method', () => {

        test('it should throw error with given error message', () => {
            let genericPlayer = new GenericPlayer();
            expect(genericPlayer.play).toThrowError('Please provide concrete implementation for play method.');
        });
    });


    describe('pause method', () => {

        test('it should throw error with given error message', () => {
            let genericPlayer = new GenericPlayer();
            expect(genericPlayer.pause).toThrowError('Please provide concrete implementation for pause method.');
        });
    });


    describe('getIsVideoPlaying method', () => {

        test('it should throw error with given error message', () => {
            let genericPlayer = new GenericPlayer();
            expect(genericPlayer.getIsVideoPlaying).toThrowError('Please provide concrete implementation for getIsVideoPlaying method to return the boolean value representing whether the video is playing or not.');
        });
    });
});