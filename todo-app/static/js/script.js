// script.js

async function fetchTasks() {
    const response = await fetch('/get_tasks');
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.content;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(task.id);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const content = taskInput.value.trim();
    if (content) {
        await fetch('/add_task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        });
        taskInput.value = '';
        fetchTasks();
    }
}

async function deleteTask(id) {
    await fetch(`/delete_task/${id}`, {
        method: 'DELETE',
    });
    fetchTasks();
}

// Fetch tasks initially
fetchTasks();
