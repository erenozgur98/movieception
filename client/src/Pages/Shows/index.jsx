import React from 'react'
import Row from '../../components/Row';
import requests from '../../components/Requests';

function Shows() {
    return (
        <div className='show'>
            <Row fetchUrl={requests.fetchTrendingShows} title='Trending Shows' />
            <Row fetchUrl={requests.fetchActionShows} title='Action Shows' />
            <Row fetchUrl={requests.fetchComedyShows} title='Comedy Shows' />
            <Row fetchUrl={requests.fetchRomanceShows} title='Romance Shows' />
            <Row fetchUrl={requests.fetchDocumentariesShows} title='Documentary Shows' />
            <Row fetchUrl={requests.fetchDramaShows} title='Drama Shows' />
            <Row fetchUrl={requests.fetchAnimationShows} title='Animation Shows' />
            <Row fetchUrl={requests.fetchCrimeShows} title='Crime Shows' />
            <Row fetchUrl={requests.fetchFamilyShows} title='Family Shows' />
            <Row fetchUrl={requests.fetchFantasyShows} title='Fantasy Shows' />
            <Row fetchUrl={requests.fetchTalkShows} title='Talk Shows' />
            <Row fetchUrl={requests.fetchRealityShows} title='Reality Shows' />
            <Row fetchUrl={requests.fetchMysteryShows} title='Mystery Shows' />
            <Row fetchUrl={requests.fetchWarShows} title='War Shows' />
        </div>
    )
}

export default Shows
