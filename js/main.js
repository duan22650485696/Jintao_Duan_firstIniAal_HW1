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
                    a.dataset.link = character.films[0];
                    a.dataset.poster = `${character.name}.jpeg`; 

                    a.addEventListener("click", function(event) {
                        event.preventDefault();
                        getCharacterInfo(event);
                    });
                    li.appendChild(a);
                    characterBox.appendChild(li);
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    // Function to fetch character info
    function getCharacterInfo(event) {
        const filmUrl = event.target.dataset.link; 
        const posterName = event.target.dataset.poster;
        fetch(filmUrl)
            .then(response => response.json())
            .then(function(film) {
                movieTitle.textContent = film.title;
                openingCrawl.textContent = film.opening_crawl;
                moviePoster.src = `images/${posterName}`;
            })
            .catch(error => {
                console.log(error);
            });
    }
    getCharacters();

    
    // Hambugermenu
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    hamburger.addEventListener('click', () => {
    nav.classList.toggle('show-nav');
  });

})();
