import { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/styles";
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import { colors, serverURL } from "../../../constants";
import Chip from '@material-ui/core/Chip';
import { title, generateAlertContent } from '../../../helper.js'

const useStyles = makeStyles((theme) => ({
  headerRow: {
    display: 'flex',
    paddingLeft: theme.spacing(1),
    '& > *': {
      marginRight: theme.spacing(5)
    }
  },
  listItem: {
    display: 'flex',
    '& > *': {
      color: '#555'
    }
  },
  listTitle: {
    color: '#000'
  },
  bodyText: {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
  },
  infoRow: {
    '& > *': {
      margin: theme.spacing(0.5),
      display: 'inline-flex'
    }
  },
  image: {
    width: 130,
    height: 80,
    maxWidth: '30%',
    marginRight: theme.spacing(2)  
  }
}));

const AlertListItem = ({alertItem}) => {

  const classes = useStyles();

  return (
  <ListItem button onClick={()=>{}} className={classes.listItem}>
    <div>
      <Typography className={classes.listTitle}>{title(alertItem.type)}</Typography>
      <Typography variant="subtitle2">{title(alertItem.category)} - {alertItem.date.substring(0, 10)}</Typography>
      <Typography variant="body2" className={classes.bodyText}>{generateAlertContent(alertItem)}</Typography>
    </div>
  </ListItem>
  )
};

const AlertList = (props) => {

  const { data } = props

  const [ page, setPage ] = useState(1);
  const pageCount = Math.ceil((data?.length || 0)/ 5)

  const classes = useStyles();

  function handlePageChange(evt, page){
    setPage(page)
  }

  return (
  <div>
    <div className={classes.headerRow}>
      <Typography variant="h6">
          Past Alerts
      </Typography>
      <Pagination count={pageCount} page={page} onChange={handlePageChange}/>
    </div>
    <List>
      {data?.slice((page -1) *5, Math.min(page*5, data?.length))
        ?.map((alertItem, index) => <AlertListItem alertItem={alertItem} key={index}/>)}
    </List>
  </div>
  )

}

export default AlertList;