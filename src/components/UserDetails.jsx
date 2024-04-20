import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Grid,
} from "@mui/material";
import TodosList from "./TodosList";
import AlbumList from "./AlbumList";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userAlbums, setUserAlbums] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching user details:", error));

    fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/albums`)
      .then((response) => response.json())
      .then((data) => {
        setUserAlbums(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }, [userId]);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Detalles del Usuario
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : user ? (
        <>
          <List>
            <ListItem>
              <ListItemText primary={`Nombre: ${user.name}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Usuario: ${user.username}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Email: ${user.email}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Ciudad: ${user.address.city}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Sitio web: ${user.website}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Empresa: ${user.company.name}`} />
            </ListItem>
          </List>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TodosList userId={userId} />
            </Grid>
            <Grid item xs={12} md={6}>
              <AlbumList albums={userAlbums} />
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="body1">Usuario no encontrado</Typography>
      )}
    </>
  );
};

export default UserDetails;
