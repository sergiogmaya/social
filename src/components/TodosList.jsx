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

function TodosList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodoText, setNewTodoText] = useState("");
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Lógica para obtener la lista de TODOs desde la API
    fetch(`${process.env.REACT_APP_API_URL}/todos`)
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const handleToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

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

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

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
            <ListItem
              key={todo.id}
              onClick={() => handleToggle(todo.id)}
            >
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
