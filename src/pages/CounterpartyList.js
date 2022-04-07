import { withRouter } from "react-router-dom"
import { DataGrid } from "@mui/x-data-grid";
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { serverURL } from '../constants'
import React, { useState, useEffect } from "react";
import { Chip, CircularProgress } from "@material-ui/core";
import { getSentimentColor } from "../helper";
import CircularBarWithLabel from "../components/CircularBarWithLabel";
import { Paper } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  counterpartyList: {
    textAlign: 'center',
  },
  buttonRow: {
    textAlign: 'left',
    marginBottom: theme.spacing(1),
    '& > *': {
      marginRight: theme.spacing(1),
    }
  },
  keywordChips: {
    marginRight: theme.spacing(0.5)
  }
}));

const CounterpartyList = (props) => {

  const classes = useStyles();
  const { history } = props;
  const [ data, setData ] = useState([]);
  const [ selectedCounterparties, setSelectedCounterparties ] = useState([]);
  const counterparties = data.map(c => ({
    sentiment: c?.data?.sentiments?.rolling_avg,
    keywords: c?.data?.keyword_count,
    ...c
  }))

  function handleDeleteCounterparties(){
    const promises = selectedCounterparties.map(
      counterparty => axios.delete(serverURL+'counterparty?symbol='+counterparty)
    )

    Promise.all(promises)
      .then(history.go())
  }

  useEffect(()=>{
    axios.get(serverURL + 'counterparty?detailed=true')
      .then((response)=>{
        setData(response.data)
      })
      .catch((error)=>{
        console.log("TODO error catching")
      })
  }, []);

  const columns = [
    {
      field: 'symbol',
      headerName: 'Symbol',
      width: 100
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200
    },
    {
      field: 'sentiment',
      headerName: 'Sentiment',
      renderCell: (params) => 
        <CircularBarWithLabel
          max={1} min={-1} 
          color={getSentimentColor(params.value)} 
          value={params.value}
        />,
      width: 100
    },
    {
      field: 'keywords',
      headerName: 'Keywords',
      width: 300,
      renderCell: (params) => 
        <React.Fragment>
          {Object.entries(params.value || {}).sort((a, b)=> a[1] < b[1]).slice(0, 4).map(
            ([k, v]) => <Chip size='small' className={classes.keywordChips} label={k} />
          )}
        </React.Fragment>
    }
  ]

  return (
    <div className={classes.counterpartyList}>
      <div className={classes.buttonRow}>
        <Button variant="contained" color="primary" 
          onClick={(event) => history.push("new-counterparty")}
        >
          New
        </Button>
        <Button variant="contained" color="secondary" 
          onClick={handleDeleteCounterparties}
        >
          Delete
        </Button>
      </div>
      <Paper className={classes.listContainer}>
      { data.length > 0 ?
        <DataGrid
          autoHeight
          checkboxSelection
          columns={columns}
          rows={counterparties}
          getRowId={(row) => row.symbol}
          onRowClick={({row})=>history.push("/counterparty?symbol="+row.symbol)}
          onSelectionModelChange={(val)=>setSelectedCounterparties(val)}
          pageSize={50}
        /> :
        <CircularProgress/>
      }
      </Paper>
    </div>
  )
}

export default withRouter(CounterpartyList)