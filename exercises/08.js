// ## Part 2 — Modules, Array Methods, async/await, Optional Chaining
// ### Exercise 8 — async/await
// Run this file in the browser console or with Node 18+.

const BASE_URL = "https://jsonplaceholder.typicode.com";

// 1. Write an async function fetchPosts() that:
//    - fetches BASE_URL + "/posts"
//    - parses the JSON response
//    - returns the first 5 items
//    - logs each item's title

// 2. Add try/catch to fetchPosts().
//    If the fetch fails, log "Failed to load posts".

// 3. Write an async function getPostById(id) that:
//    - fetches BASE_URL + "/posts/" + id
//    - throws an Error if res.ok is false
//    - returns the parsed JSON object

// Call getPostById(1) and log the result.
// Call getPostById(99999) — what happens? Handle it.

async function fetchPosts() {
  try {
    const res = await fetch(BASE_URL + "/posts");
    const data = await res.json();
    const firstFive = data.slice(0, 5);

    firstFive.forEach(post => {
      console.log(post.title);
    })

    return firstFive;
  } catch (error) {
    console.log("Failed to load posts");
  }
}

async function getPostById(id) {
  const res = await fetch(BASE_URL + "/posts/" + id);

  if (!res.ok) {
    throw new Error(`Post ${id} not found (status ${res.status})`);
  }

  const data = await res.json();
  return data
}

async function run() {
  try {
    const post1 = await getPostById(1);
    console.log("Post 1:", post1);
  } catch (error) {
    console.log("Error fetching post 1:", error.message);
  }

  try {
    const post99999 = await getPostById(99999);
    console.log("Post 99999:", post99999);
  } catch (error) {
    console.log("Error fetching post 99999:", error.message);
  }
}

run();