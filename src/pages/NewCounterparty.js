import { withRouter } from "react-router-dom"
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import classNames from "classnames";
import { colors } from "@material-ui/core";
import debounce from 'lodash/debounce';
import { useState } from 'react';
import axios from "axios";
import { serverURL } from '../constants'
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  page: {
    textAlign: 'center',
    padding: theme.spacing(3),
    '& > *': {
       marginBottom: theme.spacing(2)
    }
  },
  buttonRow: {
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeholder: {
    display: 'flex',
    border: '1px solid black',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300
  },
  autocomplete: {
    margin: 'auto',
    marginBottom: 16,
    '& .MuiTextField-root .MuiInput-root':{
      paddingRight: 0
    }
  },
  description:{
    fontSize: 'small',
    color: colors.grey[600]
  }
}));

const NewCounterparty = (props) => {

  const classes = useStyles();
  const { history } = props;
  const [ options, setOptions ] = useState([]);

  function search(query){
    axios.get(serverURL+`counterparty/search?query=${query}`)
      .then((response)=>{
        setOptions(response.data.result)
      })
      .catch((error)=>{
        console.log("TODO error catching")
      })

  }

  function handleInputChange(evt, value){
    if (value) search(value);
  }

  function renderInput(params){
    return (
    <TextField {...params} 
      label="Search Counterparty"
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        )
      }}
    />)
  }

  function renderOption(option){
    return(
    <Box>
      {option.symbol} - <span className={classes.description}>{option.description}</span>
    </Box>
    )
  }

  return (
    <div className={classes.page}>
      <Typography variant="h5">New Counterparty</Typography>
      <Autocomplete
        style={{ width: 400 }}
        options={options}
        getOptionLabel={(option) => option.symbol}
        onChange={()=>{console.log('change')}}
        onInputChange={debounce(handleInputChange, 500)}
        filterOptions={x=>x}
        renderOption={renderOption}
        renderInput={renderInput}
        className={classes.autocomplete}
      />
      <div className={classes.placeholder}>
        Counterparty Contents Placeholder
      </div>
      <div className={classes.buttonRow}>
        <Button variant="contained" color="secondary" onClick={(event) => history.push("counterparty-list")}>Cancel</Button>
        <Button variant="contained" color="primary">Add</Button>
      </div>
    </div>
  )
}

export default withRouter(NewCounterparty)