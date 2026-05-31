// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Card, CardContent, IconButton, Chip, Box, Avatar } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { obterIconeCategoria, obterConfigBanco } from '../utils/iconesFinanceiros';

// export default function Extrato({ transacoes, onDeletar, onQuitar }) {
  
//   const formatarMoeda = (valor) => {
//     return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
//   };

//   const formatarData = (dataString) => {
//     if (!dataString) return '—';
//     const [ano, mes, dia] = dataString.split('-');
//     return `${dia}/${mes}/${ano}`;
//   };

//   return (
//     <Card>
//       <CardContent>
//         <Typography variant="h6" fontWeight="bold" gutterBottom>
//           Histórico de Transações
//         </Typography>

//         {transacoes.length === 0 ? (
//           <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
//             Nenhuma transação encontrada para os filtros selecionados.
//           </Typography>
//         ) : (
//           <TableContainer component={Paper} sx={{ maxHeight: 440, mt: 2, background: 'transparent', width: '100%', overflowX: 'auto' }}>
//             <Table stickyHeader size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Categoria</TableCell>
//                   <TableCell>Descrição</TableCell>
//                   <TableCell align="center">Status</TableCell>
//                   <TableCell align="center">Vencimento/Previsão</TableCell>
//                   <TableCell align="center">Pagamento/Recebimento</TableCell>
//                   <TableCell align="right">Valor</TableCell>
//                   <TableCell align="center">Ações</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {transacoes.map((t) => {
//                   const infoCategoria = obterIconeCategoria(t.categoria);
//                   const configBanco = obterConfigBanco(t.bancoCartao);
//                   const isReceita = t.tipo === 'receita';

//                   return (
//                     <TableRow key={t.id} hover>
//                       {/* Coluna Categoria com Ícone Dinâmico */}
//                       <TableCell>
//                         <Box display="flex" alignItems="center" gap={1.5}>
//                           <Avatar 
//                             sx={{ 
//                               bgcolor: infoCategoria.cor, 
//                               width: 32, 
//                               height: 32,
//                               color: '#121212' // Garante contraste do ícone interno no tema escuro
//                             }}
//                           >
//                             {infoCategoria.icone}
//                           </Avatar>
//                           <Typography variant="body2">{t.categoria}</Typography>
//                         </Box>
//                       </TableCell>

//                       {/* Coluna Descrição com a tag do Banco/Cartão */}
//                       <TableCell>
//                         <Box display="flex" flexDirection="column" alignItems="flex-start" gap={0.5}>
//                           <Typography variant="body2" fontWeight="medium">
//                             {t.descricao}
//                           </Typography>
//                           {t.bancoCartao && (
//                             <Chip 
//                               label={t.bancoCartao} 
//                               size="small" 
//                               sx={{ 
//                                 backgroundColor: configBanco.cor, 
//                                 color: configBanco.texto,
//                                 fontSize: '0.65rem',
//                                 fontWeight: 'bold',
//                                 height: 18
//                               }} 
//                             />
//                           )}
//                         </Box>
//                       </TableCell>

//                       {/* Coluna Status */}
//                       <TableCell align="center">
//                         <Chip 
//                           label={t.status === 'concluido' ? (isReceita ? 'Recebido' : 'Pago') : 'Pendente'} 
//                           color={t.status === 'concluido' ? 'success' : 'warning'}
//                           variant="outlined"
//                           size="small"
//                         />
//                       </TableCell>

//                       {/* Datas */}
//                       <TableCell align="center">{formatarData(t.dataVencimento)}</TableCell>
//                       <TableCell align="center">{formatarData(t.dataPagamento)}</TableCell>

//                       {/* Valor Dinâmico (Verde para entrada, Vermelho para saída) */}
//                       <TableCell align="right">
//                         <Typography 
//                           variant="body2" 
//                           fontWeight="bold" 
//                           color={isReceita ? 'primary.main' : 'secondary.main'}
//                         >
//                           {isReceita ? `+ ${formatarMoeda(t.valor)}` : `- ${formatarMoeda(t.valor)}`}
//                         </Typography>
//                       </TableCell>

//                       {/* Botões de Ação */}
//                       <TableCell align="center">
//                         <Box display="flex" justifyContent="center" gap={0.5}>
//                           {t.status === 'pendente' && (
//                             <IconButton 
//                               size="small" 
//                               color="success" 
//                               title={isReceita ? "Marcar como Recebido" : "Marcar como Pago"}
//                               onClick={() => onQuitar(t.id)}
//                             >
//                               <CheckCircleIcon fontSize="small" />
//                             </IconButton>
//                           )}
//                           <IconButton 
//                             size="small" 
//                             color="error" 
//                             title="Excluir Transação"
//                             onClick={() => onDeletar(t.id)}
//                           >
//                             <DeleteIcon fontSize="small" />
//                           </IconButton>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// 1. IMPORTANTE: Adicione o import do html2pdf no topo do arquivo
import html2pdf from 'html2pdf.js';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Card, CardContent, IconButton, Chip, Box, Avatar, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; // Ícone de PDF
import { obterIconeCategoria, obterConfigBanco } from '../utils/iconesFinanceiros';

