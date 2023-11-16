import logger from '../src/Logger';

describe('Test cases for Logger.js file', () => {
    describe('log method', () => {
        test('it should call console.log', () => {
            const consoleLogMock = (console.log = jest.fn());

            let result = logger.log('Test message.');
            expect(result).toBeUndefined();
            expect(console.log).toHaveBeenCalledTimes(1);
            expect(console.log).toHaveBeenNthCalledWith(1, 'PLAYER-LOG: Test message.', undefined);

            consoleLogMock.mockReset();
        });
    });

    describe('debug method', () => {
        test('it should call console.debug', () => {
            const consoleDebugMock = (console.debug = jest.fn());

            let result = logger.debug('Test message.');
            expect(result).toBeUndefined();
            expect(console.debug).toHaveBeenCalledTimes(1);
            expect(console.debug).toHaveBeenNthCalledWith(1, 'PLAYER-DEBUG: Test message.');

            consoleDebugMock.mockReset();
        });
    });

    describe('warn method', () => {
        test('it should call console.warn', () => {
            const consoleWarnMock = (console.warn = jest.fn());

            let result = logger.warn('Test message.');
            expect(result).toBeUndefined();
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenNthCalledWith(1, 'PLAYER-WARN: Test message.', undefined);

            consoleWarnMock.mockReset();
        });
    });

    describe('error method', () => {
        test('it should call console.error', () => {
            const consoleErrorMock = (console.error = jest.fn());

            let result = logger.error('Test message.');
            expect(result).toBeUndefined();
            expect(console.error).toHaveBeenCalledTimes(1);
            expect(console.error).toHaveBeenNthCalledWith(1, 'PLAYER-ERROR: Test message.', undefined);

            consoleErrorMock.mockReset();
        });
    });

    describe('info method', () => {
        test('it should call console.info', () => {
            const consoleInfoMock = (console.info = jest.fn());

            let result = logger.info('Test message.');
            expect(result).toBeUndefined();
            expect(console.info).toHaveBeenCalledTimes(1);
            expect(console.info).toHaveBeenNthCalledWith(1, 'PLAYER-INFO: Test message.');

            consoleInfoMock.mockReset();
        });
    });
});
