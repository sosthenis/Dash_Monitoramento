// ============================================================
// DATA.JS — Dados simulados do Sistema Hídrico Jaguaribe-RMF
// Referência: 31/03/2026 | Ref. Média: 01/02/2026
// ============================================================

const DATA_REF = '31/03/2026';
const DATA_MEDIA_REF = '01/02/2026';
const HORA_ATUALIZACAO = '07:15';

// ─────────────────────────────────────────────────────────
// TIPOS: acude | eb | ee | eta | canal | rio | usuario | barragem
// STATUS: normal | atencao | critico | inativo
// ─────────────────────────────────────────────────────────

const ATIVOS = [
  // ─── TRECHO 1: PISF / JATI ─────────────────────────────
  {
    id: 'jati', nome: 'Barragem Jati', tipo: 'barragem', trecho: 1,
    status: 'normal', icone: '🏗️',
    indicadorPrincipal: { valor: 3.20, unidade: 'm³/s', label: 'Vazão PISF' },
    metricas: { 'Nível (m)': '384,12', 'Volume (hm³)': '52,4', 'Vol. (%)': '78%', 'Evap.': '0,08 m³/s' },
    mediaMes: 3.10, desvio: '+3,2%',
    historico: [2.9, 3.0, 3.1, 3.0, 3.2, 3.1, 3.2],
    limiteOp: 'Cota mín. 380,00 m',
    conexoes: { montante: [], jusante: ['cac'] }
  },
  {
    id: 'pisf-norte', nome: 'PISF Eixo Norte', tipo: 'canal', trecho: 1,
    status: 'normal', icone: '🔵',
    indicadorPrincipal: { valor: 3.20, unidade: 'm³/s', label: 'Vazão Transferida' },
    metricas: { 'Extensão': '53 km', 'Seção': 'CAC-01', 'Tipo': 'Canalizado', 'Status': 'Operando' },
    mediaMes: 3.10, desvio: '+3,2%',
    historico: [2.9, 3.0, 3.1, 3.0, 3.2, 3.1, 3.2],
    limiteOp: '-',
    conexoes: { montante: ['jati'], jusante: ['cac'] }
  },

  // ─── TRECHO 2: CAC + RIOS ──────────────────────────────
  {
    id: 'cac', nome: 'Cinturão das Águas (CAC)', tipo: 'canal', trecho: 2,
    status: 'normal', icone: '〰️',
    indicadorPrincipal: { valor: 3.20, unidade: 'm³/s', label: 'Vazão no Canal' },
    metricas: { 'Extensão': '53 km', 'Destino': 'Rio Salgado', 'Tipo': 'Canalizado', 'Perda est.': '0,12 m³/s' },
    mediaMes: 3.05, desvio: '+4,9%',
    historico: [2.8, 2.9, 3.0, 3.0, 3.1, 3.1, 3.2],
    limiteOp: '-',
    conexoes: { montante: ['jati'], jusante: ['rio-salgado'] }
  },
  {
    id: 'rio-salgado', nome: 'Rio Salgado', tipo: 'rio', trecho: 2,
    status: 'normal', icone: '🌊',
    indicadorPrincipal: { valor: 4.80, unidade: 'm³/s', label: 'Vazão Fluviométrica' },
    metricas: { 'Estação': 'Icó', 'Cota': '2,41 m', 'Vol.': 'N/A', 'Tipo': 'Natural+PISF' },
    mediaMes: 4.50, desvio: '+6,7%',
    historico: [4.2, 4.4, 4.5, 4.6, 4.7, 4.8, 4.8],
    limiteOp: 'Alerta > 6,0 m³/s',
    conexoes: { montante: ['cac'], jusante: ['rio-jaguaribe'] }
  },
  {
    id: 'rio-jaguaribe', nome: 'Rio Jaguaribe', tipo: 'rio', trecho: 2,
    status: 'normal', icone: '🌊',
    indicadorPrincipal: { valor: 6.50, unidade: 'm³/s', label: 'Vazão (Seção Minas)' },
    metricas: { 'Estação': 'Jaguaribe', 'Cota': '3,12 m', 'Contribuição': 'Castanhão + PISF', 'Tipo': 'Perene' },
    mediaMes: 6.20, desvio: '+4,8%',
    historico: [5.9, 6.1, 6.2, 6.3, 6.4, 6.5, 6.5],
    limiteOp: 'Perenização ativa',
    conexoes: { montante: ['rio-salgado'], jusante: ['castanhao'] }
  },
  {
    id: 'acude-lima-campos', nome: 'Açude Lima Campos', tipo: 'acude', trecho: 2,
    status: 'normal', icone: '💧',
    indicadorPrincipal: { valor: 78.4, unidade: '%', label: 'Volume Útil' },
    metricas: { 'Volume (hm³)': '137,2', 'Cap. (hm³)': '175,0', 'Nível (m)': '227,84', 'Evap.': '0,21 m³/s' },
    mediaMes: 79.1, desvio: '-0,9%',
    historico: [79, 79, 78.8, 78.6, 78.5, 78.4, 78.4],
    limiteOp: 'Alerta < 20%',
    conexoes: { montante: ['rio-jaguaribe'], jusante: ['castanhao'] }
  },

  // ─── TRECHO 3: CASTANHÃO + EIXÃO I ───────────────────────
  {
    id: 'castanhao', nome: 'Açude Castanhão', tipo: 'acude', trecho: 3,
    status: 'normal', icone: '💧',
    indicadorPrincipal: { valor: 68.7, unidade: '%', label: 'Volume Útil' },
    metricas: { 'Volume (hm³)': '4.451', 'Cap. (hm³)': '6.700', 'Nível (m)': '55,62', 'Evap.': '1,84 m³/s' },
    mediaMes: 69.5, desvio: '-1,1%',
    historico: [69.8, 69.6, 69.5, 69.2, 69.0, 68.8, 68.7],
    limiteOp: 'Alerta < 30% | Mín. op. 20%',
    conexoes: { montante: ['rio-jaguaribe'], jusante: ['eb-castanhao', 'fapija'] }
  },
  {
    id: 'eb-castanhao', nome: 'EB Castanhão', tipo: 'eb', trecho: 3,
    status: 'atencao', icone: '⚙️',
    indicadorPrincipal: { valor: 7.80, unidade: 'm³/s', label: 'Vazão Atual' },
    metricas: { 'Bombas ativas': '3/4', 'Tempo op.': '21h 30m', 'Vazão média': '8,9 m³/s', 'Indisponib.': '1 MB' },
    mediaMes: 8.90, desvio: '-12,4%',
    historico: [8.8, 8.9, 8.9, 8.7, 8.2, 7.9, 7.8],
    limiteOp: 'Mín. operacional 5,0 m³/s',
    bombas: [true, true, true, false],
    conexoes: { montante: ['castanhao'], jusante: ['eixao-1'] }
  },
  {
    id: 'eixao-1', nome: 'Eixão — Trecho I', tipo: 'canal', trecho: 3,
    status: 'atencao', icone: '〰️',
    indicadorPrincipal: { valor: 7.65, unidade: 'm³/s', label: 'Vazão no Trecho' },
    metricas: { 'Tipo': 'Canalizado/Tubular', 'Perda inf.': '0,15 m³/s', 'Destino': 'Curral Velho', 'Extensão': 'longo' },
    mediaMes: 8.75, desvio: '-12,6%',
    historico: [8.6, 8.7, 8.7, 8.5, 8.0, 7.7, 7.65],
    limiteOp: 'Impacto direto no Gavião',
    conexoes: { montante: ['eb-castanhao'], jusante: ['acude-curral-velho', 'eb-itaicaba'] }
  },
  {
    id: 'fapija', nome: 'FAPIJA', tipo: 'usuario', trecho: 3,
    status: 'normal', icone: '🌾',
    indicadorPrincipal: { valor: 0.85, unidade: 'm³/s', label: 'Vazão Entregue' },
    metricas: { 'Tipo': 'Irrigação', 'Rio': 'Jaguaribe-Apodi', 'Média mês': '0,82 m³/s', 'Tendência': '↑' },
    mediaMes: 0.82, desvio: '+3,7%',
    historico: [0.8, 0.82, 0.83, 0.84, 0.85, 0.85, 0.85],
    limiteOp: '-',
    conexoes: { montante: ['castanhao'], jusante: [] }
  },
  {
    id: 'acude-curral-velho', nome: 'Açude Curral Velho', tipo: 'acude', trecho: 3,
    status: 'normal', icone: '💧',
    indicadorPrincipal: { valor: 82.1, unidade: '%', label: 'Volume Útil' },
    metricas: { 'Volume (hm³)': '246,3', 'Cap. (hm³)': '300,0', 'Nível (m)': '312,44', 'Evap.': '0,31 m³/s' },
    mediaMes: 83.0, desvio: '-1,1%',
    historico: [83.2, 83.1, 82.9, 82.7, 82.5, 82.2, 82.1],
    limiteOp: 'Alerta < 30%',
    conexoes: { montante: ['eixao-1'], jusante: ['eixao-2'] }
  },

  // ─── TRECHO 4: EIXÃO II + III ────────────────────────────
  {
    id: 'eb-itaicaba', nome: 'EB Itaiçaba', tipo: 'eb', trecho: 4,
    status: 'normal', icone: '⚙️',
    indicadorPrincipal: { valor: 7.60, unidade: 'm³/s', label: 'Vazão Atual' },
    metricas: { 'Bombas ativas': '4/4', 'Tempo op.': '24h 00m', 'Vazão média': '8,65 m³/s', 'Indisponib.': '0 MB' },
    mediaMes: 8.65, desvio: '-12,1%',
    historico: [8.6, 8.6, 8.5, 8.3, 7.9, 7.7, 7.6],
    limiteOp: '-',
    bombas: [true, true, true, true],
    conexoes: { montante: ['eixao-1'], jusante: ['eixao-2'] }
  },
  {
    id: 'eixao-2', nome: 'Eixão — Trecho II', tipo: 'canal', trecho: 4,
    status: 'normal', icone: '〰️',
    indicadorPrincipal: { valor: 7.55, unidade: 'm³/s', label: 'Vazão no Trecho' },
    metricas: { 'Tipo': 'Tubular', 'Perda inf.': '0,05 m³/s', 'Destino': 'Piranji', 'Extensão': 'intermediário' },
    mediaMes: 8.60, desvio: '-12,2%',
    historico: [8.55, 8.58, 8.5, 8.3, 7.8, 7.6, 7.55],
    limiteOp: '-',
    conexoes: { montante: ['eb-itaicaba', 'acude-curral-velho'], jusante: ['eb-piranji', 'eb-umburanas'] }
  },
  {
    id: 'eb-piranji', nome: 'EB Piranji', tipo: 'eb', trecho: 4,
    status: 'normal', icone: '⚙️',
    indicadorPrincipal: { valor: 7.55, unidade: 'm³/s', label: 'Vazão Atual' },
    metricas: { 'Bombas ativas': '3/3', 'Tempo op.': '24h 00m', 'Vazão média': '8,58 m³/s', 'Indisponib.': '0 MB' },
    mediaMes: 8.58, desvio: '-12,0%',
    historico: [8.5, 8.5, 8.5, 8.3, 7.8, 7.6, 7.55],
    limiteOp: '-',
    bombas: [true, true, true],
    conexoes: { montante: ['eixao-2'], jusante: ['eixao-3'] }
  },
  {
    id: 'eb-umburanas', nome: 'EB Umburanas', tipo: 'eb', trecho: 4,
    status: 'normal', icone: '⚙️',
    indicadorPrincipal: { valor: 7.55, unidade: 'm³/s', label: 'Vazão Atual' },
    metricas: { 'Bombas ativas': '2/2', 'Tempo op.': '22h 15m', 'Vazão média': '8,55 m³/s', 'Indisponib.': '0 MB' },
    mediaMes: 8.55, desvio: '-11,7%',
    historico: [8.5, 8.5, 8.5, 8.3, 7.9, 7.6, 7.55],
    limiteOp: '-',
    bombas: [true, true],
    conexoes: { montante: ['eixao-2'], jusante: ['canal-trabalhador'] }
  },
  {
    id: 'canal-trabalhador', nome: 'Canal do Trabalhador', tipo: 'canal', trecho: 4,
    status: 'normal', icone: '〰️',
    indicadorPrincipal: { valor: 7.50, unidade: 'm³/s', label: 'Vazão no Canal' },
    metricas: { 'Tipo': 'Canalizado', 'Perda inf.': '0,10 m³/s', 'Destino': 'Pacoti/Gavião', 'Status': 'Operando' },
    mediaMes: 8.50, desvio: '-11,8%',
    historico: [8.4, 8.45, 8.48, 8.2, 7.8, 7.55, 7.50],
    limiteOp: '-',
    conexoes: { montante: ['eb-umburanas'], jusante: ['acude-pacoti'] }
  },
  {
    id: 'eixao-3', nome: 'Eixão — Trecho III', tipo: 'canal', trecho: 4,
    status: 'normal', icone: '〰️',
    indicadorPrincipal: { valor: 7.48, unidade: 'm³/s', label: 'Vazão no Trecho' },
    metricas: { 'Tipo': 'Tubular', 'Perda inf.': '0,07 m³/s', 'Destino': 'Pacajus', 'Status': 'Operando' },
    mediaMes: 8.52, desvio: '-12,2%',
    historico: [8.45, 8.50, 8.48, 8.25, 7.8, 7.52, 7.48],
    limiteOp: '-',
    conexoes: { montante: ['eb-piranji'], jusante: ['acude-pacajus', 'eb-erere'] }
  },

  // ─── TRECHO 5: PACOTI / RIACHÃO / GAVIÃO ─────────────────
  {
    id: 'acude-pacajus', nome: 'Açude Pacajus', tipo: 'acude', trecho: 5,
    status: 'normal', icone: '💧',
    indicadorPrincipal: { valor: 71.2, unidade: '%', label: 'Volume Útil' },
    metricas: { 'Volume (hm³)': '142,4', 'Cap. (hm³)': '200,0', 'Nível (m)': '74,18', 'Evap.': '0,28 m³/s' },
    mediaMes: 72.0, desvio: '-1,1%',
    historico: [72.5, 72.3, 72.1, 71.9, 71.6, 71.3, 71.2],
    limiteOp: 'Alerta < 20%',
    conexoes: { montante: ['eixao-3'], jusante: ['acude-pacoti'] }
  },
  {
    id: 'eb-erere', nome: 'EB Ererê', tipo: 'eb', trecho: 5,
    status: 'normal', icone: '⚙️',
    indicadorPrincipal: { valor: 1.20, unidade: 'm³/s', label: 'Vazão Atual' },
    metricas: { 'Bombas ativas': '1/2', 'Tempo op.': '12h 00m', 'Vazão média': '1,15 m³/s', 'Tipo': 'Reversão' },
    mediaMes: 1.15, desvio: '+4,3%',
    historico: [1.1, 1.1, 1.15, 1.15, 1.2, 1.2, 1.2],
    limiteOp: '-',
    bombas: [true, false],
    conexoes: { montante: ['eixao-3'], jusante: ['acude-banabuiu'] }
  },
  {
    id: 'acude-banabuiu', nome: 'Açude Banabuiú', tipo: 'acude', trecho: 5,
    status: 'normal', icone: '💧',
    indicadorPrincipal: { valor: 74.3, unidade: '%', label: 'Volume Útil' },
    metricas: { 'Volume (hm³)': '938,4', 'Cap. (hm³)': '1.263', 'Nível (m)': '216,74', 'Evap.': '0,92 m³/s' },
    mediaMes: 75.0, desvio: '-0,9%',
    historico: [75.2, 75.0, 74.9, 74.7, 74.5, 74.4, 74.3],
    limiteOp: 'Alerta < 25%',
    conexoes: { montante: ['eb-erere'], jusante: ['eb-banabuiu'] }
  },
  {
    id: 'eb-banabuiu', nome: 'EB Banabuiú', tipo: 'eb', trecho: 5,
    status: 'normal', icone: '⚙️',
    indicadorPrincipal: { valor: 2.45, unidade: 'm³/s', label: 'Vazão Atual' },
    metricas: { 'Bombas ativas': '2/3', 'Tempo op.': '18h 30m', 'Vazão média': '2,40 m³/s', 'Status': 'Normal' },
    mediaMes: 2.40, desvio: '+2,1%',
    historico: [2.35, 2.38, 2.40, 2.40, 2.43, 2.45, 2.45],
    limiteOp: '-',
    bombas: [true, true, false],
    conexoes: { montante: ['acude-banabuiu'], jusante: ['eixao-1'] }
  },
  {
    id: 'acude-pacoti', nome: 'Açude Pacoti', tipo: 'acude', trecho: 5,
    status: 'normal', icone: '💧',
    indicadorPrincipal: { valor: 58.6, unidade: '%', label: 'Volume Útil' },
    metricas: { 'Volume (hm³)': '152,4', 'Cap. (hm³)': '260,0', 'Nível (m)': '89,44', 'Evap.': '0,44 m³/s' },
    mediaMes: 60.0, desvio: '-2,3%',
    historico: [60.5, 60.2, 59.9, 59.5, 59.1, 58.8, 58.6],
    limiteOp: 'Alerta < 20%',
    conexoes: { montante: ['canal-trabalhador', 'acude-pacajus'], jusante: ['acude-riachaoo'] }
  },
  {
    id: 'acude-riachaoo', nome: 'Açude Riachão', tipo: 'acude', trecho: 5,
    status: 'atencao', icone: '💧',
    indicadorPrincipal: { valor: 38.2, unidade: '%', label: 'Volume Útil' },
    metricas: { 'Volume (hm³)': '57,3', 'Cap. (hm³)': '150,0', 'Nível (m)': '42,18', 'Evap.': '0,18 m³/s' },
    mediaMes: 40.5, desvio: '-5,7%',
    historico: [41.2, 40.8, 40.5, 39.9, 39.3, 38.7, 38.2],
    limiteOp: 'Atenção < 40% | Alerta < 25%',
    conexoes: { montante: ['acude-pacoti'], jusante: ['acude-gaviao'] }
  },
  {
    id: 'acude-gaviao', nome: 'Açude Gavião', tipo: 'acude', trecho: 5,
    status: 'normal', icone: '💧',
    indicadorPrincipal: { valor: 62.4, unidade: '%', label: 'Volume Útil' },
    metricas: { 'Volume (hm³)': '99,8', 'Cap. (hm³)': '160,0', 'Nível (m)': '30,62', 'Evap.': '0,22 m³/s' },
    mediaMes: 63.2, desvio: '-1,3%',
    historico: [63.5, 63.3, 63.1, 62.9, 62.7, 62.5, 62.4],
    limiteOp: 'Mín. ETA Gavião: Cota 28,50 m',
    conexoes: { montante: ['acude-riachaoo'], jusante: ['eta-gaviao', 'eta-oeste'] }
  },

  // ─── TRECHO 6: ETAs + RMF ───────────────────────────────
  {
    id: 'eta-gaviao', nome: 'ETA Gavião', tipo: 'eta', trecho: 6,
    status: 'normal', icone: '🔬',
    indicadorPrincipal: { valor: 7.74, unidade: 'm³/s', label: 'Produção Atual' },
    metricas: { 'Média mês': '7,70 m³/s', 'Desvio': '+0,04', 'Capacidade': '80%', 'Status': 'Normal' },
    mediaMes: 7.70, desvio: '+0,5%',
    historico: [7.65, 7.68, 7.70, 7.71, 7.72, 7.73, 7.74],
    limiteOp: 'Mín. abastecimento: 6,0 m³/s',
    conexoes: { montante: ['acude-gaviao'], jusante: ['rmf'] }
  },
  {
    id: 'eta-oeste', nome: 'ETA Oeste', tipo: 'eta', trecho: 6,
    status: 'normal', icone: '🔬',
    indicadorPrincipal: { valor: 1.92, unidade: 'm³/s', label: 'Produção Atual' },
    metricas: { 'Média mês': '1,90 m³/s', 'Desvio': '+0,02', 'Capacidade': '64%', 'Status': 'Normal' },
    mediaMes: 1.90, desvio: '+1,1%',
    historico: [1.88, 1.89, 1.90, 1.90, 1.91, 1.92, 1.92],
    limiteOp: 'Mín. operacional: 1,0 m³/s',
    conexoes: { montante: ['acude-gaviao'], jusante: ['rmf'] }
  },
  {
    id: 'eta-maranguape', nome: 'ETA Maranguape', tipo: 'eta', trecho: 6,
    status: 'normal', icone: '🔬',
    indicadorPrincipal: { valor: 0.32, unidade: 'm³/s', label: 'Produção Atual' },
    metricas: { 'Média mês': '0,31 m³/s', 'Desvio': '+0,01', 'Capacidade': '32%', 'Açude': 'Maranguapinho' },
    mediaMes: 0.31, desvio: '+3,2%',
    historico: [0.30, 0.30, 0.31, 0.31, 0.32, 0.32, 0.32],
    limiteOp: '-',
    conexoes: { montante: ['acude-maranguapinho'], jusante: ['rmf'] }
  },
  {
    id: 'acude-maranguapinho', nome: 'Açude Maranguapinho', tipo: 'acude', trecho: 6,
    status: 'normal', icone: '💧',
    indicadorPrincipal: { valor: 54.8, unidade: '%', label: 'Volume Útil' },
    metricas: { 'Volume (hm³)': '38,4', 'Cap. (hm³)': '70,0', 'Nível (m)': '28,14', 'Evap.': '0,09 m³/s' },
    mediaMes: 55.5, desvio: '-1,3%',
    historico: [55.8, 55.6, 55.4, 55.2, 55.0, 54.9, 54.8],
    limiteOp: 'Alerta < 20%',
    conexoes: { montante: ['eb-maranguape'], jusante: ['eta-maranguape'] }
  },
  {
    id: 'eta-catuana', nome: 'ETA Catuana', tipo: 'eta', trecho: 6,
    status: 'normal', icone: '🔬',
    indicadorPrincipal: { valor: 0.48, unidade: 'm³/s', label: 'Produção Atual' },
    metricas: { 'Média mês': '0,47 m³/s', 'Desvio': '+0,01', 'Capacidade': '48%', 'Status': 'Normal' },
    mediaMes: 0.47, desvio: '+2,1%',
    historico: [0.46, 0.47, 0.47, 0.48, 0.48, 0.48, 0.48],
    limiteOp: '-',
    conexoes: { montante: ['acude-gaviao'], jusante: ['rmf'] }
  },
  {
    id: 'rmf', nome: 'RMF — Abastecimento', tipo: 'usuario', trecho: 6,
    status: 'normal', icone: '🏙️',
    indicadorPrincipal: { valor: 9.66, unidade: 'm³/s', label: 'Total Entregue às ETAs' },
    metricas: { 'ETA Gavião': '7,74 m³/s', 'ETA Oeste': '1,92 m³/s', 'Pop. atendida': '~3,5 mi', 'Tipo': 'Abastecimento' },
    mediaMes: 9.60, desvio: '+0,6%',
    historico: [9.53, 9.57, 9.60, 9.62, 9.64, 9.65, 9.66],
    limiteOp: 'Demanda mínima: 8,5 m³/s',
    conexoes: { montante: ['eta-gaviao', 'eta-oeste'], jusante: [] }
  },

  // ─── TRECHO 7: PECÉM + INDUSTRIAIS ───────────────────────
  {
    id: 'eixao-4', nome: 'Eixão — Trecho IV', tipo: 'canal', trecho: 7,
    status: 'normal', icone: '〰️',
    indicadorPrincipal: { valor: 1.85, unidade: 'm³/s', label: 'Vazão no Trecho' },
    metricas: { 'Tipo': 'Tubular', 'Destino': 'Sítios Novos / Pecém', 'Status': 'Operando', 'Perda': '0,04 m³/s' },
    mediaMes: 1.82, desvio: '+1,6%',
    historico: [1.80, 1.81, 1.82, 1.83, 1.84, 1.85, 1.85],
    limiteOp: '-',
    conexoes: { montante: ['acude-gaviao'], jusante: ['eixao-5'] }
  },
  {
    id: 'eixao-5', nome: 'Eixão — Trecho V', tipo: 'canal', trecho: 7,
    status: 'normal', icone: '〰️',
    indicadorPrincipal: { valor: 0.83, unidade: 'm³/s', label: 'Vazão no Trecho' },
    metricas: { 'Tipo': 'Tubular', 'Destino': 'RAP Pecém', 'Status': 'Operando', 'Perda': '0,02 m³/s' },
    mediaMes: 0.82, desvio: '+1,2%',
    historico: [0.80, 0.81, 0.81, 0.82, 0.82, 0.83, 0.83],
    limiteOp: '-',
    conexoes: { montante: ['eixao-4'], jusante: ['rap-pecem', 'eb-pecem'] }
  },
  {
    id: 'rap-pecem', nome: 'RAP Pecém', tipo: 'barragem', trecho: 7,
    status: 'normal', icone: '🏗️',
    indicadorPrincipal: { valor: 77.4, unidade: '%', label: 'Volume Útil' },
    metricas: { 'Volume (hm³)': '38,7', 'Cap. (hm³)': '50,0', 'Nível (m)': 'N/A', 'Status': 'Operando' },
    mediaMes: 78.0, desvio: '-0,8%',
    historico: [78.2, 78.0, 77.8, 77.7, 77.5, 77.4, 77.4],
    limiteOp: '-',
    conexoes: { montante: ['eixao-5'], jusante: ['eb-pocos-taiba', 'edp', 'arcelormittal', 'eneva', 'gerdau'] }
  },
  {
    id: 'eb-pecem', nome: 'EB Pecém', tipo: 'eb', trecho: 7,
    status: 'normal', icone: '⚙️',
    indicadorPrincipal: { valor: 0.82, unidade: 'm³/s', label: 'Vazão Atual' },
    metricas: { 'Bombas ativas': '2/2', 'Tempo op.': '22h 00m', 'Vazão média': '0,80 m³/s', 'Status': 'Normal' },
    mediaMes: 0.80, desvio: '+2,5%',
    historico: [0.79, 0.80, 0.80, 0.81, 0.82, 0.82, 0.82],
    limiteOp: '-',
    bombas: [true, true],
    conexoes: { montante: ['eixao-5'], jusante: ['rap-pecem'] }
  },
  {
    id: 'eb-pocos-taiba', nome: 'EB Poços da Taíba', tipo: 'eb', trecho: 7,
    status: 'normal', icone: '⚙️',
    indicadorPrincipal: { valor: 0.12, unidade: 'm³/s', label: 'Vazão Atual' },
    metricas: { 'Bombas ativas': '1/1', 'Tempo op.': '20h 15m', 'Vazão média': '0,12 m³/s', 'Status': 'Normal' },
    mediaMes: 0.12, desvio: '0,0%',
    historico: [0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12],
    limiteOp: '-',
    bombas: [true],
    conexoes: { montante: ['rap-pecem'], jusante: ['edp'] }
  },
  {
    id: 'edp', nome: 'EDP — Energia do Pecém', tipo: 'usuario', trecho: 7,
    status: 'normal', icone: '⚡',
    indicadorPrincipal: { valor: 0.18, unidade: 'm³/s', label: 'Consumo Atual' },
    metricas: { 'Tipo': 'Indústria', 'Média mês': '0,17 m³/s', 'Tendência': '↑', 'Contrato': 'ativo' },
    mediaMes: 0.17, desvio: '+5,9%',
    historico: [0.16, 0.17, 0.17, 0.17, 0.18, 0.18, 0.18],
    limiteOp: '-',
    conexoes: { montante: ['eb-pocos-taiba'], jusante: [] }
  },
  {
    id: 'arcelormittal', nome: 'ArcelorMittal', tipo: 'usuario', trecho: 7,
    status: 'normal', icone: '🏭',
    indicadorPrincipal: { valor: 0.09, unidade: 'm³/s', label: 'Consumo Atual' },
    metricas: { 'Tipo': 'Indústria', 'Média mês': '0,09 m³/s', 'Tendência': '→', 'Contrato': 'ativo' },
    mediaMes: 0.09, desvio: '0,0%',
    historico: [0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09],
    limiteOp: '-',
    conexoes: { montante: ['rap-pecem'], jusante: [] }
  },
  {
    id: 'eneva', nome: 'ENEVA', tipo: 'usuario', trecho: 7,
    status: 'normal', icone: '⚡',
    indicadorPrincipal: { valor: 0.14, unidade: 'm³/s', label: 'Consumo Atual' },
    metricas: { 'Tipo': 'Indústria', 'Média mês': '0,13 m³/s', 'Tendência': '↑', 'Contrato': 'ativo' },
    mediaMes: 0.13, desvio: '+7,7%',
    historico: [0.12, 0.13, 0.13, 0.13, 0.14, 0.14, 0.14],
    limiteOp: '-',
    conexoes: { montante: ['rap-pecem'], jusante: [] }
  },
  {
    id: 'gerdau', nome: 'GERDAU (Silat)', tipo: 'usuario', trecho: 7,
    status: 'normal', icone: '🏭',
    indicadorPrincipal: { valor: 0.07, unidade: 'm³/s', label: 'Consumo Atual' },
    metricas: { 'Tipo': 'Indústria', 'Média mês': '0,07 m³/s', 'Tendência': '→', 'Contrato': 'ativo' },
    mediaMes: 0.07, desvio: '0,0%',
    historico: [0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07],
    limiteOp: '-',
    conexoes: { montante: ['rap-pecem'], jusante: [] }
  },
  {
    id: 'marisol', nome: 'Marisol / Heineken', tipo: 'usuario', trecho: 6,
    status: 'normal', icone: '🏭',
    indicadorPrincipal: { valor: 0.06, unidade: 'm³/s', label: 'Consumo Atual' },
    metricas: { 'Tipo': 'Indústria', 'Média mês': '0,06 m³/s', 'Tendência': '→', 'Contrato': 'ativo' },
    mediaMes: 0.06, desvio: '0,0%',
    historico: [0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06],
    limiteOp: '-',
    conexoes: { montante: ['acude-pacajus'], jusante: [] }
  },
  {
    id: 'distar', nome: 'DISTAR (Tabuleiro Russas)', tipo: 'usuario', trecho: 4,
    status: 'normal', icone: '🌾',
    indicadorPrincipal: { valor: 0.95, unidade: 'm³/s', label: 'Vazão Entregue' },
    metricas: { 'Tipo': 'Irrigação', 'Média mês': '0,92 m³/s', 'Tendência': '↑', 'Contrato': 'ativo' },
    mediaMes: 0.92, desvio: '+3,3%',
    historico: [0.90, 0.91, 0.92, 0.93, 0.94, 0.95, 0.95],
    limiteOp: '-',
    conexoes: { montante: ['canal-trabalhador'], jusante: [] }
  }
];

