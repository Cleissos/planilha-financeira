import { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Link } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function Cadastro({ onIrParaLogin }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = (e) => {
    e.preventDefault();

    if (!nome || !email || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Busca usuários já cadastrados ou inicia array vazio
    const usuariosCadastrados = JSON.parse(localStorage.getItem('fintrack_usuarios') || '[]');

    // Validação: Verifica se o email já existe
    const usuarioExiste = usuariosCadastrados.some(user => user.email === email);
    if (usuarioExiste) {
      alert('Este e-mail já está cadastrado!');
      return;
    }

    // Cria o novo usuário
    const novoUsuario = { id: crypto.randomUUID(), nome, email, senha };
    usuariosCadastrados.push(novoUsuario);

    // Salva de volta no localStorage
    localStorage.setItem('fintrack_usuarios', JSON.stringify(usuariosCadastrados));

    alert('Cadastro realizado com sucesso! Faça o seu login.');
    onIrParaLogin(); // Redireciona para a tela de login
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Card sx={{ maxWidth: 400, width: '100%', p: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
            Criar Conta 🚀
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
            Cadastre-se para começar a controlar seus gastos
          </Typography>

          <Box component="form" onSubmit={handleCadastro} display="flex" flexDirection="column" gap={2}>
            <TextField label="Nome Completo" size="small" fullWidth value={nome} onChange={(e) => setNome(e.target.value)} />
            <TextField label="E-mail" type="email" size="small" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Senha" type="password" size="small" fullWidth value={senha} onChange={(e) => setSenha(e.target.value)} />
            
            <Button type="submit" variant="contained" color="primary" startIcon={<PersonAddIcon />} fullWidth sx={{ mt: 1 }}>
              Cadastrar
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2">
              Já tem uma conta?{' '}
              <Link component="button" variant="body2" onClick={onIrParaLogin}>
                Faça Login
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}