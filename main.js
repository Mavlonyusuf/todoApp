const addBtn = document.querySelector(".add-btn");
const input = document.querySelector(".int");
const todoLists = document.querySelector(".ul");
const completebtn = document.querySelector(".check-btn");
const deletebtn = document.querySelector(".delete-btn");
const addList = document.querySelector(".addli");
let todosArray = JSON.parse(localStorage.getItem("todos")) || [];

let storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
addEventListener("DOMContentLoaded", () => {
  //   console.log(storageTodos);

  storageTodos.map((todo) => {
    let newtodo = document.createElement("li");
    newtodo.innerHTML = `<li class="addli" id="${todo.id}">
            <p class="li-p">
              <span class="task-id">${todo.id} .</span
              ><span id="text">${todo.title}</span>
            </p>
            <div>
              <button class="check-btn">
                <img src="./complete.svg" id="complete" alt="" />
              </button>
              <button class="delete-btn">
                <img src="./delete.svg" id="delete" alt="" />
              </button>
              <button class="update-btn">
              <img src="./update.svg" id="update" alt="" />
              </button>
            </div>
          </li>
  `;
    todoLists.append(newtodo);
  });
});
input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    const todoList = document.createElement("li");
    todoList.innerHTML = `
    <li class="addli" id="${todosArray.length + 1}">
    <p class="li-p" >
              <span class="task-id">${todosArray.length + 1} .</span
              ><span id="text">${input.value}</span>
              </p>
              <div>
              <button class="check-btn">
              <img src="./complete.svg" id="complete" alt="" />
              </button>
              <button class="delete-btn">
              <img src="./delete.svg" id="delete" alt="" />
              </button>
              <button class="update-btn">
              <img src="./update.svg" id="delete" alt="" />
              </button>
              </div>
              </li>
              `;
    todosArray.push({ id: todosArray.length + 1, title: input.value });
    todoLists.append(todoList);
    localStorage.setItem("todos", JSON.stringify(todosArray));
    input.value = "";
  }
});
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  todosArray.push({ id: todosArray.length + 1, title: input.value });

  if (input.value.trim().length > 2) {
    const todoList = document.createElement("li");
    todoList.innerHTML = `
    <li class="addli" id="${todosArray.length + 1}">
    <p class="li-p" >
              <span class="task-id">${todosArray.length + 1} .</span
              ><span id="text">${input.value}</span>
              </p>
              <div>
              <button class="check-btn">
              <img src="./complete.svg" id="complete" alt="" />
              </button>
              <button class="delete-btn">
              <img src="./delete.svg" id="delete" alt="" />
              </button>
              <button class="update-btn">
              <img src="./update.svg" id="update" alt="" />
              </button>
              </div>
              </li>
              `;
    todoLists.append(todoList);
    localStorage.setItem("todos", JSON.stringify(todosArray));
    input.value = "";
  }
  input.value = "";
});
// completebtn.addEventListener("click", (e) => {
//   e.stopPropagation();

//   console.log("complete btn clicked");
// });
todoLists.addEventListener("click", (e) => {
  if (e.target.id == "complete") {
    e.target.parentElement.parentElement.parentElement.classList.toggle(
      "done-task"
    );
  }
  if (e.target.id == "delete") {
    todosArray = todosArray.filter(
      (todo) => todo.id != e.target.parentElement.parentElement.parentElement.id
    );
    todosArray = todosArray.map((todo, index) => ({
      ...todo,
      id: index + 1,
    }));

    localStorage.setItem("todos", JSON.stringify(todosArray));
    e.target.parentElement.parentElement.parentElement.remove();
  }
  if (e.target.id == "update") {
    let targetTodo = todosArray.find(
      (todo) => todo.id == e.target.parentElement.parentElement.parentElement.id
    );
    input.focus();
    input.value = targetTodo.title;
    e.target.parentElement.parentElement.parentElement.remove();
    todosArray = todosArray.filter(
      (todo) => todo.id != e.target.parentElement.parentElement.parentElement.id
    );
    todosArray = todosArray.map((todo, index) => ({
      ...todo,
      id: index + 1,
    }));

    localStorage.setItem("todos", JSON.stringify(todosArray));
  }
});
