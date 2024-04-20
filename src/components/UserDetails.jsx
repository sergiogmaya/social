// UserDetails.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import TodosList from "./TodosList";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lógica para obtener los detalles del usuario desde la API
    fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }, [userId]);

  return (
    <div>
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
          <TodosList />
        </>
      ) : (
        <Typography variant="body1">Usuario no encontrado</Typography>
      )}
    </div>
  );
};

export default UserDetails;
