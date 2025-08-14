import { TaskCollection } from '../models/TaskCollection.js';
import { TaskView } from '../views/TaskView.js';

/**
 * TaskController
 * Coordinates between TaskCollection (Model) and TaskView (View)
 */
export class TaskController {
    constructor() {
        this.model = new TaskCollection();
        this.view = new TaskView();
        
        this.init();
    }

    /**
     * Initializes the controller
     */
    init() {
        // Set up model observer
        this.model.addObserver(() => {
            this.updateView();
        });
        
        // Bind view events
        this.view.bindEvents({
            onAddTask: (text) => this.handleAddTask(text),
            onToggleTask: (taskId) => this.handleToggleTask(taskId),
            onDeleteTask: (taskId) => this.handleDeleteTask(taskId)
        });
        
        // Initial render
        this.updateView();
        
        // Focus input field
        this.view.focusInput();
    }

    /**
     * Handles adding a new task
     * @param {string} text - The task text
     */
    handleAddTask(text) {
        try {
            const task = this.model.addTask(text);
            console.log('Task added:', task.toJSON());
        } catch (error) {
            console.error('Error adding task:', error.message);
            throw error; // Re-throw to let view handle the error display
        }
    }

    /**
     * Handles toggling a task's completion status
     * @param {string} taskId - The ID of the task to toggle
     */
    handleToggleTask(taskId) {
        const success = this.model.toggleTask(taskId);
        if (success) {
            const task = this.model.findTaskById(taskId);
            console.log('Task toggled:', task.toJSON());
        } else {
            console.error('Task not found:', taskId);
        }
    }

    /**
     * Handles deleting a task
     * @param {string} taskId - The ID of the task to delete
     */
    handleDeleteTask(taskId) {
        const success = this.model.removeTask(taskId);
        if (success) {
            console.log('Task deleted:', taskId);
        } else {
            console.error('Task not found:', taskId);
        }
    }

    /**
     * Updates the view with current model state
     */
    updateView() {
        const tasks = this.model.getAllTasks();
        const stats = this.model.getStats();
        
        this.view.renderTasks(tasks);
        this.view.updateStats(stats);
    }

    /**
     * Gets current statistics
     * @returns {Object} - Current task statistics
     */
    getStats() {
        return this.model.getStats();
    }

    /**
     * Gets all tasks
     * @returns {Task[]} - Array of all tasks
     */
    getAllTasks() {
        return this.model.getAllTasks();
    }

    /**
     * Clears all tasks
     */
    clearAllTasks() {
        this.model.clearAll();
        console.log('All tasks cleared');
    }

    /**
     * Clears completed tasks
     */
    clearCompletedTasks() {
        this.model.clearCompleted();
        console.log('Completed tasks cleared');
    }

    /**
     * Re-renders the view
     */
    render() {
        this.updateView();
    }
}