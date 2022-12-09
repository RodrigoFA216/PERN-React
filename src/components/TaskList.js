import React from 'react'
import {useEffect, useState} from 'react'
import {Button, Card, CardContent, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    const loadTasks= async()=>{
        try {
            const response=await fetch('http://localhost:4000/readelements');
            const data= await response.json();
            setTasks(data);
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id)=>{
        try { 
            await fetch(`http://localhost:4000/deleteelement/${id}`, {
                method: 'DELETE'
            });
            setTasks(tasks.filter((task)=>task.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        loadTasks();
    }, [])
    
    return (
        <>
            <h3>
                TaskList
            </h3>
            {
                tasks.map(task=>(
                    <Card style={{
                        marginBottom: '.9rem',
                        backgroundColor: '#8269ff',
                        color: '#white'
                    }}
                    key={task.id}
                    >
                        <CardContent style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            <div>
                                <Typography style={{color:'white'}}>
                                    <h3>
                                        {task.title}
                                    </h3>
                                </Typography>
                                <Typography style={{color:'white'}}>
                                    <h4>
                                        {task.descripcion}
                                    </h4>
                                </Typography>
                            </div>
                            <div>
                                <Button 
                                variant='contained' 
                                color='inherit' 
                                onClick={()=>navigate(`/tasks/${task.id}/edit`)}>
                                    Editar
                                </Button>
                                <Button 
                                variant='contained' 
                                color='secondary' 
                                onClick={()=>handleDelete(task.id)}
                                style={{margin:'.6rem'}}
                                >
                                    Eliminar
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))
            }
        </>
    );
}

export {TaskList};