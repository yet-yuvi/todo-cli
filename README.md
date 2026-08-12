# 📝 Node.js To-Do CLI Application

A lightweight, modular, and crash-proof Command Line Interface (CLI) application built with Node.js to seamlessly manage daily tasks directly from your terminal.

---

## ✨ Features

- **Modular Architecture:** Source code is isolated under `src/` while data storage is separated inside `.data/`.
- **Colored Terminal Output:** Uses a custom Chalk logger for color-coded status messages (`INFO` in blue, `WARN` in yellow, `ERROR` in red).
- **File-Based Persistence:** Automatically manages and syncs tasks with a local `.data/tasks.json` file.
- **Sequential ID Generation:** Generates auto-incrementing numeric IDs using `Array.prototype.reduce()`.
- **Task Editing:** Allows updating existing task titles while automatically updating the modified timestamp.
- **Crash-Proof JSON Handling:** Handles empty, missing, or corrupted JSON storage gracefully using auto-reset logic and `try...catch`.
- **Input & Existence Validation:** Validates required fields for adding, editing, and deleting tasks and ensures a task exists before updating or deleting.
- **Formatted CLI Output:** Displays tasks in a clean, human-readable list format rather than raw JSON.

---

## 📁 Project Structure

```text
todo-cli/
├── .data/            # Auto-generated data directory (Git ignored)
│   └── tasks.json    # JSON task database
├── src/              # Source code directory
│   ├── index.js      # Entry point (CLI argument parsing & routing)
│   ├── logger.js     # Custom Chalk logger module (Colored log output)
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
- **NVM** (Node Version Manager) is recommended.

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

3. Install project dependencies (`chalk` v4 for CommonJS support):
   ```bash
   npm install
   ```

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
Saving 4 tasks to tasks.json...
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
======================== Available Tasks =======================
[2026-08-04T22:00:08.826Z] ID: 100: I'm Johan
[2026-08-04T22:00:20.881Z] ID: 101: I'm Jubayar
[2026-08-04T22:01:11.257Z] ID: 102: I'm Luke
[2026-08-04T22:01:31.215Z] ID: 103: Complete CLI modularization
================================================================
```

---

### 3. Edit a Task
Edit an existing task title by passing the `edit` command, target task ID, and the new title:

```bash
# Recommended
npm start -- edit 100 "I'm Johan Liebert"

# Alternative
node src/index.js edit 100 "I'm Johan Liebert"
```

**Terminal Output:**
```text
Running To-Do CLI Application...
Saving 4 tasks to tasks.json...
Task 100 updated to: "I'm Johan Liebert"
```

---

### 4. Delete a Task
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
Saving 3 tasks to tasks.json...
Task with ID 100 deleted.
```

---

## 🛡️ Error Handling & Data Safety

- **Custom Colored Logging:** Visual feedback using Chalk (`blue` for info, `yellow` for warnings, `red` for errors).
- **Missing Directory/File Handling:** Automatically creates `.data/` directory and `tasks.json` if missing.
- **Auto-Recovery on Corruption:** Warns the user and safely resets corrupted `tasks.json` files without crashing.
- **Strict Input Validation:** 
  - Throws an error if `add` is called without a task title.
  - Throws an error if `edit` is called without a task ID or new title.
  - Throws an error if `delete` is called without a task ID.
  - Warns if the specified task ID for editing or deletion does not exist in `tasks.json`.

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).