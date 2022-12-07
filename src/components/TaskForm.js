import React from 'react'
import {Grid, Card, Typography, CardContent, TextField, Button, CircularProgress} from '@mui/material'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function TaskForm() {
    const [task, setTask] = useState({
        title: '',
        descripcion: '',
    })

    const [loading, setLoading] = useState(false)

    const navigate= useNavigate();

    const handleChange = (e) =>{
        setTask({...task, [e.target.name]: e.target.value})
        // console.log(e.target.name, e.target.value);
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setLoading(true);
        const res = await fetch('http://localhost:4000/crudelement', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json();
        setLoading(false);
        navigate('/');
        // console.log(data);
        // console.log(task);
    }
    return (
        <Grid 
        container 
        direction='column' 
        alignItems='center' 
        justifyContent='center'>
            <Grid item xs={3}>
                <Card
                sx={{mt:5}}
                style={{
                    backgroundColor: '#10556E',
                    padding: '1rem'
                }}
                >
                    <Typography variant='5' textAlaign='center' color='white'>
                        Create New Task
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant='outlined'
                                label='Escribe tu título'
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="title"
                                onChange={handleChange}
                                inputProps={{style: {color: "white"}}}
                                InputLabelProps={{style: {color: "white"}}}
                            />
                            <TextField
                                variant='outlined'
                                label='Escribe tu descripcion'
                                multiline
                                rows={4}
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="descripcion"
                                onChange={handleChange}
                                inputProps={{style: {color: "white"}}}
                                InputLabelProps={{style: {color: "white"}}}
                            />
                            <Button 
                            variant='contained' 
                            color='primary' 
                            type='submit' 
                            disabled={!task.title || !task.descripcion}>
                                {loading ? <CircularProgress
                                    color='inherit'
                                    size={24}
                                />: 'Crear'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export {TaskForm};