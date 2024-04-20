// App.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';
import UsersList from './components/UsersList';
import UserDetails from './components/UserDetails';
import TodosList from './components/TodosList';
import RecentlyVisitedAlbums from './components/RecentlyVisitedAlbums';

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Red Social
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Routes>
              <Route path="/" element={<UsersList />} />
              <Route path="/users/:userId" element={<UserDetails />} />
            </Routes>
          </Grid>
          <Grid item xs={12} sm={4}>
            <RecentlyVisitedAlbums />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
