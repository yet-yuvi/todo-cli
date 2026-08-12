const { addTask, viewTasks, deleteTask, editTask } = require('./taskRepo');
const logger = require('./logger');

logger.info('Running To-Do CLI Application...');

const command = process.argv[2];
const value = process.argv[3];
const argument = process.argv[4];

if (command === 'add') {
  addTask(value);
} else if (command === 'view') {
  viewTasks();
} else if (command === 'delete') {
  deleteTask(value);
} else if (command === 'edit') {
  editTask(value, argument);
} else {
  logger.error(
    'Error: Invalid command. Use "add", "view", "delete", or "edit".',
  );
}
