import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { colors } from '@material-ui/core';
import classnames from 'classnames'
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import MenuIcon from '@material-ui/icons/Menu';
import { Autorenew } from '@material-ui/icons';
import { generateAlertContent } from '../helper'
import axios from 'axios';
import { serverURL } from '../constants';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    companyName: {
      fontWeight: 'bold',
    },
    card: {
      maxWidth: '100%',
      width: 520,
      textAlign: 'left',
      display: 'flex',
      justifyContent: 'space-between',
      margin: 'auto',
      border: '1px solid',
      marginBottom: theme.spacing(1.5)
    },
    cardAlert: {
      backgroundColor: colors.red[200],
      //color: colors.red[900],
      borderColor: colors.red[500]
    },
    cardWarning: {
      backgroundColor: colors.amber[400],
    },
    cardReminder: {
      backgroundColor: colors.green[200],
      borderColor: colors.green[500]
    },
    keywordRow: {
      '& > *': {
        margin: theme.spacing(0.5),
      }
    },
    feedbackRow: {
      backgroundColor: colors.grey[200],
      color: colors.grey[600],
      padding: theme.spacing(1),
    },
    feedbackButtonContainer: {
      display: 'flex',
      flexDirection: 'column'
    },
    iconButton: {
      padding: 0,
      color: colors.grey[400],
      '&:hover':{
        color: colors.grey[600]
      }
    },
    iconButtonActive: {
      color: colors.grey[600]
    },
    Row: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    menuIcon: {
      color: colors.grey[600]
    },
    content: {
      flexGrow: 1
    },
    opaque: {
      opacity: 0.5
    }
}));

const AlertCard = (props) => {

  const classes = useStyles();
  const { history, item, key, showDismissed } = props;
  const [ feedback, setFeedback ] = useState(item.feedback)

  function submitFeedback(id, feedback){
    axios.put( serverURL+'alert?id='+id, {
      feedback: feedback,
    })
    setFeedback(feedback)
  }

  if (showDismissed || feedback !== false)
  return (
    <Card
      elevation={2}
      className={classnames(
        classes.card,
        item.category === 'alert'? classes.cardAlert :
        item.category === 'warning'? classes.cardWarning : 
        item.category === 'reminder'? classes.cardReminder : null,
        feedback === false? classes.opaque: null
      )}
    key={key}
    >
      <CardContent
        onClick={()=>history.push("/counterparty?symbol="+item.counterparty.symbol)}
        className={classes.content}
      >
        <div className={classes.Row}>
          <Typography variant="h6" className={classes.companyName}>
            {/* {item.counterparty} */}
            {item.counterparty.name} ({item.counterparty.symbol})
          </Typography>
          <Typography color="textSecondary">
            {item.date.substring(0, 10)}
          </Typography>
        </div>
        <Typography>
          {generateAlertContent(item)}
        </Typography>
        <div className={classes.keywordRow}>
          {item?.keywords?.map((keyword, index) => (
            <Chip key={index} label={keyword}/>
          ))}
        </div>
      </CardContent>
      <CardContent className={classes.feedbackRow}>
        <div className={classes.feedbackButtonContainer}>
          <IconButton className={[classes.iconButton, feedback? classes.iconButtonActive: null]} onClick={()=>submitFeedback(item.id, true)}>
            <CheckCircleIcon/>
          </IconButton>
          <IconButton className={[classes.iconButton, feedback === false? classes.iconButtonActive: null]} onClick={()=>submitFeedback(item.id, false)}>
          <CancelIcon/>
          </IconButton>
        </div>
      </CardContent>
    </Card>
  ); else return null;

}

export default withRouter(AlertCard)
