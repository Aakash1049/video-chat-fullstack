import './App.css';
import { Typography,AppBar } from '@mui/material';
// import { makeStyles } from '@mui/material/styles';
import { makeStyles } from 'mui-styles';

import VideoPlayer from './components/videoPlayer';
import Options from './components/options';
import Notification from './components/notification';

const useStyles=makeStyles((theme)=>({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    // [theme.breakpoints.down('xs')]: {
    //   width: '90%',
    // },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}))
function App() {
  const classes=useStyles()
  return (
    <div className={classes.wrapper}>
   <AppBar className={classes.appBar} position='static' color='inherit'>
      <Typography variant='h2' align='center' >Video Chat</Typography>
   </AppBar>
   <VideoPlayer/>
   <Options>
    <Notification/>
   </Options>
    </div>
  );
}

export default App;
