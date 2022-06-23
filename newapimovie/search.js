const search = document.querySelector('.search')
const results = document.querySelector('.searchRes')

search.addEventListener('keydown', searchFunc)

const txtInputValue = search.value

function searchFunc(){
    fetchMovie(search.value)
}



function showResutls(arrayName, shouldReset) {
    if(shouldReset){
        results.innerHTML = ''
    }
    arrayName.forEach((value) => {
        const img = document.createElement("img");
        img.addEventListener("click", getMovie);
        function getMovie() {
          blocker.style.display = "block";
          const div = document.createElement("div");
          const h1 = document.createElement("h1");
          const description = document.createElement("p");
          const x = document.createElement("p");
          x.innerHTML = "✕";
          h1.innerHTML = `${value.title}`;
          description.innerHTML = `${value.overview}`;
          div.appendChild(x);
          div.appendChild(h1);
          div.appendChild(description);
          div.style.backgroundImage =
            "url(" + "https://image.tmdb.org/t/p/w500/" + value.backdrop_path + ")";
          div.setAttribute("class", "movieShow");
          x.setAttribute("class", "xBTN");
          document.body.appendChild(div);
          x.addEventListener("click", hideMov);
          function hideMov() {
            div.style.display = "none";
            blocker.style.display = "none";
          }
        }
        img.src = "https://image.tmdb.org/t/p/w500/" + value.poster_path;
        results.appendChild(img);
      });
}



const fetchMovie = async (searchInput) => {
    const users = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=ac611aa60fbb0355792b075ff8337fbe&language=en-US&query=${searchInput}&page=1&include_adult=true`)
    .catch(err => console.log(err))
    console.log(users)
    const movies = await users.json().catch(err => console.log(err))
    const topEight = movies.results.slice(0, 10);
    showResutls(topEight)
}


