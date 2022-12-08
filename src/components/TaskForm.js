import React from 'react'
import {Grid, Card, Typography, CardContent, TextField, Button, CircularProgress} from '@mui/material'
import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

function TaskForm() {
    const [task, setTask] = useState({
        title: '',
        descripcion: '',
    })

    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    const navigate= useNavigate();
    const params=useParams();

    const handleChange = (e) =>{
        setTask({...task, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setLoading(true);
        if(editing){
            await fetch(`http://localhost:4000/modelement/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task)
            });
        } else{
            await fetch('http://localhost:4000/crudelement', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {'Content-Type': 'application/json'}
            });
        }
        setLoading(false);
        navigate('/');
    }
    const loadTask= async(id)=>{
        const res=await fetch(`http://localhost:4000/readelement/${id}`)
        const data = await res.json()
        setTask({title:data.title, descripcion:data.descripcion})
        setEditing(true);
    }
    useEffect(()=>{
        if(params.id){
            loadTask(params.id)
        }// eslint-disable-next-line
    }, [])
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
                        {editing ? "Editar tarea": "Crear nueva tarea"}
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
                                value={task.title}
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
                                value={task.descripcion}
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
                                />: 'Save'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export {TaskForm};