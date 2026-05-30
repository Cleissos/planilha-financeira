import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function CardsResumo({ transacoes }) {
  // 1. Receitas Totais (Tudo: Concluído + Pendente)
  const receitasTotais = transacoes
    .filter(t => t.tipo === 'receita')
    .reduce((acc, curr) => acc + curr.valor, 0);

  // 2. Despesas Totais (Tudo: Concluído + Pendente)
  const despesasTotais = transacoes
    .filter(t => t.tipo === 'despesa')
    .reduce((acc, curr) => acc + curr.valor, 0);

  // 3. Saldo Real (Apenas o que já foi efetivamente Pago/Recebido)
  const receitasLiquidadas = transacoes
    .filter(t => t.tipo === 'receita' && t.status === 'concluido')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const despesasLiquidadas = transacoes
    .filter(t => t.tipo === 'despesa' && t.status === 'concluido')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const saldoReal = receitasLiquidadas - despesasLiquidadas;

  const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <Grid container spacing={3}>
      {/* Card Previsão de Receitas */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ borderLeft: '6px solid #4caf50' }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box sx={{ flexGrow: 1 }}>
                <Typography color="text.secondary" variant="body2" fontWeight="bold">PREVISÃO DE RECEITAS</Typography>
                <Typography variant="h5" fontWeight="bold" color="#4caf50">{formatarMoeda(receitasTotais)}</Typography>
              </Box>
              <ArrowUpwardIcon sx={{ color: '#4caf50', fontSize: 35 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Card Previsão de Despesas */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ borderLeft: '6px solid #f44336' }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box sx={{ flexGrow: 1 }}>
                <Typography color="text.secondary" variant="body2" fontWeight="bold">PREVISÃO DE DESPESAS</Typography>
                <Typography variant="h5" fontWeight="bold" color="#f44336">{formatarMoeda(despesasTotais)}</Typography>
              </Box>
              <ArrowDownwardIcon sx={{ color: '#f44336', fontSize: 35 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Card Saldo Atual Real */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ borderLeft: `6px solid ${saldoReal >= 0 ? '#2196f3' : '#ff9800'}` }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box sx={{ flexGrow: 1 }}>
                <Typography color="text.secondary" variant="body2" fontWeight="bold">SALDO EM CONTA (REAL)</Typography>
                <Typography variant="h5" fontWeight="bold" color={saldoReal >= 0 ? '#2196f3' : '#ff9800'}>
                  {formatarMoeda(saldoReal)}
                </Typography>
              </Box>
              <AccountBalanceWalletIcon sx={{ color: saldoReal >= 0 ? '#2196f3' : '#ff9800', fontSize: 35 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}