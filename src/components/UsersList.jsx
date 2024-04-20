import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from "@mui/material";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Lista de Usuarios
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {users.map((user) => (
            <React.Fragment key={user.id}>
              <ListItem button component={Link} to={`/users/${user.id}`}>
                <ListItemText primary={user.name} secondary={user.email} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </>
  );
};

export default UsersList;