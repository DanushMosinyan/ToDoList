var toDolist = [];

function Submit() {
  var task = document.getElementById("task");
  if (task.value != "") {
    toDolist.push(task.value);
    addToList(task.value, toDolist.length - 1);
    task.value = null;
    updateLocal();
  }
}

function addToList(task, value) {
  var desc = document.createTextNode(task);
  var ol = document.getElementById("tasksList");
  var li = document.createElement("li");
  var div = document.createElement("div");
  var deleteTask = document.createElement("button");
  var div1 = document.createElement("div");
  deleteTask.setAttribute("onclick", "deleteTask(this.parentElement)");
  deleteTask.setAttribute("content", "delete");
  var isActive = document.createElement("input");
  isActive.setAttribute("onclick", "IsDone(this)");
  isActive.setAttribute("type", "checkbox");
  deleteTask.innerHTML = "x";
  div1.appendChild(desc);
  div.appendChild(isActive);
  div.appendChild(div1);
  li.appendChild(deleteTask);
  li.appendChild(div);
  div.setAttribute("class","div1");
  div1.setAttribute("style", "max-width: 190px;");
  li.setAttribute("value", `${value}`);
  div.setAttribute("style", "max-width: 190px;");
  ol.appendChild(li);
}

function updateLocal() {
  if (toDolist.length > 0) {
    localStorage.tasks = toDolist[0];
    for (let index = 1; index < toDolist.length; index++) {
      const element = toDolist[index];
      localStorage.tasks = localStorage.tasks + "\n" + element;
    }
  } else {
    localStorage.removeItem("tasks");
  }
}

function deleteTask(li) {
  debugger;
  var newToDoList = toDolist.filter((_, ind) => li.value != ind);
  toDolist = newToDoList;
  updateLocal();
  updateView();
}

function IsDone(input) {
  checked = input.checked;
  li = input.parentElement;
  if (checked) return (li.style.textDecoration = "line-through");
  return (li.style.textDecoration = "none");
}

document.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    Submit();
  }
});

function downloadFromLocal() {
  let tasks = localStorage.tasks;
  var count = tasks.length;
  var task = "";
  for (var i = 0; i < count; i++) {
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
  downloadFromLocal();
  showTasks();
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function updateView() {
  var ol = document.getElementById("tasksList");
  removeAllChildNodes(ol);
  showTasks();
}

function showTasks() {
  toDolist.forEach((element, i) => {
    addToList(element, i);
  });
}
