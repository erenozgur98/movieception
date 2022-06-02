import React, { useEffect, useState } from "react";
import API from '../../utils/API'
import { useSnackbar } from 'notistack'
import Checkbox from '@mui/material/Checkbox';
import './icons.css'

function CheckboxIcon({ user, show, labelChecked, labelNotChecked, episodeId, seasonId }) {
    const [watched, setWatched] = useState([]);
    const [checked, setChecked] = useState();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (user?.username) {
            API.getAllEpisodes(user.username)
                .then(res => {
                    setWatched(res.data)
                })
        }
    }, [])

    useEffect(() => {
        if (user?.username) {
            if (watched?.Episodes?.includes(episodeId)) {
                setChecked(true)
            } else {
                setChecked(false)
            }
        }
    }, [watched])

    const handleWatched = () => {
        if (user?.username) {
            if (checked) {
                API.removeEpisodeFromWatched(user.username, show.id, seasonId, episodeId).then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        setChecked(false)
                        enqueueSnackbar('Successfully removed from your watched episodes!', {
                            variant: 'success'
                        })
                    } else {
                        enqueueSnackbar('Something went wrong, please try again later', {
                            variant: 'error'
                        })
                    }
                })
            } else {
                API.addEpisodetoWatched(user.username, show.id, seasonId, episodeId).then(res => {
                    if (res.status === 200) {
                        setChecked(true)
                        enqueueSnackbar('Successfully added to your watched episodes!', {
                            variant: 'success'
                        })
                    } else {
                        enqueueSnackbar('Something went wrong, please try again later', {
                            variant: 'error'
                        })
                    }
                })
            }
        } else {
            enqueueSnackbar('You are not logged in!', {
                variant: 'warning'
            })
        }
    }

    return (
        <>
            {user?.username &&
                <div className='checkbox-icon'>
                    <div className='checkbox-icon-animate'>
                        <div className='episode-checkbox'>
                            <Checkbox
                                checked={checked ?? " "}
                                onClick={() => handleWatched()}
                            />
                            <div>{checked ? labelChecked : labelNotChecked}</div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default CheckboxIcon;
