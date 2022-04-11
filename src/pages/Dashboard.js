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
import { colors, Paper } from '@material-ui/core';
import CheckboxWithLabel from '../components/CheckboxWithLabel';
import SearchBox from '../components/SearchBox';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  dashboard: {
    textAlign: 'center',
  },
  headerContainer: {
    maxWidth: 560,
    margin: 'auto',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-around'
  },
  cardsContainer: {
    padding: theme.spacing(2),
    maxWidth: 560,
    margin: 'auto',
  },
  name: {
    color: colors.grey[800]
  }
}));

const Dashboard = (props) => {

  const classes = useStyles();
  const { history } = props;
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [ selectedCounterparties, setSelectedCounterparties ] = useState([])
  const selectedSymbols = selectedCounterparties.map(i => i.symbol)
  const [showDismissed, setShowDismissed] = useState(false)
  const [alerts, setAlerts] = useState([]);

  useEffect(function(){
    axios.get(
      serverURL + 'alert?dashboard=true&date=' + selectedDate.toISOString().substring(0, 10)
    )
      .then((response)=>{
        setAlerts(response.data)
      })
      .catch((error)=>{
        console.log("TODO error catching")
      })
  }, [selectedDate])

  function renderOption(option){
    return(
    <Box>
      {option.symbol} - <span className={classes.name}>{option.name}</span>
    </Box>
    )
  }


  return (
    <div className={classes.dashboard}>
      <Paper className={classes.headerContainer}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          style={{width: 140}}
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
        <SearchBox
          multiple
          suggestionURL={serverURL+'counterparty/search?query='}
          getOptionSelected={(option, value) => option.symbol === value.symbol}
          filterOptions={x=>x}
          renderOption={renderOption}
          getOptionLabel={(option) => option.symbol}
          onChange={(evt, value)=>setSelectedCounterparties(value)}
          value={selectedCounterparties}
          label="Counterparty"
          style={{ width: 180 }}
        />
        <CheckboxWithLabel
          label="Show dismissed"
          value={showDismissed}
          onClick={()=>setShowDismissed(!showDismissed)}
        />
      </MuiPickersUtilsProvider>
      </Paper>
      <Paper className={classes.cardsContainer}>
        { alerts
          .filter((item)=> selectedCounterparties.length? selectedSymbols.includes(item.counterparty.symbol): true)
          .map((item) =>
            <AlertCard item={item} key={item.id} showDismissed={showDismissed}/>
        )}
      </Paper>
    </div>
  );
}

export default withRouter(Dashboard)