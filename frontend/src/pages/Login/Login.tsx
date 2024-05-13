import React from 'react';
import { Box, Card, CardContent, CardHeader, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/form");
    }

    return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
            <Card 
                elevation={3}
                sx={{
                    minWidth: "250px",
                    maxWidth: "350px",
                    
                }}
                >
              <CardHeader title={
                  <Typography variant="h5">
                    Login
                  </Typography>
                } />
              <CardContent
              >
                <TextField 
                  label="Username" 
                  variant="outlined" 
                  margin="normal"
                  value={username}
                  sx={{
                    width: "100%",
                }}
                  onChange = {(e) => setUsername(e.target.value)}
                />
                <TextField 
                  label="Password" 
                  variant="outlined" 
                  value = {password}
                  sx={{width: "100%"}}
                  margin="normal"
                  type="password"
                  onChange = {(e) => setPassword(e.target.value)}
                />
              </CardContent>

              <CardContent
              sx={{display: "flex", justifyContent: "center"}}
              >
              <Button
                  variant='contained'
                  onClick={handleLogin}
                >
                    Login
                </Button>
              </CardContent>

            </Card>
        </Box>
    )
}

export default Login;