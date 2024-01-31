(() => {
    const characterBox = document.querySelector("#character-box");
    const baseUrl = `https://swapi.dev/api`;
    const movieTitle = document.querySelector("#movie-title");
    const openingCrawl = document.querySelector("#opening-crawl");
    const moviePoster = document.querySelector("#movie-poster");


    // Function to fetch characters
    function getCharacters() {
        fetch(`${baseUrl}/people`)
            .then(response => response.json())
            .then(function(response) {
                // Clear existing content
                characterBox.innerHTML = "";
                // Iterate through characters and create list items
                response.results.forEach(character => {
                    const li = document.createElement("li");
                    const a = document.createElement("a");
                    a.textContent = character.name;
                    a.href = "#";
                    a.dataset.link = character.films[0]; // Storing movie URL as dataset
                    a.dataset.poster = `${character.name}.jpeg`; // Storing poster name as dataset
                    a.addEventListener("click", function(event) {
                        event.preventDefault();
                        getCharacterInfo(event); // Pass event to function
                    });
                    li.appendChild(a);
                    characterBox.appendChild(li);
                });
            })
            .catch(err => {
                console.log(err);
                // Handle error
            });
    }

    // Function to fetch character info
    function getCharacterInfo(event) {
        const filmUrl = event.target.dataset.link; // Use stored film URL
        const posterName = event.target.dataset.poster; // Use stored poster name

        fetch(filmUrl)
            .then(response => response.json())
            .then(function(film) {
                movieTitle.textContent = film.title;
                openingCrawl.textContent = film.opening_crawl;
                moviePoster.src = `images/${posterName}`; // Use stored poster name
            })
            .catch(error => {
                console.log(error);
                // Handle error
            });
    }

    // Initial call to fetch characters
    getCharacters();



    // Hambugermenu
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    hamburger.addEventListener('click', () => {
    nav.classList.toggle('show-nav');
  });

})();
