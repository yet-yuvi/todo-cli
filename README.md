# 📝 Node.js To-Do CLI Application

A lightweight, modular, and crash-proof Command Line Interface (CLI) application built with Node.js to seamlessly manage daily tasks directly from your terminal.

---

## ✨ Features

- **Modular Architecture:** Source code is isolated under `src/` while data storage is separated inside `.data/`.
- **File-Based Persistence:** Automatically manages and syncs tasks with a local `.data/tasks.json` file.
- **Sequential ID Generation:** Generates auto-incrementing numeric IDs starting from `100` using `Array.prototype.reduce()`.
- **Crash-Proof JSON Handling:** Handles empty, missing, or corrupted JSON storage gracefully using auto-reset logic and `try...catch`.
- **Task Management CLI:** Supports adding, viewing, and deleting tasks with formatted terminal output.

---

## 📁 Project Structure

```text
todo-cli/
├── .data/            # Auto-generated data directory (Git ignored)
│   └── tasks.json    # JSON task database
├── src/              # Source code directory
│   ├── index.js      # Entry point (CLI argument parsing & routing)
│   └── taskRepo.js   # Core repository module (Data operations & file I/O)
├── .gitignore        # Specifies files ignored by Git tracking
├── .nvmrc            # Specifies the required Node.js version (v24.19.0)
├── package.json      # Project metadata & npm scripts
└── README.md         # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (`v24.19.0` as specified in `.nvmrc`)
- **NVM** (Node Version Manager) is recommended to easily switch to the target Node version.

### Installation & Setup
1. Clone the repository:
   ```bash
   git clone git@github.com:yet-yuvi/todo-cli.git
   cd todo-cli
   ```

2. Switch to the project's Node.js version:
   ```bash
   nvm use
   ```
   *(If you do not have Node.js `v24.19.0` installed, run `nvm install` first).*

3. No external NPM dependencies are required. The application runs entirely on native Node.js core modules (`fs`, `path`).

---

## 🛠️ Usage & Commands

### 1. Add a Task
Add a new task to your list by passing the `add` command followed by the task title:

```bash
# Recommended
npm start -- add "Complete CLI modularization"

# Alternative
node src/index.js add "Complete CLI modularization"
```

**Terminal Output:**
```text
Running To-Do CLI Application...
Saving 1 tasks to tasks.json...
Task added: Complete CLI modularization
```

---

### 2. View All Tasks
Display all stored tasks from `.data/tasks.json`:

```bash
# Recommended
npm start -- view

# Alternative
node src/index.js view
```

**Terminal Output:**
```text
Running To-Do CLI Application...
================ Available Tasks ===============
[
  {
    id: 100,
    title: "I'm Johan",
    date: '2026-08-04T22:00:08.826Z'
  },
  {
    id: 101,
    title: "I'm Jubayar",
    date: '2026-08-04T22:00:20.881Z'
  },
  {
    id: 102,
    title: "I'm Luke",
    date: '2026-08-04T22:01:11.257Z'
  },
  {
    id: 103,
    title: "I'm Henz",
    date: '2026-08-04T22:02:30.545Z'
  },
  {
    id: 104,
    title: "I'm Julia",
    date: '2026-08-04T22:02:30.545Z'
  },
  {
    id: 105,
    title: "Complete CLI modularization",
    date: '2026-08-08T15:30:00.000Z'
  },
]
================================================
```

---

### 3. Delete a Task
Delete a task from your list by passing the `delete` command followed by the target task ID:

```bash
# Recommended
npm start -- delete 100

# Alternative
node src/index.js delete 100
```

**Terminal Output:**
```text
Running To-Do CLI Application...
Deleting task with ID: 100
Saving 5 tasks to tasks.json...
Task with ID 100 deleted.
```

---

## 🛡️ Error Handling & Data Safety

- **Missing Directory/File Handling:** Automatically creates the `.data/` directory and `tasks.json` file if they do not exist.
- **Auto-Recovery on Corruption:** If `tasks.json` contains invalid JSON syntax, it warns the user and safely resets the file without crashing the runtime.
- **Input Validation:** Prevents bad state writes by logging structured error messages when `taskTitle` is missing or when saving non-array data types.

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).