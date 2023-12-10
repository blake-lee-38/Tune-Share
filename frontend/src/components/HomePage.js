import React, { useEffect, useState } from "react";
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import { BrowserRouter as Router, Routes, Route, Link, Redirect, Navigate } from "react-router-dom";
import Room from './Room';
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core'
import Info from './Info'
import { withStyles } from "@material-ui/core/styles";

const WhiteTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
})(Typography);

function HomePage() {
    const [roomCode, setRoomCode] = useState(null);

    useEffect(() => {
        async function getRoomInfo(){
            fetch('/api/user-in-room')
            .then((response) => response.json())
                .then((data) => {setRoomCode(data.code)});
        }
        
        getRoomInfo();
    }, []);

    const renderHomePage = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <WhiteTypography variant="h3" component="h3" color="#00ff00">House Party</WhiteTypography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to='/join' component={ Link }>Join a Room</Button>
                        <Button color="default" to='/info' component={ Link }>Info</Button>
                        <Button color="secondary" to='/create' component={ Link }>Create a Room</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }

    const clearRoomCode = () => {
        setRoomCode(null);
    }

    return (
        <Router>
            <Routes>
                <Route path='/' element={roomCode ? (<Navigate replace to={`/room/${roomCode}`}/>) : renderHomePage()} />
                <Route path='/join' element={<RoomJoinPage />}/>
                <Route path='/info' element={<Info />}/>
                <Route path='/create' element={<CreateRoomPage />}/>
                <Route path='/room/:roomCode' element={<Room leaveRoomCallback={clearRoomCode} />} />
            </Routes> 
        </Router>
    );
}

export default HomePage;