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

const useStyles = makeStyles((theme) => ({
    companyName: {
      fontWeight: 'bold',
    },
    card: {
      maxWidth: '80%',
      width: 500,
      textAlign: 'left',
      marginRight: theme.spacing(3)
    },
    cardAlert: {
      backgroundColor: colors.red[400],
    },
    cardWarning: {
      backgroundColor: colors.amber[400],
    },
    keywordRow: {
      '& > *': {
        margin: theme.spacing(0.5),
      }
    },
    feedbackRow: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: colors.grey[100],
      color: colors.grey[600],
      paddingTop: theme.spacing(1),
      paddingBottom: `${theme.spacing(1)}px !important`
    },
    feedbackButtonContainer: {
      display: 'flex'
    },
    iconButton: {
      padding: 0
    },
    Row: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    cardRow: {
      display: 'flex',
      width: '100%',
      margin: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.grey[100],
      marginBottom: theme.spacing(1)
    },
    menuIcon: {
      color: colors.grey[600]
    },
}));

const AlertCard = (props) => {

  const classes = useStyles();
  const { history, item, key } = props;

  return (
  <div className={classes.cardRow}>
    <Card
      className={classnames(
        classes.card,
        item.class === 'alert'? classes.cardAlert :
        item.class === 'warning'? classes.cardWarning : null
      )}
    key={key}
    >
      <CardContent
        onClick={()=>history.push("/counterparty?symbol="+item.counterparty)}
      >
        <div className={classes.Row}>
          <Typography variant="h6" className={classes.companyName}>
            {item.counterparty}
          </Typography>
          <Typography color="textSecondary">
            {item.date.substring(0, 10)}
          </Typography>
        </div>
        <Typography>
          {item.type} by {Math.abs(item.value).toFixed(3)} (once per {Math.round(1/item.percentile)} days)
        </Typography>
        <div className={classes.keywordRow}>
          {item?.keywords?.map((keyword, index) => (
            <Chip key={index} label={keyword}/>
          ))}
        </div>
      </CardContent>
      <CardContent className={classes.feedbackRow}>
        <Typography>
          Is this correct?
        </Typography>
        <div className={classes.feedbackButtonContainer}>
          <IconButton className={classes.iconButton} onClick={()=>{console.log('here')}}>
            <CheckCircleIcon/>
          </IconButton>
          <IconButton className={classes.iconButton} onClick={()=>{}}>
          <CancelIcon/>
          </IconButton>
        </div>
      </CardContent>
    </Card>
    <MenuIcon className={classes.menuIcon}/>
  </div>
  )

}

export default withRouter(AlertCard)
