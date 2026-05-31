import { useState, useEffect } from 'react';

import { Container, Grid, Typography, Box, CssBaseline, ThemeProvider, createTheme, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import LogoutIcon from '@mui/icons-material/Logout';

import CardsResumo from './components/CardsResumo';
import FormTransacao from './components/FormTransacao';
import GraficoGeral from './components/GraficoGeral';
import Extrato from './components/Extrato';
import Login from './components/Login';
import Cadastro from './components/Cadastro';

import { Tabs, Tab } from '@mui/material';
import PlanejamentoPotes from './components/PlanejamentoPotes';
import VisaoCartoes from './components/VisaoCartoes';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#4caf50' },
    secondary: { main: '#f44336' },
    background: { default: '#121212', paper: '#1e1e1e' },
  },
});

export default function App() {
  // Controle de Autenticação
  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    const logado = localStorage.getItem('fintrack_usuario_logado');
    return logado ? JSON.parse(logado) : null;
  });

  const [telaAtual, setTelaAtual] = useState(usuarioLogado ? 'dashboard' : 'login');
  const [transacoes, setTransacoes] = useState([]);
  const [mesFiltro, setMesFiltro] = useState('todos');
  const [abaAtiva, setAbaAtiva] = useState(0);

  // Carrega as transações específicas do usuário que acabou de logar
  useEffect(() => {
    if (usuarioLogado) {
      const salvas = localStorage.getItem(`fintrack_transacoes_${usuarioLogado.id}`);
      setTransacoes(salvas ? JSON.parse(salvas) : []);
    } else {
      setTransacoes([]);
    }
    setMesFiltro('todos');
  }, [usuarioLogado]);

  // Salva as transações sempre que mudarem (atreladas ao ID do usuário)
  useEffect(() => {
    if (usuarioLogado) {
      localStorage.setItem(`fintrack_transacoes_${usuarioLogado.id}`, JSON.stringify(transacoes));
    }
  }, [transacoes, usuarioLogado]);

  const handleLoginSucesso = (usuario) => {
    localStorage.setItem('fintrack_usuario_logado', JSON.stringify(usuario));
    setUsuarioLogado(usuario);
    setTelaAtual('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('fintrack_usuario_logado');
    setUsuarioLogado(null);
    setTelaAtual('login');
  };

  const adicionarTransacao = (novaTransacao) => {
    setTransacoes([novaTransacao, ...transacoes]);
  };

  const deletarTransacao = (id) => {
    setTransacoes(transacoes.filter(t => t.id !== id));
  };

  const quitarTransacao = (id) => {
    setTransacoes(transacoes.map(t => {
      if (t.id === id) {
        return { ...t, status: 'concluido', dataPagamento: new Date().toISOString().split('T')[0] };
      }
      return t;
    }));
  };

  const resetarDados = () => {
    if (window.confirm('Tem certeza que deseja apagar todo o seu histórico financeiro?')) {
      setTransacoes([]);
      setMesFiltro('todos');
    }
  };

  const obterMesesDisponiveis = () => {
    const meses = new Set();
    transacoes.forEach(t => {
      const [ano, mes] = t.dataVencimento.split('-');
      meses.add(`${mes}/${ano}`);
    });
    return Array.from(meses).sort();
  };

  const transacoesFiltradas = transacoes.filter(t => {
    if (mesFiltro === 'todos') return true;
    const [ano, mes] = t.dataVencimento.split('-');
    return `${mes}/${ano}` === mesFiltro;
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      {/* RENDERIZAÇÃO CONDICIONAL DE TELAS */}
      {telaAtual === 'login' && (
        <Login onLoginSucesso={handleLoginSucesso} onIrParaCadastro={() => setTelaAtual('cadastro')} />
      )}

      {telaAtual === 'cadastro' && (
        <Cadastro onIrParaLogin={() => setTelaAtual('login')} />
      )}

      {telaAtual === 'dashboard' && usuarioLogado && (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {/* Cabeçalho */}
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                💰 FinTrack
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Olá, <strong>{usuarioLogado.nome}</strong>! Seja bem-vindo ao seu controle financeiro.
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={2}>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel id="filtro-mes-label">Filtrar por Mês</InputLabel>
                <Select
                  labelId="filtro-mes-label"
                  value={mesFiltro}
                  label="Filtrar por Mês"
                  onChange={(e) => setMesFiltro(e.target.value)}
                >
                  <MenuItem value="todos">Todos os meses</MenuItem>
                  {obterMesesDisponiveis().map(mesAno => (
                    <MenuItem key={mesAno} value={mesAno}>{mesAno}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button variant="outlined" color="error" startIcon={<DeleteSweepIcon />} onClick={resetarDados}>
                Resetar
              </Button>

              <Button variant="contained" color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
                Sair
              </Button>
            </Box>
          </Box>

          {/* MENUS EM ABAS */}
          <Tabs 
            value={abaAtiva} 
            onChange={(e, novaAba) => setAbaAtiva(novaAba)} 
            textColor="primary" 
            indicatorColor="primary"
            sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Dashboard Geral" />
            <Tab label="Planejamento (Potes)" />
            <Tab label="Meus Cartões & Bancos" />
          </Tabs>

          {/* CONTEÚDO DAS ABAS */}
          {abaAtiva === 0 && (
            <>
              <CardsResumo transacoes={transacoesFiltradas} />
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={8}>
                  <GraficoGeral transacoes={transacoesFiltradas} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormTransacao onAdicionar={adicionarTransacao} />
                </Grid>
                <Grid item xs={12}>
                  <Extrato transacoes={transacoesFiltradas} onDeletar={deletarTransacao} onQuitar={quitarTransacao} />
                </Grid>
              </Grid>
            </>
          )}

          {abaAtiva === 1 && (
            <PlanejamentoPotes transacoes={transacoesFiltradas} />
          )}

          {abaAtiva === 2 && (
            <VisaoCartoes transacoes={transacoesFiltradas} />
          )}
        </Container>
      )}
    </ThemeProvider>
  );
}