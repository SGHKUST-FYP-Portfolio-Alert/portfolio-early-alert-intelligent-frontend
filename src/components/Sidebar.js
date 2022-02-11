import { withRouter, useLocation } from "react-router-dom"
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import BarChartIcon from '@material-ui/icons/BarChart';
import BusinessIcon from '@material-ui/icons/Business';
import { makeStyles, Typography } from "@material-ui/core";
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
  sidebarList: {
    marginTop: 16
  },
  paper: {
    backgroundColor: '#101F33',
    color: '#e0e0e0'
  },
  title: {
    color: 'white',
    margin: 16,
    fontSize: '1.2rem'
  },
  icon: {
    color: '#e0e0e0',
    minWidth: 'unset',
    marginRight: theme.spacing(1)
  },
  listItem: {
    paddingRight: 20,
    '&:hover':{
      backgroundColor: 'rgba(256, 256, 256, 0.2)' 
    },
    '&.Mui-selected': {
      backgroundColor: 'rgba(256, 256, 256, 0.3)',
      '&:hover':{
        backgroundColor: 'rgba(256, 256, 256, 0.2)' 
      }
    }
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 175,
      flexShrink: 0,
    },
  }
}));

const sideBarItems = [
  {
    label: 'Dashboard',
    route: '/',
    icon: <BarChartIcon />
  },
  {
    label: 'Counterparties',
    route: '/counterparty-list',
    icon: <BusinessIcon />
  }
]
const Sidebar = (props) => {

  const { history, mobileSidebarOpen, setMobileSidebarOpen } = props;
  const location = useLocation();
  const classes = useStyles();

  function handleClose(){
    setMobileSidebarOpen(false)
  }

  const SideBarListItem = (props) => {

    const { item } = props;
  
    return (
    <ListItem button className={classes.listItem} key={item.label} 
      onClick={()=> history.push(item.route)}
      selected={location.pathname == item.route} 
    >
      <ListItemIcon className={classes.icon}>
        {item.icon}
      </ListItemIcon>
      <ListItemText primary={item.label} />
    </ListItem>
    )
  }
  

  const SidebarList = () => (
    <List className={classes.sidebarList}>
      {sideBarItems.map(item => <SideBarListItem item={item}/>)}
    </List>
  )

  const DrawerContent = () => (
    <>
      <Typography variant="h6" className={classes.title}>Counterparty <br/> Alert System</Typography>
      <SidebarList />
    </>
  )

  return (
    <nav className={classes.drawer}>
    <Hidden xsDown implementation="css">
      <Drawer variant="permanent" anchor='left' classes={{ paper: classes.paper }}>
        <DrawerContent />
      </Drawer>
    </Hidden>
    <Hidden smUp implementation="css">
      <Drawer 
        variant="temporary" 
        anchor="left" 
        open={mobileSidebarOpen} onClose={handleClose}
        classes={{ paper: classes.paper }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <DrawerContent />
      </Drawer>
    </Hidden>
    </nav>
  );

};

export default withRouter(Sidebar);