# Dashboard de Monitoramento Operacional — Jati → Pecém

## Sistema Hídrico Jaguaribe — RMF

### Descrição
Protótipo de dashboard web para monitoramento operacional do sistema de transferência hídrica do estado do Ceará, acompanhando o macrofluxo do **PISF/Barragem Jati** até o **Complexo Industrial e Portuário do Pecém (CIPP)** e a **Região Metropolitana de Fortaleza (RMF)**.

---
## Funcionalidades Implementadas
### Navegação em 4 Níveis
- **Nível 0 — Home Executiva**: Visão geral, principais KPIs de vazão e alertas rápidos.
- **Nível 1 — Mapa Sinótico Geral**: Representação macro de todo o sistema Jati -> Pecém.
- **Nível 2 — Visão por Macrotrecho**: Fragmentação da visualização em 7 grandes eixos.
- **Nível 3 — Detalhe do Ativo**: Informações granulares para reservatórios, estações de bombeamento e ETAs.

## Estrutura do Projeto
- `index.html`: Layout e estruturação das visualizações.
- `css/style.css`: Sistema de design escuro, responsividade e layout (`grid`, `flex`).
- `js/data.js`: Dados simulados da operação para representação de estado.
- `js/app.js`: Interatividade DOM, rotas simuladas, manipulação do sidebar e instanciação do Chart.js.

## Executando o Projeto
Basta abrir o arquivo `index.html` em qualquer navegador web moderno.
Nenhuma dependência complexa de backend ou processo de build (`npm`) é necessário.
O projeto utiliza `Chart.js` e `FontAwesome` via CDN.
