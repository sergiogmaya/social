import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

const RecentlyVisitedAlbums = () => {
  const [recentlyVisitedAlbums, setRecentlyVisitedAlbums] = useState([]);
  const [albumsWithDetails, setAlbumsWithDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //rescatamos los ids de los albumes visitados recientemente
    const storedAlbums =
      JSON.parse(localStorage.getItem("visitedAlbums")) || [];
    setRecentlyVisitedAlbums(storedAlbums);
  }, []);

  useEffect(() => {
    //en base a los albumes que hemos rescatado, obtenemos el detalle de cada uno de ellos para poder mostrar su titulo y enlazarlos a sus fotos
    const fetchAlbumDetails = async () => {
      setLoading(true);
      const promises = recentlyVisitedAlbums.map((albumId) => {
        return fetch(
          `${process.env.REACT_APP_API_URL}albums/${parseInt(albumId)}`
        )
          .then((response) => response.json())
          .then((album) => album);
      });

      //esperamos todas las peticiones referentes a los albumes visitados y luego lo seteamos
      Promise.all(promises)
        .then((albums) => {
          setAlbumsWithDetails(albums);
          setLoading(false);
        })
        .catch((error) =>
          console.error("Error fetching album details:", error)
        );
    };

    //comprobamos que haya albumes visitados en el navegador
    if (recentlyVisitedAlbums.length > 0) {
      fetchAlbumDetails();
    }
  }, [recentlyVisitedAlbums]);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Recién visitados
      </Typography>
      {loading ? (
        <Typography variant="body1">Cargando álbumes...</Typography>
      ) : recentlyVisitedAlbums.length === 0 ? (
        <Typography variant="body1">
          No hay álbumes recientemente visitados.
        </Typography>
      ) : (
        <List>
          {albumsWithDetails.map((album) => (
            <ListItem key={album.id} component={Link} to={`/albums/${album.id}`}>
              <ListItemText primary={`Álbum ${album.id}: "${album.title}"`} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default RecentlyVisitedAlbums;
