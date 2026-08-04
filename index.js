const fs = require('fs');
const path = require('path');

const tasksFilePath = path.join(__dirname, 'tasks.json');

function ensureFileExists() {
  if (!fs.existsSync(tasksFilePath)) {
    fs.writeFileSync(tasksFilePath, '[]', 'utf-8');
  }
}

const taskList = loadTasks();

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

console.log('Running To-Do CLI Application...');

const command = process.argv[2];
const value = process.argv[3];

if (command === 'add') {
  addTask(value);
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
  taskList.push(newTask);
  saveTask();
  console.log(`Task added: ${taskTitle}`);
}

function saveTask() {
  fs.writeFileSync(tasksFilePath, JSON.stringify(taskList, null, 2));
}

console.log('Current Task List:', taskList);
