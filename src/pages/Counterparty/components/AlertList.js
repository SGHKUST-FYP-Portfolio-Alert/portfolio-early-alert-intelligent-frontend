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
    marginTop: theme.spacing(1),
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

const chipUseStyles = makeStyles((theme) => ({
  positive: {
    backgroundColor: colors.positive
  },
  neutral: {
    backgroundColor: colors.neutral
  },
  negative: {
    backgroundColor: colors.negative
  }
}));

const SentimentChip = ({sentiment}) => {

  const classes = chipUseStyles();

  const numericToText = {
    '-1': 'negative',
    '0': 'neutral',
    '1': 'positive'
  }

  const sentimentText = numericToText[sentiment]

  return <Chip label={sentimentText} className={classes[sentimentText]} size="small"/>

}

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

  const { counterparty, alertListParam, setAlertListParam } = props
  const [ data, setData ] = useState([]);

  const { page, date } = alertListParam;

  const classes = useStyles();

  useEffect(function(){
    axios.get(serverURL + `alert?counterparty=${counterparty}&limit=5&skip=${(page-1)*5}`+ (date? `&date=${date}` : '') )
      .then((response)=>{
        setData(response.data)
      })
      .catch((error)=> console.log("TODO error handling", error))
  }, [page, date])

  function handlePageChange(evt, page){
    setAlertListParam({...alertListParam, page})
  }

  return (
  <div>
    <div className={classes.headerRow}>
      <Typography variant="h6">
          Past Alerts
      </Typography>
      <Pagination count={5} page={page} onChange={handlePageChange}/>
    </div>
    <List>
      {data.map((alertItem, index) => <AlertListItem alertItem={alertItem} key={index}/>)}
    </List>
  </div>
  )

}

export default AlertList;