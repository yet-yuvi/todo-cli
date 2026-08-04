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
}

function addTask(taskTitle) {
  if (!taskTitle) {
    console.error('Error: Task title is required.');
    return;
  }
  const newTask = {
    id: crypto.randomUUID(),
    title: taskTitle,
    date: new Date(),
  };
  const taskList = loadTasks();
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
  loadTasks,
  addTask,
  viewTasks,
};
