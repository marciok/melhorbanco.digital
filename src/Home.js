import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import ResultTable from './ResultTable.js';
import BankForm from './BankForm.js';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import calculateBankRank from './calculator/calculate';

import nubankLogo from './avatar/nubank.jpg';
import nextLogo from './avatar/next.jpg';
import neonLogo from './avatar/neon.jpg';
import interLogo from './avatar/inter.jpg';


import './App.css';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  bigAvatar: {
    margin: 10,
    width: 80,
    height: 80,
  },
});


class Home extends Component {

  state = {
    loadingResult: false,
    showTable: false,
    feedback: false,
    creditCard: false,
    rewards: false,
    noMonthlyFee: false,
    payBarcode: false,
    phoneCharge: false,
    credit: false,
    transfers: 0,
    withdraws: 0,
  };

  handleTEDChange = (event, value) => {
    this.setState({ numberOfTEDs: value });
  }

  handleATMChange = (event, value) => {
    this.setState({ withdrawATM: value });
  }

  loadResult = () => {
    this.setState({loadingResult: true});
    const  {
      credit,
      noMonthlyFee,
      creditCard, 
      rewards, 
      payBarcode,
      transfers,
      withdraws,
      phoneCharge,
    } = this.state;

    calculateBankRank({
      credit,
      noMonthlyFee,
      creditCard, 
      rewards, 
      payBarcode,
      phoneCharge,
      transfers,
      withdraws,
    })
    .then(rank => {
      this.rank = rank;
      this.setState({showTable: true});
    })
    .catch(error =>  console.warn(error) /*this.setState({feedback: true})*/)
    .finally(() => this.setState({loadingResult: false}))
  }

  renderPaperContent = () => {
    const { loadingResult, showTable } = this.state;

    if (showTable) {
      return (
        <Fragment>
          <Typography variant="h6" gutterBottom>
            Ranque das melhores opções e custos mensais
          </Typography>
          <ResultTable
            rank={this.rank}
            clickOnBank={bank => window.open("/" + bank)}
            onBack={() => this.setState({showTable: false})}
          />
        </Fragment>
      );
    }

    return(
      <BankForm 
        features={this.state}
        onChangeFeature={(featureChanged, value) => this.setState({[featureChanged]: value})}
        loading={loadingResult}
        onSubmitForm={this.loadResult}
      />
    );
  }

  feedbackMessage = () => {
    const { classes } = this.props;

    return(
      <Snackbar
         anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
         aria-describedby="client-snackbar"
         open={this.state.feedback}
         message={
            <span id="client-snackbar" className={classes.message}>
              <ErrorIcon className={classNames(classes.icon, classes.iconVariant)} />
              Opss.. Não foi possível concluir seu pedido
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={() => this.setState({feedback: false})}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
      />
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Qual é o melhor banco digital pra você?
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              É só informar o que precisa para calcular as melhores opções de conta nos bancos digitais mais conhecidos.
              Também levado em consideração a nota do ReclameAqui e a solidez.
            </Typography>
            <Grid container justify="center" alignItems="center">
              <Avatar className={classes.bigAvatar} alt="Nubank" src={nubankLogo} />
              <Avatar className={classes.bigAvatar} alt="Neon" src={neonLogo} />
              <Avatar className={classes.bigAvatar} alt="Inter" src={interLogo} />
              <Avatar className={classes.bigAvatar} alt="Next" src={nextLogo} />
            </Grid>
          </div>
        </div>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            {this.renderPaperContent()}
          </Paper>
        </main>
        {this.feedbackMessage()}
      </Fragment>
    );
  }
}

export default withStyles(styles)(Home);


