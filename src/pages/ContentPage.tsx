import React from 'react';
import * as api from '../services/api';
import { useAuth } from '../components/AuthContext';
import {
  Typography,
  Button,
  Paper,
} from '@mui/material';
import {
  useTheme,
} from '@mui/material/styles';
import { useToast } from 'use-toast-mui';
import { LazyLoadingNodes } from '../components/LazyLoadingNodes';

export function ContentPage() {
  const [nodes, setNodes] = React.useState<Array<string>>([])

  const { user, logout } = useAuth();
  const theme = useTheme();
  const toast = useToast();

  /*
  React.useEffect(() => {
    api.getContentNodes(user.jwtTokens.accessToken)
      .then((res: any) => {
        setNodes(res.data.Admin.Tree.GetContentNodes.edges.map((node: any) => {
          return node.node.structureDefinition.title
        }))
      })
      .catch((err: any) => {
        console.log(err);
        toast.error('There was a problem retrieving the ContentNodes.');
      })
  }, [user])
  */

  /*
  React.useEffect(() => {
    api.getSchema().then(res => console.log(res))
  }, [])
  */

  
  React.useEffect(() => {
    setNodes(Array.from(new Array(100), (_, index) => "This is Content Node " + index));
  }, [])
  

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <Paper style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: theme.spacing(2), gap: theme.spacing(2)}}>
        <Typography>
          {user.username || "This is a test user"}
        </Typography>
        <LazyLoadingNodes nodes={nodes} setNodes={setNodes} />
        <Button onClick={logout}>
          Logout
        </Button>
      </Paper>
    </div>
  )
}