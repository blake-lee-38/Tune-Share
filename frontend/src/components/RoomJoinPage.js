import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";

const WhiteTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
})(Typography);


function RoomJoinPage() {
    const [roomCode, setRoomCode] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();


    const handleTextFieldChange = event => {
        setRoomCode(event.target.value);
    }

    const handleRoomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({
                code: roomCode
            })
        };

        fetch('api/join-room', requestOptions)
            .then((response) => {
                if (response.ok){
                    navigate('/room/' + roomCode);
                } else {
                    setError(true);
                    setErrorMsg("Room Not Found");
                }
            }).catch((error) => { console.log(error); });
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <WhiteTypography variant="h4" component="h4">
                    Join a Room
                </WhiteTypography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField error={error} label="Room Code" placeholder="Enter a Room Code" 
                            value={roomCode} helperText={errorMsg} variant="filled" onChange={handleTextFieldChange} />
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={handleRoomButtonPressed}>Enter Room</Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" to="/" component={Link}>Back To Home</Button>
            </Grid>


        </Grid>
    );

}

export default RoomJoinPage;