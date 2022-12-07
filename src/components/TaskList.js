import React from 'react'
import {useEffect, useState} from 'react'
import {Button, Card, CardContent, Typography} from '@mui/material'

function TaskList() {
    const [tasks, setTasks] = useState([])
    const loadTasks= async()=>{
        const response=await fetch('http://localhost:4000/readelements');
        const data= await response.json();
        setTasks(data)
        // console.log(data);
    }
    useEffect(()=>{
        loadTasks()
    }, [])
    return (
        <>
            <h1>
                TaskList
            </h1>
            {
                tasks.map(task=>(
                    <Card style={{
                        marginBottom: '.9rem',
                        backgroundColor: '#10556e',
                        color: '#ffffff'
                    }}>
                        <CardContent style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            <div>
                                <Typography>
                                    {task.title}
                                </Typography>
                                <Typography>
                                    {task.descripcion}
                                </Typography>
                            </div>
                            <div>
                                <Button 
                                variant='outlined' 
                                color='inherit' 
                                onClick={()=>console.log('edit')}>
                                    Editar
                                </Button>
                                <Button 
                                variant='outlined' 
                                color='warning' 
                                onClick={()=>console.log('delete')}
                                style={{marginLeft:'.6rem'}}
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