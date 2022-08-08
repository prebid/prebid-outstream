const enum LogLevel {
    info = 1,
    error = 2,
    warn = 3,
    debug = 4,
    log = 5
}

const isValidLogLevel = (level: number): level is LogLevel =>
    [LogLevel.info, LogLevel.error, LogLevel.warn, LogLevel.debug, LogLevel.log].includes(level);

const QUERY_PARAM_FOR_DEBUG_LEVEL = 'playerDebugLevel';
const LOG_PREFIX = 'PLAYER-';
const DEFAULT_LOG_LEVEL = LogLevel.info;

const debugLevelFromQueryParam = (): LogLevel | undefined => {
    let queryParams = new URLSearchParams(window.location.search);
    let level = Number(queryParams.get(QUERY_PARAM_FOR_DEBUG_LEVEL));
    return isValidLogLevel(level) ? level : undefined;
};

class Logger {
    private logLevel: number;

    constructor() {
        this.logLevel = debugLevelFromQueryParam() || DEFAULT_LOG_LEVEL;
    }

    log = (msg: string, args?: any) => {
        if (this.logLevel >= LogLevel.log) {
            console.log(this.prefixMessage('LOG', msg), args);
        }
    };

    debug = (msg: string) => {
        if (this.logLevel >= LogLevel.debug) {
            console.debug(this.prefixMessage('DEBUG', msg));
        }
    };

    warn = (msg: string, args?: any) => {
        if (this.logLevel >= LogLevel.warn) {
            console.warn(this.prefixMessage('WARN', msg), args);
        }
    };

    error = (msg: string, args?: any) => {
        if (this.logLevel >= LogLevel.error) {
            console.error(this.prefixMessage('ERROR', msg));
        }
    };

    info = (msg: string) => {
        if (this.logLevel >= LogLevel.info) {
            console.info(this.prefixMessage('INFO', msg));
        }
    };

    private prefixMessage = (
        msgLevel: 'LOG' | 'DEBUG' | 'WARN' | 'ERROR' | 'INFO',
        msg: string
    ): string => `${LOG_PREFIX}${msgLevel}: ${msg}`;
}

const logger = new Logger();
Object.freeze(logger);
export default logger;
