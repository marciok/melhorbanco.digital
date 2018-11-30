import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';

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

import Disqus from 'disqus-react';

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
  cell: {
    paddingRight:10,
    paddingLeft:10,
  },
});


class Bank extends Component {

  state = {
    loadingComplains: true,
    complainsGrade: 'Carregando...',
  };

  fetchReclameAqui = id => {
    fetch(
      `https://iosearch.reclameaqui.com.br/raichu-io-site-search-v1/complains?index=0&offset=4&order=created&orderType=desc&fields=title,solved,status,evaluated,interactions,userName,userCity,created,id,company,userState,description&deleted=bool:false&company=${id}`,
      {"method":"GET","mode":"cors"})
      .then(data => data.json())
      .then(result => {
        this.complains = result.data;
        this.setState({loadingComplains: false});
      })
      .catch(error => console.error(error));
  }

  fetchGradeForBank = id => {
    fetch(`https://iosearch.reclameaqui.com.br/raichu-io-site-search-v1/query/companyComplains/10/0?company=${id}`,{"mode":"cors"})
    .then(data => data.json())
    .then(result => this.setState({complainsGrade: result.complainResult.complains.companies[0].index.finalScore}))
    .catch(error => console.error(error));
  }

  componentWillMount(){
    this.bank = (() => {
      switch (this.props.name) {
        case 'nubank': 
          this.logo = nubankLogo;
          return nubank;
        case 'next':
          this.logo = nextLogo;
          return next;
        case 'neon':
          return {
            title: 'Next',
          }
        default: break;
      };
    })();

    this.fetchReclameAqui(this.bank.reclameAquiId);
    this.fetchGradeForBank(this.bank.reclameAquiId);
  }

  renderAccounts = accounts => {
    const { classes } = this.props;
    let id = 0;

    return(
      <Fragment>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>Conta</TableCell>
              <TableCell className={classes.cell}>Mensalidade</TableCell>
              <TableCell className={classes.cell}>Cartão de crédito?</TableCell>
              <TableCell className={classes.cell}>Programa de pontos?</TableCell>
              <TableCell className={classes.cell}>TEDs</TableCell>
              <TableCell className={classes.cell}>Saque em caixa eletronico?</TableCell>
              <TableCell className={classes.cell}>Cheque?</TableCell>
              <TableCell className={classes.cell}>Oferece crédito?</TableCell>
              <TableCell className={classes.cell}>Pagar boletos?</TableCell>
              <TableCell className={classes.cell}>Recarga Celular?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {accounts.map(account => {
            const { features, title } = account;
            const { creditCard, monthlyPayment, transfer, withdraw, credit, rewards, barcodePayments, paycheck, phoneRecharge } = features;
            id += 1;

            return(
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {title}
                </TableCell>
                <TableCell className={classes.cell}>{monthlyPayment}</TableCell>
                <TableCell className={classes.cell}>{creditCard}</TableCell>
                <TableCell className={classes.cell}>{rewards}</TableCell>
                <TableCell className={classes.cell}>{transfer}</TableCell>
                <TableCell className={classes.cell}>{withdraw}</TableCell>
                <TableCell className={classes.cell}>{paycheck}</TableCell>
                <TableCell className={classes.cell}>{credit}</TableCell>
                <TableCell className={classes.cell}>{barcodePayments}</TableCell>
                <TableCell className={classes.cell}>{phoneRecharge}</TableCell>
              </TableRow>
            );
          })}
          </TableBody>
        </Table>
      </Fragment>
    );
  }

  renderComments = () => {
    const disqusConfig = {
      url: `http://melhorbanco.digital/${this.bank.name}`,
      identifier: this.bank.name,
    };

    return <Disqus.DiscussionEmbed shortname={"melhorbanco-digital"} config={disqusConfig} />
  }

  renderComplains = () => {
    if (!this.complains) {
      return <CircularProgress variant="indeterminate" />
    }

    let id = 0;
    return this.complains.map(complain => {
      id += 1;

      return (
        <ListItem key={id}>
          <ListItemAvatar>
            <Avatar alt="ReclameAqui" src={reclameAquiAvatar} />
          </ListItemAvatar>
          <ListItemText
            primary={complain.title}
            secondary={
              <Fragment>
                <Typography component="span" className={this.props.classes.inline} color="textPrimary">
                  {`${complain.userCity}`}
                </Typography>
                {` — ${complain.description.substring(0,85)}…`}
              </Fragment>
            }
          />
        </ListItem>
      );
    })
  }

  renderReputation = () => {
    let id = 0;
    return this.bank.reputation.map(reputation => {
      id += 1;

      return (
        <Typography key={id} variant="body1" color="textPrimary" paragraph>
          {reputation}
        </Typography>
      );
    })
  }

  render() {
    const { classes } = this.props;
    const { title, intro, accounts, website } = this.bank;

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
                  Solidez
                </Typography>
                {this.renderReputation()}
                </CardContent>
                <CardActions>
                  <Tooltip title={"Nota subjetiva utlizando os critérios: tempo de mercado, segurança e últimas notícias."}>
                    <Button color="primary" variant="outlined" className={classes.button}>
                      Nota {this.bank.reputationGrade}
                    </Button>
                  </Tooltip>
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
                    Reputação
                  </Typography>
                  <List>
                    {this.renderComplains()}
                  </List>
                </CardContent>
                <CardActions>
                  <Button 
                    color="primary"
                    variant="outlined"
                    className={classes.button}
                    onClick={() => window.open(this.bank.reclameAquiURL)}
                  >
                    Nota {this.state.complainsGrade}
                  </Button>  
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          <Card className={classes.card} style={{marginTop: '30px'}}>
            <Typography variant="title" align="left" color="textPrimary" paragraph>
              <IconButton>
                <SvgIcon>
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                </SvgIcon>
              </IconButton>
              Contas
            </Typography>
            <CardContent className={classes.tableContent}>
              {this.renderAccounts(accounts)}
            </CardContent>
          </Card>
          <Card className={classes.card} style={{marginTop: '30px'}}>
            <Typography variant="title" align="left" color="textPrimary" paragraph>
              <IconButton>
                <SvgIcon>
                  <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                </SvgIcon>
              </IconButton>
              Comentários
            </Typography>
            <CardContent>
              {this.renderComments()}
            </CardContent>
          </Card>
        </main>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Bank);



