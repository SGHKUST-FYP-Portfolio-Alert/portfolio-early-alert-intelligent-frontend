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
import { parseCalculationData, parsePriceData, parseAlertData } from './components/chartHelper';
import NewsList from './components/NewsList';
import AlertList from './components/AlertList';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  currentRow: {
    display: 'flex',
    marginBottom: theme.spacing(1),
    alignItems: 'center',
    '& > *': {
      display: 'inline-flex',
      marginRight: theme.spacing(3),
    }
  },
  title: {
    flexGrow: 1
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
  button: {
    marginRight: theme.spacing(1)
  }
}));

const Counterparty = (props) => {

  const classes = useStyles();
  const { history } = props;

  const queryParams = new URLSearchParams(document.location.search);
  const counterparty = queryParams.get('symbol')

  const [ data, setData ] = useState({});
  const [ chartData, setChartData ] = useState({});
  
  const [ newsListParam, setNewsListParam ] = useState({page: 1})
  const [ alertListParam, setAlertListParam ] = useState({page: 1})

  useEffect(()=>{

    axios.get(serverURL + `counterparty/?symbol=${counterparty}`)
    .then((response)=>{
      setData(prevState =>({...prevState, counterpartyInfo: response.data}))
    })
    .catch((error)=> console.log("TODO error handling", error))

    
    axios.get(serverURL + `chart/calculation?counterparty=${counterparty}`)
      .then((response)=>{
        setData(prevState =>({...prevState, calculation: response.data}))
        setChartData(prevState => ({...prevState, calculation: parseCalculationData(response.data)}))
      })
      .catch((error)=> console.log("TODO error handling", error))

    axios.get(serverURL + `chart/price?counterparty=${counterparty}`)
      .then((response)=>{
        setData(prevState =>({...prevState, price: response.data}));
        setChartData(prevState => ({...prevState, price: parsePriceData(response.data)}))
      })
      .catch((error)=> console.log("TODO error handling", error))
    
    axios.get(serverURL + `alert?counterparty=${counterparty}`)
      .then((response)=>{
        setData(prevState =>({...prevState, alert: response.data}));
        setChartData(prevState => ({...prevState, alert: parseAlertData(response.data)}))
      })
      .catch((error)=> console.log("TODO error handling", error))

  }, []);


  return (
    <div className={classes.counterparty}>
      <div className={classes.currentRow}>
        <Typography variant="h6" className={classes.title}>
          {counterparty} - {data.counterpartyInfo?.name}
        </Typography>
        <Typography>
          Current:
        </Typography>
        {/* <Chip className={classes.currentRowItem} label={data.sentimentHistory?.[data.sentimentHistory.length - 1]?.average_score.toFixed(2)} color='secondary'/> */}
        <Typography>
          Keywords:
        </Typography>
        <div className={classes.currentRowItem}>
          {data.sentimentHistory?.[data.sentimentHistory.length - 1]?.keywords?.map(
            (keyword, index) => <Chip label={keyword} key={index}/>
          )}
        </div>
      </div>
      <Button variant="contained" size="small" className={classes.button}
        onClick={()=>history.push(`/edit-topic?symbol=${counterparty}`)}
      >
        Edit Keywords
      </Button>
      {(chartData.price && chartData.calculation) && <Chart chartData={chartData} setNewsListParam={setNewsListParam}/>}
      <NewsList counterparty={counterparty} newsListParam={newsListParam} setNewsListParam={setNewsListParam}/>
      <AlertList data={data.alert}/>
    </div>
  )
}

export default withRouter(Counterparty)