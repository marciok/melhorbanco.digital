import React, { Component, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import reclameAquiAvatar from './avatar/reclameaqui.png';

import nubankLogo from './avatar/nubank.jpg';
import nubank from './banks/nubank.json';

import nextLogo from './avatar/next.jpg';
import next from './banks/next.json';

import './App.css';

const styles = theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
  },

  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  table: {
    minWidth: 700,
  },
  tableContent:{
    width: '800',
    overflowX: 'auto'
  },
  card: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3,
    height: '100%',
    padding: theme.spacing.unit* 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 2,
      padding: theme.spacing.unit * 2,
    },
  },
  inline: {
    display: 'inline',
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  buttons: {
    marginTop:theme.spacing.unit * 3,
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  bigAvatar: {
    margin: 10,
    width: 120,
    height: 120,
  },
});


class Bank extends Component {

  state = { };

  // fetchReclameAqui = () => {
  //   fetch("https://iosearch.reclameaqui.com.br/raichu-io-site-search-v1/complains?index=0&offset=4&order=created&orderType=desc&fields=title,solved,status,evaluated,interactions,userName,userCity,created,id,company,userState,description&deleted=bool:false&company=88850", {"credentials":"omit","headers":{"accept":"application/json, text/plain, */*","accept-language":"en-US,en;q=0.9,pt;q=0.8,pt-BR;q=0.7"},"referrer":"https://www.reclameaqui.com.br/empresa/nubank/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"})
  //     .then(data => data.json())
  //     .then(result => console.log(result))
  //     .catch(error => console.error(error));
  // }

  componentWillMount(){
    this.bank = (() => {
      switch (this.props.name) {
        case 'nubank': 
          this.logo = nubankLogo;
          return nubank;
        case 'next':
          this.logo = nextLogo;
          return next;
          break;
        case 'neon':
          return {
            title: 'Next',
          }
          break;
        default:
          return {}
      };
    })();

  }

  renderAccounts = accounts => {

    return(
      <Fragment>
        <Table className={this.props.classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Conta</TableCell>
              <TableCell>Mensalidade</TableCell>
              <TableCell>Cartão de crédito?</TableCell>
              <TableCell>Programa de pontos?</TableCell>
              <TableCell>TEDs</TableCell>
              <TableCell>Saque em caixa eletronico?</TableCell>
              <TableCell>Cheque?</TableCell>
              <TableCell>Oferece crédito?</TableCell>
              <TableCell>Pagar boletos?</TableCell>
              <TableCell>Recarga Celular?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {accounts.map(account => {
            const { features, title } = account;
            const { creditCard, monthlyPayment, transfer, withdraw, credit, rewards, barcodePayments, paycheck, phoneRecharge } = features;

            return(
              <TableRow>
                <TableCell component="th" scope="row">
                  {title}
                </TableCell>
                <TableCell>{monthlyPayment}</TableCell>
                <TableCell>{creditCard}</TableCell>
                <TableCell>{rewards}</TableCell>
                <TableCell>{transfer}</TableCell>
                <TableCell>{withdraw}</TableCell>
                <TableCell>{paycheck}</TableCell>
                <TableCell>{credit}</TableCell>
                <TableCell>{barcodePayments}</TableCell>
                <TableCell>{phoneRecharge}</TableCell>
              </TableRow>
            );
          })}
          </TableBody>
        </Table>
      </Fragment>
    );
  }

  render() {
    const { classes } = this.props;
    const { title, intro, reputation, accounts, website } = this.bank;

    return (
      <Fragment>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Grid container justify="center" alignItems="center">
              <Avatar alt={title} src={this.logo} className={classes.bigAvatar} />
            </Grid>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              {intro}
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={() => window.open(website)}>
                    Site Oficial
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Feedback
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <main className={classes.layout}>
          <Grid container spacing={24} alignItems="stretch" >
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardContent>
                <Typography variant="h6" align="left" color="textPrimary">
                  <IconButton>
                    <SvgIcon>
                      <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z" />
                    </SvgIcon>
                  </IconButton>
                  Reputação
                </Typography>
                <Typography variant="body1" color="textPrimary" paragraph>
                  {this.bank.reputation}
                </Typography>
                </CardContent>
                <CardActions>
                  <Button color="primary" variant="outlined" className={classes.button}>
                    Nota 8
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h6" align="left" color="textPrimary" paragraph>
                    <IconButton>
                      <SvgIcon>
                        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z" />
                      </SvgIcon>
                    </IconButton>
                    Reclamações
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={reclameAquiAvatar} />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Conta existente sem minha concepção"
                        secondary={
                          <Fragment>
                            <Typography component="span" className={classes.inline} color="textPrimary">
                              Rio de Janeirto - 23/09/18
                            </Typography>
                            {" — Olá, muito bom dia, meu problema começou quando minha conta do PagSeguro foi invadida…"}
                          </Fragment>
                        }
                      />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions>
                  <Button color="primary" variant="outlined" className={classes.button}>
                    Nota 7.8
                  </Button>  
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          <Card className={classes.card} style={{marginTop: '30px'}}>
            <CardContent className={classes.tableContent}>
              <Typography variant="title" align="left" color="textPrimary" paragraph>
                <IconButton>
                  <SvgIcon>
                    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                  </SvgIcon>
                </IconButton>
                Contas
              </Typography>
              {this.renderAccounts(accounts)}
            </CardContent>
          </Card>
        </main>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Bank);



