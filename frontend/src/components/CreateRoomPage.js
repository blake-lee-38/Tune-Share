import React, { Component } from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { Link } from 'react-router-dom';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Collapse } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { withStyles } from "@material-ui/core/styles";

const WhiteTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
})(Typography);


function CreateRoomPage(props){
    const [guestCanPause, setGuestCanPause] = useState(props.guestCanPause === undefined ? true : props.guestCanPause);
    const [votesToSkip, setVotesToSkip] = useState(props.votesToSkip === undefined ? 2 : props.votesToSkip);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();
    const roomCode = props.roomCode === undefined ? null : props.roomCode;
    const update = props.update === undefined ? false : props.update;

    const handleGuestCanPauseChange = event => {
        setGuestCanPause(event.target.value === 'true' ? true : false);
    }

    const handleVotesChange = event => {
        setVotesToSkip(event.target.value);
    }

    const handleRoomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
            }),
        };
        fetch('/api/create-room', requestOptions)
            .then((response) => response.json())
                .then((data) => navigate('/room/' + data.code));
    }

    const handleUpdateButtonPressed = () => {
        const requestOptions = {
            method: "PATCH",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
                code: roomCode,
            }),
        };
        fetch('/api/update-room', requestOptions)
            .then((response) => {
                if (response.ok){
                    setSuccessMsg("Room Updated Successfully!");
                } else {
                    setErrorMsg("Error Updating Room...");
                }
            });
    }
    
    const renderCreateButtons = () => {
        return (<>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={handleRoomButtonPressed}>Create a Room</Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
            </Grid>
        </>);
    }

    const renderUpdateButtons = () => {
        return (
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={handleUpdateButtonPressed}>Update Room</Button>
            </Grid>
        );
    }


    const title = update ? "Update Room" : "Create A Room";
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Collapse in={ errorMsg != '' || successMsg != ''}>
                    {successMsg != '' ? (<Alert severity="success" onClose={() => {setSuccessMsg('')}}>{successMsg}</Alert>)
                                        : (<Alert severity="error" onClose={() => {setErrorMsg('')}}>{errorMsg}</Alert>)}
                </Collapse>
            </Grid>
            <Grid item xs={12} align="center">
                <WhiteTypography component="h4" variant="h4">
                    { title }
                </WhiteTypography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align='center'>
                            Guest Control of Playback State
                        </div>
                    </FormHelperText>
                    <RadioGroup row defaultValue={guestCanPause.toString()} onChange={handleGuestCanPauseChange}>
                        <FormControlLabel value='true' control={<Radio color="primary" />} label="Play/Pause" labelPlacement="bottom" />
                        <FormControlLabel value='false' control={<Radio color="secondary" />} label="No Control" labelPlacement="bottom" />
                    </RadioGroup>
                </ FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField required={true} type="number" defaultValue={ votesToSkip } onChange={handleVotesChange} inputProps={{min: 1, style: {textAlign: "center"} }} />
                    <FormHelperText>
                        <div align="center">
                            Votes Required To Skip Song
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            {update ? renderUpdateButtons() : renderCreateButtons()}
        </Grid>
        );
    
};

export default CreateRoomPage;