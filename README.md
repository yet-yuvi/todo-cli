# 📝 Node.js To-Do CLI Application

A lightweight, modular, and crash-proof Command Line Interface (CLI) application built with Node.js to seamlessly manage daily tasks directly from your terminal.

---

## ✨ Features

- **Modular Architecture:** Business logic and file persistence layer are cleanly isolated inside a dedicated module (`taskRepo.js`).
- **File-Based Persistence:** Automatically creates and syncs tasks with a local `tasks.json` file.
- **Unique Task Identification:** Generates cryptographically secure UUIDs for every new task using Node.js native `crypto.randomUUID()`.
- **Crash-Proof JSON Handling:** Handles empty, missing, or corrupted JSON storage gracefully using auto-reset logic and `try...catch`.
- **Task Management CLI:** Supports adding new tasks and listing existing tasks with formatted terminal output.

---

## 📁 Project Structure

```text
todo-cli/
├── index.js          # Entry point (CLI argument parsing & routing)
├── taskRepo.js        # Core repository module (Data operations & file I/O)
├── tasks.json        # Auto-generated JSON database (Git ignored)
├── .gitignore        # Specifies files ignored by Git tracking
├── .nvmrc            # Specifies the required Node.js version (v24.19.0)
└── README.md         # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (`v24.19.0` as specified in `.nvmrc`)
- **NVM** (Node Version Manager) is recommended to switch to the exact Node version easily.

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

3. No external NPM dependencies are required. The application runs entirely on native Node.js core modules (`fs`, `path`, `crypto`).

---

## 🛠️ Usage & Commands

### 1. Add a Task
Add a new task to your list by passing the `add` command followed by the task title:

```bash
node index.js add "Complete CLI modularization"
```

**Terminal Output:**
```text
Running To-Do CLI Application...
Task added: Complete CLI modularization
```

---

### 2. View All Tasks
Display all stored tasks from `tasks.json`:

```bash
node index.js view
```

**Terminal Output:**
```text
Running To-Do CLI Application...
================ Available Tasks ===============
[
  {
    id: 'a09ffe96-4e44-4f67-96b1-c6a8fe015ce5',
    title: "I'm Johan",
    date: '2026-08-04T22:00:08.826Z'
  },
  {
    id: 'c48b0873-a563-4c9d-a350-e909ab1a8bb8',
    title: "I'm Jubayar",
    date: '2026-08-04T22:00:20.881Z'
  },
  {
    id: 'a43c7f2b-4f8f-434c-8d06-771161dd0b5a',
    title: "I'm Luke",
    date: '2026-08-04T22:01:11.257Z'
  },
  {
    id: '2686a485-bcbc-4779-88cb-19fd2ec63ffb',
    title: "I'm Henz",
    date: '2026-08-04T22:02:30.545Z'
  }
]
================================================
```

---

## 🛡️ Error Handling & Data Safety

- **Missing File Handling:** Automatically creates `tasks.json` initialized with `[]` if it doesn't exist.
- **Auto-Recovery on Corruption:** If `tasks.json` contains invalid JSON syntax, it warns the user and safely resets the file without throwing an unhandled exception.
- **Input Validation:** Logs a user-friendly error message when `taskTitle` is missing instead of throwing runtime errors.

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).