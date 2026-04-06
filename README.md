# Dashboard de Monitoramento Operacional — Jati → Pecém
## Sistema Hídrico Jaguaribe — RMF

### Descrição
Protótipo de dashboard web para monitoramento operacional do sistema de transferência hídrica do estado do Ceará, acompanhando o macrofluxo do **PISF/Barragem Jati** até o **Complexo Industrial e Portuário do Pecém (CIPP)** e a **Região Metropolitana de Fortaleza (RMF)**.

---

## Funcionalidades Implementadas

### Navegação em 4 Níveis
- **Nível 0 — Home Executiva**: KPIs gerais, mini sinótico, alertas críticos, top desvios, tendência 7 dias
- **Nível 1 — Mapa Sinótico Geral**: Visualização completa do fluxo Jati → Pecém, painel lateral de detalhe
- **Nível 2 — Visão por Macrotrecho**: 7 abas de trechos operacionais com cards, KPIs e sinótico simplificado
- **Nível 3 — Detalhe do Ativo**: Modal completo com gráfico de tendência, métricas, conexões e ações

### Telas e Seções
- **Visão Geral (Home)**: 6 KPIs executivos, mini sinótico clicável, alertas, desvios, gráfico de tendência
- **Mapa do Sistema**: Sinótico completo com filtros laterais e painel contextual
- **Trechos (7 abas)**: PISF/Jati, CAC+Rios, Castanhão+Eixão I, Eixão II+III, Pacoti/Riachão/Gavião, ETAs+RMF, Pecém+Industriais
- **Reservatórios**: Cards de todos os açudes monitorados
- **Bombeamento**: Cards de todas as EBs/EEs com status de bombas
- **ETAs**: Cards das Estações de Tratamento
- **Usuários**: Industriais, irrigação e abastecimento humano
- **Alertas**: Central de alertas com resumo e lista detalhada
- **Histórico**: Gráfico temporal com seleção de ativo e indicador

---

## Ativos Cadastrados

| Tipo | Quantidade |
|------|-----------|
| Açudes | 9 |
| EBs/EEs | 10 |
| ETAs | 4 |
| Canais/Eixões | 7 |
| Rios | 2 |
| Usuários | 8 |
| Barragens | 2 |

---

## Macrofluxo Implementado

```
PISF/Barragem Jati
    → Cinturão das Águas (CAC) — 53 km
    → Rio Salgado / Rio Jaguaribe
    → Açude Lima Campos
    → Açude Castanhão (6.700 hm³)
    → EB Castanhão → Eixão Trecho I
    → Açude Curral Velho
    → EB Itaiçaba → Eixão Trecho II
    → EB Piranji → Eixão Trecho III
    → Canal do Trabalhador
    → Açude Pacoti → Riachão → Gavião
    ├→ ETA Gavião + ETA Oeste → RMF
    ├→ ETA Maranguape / ETA Catuana
    └→ Eixão IV → Eixão V → RAP Pecém
       → EDP / ArcelorMittal / ENEVA / GERDAU
```

---

## Paleta de Cores
- `#1D4ED8` Azul — fluxo principal
- `#059669` Verde — status normal
- `#D97706` Âmbar — atenção
- `#DC2626` Vermelho — crítico
- `#6B7280` Cinza — inativo
- `#7C3AED` Roxo — análise histórica

---

## Estrutura de Arquivos

```
index.html          — Estrutura principal
css/style.css       — Estilos completos (paleta, layout, cards, modal)
js/data.js          — Dados simulados de todos os ativos
js/app.js           — Lógica de navegação, renderização, gráficos e modal
README.md           — Documentação
```

---

## Funcionalidades Não Implementadas (próximos passos)

1. **Integração com fonte real de dados** (API, banco, CSV diário)
2. **Atualização automática** dos valores em tempo real ou a cada X minutos
3. **Sistema de autenticação** para operadores e gestores
4. **Exportação** de relatórios PDF/Excel
5. **Comparação entre dias/períodos**
6. **Mapa geográfico** com camada GIS sobre o estado do Ceará
7. **Notificações push** para alertas críticos
8. **Log de eventos operacionais** editável
9. **Cadastro de ativos** via interface (Admin)
10. **Upload diário do PDF** com extração automática de dados

---

## Como Desenvolver

### Adicionar novo ativo
No arquivo `js/data.js`, adicione um objeto ao array `ATIVOS` seguindo a estrutura:
```js
{
  id: 'id-unico', nome: 'Nome do Ativo', tipo: 'acude|eb|eta|canal|rio|usuario|barragem',
  trecho: 1-7, status: 'normal|atencao|critico|inativo', icone: '💧',
  indicadorPrincipal: { valor: 0.0, unidade: 'm³/s', label: 'Label' },
  metricas: { 'Campo': 'valor' }, mediaMes: 0.0, desvio: '0,0%',
  historico: [7 valores], limiteOp: 'Descrição limite',
  conexoes: { montante: ['ids'], jusante: ['ids'] }
}
```

### Atualizar valores diários
Edite os valores em `js/data.js` > array `ATIVOS`, campo `indicadorPrincipal.valor` e `metricas`, além de `DATA_REF` no topo.

---

## Referência de Dados
- **Documento base**: Monitoramento Operacional — Sistema de Transferência Hídrica Jaguaribe-RMF
- **Data de referência**: 31/03/2026
- **Data ref. vazão média**: 01/02/2026
- **Fonte**: COGERH / Operação do Sistema Hídrico do Ceará
