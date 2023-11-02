import React from 'react';
import Layout from './../Skeletons/Layout';
import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

export default function Sobre() {
  return (
    <>
      <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    
                  }}
                >
                <div style={{textAlign: 'center'}}>
                <h1>Sobre o projeto</h1>
                <p><h4>O projeto foi desenvolvido para o curso Let's Code (CETECH) com o intuito de criar um sistema de gerenciamento de vendas e produtos</h4></p>
                <p>O Layout consome a API da Fast Vendas para fazer inserções e consultas, a API tem suporte a ser utilizada em outras plataformas, para mais informações, seguem abaixo os links
                </p>
                <h3>Links úteis:
                </h3>
                <p><a href="https://elchefjacquin.github.io/docs/">Documentação da API</a></p>
                <p><a href="https://joaquim.dev">Site do desenvolvedor</a></p>
                </div>
                </Paper>
              </Grid>
              </Grid>
              </Container>
        </Layout>
    </>
  );
}