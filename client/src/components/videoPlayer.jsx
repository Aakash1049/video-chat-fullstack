import React from 'react'
import { Grid, Typography, Paper } from '@mui/material'
import { makeStyles } from 'mui-styles';
import { SocketContext } from '../socketContext';
import { useContext } from 'react';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    // [theme.breakpoints.down('xs')]: {
    //   width: '300px',
    // },
  },
  gridContainer: {
    justifyContent: 'center',
    // [theme.breakpoints.down('xs')]: {
    //   flexDirection: 'column',
    // },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext)
  const classes = useStyles()
  return (
    <Grid container className={classes.gridContainer}>
      {
        stream && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography variant='h5' gutterBottom>{name || "name"}
                <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
              </Typography>
            </Grid>
          </Paper>
        )
      }

      {
        callAccepted && !callEnded && (
          
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography variant='h5' gutterBottom>{call.name || "name"}
                <video playsInline ref={userVideo} autoPlay className={classes.video} />
              </Typography>
            </Grid>
          </Paper>
        )
      }

    </Grid>
  )
}

export default VideoPlayer