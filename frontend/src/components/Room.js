//Page seen once in room
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Button, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';
import { withStyles } from "@material-ui/core/styles";

const WhiteTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
})(Typography);


function Room(props){
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [roomCode, setRoomCode] = useState(useParams().roomCode);
    const navigate = useNavigate();
    const [showSettings, setShowSettings] = useState(false);
    const [spotifyAuth, setSpotifyAuth] = useState(false);
    const [song, setSong] = useState({});
    const [constructorRan, setConstructorRan] = useState(false);

    useLayoutEffect(() => {
        if(!constructorRan){
        fetch('/api/get-room' + '?code=' + roomCode)
            .then((response) => {
                if(!response.ok){
                    props.leaveRoomCallback();
                    navigate('/');
                }
                return response.json();
            }).then((data) => {
                setVotesToSkip(data.votes_to_skip);
                setGuestCanPause(data.guest_can_pause);
                setIsHost(data.is_host);
                if(isHost){
                    authenticateSpotify();
                }
        });
    }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            getCurrentSong();
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    const authenticateSpotify = () => {
        fetch('/spotify/is-authenticated')
            .then((response) => response.json())
            .then((data) => {
                setSpotifyAuth(data.status);
                if(!data.status){
                    fetch('/spotify/get-auth-url').then((response) => response.json()).then((data) => {
                        window.location.replace(data.url);
                    });
                }
            });
        setConstructorRan(true);
    }

    const getCurrentSong = () => {
        fetch('/spotify/current-song')
            .then((response) => {
                if (!response.ok){
                    return {};
                } else {
                    return response.json();
                }
            }).then((data) => {
                setSong(data);
            });
    }

    const leaveButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
        };
        fetch('/api/leave-room', requestOptions)
            .then((_response) => {
                props.leaveRoomCallback();
                navigate('/');
            });
    }

    const renderSettingsButton = () => {
        return (
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={() => setShowSettings(true)}>Settings</Button>
            </Grid>
        );
    }

    const renderSettings = () => {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage update={true} votesToSkip={votesToSkip} guestCanPause={guestCanPause} roomCode={roomCode} />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={() => setShowSettings(false)}>Close</Button>
                </Grid>
            </Grid>
        );
    }
    
    if(showSettings){
        return renderSettings();
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} align="center">
                <WhiteTypography variant="h4" component="h4">Code: {roomCode}</WhiteTypography>
            </Grid>
            <MusicPlayer {...song} />
            {isHost ? renderSettingsButton() : null}
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>Leave Room</Button>
            </Grid>
        </Grid>
    );
}

export default Room;