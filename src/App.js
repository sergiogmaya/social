// App.js

import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';
import UsersList from './components/UsersList';
import UserDetails from './components/UserDetails';
import AlbumDetail from './components/AlbumDetail';

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Red Social
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Routes>
              <Route path="/" element={<UsersList />} />
              <Route path="/users/:userId" element={<UserDetails />} />       
              <Route exact path="/albums/:albumId" element={<AlbumDetail/>} />
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
