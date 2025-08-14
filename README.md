# MVC Task Manager

A simple task management web application demonstrating the Model-View-Controller (MVC) architectural pattern.

## Architecture Overview

This application follows the MVC pattern with clear separation of concerns:

### Models (`src/models/`)
- **Task.js** - Individual task entity with validation and business logic
- **TaskCollection.js** - Manages collections of tasks with CRUD operations

### Views (`src/views/`)
- **TaskView.js** - Handles all DOM manipulation and UI rendering

### Controllers (`src/controllers/`)
- **TaskController.js** - Coordinates between models and views, handles user interactions

## Features

- ✅ Add new tasks with validation
- ✅ Toggle task completion status
- ✅ Delete tasks
- ✅ Real-time statistics (total, completed, pending)
- ✅ Input validation and error handling
- ✅ Responsive design
- ✅ Clean, modern UI

## MVC Benefits Demonstrated

1. **Separation of Concerns** - Each layer has specific responsibilities
2. **Maintainability** - Changes to one layer don't affect others
3. **Testability** - Components can be tested independently
4. **Scalability** - Easy to extend with new features

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the provided local server URL

## Usage

- Enter a task in the input field and click "Add Task" or press Enter
- Click the checkbox to toggle task completion
- Click the × button to delete a task
- View statistics at the top of the task list

## Browser Console Commands

The application exposes several methods for debugging:

```javascript
// Get task statistics
taskApp.getStats()

// Get all tasks
taskApp.getAllTasks()

// Clear all tasks
taskApp.clearAllTasks()

// Clear completed tasks
taskApp.clearCompletedTasks()

// Re-render the view
taskApp.render()
```

## Project Structure

```
mvc-task-app/
├── index.html              # Main HTML file
├── package.json            # Project configuration
├── README.md              # This file
└── src/
    ├── main.js            # Application entry point
    ├── style.css          # Styles
    ├── controllers/
    │   └── TaskController.js
    ├── models/
    │   ├── Task.js
    │   └── TaskCollection.js
    └── views/
        └── TaskView.js
```

## Technical Details

- **No external dependencies** - Pure vanilla JavaScript
- **ES6 Modules** - Modern module system
- **Observer Pattern** - Model notifies views of changes
- **Input Validation** - Client-side validation with error handling
- **Responsive Design** - Works on desktop and mobile devices

## Git Repository Setup

Since this was created in a WebContainer environment, to push to your git repository:

1. Copy all files to your local development environment
2. Initialize git repository: `git init`
3. Create a new branch: `git checkout -b mvc-task-app`
4. Add files: `git add .`
5. Commit: `git commit -m "Add MVC task management web app"`
6. Push to your repository: `git push origin mvc-task-app`