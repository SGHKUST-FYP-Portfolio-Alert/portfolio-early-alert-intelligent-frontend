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


const useStyles = makeStyles((theme) => ({
  companyName: {
    fontWeight: 'bold',
  },
  dashboard: {
    textAlign: 'center',
    padding: theme.spacing(3),
  },
  card: {
    width: '70%',
    margin: 'auto',
    marginBottom: theme.spacing(3),
    textAlign: 'left'
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
  }
}));

const Dashboard = (props) => {

  const classes = useStyles();
  const { history } = props;

  const data = [
    { 'company_id': 'mitsubishi', 'company_name': 'Mitsubishi Co.', 'type': 'alert', 'content': 'Sentiment Score drop to 2.3', 'keywords': ['JPY rises', 'semicondutor price'] },
    { 'company_id': 'wanda', 'company_name': 'Wanda Group', 'type': 'warning', 'content': "Moody's rating drops from BB+ to BB", 'keywords': ['government', 'fine', 'policy'] }
  ]
  return (
    <div className={classes.dashboard}>
      { data.map((item, index) =>
        <Card
          className={classnames(
            classes.card,
            item.type === 'alert'? classes.cardAlert :
            item.type === 'warning'? classes.cardWarning : null
          )}
          key={index}
        >
          <CardContent
            onClick={()=>history.push("/counterparty?id="+item.company_id)}
          >
            <div className={classes.Row}>
              <Typography variant="h6" className={classes.companyName}>
                {item.company_name}
              </Typography>
              <Typography color="textSecondary">
                {item.type}
              </Typography>
            </div>
            <Typography>
              {item.content}
            </Typography>
            <div className={classes.keywordRow}>
              {item.keywords.map((keyword, index) => (
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
      )}
    </div>
  );
}

export default withRouter(Dashboard)