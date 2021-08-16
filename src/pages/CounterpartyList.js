import { withRouter } from "react-router-dom"
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';


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

  const columns = [
    {
      field: 'company_name',
      headerName: 'Company Name',
      width: 500
    }
  ]

  const data = [
    {'company_id': 'mitsubishi', 'company_name': 'Mitsubishi Co.' },
    {'company_id': 'wanda', 'company_name': 'Wanda Group' }
  ]

  return (
    <div className={classes.counterpartyList}>
      <div className={classes.buttonRow}>
        <Button variant="contained" color="primary" >New</Button>
        <Button variant="contained" color="secondary">Delete</Button>
      </div>
      <DataGrid
        autoHeight
        checkboxSelection
        columns={columns}
        rows={data}
        getRowId={(row) => row.company_id}
        onRowClick={({row})=>history.push("/counterparty?id="+row.company_id)}
      />
    </div>
  )
}

export default withRouter(CounterpartyList)