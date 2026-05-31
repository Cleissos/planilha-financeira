import { Card, CardContent, Typography, Grid, Box, Avatar } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export default function VisaoCartoes({ transacoes }) {
  const bancos = ['Nubank', 'PicPay', 'Mercado Pago', 'PagBank', 'Inter', 'Dinheiro em Espécie'];

  // Cores personalizadas para dar identidade a cada banco
  const obterCorBanco = (banco) => {
    switch (banco) {
      case 'Nubank': return '#820ad1';
      case 'PicPay': return '#11c76f';
      case 'Mercado Pago': return '#00aae4';
      case 'PagBank': return '#f4c204';
      case 'Inter': return '#ff7a00';
      default: return '#757575';
    }
  };

  const formatarMoeda = (val) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        💳 Meus Bancos e Cartões de Crédito
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Saldo e movimentações consolidadas por instituição
      </Typography>

      <Grid container spacing={3}>
        {bancos.map((banco) => {
          // Saldo Líquido do banco (Tudo recebido - Tudo pago)
          const receitasNoBanco = transacoes
            .filter(t => t.bancoCartao === banco && t.tipo === 'receita' && t.status === 'concluido')
            .reduce((acc, curr) => acc + curr.valor, 0);

          const despesasNoBanco = transacoes
            .filter(t => t.bancoCartao === banco && t.tipo === 'despesa' && t.status === 'concluido')
            .reduce((acc, curr) => acc + curr.valor, 0);

          const saldoDisponivel = receitasNoBanco - despesasNoBanco;

          // Fatura Atual (Tudo que está lançado como despesa pendente no banco)
          const faturaPendente = transacoes
            .filter(t => t.bancoCartao === banco && t.tipo === 'despesa' && t.status === 'pendente')
            .reduce((acc, curr) => acc + curr.valor, 0);

          return (
            <Grid item xs={12} sm={6} md={4} key={banco}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
                    <Avatar sx={{ bgcolor: obterCorBanco(banco) }}>
                      <AccountBalanceIcon />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">{banco}</Typography>
                  </Box>

                  <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Saldo Efetivo:</Typography>
                    <Typography variant="body2" fontWeight="bold" color={saldoDisponivel >= 0 ? '#4caf50' : '#f44336'}>
                      {formatarMoeda(saldoDisponivel)}
                    </Typography>
                  </Box>

                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Fatura/Pendentes:</Typography>
                    <Typography variant="body2" fontWeight="bold" color="#ff9800">
                      {formatarMoeda(faturaPendente)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}