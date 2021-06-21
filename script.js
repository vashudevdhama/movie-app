const API_KEY = '052263d328662dceb5e8c01295c12cc1'
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`
const IMG_PATH = 'https://image.tmdb.org/t/p/w500'
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?&api_key=052263d328662dceb5e8c01295c12cc1&query='

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

async function getMovies(url){
  console.log(url);
  const res = await fetch(url)
  const data = await res.json()
  renderMovies(data.results);
}

function renderMovies(movies){
  main.innerHTML = '';
  
  movies.forEach((movie)=>{
    const { title, poster_path, vote_average, overview} = movie;
    
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie')
    movieEl.innerHTML = `
        <img src="${IMG_PATH+poster_path}" alt="${title}">
        <div class="movie-info">  
          <h3>${title}</h3>
          <span class="${getVoteClass(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
    `
    
    main.appendChild(movieEl);
  })
  
}

function getVoteClass(vote){
  if(vote >= 8){
    return 'green'
  } else if(vote >= 5){
    return 'orange'
  } else{
    return 'red'
  }
}

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const searchTerm = search.value
  if(searchTerm){
    getMovies(SEARCH_URL+searchTerm);
    search.value= '';
  } else{
    window.location.reload();
  }
})