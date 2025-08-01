
let taskCount = 0;

function updateTaskCount() {
    const count = document.getElementById('list').children.length;
    const countElement = document.getElementById('taskCount');
    const emptyState = document.getElementById('emptyState');
    
    countElement.textContent = `${count} ${count === 1 ? 'task' : 'tasks'}`;
    
    if (count === 0) {
        emptyState.style.display = 'block';
        countElement.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        countElement.style.display = 'block';
    }
}

function createTask() {
    const input = document.getElementById('text');
    const task = input.value.trim();
    
    if (task === "") {
        input.style.borderColor = '#dc3545';
        input.focus();
        setTimeout(() => {
            input.style.borderColor = '#e1e5e9';
        }, 2000);
        return;
    }

   
    const li = document.createElement("li");
    li.className = "task-item";
    
   
    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task;
    li.appendChild(taskText);

    
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "task-buttons";

    
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    editBtn.onclick = function() {
        const newTask = prompt("Edit Task:", taskText.textContent);
        if (newTask !== null && newTask.trim() !== "") {
            taskText.textContent = newTask.trim();
        }
    };

   
    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "Delete";
    delBtn.onclick = function() {
        li.style.animation = "slideOut 0.3s ease-in";
        setTimeout(() => {
            li.remove();
            updateTaskCount();
        }, 300);
    };

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(delBtn);
    li.appendChild(buttonContainer);

    document.getElementById('list').appendChild(li);
    input.value = "";
    updateTaskCount();
}


document.getElementById('text').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        createTask();
    }
});


const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);


updateTaskCount();
