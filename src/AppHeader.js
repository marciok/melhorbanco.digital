import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import SvgIcon from '@material-ui/core/SvgIcon';


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
            <Button color="primary" onClick={() => {
              window.location.href = "/";
            }}>
              <SvgIcon style={{marginRight: 5}}>
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
              </SvgIcon>
              MelhorBanco.Digital
            </Button> 
          </Typography>
        </Toolbar>
      </AppBar>
    </Fragment>
)};

export default withStyles(styles)(AppHeader);

