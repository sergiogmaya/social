import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  CircularProgress,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Link } from 'react-router-dom';

const AlbumList = ({ albums }) => {
  const [albumsWithPhotos, setAlbumsWithPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lógica para obtener las fotos de los álbumes desde la API
    fetch(`https://jsonplaceholder.typicode.com/photos`)
      .then((response) => response.json())
      .then((photos) => {
        const albumsWithFirstPhoto = albums.map((album) => {
          const firstPhoto = photos.find((photo) => photo.albumId === album.id);
          return {
            ...album,
            firstPhoto: firstPhoto ? firstPhoto.url : null, // URL de la primera foto o null si no hay fotos
          };
        });
        setAlbumsWithPhotos(albumsWithFirstPhoto);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching photos:", error));
  }, [albums]);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Lista de Álbumes
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {albumsWithPhotos.map((album) => (
            <ListItem key={album.id} component={Link} to={`/albums/${album.id}`}>
              <Card sx={{ maxWidth: 200 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={album.firstPhoto}
                    alt="Album Thumbnail"
                  />
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      {album?.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}

export default AlbumList;
