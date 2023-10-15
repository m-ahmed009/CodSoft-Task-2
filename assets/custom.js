document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Display tasks
    function displayTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${task}
                <i class="update fas fa-pen-to-square"></i>
                <i class="delete fa-solid fa-trash"></i>
            `;
            const deleteIcon = li.querySelector('.delete');
            const updateIcon = li.querySelector('.update');

            deleteIcon.addEventListener('click', () => deleteTask(index));
            updateIcon.addEventListener('click', () => updateTask(index));

            taskList.appendChild(li);
        });
    }

    // Add a new task
    addTaskBtn.addEventListener('click', () => {
        const newTask = taskInput.value.trim();
        if (newTask) {
            tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = '';
            displayTasks();
            showNotification('Task added successfully', 'success');
        }
    });

    // Delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
        showNotification('Task deleted', 'error');
    }

    // Update a task
    function updateTask(index) {
        const li = taskList.children[index]; // Get the list item
        const taskText = li.textContent.trim(); // Get the current task text

        // Create an input field for editing
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = taskText;
        inputField.classList.add('form-control');

        // Create a "Save" button with a checkmark icon
        const saveButton = document.createElement('button');
        saveButton.innerHTML = '<i class="fas fa-check"></i>';
        saveButton.classList.add('btn', 'btn-success');

        // Replace the list item content with the input field and "Save" button
        li.innerHTML = '';
        li.appendChild(inputField);
        li.appendChild(saveButton);

        // Focus on the input field for editing
        inputField.focus();

        // Listen for the "Save" button click event to save changes
        saveButton.addEventListener('click', function () {
            const updatedTask = inputField.value;
            tasks[index] = updatedTask;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
            showNotification('Task updated', 'success');
        });

        // Listen for the Enter key to save changes as well
        inputField.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                saveButton.click();
            }
        });
    }

    // Show a notification
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.classList.add('notification', `notification-${type}`);

        // Create an icon element
        const icon = document.createElement('i');
        icon.classList.add('fas', type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle');

        // Append the icon to the notification
        notification.insertBefore(icon, notification.firstChild);

        document.body.appendChild(notification);

        // Remove the notification after a short delay
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }


    // Initial display
    displayTasks();
});


// Add-button
const addTask = document.getElementById('addTask');

addTask.addEventListener('click', function () {
    addTask.classList.add('loading');
    addTask.disabled = true;

    setTimeout(function () {
        addTask.classList.remove('loading');
        addTask.classList.add('success');
        addTask.innerHTML = '<i class="fas fa-check"></i> Added';

        setTimeout(function () {
            // Reset the button after a delay
            addTask.classList.remove('success');
            addTask.innerHTML = 'Add task';
            addTask.disabled = false;
        }, 2000);
    }, 1000);
});
