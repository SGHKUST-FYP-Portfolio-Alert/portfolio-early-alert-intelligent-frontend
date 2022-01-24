import { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/styles";
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import { colors, serverURL } from "../../../constants";
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  headerRow: {
    display: 'flex',
    marginTop: theme.spacing(1),
    '& > *': {
      marginRight: theme.spacing(5)
    }
  },
  listItem: {
    display: 'block',
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

const NewListItem = ({newsItem}) => {

  const classes = useStyles();

  return (
  <ListItem button onClick={()=>{}} className={classes.listItem}>
    <Typography className={classes.listTitle}>{newsItem.headline}</Typography>
    <div className={classes.infoRow}>
      <Typography variant="subtitle2">{newsItem.source} - {newsItem.date}</Typography>
      <SentimentChip sentiment={newsItem.sentiment}/>
      {Object.keys(newsItem.keyword_count)
        .map(keyword => <Chip size="small" label={keyword} key={keyword}/>)
      }
    </div>
    <Typography variant="body2" className={classes.bodyText}>{newsItem.summary}</Typography>
  </ListItem>
  )
};

const NewsList = (props) => {

  const { counterparty, newsListParam, setNewsListParam } = props
  const [ data, setData ] = useState([]);

  const { page, date } = newsListParam;

  const classes = useStyles();

  useEffect(function(){
    axios.get(serverURL + `news?counterparty=${counterparty}&limit=5&skip=${(page-1)*5}`+ (date? `&date=${date}` : '') )
      .then((response)=>{
        setData(response.data)
      })
      .catch((error)=> console.log("TODO error handling", error))
  }, [page, date])

  function handlePageChange(evt, page){
    setNewsListParam({...newsListParam, page})
  }

  return (
  <div>
    <div className={classes.headerRow}>
      <Typography variant="h6">
          News
      </Typography>
      <Pagination count={10} page={page} onChange={handlePageChange}/>
    </div>
    <List>
      {data.map((newsItem, index) => <NewListItem newsItem={newsItem} key={index}/>)}
    </List>
  </div>
  )

}

export default NewsList;