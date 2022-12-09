import React from 'react'
import {AppBar, Box, Container, Toolbar, Typography, Button} from '@mui/material'
import {Link, useNavigate} from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position='static' style={{backgroundColor: '#ff5136'}}>
        <Container>
          <Toolbar>
            <Typography sx={{flexGrow: 1}}>
              <Link to="/" style={{textDecoration: 'none', color: 'black', fontWeight: '30px'}}>
                <h1>
                  PERN Stack
                </h1>
              </Link>
            </Typography>
            <Button variant='contained' color='primary' onClick={()=>navigate('/tasks/new')}>
              New Task
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export {Navbar};