class Logger{
    constructor() {
        this.QUERY_PARAM_FOR_DEBUG_LEVEL = 'playerDebugLevel';
        this.LOG_PREFIX = "PLAYER-";
        this.DEFAULT_LOG_LEVEL = 0;

        //Logging Level
        this.INFO_LEVEL = 1;
        this.ERROR_LEVEL = 2;
        this.WARN_LEVEL = 3;
        this.DEBUG_LEVEL = 4;
        this.LOG_LEVEL = 5;

        // Set debug level
        let queryParams = new URLSearchParams(window.location.search);
        if( queryParams.has(this.QUERY_PARAM_FOR_DEBUG_LEVEL) ){
            // Get the debug level from the query string.
            let level = parseInt(queryParams.get(this.QUERY_PARAM_FOR_DEBUG_LEVEL), 10);
            level = isNaN(level) ? this.DEFAULT_LOG_LEVEL : Math.abs(level);
            this.debugLevel = level;
        }else{
            // Assign default log level as no value is present in query string.
            this.debugLevel = this.DEFAULT_LOG_LEVEL;
        }
    }

    log(msg) {
        if (this.debugLevel >= this.LOG_LEVEL) {
            this.consoleLog("log", "LOG", msg);
        }
    }

    debug(msg) {
        if (this.debugLevel >= this.DEBUG_LEVEL) {
            this.consoleLog("debug", "DEBUG", msg);
        }
    }

    warn(msg) {
        if (this.debugLevel >= this.WARN_LEVEL) {
            this.consoleLog("warn", "WARN", msg);
        }
    }

    error(msg) {
        if (this.debugLevel >= this.ERROR_LEVEL) {
            this.consoleLog("error", "ERROR", msg);
        }
    }

    info(msg) {
        if (this.debugLevel >= this.INFO_LEVEL) {
            this.consoleLog("info", "INFO", msg);
        }
    }

    consoleLog(logLevel, msgLevel, msg) {
        // eslint-disable-next-line no-console
        console[logLevel](this.LOG_PREFIX + msgLevel + ": " + msg);
    }
}

const logger = new Logger();
Object.freeze(logger);
export default logger;