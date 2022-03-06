const requests = {

    //// TRENDING - NETFLIX ////
    // -------------------- //

    // fetching trending data / netflix originals
    fetchTrending: `/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    fetchTrendingMovies: `/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    fetchTrendingShows: `/trending/tv/day?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_networks=213`,

    //// POPULAR ////
    // -------------------- //

    // fetching popular
    fetchPopularMovies: `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
    fetchPopularShows: `/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
    fetchPopularPeople: `/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,

    //// MOVIE DATA ////
    // -------------------- //

    // fetching movie data
    fetchTopRated: `/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=28`,
    // have to pass in &with_genres={number}
    fetchMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`,
    // 
    // fetchComedyMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=35`,
    // fetchHorrorMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=27`,
    // fetchRomanceMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10749`,
    // fetchDocumentariesMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=99`,
    // fetchDramaMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=18`,
    // fetchAdventureMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=12`,
    // fetchAnimationMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=16`,
    // fetchCrimeMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=80`,
    // fetchFamilyMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10751`,
    // fetchFantasyMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=14`,
    // fetchHistoryMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=36`,
    // fetchMusicMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10402`,
    // fetchMysteryMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=9648`,
    // fetchWarMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10752`,
    // fetchScienceFictionMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=878`,
    // fetchThrillerMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=53`,
    // fetchTVMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10770`,
    fetchNowPlaying: `movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,

    //// SHOW DATA ////
    // -------------------- //

    // fetching show data
    // fetchActionShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10759`,
    // fetchComedyShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=35`,
    // fetchRomanceShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10749`,
    // fetchDocumentariesShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=99`,
    // fetchDramaShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=18`,
    // fetchAnimationShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=16`,
    // fetchCrimeShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=80`,
    // fetchFamilyShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10751`,
    // fetchFantasyShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10765`,
    // fetchTalkShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10767`,
    // fetchRealityShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10764`,
    // fetchMysteryShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=9648`,
    // fetchWarShows: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10752`,
    fetchShows: `discover/tv?api_key=${process.env.REACT_APP_API_KEY}`,
    fetchAiringTonight: `tv/airing_today?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,

    //// ACTORS - PERSONS ////
    // -------------------- //

    // fetching actors
    fetchActors: `/person/popular?api_key=${process.env.REACT_APP_API_KEY}`,

    //// SEARCH ////
    // -------------------- //

    // searching multi; shows, movies, actors
    fetchSearchMulti: `/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=`,

    // searching movies only 
    fetchSearchMovie: `/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=`,

    // searching shows only
    fetchSearchShow: `/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=`,

    // searching person only
    fetchSearchPerson: `/search/person?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=`,

    // searching collections
    fetchSearchCollection: `/search/collection?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=`,

    // searching companies
    fetchSearchCompanies: `/search/company?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=`,

    // searching keywords
    fetchSearchKeywords: `/search/keyword?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=`,

    //// CERTIFICATIONS ////
    // -------------------- //

    // fetching movie certifications ( for explanations on things like PG )
    fetchMovieCertifications: `/certification/movie/list?api_key=${process.env.REACT_APP_API_KEY}`,

    // fetching show certifications ( for explanations on things like PG )
    fetchShowCertifications: `/certification/tv/list?api_key=${process.env.REACT_APP_API_KEY}`,


    //// NOTES ////
    // -------------------- //

    // Get /movie/{movie_id}/reviews
    // Get /tv/{tv_id}/reviews

}

export default requests;