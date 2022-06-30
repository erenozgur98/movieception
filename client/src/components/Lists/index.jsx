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
                <div>
                    <History
                        watchedMovies={watchedMovies}
                        watchedShows={watchedShows}
                        setWatchedMovies={setWatchedMovies}
                        setWatchedShows={setWatchedShows}
                        user={user}
                    />
                </div>
                <div>
                    <Favorites
                        favoriteMovies={favoriteMovies}
                        favoriteShows={favoriteShows}
                        setFavoriteMovies={setFavoriteMovies}
                        setFavoriteShows={setFavoriteShows}
                        user={user}
                    />
                </div>
                <div>
                    <WatchList
                        movieWatchList={movieWatchList}
                        showWatchList={showWatchList}
                        setMovieWatchList={setMovieWatchList}
                        setShowWatchList={setShowWatchList}
                        user={user}
                    />
                </div>
            </div>
        </>
    )
}

export default Lists;
