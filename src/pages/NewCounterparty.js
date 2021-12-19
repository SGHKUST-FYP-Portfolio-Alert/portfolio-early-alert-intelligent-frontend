import { withRouter } from "react-router-dom"
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import classNames from "classnames";
import { colors } from "@material-ui/core";

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
  }
}));

const NewCounterparty = (props) => {

  const classes = useStyles();
  const { history } = props;

  return (
    <div className={classes.page}>
      <Typography variant="h5">New Counterparty</Typography>
      <TextField
        label="Counterparty"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )
        }}
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