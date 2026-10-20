import { API } from "./api.js";

const UserID = new URLSearchParams(location.search).get("userId");

async function UserUploadedData() {
  const dataResp = await fetch(`${API.users}/${UserID}`);
  const getData = await dataResp.json();

  document.getElementById("name").textContent = getData.name;
  document.getElementById("email").textContent = getData.email;

  const postResp = await fetch(`${API.posts}?userId=${UserID}`);
  const postdata = await postResp.json();

  const postsHTML = postdata
    .map((post) => {
      return `
            <article>
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </article>
        `;
    })
    .join("");

  document.getElementById("posts").innerHTML = postsHTML;

  const albumResp = await fetch(`${API.albums}?userId=${UserID}`);
  const albumData = await albumResp.json();

  const albumsHTML = albumData
    .map((album) => {
      return `
            <article>
                <h3>${album.title}</h3>
            </article>
        `;
    })
    .join("");

  document.getElementById("albums").innerHTML = albumsHTML;

  const photosData = await Promise.all(
    albumData.map(async (album) => {
      const photosResp = await fetch(`${API.photos}?albumId=${album.id}`);
      return await photosResp.json();
    }),
  );

  const photosHTML = photosData
    .flat()
    .map((photo) => {
      return `
            <img src="${photo.thumbnailUrl}" alt="${photo.title}">
        `;
    })
    .join("");

  document.getElementById("photos").innerHTML = photosHTML;

  const commentsResp = await fetch(`${API.comments}`);
  const commentsData = await commentsResp.json();

  const userPostIds = postdata.map((post) => post.id);

  const commentsHTML = commentsData
    .filter((comment) => userPostIds.includes(comment.postId))
    .map((comment) => {
      return `
                <article class="item-card">
                    <h3>${comment.name}</h3>
                    <p>${comment.email}</p>
                    <p>${comment.body}</p>
                </article>
            `;
    })
    .join("");

  document.getElementById("comments").innerHTML = commentsHTML;

  const todoResp = await fetch(`${API.todos}?userId=${UserID}`);
  const todoData = await todoResp.json();

  const todosHTML = todoData
    .map((todo) => {
      let status = "Not Complete";

      if (todo.completed) {
        status = "Complete";
      }

      return `
            <article class="card">
                <p>${todo.title}</p>
                <p>${status}</p>
            </article>
        `;
    })
    .join("");

  document.getElementById("todos").innerHTML = todosHTML;
}

UserUploadedData();
