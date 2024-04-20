// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';
import UsersList from './components/UsersList';
import UserDetails from './components/UserDetails';
import TodosList from './components/TodosList';
import RecentlyVisitedAlbums from './components/RecentlyVisitedAlbums';

function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Red Social
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Switch>
              <Route exact path="/" component={UsersList} />
              <Route exact path="/users/:userId" component={UserDetails} />
              <Route exact path="/todos" component={TodosList} />
            </Switch>
          </Grid>
          <Grid item xs={12} sm={4}>
            <RecentlyVisitedAlbums />
          </Grid>
        </Grid>
      </Container>
    </Router>
  );
}

export default App;
