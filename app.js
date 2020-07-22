// ==================================SELECTORS==================================
const date = document.getElementById("date");
const todoInput = document.querySelector(".todo-input");
const addButton = document.querySelector(".add-button");
const todos = document.querySelector(".todos");
const filterOption = document.querySelector(".filter-todo");
// ==================================SELECTORS==================================


// ==================================EVENT LISTENERS==================================
document.addEventListener("DOMContentLoaded", showStorage); // listen to page load
addButton.addEventListener("click", addTodo); // listen to add todo button click
todos.addEventListener("click", doneDelete); // listen to todo item div
filterOption.addEventListener("change", filterTodo); // listen to filter todo select field
// ==================================EVENT LISTENERS==================================


// ==================================FUNCTIONS==================================

// show date
let today = new Date();
let format = { weekday: "short", month: "short", day: "numeric" };
date.innerHTML = today.toLocaleDateString("en-US", format);

// function generate html for todo item
function getHTML(itemTitle, done) {
  const doneItem = `<div class="item completed">
    <li class="title">${itemTitle}</li>
    <button class="done-button"><i class="fas fa-check"></i></button>
    <button class="delete-button"><i class="fas fa-trash"></i></button>
  </div>`;

  const notDoneItem = `<div class="item">
    <li class="title">${itemTitle}</li>
    <button class="done-button"><i class="fas fa-check"></i></button>
    <button class="delete-button"><i class="fas fa-trash"></i></button>
  </div>`;

  return (done ? doneItem : notDoneItem);
}

// function to add todo item elements to todo items section
function addTodo(event) {
  event.preventDefault(); // prevent automatic default refresh

  const itemTitle = todoInput.value;

  if (todoInput.value === "") {
    // input value is none, show alert
    return alert("Add todo cannot be blank!");
  } else {
    // valid input value, add show item in todo item section
    const text = getHTML(itemTitle, false);
    todos.insertAdjacentHTML("afterbegin", text);
  }

  // add to local storage
  save(itemTitle);

  // clear input box value
  todoInput.value = "";
}

// function to mark todo item as done / delete todo item
function doneDelete(e) {
  const button = e.target;
  const item = button.parentElement; // item div element

  // mark done
  if (button.classList[0] == "done-button") {
    item.classList.toggle("completed"); // add completed to class name if not there
    markDone(item); // update state in local storage
  }

  // delete
  if (button.classList[0] == "delete-button") {
    item.remove(); // removes the item div element
    remove(item); // update deletion in local storage
  }
}

// function to filter todo items by class attribute
function filterTodo(e) {
  const items = todos.children;

  const itemsArray = Array.from(items); // change items to array to loop through

  // find which option (all/done/not done) is selected
  itemsArray.forEach(function (item) {
    switch (e.target.value) {
      // e.target.value returns the value of <option> element
      // which are either all, done, not-done
      case "all":
        item.style.display = "flex";
        break;
      case "done":
        // if class attribute contains completed, item is done
        // show in the items section
        // otherwise, do not show
        if (item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "not-done":
        // if class does not contain completed
        // item is not done
        // show in the items section
        // otherwise, do not show
        if (!item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
}

// function to check local storage
function checkStorage() {
  let vanilla_todos;

  if (localStorage.getItem("vanilla_todos") === null) {
    // nothing saved in local storage, create local storage
    vanilla_todos = [];
  } else {
    // somthing is in local storage, parse and assign to vanilla_todos
    vanilla_todos = JSON.parse(localStorage.getItem("vanilla_todos"));
  }

  return vanilla_todos;
}

// function to save item to local storage
function save(item) {
  let currentStorage = checkStorage();

  currentStorage.push({
    item: item,
    done: false,
  }); // add item to array

  localStorage.setItem("vanilla_todos", JSON.stringify(currentStorage)); // add array to local storage
}

// function to delete item from local storage
function remove(item) {
  let currentStorage = checkStorage();
  const title = item.children[0].innerText;
  const newStorage = currentStorage.filter((e) => {
    if (e.item !== title) {
      return e;
    }
  });
  localStorage.setItem("vanilla_todos", JSON.stringify(newStorage)); // add array to local storage
}

// function to update done status in local storage
function markDone(item) {
  let currentStorage = checkStorage();
  const title = item.children[0].innerText;

  const newStorage = currentStorage.filter((e) => {
    if (e.item === title) {
      if (e.done === true) {
        e.done = false;
      } else {
        e.done = true;
      }
      return e;
    } else {
      return e;
    }
  });

  localStorage.setItem("vanilla_todos", JSON.stringify(newStorage)); // add array to local storage
}

// function to show items in storage upon page load
function showStorage() {
  let currentStorage = checkStorage();

  // add items to todo items section for display
  currentStorage.forEach(function (item) {
    const text = getHTML(item.item, item.done);
    todos.insertAdjacentHTML("afterbegin", text);
  });
}
// ==================================FUNCTIONS==================================