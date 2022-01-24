import { withRouter } from "react-router-dom"
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from "@material-ui/core";
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
  sidebarList: {
    marginTop: 64
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 160,
      flexShrink: 0,
    },
  }
}));

const Sidebar = (props) => {

  const { history, mobileSidebarOpen, setMobileSidebarOpen } = props;

  const classes = useStyles();

  function handleClose(){
    setMobileSidebarOpen(false)
  }

  const SidebarList = () => (
    <List className={classes.sidebarList}>
      <ListItem button key="Dashboard" onClick={()=> history.push('/')}>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button key="Counterparty List" onClick={()=> history.push('/counterparty-list')}>
        <ListItemText primary="Counterparty List" />
      </ListItem>
    </List>
  )

  return (
    <nav className={classes.drawer}>
    <Hidden xsDown implementation="css">
      <Drawer variant="permanent" anchor='left'>
        <SidebarList />
      </Drawer>
    </Hidden>
    <Hidden smUp implementation="css">
      <Drawer 
        variant="temporary" 
        anchor="left" 
        open={mobileSidebarOpen} onClose={handleClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <SidebarList />
      </Drawer>
    </Hidden>
    </nav>
  );

};

export default withRouter(Sidebar);