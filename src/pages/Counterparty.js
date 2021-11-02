import React from 'react';
import { colors } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import classnames from 'classnames'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { serverURL } from '../constants'

const useStyles = makeStyles((theme) => ({
  counterparty: {
    padding: theme.spacing(3),
  },
  currentRow: {
  },
  currentRowItem: {
    display: 'inline-flex',
    marginRight: theme.spacing(3),
  },
  alertListItem: {
    padding: 0,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  alert: {
    backgroundColor: colors.red[400],
  },
  warning: {
    backgroundColor: colors.amber[400],
  },
}));

const Counterparty = (props) => {

  const classes = useStyles();
  const { history } = props;

  const queryParams = new URLSearchParams(document.location.search);
  const counterpartyId = queryParams.get('id')

  const [ data, setData ] = useState({});

  useEffect(()=>{

    axios.get(serverURL + `news?counterparty=${counterpartyId}&limit=5` )
      .then((response)=>{
        setData(prevState =>({
          ...prevState,
          news: response.data
        }))
      })
      .catch((error)=> console.log("TODO error handling", error))
    
      axios.get(serverURL + `calculation?counterparty=${counterpartyId}`)
      .then((response)=>{
        setData(prevState =>({
          ...prevState,
          sentimentHistory: response.data
        }))
      })
      .catch((error)=> console.log("TODO error handling", error))

  }, []);


  // const sentimentHistory = [
  //   {date: '2021-08-01', value: 5.0},
  //   {date: '2021-08-02', value: 5.2, keywords: ['key1', 'key2']},
  //   {date: '2021-08-03', value: 4.9},
  //   {date: '2021-08-04', value: 4.8, keywords: ['key1', 'key2']},
  //   {date: '2021-08-05', value: 4.6},
  //   {date: '2021-08-06', value: 4.0, keywords: ['key1', 'key2']},
  //   {date: '2021-08-07', value: 3.0},
  //   {date: '2021-08-08', value: 2.3, keywords: ['key1', 'key2']}
  // ]

  // const alertHistory = [
  //   {date: '2021-06-01', type:'warning', content: 'warning message detail 1'},
  //   {date: '2021-07-01', type: 'alert', content: 'warning message detail 2'},
  //   {date: '2021-08-07', type: 'alert', content: 'warning message detail 3'}
  // ]

  // const news = [
  //   {title: 'Hello news', content: 'this is some news content', source: 'Googol News'},
  //   {title: 'Bye news', content: 'this is again some news content', source: 'Bloomboom'},
  // ]


  const getChart = () => (
    <LineChart
      data={data.sentimentHistory}
      height={300}
      width={800}
    >
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="average_score" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );

  const getNewListItem = (newsItem, index) => (
    <ListItem button onClick={()=>{}} key={index}>
      <ListItemText
        primary={newsItem.headline}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {newsItem.source} &emsp;-&emsp;
            </Typography>
            {newsItem.summary}
          </React.Fragment>
        }
      />
    </ListItem>
  );

  const getAlertListItem = (alertItem, index) => (
    <ListItem key={index} className={classnames(classes.alertListItem, classes[alertItem.type])}>
      <ListItemText
        primary={alertItem.content}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {alertItem.date} &emsp;-&emsp;
            </Typography>
            {alertItem.type}
          </React.Fragment>
        }
      />
    </ListItem>
  );


  return (
    <div className={classes.counterparty}>
      <Typography variant="h4">
        {data.company_name}
      </Typography>
      <Typography variant="h6">
        Sentiment
      </Typography>
      <div className={classes.currentRow}>
        <Typography className={classes.currentRowItem}>
          Current:
        </Typography>
        <Chip className={classes.currentRowItem} label={data.sentimentHistory?.[data.sentimentHistory.length - 1]?.average_score.toFixed(2)} color='secondary'/>
        <Typography className={classes.currentRowItem}>
          Keywords:
        </Typography>
        <div className={classes.currentRowItem}>
          {data.sentimentHistory?.[data.sentimentHistory.length - 1]?.keywords?.map(
            (keyword, index) => <Chip label={keyword} key={index}/>
          )}
        </div>
      </div>
      {getChart()}
      <Typography variant="h6">
        News
      </Typography>
      <List>
        {data?.news?.map((newsItem, index) => getNewListItem(newsItem, index))}
      </List>
      <Typography variant="h6">
        Past Alert
      </Typography>
      <List>
        {data.alertHistory?.map((alertItem, index) => getAlertListItem(alertItem, index))}
      </List>
    </div>
  )
}

export default withRouter(Counterparty)