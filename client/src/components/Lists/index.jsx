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
    showWatchList
}) => {


    return (
        <>
            <div className='main-list-component'>
                <div>
                    <History
                        watchedMovies={watchedMovies}
                        watchedShows={watchedShows}
                    />
                </div>
                <div>
                    <Favorites
                        favoriteMovies={favoriteMovies}
                        favoriteShows={favoriteShows}
                    />
                </div>
                <div>
                    <WatchList
                        movieWatchList={movieWatchList}
                        showWatchList={showWatchList}
                    />
                </div>
            </div>
        </>
    )
}

export default Lists;
