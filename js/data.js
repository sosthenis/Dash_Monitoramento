// ============================================================
// DATA.JS — Dados simulados do Sistema Hídrico Jaguaribe-RMF
// Referência: 06/04/2026 | Ref. Média: 01/03/2026
// ============================================================

const DATA_REF = '06/04/2026';
const DATA_MEDIA_REF = '01/03/2026';
const HORA_ATUALIZACAO = '07:15';

const ATIVOS = [
  {
    id: 'jati', nome: 'Barragem Jati', tipo: 'barragem', trecho: 1,
    status: 'normal', icone: '🏗️',
    indicadorPrincipal: { valor: 3.20, unidade: 'm³/s', label: 'Vazão PISF' },
    metricas: { 'Nível (m)': '384,12', 'Volume (hm³)': '52,4', 'Vol. (%)': '78%', 'Evap.': '0,08 m³/s' }
  },
  {
    id: 'eb-castanhao', nome: 'EB Castanhão', tipo: 'bombeamento', trecho: 3,
    status: 'atencao', icone: '⚙️',
    indicadorPrincipal: { valor: 8.4, unidade: 'm³/s', label: 'Vazão Bombeada' },
    metricas: { 'Bombas Ativas': '3/4', 'Energia': 'Estável', 'Desvio': '-12.4%' }
  },
  {
    id: 'eta-gaviao', nome: 'ETA Gavião', tipo: 'eta', trecho: 6,
    status: 'normal', icone: '🏭',
    indicadorPrincipal: { valor: 6.5, unidade: 'm³/s', label: 'Vazão Tratada' },
    metricas: { 'Qualidade': 'Boa', 'Eficiência': '94%' }
  }
];

const ALERTAS = [
  {
    id: 'a1', ativo: 'eb-castanhao', nome: 'EB Castanhão',
    severidade: 'atencao', icone: '⚠️',
    descricao: 'Motobomba MB-4 indisponível. Vazão 12,4% abaixo da média.'
  }
];

const TRECHOS = [
  { id: 1, nome: 'PISF / Jati' },
  { id: 2, nome: 'CAC + Rios' },
  { id: 3, nome: 'Castanhão + Eixão I' },
  { id: 4, nome: 'Eixão II + III' },
  { id: 5, nome: 'Pacoti / Riachão / Gavião' },
  { id: 6, nome: 'ETAs + RMF' },
  { id: 7, nome: 'Pecém + Industriais' }
];

const TENDENCIA_7D = {
  labels: ['01/04', '02/04', '03/04', '04/04', '05/04', '06/04'],
  data: [18.1, 18.2, 17.9, 18.4, 18.3, 18.4]
};

// HELPERS
function getAtivo(id) {
  return ATIVOS.find(a => a.id === id);
}
