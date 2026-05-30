import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, Box, Chip, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Seus lindos ícones de categorias
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import CelebrationIcon from '@mui/icons-material/Celebration';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import HelpIcon from '@mui/icons-material/Help';

const obterIconeCategoria = (categoria) => {
  switch (categoria) {
    case 'Alimentação': return <FastfoodIcon sx={{ color: '#ff9800' }} />;
    case 'Transporte': return <DirectionsCarIcon sx={{ color: '#03a9f4' }} />;
    case 'Moradia': return <HomeIcon sx={{ color: '#9c27b0' }} />;
    case 'Lazer': return <CelebrationIcon sx={{ color: '#e91e63' }} />;
    case 'Saúde': return <LocalHospitalIcon sx={{ color: '#f44336' }} />;
    case 'Educação': return <SchoolIcon sx={{ color: '#ffeb3b' }} />;
    case 'Trabalho': return <WorkIcon sx={{ color: '#4caf50' }} />;
    case 'Investimentos': return <TrendingUpIcon sx={{ color: '#009688' }} />;
    case 'Presentes': return <CardGiftcardIcon sx={{ color: '#ffc107' }} />;
    default: return <HelpIcon sx={{ color: '#9e9e9e' }} />;
  }
};

export default function Extrato({ transacoes, onDeletar, onQuitar }) {
  const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatarData = (dataStr) => {
    if (!dataStr) return '—';
    const [ano, mes, dia] = dataStr.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Histórico de Transações
        </Typography>

        {transacoes.length === 0 ? (
          <Typography color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
            Nenhuma transação cadastrada ainda. Comece adicionando uma acima!
          </Typography>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: 400,
              mt: 2,
              background: 'transparent',
              width: '100%',
              overflowX: 'auto'
            }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Categoria</strong></TableCell>
                  <TableCell><strong>Descrição</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Vencimento/Previsão</strong></TableCell>
                  <TableCell><strong>Pagamento/Recebimento</strong></TableCell>
                  <TableCell align="right"><strong>Valor</strong></TableCell>
                  <TableCell align="center"><strong>Ações</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transacoes.map((t) => (
                  <TableRow key={t.id} hover sx={{ opacity: t.status === 'pendente' ? 0.85 : 1 }}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        {obterIconeCategoria(t.categoria)}
                        {t.categoria}
                      </Box>
                    </TableCell>
                    <TableCell>{t.descricao}</TableCell>
                    <TableCell>
                      {/* Badge dinâmico de Status */}
                      <Chip
                        label={t.status === 'concluido' ? (t.tipo === 'receita' ? 'Recebido' : 'Pago') : 'Pendente'}
                        color={t.status === 'concluido' ? (t.tipo === 'receita' ? 'success' : 'success') : 'warning'}
                        variant={t.status === 'concluido' ? 'filled' : 'outlined'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{formatarData(t.dataVencimento)}</TableCell>
                    <TableCell>{formatarData(t.dataPagamento)}</TableCell>
                    <TableCell align="right" sx={{ color: t.tipo === 'receita' ? '#4caf50' : '#f44336', fontWeight: 'bold' }}>
                      {t.tipo === 'receita' ? '+ ' : '- '}
                      {formatarMoeda(t.valor)}
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center" gap={0.5}>
                        {/* Botão de Quitar (Só aparece se estiver Pendente) */}
                        {t.status === 'pendente' && (
                          <Tooltip title={t.tipo === 'receita' ? "Marcar como Recebido" : "Marcar como Pago"}>
                            <IconButton onClick={() => onQuitar(t.id)} size="small" color="success">
                              <CheckCircleIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Excluir Registro">
                          <IconButton onClick={() => onDeletar(t.id)} size="small" color="error">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
}