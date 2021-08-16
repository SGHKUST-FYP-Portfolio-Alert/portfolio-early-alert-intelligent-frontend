import { withRouter } from "react-router-dom"
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';


const Sidebar = (props) => {

  const { history, className } = props;

  return (
    <Drawer variant="permanent" anchor='left' className={className}>
      <Toolbar />
      <List>
        <ListItem button key="Dashboard" onClick={()=> history.push('/')}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button key="Counterparty List" onClick={()=> history.push('/counterparty-list')}>
          <ListItemText primary="Counterparty List" />
        </ListItem>
      </List>
    </Drawer>
  );

};

export default withRouter(Sidebar);