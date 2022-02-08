import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { serverURL } from '../constants';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  addkeyword: {
    padding: theme.spacing(3),
  },
  row: {
    '& > *': {
      margin: theme.spacing(0.5),
      display: 'inline-flex'
    }
  }
}));

const AddKeyword = (props) => {

  const classes = useStyles();
  const { history } = props;

  const queryParams = new URLSearchParams(document.location.search);
  const counterparty = queryParams.get('symbol')

  const [data, setData] = useState({});

  useEffect(function(){
    axios.get(serverURL + `lda?symbol=${counterparty}`)
    .then((response)=>{
      setData(response.data)
    })
    .catch((error)=> console.log("TODO error handling", error))
  }, [])

  return (
    <div className={classes.addkeyword}>
      <Typography>{data?.datetime}</Typography>
      {data?.topics?.map(topic =>
        <div className={classes.row}>
          <Typography>LDA {topic[0]}:</Typography>
          {topic[1].slice(0, 5).map(keyword =>
            <Typography>({keyword[0]}, {(keyword[1] * 100).toFixed(2)}%)</Typography>
          )}
        </div>
      )}
    </div>
  );
}

export default withRouter(AddKeyword)