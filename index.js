const fs = require('fs');
const path = require('path');

const tasksFilePath = path.join(__dirname, 'tasks.json');

const taskList = loadTasks();

function loadTasks() {
  if (!fs.existsSync(tasksFilePath)) {
    console.warn('Tasks file not found. Creating a new one.');
    fs.writeFileSync(tasksFilePath, '[]');
    return [];
  }
  const data = fs.readFileSync(tasksFilePath, 'utf-8');
  return JSON.parse(data);
}

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
  saveTask();
  console.log(`Task added: ${taskTitle}`);
}

function saveTask() {
  fs.writeFileSync(tasksFilePath, JSON.stringify(taskList, null, 2));
}

console.log('Current Task List:', taskList);
