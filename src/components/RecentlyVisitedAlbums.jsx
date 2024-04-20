import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

const RecentlyVisitedAlbums = () => {
  const [recentlyVisitedAlbums, setRecentlyVisitedAlbums] = useState([]);
  const [albumsWithDetails, setAlbumsWithDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedAlbums =
      JSON.parse(localStorage.getItem("visitedAlbums")) || [];
    setRecentlyVisitedAlbums(storedAlbums);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "recentlyVisitedAlbums",
      JSON.stringify(recentlyVisitedAlbums)
    );
  }, [recentlyVisitedAlbums]);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      setLoading(true);
      console.log(recentlyVisitedAlbums);
      const promises = recentlyVisitedAlbums.map((albumId) => {
        return fetch(
          `https://jsonplaceholder.typicode.com/albums/${parseInt(albumId)}`
        )
          .then((response) => response.json())
          .then((album) => album);
      });
      Promise.all(promises)
        .then((albums) => {
          setAlbumsWithDetails(albums);
          setLoading(false);
        })
        .catch((error) =>
          console.error("Error fetching album details:", error)
        );
    };

    if (recentlyVisitedAlbums.length > 0) {
      fetchAlbumDetails();
    }
  }, [recentlyVisitedAlbums]);

  const handleVisitAlbum = (album) => {
    const updatedAlbums = [
      album,
      ...recentlyVisitedAlbums.filter((a) => a.id !== album.id),
    ];
    setRecentlyVisitedAlbums(updatedAlbums.slice(0, 5));
  };

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
