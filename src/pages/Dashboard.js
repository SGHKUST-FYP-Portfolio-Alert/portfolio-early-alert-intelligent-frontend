import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import AlertCard from '../components/AlertCard';
import { serverURL } from '../constants';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  dashboard: {
    textAlign: 'center',
  },
}));

const Dashboard = (props) => {

  const classes = useStyles();
  const { history } = props;
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [alerts, setAlerts] = useState([]);

  useEffect(function(){
    axios.get(
      serverURL + 'alert?detailed=true&date=' + selectedDate.toISOString().substring(0, 10)
    )
      .then((response)=>{
        setAlerts(response.data)
      })
      .catch((error)=>{
        console.log("TODO error catching")
      })
  }, [selectedDate])


  return (
    <div className={classes.dashboard}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date Picker"
          value={selectedDate}
          onChange={(date)=>setSelectedDate(date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
      { alerts.map((item, index) =>
        <AlertCard item={item} key={index}/>
      )}
    </div>
  );
}

export default withRouter(Dashboard)