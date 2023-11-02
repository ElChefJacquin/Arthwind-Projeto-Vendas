import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import ip from '../../assets/funcs/ip';
import { toast, ToastContainer } from 'react-toastify';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://Joaquim.dev/">
      Joaquim Neto
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Emailrecovery() {
  const nav = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('senha1') !== data.get('senha2')) {
      toast.error('As senhas não são iguais')
      return;
    }
    const currentUrl = window.location.href;
    const tokenrecuperacao = currentUrl.split('=')[1];

    axios
    .post(`http://${ip}/recuperacaofinal`,
    {
      token: tokenrecuperacao,
      senha: data.get('senha1'),
    }
    )
    .then ((res) => {
      nav('/login');
    }
    ) .catch((error) => {
      toast.error('Token expirado, realize novamente a recuperação de senha')
    })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Mudar a senha
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <ToastContainer/>
            <TextField
              margin="normal"
              required
              fullWidth
              id="senha1"
              label="Digite a nova senha"
              name="senha1"
              autoComplete="senha"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="senha2"
              label="Repita a senha"
              name="senha2"
              autoComplete="senha2"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Alterar senha
            </Button>
            <Grid container>
              <Grid item xs={12}>
                <Link href="/login" variant="body2">
                  Voltar a tela principal
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
