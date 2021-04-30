/* eslint-disable react/prop-types */
import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useHistory, useLocation } from 'react-router';
import { format } from 'date-fns';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  page: {
    background: '#f9f9f9',
    width: '100%',
    padding: theme.spacing(3),
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  title: {
    padding: theme.spacing(3),
  },
  root: {
    display: 'flex',
  },
  active: {
    background: '#f4f4f4',
  },
  appbar: {
    // width: `calc(100% - ${drawerWidth}px)`,
  },
  toolbar: theme.mixins.toolbar,
  date: {
    flexGrow: 1,
  },
  avatar: {
    marginLeft: theme.spacing(2),
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: 'My Notes',
      icon: <SubjectOutlined color="secondary" />,
      path: '/',
    },
    {
      text: 'Create Note',
      icon: <AddCircleOutlined color="secondary" />,
      path: '/create',
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          <Button onClick={() => history.push('/')} endIcon={<ViewComfyIcon />}>
            View Your Recipes
          </Button>
          <Button onClick={() => history.push('/create')} endIcon={<AddIcon />}>
            Create New Recipe
          </Button>
          <Typography className={classes.date}>
            Today is the {format(new Date(), 'do MMMM Y')}
          </Typography>
          <Typography>Beep</Typography>
          <Avatar src="/Beep.jpg" className={classes.avatar} />
        </Toolbar>
      </AppBar>
      {/* <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            Beep Notes
          </Typography>
        </div>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              className={location.pathname === item.path ? classes.active : null}
              onClick={() => history.push(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer> */}
      <div className={classes.page}>
        <div className={classes.toolbar} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
