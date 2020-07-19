// SELECTORS
// @@shortcut: shift, alt, down arrow -> dulicate current line
const todoInput = document.querySelector(".todo-input");
const addButton = document.querySelector(".add-button");
const todos = document.querySelector(".todos");


// EVENT LISTENERS
// listen to add todo button
addButton.addEventListener("click", addTodo);
todos.addEventListener("click", doneDelete);


// FUNCTIONS
// function to create todo item elements
function addTodo(event) {
    
    // console.log("addTodo executed 👍🏼") // see if event listener works
    event.preventDefault(); // prevent browser from automatically submitting so you can see the message in console

    if(todoInput.value === ""){
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

// function to mark todo item as done
function doneDelete(e) {
    const item = e.target;

    if (item.classList[0] == "done-button") {
        const title = item.parentElement;
        title.classList.toggle("completed");
    }

    if (item.classList[0] == "delete-button") {
        const title = item.parentElement;
        title.remove();
    }
}
