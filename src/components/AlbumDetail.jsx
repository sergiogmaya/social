import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";

const AlbumDetail = () => {
  const { albumId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //función para obtener las fotos de cada album (investigue un poco y pude ver el ep necesario para ello)
    fetch(`${process.env.REACT_APP_API_URL}photos?albumId=${albumId}`)
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching photos:", error));

      //obtención de los albumes visitados en la sesión local del navegador
    const visitedAlbums =
      JSON.parse(localStorage.getItem("visitedAlbums")) || [];
    if (!visitedAlbums.includes(albumId)) {
      const updatedVisitedAlbums = [...visitedAlbums, albumId];
      localStorage.setItem(
        "visitedAlbums",
        JSON.stringify(updatedVisitedAlbums)
      );
    }
  }, [albumId]);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Detalles del Álbum
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {photos.map((photo) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={photo.thumbnailUrl}
                  alt="Photo Thumbnail"
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default AlbumDetail;
