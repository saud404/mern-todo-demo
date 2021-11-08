//const titleField = document.querySelector("#title");
//const btn = document.querySelector("#btn");

//btn.addEventListener("click", function () {
//  console.log(titleField.value);
//});

//2 way
const todos = [];

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
  //console.log(formValues);
  var todo = {
    title: formValues.title,
    description: formValues.description,
    createdAt: new Date().toString(),
    status: "active",
  };
  var todo = getTodo(formValues.title, formValues.description);
  title.value = null;
  description.value = null;

  todos.push(todo);
  render(todos);
});

// function makeItem(title, description, status) {
//     const outerRow = document.createElement('div');
//     outerRow.classList.add(['row', 'jumbotron','section']);

//     const titleDiv = document.createElement('div');
//     titleDiv.classList.add('col-md-2');
//     titleDive.textContent = title;

//     outerRow.appendChild(titleDiv);
// }

function getTodo(title, description) {
  return {
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

  editDiv.appendChild(statusBtn);
  row.appendChild(editDiv);
  //actionDiv.appendChild(row);

  let statusAction = document.createElement("div");
  statusAction.className = "col-md-3";

  statusBtn = document.createElement("button");
  statusBtn.className = "btn btn-danger";
  statusBtn.textContent = "Delete";

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
