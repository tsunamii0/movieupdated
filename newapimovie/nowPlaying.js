const nowPlaying = document.querySelector(".nowPlaying");
const showMorePlaying = document.querySelector(".showMorePlaying");

const playingTenMovies = []
const restOfTenPlayingMovies = []

const baseURL0 = "https://api.themoviedb.org/3/movie/now_playing?api_key=ac611aa60fbb0355792b075ff8337fbe&language=en-US&page=1";

function displayMoviesPlaying(arrayName, shouldReset) {
  console.log(arrayName)
    if(shouldReset){
      nowPlaying.innerHTML = ''
    }
  arrayName.forEach((value) => {
    const img = document.createElement("img");
    img.addEventListener("click", getMovieNow);
    img.src = `https://image.tmdb.org/t/p/w500/${value.poster_path}`
    nowPlaying.appendChild(img);
  });
}

function getMovieNow() {
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

const fetchMov0 = async () => {
  const users = await fetch(baseURL0).catch((err) => console.log(err));
  const movies = await users.json().catch((err) => console.log(err));
  playingTenMovies.push.apply(playingTenMovies, movies.results.slice(0, 10));
  restOfTenPlayingMovies.push.apply(restOfTenPlayingMovies, movies.results.slice(10))
  displayMoviesPlaying(playingTenMovies);
};

showMorePlaying.addEventListener("click", showMorePlayingMov);
function showMorePlayingMov() {
  if (showMorePlaying.innerHTML == "SHOW MORE") {
    showMorePlaying.innerHTML = "SHOW LESS";
    displayMoviesPlaying(playingTenMovies);
  } else {
    showMorePlaying.innerHTML = "SHOW MORE";
    displayMoviesPlaying(restOfTenPlayingMovies, true);
  }
}

fetchMov0();