const url = "https://jsonplaceholder.typicode.com/todos";
const container = document.getElementById("todo-container");

const indianTasks = [
  "Walk for 10 minutes",
  "Drink water",
  "Read a book",
  "Study JavaScript",
  "Complete assignment",
  "Clean the floor",
  "Dust the room",
  "Do yoga",
  "Prepare lunch",
  "Buy vegetables",
  "Call a friend",
  "Organize desk",
  "Wash clothes",
  "Make tea",
  "Water plants",
  "Revise today's lesson",
  "Fold laundry",
  "Write notes",
  "Check emails",
  "Plan tomorrow's tasks"
];

function fetchAndStore() {
  fetch(url)
    .then(res => res.json())
    .then(() => {
      const simpleTodos = indianTasks.map((task, index) => ({
        id: index + 1,
        title: task,
        completed: false
      }));

      localStorage.setItem("todos", JSON.stringify(simpleTodos));
      renderTodos();
    });
}


function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function renderTodos() {
  const todos = getTodos();
  container.innerHTML = "";

  if (todos.length === 0) {
    container.innerHTML = `<p class="empty">No Todos Available</p>`;
    return;
  }

  todos.forEach(todo => {
    const div = document.createElement("div");
    div.className = "todo-item";

    const title = document.createElement("span");
    title.textContent = todo.title;
    if (todo.completed) title.classList.add("completed");

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Delete";
    btnDelete.onclick = () => deleteTodo(todo.id);

    const btnToggle = document.createElement("button");
    btnToggle.textContent = "Toggle Complete";
    btnToggle.onclick = () => toggleComplete(todo.id);

    div.appendChild(title);
    div.appendChild(btnToggle);
    div.appendChild(btnDelete);

    container.appendChild(div);
  });
}

function deleteTodo(id) {
  const todos = getTodos();
  const updated = todos.filter(todo => todo.id !== id);

  localStorage.setItem("todos", JSON.stringify(updated));
  renderTodos();
}

function toggleComplete(id) {
  const todos = getTodos();
  const updated = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );

  localStorage.setItem("todos", JSON.stringify(updated));
  renderTodos();
}

fetchAndStore();
