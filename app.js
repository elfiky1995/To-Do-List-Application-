const newTask = document.querySelector("#newTask"),
    mainContent = document.querySelector("#todosBox"),
    tabs = document.querySelectorAll(".tab");

let editID,
    isEditedTask = false,
    todos = JSON.parse(localStorage.getItem("todo-list")); // getting localstorage to-do list

// Create Array For Months to turn the number [index] of months to names
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    d = new Date();
// making the date showing dynamically depends on current date
date.innerHTML = `It's ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

// adding class active by clicking on div
tabs.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        btn.classList.add("active");
        showToDo(/*btn.id*/);
    });
});

function showToDo(/*filter*/) {
    let card = "";
    if (todos) {
        todos.forEach((todo, id) => {
            // if todo status is completed, set the isCompleted value to checked
            let isCompleted = todo.status == "completed" ? "checked" : "";
            //if (filter == todo.status || filter == "all") {
            card += `
                        <div class="card">
                            <div class="cardContent">
                                <label for="${id}">
                                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                                    <p class="${isCompleted}">${todo.name}</p>
                                </label>
                            </div>
                            <div id="buttons">
                                <i onclick="editTask(${id}, '${todo.name}')" class="fa-solid fa-pen"></i>
                                <i onclick="deleteTask(${id})" class="fa-solid fa-trash"></i>
                            </div>
                        </div>
                    `;
            //}
        });
    }
    mainContent.innerHTML = card || `<span>You don't have any task here</span>`;
}

// to keep content visible on page after refresh
showToDo("all");

// function to EDIT task
function editTask(taskID, taskName) {
    editID = taskID;
    isEditedTask = true;
    newTask.value = taskName;
    newTask.focus();
    newTask.classList.add("active");
}

// function to DELETE task
function deleteTask(deleteID) {
    // removing selected task from array
    todos.splice(deleteID, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showToDo();
}

function updateStatus(selectedTask) {
    // getting <p> that contains task name
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        // updating the status of selected task to completed
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        // updating the status of selected task to pending
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

newTask.addEventListener("keyup", e => {
    let createdTask = newTask.value.trim();
    if (e.key == "Enter" && createdTask) {
        // if isEditedTask isn't true
        if (!isEditedTask) {
            // pass an empty array to todo, if todo isn't exist.
            if (!todos) {
                todos = [];
            };
            let taskInfo = {
                name: createdTask,
                status: "pending"
            };
            todos.push(taskInfo); // adding a new todo to todo list
        } else {
            isEditedTask = false;
            todos[editID].name = createdTask;
        }
        newTask.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showToDo(document.querySelector(".active").id);
    }
});
