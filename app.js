// DOM Elements
// @@shortcut: shift, alt, down arrow -> dulicate current line
const date = document.getElementById("date");
const todoInput = document.querySelector(".todo-input");
const addButton = document.querySelector(".add-button");
const todos = document.querySelector(".todos");
const filterOption = document.querySelector(".filter-todo");

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", showStorage); // listen to page load
addButton.addEventListener("click", addTodo); // listen to add todo button
todos.addEventListener("click", doneDelete); // listen to todo item
filterOption.addEventListener("change", filterTodo); // listen to filter todo select field

// FUNCTIONS

// show date
let today = new Date();
let format = { weekday: "short", month: "short", day: "numeric" };
date.innerHTML = today.toLocaleDateString("en-US", format);

// function to add todo items to todo items section
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
  // create div to contain all elements of todo item
  // const itemDiv = document.createElement("div"); // create <div> that contains todo item
  // itemDiv.classList.add("item"); // give item div class attribute of 'item' to use for styling

  // const item = document.createElement("li"); // <li> that contains todo title
  // item.classList.add("title"); // give li tag class attribute of title
  // item.innerText = itemTitle; // test value to see if function works
  // itemDiv.appendChild(item); // add <li class="title"> as child of <div class="item">

  // const doneButton = document.createElement("button"); // create <button> for mark done
  // doneButton.classList.add("done-button"); // add class attribute for styling
  // doneButton.innerHTML = '<i class="fas fa-check"></i>'; // give button value of checkbox icon
  // itemDiv.appendChild(doneButton); // add button to <div> parent element

  // const deleteButton = document.createElement("button"); // create <button> for deleting todo item
  // deleteButton.classList.add("delete-button"); // add class attribute for styling
  // deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // give button value of trash icon
  // itemDiv.appendChild(deleteButton); // add button to <div> parent element

  // // add completed item div to todos <ul>
  // todos.appendChild(itemDiv);
}

// function to add todo item elements to todo items section
function addTodo(event) {
  // console.log("addTodo executed 👍🏼") // see if event listener works
  event.preventDefault(); // prevent browser from automatically submitting so you can see the message in console

  const itemTitle = todoInput.value;

  if (todoInput.value === "") {
    // input value is none, show alert
    return alert("Add todo cannot be blank!");
  } else {
    // valid input value, add show item in todo item selection
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
  const item = button.parentElement;

  if (button.classList[0] == "done-button") {
    // item div element
    item.classList.toggle("completed"); // add completed to class name if not there
    markDone(item); // update in local storage
  }

  if (button.classList[0] == "delete-button") {
    item.remove(); // removes the item div element
    remove(item); // update in local storage
  }
}

// function to filter todo items by class attribute
function filterTodo(e) {
  const items = todos.children;
  // .childNodes gets an element's child nodes
  // e.g. <head>, <body> are child node of <html> element
  // the aim is to find all item <div>s and show them accordingly
  // completed items are in <div class="item">
  // uncompleted items are in <div class="item completed">

  const itemsArray = Array.from(items); // change items to array to loop through below

  // console.log(itemsArray) // see if event listener works

  // find which option (all/done/not done) is selected
  itemsArray.forEach(function (item) {
    switch (e.target.value) {
      // e.target.value returns the value of <option> element
      // which are either all, done, not-done
      case "all":
        item.style.display = "flex";
        break;
      case "done":
        // if class contains completed, item is done
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

// function to save done status in local storage
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
