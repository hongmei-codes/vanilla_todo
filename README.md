# ✅ Simple Todo App

![GitHub watchers](https://img.shields.io/github/watchers/hongmei-codes/vanilla_todo?label=Watch&style=social)
![GitHub forks](https://img.shields.io/github/forks/hongmei-codes/vanilla_todo?label=Fork&style=social)
![GitHub forks](https://img.shields.io/github/stars/hongmei-codes/vanilla_todo?label=Star&style=social)

This is a simple todo web app built with vanilla JavaScript. No frameworks were used to create this app. The UI is simple and easily understood. Read on to find out more about how the app works and how the app was built. Feel free to try out a demo of this app.

![Website](https://img.shields.io/website?down_color=red&down_message=offline&label=View%20Demo&style=for-the-badge&up_color=b&up_message=online&url=https%3A%2F%2Fhongmei-codes.github.io%2Fvanilla_todo%2F)

# Features

## Add a todo item to todo list

{add image here}

Add item to your todo list by clicking the add button.

## Mark todo item as done

{add image here}

Mark todo item as done by clicking the green check mark.

## Delete todo item from todo list

{add image here}

Remove todo item from list by clicking the trash can icon.

## Filter todo items by category

{add image here}

Filter your todo items by their completion status.

---

# Building a todo app using vanilla JavaScript

## Add todo items function

### HTML Elements

```html
<form>
  <input type="text" class="todo-input" placeholder="Add todo..." />
  <button class="add-button">
    <i class="fas fa-plus-circle"></i>
  </button>
</form>
```

### Styling

```css
form input,
form button {
  padding: 0.5rem;
  font-size: 1.3rem;
  border: none;
  background: white;
}
form input {
  border-radius: 5px 0px 0px 5px;
}
/* adding styles to form button */
form button {
  color: purple;
  background: white;
  cursor: pointer;
  transition: all 0.3 ease;
  border-radius: 0px 5px 5px 0px;
}
form button:hover {
  background: purple;
  color: white;
}
```

### Javascript

```javascript
// Grab DOM Element
const addButton = document.querySelector(".add-button");

// Add Event Listener
addButton.addEventListener("click", addTodo);

// Create Add Todo Item Function
function addTodo(event) {
  // console.log("addTodo executed 👍🏼") // see if event listener works
  event.preventDefault(); // prevent browser from automatically submitting so you can see the message in console

  if (todoInput.value === "") {
    return alert("Add todo cannot be blank!");
  }

  // create div to contain all elements of todo item
  const itemDiv = document.createElement("div"); // create <div> that contains todo item
  itemDiv.classList.add("item"); // give item div class attribute of 'item' to use for styling

  const item = document.createElement("li"); // <li> that contains todo title
  item.classList.add("title"); // give li tag class attribute of title
  item.innerText = todoInput.value; // test value to see if function works
  itemDiv.appendChild(item); // add <li class="title"> as child of <div class="item">

  const doneButton = document.createElement("button"); // create <button> for mark done
  doneButton.classList.add("done-button"); // add class attribute for styling
  doneButton.innerHTML = '<i class="fas fa-check"></i>'; // give button value of checkbox icon
  itemDiv.appendChild(doneButton); // add button to <div> parent element

  const deleteButton = document.createElement("button"); // create <button> for deleting todo item
  deleteButton.classList.add("delete-button"); // add class attribute for styling
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // give button value of trash icon
  itemDiv.appendChild(deleteButton); // add button to <div> parent element

  // add completed item div to todos <ul>
  todos.appendChild(itemDiv);

  // clear input box value
  todoInput.value = "";
}
```
