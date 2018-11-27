import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
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
    minWidth: 500,
  },
  tableCaption: {
    padding: theme.spacing.unit * 3,
  }
});

let id = 0;
function createData(name, avatar, monthlyPay, points) {
  id += 1;
  return { id, name, avatar, monthlyPay, points};
}

const rows = [
  createData('Nubank nuconta', nubankAvatar, "R$ 10,00", '79.9%'),
  createData('Next light', nextAvatar, "R$ 10,00", '79.9%'),
  // createData('Next next', nextAvatar, 262, 16.0, 24, 6.0),
  // createData('Next turbinado', nextAvatar, 305, 3.7, 67, 4.3),
  // createData('Neon', neonAvatar, 356, 16.0, 49, 3.9),
  // createData('Neon+', neonAvatar, 356, 16.0, 49, 3.9),
];

function ResultTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Conta</TableCell>
            <TableCell numeric>Mensalidade</TableCell>
            <TableCell numeric>Pontos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <Chip 
                    label={row.name}
                    avatar={<Avatar src={row.avatar}/>}
                    variant="outlined" 
                    onClick={() => alert('click')}
                  />
                </TableCell>
                <TableCell numeric>{row.monthlyPay}</TableCell>
                <TableCell numeric>{row.points}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className={classes.tableCaption}>
        <Typography variant="caption" align="center" color="textSecondary" paragraph>
           Pontos calculados de acordo com a formula: Requisitos x 10 + Reputação + Atendimento.
           Mensalidade calculada em relação a número de TEDs e saques informados no formulário. 
        </Typography>
      </div>
    </Paper>
  );
}

ResultTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResultTable);
