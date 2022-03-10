import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { serverURL } from '../constants';
import { Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import CounterpartyList from '../components/CounterpartyList';
import { Button } from '@material-ui/core';
import { FormControlLabel, Switch, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  page: {
    padding: theme.spacing(1),
  },
  row: {
    alignContent: 'center',
    marginBottom: theme.spacing(1.5),
    '& > *': {
      marginRight: theme.spacing(1),
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

  const [selectedCounterpartyForSuggestion, setSelectedCounterpartyForSuggestion] = useState(counterparty)
  const [topicData, setTopicData] = useState({
    counterparties: counterparty? [counterparty]:'global',
    keywords: [],
    title: ''
  });
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

  const TopicSuggestion = () => {
    function addKeyword(keyword){
      setTopicData({
        ...topicData, 
        keywords: [...topicData.keywords, keyword]
      })
    }

    return <div>
      <Autocomplete
        renderInput={renderAutocompleteInput}
        style={{ width: 250 }}
        className={classes.autocomplete}
        value={selectedCounterpartyForSuggestion}
        options={[]}
      />
      {ldaSuggestion?.topics?.map((topic, i) =>
        <div className={classes.row}>
          <Typography>LDA {i}:</Typography>
          {topic[1].slice(0, 8).map(keyword =>
            <Chip size="small" onClick={()=>{addKeyword(keyword[0])}} label={keyword[0]}/>
          )}
        </div>
      )}
    </div>
  }

  function handleSwitchClick(){
    if (topicData.counterparties === 'global') {
      setTopicData({...topicData, counterparties: []})
    } else {
      setTopicData({...topicData, counterparties: 'global'})
    }
  }

  function submit(){
    axios(serverURL + 'topic', {
      method: topicId? 'put': 'post',
      data: topicData
    }).then(
      function(){history.goBack()}
    )
  }

  return (
    <div className={classes.page}>
      <div className={classes.row}>
        <Button variant="contained" color="primary" onClick={submit}>Save</Button>
        <Button variant="contained" color="secondary" onClick={()=>history.goBack()}>Cancel</Button>
        <Button variant="contained" onClick={()=>history.go()}>Reset</Button>
      </div>
      <div className={classes.row}>
        <TextField
          variant="outlined"
          label="Title"
          margin="dense"
          value={topicData.title}
          onChange={function(evt){setTopicData({...topicData, title: evt.target.value})}}
          InputLabelProps={{ shrink: Boolean(topicData?.title) }}
        />
        <Autocomplete
          multiple
          freeSolo
          style={{ minWidth: 250 }}
          className={classes.autocomplete}
          options={[]}
          value={topicData?.keywords}
          onChange={function(evt, val){setTopicData({...topicData, keywords: val})}}
          renderInput={params =>
            <TextField
              {...params}
              variant="outlined"
              label="Keywords"
              margin="dense"
              helperText="Type in the vocab then click 'Enter' or select vocab from suggestions"
            />
          }
        />
      </div>
      <TopicSuggestion />
      
      <Grid component="label" container alignItems="center" spacing={0}>
        <Grid item>Track this topic for All</Grid>
        <Grid item>
          <Switch checked={topicData.counterparties !== 'global'} onClick={handleSwitchClick} name="checkedC" />
        </Grid>
        <Grid item>Selected Counterparties</Grid>
      </Grid>
      { topicData.counterparties !== 'global' &&
        <CounterpartyList
          selectedCounterparties={topicData.counterparties}
          setSelectedCounterparties={function(val){setTopicData({...topicData, counterparties: val})}}
          pageSize={10} 
        />
      }
    </div>
  );
}

export default withRouter(EditTopic)