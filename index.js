const taskList = [];
console.log('Running To-Do CLI Application...');

const command = process.argv[2];
const value = process.argv[3];

if (command === 'add') {
  addTask(value);
}

function addTask(taskTitle) {
  if (!taskTitle) {
    throw new Error('Task title is required.');
  }
  const newTask = {
    id: crypto.randomUUID(),
    title: taskTitle,
    date: new Date(),
  };
  taskList.push(newTask);
}

console.log('Current Task List:', taskList);
