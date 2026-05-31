// import { useState } from 'react';
// import { Card, CardContent, Typography, TextField, Button, MenuItem, Box, FormControl, InputLabel, Select, FormControlLabel, Checkbox, InputAdornment } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';

// export default function FormTransacao({ onAdicionar }) {
//   const [descricao, setDescricao] = useState('');
//   const [valor, setValor] = useState('');
//   const [tipo, setTipo] = useState('despesa');
//   const [categoria, setCategoria] = useState('');
//   const [bancoCartao, setBancoCartao] = useState(''); // NOVO
//   const [dataVencimento, setDataVencimento] = useState(new Date().toISOString().split('T')[0]);
//   const [jaQuitado, setJaQuitado] = useState(false);

//   // Categorias alinhadas com a Regra dos Potes da sua imagem
//   const categoriasReceita = ['Trabalho (Salário)', 'Investimentos (Retorno)', 'Outros'];
//   const categoriasDespesa = ['Gastos Fixos (Moradia/Contas)','Veículo', 'Investimentos', 'Reserva de Emergência', 'Educação', 'Lazer', 'Doação'];

//   // Lista dos seus bancos/cartões
//   const bancosDisponiveis = ['Nubank', 'PicPay', 'Mercado Pago', 'PagBank', 'Inter', 'Banpará', 'Dinheiro em Espécie'];

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!descricao || !valor || !categoria || !dataVencimento || !bancoCartao) {
//       alert('Por favor, preencha todos os campos.');
//       return;
//     }

//     const novaTransacao = {
//       id: crypto.randomUUID(),
//       descricao,
//       valor: parseFloat(valor),
//       tipo,
//       categoria,
//       bancoCartao, // Salvando o banco escolhido
//       dataVencimento,
//       dataPagamento: jaQuitado ? new Date().toISOString().split('T')[0] : null,
//       status: jaQuitado ? 'concluido' : 'pendente'
//     };

//     onAdicionar(novaTransacao);

//     setDescricao('');
//     setValor('');
//     setCategoria('');
//     setBancoCartao('');
//     setJaQuitado(false);
//   };

//   return (
//     <Card>
//       <CardContent>
//         <Typography variant="h6" fontWeight="bold" gutterBottom>
//           Nova Transação
//         </Typography>

//         <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
//           <TextField
//             label="Descrição"
//             variant="outlined"
//             fullWidth
//             size="small"
//             value={descricao}
//             onChange={(e) => setDescricao(e.target.value)}
//           />

//           <TextField
//             label="Valor"
//             type="number"
//             variant="outlined"
//             fullWidth
//             size="small"
//             inputProps={{ step: "0.01", min: "0.01" }}
//             value={valor}
//             onChange={(e) => setValor(e.target.value)}
//             InputProps={{
//               startAdornment: <InputAdornment position="start">R$</InputAdornment>,
//             }}
//           />

//           <FormControl fullWidth size="small">
//             <InputLabel id="label-tipo">Tipo</InputLabel>
//             <Select
//               labelId="label-tipo"
//               value={tipo}
//               label="Tipo"
//               onChange={(e) => {
//                 setTipo(e.target.value);
//                 setCategoria('');
//               }}
//             >
//               <MenuItem value="despesa">Despesa (Gasto)</MenuItem>
//               <MenuItem value="receita">Receita (Ganho)</MenuItem>
//             </Select>
//           </FormControl>

//           {/* NOVO CAMPO: Origem/Destino do dinheiro */}
//           <FormControl fullWidth size="small">
//             <InputLabel id="label-banco">Banco / Cartão</InputLabel>
//             <Select
//               labelId="label-banco"
//               value={bancoCartao}
//               label="Banco / Cartão"
//               onChange={(e) => setBancoCartao(e.target.value)}
//             >
//               {bancosDisponiveis.map(banco => (
//                 <MenuItem key={banco} value={banco}>{banco}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl fullWidth size="small">
//             <InputLabel id="label-categoria">Pote / Categoria</InputLabel>
//             <Select
//               labelId="label-categoria"
//               value={categoria}
//               label="Pote / Categoria"
//               onChange={(e) => setCategoria(e.target.value)}
//             >
//               {tipo === 'receita' 
//                 ? categoriasReceita.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)
//                 : categoriasDespesa.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)
//               }
//             </Select>
//           </FormControl>

//           <TextField
//             label={tipo === 'receita' ? "Previsão de Recebimento" : "Data de Vencimento"}
//             type="date"
//             fullWidth
//             size="small"
//             InputLabelProps={{ shrink: true }}
//             value={dataVencimento}
//             onChange={(e) => setDataVencimento(e.target.value)}
//           />

//           <FormControlLabel
//             control={
//               <Checkbox 
//                 checked={jaQuitado} 
//                 onChange={(e) => setJaQuitado(e.target.checked)} 
//                 color={tipo === 'receita' ? 'primary' : 'secondary'}
//               />
//             }
//             label={tipo === 'receita' ? "Já recebi este valor" : "Já paguei esta conta"}
//           />

//           <Button 
//             type="submit" 
//             variant="contained" 
//             color={tipo === 'receita' ? 'primary' : 'secondary'}
//             startIcon={<AddIcon />}
//             fullWidth
//           >
//             Adicionar
//           </Button>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }

import { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, MenuItem, Box, FormControl, InputLabel, Select, FormControlLabel, Checkbox, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { obterIconeCategoria, obterConfigBanco } from '../utils/iconesFinanceiros';

export default function FormTransacao({ onAdicionar }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('despesa');
  const [categoria, setCategoria] = useState('');
  const [bancoCartao, setBancoCartao] = useState('');
  const [dataVencimento, setDataVencimento] = useState(new Date().toISOString().split('T')[0]);
  const [jaQuitado, setJaQuitado] = useState(false);

  // Categorias alinhadas com a Regra dos Potes e imagem do usuário
  const categoriasReceita = ['Trabalho (Salário)', 'Investimentos (Retorno)', 'Outros'];
  const categoriasDespesa = ['Gastos Fixos (Moradia/Contas)', 'Veículo', 'Investimentos', 'Reserva de Emergência', 'Educação', 'Lazer', 'Doação'];

  // Lista atualizada de bancos baseada nas imagens do usuário
  const bancosDisponiveis = ['Nubank', 'PicPay', 'Mercado Pago', 'PagBank', 'Inter', 'Banpará', 'Dinheiro em Espécie'];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!descricao || !valor || !categoria || !dataVencimento || !bancoCartao) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novaTransacao = {
      id: crypto.randomUUID(),
      descricao,
      valor: parseFloat(valor),
      tipo,
      categoria,
      bancoCartao,
      dataVencimento,
      dataPagamento: jaQuitado ? new Date().toISOString().split('T')[0] : null,
      status: jaQuitado ? 'concluido' : 'pendente'
    };

    onAdicionar(novaTransacao);

    // Limpa o formulário mantendo a data padrão
    setDescricao('');
    setValor('');
    setCategoria('');
    setBancoCartao('');
    setJaQuitado(false);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Nova Transação
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Descrição"
            variant="outlined"
            fullWidth
            size="small"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <TextField
            label="Valor"
            type="number"
            variant="outlined"
            fullWidth
            size="small"
            inputProps={{ step: "0.01", min: "0.01" }}
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            }}
          />

          <FormControl fullWidth size="small">
            <InputLabel id="label-tipo">Tipo</InputLabel>
            <Select
              labelId="label-tipo"
              value={tipo}
              label="Tipo"
              onChange={(e) => {
                setTipo(e.target.value);
                setCategoria('');
              }}
            >
              <MenuItem value="despesa">Despesa (Gasto)</MenuItem>
              <MenuItem value="receita">Receita (Ganho)</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel id="label-banco">Banco / Cartão</InputLabel>
            <Select
              labelId="label-banco"
              value={bancoCartao}
              label="Banco / Cartão"
              onChange={(e) => setBancoCartao(e.target.value)}
            >
              {bancosDisponiveis.map(banco => (
                <MenuItem key={banco} value={banco}>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        bgcolor: obterConfigBanco(banco).cor 
                      }} 
                    />
                    {banco}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel id="label-categoria">Pote / Categoria</InputLabel>
            <Select
              labelId="label-categoria"
              value={categoria}
              label="Pote / Categoria"
              onChange={(e) => setCategoria(e.target.value)}
            >
              {tipo === 'receita' 
                ? categoriasReceita.map(cat => (
                    <MenuItem key={cat} value={cat}>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Box sx={{ color: obterIconeCategoria(cat).cor, display: 'flex', alignItems: 'center' }}>
                          {obterIconeCategoria(cat).icone}
                        </Box>
                        {cat}
                      </Box>
                    </MenuItem>
                  ))
                : categoriasDespesa.map(cat => (
                    <MenuItem key={cat} value={cat}>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Box sx={{ color: obterIconeCategoria(cat).cor, display: 'flex', alignItems: 'center' }}>
                          {obterIconeCategoria(cat).icone}
                        </Box>
                        {cat}
                      </Box>
                    </MenuItem>
                  ))
              }
            </Select>
          </FormControl>

          <TextField
            label={tipo === 'receita' ? "Previsão de Recebimento" : "Data de Vencimento"}
            type="date"
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            value={dataVencimento}
            onChange={(e) => setDataVencimento(e.target.value)}
          />

          <FormControlLabel
            control={
              <Checkbox 
                checked={jaQuitado} 
                onChange={(e) => setJaQuitado(e.target.checked)} 
                color={tipo === 'receita' ? 'primary' : 'secondary'}
              />
            }
            label={tipo === 'receita' ? "Já recebi este valor" : "Já paguei esta conta"}
          />

          <Button 
            type="submit" 
            variant="contained" 
            color={tipo === 'receita' ? 'primary' : 'secondary'}
            startIcon={<AddIcon />}
            fullWidth
          >
            Adicionar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}