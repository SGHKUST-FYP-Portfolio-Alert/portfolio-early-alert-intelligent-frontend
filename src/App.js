import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Sidebar from './components/Sidebar'

import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.sidebar + 1,
  },
  sidebar: {
    zIndex: -99
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {

  const classes = useStyles();

  return (
    <BrowserRouter>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Counterparty Risk Early Alert
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar className={classes.sidebar}/>
      <Switch>
        <Route path="/" render={(props) => {}}/>
        <Route path="/counterparty-list" render={(props) => {}}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
