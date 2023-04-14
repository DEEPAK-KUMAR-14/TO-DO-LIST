let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");
let userInputElement = document.getElementById("todoUserInput");

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

saveTodoButton.onclick = function() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

addTodoButton.onclick = function() {
  onAddTodo();
};

function getTodoListFromLocalStorage() {
  let stringifiedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringifiedTodoList);
  return parsedTodoList || [];
}

function onAddTodo() {
  let userInputValue = userInputElement.value;

  if (userInputValue === "") {
    alert("Enter Valid Text");
    return;
  }

  todosCount = todosCount + 1;

  let newTodo = {
    text: userInputValue,
    uniqueNo: todosCount,
    isChecked: false
  };
  todoList.push(newTodo);
  createAndAppendTodo(newTodo);
  userInputElement.value = "";
}

todoItemsContainer.addEventListener("click", function(event) {
  let targetElement = event.target;
  let todoId = targetElement.getAttribute("data-todo-id");
  let checkboxId = "checkbox" + todoId;
  let labelId = "label" + todoId;

  if (targetElement.type === "checkbox") {
    onTodoStatusChange(checkboxId, labelId, todoId);
  } else if (targetElement.classList.contains("delete-icon-container")) {
    onDeleteTodo("todo" + todoId);
  }
});

function onTodoStatusChange(checkboxId, labelId, todoId) {
  let checkboxElement = document.getElementById(checkboxId);
  let labelElement = document.getElementById(labelId);
  labelElement.classList.toggle("checked");

  let todoObjectIndex = todoList.findIndex(eachTodo => "todo" + eachTodo.uniqueNo === todoId);
  let todoObject = todoList[todoObjectIndex];

  todoObject.isChecked = !todoObject.isChecked;
}

function onDeleteTodo(todoId) {
  let todoElement = document.getElementById(todoId);
  todoItemsContainer.removeChild(todoElement);

  let deleteElementIndex = todoList.findIndex(eachTodo => "todo" + eachTodo.uniqueNo === todoId);
  todoList.splice(deleteElementIndex, 1);
}

function createAndAppendTodo(todo) {
  let todoId = "todo" + todo.uniqueNo
}
