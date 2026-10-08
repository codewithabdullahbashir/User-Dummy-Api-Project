import { API } from "./api.js";
const container = document.getElementById("container");

async function getUsers() {
  const response = await fetch(API.users);
  const users = await response.json();

  let html = "";

  for (const userData of users) {
    html += `
        <div class="user-card">
          <h2>${userData.name}</h2>
          <p class="username">@${userData.username}</p>
          <p class="email">${userData.email}</p>
          <p class="phone">${userData.phone}</p>
          <button type="button" onclick="">
            View Profile
          </button>
        </div>
      `;
  }

  container.innerHTML = html;
}

getUsers();
