let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
  let stringifiedTodoList = localStorage.getItem("todoList");
  return JSON.parse(stringifiedTodoList) || [];
}

let todoList = getTodoListFromLocalStorage();

saveTodoButton.onclick = function() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

function onAddTodo() {
  let userInputElement = document.getElementById("todoUserInput");
  let userInputValue = userInputElement.value.trim();

  if (userInputValue === "") {
    alert("Enter Valid Text");
    return;
  }

  let newTodo = {
    text: userInputValue,
    uniqueNo: todoList.length + 1,
    isChecked: false
  };
  todoList.push(newTodo);
  createAndAppendTodo(newTodo);
  userInputElement.value = "";
}

addTodoButton.onclick = function() {
  onAddTodo();
};

function onTodoStatusChange(todoId) {
  let todoObject = todoList.find(function(eachTodo) {
    return "todo" + eachTodo.uniqueNo === todoId;
  });

  todoObject.isChecked = !todoObject.isChecked;

  let labelElement = document.getElementById("label" + todoObject.uniqueNo);
  labelElement.classList.toggle("checked");
}

function onDeleteTodo(todoId) {
  let todoElement = document.getElementById(todoId);
  todoItemsContainer.removeChild(todoElement);

  let deleteElementIndex = todoList.findIndex(function(eachTodo) {
    return "todo" + eachTodo.uniqueNo === todoId;
  });

  todoList.splice(deleteElementIndex, 1);
}

function createAndAppendTodo(todo) {
  let todoId = "todo" + todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoElement.id = todoId;
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = "checkbox" + todo.uniqueNo;
  inputElement.checked = todo.isChecked;
  inputElement.classList.add("checkbox-input");
  inputElement.addEventListener("change", function() {
    onTodoStatusChange(todoId);
  });
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", "checkbox" + todo.uniqueNo);
  labelElement.id = "label" + todo.uniqueNo;
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  if (todo.isChecked === true) {
    labelElement.classList.add("checked");
  }
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
}
