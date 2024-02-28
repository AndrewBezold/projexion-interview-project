import React from 'react';
import { AppBar, Typography } from '@mui/material';

export const Header = () => {
  return (
    <AppBar position="fixed" style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
    }}>
      <Typography>
        Projexion Interview Project
      </Typography>
      <Typography>
        Andrew Bezold
      </Typography>
    </AppBar>
  )
}