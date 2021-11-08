//const titleField = document.querySelector("#title");
//const btn = document.querySelector("#btn");

//btn.addEventListener("click", function () {
//  console.log(titleField.value);
//});

//2 way
const todos = [
  {
    title: "Meeting",
    description: "There will be a meeting at 6",
    createdAt: new Date().toString(),
    status: "active",
  },
];
const todoForm = document.querySelector("#todoForm");
const btn = document.querySelector("#btn");

btn.addEventListener("click", function () {
  const form = new FormData(todoForm);
  //console.log(form);
  for (var key of form.keys()) {
    console.log(form.get(key));
  }
});

// function makeItem(title, description, status) {
//     const outerRow = document.createElement('div');
//     outerRow.classList.add(['row', 'jumbotron','section']);

//     const titleDiv = document.createElement('div');
//     titleDiv.classList.add('col-md-2');
//     titleDive.textContent = title;

//     outerRow.appendChild(titleDiv);
// }
