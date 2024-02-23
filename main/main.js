const btn = document.getElementById("todo-btn");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

const url = {
  URL: "http://localhost:3001/",
};

async function fetchData() {
  try {
    const response = await fetch(url.URL + "list");
    const data = await response.json();
    renderTodos(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();

async function addTodo() {
  const text = input.value.trim();
  if (text !== "") {
    try {
      const response = await fetch(url.URL + "list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      renderTodos(data);
      input.value = "";
    } catch {}
  }
}

btn.addEventListener("click", addTodo);

input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

function renderTodos(data) {
  list.innerHTML = ""; 
  data.forEach((todo) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = todo.text;

    
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm float-end";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));
    listItem.appendChild(deleteBtn);

    list.appendChild(listItem);
  });
}

async function deleteTodo(id) {
  try {
    await fetch(url.URL + `list/${id}`, {
      method: "DELETE",
    });
    fetchData();
  } catch (error) {
    console.error("Error deleting todo:", error);
    alert("Error deleting todo. Please try again.");
  }
}
