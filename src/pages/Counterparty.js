import React from 'react';
import { colors } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Slider } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import classnames from 'classnames'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { serverURL } from '../constants'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

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

const today = Date.now();

const chartStartOption = {
  _1M: today - 30*24*60*60*1000,
  _3M: today - 90*24*60*60*1000,
  _6M: today - 180*24*60*60*1000,
  _1Y: today - 365*24*60*60*1000,
  _3Y: today - 1095*24*60*60*1000
}

// A reverse dictionary to chartStartOption
const chartStartOptionReverse = Object.fromEntries(Object.entries(chartStartOption).map(a => a.reverse()))

function timestampToString(timestamp){
  var date = new Date(timestamp);
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

function timestampToMonthString(timestamp){
  var date = new Date(timestamp);
  return `${date.getFullYear()}-${date.getMonth()+1}`
}

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
    
      axios.get(serverURL + `calculation/chart?counterparty=${counterpartyId}`)
      .then((response)=>{
        let chartData = response.data.map( 
          (data) => ({ timestamp: Date.parse(data.date), ...data})
        ).filter(data=> data.timestamp >= chartStartOption._3Y) //filter too old data to prevent charts become too big
        setData(prevState =>({
          ...prevState,
          chartData: chartData
        }))
      })
      .catch((error)=> console.log("TODO error handling", error))

  }, []);

  const Chart = () => {

    const [ chartStart, setChartStart ] = useState(chartStartOption['_6M']); // default range: half year

    return (
      <>
      <LineChart
        data={data.chartData}
        height={300}
        width={800}
      >
        <XAxis type="number" dataKey="timestamp" tickFormatter={timestampToString} domain={[chartStart, today]} allowDataOverflow/>
        <YAxis />
        <Tooltip labelFormatter={timestampToString}/>
        <Line type="monotone" dataKey="average_score" stroke="#8884d8" connectNulls />
        <Line type="monotone" dataKey="closing_stock_price" stroke="#ff0000" connectNulls />
      </LineChart>
      <ToggleButtonGroup
        color="primary"
        value={chartStartOptionReverse[chartStart]}
        exclusive
        onChange={function(evt, value){setChartStart(chartStartOption[value])}}
      >
        <ToggleButton value="_1M">1M</ToggleButton>
        <ToggleButton value="_3M">3M</ToggleButton>
        <ToggleButton value="_6M">6M</ToggleButton>
        <ToggleButton value="_1Y">1Y</ToggleButton>
        <ToggleButton value="_3Y">3Y</ToggleButton>
      </ToggleButtonGroup>
      </>
    )
  };

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
        {/* <Chip className={classes.currentRowItem} label={data.sentimentHistory?.[data.sentimentHistory.length - 1]?.average_score.toFixed(2)} color='secondary'/> */}
        <Typography className={classes.currentRowItem}>
          Keywords:
        </Typography>
        <div className={classes.currentRowItem}>
          {data.sentimentHistory?.[data.sentimentHistory.length - 1]?.keywords?.map(
            (keyword, index) => <Chip label={keyword} key={index}/>
          )}
        </div>
      </div>
      { data.chartData && <Chart/> }
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