function isValidTime(timeStr) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(timeStr);
}

function timeToMinutes(timeStr) {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
}

function addToList() {
    const taskInput = document.getElementById('taskInput').value.trim();
    const timeInput = document.getElementById('timeInput').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    if (!taskInput || !isValidTime(timeInput)) {
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';

    const card = document.createElement('div');
    card.className = 'task-card';

    const taskName = document.createElement('div');
    taskName.className = 'task-name';
    taskName.textContent = taskInput;

    const taskTime = document.createElement('div');
    taskTime.className = 'task-time';
    taskTime.textContent = timeInput;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.marginBottom = '10px';
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            card.classList.add('strikethrough');
        } else {
            card.classList.remove('strikethrough');
        }
    });

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit Time';
    editBtn.onclick = () => {
        const newTime = prompt('Enter new time (HH:MM):', taskTime.textContent);
        if (newTime && isValidTime(newTime)) {
            taskTime.textContent = newTime;
            updateOverdueStatus();
        } else if (newTime !== null) {
            alert('Invalid time.');
        }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
        card.remove();
    };

    card.appendChild(taskName);
    card.appendChild(taskTime);
    card.appendChild(checkbox);
    card.appendChild(editBtn);
    card.appendChild(deleteBtn);

    document.getElementById('taskGrid').appendChild(card);

    document.getElementById('taskInput').value = '';
    document.getElementById('timeInput').value = '';

    updateOverdueStatus();
}

function updateOverdueStatus() {
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();

    const cards = document.querySelectorAll('.task-card');
    cards.forEach(card => {
        const timeEl = card.querySelector('.task-time');
        const taskTime = timeEl.textContent;
        const taskMins = timeToMinutes(taskTime);

        if (taskMins < currentMins) {
            card.classList.add('overdue');
        } else {
            card.classList.remove('overdue');
        }
    });
}

function clearAllTasks() {
    if (confirm("Clear all tasks?")) {
        document.getElementById('taskGrid').innerHTML = '';
    }
}

window.onload = () => {
    updateOverdueStatus();
    setInterval(updateOverdueStatus, 60000); // Update every minute
};
