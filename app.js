const list = document.querySelector(".list");
const filter = document.querySelector(".search-input");
let USERS = [];

filter.addEventListener("input", (event) => {
  const value = event.target.value.toLowerCase();
  const filteredUsers = USERS.filter((user) =>
    user.name.toLowerCase().includes(value),
  );
  render(filteredUsers);
});

async function start() {
  list.innerHTML = `<div class="list-state loading">Loading</div>`;
  try {
    const resp = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await resp.json();
    setTimeout(() => {
      USERS = data;
      render(data);
    }, 2000);
  } catch (err) {
    list.innerHTML = `<div class="list-state error">${err.message}</div>`;
  }
}

function render(users = []) {
  if (users.length === 0) {
    list.innerHTML = `<div class="list-state empty">No matched users!</div>`;
  } else {
    const html = users.map(toHTML).join("");
    list.innerHTML = html;
  }
}

function toHTML(user) {
  return `
        <li class="list-item">${user.name}</li>
    `;
}

start();
