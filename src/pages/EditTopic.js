import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { serverURL } from '../constants';
import { Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  page: {
    padding: theme.spacing(3),
  },
  row: {
    alignContent: 'center',
    '& > *': {
      margin: theme.spacing(0.7),
      display: 'inline-flex'
    }
  },
  autocomplete: {
    margin: 0,
    marginTop: -2.5
  }
}));

const EditTopic = (props) => {

  const classes = useStyles();
  const { history } = props;

  const queryParams = new URLSearchParams(document.location.search);
  const topicId = queryParams.get('topicId')
  const counterparty = queryParams.get('symbol')

  const [selectedCounterparties, setSelectedCounterparties] = useState([])
  const [selectedCounterpartyForSuggestion, setSelectedCounterpartyForSuggestion] = useState(counterparty)
  const [topicData, setTopicData] = useState([]);
  const [ldaSuggestion, setLdaSuggestion] = useState({});

  useEffect(function(){
    if (!selectedCounterpartyForSuggestion) return;
    axios.get(serverURL + `lda?symbol=${selectedCounterpartyForSuggestion}`)
    .then((response)=>{
      setLdaSuggestion(response.data)
    })
    .catch((error)=> console.log("TODO error handling", error))
  }, [selectedCounterpartyForSuggestion])

  useEffect(function(){
    if (!topicId) return;
    axios.get(serverURL + `topic/?id=${topicId}`)
    .then((response)=>{
      setTopicData(response.data)
    })
    .catch((error)=> console.log("TODO error handling", error))
  }, [])

  function renderAutocompleteInput(params){
    return (
    <TextField
      {...params}
      label="Show topic suggestion for"
      variant="outlined"
      margin="dense"
    />)
  }

  const TopicSuggestion = (props) => {
    return <div>{
      ldaSuggestion?.topics?.map((topic, i) =>
        <div className={classes.row}>
          <Typography>LDA {i}:</Typography>
          {topic[1].slice(0, 8).map(keyword =>
            <Chip size="small" label={keyword[0]}/>
          )}
        </div>
      )
    }</div>
  }

  return (
    <div className={classes.page}>
      <div className={classes.row}>
        <TextField
          variant="outlined"
          label="Title"
          margin="dense"
          value={topicData?.title}
          InputLabelProps={{ shrink: Boolean(topicData?.title) }}
        />
        <Autocomplete
          multiple
          freeSolo
          style={{ minWidth: 250 }}
          className={classes.autocomplete}
          options={[]}
          value={topicData?.keywords || []}
          renderInput={params =>
            <TextField
              {...params}
              variant="outlined"
              label="Keywords"
              margin="dense"
            />
          }
        />
      </div>
      <Autocomplete
        renderInput={renderAutocompleteInput}
        style={{ width: 250 }}
        className={classes.autocomplete}
        value={selectedCounterpartyForSuggestion}
        options={[]}
      />
      <TopicSuggestion />
    </div>
  );
}

export default withRouter(EditTopic)