import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function GraficoGeral({ transacoes }) {
    const theme = useTheme();

    const processarDadosGrafico = () => {
        const agrupado = {};

        transacoes.forEach((t) => {
            // Agora agrupamos pela data de previsão/vencimento escolhida pelo usuário
            const [ano, mes, dia] = t.dataVencimento.split('-');
            const dataFormatada = `${dia}/${mes}`;

            if (!agrupado[dataFormatada]) {
                agrupado[dataFormatada] = { data: dataFormatada, Ganhos: 0, Gastos: 0 };
            }

            if (t.tipo === 'receita') {
                agrupado[dataFormatada].Ganhos += t.valor;
            } else {
                agrupado[dataFormatada].Gastos += t.valor;
            }
        });

        // Ordena as chaves de data para o gráfico fluir na ordem cronológica correta
        return Object.values(agrupado).sort((a, b) => {
            const [diaA, mesA] = a.data.split('/').map(Number);
            const [diaB, mesB] = b.data.split('/').map(Number);
            return mesA !== mesB ? mesA - mesB : diaA - diaB;
        });
    };

    const dadosGrafico = processarDadosGrafico();

    // Formatador de valores para a caixinha que aparece ao passar o mouse (Tooltip)
    const formatarMoedaTooltip = (value) => {
        return [value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })];
    };

    return (
        <Card sx={{ height: '100%', minHeight: 375 }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Fluxo de Caixa Dinâmico
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                    Comparativo diário de entradas e saídas
                </Typography>

                {dadosGrafico.length === 0 ? (
                    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                        <Typography color="text.secondary">
                            Insira transações para gerar o gráfico histórico.
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{ width: '100%', flexGrow: 1, minHeight: 280 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={dadosGrafico}
                                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                                <XAxis
                                    dataKey="data"
                                    stroke={theme.palette.text.secondary}
                                    fontSize={12}
                                />
                                <YAxis
                                    stroke={theme.palette.text.secondary}
                                    fontSize={12}
                                />
                                <Tooltip
                                    formatter={formatarMoedaTooltip}
                                    contentStyle={{
                                        backgroundColor: theme.palette.background.paper,
                                        borderColor: theme.palette.divider,
                                        borderRadius: 4
                                    }}
                                />
                                <Legend />
                                {/* Barra de Receitas (Verde) */}
                                <Bar dataKey="Ganhos" fill="#4caf50" radius={[4, 4, 0, 0]} />
                                {/* Barra de Despesas (Vermelha) */}
                                <Bar dataKey="Gastos" fill="#f44336" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}