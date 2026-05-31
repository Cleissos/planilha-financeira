import { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Link } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

export default function Login({ onLoginSucesso, onIrParaCadastro }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !senha) {
      alert('Preencha todos os campos.');
      return;
    }

    const usuariosCadastrados = JSON.parse(localStorage.getItem('fintrack_usuarios') || '[]');

    // Busca o usuário com o email e senha correspondentes
    const usuarioValido = usuariosCadastrados.find(user => user.email === email && user.senha === senha);

    if (usuarioValido) {
      // Passa as informações do usuário logado de volta para o App.jsx
      onLoginSucesso(usuarioValido);
    } else {
      alert('E-mail ou senha incorretos!');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Card sx={{ maxWidth: 400, width: '100%', p: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
            💰 FinTrack Login
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
            Gerencie suas finanças de forma simples
          </Typography>

          <Box component="form" onSubmit={handleLogin} display="flex" flexDirection="column" gap={2}>
            <TextField label="E-mail" type="email" size="small" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Senha" type="password" size="small" fullWidth value={senha} onChange={(e) => setSenha(e.target.value)} />
            
            <Button type="submit" variant="contained" color="primary" startIcon={<LoginIcon />} fullWidth sx={{ mt: 1 }}>
              Entrar
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2">
              Não tem uma conta?{' '}
              <Link component="button" variant="body2" onClick={onIrParaCadastro}>
                Cadastre-se aqui
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}