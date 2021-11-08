//const titleField = document.querySelector("#title");
//const btn = document.querySelector("#btn");

//btn.addEventListener("click", function () {
//  console.log(titleField.value);
//});

//2 way

const todoForm = document.querySelector("#todoForm");
const btn = document.querySelector("#btn");

btn.addEventListener("click", function () {
  const form = new FormData(todoForm);
  //console.log(form);
  for (var key of form.keys()) {
    console.log(form.get(key));
  }
});
