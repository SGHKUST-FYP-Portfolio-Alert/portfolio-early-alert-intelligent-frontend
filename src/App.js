import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard';
import CounterpartyList from './pages/CounterpartyList';
import Counterparty from './pages/Counterparty/Counterparty';
import { ThemeProvider } from '@material-ui/styles';
import NewCounterparty from './pages/NewCounterparty';
import AddKeyword from './pages/AddKeyword';
import { useState } from 'react';

import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import { createTheme } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000'
    },
    secondary: {
      main: '#E9041E'
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: 1201,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  page: {
    marginTop: 64,
    flexGrow: 1,
  }, 
  menuButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  }
}));

function App() {

  const classes = useStyles();
  const [ mobileSidebarOpen, setMobileSidebarOpen ] = useState(false);

  function handleClick(){
    setMobileSidebarOpen(!mobileSidebarOpen)
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className={classes.root}>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Counterparty Risk Early Alert
              </Typography>
            </Toolbar>
          </AppBar>
          <Sidebar mobileSidebarOpen={mobileSidebarOpen} setMobileSidebarOpen={setMobileSidebarOpen}/>
          <div className={classes.page}>
            <Switch>
              <Route exact path="/" render={(props) => <Dashboard/>}/>
              <Route exact path="/counterparty-list" render={(props) => <CounterpartyList/>}/>
              <Route exact path="/counterparty" render={props => <Counterparty/>}/>
              <Route exact path="/new-counterparty" render={props => <NewCounterparty/>}/>
              <Route exact path="/add-keyword" render={props => <AddKeyword/>}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
