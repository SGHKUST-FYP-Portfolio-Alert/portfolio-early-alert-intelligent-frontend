import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
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
    <div>
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
      <Drawer variant="permanent" anchor='left' className={classes.drawer}>
        <Toolbar />
        <List>
          <ListItem button key="Dashboard">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button key="Counterparty List">
            <ListItemText primary="Counterparty List" />
          </ListItem>
        </List>
      </Drawer>
      <BrowserRouter>
        <Switch>
          <Route path="/" render={(props) => {}}/>
          <Route path="/counterparty-list" render={(props) => {}}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
