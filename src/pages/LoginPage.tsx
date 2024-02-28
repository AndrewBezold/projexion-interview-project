import React from 'react';
import { useAuth } from '../components/AuthContext';
import * as api from '../services/api';
import { email, password } from '../utils/constants';
import {
  Stack,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useToast } from 'use-toast-mui';

export function LoginPage() {
  const { login } = useAuth();
  const theme = useTheme();
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    handleLogin(email, password);
  }

  const handleLogin = (email: string, password: string) => {
        
    api.login(email, password)
      .then((res: any) => {
        login({username: email, jwtTokens: res.data.Auth.loginJwt.loginResult.jwtTokens});
      })
      .catch((err: any) => {
        console.log(err);
        toast.error('There was a problem logging in.')
      })
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <form onSubmit={handleSubmit}>
        <Paper style={{padding: theme.spacing(2)}}>
          <Stack gap={2}>
            <TextField label="Username" id="email" name="email" required defaultValue={email} />
            <TextField label="Password" id="password" name="password" required defaultValue={password} />
            <Button type="submit">
              Login
            </Button>
          </Stack>
        </Paper>
      </form>
    </div>
  )
}