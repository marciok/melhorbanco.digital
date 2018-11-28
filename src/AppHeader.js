import React, { Component, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
  },
 });

const AppHeader = props => {
  const { classes } = props;

  return(
    <Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            MelhorBanco.Digital
          </Typography>
        </Toolbar>
      </AppBar>
    </Fragment>
)};

export default withStyles(styles)(AppHeader);

