import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import nextAvatar from './avatar/next.jpg';
import nubankAvatar from './avatar/nubank.jpg';
import neonAvatar from './avatar/neon.jpg';
import interAvatar from './avatar/inter.jpg';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 510,
  },
  tableCaption: {
    padding: theme.spacing.unit * 3,
  },

  cell: {
    paddingRight:10,
    paddingLeft:10,
  },

  extraCosts: {
    padding: 0,
    minWidth: 0,
    minHeight: 0,
  },
});


function ResultTable(props) {
  const { classes, rank } = props;
  const rows = rank.reduce((a, b) => [b].concat(a));

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Conta</TableCell>
            <TableCell className={classes.cell} numeric>Mensalidade</TableCell>
            <TableCell className={classes.cell} numeric>TED</TableCell>
            <TableCell className={classes.cell} numeric>Saque</TableCell>
            <TableCell className={classes.cell} numeric>Pontuação pelo perfil</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            const avatar = (() =>{
              switch (row.bank) {
                case 'nubank': return nubankAvatar;
                case 'neon': return neonAvatar;
                case 'next': return nextAvatar;
                case 'inter': return interAvatar;
                default: break;
              }
            })();

            const extraFeeText = (() =>{
              switch (row.name) {
                case 'nuconta': return "Custo do programa de pontos";
                case 'neon+': return "Tem que fazer 10 compras por mês para se tornar +";
                default: break;
              }
            })();

            const extraFees = row.extrasFees.length > 0 ? row.extrasFees.reduce((a, b) => a + b) : 0;

            const transfersCosts = !isNaN(row.transferCosts) ? 'R$' + row.transferCosts.toFixed(2) : 'indisp.';
            const withdrawCosts = !isNaN(row.withdrawCosts) ? 'R$' + row.withdrawCosts.toFixed(2) : 'indisp.';

            const transfersCostsComponent = row.transferCosts.toFixed(2) > 0 ? (
              <Tooltip title={`Custo da TED x Quantidade Informada`} placement="left">
                <Button color="secondary" className={classes.extraCosts}>{transfersCosts}</Button>
              </Tooltip>
            ) : (transfersCosts);

             const withdrawCostsComponent = row.withdrawCosts.toFixed(2) > 0 ? (
              <Tooltip title={`Saque x Quantidade Informada`} placement="left">
                <Button color="secondary" className={classes.extraCosts}>{withdrawCosts}</Button>
              </Tooltip>
            ) : (withdrawCosts);

            const extraFeesInfo = () => {
              if (extraFees > 0) {
                return(
                  <Tooltip title={extraFeeText} placement="left">
                    <Button color="secondary" className={classes.extraCosts}>+ R${extraFees} </Button>
                  </Tooltip>
                ); 
              }

              return null;
            }

            return (
              <TableRow key={row.bank + row.name}>
                <TableCell component="th" scope="row">
                  <Chip 
                    label={row.name}
                    avatar={<Avatar src={avatar}/>}
                    variant="outlined" 
                    onClick={() => props.clickOnBank(row.bank)}
                  />
                </TableCell>
                <TableCell className={classes.cell} numeric>
                  R${row.monthlyFee}<br />
                  {extraFeesInfo()}
                </TableCell>
                <TableCell className={classes.cell} numeric>{transfersCostsComponent}</TableCell>
                <TableCell className={classes.cell} numeric>{withdrawCostsComponent}</TableCell>
                <TableCell className={classes.cell} numeric>{row.grade.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className={classes.tableCaption}>
        <Typography variant="caption" align="center" color="textSecondary" paragraph>
          Pontos calculados de acordo com a formula: <br /><strong>(Requisitos x 4) + (Solidez x 3) + (Reputação x 3) / 10</strong>.
        </Typography>
        <Grid container alignContent="center" alignItems="center" justify="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.onBack()}
          >
            Voltar
          </Button>
        </Grid>
      </div>
    </Paper>
  );
}

ResultTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResultTable);
