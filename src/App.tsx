import { useState, useCallback, KeyboardEvent } from 'react';
import {
  Button,
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';

import { useStore } from './todoStore';

const useStyles = makeStyles((theme) => ({
  headerTextStyles: {
    textAlign: "center",
    marginBottom: theme.spacing(3),
  },
  textBoxStyles: {
    marginBottom: theme.spacing(1),
  },
  addButtonStyles: {
    marginBottom: theme.spacing(2),
  },
  completedTodoStyles: {
    textDecoration: "line-through",
  },
}));





function App() {
 const {
    headerTextStyles,
    textBoxStyles,
    addButtonStyles,
    completedTodoStyles,
  } = useStyles();

  const [todoText, setTodoText] = useState('');
  const {addTodo, removeTodo, toggleCompletedState, todos} = useStore();
  
  const onKeyDown = useCallback((e : KeyboardEvent<HTMLInputElement>) : void =>{
      // if (!todoText.trim()) {
      //       return;
      //     }
    if(e.key === 'Enter'){
        addTodo(todoText);
        setTodoText('');
    }
},[todoText]);
  return (
   <Container maxWidth='xs'>
    <Typography variant='h3' className={headerTextStyles}>
      Todo to zustand
    </Typography>
    <TextField
      className={textBoxStyles}
      label='todo desc'
      required
      variant='outlined'
      fullWidth
      onChange={(e) => setTodoText(e.target.value)}
      onKeyDown={onKeyDown}
      value = {todoText}
    />
    <Button
      className={addButtonStyles}
      fullWidth
      variant='outlined'
      color='primary'
      onClick = {(e) => {
        if(todoText.length){
          addTodo(todoText);
          setTodoText('');
        }
      }}
    >
      ADD
    </Button>
    <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={todo.completed}
                onChange={() => toggleCompletedState(todo.id)}
              />
            </ListItemIcon>
            <ListItemText
              className={todo.completed ? completedTodoStyles : ""}
              key={todo.id}
            >
              {todo.desc}
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => {
                  removeTodo(todo.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
   </Container>
  );
}

export default App;
