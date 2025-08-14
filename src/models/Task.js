/**
 * Task Model
 * Represents a single task with validation and business logic
 */
export class Task {
    constructor(text, id = null) {
        this.id = id || this.generateId();
        this.text = this.validateText(text);
        this.completed = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    /**
     * Validates task text
     * @param {string} text - The task text to validate
     * @returns {string} - The validated text
     * @throws {Error} - If text is invalid
     */
    validateText(text) {
        if (!text || typeof text !== 'string') {
            throw new Error('Task text must be a non-empty string');
        }
        
        const trimmedText = text.trim();
        if (trimmedText.length === 0) {
            throw new Error('Task text cannot be empty');
        }
        
        if (trimmedText.length > 100) {
            throw new Error('Task text cannot exceed 100 characters');
        }
        
        return trimmedText;
    }

    /**
     * Generates a unique ID for the task
     * @returns {string} - Unique identifier
     */
    generateId() {
        return 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Toggles the completion status of the task
     */
    toggle() {
        this.completed = !this.completed;
        this.updatedAt = new Date();
    }

    /**
     * Updates the task text
     * @param {string} newText - The new text for the task
     */
    updateText(newText) {
        this.text = this.validateText(newText);
        this.updatedAt = new Date();
    }

    /**
     * Returns a plain object representation of the task
     * @returns {Object} - Task data as plain object
     */
    toJSON() {
        return {
            id: this.id,
            text: this.text,
            completed: this.completed,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString()
        };
    }

    /**
     * Creates a Task instance from a plain object
     * @param {Object} data - Task data
     * @returns {Task} - New Task instance
     */
    static fromJSON(data) {
        const task = new Task(data.text, data.id);
        task.completed = data.completed;
        task.createdAt = new Date(data.createdAt);
        task.updatedAt = new Date(data.updatedAt);
        return task;
    }
}