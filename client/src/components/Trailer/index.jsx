import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
// import { Modal } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

function Trailer({ videos, show, handleClose }) {
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {
        show && playTrailer()
    }, [])

    const playTrailer = () => {
        const trailerVideos = videos.filter(e => e.type === 'Trailer')
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            setTrailerUrl(trailerVideos[0]?.key);
        }
    };

    const opts = {
        // heigth: '500',
        // width: '500',
        // playerVars: {
        //     autoplay: 1,
        // }
    };

    const modalStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: '2rem',
    }

    return (
        <Modal open={show} onClose={handleClose} style={modalStyle}>
            <Box>
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            </Box>
        </Modal>
    )
}

export default Trailer;
