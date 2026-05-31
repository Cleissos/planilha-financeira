import HomeIcon from '@mui/icons-material/Home';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SchoolIcon from '@mui/icons-material/School';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HelpIcon from '@mui/icons-material/Help';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

// Ícones para os Bancos
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export const obterIconeCategoria = (categoria) => {
  switch (categoria) {
    case 'Gastos Fixos (Moradia/Contas)':
      return { icone: <HomeIcon />, cor: '#90caf9' }; // Azul claro
    case 'Veículo':
      return { icone: <DirectionsCarIcon />, cor: '#ffb74d' }; // Laranja
    case 'Investimentos':
    case 'Investimentos (Retorno)':
      return { icone: <TrendingUpIcon />, cor: '#81c784' }; // Verde
    case 'Reserva de Emergência':
      return { icone: <HealthAndSafetyIcon />, cor: '#4fc3f7' }; // Azul
    case 'Educação':
      return { icone: <SchoolIcon />, cor: '#fff176' }; // Amarelo
    case 'Lazer':
      return { icone: <LocalActivityIcon />, cor: '#f06292' }; // Rosa
    case 'Doação':
      return { icone: <CardGiftcardIcon />, cor: '#ba68c8' }; // Roxo
    case 'Trabalho (Salário)':
      return { icone: <WorkIcon />, cor: '#66bb6a' }; // Verde escuro
    default:
      return { icone: <HelpIcon />, cor: '#9e9e9e' }; // Cinza padrão
  }
};

export const obterConfigBanco = (banco) => {
  switch (banco) {
    case 'Nubank': 
      return { cor: '#820ad1', texto: '#ffffff' };
    case 'PicPay': 
      return { cor: '#11c76f', texto: '#ffffff' };
    case 'Mercado Pago': 
      return { cor: '#00aae4', texto: '#ffffff' };
    case 'PagBank': 
      return { cor: '#f4c204', texto: '#000000' };
    case 'Inter': 
      return { cor: '#ff7a00', texto: '#ffffff' };
    case 'Banpará': 
      return { cor: '#003399', texto: '#ffffff' }; // Azul clássico do Banpará
    case 'Dinheiro em Espécie': 
      return { cor: '#4caf50', texto: '#ffffff' };
    default: 
      return { cor: '#757575', texto: '#ffffff' };
  }
};