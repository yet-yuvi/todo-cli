const fs = require('fs');
const path = require('path');

const tasksFilePath = path.join(__dirname, 'tasks.json');

function ensureFileExists() {
  if (!fs.existsSync(tasksFilePath)) {
    fs.writeFileSync(tasksFilePath, '[]', 'utf-8');
  }
}

function loadTasks() {
  ensureFileExists();

  const data = fs.readFileSync(tasksFilePath, 'utf-8').trim();

  if (!data) {
    fs.writeFileSync(tasksFilePath, '[]', 'utf-8');
    return [];
  }

  try {
    return JSON.parse(data);
  } catch (error) {
    console.warn('Error parsing tasks.json. Resetting tasks.json...');
    fs.writeFileSync(tasksFilePath, '[]', 'utf-8');
    return [];
  }
}

function saveTask(taskList) {
  if (!Array.isArray(taskList)) {
    console.error('Error: taskList must be an array.');
    return;
  }
  fs.writeFileSync(tasksFilePath, JSON.stringify(taskList, null, 2));
  console.log(`Saving ${taskList.length} tasks to tasks.json...`);
}

function addTask(taskTitle) {
  if (!taskTitle) {
    console.error('Error: Task title is required.');
    return;
  }
  const taskList = loadTasks();
  // const maxId = Math.max(0, ...taskList.map((task) => task.id));
  const maxId = taskList.reduce(
    (max, task) => (task.id > max ? task.id : max),
    99,
  );
  const newTask = {
    id: maxId + 1,
    title: taskTitle,
    date: new Date(),
  };
  taskList.push(newTask);
  saveTask(taskList);
  console.log(`Task added: ${taskTitle}`);
}

function viewTasks() {
  const taskList = loadTasks();
  console.log('================ Available Tasks ===============');
  console.log(taskList);
  console.log('================================================');
}

module.exports = {
  addTask,
  viewTasks,
};
