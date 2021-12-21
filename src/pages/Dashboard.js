import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import AlertCard from '../components/AlertCard';

const useStyles = makeStyles((theme) => ({
  dashboard: {
    textAlign: 'center',
    padding: theme.spacing(3),
  },
}));

const Dashboard = (props) => {

  const classes = useStyles();
  const { history } = props;

  const data = [
    { 'company_id': 'mitsubishi', 'company_name': 'Demo Company 1', 'type': 'alert', 'content': 'Sentiment score drop to 2.3', 'keywords': ['currency', 'price'] },
    { 'company_id': 'wanda', 'company_name': 'Demo Company 2', 'type': 'warning', 'content': "Possible legal issues", 'keywords': ['legal', 'fine', 'policy'] }
  ]
  return (
    <div className={classes.dashboard}>
      { data.map((item, index) =>
        <AlertCard item={item} key={index}/>
      )}
    </div>
  );
}

export default withRouter(Dashboard)