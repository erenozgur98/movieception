import React from 'react'
import Row from '../../components/Row';
import requests from '../../components/Requests';

function Discover() {
    return (
        <div className="discover">
            {/* <Row fetchUrl={requests.fetchTopRated} title='Top Rated Movies' /> */}
            {/* <Row fetchUrl={requests.fetchTrendingMovies} title='Trending Movies' /> */}
            {/* <Row fetchUrl={requests.fetchTrendingShows} title='Trending Shows' /> */}
            <Row fetchUrl={requests.fetchTrending} />
            {/* <Row fetchUrl={requests.fetchActionMovies} title='Action Movies' /> */}
            {/* <Row fetchUrl={requests.fetchComedyMovies} title='Comedy Movies' /> */}
            {/* <Row fetchUrl={requests.fetchHorrorMovies} title='Horror Movies' /> */}
            {/* <Row fetchUrl={requests.fetchRomanceMovies} title='Romance Movies' /> */}
            {/* <Row fetchUrl={requests.fetchDramaMovies} title='Drama Movies' /> */}
            {/* <Row fetchUrl={requests.fetchAdventureMovies} title='Adventure Movies' /> */}
            {/* <Row fetchUrl={requests.fetchAnimationMovies} title='Animation Movies' /> */}
            {/* <Row fetchUrl={requests.fetchCrimeMovies} title='Crime Movies' /> */}
            {/* <Row fetchUrl={requests.fetchFamilyMovies} title='Family Movies' /> */}
            {/* <Row fetchUrl={requests.fetchFantasyMovies} title='Fantasy Movies' /> */}
            {/* <Row fetchUrl={requests.fetchHistoryMovies} title='History Movies' /> */}
            {/* <Row fetchUrl={requests.fetchMusicMovies} title='Music Movies' /> */}
            {/* <Row fetchUrl={requests.fetchMysteryMovies} title='Mystery Movies' /> */}
            {/* <Row fetchUrl={requests.fetchWarMovies} title='War Movies' /> */}
            {/* <Row fetchUrl={requests.fetchDocumentariesMovies} title='Documentary Movies' /> */}
        </div>
    )
};

export default Discover;


