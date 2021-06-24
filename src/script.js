let toDolist = [];

function submit() {
  let task = document.getElementById("task");
  if (task.value != "") {
    toDolist.push(task.value);
    addToList(task.value, toDolist.length - 1);
    task.value = null;
    updateStorage();
  }
}

function addToList(task, value) {
  let desc = document.createTextNode(task);
  let ol = document.getElementById("tasksList");
  let li = document.createElement("li");
  let rowContainer = document.createElement("div");
  let deleteTask = document.createElement("button");
  let textContainer = document.createElement("div");
  deleteTask.setAttribute("onclick", "deleteTask(this.parentElement)");
  deleteTask.setAttribute("content", "delete");
  let isActive = document.createElement("input");
  isActive.setAttribute("onclick", "isDone(this)");
  isActive.setAttribute("type", "checkbox");
  deleteTask.innerHTML = "x";
  textContainer.appendChild(desc);
  rowContainer.appendChild(isActive);
  rowContainer.appendChild(textContainer);
  li.appendChild(deleteTask);
  li.appendChild(rowContainer);
  rowContainer.setAttribute("class", "rowContainer");
  textContainer.setAttribute("class", "textContainer");
  li.setAttribute("value", `${value}`);
  ol.appendChild(li);
}

function updateStorage() {
  if ((toDolist.length = 0)) {
    return localStorage.removeItem("tasks");
  }
  localStorage.tasks = toDolist[0];
  for (let index = 1; index < toDolist.length; index++) {
    const element = toDolist[index];
    localStorage.tasks = localStorage.tasks + "\n" + element;
  }
}

function deleteTask(li) {
  let newToDoList = toDolist.filter((_, ind) => li.value != ind);
  toDolist = newToDoList;
  updateStorage();
  updateView();
}

function isDone(input) {
  let checked = input.checked;
  li = input.parentElement;
  if (checked) return (li.style.textDecoration = "line-through");
  return (li.style.textDecoration = "none");
}

document.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    submit();
  }
});

function getFromStorage() {
  let tasks = localStorage.tasks;
  let count = tasks.length;
  let task = "";
  for (let i = 0; i < count; i++) {
    if (tasks[i] == "\n") {
      toDolist.push(task);
      task = "";
      continue;
    }
    task = task + tasks[i];
  }
  toDolist.push(task);
}

function afterViewLoaded() {
  getFromStorage();
  showTasks();
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function updateView() {
  let ol = document.getElementById("tasksList");
  removeAllChildNodes(ol);
  showTasks();
}

function showTasks() {
  toDolist.forEach((element, i) => {
    addToList(element, i);
  });
}
