import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  CircularProgress,
  TextField,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useParams } from "react-router-dom";

function TodosList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodoText, setNewTodoText] = useState("");
  const [searchText, setSearchText] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    // obtenemos los todos
    fetch(`${process.env.REACT_APP_API_URL}/todos`)
      .then((response) => response.json())
      .then((data) => {
        //filtramos los todos por el usuario correspondiente
        const userTodos = data.filter(
          (todo) => todo.userId === parseInt(userId)
        );
        setTodos(userTodos);
        setLoading(false);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  //funcion que marca y desmarca los todos
  const handleToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  //funcion para añadir todos, validando que no se incluyan numeros
  const handleAddTodo = () => {
    if (!newTodoText.trim().match(/^[a-zA-Z\s]+$/)) {
      alert("Solo se permiten caracteres alfabéticos y espacios.");
      return;
    }

    const newTodo = {
      id: todos.length + 1,
      title: newTodoText.trim(),
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTodoText("");
  };

  //borramos el todo correspondiente de la lista
  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  //buscamos por texto en la lista de todos
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  //filtramos los todos para mostrar solo los que incluyen el texto
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Lista de Tareas
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={9}>
          <TextField
            fullWidth
            label="Buscar tareas"
            value={searchText}
            onChange={handleSearch}
          />
        </Grid>
        <Grid item xs={9}>
          <TextField
            fullWidth
            label="Agregar nueva tarea"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <IconButton color="primary" onClick={handleAddTodo}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {filteredTodos.map((todo) => (
            <ListItem key={todo.id} onClick={() => handleToggle(todo.id)}>
              <Checkbox checked={todo.completed} />
              <ListItemText primary={todo.title} />
              <IconButton color="error" onClick={() => handleDelete(todo.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}

export default TodosList;
