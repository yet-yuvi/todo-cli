const { loadTasks, addTask, viewTasks } = require('./taskRepo');

console.log('Running To-Do CLI Application...');

const taskList = loadTasks();

const command = process.argv[2];
const value = process.argv[3];

if (command === 'add') {
  addTask(value);
} else if (command === 'view') {
  viewTasks();
}
