const container = document.getElementById("blog-container");

function blogsAdd({ author, title, urlToImage, url }) {
  return container.insertAdjacentHTML(
    "beforeend",
    `
    
    <div class="col">
              <div class="card border-0 shadow-sm h-100">
                <img
                  src="${
                    urlToImage
                      ? urlToImage
                      : "https://www.lavanguardia.com/files/og_thumbnail/uploads/2022/07/16/62d2b9f71d1c4.jpeg"
                  }"
                  alt="${title}"
                  class="card-img-top"
                />
                <div class="card-body py-4">
                  <h5 class="card-title blog-title">
                    ${title.split(" ").slice(0, 10)}
                  </h5>
                  <p
                    class="blog-author d-flex align-items-center text-secondary"
                  >
                    <ion-icon name="person-outline" class="me-2 text-secondary"></ion-icon>${
                      author ? author : "Md Ariful Islam"
                    }
                  </p>
                  <div class="btn-groups">
                    <a
                      href="${url ? url : "https://google.com"}"
                      target="_blank"
                      class="btn btn-light btn-sm rounded-2"
                      >Read More</a
                    >
                  </div>
                </div>
              </div>
            </div>
    
    `
  );
}

async function fetchBlog() {
  const spinner = `
<div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;

  container.innerHTML = spinner;

  const data = await fetch(
    `https://newsapi.org/v2/top-headlines?category=sports&apiKey=39d57880364c4d20941e01d719ced28b`
  );
  const articles = await data.json();

  container.innerHTML = "";
  articles.articles.slice(0, 8).map((blog) => blogsAdd(blog));
}

window.addEventListener("load", fetchBlog);
