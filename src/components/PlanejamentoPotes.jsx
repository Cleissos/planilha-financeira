import { Card, CardContent, Typography, Box, LinearProgress, Grid } from '@mui/material';

export default function PlanejamentoPotes({ transacoes }) {
  // 1. Calcula o salário base (Receita de Trabalho)
  const salario = transacoes
    .filter(t => t.tipo === 'receita' && t.categoria === 'Trabalho (Salário)')
    .reduce((acc, curr) => acc + curr.valor, 0);

  // Definindo as regras da sua imagem
  const configuracaoPotes = [
    { nome: 'Gastos Fixos (Moradia/Contas)', pct: 55, cor: '#424242' },
    { nome: 'Investimentos', pct: 10, cor: '#4caf50' },
    { nome: 'Reserva de Emergência', pct: 10, cor: '#2196f3' },
    { nome: 'Educação', pct: 10, cor: '#ff9800' },
    { nome: 'Lazer', pct: 10, cor: '#e91e63' },
    { nome: 'Doação', pct: 5, cor: '#9c27b0' },
  ];

  const formatarMoeda = (val) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        🎯 Distribuição de Salário (Regra dos Potes)
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Baseado no seu Salário Líquido atual de: <strong>{formatarMoeda(salario)}</strong>
      </Typography>

      <Grid container spacing={3}>
        {configuracaoPotes.map((pote) => {
          // Calcula quanto esse pote permite gastar
          const limitePote = (salario * pote.pct) / 100;

          // Calcula quanto já gastou de fato nesse pote
          const gastoReal = transacoes
            .filter(t => t.tipo === 'despesa' && t.categoria === pote.nome)
            .reduce((acc, curr) => acc + curr.valor, 0);

          // Calcula a porcentagem da barra (evita divisão por zero)
          const progresso = limitePote > 0 ? (gastoReal / limitePote) * 100 : 0;
          const estourou = gastoReal > limitePote;

          return (
            <Grid item xs={12} md={6} key={pote.nome}>
              <Card sx={{ borderLeft: `6px solid ${pote.cor}` }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="body1" fontWeight="bold">
                      {pote.nome} ({pote.pct}%)
                    </Typography>
                    <Typography variant="body2" sx={{ color: estourou ? '#f44336' : 'text.secondary' }}>
                      {formatarMoeda(gastoReal)} / {formatarMoeda(limitePote)}
                    </Typography>
                  </Box>

                  <LinearProgress 
                    variant="determinate" 
                    value={progresso > 100 ? 100 : progresso} 
                    color={estourou ? 'error' : 'primary'}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                  
                  {estourou && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                      ⚠️ Você ultrapassou o limite sugerido para este pote!
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}