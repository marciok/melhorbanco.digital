import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/lab/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = theme => ({
  buttons: {
    marginTop:theme.spacing.unit * 3,
    display: 'flex',
    justifyContent: 'center',
  },
})

class BankForm extends Component {

  state = {
    numberOfTransfers: 0,
    numberOfWithdraws: 0,
  }

  handleTransferChange = (event, value) => {
    const numberOfTransfers = Number.parseInt(value / 10);
    this.setState({ numberOfTransfers: numberOfTransfers });
    this.props.onTransferChange(numberOfTransfers);
  }

  handleWithdrawChange = (event, value) => {
    const numberOfWithdraws = Number.parseInt(value / 10);
    this.setState({ numberOfWithdraws: Number.parseInt(value / 10) });
    this.props.onWithdrawChange(numberOfWithdraws);
  }

  render(){
    const loading = this.props.loading;
    const { numberOfTransfers, numberOfWithdraws } = this.state;

    return(
      <Fragment>
        <Fragment>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel control={ <Switch color="primary" disabled={loading} value="creditCard" /> }
                label="Quero cartão de crédito"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel control={ <Switch color="primary" disabled={loading} value="creditCard" /> }
                label="Com milhas"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel control={ <Switch color="primary" disabled={loading} value="creditCard" /> }
                label="Mensalidade zerada"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel control={ <Switch color="primary" disabled={loading} value="creditCard" /> }
                label="Vai precisar de Crédito?"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel control={ <Switch color="primary" disabled={loading} value="creditCard" /> }
                label="Pagar boletos?"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel control={ <Switch color="primary" disabled={loading} value="creditCard" /> }
                label="Recarga para celular"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography id="label">Quantidade de TEDs por mês? <strong>{numberOfTransfers}</strong></Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Slider
                style={{margin: '10px'}}
                value={numberOfTransfers * 10}
                onChange={this.handleTransferChange}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography id="label">Saque em caixa 24hrs <strong>{numberOfWithdraws}</strong></Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Slider
                style={{margin: '10px'}}
                value={numberOfWithdraws * 10}
                onChange={this.handleWithdrawChange}
                disabled={loading}
              />
            </Grid>
          </Grid>
        </Fragment>
        <Fragment>
          <div className={this.props.classes.buttons}>
            {loading ? (
                <CircularProgress variant="indeterminate" />
               ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.props.onSubmitForm()}
                >
                  Calcular
                </Button>
              )}
            </div>
        </Fragment>
      </Fragment>
    );
  }
}

export default withStyles(styles)(BankForm);

