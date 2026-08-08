const chalk = require('chalk');

class Logger {
  constructor() {
    this._logger = console.log;
  }
  info(message) {
    this._logger(chalk.blue(message));
  }

  error(message) {
    this._logger(chalk.red(message));
  }

  warn(message) {
    this._logger(chalk.yellow(message));
  }
}

const logger = new Logger();

module.exports = logger;