// ─────────────────────────────────────────────────────────
// ALERTAS
// ─────────────────────────────────────────────────────────
const ALERTAS = [
  {
    id: 'a1', ativo: 'eb-castanhao', nome: 'EB Castanhão',
    severidade: 'atencao', icone: '⚠️',
    descricao: 'Motobomba MB-4 indisponível. Vazão 12,4% abaixo da média.',
    trecho: 'Castanhão + Eixão I', hora: '05:42',
    acao: 'Verificar disponibilidade da MB-4 para retorno à operação.'
  },
  {
    id: 'a2', ativo: 'acude-riachaoo', nome: 'Açude Riachão',
    severidade: 'atencao', icone: '💧',
    descricao: 'Volume abaixo de 40%. Tendência de queda contínua.',
    trecho: 'Pacoti / Riachão / Gavião', hora: '07:00',
    acao: 'Monitorar variação diária. Acionar comportas se necessário.'
  },
  {
    id: 'a3', ativo: 'eixao-1', nome: 'Eixão — Trecho I',
    severidade: 'atencao', icone: '〰️',
    descricao: 'Vazão 12,6% abaixo da média mensal. Reflexo da EB Castanhão.',
    trecho: 'Castanhão + Eixão I', hora: '05:45',
    acao: 'Recompor operação da EB Castanhão para normalizar Trecho I.'
  }
];

