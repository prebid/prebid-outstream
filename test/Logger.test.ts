import logger from '../src/Logger';

describe('Test cases for Logger.js file', () => {

    describe('constructor', () => {

        test('it should set constants', () => {
            expect(logger.QUERY_PARAM_FOR_DEBUG_LEVEL).toEqual('playerDebugLevel');
            expect(logger.LOG_PREFIX).toEqual('PLAYER-');
            expect(logger.DEFAULT_LOG_LEVEL).toEqual(0);
            expect(logger.INFO_LEVEL).toEqual(1);
            expect(logger.ERROR_LEVEL).toEqual(2);
            expect(logger.WARN_LEVEL).toEqual(3);
            expect(logger.DEBUG_LEVEL).toEqual(4);
            expect(logger.LOG_LEVEL).toEqual(5);
        });
    });


    describe('log method', () => {

        test('it should call console.log', () => {
            console.log = jest.fn();

            let result = logger.log('Test message.');
            expect(result).toBeUndefined();
            expect(console.log).toHaveBeenCalledTimes(1);
            expect(console.log).toHaveBeenNthCalledWith(1, 'PLAYER-LOG: Test message.');

            console.log.mockReset();
        });
    });


    describe('debug method', () => {

        test('it should call console.debug', () => {
            console.debug = jest.fn();

            let result = logger.debug('Test message.');
            expect(result).toBeUndefined();
            expect(console.debug).toHaveBeenCalledTimes(1);
            expect(console.debug).toHaveBeenNthCalledWith(1, 'PLAYER-DEBUG: Test message.');

            console.debug.mockReset();
        });
    });


    describe('warn method', () => {

        test('it should call console.warn', () => {
            console.warn = jest.fn();

            let result = logger.warn('Test message.');
            expect(result).toBeUndefined();
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenNthCalledWith(1, 'PLAYER-WARN: Test message.');

            console.warn.mockReset();
        });
    });


    describe('error method', () => {

        test('it should call console.error', () => {
            console.error = jest.fn();

            let result = logger.error('Test message.');
            expect(result).toBeUndefined();
            expect(console.error).toHaveBeenCalledTimes(1);
            expect(console.error).toHaveBeenNthCalledWith(1, 'PLAYER-ERROR: Test message.');

            console.error.mockReset();
        });
    });


    describe('info method', () => {

        test('it should call console.info', () => {
            console.info = jest.fn();

            let result = logger.info('Test message.');
            expect(result).toBeUndefined();
            expect(console.info).toHaveBeenCalledTimes(1);
            expect(console.info).toHaveBeenNthCalledWith(1, 'PLAYER-INFO: Test message.');

            console.info.mockReset();
        });
    });

    describe('consoleLog method', () => {

        test('it should call console.info', () => {
            console.info = jest.fn();

            let result = logger.consoleLog('info', 'INFO', 'Test message.');
            expect(result).toBeUndefined();
            expect(console.info).toHaveBeenCalledTimes(1);
            expect(console.info).toHaveBeenNthCalledWith(1, 'PLAYER-INFO: Test message.');

            console.info.mockReset();
        });
    });
});