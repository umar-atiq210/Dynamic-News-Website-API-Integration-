const apiKey = "bd52196274a6434bade004b66291a382";

const blogContainer = document.getElementById('blog-container');
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

//display through search
searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
});

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        //image
        const img = document.createElement("img");
        img.src = article.urlToImage ? article.urlToImage : "api.jpeg";
        img.alt = article.title ? article.title : "No Title";

        //title
        const titleText = article.title ? article.title : "No Title Available";
        const truncatedTitle = titleText.length > 30 ? titleText.slice(0, 30) + "...." : titleText;
        const title = document.createElement("h2");
        title.textContent = truncatedTitle;

        //description
        const descText = article.description ? article.description : "No description available.";
        const truncatedDes = descText.length > 120 ? descText.slice(0, 120) + "...." : descText;
        const description = document.createElement("p");
        description.textContent = truncatedDes;

        //displaying content in cards
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        //OPen new window
        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });

        //displaying cards in a page
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();