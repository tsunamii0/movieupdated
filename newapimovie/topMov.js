const mostPopular = document.querySelector(".mostPop");
const blocker = document.querySelector(".blockBG");
const showMorePop = document.querySelector(".showMorePop");

const topTenMovies = []
const restOfTenTopMovies = []
const values = []

const baseURL = "https://api.themoviedb.org/3/movie/top_rated?api_key=ac611aa60fbb0355792b075ff8337fbe&language=en-US&page=1";

function displayMoviesNow(arrayName, shouldReset) {
  console.log(arrayName)
    if(shouldReset){
        mostPopular.innerHTML = ''
    }
  arrayName.forEach((value) => {
    const img = document.createElement("img");
    img.addEventListener("click", getMovie);
    img.src = `https://image.tmdb.org/t/p/w500/${value.poster_path}`
    mostPopular.appendChild(img);
  });
}

function getMovie() {
  blocker.style.display = "block";
  const div = document.createElement("div");
  const h1 = document.createElement("h1");
  const description = document.createElement("p");
  const x = document.createElement("p");
  x.innerHTML = "✕";
  h1.innerHTML = `${value.title}`;
  description.innerHTML = `${value.overview}`;
  div.append(x, h1,description)
  div.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${value.backdrop_path})`
  div.setAttribute("class", "movieShow");
  x.setAttribute("class", "xBTN");
  document.body.appendChild(div);
  x.addEventListener("click", hideMov);
  function hideMov() {
    div.style.display = "none";
    blocker.style.display = "none";
  }
}

const fetchMov = async () => {
  const users = await fetch(baseURL).catch((err) => console.log(err));
  const movies = await users.json().catch((err) => console.log(err));
 topTenMovies.push.apply(topTenMovies, movies.results.slice(0, 10));
  restOfTenTopMovies.push.apply(restOfTenTopMovies, movies.results.slice(10))
 displayMoviesNow(topTenMovies);
};

showMorePop.addEventListener("click", showMorePopMov);
function showMorePopMov() {
  if (showMorePop.innerHTML == "SHOW MORE") {
    showMorePop.innerHTML = "SHOW LESS";
    displayMoviesNow(topTenMovies);
  } else {
    showMorePop.innerHTML = "SHOW MORE";
    displayMoviesNow(restOfTenTopMovies, true);
  }
}

fetchMov();