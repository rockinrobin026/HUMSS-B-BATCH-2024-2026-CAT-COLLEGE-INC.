async function createPost() {
  const username = document.getElementById("username").value;
  const content = document.getElementById("content").value;

  await fetch("/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, content })
  });

  loadPosts();
}

async function loadPosts() {
  const res = await fetch("/posts");
  const posts = await res.json();
  const container = document.getElementById("posts");
  container.innerHTML = "";

  posts.forEach(p => {
    container.innerHTML += `
      <div>
        <b>${p.username}</b>
        <p>${p.content}</p>
      </div>
    `;
  });
}

loadPosts();
