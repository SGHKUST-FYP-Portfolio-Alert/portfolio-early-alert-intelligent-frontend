import React from 'react';
import { colors } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import classnames from 'classnames'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { serverURL } from '../../constants'
import Chart from './components/Chart';
import { parseCalculationData, parsePriceData } from './components/chartHelper';
import NewsList from './components/NewsList';

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
  const [ chartData, setChartData ] = useState({});
  
  const [ newsListParam, setNewsListParam ] = useState({page: 1})

  useEffect(()=>{

    
    axios.get(serverURL + `chart/calculation?counterparty=${counterpartyId}`)
      .then((response)=>{
        setData(prevState =>({...prevState, calculation: response.data}))
        setChartData(prevState => ({...prevState, calculation: parseCalculationData(response.data)}))
      })
      .catch((error)=> console.log("TODO error handling", error))

    axios.get(serverURL + `chart/price?counterparty=${counterpartyId}`)
      .then((response)=>{
        setData(prevState =>({...prevState, price: response.data}));
        setChartData(prevState => ({...prevState, price: parsePriceData(response.data)}))
      })
      .catch((error)=> console.log("TODO error handling", error))

  }, []);



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
      {(chartData.price && chartData.calculation) && <Chart chartData={chartData} setNewsListParam={setNewsListParam}/>}
      <NewsList counterparty={counterpartyId} newsListParam={newsListParam} setNewsListParam={setNewsListParam}/>
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