// ─────────────────────────────────────────────────────────
// TRECHOS (meta)
// ─────────────────────────────────────────────────────────
const TRECHOS = [
  {
    id: 1, nome: 'PISF / Jati',
    subtitulo: 'Ponto de entrada das águas do Rio São Francisco',
    cor: '#7C3AED',
    entrada: { val: '3,20', unit: 'm³/s', label: 'PISF Eixo Norte' },
    saida:   { val: '3,20', unit: 'm³/s', label: 'Para CAC' },
    perda:   { val: '0,00', label: 'Perda estimada' },
    alertas: 0,
    ativos: ['jati', 'pisf-norte'],
    sinotico: '[PISF Eixo Norte] → [Barragem Jati] → [CAC]'
  },
  {
    id: 2, nome: 'CAC + Rios',
    subtitulo: 'Cinturão das Águas e calhas naturais até Castanhão',
    cor: '#0891B2',
    entrada: { val: '3,20', unit: 'm³/s', label: 'Do PISF' },
    saida:   { val: '6,50', unit: 'm³/s', label: 'Rio Jaguaribe' },
    perda:   { val: '0,12', label: 'm³/s (infiltração)' },
    alertas: 0,
    ativos: ['cac', 'rio-salgado', 'rio-jaguaribe', 'acude-lima-campos'],
    sinotico: '[CAC] → [Rio Salgado] → [Rio Jaguaribe] → [Lima Campos] → [Castanhão]'
  },
  {
    id: 3, nome: 'Castanhão + Eixão I',
    subtitulo: 'Principal reservatório e início da transferência artificial',
    cor: '#D97706',
    entrada: { val: '6,50', unit: 'm³/s', label: 'Rio Jaguaribe' },
    saida:   { val: '7,65', unit: 'm³/s', label: 'Eixão Trecho I' },
    perda:   { val: '1,84', label: 'm³/s (evap. Castanhão)' },
    alertas: 2,
    ativos: ['castanhao', 'eb-castanhao', 'eixao-1', 'acude-curral-velho', 'fapija'],
    sinotico: '[Castanhão] → [EB Castanhão] → [Eixão I] → [Curral Velho]'
  },
  {
    id: 4, nome: 'Eixão II + III',
    subtitulo: 'Segmento de transposição intermediário até região de Pacajus',
    cor: '#059669',
    entrada: { val: '7,65', unit: 'm³/s', label: 'Eixão Trecho I' },
    saida:   { val: '7,48', unit: 'm³/s', label: 'Eixão Trecho III' },
    perda:   { val: '0,12', label: 'm³/s (perdas no trecho)' },
    alertas: 1,
    ativos: ['eb-itaicaba', 'eixao-2', 'eb-piranji', 'eb-umburanas', 'canal-trabalhador', 'eixao-3', 'distar'],
    sinotico: '[Eixão I] → [EB Itaiçaba] → [Eixão II] → [EB Piranji] → [Eixão III] → [Canal do Trabalhador]'
  },
  {
    id: 5, nome: 'Pacoti / Riachão / Gavião',
    subtitulo: 'Sistema de açudes integrados da RMF — armazenamento estratégico',
    cor: '#DC2626',
    entrada: { val: '7,50', unit: 'm³/s', label: 'Canal do Trabalhador' },
    saida:   { val: '9,66', unit: 'm³/s', label: 'ETAs Gavião + Oeste' },
    perda:   { val: '0,84', label: 'm³/s (evap. + perdas)' },
    alertas: 1,
    ativos: ['acude-pacajus', 'acude-pacoti', 'acude-riachaoo', 'acude-gaviao', 'eb-erere', 'acude-banabuiu', 'eb-banabuiu'],
    sinotico: '[Pacoti] → [Riachão] → [Gavião] → [ETA Gavião] [ETA Oeste]'
  },
  {
    id: 6, nome: 'ETAs + RMF',
    subtitulo: 'Potabilização e entrega à Região Metropolitana de Fortaleza',
    cor: '#1D4ED8',
    entrada: { val: '9,66', unit: 'm³/s', label: 'Sistema Gavião' },
    saida:   { val: '9,66', unit: 'm³/s', label: 'RMF Abastecimento' },
    perda:   { val: '0,00', label: 'Perdas no tratamento' },
    alertas: 0,
    ativos: ['eta-gaviao', 'eta-oeste', 'eta-maranguape', 'eta-catuana', 'acude-maranguapinho', 'rmf', 'marisol'],
    sinotico: '[ETA Gavião] [ETA Oeste] [ETA Maranguape] [ETA Catuana] → [RMF]'
  },
  {
    id: 7, nome: 'Pecém + Industriais',
    subtitulo: 'Abastecimento do Complexo Industrial e Portuário do Pecém',
    cor: '#374151',
    entrada: { val: '1,85', unit: 'm³/s', label: 'Eixão Trecho IV' },
    saida:   { val: '0,48', unit: 'm³/s', label: 'Usuários Industriais' },
    perda:   { val: '0,06', label: 'm³/s (perdas)' },
    alertas: 0,
    ativos: ['eixao-4', 'eixao-5', 'rap-pecem', 'eb-pecem', 'eb-pocos-taiba', 'edp', 'arcelormittal', 'eneva', 'gerdau'],
    sinotico: '[Eixão V] → [RAP Pecém] → [EB Poços da Taíba] → [EDP] [ArcelorMittal] [ENEVA] [GERDAU]'
  }
];

