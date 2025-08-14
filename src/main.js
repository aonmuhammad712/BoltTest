import { TaskController } from './controllers/TaskController.js';

/**
 * Application Entry Point
 * Initializes the MVC Task Management Application
 */

// Initialize the application
const taskApp = new TaskController();

// Make the app globally accessible for debugging
window.taskApp = taskApp;

// Log application start
console.log('MVC Task Manager initialized');
console.log('Available commands:');
console.log('- taskApp.getStats() - Get task statistics');
console.log('- taskApp.getAllTasks() - Get all tasks');
console.log('- taskApp.clearAllTasks() - Clear all tasks');
console.log('- taskApp.clearCompletedTasks() - Clear completed tasks');
console.log('- taskApp.render() - Re-render the view');

// Export for potential module usage
export { taskApp };