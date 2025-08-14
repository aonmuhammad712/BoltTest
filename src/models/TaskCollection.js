import { Task } from './Task.js';

/**
 * TaskCollection Model
 * Manages a collection of tasks with CRUD operations
 */
export class TaskCollection {
    constructor() {
        this.tasks = [];
        this.observers = [];
    }

    /**
     * Adds an observer to be notified of changes
     * @param {Function} observer - Callback function to be called on changes
     */
    addObserver(observer) {
        this.observers.push(observer);
    }

    /**
     * Removes an observer
     * @param {Function} observer - Observer to remove
     */
    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    /**
     * Notifies all observers of changes
     */
    notifyObservers() {
        this.observers.forEach(observer => observer(this));
    }

    /**
     * Adds a new task to the collection
     * @param {string} text - The task text
     * @returns {Task} - The created task
     * @throws {Error} - If task creation fails
     */
    addTask(text) {
        try {
            const task = new Task(text);
            this.tasks.push(task);
            this.notifyObservers();
            return task;
        } catch (error) {
            throw new Error(`Failed to add task: ${error.message}`);
        }
    }

    /**
     * Removes a task from the collection
     * @param {string} taskId - The ID of the task to remove
     * @returns {boolean} - True if task was removed, false if not found
     */
    removeTask(taskId) {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        
        if (this.tasks.length < initialLength) {
            this.notifyObservers();
            return true;
        }
        return false;
    }

    /**
     * Toggles the completion status of a task
     * @param {string} taskId - The ID of the task to toggle
     * @returns {boolean} - True if task was found and toggled, false otherwise
     */
    toggleTask(taskId) {
        const task = this.findTaskById(taskId);
        if (task) {
            task.toggle();
            this.notifyObservers();
            return true;
        }
        return false;
    }

    /**
     * Finds a task by its ID
     * @param {string} taskId - The ID of the task to find
     * @returns {Task|null} - The task if found, null otherwise
     */
    findTaskById(taskId) {
        return this.tasks.find(task => task.id === taskId) || null;
    }

    /**
     * Gets all tasks
     * @returns {Task[]} - Array of all tasks
     */
    getAllTasks() {
        return [...this.tasks];
    }

    /**
     * Gets completed tasks
     * @returns {Task[]} - Array of completed tasks
     */
    getCompletedTasks() {
        return this.tasks.filter(task => task.completed);
    }

    /**
     * Gets pending (incomplete) tasks
     * @returns {Task[]} - Array of pending tasks
     */
    getPendingTasks() {
        return this.tasks.filter(task => !task.completed);
    }

    /**
     * Gets task statistics
     * @returns {Object} - Statistics about the tasks
     */
    getStats() {
        return {
            total: this.tasks.length,
            completed: this.getCompletedTasks().length,
            pending: this.getPendingTasks().length,
            completionRate: this.tasks.length > 0 ? 
                Math.round((this.getCompletedTasks().length / this.tasks.length) * 100) : 0
        };
    }

    /**
     * Clears all tasks
     */
    clearAll() {
        this.tasks = [];
        this.notifyObservers();
    }

    /**
     * Clears completed tasks
     */
    clearCompleted() {
        this.tasks = this.getPendingTasks();
        this.notifyObservers();
    }
}