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
import Counterparty from './pages/Counterparty';
import { ThemeProvider } from '@material-ui/styles';

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
    flexGrow: 1,
  },
  appBar: {
    zIndex: 1201,
  },
  sidebar: {
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  page: {
    marginTop: 64,
    marginLeft: 156,
  }
}));

function App() {

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
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
        <div className={classes.page}>
          <Switch>
            <Route exact path="/" render={(props) => <Dashboard/>}/>
            <Route exact path="/counterparty-list" render={(props) => <CounterpartyList/>}/>
            <Route exact path="/counterparty" render={props => <Counterparty/>}/>
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
