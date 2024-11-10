import {Box, Button, Checkbox, Container, FormControlLabel, Paper, TextField} from "@mui/material";
import {useState} from "react";

const TodoApp = () => {
    const [inputValue, setInputValue] = useState("")
    const [tasks, setTasks] = useState([])

    const addTodo = () => {
        const text = inputValue.trim()
        if (text === '') return;

        const newTask = {
            id: Date.now(),
            text: text,
            isCompleted: false,
            isFavorite: false,
        };

        setTasks([newTask, ...tasks])
        setInputValue("")
    }

    const handleCompleteChange = (id) => {
        setTasks(tasks.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo));
    }
    const handleFavouriteChange = (id) => {
        setTasks(tasks.map(todo => todo.id === id ? {...todo, isFavorite: !todo.isFavorite} : todo));
    }
    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.isFavorite && !b.isFavorite) {
            return -1;
        } else if (!a.isFavorite && b.isFavorite) {
            return 1;
        }

        if (a.isCompleted && !b.isCompleted) {
            return 1;
        } else if (!a.isCompleted && b.isCompleted) {
            return -1;
        }

        return 0;
    })

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingTop: 2,
            }}>
            <h1>Todo List</h1>
            <TextField name="task" label="Enter the task" variant="outlined"
                       value={inputValue}
                       onChange={(event) => {
                           setInputValue(event.target.value)
                       }}/>
            <Button variant="contained" onClick={addTodo} sx={{margin: 1}}>Add Task</Button>
            <Box sx={{width: 600}}>
                {sortedTasks.map((task) => (
                    <Paper key={task.id} elevation={3}
                           sx={{display: "flex", margin: 1, paddingRight: 1, paddingLeft: 1, width: "94%"}}>
                        <FormControlLabel control={<Checkbox checked={task.isCompleted} onChange={() => {
                            handleCompleteChange(task.id)
                        }}/>} label="Done"/>
                        <p style={{
                            flexGrow: 1,
                            textDecoration: task.isCompleted ? 'line-through' : 'none',
                            wordWrap: 'break-word',
                            overflow: 'hidden',
                        }}>
                            {task.text}
                        </p>
                        <FormControlLabel control={<Checkbox checked={task.isFavorite} onChange={() => {
                            handleFavouriteChange(task.id)
                        }} sx={{marginLeft: 'auto'}}/>} label="Favourite"/>
                    </Paper>
                ))}
            </Box>
        </Container>
    )
}

export default TodoApp