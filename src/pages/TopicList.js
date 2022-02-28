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
  const [ topics, setTopics ] = useState([]);
  const [ selectedTopics, setSelectedTopics ] = useState([]);

  function handleDelteTopics(){
    const promises = selectedTopics.map(
      counterparty => axios.delete(serverURL+'counterparty?symbol='+counterparty)
    )

    Promise.all(promises)
      .then(history.go())
  }

  useEffect(()=>{
    axios.get(serverURL + 'topic')
      .then((response)=>{
        setTopics(response.data)
      })
      .catch((error)=>{
        console.log("TODO error catching")
      })
  }, []);

  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      width: 130
    },
    {
      field: 'keywords',
      headerName: 'Keywords',
      width: 300
    }, {
      field: 'counterparties',
      headerName: 'Counterparties',
      width: 300
    }
  ]

  return (
    <div className={classes.counterpartyList}>
      <div className={classes.buttonRow}>
        <Button variant="contained" color="primary" 
          onClick={(event) => history.push("/edit-topic")}
        >
          New
        </Button>
        <Button variant="contained" color="secondary" 
          onClick={handleDelteTopics}
        >
          Delete
        </Button>
      </div>
      <DataGrid
        autoHeight
        checkboxSelection
        columns={columns}
        rows={topics}
        //getRowId={(row) => row.id}
        onRowClick={({row})=>history.push("/edit-topic?topicId="+row.id)}
        onSelectionModelChange={(val)=>setSelectedTopics(val)}
      />
    </div>
  )
}

export default withRouter(CounterpartyList)