import React, { Component, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import ResultTable from './ResultTable.js';
import BankForm from './BankForm.js';

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
});


class Home extends Component {

  state = {
    loadingResult: false,
    showTable: false,
  };

  handleTEDChange = (event, value) => {
    this.setState({ numberOfTEDs: value });
  }

  handleATMChange = (event, value) => {
    this.setState({ withdrawATM: value });
  }

  loadResult = () => {
    this.setState({loadingResult: true});
    this.setState({showTable: true});
  }

  renderPaperContent = () => {
    const { loadingResult, showTable } = this.state;

    if (showTable) {
      return (
        <ResultTable
          clickOnBank={bank => {
            window.open("/" + bank);
          }}
        />
      );
    }

    return(
      <BankForm 
        loading={loadingResult}
        onTransferChange={value => {
          // console.log(value)
        }}
        onWithdrawChange={value => {
          // console.log(value)
        }}
        onSubmitForm={this.loadResult}
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
              É só informar o que precisa que será calculado as melhores opções de conta dos bancos digitais mais conhecidos:
              Nubank, Next, Inter e Neon. Também levado em consideração a nota de satisfação do ReclameAqui e o que os consumidores estão falando nas mídias socias.
            </Typography>
          </div>
        </div>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            {this.renderPaperContent()}
          </Paper>
        </main>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Home);


