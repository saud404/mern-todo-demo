//const titleField = document.querySelector("#title");
//const btn = document.querySelector("#btn");

//btn.addEventListener("click", function () {
//  console.log(titleField.value);
//});

//2 way
let todos = [];
let isEdit = false;
let editId = null;

const todoForm = document.querySelector("#todoForm");
const btn = document.querySelector("#btn");
const title = document.querySelector("#title");
const description = document.querySelector("#description");

btn.addEventListener("click", function () {
  const form = new FormData(todoForm);
  var formValues = {};
  for (var val of form.keys()) {
    formValues[val] = form.get(val);
  }

  if (!isEdit) {
    //console.log(formValues);
    // var todo = {
    //  title: formValues.title,
    //  description: formValues.description,
    //  createdAt: new Date().toString(),
    //  status: "active",
    //};
    var todo = getTodo(formValues.title, formValues.description);
    todos = [...todos, todo];
    //todos.push(todo);
  } else {
    //Edit Funcitonality
    // console.log(editId);
    var newTodos = [...todos];
    var idx = newTodos.findIndex((t) => t.id == editId);
    var t = { ...newTodos[idx] };
    t.title = formValues.title;
    t.description = formValues.description;
    newTodos[idx] = t;
    releaseEditLock();
    // console.log(newTodos);
    todos = newTodos;
  }
  title.value = null;
  description.value = null;
  render(todos);
});

function editLock(id) {
  // console.log(id);
  editId = id;
  isEdit = true;
  btn.textContent = "Save";
}
function releaseEditLock() {
  editId = null;
  isEdit = false;
  btn.textContent = "Add Todo";
}
// function makeItem(title, description, status) {
//     const outerRow = document.createElement('div');
//     outerRow.classList.add(['row', 'jumbotron','section']);

//     const titleDiv = document.createElement('div');
//     titleDiv.classList.add('col-md-2');
//     titleDive.textContent = title;

//     outerRow.appendChild(titleDiv);
// }

function getTodo(title, description) {
  var id;
  if (todos.length == 0) id = 1;
  else {
    var last = todos[todos.length - 1];
    // var last = todos.slice(-1);
    id = last.id + 1;
  }

  return {
    id,
    title,
    description,
    createdAt: new Date().toString(),
    status: "active",
  };
}
function render(todos) {
  const todo_list = document.querySelector(".todo_list");
  const items = todos.map((todo) => renderATodoItem(todo));
  //console.log(items);

  // Clear all the content
  todo_list.innerHTML = null;
  items.forEach((item) => {
    todo_list.appendChild(item);
  });
  //container.appendChild(mainRow);
}

//render();

function renderATodoItem(todo) {
  const mainRow = document.createElement("div");
  mainRow.className = "row jumbotron section";
  //console.log(mainRow);

  const titleDiv = document.createElement("div");
  const descriptionDiv = document.createElement("div");
  const statusDiv = document.createElement("div");
  titleDiv.className = "col-md-2";
  titleDiv.textContent = todo.title;
  descriptionDiv.className = "col-md-2";
  descriptionDiv.textContent = todo.description;
  statusDiv.className = "col-md-2";
  statusDiv.textContent = todo.status;

  let markedCompletedDiv = document.createElement("div");
  markedCompletedDiv.className = "col-md-2";

  let statusBtn = document.createElement("button");
  statusBtn.className = "btn btn-info";
  statusBtn.textContent = "Marked Completed";

  statusBtn.addEventListener("click", () => {
    //Mutable Way
    //var t = todos.find((t) => t.id == todo.id);
    //t.status = "Completed";
    //render(todos);

    //Imutable Way
    var newTodos = [...todos];
    var idx = newTodos.findIndex((t) => t.id == todo.id);
    var t = { ...newTodos[idx] };
    t.status = "Completed";
    newTodos[idx] = t;

    todos = newTodos;
    render(newTodos);
  });
  markedCompletedDiv.appendChild(statusBtn);

  const actionDiv = document.createElement("div");
  actionDiv.className = "col-md-4";

  const row = document.createElement("div");
  row.className = "row";

  editDiv = document.createElement("div");
  editDiv.className = "col-md-3";

  statusBtn = document.createElement("button");
  statusBtn.className = "btn btn-primary";
  statusBtn.textContent = "Edit";

  statusBtn.addEventListener("click", function () {
    title.value = todo.title;
    description.value = todo.description;
    editLock(todo.id);
  });
  editDiv.appendChild(statusBtn);
  row.appendChild(editDiv);
  //actionDiv.appendChild(row);

  let statusAction = document.createElement("div");
  statusAction.className = "col-md-3";

  statusBtn = document.createElement("button");
  statusBtn.className = "btn btn-danger";
  statusBtn.textContent = "Delete";

  statusBtn.addEventListener("click", () => {
    console.log(todo.id);
    //Mutable Way

    //IMutable way
    var newTodos = todos.filter((t) => t.id != todo.id);
    todos = newTodos;
    render(newTodos);
  });
  statusAction.appendChild(statusBtn);
  row.appendChild(statusAction);

  actionDiv.appendChild(row);

  mainRow.appendChild(titleDiv);
  mainRow.appendChild(descriptionDiv);
  mainRow.appendChild(statusDiv);
  mainRow.appendChild(markedCompletedDiv);
  mainRow.appendChild(actionDiv);
  //
  //console.log(mainRow);
  return mainRow;
}
render(todos);
