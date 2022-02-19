const requests = {
    
    // fetching trending data / netflix originals
    fetchTrending: `/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    fetchTrendingMovies: `/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    fetchTrendingShows: `/trending/tv/day?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_networks=213`,

    // fetching movie data
    fetchTopRated: `/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10749`,
    fetchDocumentariesMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=99`,
    fetchDramaMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=18`,
    fetchAdventureMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=12`,
    fetchAnimationMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=16`,
    fetchCrimeMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=80`,
    fetchFamilyMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10751`,
    fetchFantasyMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=14`,
    fetchHistoryMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=36`,
    fetchMusicMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10402`,
    fetchMysteryMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=9648`,
    fetchWarMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10752`,
    fetchScienceFictionMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=878`,
    fetchThrillerMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=53`,
    fetchTVMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10770`,
    
    // fetching show data
    fetchActionShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10759`,
    fetchComedyShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=35`,
    fetchRomanceShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10749`,
    fetchDocumentariesShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=99`,
    fetchDramaShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=18`,
    fetchAnimationShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=16`,
    fetchCrimeShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=80`,
    fetchFamilyShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10751`,
    fetchFantasyShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10765`,
    fetchTalkShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10767`,
    fetchRealityShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10764`,
    fetchMysteryShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=9648`,
    fetchWarShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10752`,

    // fetching actors
    fetchActors : `/person/popular?api_key=${process.env.REACT_APP_API_KEY}`,

    // searching multi; shows, movies, actors
    fetchSearchMulti: `/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=`,
    
    // searching movies only 
    fetchSearchMovie: `/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=`,
    
    // searching shows only
    fetchSearchShow: `/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=`,
}

export default requests;