// ─────────────────────────────────────────────────────────
// TENDÊNCIA 7 DIAS — SISTEMA TOTAL
// ─────────────────────────────────────────────────────────
const TENDENCIA_7D = {
  labels: ['25/03', '26/03', '27/03', '28/03', '29/03', '30/03', '31/03'],
  vazaoTotal:   [19.2, 19.0, 18.8, 18.6, 18.5, 18.4, 18.4],
  etasSomadas:  [9.72, 9.68, 9.65, 9.64, 9.63, 9.65, 9.66],
  volumeMedio:  [63.8, 63.5, 63.2, 62.9, 62.7, 62.5, 62.4]
};

// ─────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────
function getAtivo(id) {
  return ATIVOS.find(a => a.id === id);
}
function getAtivosPorTipo(tipo) {
  return ATIVOS.filter(a => a.tipo === tipo);
}
function getAtivosPorTrecho(trecho) {
  return ATIVOS.filter(a => a.trecho === trecho);
}
function getAtivosComAlerta() {
  return ATIVOS.filter(a => a.status === 'atencao' || a.status === 'critico');
}
function statusColor(status) {
  const m = { normal: '#059669', atencao: '#D97706', critico: '#DC2626', inativo: '#6B7280' };
  return m[status] || m.inativo;
}
function statusLabel(status) {
  const m = { normal: 'Normal', atencao: 'Atenção', critico: 'Crítico', inativo: 'Inativo' };
  return m[status] || 'Inativo';
}
function tipoLabel(tipo) {
  const m = { acude: '💧 Açude', eb: '⚙️ Estação de Bombeamento', ee: '⚙️ Estação Elevatória', eta: '🔬 ETA', canal: '〰️ Canal/Eixão', rio: '🌊 Rio', usuario: '◆ Usuário', barragem: '🏗️ Barragem' };
  return m[tipo] || tipo;
}
