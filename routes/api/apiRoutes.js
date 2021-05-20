let baseUrl = 'https://api.themoviedb.org/3/';
let apiKey = 'af737f76cdba5b7435e17cc94568c07d';
let TV = 'scrubs';
let MOVIE = 'Avengers'
let TVurl = `${baseUrl}search/tv/?api_key=${apiKey}&query=${TV}`;
let MOVIEurl = `${baseUrl}search/movie/?api_key=${apiKey}&query=${MOVIE}`;
let IMGurl = `${baseUrl}configuration?api_key=${apiKey}`

// to get to the poster sizes use IMGurl

// to use images use => secure base url(can get from IMGurl) + poster size (eg w500 (width 500)) + poster_path (from the url itself) ==> https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg

fetch(TVurl)
    .then(res => res.json())
    .then(data => console.log(data))