export default function Extrato({ transacoes, onDeletar, onQuitar }) {
  
  const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatarData = (dataString) => {
    if (!dataString) return '—';
    const [ano, mes, dia] = dataString.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  // 2. FUNÇÃO QUE GERA E BAIXA O PDF
  const exportarParaPDF = () => {
    // Alvo que será transformado em PDF
    const elemento = document.getElementById('conteudo-pdf');
    
    // Configurações do documento
    const opcoes = {
      margin:       10,
      filename:     `FinTrack_Extrato_${new Date().toISOString().split('T')[0]}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#121212' }, // Mantém o fundo escuro do seu app
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' } // Landscape (deitado) funciona melhor para tabelas largas
    };

    // Executa a mágica de gerar e baixar automaticamente
    html2pdf().set(opcoes).from(elemento).save();
  };

  return (
    // Adicionamos o id="conteudo-pdf" no Card para ele salvar o bloco inteiro (Título + Tabela)
    <Card id="conteudo-pdf">
      <CardContent>
        {/* Adicionado Box para colocar o título e o botão lado a lado */}
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }} className="no-render">
          <Typography variant="h6" fontWeight="bold">
            Histórico de Transações
          </Typography>
          
          {transacoes.length > 0 && (
            <Button
              variant="contained"
              color="error"
              startIcon={<PictureAsPdfIcon />}
              onClick={exportarParaPDF}
              size="small"
              sx={{ fontWeight: 'bold' }}
              data-html2canvas-ignore="true" // Esta tag diz para a biblioteca NÃO incluir o próprio botão dentro do PDF gerado
            >
              Exportar PDF
            </Button>
          )}
        </Box>

        {transacoes.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
            Nenhuma transação encontrada para os filtros selecionados.
          </Typography>
        ) : (
          <TableContainer component={Paper} sx={{ maxHeight: 440, background: 'transparent', width: '100%', overflowX: 'auto' }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Vencimento/Previsão</TableCell>
                  <TableCell align="center">Pagamento/Recebimento</TableCell>
                  <TableCell align="right">Valor</TableCell>
                  {/* Damos um jeito de ignorar a coluna de ações no PDF para ficar mais limpo */}
                  <TableCell align="center" data-html2canvas-ignore="true">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transacoes.map((t) => {
                  const infoCategoria = obterIconeCategoria(t.categoria);
                  const configBanco = obterConfigBanco(t.bancoCartao);
                  const isReceita = t.tipo === 'receita';

                  return (
                    <TableRow key={t.id} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1.5}>
                          <Avatar sx={{ bgcolor: infoCategoria.cor, width: 32, height: 32, color: '#121212' }}>
                            {infoCategoria.icone}
                          </Avatar>
                          <Typography variant="body2">{t.categoria}</Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box display="flex" flexDirection="column" alignItems="flex-start" gap={0.5}>
                          <Typography variant="body2" fontWeight="medium">
                            {t.descricao}
                          </Typography>
                          {t.bancoCartao && (
                            <Chip 
                              label={t.bancoCartao} 
                              size="small" 
                              sx={{ 
                                backgroundColor: configBanco.cor, 
                                color: configBanco.texto,
                                fontSize: '0.65rem',
                                fontWeight: 'bold',
                                height: 18
                              }} 
                            />
                          )}
                        </Box>
                      </TableCell>

                      <TableCell align="center">
                        <Chip 
                          label={t.status === 'concluido' ? (isReceita ? 'Recebido' : 'Pago') : 'Pendente'} 
                          color={t.status === 'concluido' ? 'success' : 'warning'}
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>

                      <TableCell align="center">{formatarData(t.dataVencimento)}</TableCell>
                      <TableCell align="center">{formatarData(t.dataPagamento)}</TableCell>

                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="bold" color={isReceita ? 'primary.main' : 'secondary.main'}>
                          {isReceita ? `+ ${formatarMoeda(t.valor)}` : `- ${formatarMoeda(t.valor)}`}
                        </Typography>
                      </TableCell>

                      {/* Ignora os botões de Check e Lixeira no PDF gerado */}
                      <TableCell align="center" data-html2canvas-ignore="true">
                        <Box display="flex" justifyContent="center" gap={0.5}>
                          {t.status === 'pendente' && (
                            <IconButton size="small" color="success" onClick={() => onQuitar(t.id)}>
                              <CheckCircleIcon fontSize="small" />
                            </IconButton>
                          )}
                          <IconButton size="small" color="error" onClick={() => onDeletar(t.id)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
}