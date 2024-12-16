const addBtn = document.querySelector(".add-btn");
const input = document.querySelector(".int");
const todoLists = document.querySelector(".ul");
const completebtn = document.querySelector(".check-btn");
const deletebtn = document.querySelector(".delete-btn");
const addList = document.querySelector(".addli");
let todosArray = [];

let storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/todos")
    .then((response) => response.json())
    .then((data) => {
      todosArray = data;
      data.map((todo, index) => {
        let newTodo = document.createElement("li");
        newTodo.innerHTML = `
        <li class="addli" id="${todo.id}">
            <p class="li-p">
              <span class="task-id">${index + 1} .</span
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
          </li>`;
        todoLists.append(newTodo);
      });
    })
    .catch((error) => console.error(error));

  //   console.log(storageTodos);
  // storageTodos.map((todo) => {
  //   let newtodo = document.createElement("li");
  //   newtodo.innerHTML = `<li class="addli" id="${todo.id}">
  //           <p class="li-p">
  //             <span class="task-id">${todo.id} .</span
  //             ><span id="text">${todo.title}</span>
  //           </p>
  //           <div>
  //             <button class="check-btn">
  //               <img src="./complete.svg" id="complete" alt="" />
  //             </button>
  //             <button class="delete-btn">
  //               <img src="./delete.svg" id="delete" alt="" />
  //             </button>
  //             <button class="update-btn">
  //             <img src="./update.svg" id="update" alt="" />
  //             </button>
  //           </div>
  //         </li>
  // `;
  //   todoLists.append(newtodo);
  // });
});
input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    let formData = {
      title: input.value,
      completed: false,
    };
    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    input.value = "";
  }
});
addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (input.value.trim().length > 2) {
    let formData = {
      title: input.value,
      completed: false,
    };
    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    input.value = "";
  }
  input.value = "";
});

todoLists.addEventListener("click", (e) => {
  if (e.target.id == "complete") {
    e.target.parentElement.parentElement.parentElement.classList.toggle(
      "done-task"
    );
  }
  if (e.target.id == "delete") {
    fetch(
      `http://localhost:3000/todos/${e.target.parentElement.parentElement.parentElement.id}`,
      {
        method: "DELETE",
      }
    );
    console.log(e.target.parentElement.parentElement.parentElement.id);
  }
  if (e.target.id == "update") {
    e.preventDefault();
    let targetTodo = {};
    fetch(
      `http://localhost:3000/todos/${e.target.parentElement.parentElement.parentElement.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        targetTodo = data;
        input.focus();
        input.value = targetTodo.title;
        // console.log(targetTodo);
      });

    let updateFormData = {
      id: e.target.parentElement.parentElement.parentElement.id,
      title: input.value,
    };
    fetch(
      `http://localhost:3000/todos/${e.target.parentElement.parentElement.parentElement.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Ma'lumot turi JSON ekanligini aytadi
        },
        body: JSON.stringify(updateFormData),
      }
    );
  }
});
