
import './App.css';
import Task from './components/Task';
import AddTaskForm from './components/Form';
import React, { useState, useEffect } from 'react';
import { getTasks, addTask, deleteTask, updateTask } from './api/tasky-api';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function App() {

  // Load tasks from MongoDB
  const [taskState, setTaskState] = useState({ tasks: [] });

  useEffect(() => {
    getTasks().then(tasks => {
      setTaskState({ tasks: tasks });
    });
  }, []);

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "Low"
  });

  // Mark a task as done or not done
  const doneHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    tasks[taskIndex].done = !tasks[taskIndex].done;
    updateTask(tasks[taskIndex]);
    setTaskState({ tasks });
  };

  // Delete a task from MongoDB
  const deleteHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    const id = tasks[taskIndex]._id;
    tasks.splice(taskIndex, 1);
    deleteTask(id);
    setTaskState({ tasks });
  };

  // Handle changes in the form
  const formChangeHandler = (event) => {
    let form = { ...formState };

    switch (event.target.name) {
      case "title":
        form.title = event.target.value;
        break;
      case "description":
        form.description = event.target.value;
        break;
      case "deadline":
        form.deadline = event.target.value;
        break;
      case "priority":
        form.priority = event.target.value;
        break;
      default:
        form = formState;
    }

    setFormState(form);
  };

  // Add a new task to MongoDB
  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const tasks = taskState.tasks ? [...taskState.tasks] : [];
    const form = { ...formState };

    const newTask = await addTask(form);

    tasks.push(newTask);
    setTaskState({ tasks });
  };

  return (
    <div className="container">

      {/* App Header */}
      <Container component="main">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            backgroundColor: 'gray',
            textAlign: 'center',
            color: 'white',
            padding: '20px',
            margin: '20px 0 40px 0',
            borderRadius: '4px'
          }}
        >
          Tasky
        </Typography>
      </Container>

      {/* Task Card Grid */}
      <Container maxWidth="md" component="main">
        <Grid
          container
          spacing={5}
          sx={{
            justifyContent: "center"
          }}
        >
          {taskState.tasks.map((task, index) => (
            <Task
              title={task.title}
              description={task.description}
              deadline={
                task.deadline
                ? new Date(task.deadline).toLocaleDateString('en-IE', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  timeZone: 'UTC'
              })
              : 'No deadline'
            }
              priority={task.priority}
              done={task.done}
              key={task._id}
              markDone={() => doneHandler(index)}
              deleteTask={() => deleteHandler(index)}
            />
          ))}
        </Grid>
      </Container>

      {/* Footer - Add Task Form */}
      <Container
        component="footer"
        sx={{
          borderTop: (theme) =>
            `1px solid ${theme.palette.divider}`,
          my: 6,
          py: 6,
        }}
      >
        <Grid
          container
          sx={{
            justifyContent: "center"
          }}
        >
          <AddTaskForm
            submit={formSubmitHandler}
            change={formChangeHandler}
          />
        </Grid>
      </Container>

    </div>
  );
}

export default App;
