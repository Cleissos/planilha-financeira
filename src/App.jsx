import { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, CssBaseline, ThemeProvider, createTheme, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import CardsResumo from './components/CardsResumo';
import FormTransacao from './components/FormTransacao';
import GraficoGeral from './components/GraficoGeral';
import Extrato from './components/Extrato';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#4caf50' },
    secondary: { main: '#f44336' },
    background: { default: '#121212', paper: '#1e1e1e' },
  },
});

export default function App() {
  const [transacoes, setTransacoes] = useState(() => {
    const salvas = localStorage.getItem('fintrack_transacoes');
    return salvas ? JSON.parse(salvas) : [];
  });

  // Estado para o mês selecionado no filtro (Padrão: 'todos')
  const [mesFiltro, setMesFiltro] = useState('todos');

  useEffect(() => {
    localStorage.setItem('fintrack_transacoes', JSON.stringify(transacoes));
  }, [transacoes]);

  const adicionarTransacao = (novaTransacao) => {
    setTransacoes([novaTransacao, ...transacoes]);
  };

  const deletarTransacao = (id) => {
    setTransacoes(transacoes.filter(t => t.id !== id));
  };

  const quitarTransacao = (id) => {
    setTransacoes(transacoes.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: 'concluido',
          dataPagamento: new Date().toISOString().split('T')[0]
        };
      }
      return t;
    }));
  };

  // SUGESTÃO 3: Função para resetar todos os dados do LocalStorage
  const resetarDados = () => {
    if (window.confirm('Tem certeza que deseja apagar todo o seu histórico financeiro?')) {
      setTransacoes([]);
      setMesFiltro('todos');
    }
  };

  // SUGESTÃO 1: Lógica para descobrir quais meses/anos existem nas transações cadastradas
  const obterMesesDisponiveis = () => {
    const meses = new Set();
    transacoes.forEach(t => {
      const [ano, mes] = t.dataVencimento.split('-');
      meses.add(`${mes}/${ano}`);
    });
    return Array.from(meses).sort(); // Retorna algo como ['05/2026', '06/2026']
  };

  // Filtra as transações antes de mandar para os componentes da tela
  const transacoesFiltradas = transacoes.filter(t => {
    if (mesFiltro === 'todos') return true;
    const [ano, mes] = t.dataVencimento.split('-');
    return `${mes}/${ano}` === mesFiltro;
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
              💰 FinTrack
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Seu controle financeiro pessoal e dinâmico
            </Typography>
          </Box>

          {/* Barra de Ferramentas: Filtro e Botão de Reset */}
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

            <Button 
              variant="outlined" 
              color="error" 
              size="medium"
              startIcon={<DeleteSweepIcon />}
              onClick={resetarDados}
            >
              Resetar
            </Button>
          </Box>
        </Box>

        {/* Agora passamos as transações já filtradas para a tela refletir o mês escolhido */}
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
      </Container>
    </ThemeProvider>
  );
}