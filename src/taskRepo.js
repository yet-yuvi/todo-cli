const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const dataDir = path.join(__dirname, '../.data');
const tasksFilePath = path.join(dataDir, 'tasks.json');

function ensureFileExists() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

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
    logger.warn('Error parsing tasks.json. Resetting tasks.json...');
    fs.writeFileSync(tasksFilePath, '[]', 'utf-8');
    return [];
  }
}

function saveTask(taskList) {
  if (!Array.isArray(taskList)) {
    logger.error('Error: taskList must be an array.');
    return;
  }

  ensureFileExists();

  fs.writeFileSync(tasksFilePath, JSON.stringify(taskList, null, 2), 'utf-8');
  logger.info(`Saving ${taskList.length} tasks to tasks.json...`);
}

const generateNextId = (taskList) => {
  // const maxId = Math.max(0, ...taskList.map((task) => task.id));
  const maxId = taskList.reduce(
    (max, task) => (task.id > max ? task.id : max),
    99,
  );
  return maxId + 1;
};

function addTask(taskTitle) {
  if (!taskTitle) {
    logger.error('Error: Task title is required.');
    return;
  }
  const taskList = loadTasks();

  const newTask = {
    id: generateNextId(taskList),
    title: taskTitle,
    date: new Date().toISOString(),
  };
  taskList.push(newTask);
  saveTask(taskList);
  logger.info(`Task added: ${taskTitle}`);
}

function viewTasks() {
  const taskList = loadTasks();
  logger.info(
    '======================== Available Tasks =======================',
  );
  if (taskList.length === 0) {
    logger.info('No tasks found.');
  } else {
    logger.info(
      taskList
        .map((task) => `[${task.date}] ID: ${task.id}: ${task.title}`)
        .join('\n'),
    );
  }
  logger.info(
    '================================================================',
  );
}

function deleteTask(taskId) {
  if (!taskId) {
    logger.error('Error: Task ID is required for deletion.');
    return;
  }

  const taskList = loadTasks();
  const numericId = parseInt(taskId, 10);

  const taskExists = taskList.some((task) => task.id === numericId);

  if (!taskExists) {
    logger.error(`Error: Task with ID ${taskId} not found.`);
    return;
  }

  logger.warn(`Deleting task with ID: ${taskId}`);
  const updatedTaskList = taskList.filter((task) => task.id !== numericId);

  saveTask(updatedTaskList);
  logger.info(`Task with ID ${taskId} deleted.`);
}

module.exports = {
  addTask,
  viewTasks,
  deleteTask,
};
