import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, IconButton, Card } from '@material-ui/core';
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles";

const WhiteTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
})(Typography);

const pages = {
    JOIN: 'pages.join',
    CREATE: 'pages.create',
}

function Info(props) {
    const [page, setPage] = useState(pages.JOIN);

    function joinInfo() {
        return (
        <Card>
            <Grid container alignItems="center" justifyContent="center" spacing={1}>
                <Grid item align="center" xs={12}>
                    <Typography component="h5" variant="h5">
                        Join Room Page
                    </Typography>
                </Grid>
                <Grid item align="center" xs={10}>
                    <Typography color="textSecondary" variant="subtitle1">
                        The Join Room Page is used to join a pre-existing room using a "Room Code."
                        To join the room, you simply have to enter the Room Code into the text box provided and click
                        "Enter Room." If the code is valid, you will be redirected into the appropriate room. If not,
                        you will stay on the Join Room page and be prompted to enter a different code.
                    </Typography>
                </Grid>
            </Grid>      
        </Card>
        );
    }

    function createInfo(){
        return (
            <Card>
                <Grid container alignItems="center" justifyContent="center" spacing={1}>
                    <Grid item align="center" xs={12}>
                        <Typography component="h5" variant="h5">
                            Create Room Page
                        </Typography>
                    </Grid>
                    <Grid item align="center" xs={10}>
                        <Typography color="textSecondary" variant="subtitle1">
                            The Create Room page is used to create your own new House Party room. When creating a room, you
                            have 2 settings options: (1) Whether or not Room members have permission to Play/Pause the song, and
                            (2) How many votes are required from Room members for a song to be skipped.
                            Once you have the settings configured as you want, select the "Create Room" button, which will create a
                            Room with a custom code for you to use. Any House Party user can join your room with your code.
                        </Typography>
                    </Grid>
                </Grid>      
            </Card>
            );
    }

    return(
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} align="center">
                <WhiteTypography component="h4" variant="h4">What is House Party?</WhiteTypography>
            </Grid>
            <Grid item align="center" xs={12}>
                    <WhiteTypography color="textSecondary" variant="subtitle1">
                        House Party is an application used to listen to music with your friends by joining the same "Room." This
                        room allows users to all listen to the same song, and vote to skip the song. Use the arrow to learn more
                        about the specific features House Party has to offer.
                    </WhiteTypography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="body1">
                    { page === pages.JOIN ? joinInfo() : createInfo() }
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <IconButton onClick={() => {page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE)}}>
                    {page === pages.CREATE ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
                </IconButton>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={ Link }>Back To Home</Button>
            </Grid>
        </Grid>
    );
}







export default Info;