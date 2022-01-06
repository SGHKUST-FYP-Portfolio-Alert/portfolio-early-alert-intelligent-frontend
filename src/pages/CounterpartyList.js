import { withRouter } from "react-router-dom"
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { serverURL } from '../constants'
import { useState, useEffect } from "react";


const useStyles = makeStyles((theme) => ({
  counterpartyList: {
    textAlign: 'center',
    padding: theme.spacing(3),
  },
  buttonRow: {
    textAlign: 'left',
    '& > *': {
      margin: theme.spacing(1),
    }
  }
}));

const CounterpartyList = (props) => {

  const classes = useStyles();
  const { history } = props;
  const [ counterparties, setCounterparties ] = useState([]);
  const [ selectedCounterparties, setSelectedCounterparties ] = useState([]);

  function handleDeleteCounterparties(){
    const promises = selectedCounterparties.map(
      counterparty => axios.delete(serverURL+'counterparty?symbol='+counterparty)
    )

    Promise.all(promises)
      .then(history.go())
  }

  useEffect(()=>{
    axios.get(serverURL + 'counterparty')
      .then((response)=>{
        setCounterparties(response.data)
      })
      .catch((error)=>{
        console.log("TODO error catching")
      })
  }, []);

  const columns = [
    {
      field: 'symbol',
      headerName: 'Symbol',
      width: 130
    },
    {
      field: 'name',
      headerName: 'Counterparty Name',
      width: 500
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
      <DataGrid
        autoHeight
        checkboxSelection
        columns={columns}
        rows={counterparties}
        getRowId={(row) => row.symbol}
        onRowClick={({row})=>history.push("/counterparty?id="+row.symbol)}
        onSelectionModelChange={(val)=>setSelectedCounterparties(val)}
      />
    </div>
  )
}

export default withRouter(CounterpartyList)