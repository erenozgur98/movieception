import React from "react";
import Favorites from './Favorites';
import History from './History';
import WatchList from './WatchList';
import './index.css'

const Lists = ({
    favoriteMovies,
    favoriteShows,
    watchedMovies,
    watchedShows,
    movieWatchList,
    showWatchList,
    setFavoriteMovies,
    setFavoriteShows,
    setMovieWatchList,
    setShowWatchList,
    setWatchedMovies,
    setWatchedShows,
    user
}) => {


    return (
        <>
            <div className='main-list-component'>
                {(watchedMovies || watchedShows) &&
                    <div>
                        <History
                            watchedMovies={watchedMovies}
                            watchedShows={watchedShows}
                            setWatchedMovies={setWatchedMovies}
                            setWatchedShows={setWatchedShows}
                            user={user}
                        />
                    </div>}
                {(favoriteMovies || favoriteShows) &&
                    <div>
                        <Favorites
                            favoriteMovies={favoriteMovies}
                            favoriteShows={favoriteShows}
                            setFavoriteMovies={setFavoriteMovies}
                            setFavoriteShows={setFavoriteShows}
                            user={user}
                        />
                    </div>}
                {(movieWatchList || showWatchList) &&
                    <div>
                        <WatchList
                            movieWatchList={movieWatchList}
                            showWatchList={showWatchList}
                            setMovieWatchList={setMovieWatchList}
                            setShowWatchList={setShowWatchList}
                            user={user}
                        />
                    </div>}
            </div>
        </>
    )
}

export default Lists;
