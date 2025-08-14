/**
 * TaskView
 * Handles all DOM manipulation and UI rendering
 */
export class TaskView {
    constructor() {
        this.taskList = document.getElementById('taskList');
        this.emptyState = document.getElementById('emptyState');
        this.totalTasks = document.getElementById('totalTasks');
        this.completedTasks = document.getElementById('completedTasks');
        this.pendingTasks = document.getElementById('pendingTasks');
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        
        this.eventHandlers = {};
    }

    /**
     * Binds event handlers
     * @param {Object} handlers - Object containing event handler functions
     */
    bindEvents(handlers) {
        this.eventHandlers = handlers;
        
        // Add task button click
        this.addTaskBtn.addEventListener('click', () => {
            this.handleAddTask();
        });
        
        // Enter key in input field
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleAddTask();
            }
        });
        
        // Input validation
        this.taskInput.addEventListener('input', () => {
            this.validateInput();
        });
    }

    /**
     * Handles adding a new task
     */
    handleAddTask() {
        const text = this.taskInput.value.trim();
        if (text && this.eventHandlers.onAddTask) {
            try {
                this.eventHandlers.onAddTask(text);
                this.taskInput.value = '';
                this.clearError();
            } catch (error) {
                this.showError(error.message);
            }
        }
    }

    /**
     * Validates the input field
     */
    validateInput() {
        const text = this.taskInput.value;
        const isValid = text.trim().length > 0 && text.length <= 100;
        
        this.addTaskBtn.disabled = !isValid;
        
        if (text.length > 100) {
            this.showError('Task text cannot exceed 100 characters');
        } else {
            this.clearError();
        }
    }

    /**
     * Shows an error message
     * @param {string} message - Error message to display
     */
    showError(message) {
        this.clearError();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        this.taskInput.parentNode.appendChild(errorDiv);
        this.taskInput.classList.add('error');
    }

    /**
     * Clears any error messages
     */
    clearError() {
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        this.taskInput.classList.remove('error');
    }

    /**
     * Renders the task list
     * @param {Task[]} tasks - Array of tasks to render
     */
    renderTasks(tasks) {
        this.taskList.innerHTML = '';
        
        if (tasks.length === 0) {
            this.emptyState.style.display = 'block';
            return;
        }
        
        this.emptyState.style.display = 'none';
        
        tasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            this.taskList.appendChild(taskElement);
        });
    }

    /**
     * Creates a DOM element for a task
     * @param {Task} task - The task to create an element for
     * @returns {HTMLElement} - The task element
     */
    createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskDiv.dataset.taskId = task.id;
        
        taskDiv.innerHTML = `
            <div class="task-content">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${this.escapeHtml(task.text)}</span>
            </div>
            <div class="task-actions">
                <button class="delete-btn" title="Delete task">×</button>
            </div>
        `;
        
        // Bind task-specific events
        const checkbox = taskDiv.querySelector('.task-checkbox');
        const deleteBtn = taskDiv.querySelector('.delete-btn');
        
        checkbox.addEventListener('change', () => {
            if (this.eventHandlers.onToggleTask) {
                this.eventHandlers.onToggleTask(task.id);
            }
        });
        
        deleteBtn.addEventListener('click', () => {
            if (this.eventHandlers.onDeleteTask) {
                this.eventHandlers.onDeleteTask(task.id);
            }
        });
        
        return taskDiv;
    }

    /**
     * Updates the task statistics display
     * @param {Object} stats - Statistics object
     */
    updateStats(stats) {
        this.totalTasks.textContent = `Total: ${stats.total}`;
        this.completedTasks.textContent = `Completed: ${stats.completed}`;
        this.pendingTasks.textContent = `Pending: ${stats.pending}`;
    }

    /**
     * Escapes HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} - Escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Shows a success message
     * @param {string} message - Success message to display
     */
    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    /**
     * Focuses the input field
     */
    focusInput() {
        this.taskInput.focus();
    }
}