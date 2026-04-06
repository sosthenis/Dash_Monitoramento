// ============================================================
// APP.JS — Lógica principal do Dashboard Jati → Pecém
// ============================================================

let currentView = 'home';
let currentTrecho = 1;
let selectedAtivoId = null;
let trendChartInstance = null;
let historicoChartInstance = null;
let modalChartInstance = null;

// ──────────────────────────────────────────
// INIT
// ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSidebarToggle();
  initSearchAndFilters();
  renderHome();
  renderMapa();
  renderReservatorios();
  renderBombeamento();
  renderETAs();
  renderUsuarios();
  renderAlertas();
  renderHistoricoOptions();
  renderTrechoContent(1);
  initTrechoTabs();
  setCurrentDate();
});

// ──────────────────────────────────────────
// DATA / HORA
// ──────────────────────────────────────────
function setCurrentDate() {
  const el = document.getElementById('currentDate');
  if (el) el.textContent = DATA_REF;
  const upEl = document.getElementById('lastUpdate');
  if (upEl) upEl.textContent = 'Atualizado ' + HORA_ATUALIZACAO;
}

// ──────────────────────────────────────────
// NAVEGAÇÃO
// ──────────────────────────────────────────
function initNavigation() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const view = item.dataset.view;
      if (view) navigateTo(view);
    });
  });
}

function navigateTo(viewName, subParam) {
  // Esconde todas as views
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  // Ativa a view alvo
  const target = document.getElementById('view-' + viewName);
  if (target) target.classList.add('active');

  // Atualiza nav
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  const navItem = document.querySelector(`.nav-item[data-view="${viewName}"]`);
  if (navItem) navItem.classList.add('active');

  currentView = viewName;

  // Breadcrumb
  updateBreadcrumb(viewName, subParam);

  // Ações específicas por view
  if (viewName === 'home') renderHome();
  if (viewName === 'trechos' && subParam) {
    renderTrechoContent(parseInt(subParam));
    document.querySelectorAll('.trecho-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.trecho == subParam);
    });
    currentTrecho = parseInt(subParam);
  }
  if (viewName === 'historico') initHistoricoChart();
}

function updateBreadcrumb(view, sub) {
  const labels = {
    home: 'Visão Geral', mapa: 'Mapa do Sistema', trechos: 'Trechos',
    reservatorios: 'Reservatórios', bombeamento: 'Bombeamento', etas: 'ETAs',
    usuarios: 'Usuários', alertas: 'Alertas', historico: 'Histórico'
  };
  const bc = document.getElementById('breadcrumb');
  if (!bc) return;
  let html = `<span class="bc-link" onclick="navigateTo('home')">Início</span><span class="bc-sep">›</span><span>${labels[view] || view}</span>`;
  if (sub && view === 'trechos') {
    const t = TRECHOS.find(tr => tr.id == sub);
    if (t) html += `<span class="bc-sep">›</span><span>${t.nome}</span>`;
  }
  bc.innerHTML = html;
}

// ──────────────────────────────────────────
// SIDEBAR TOGGLE
// ──────────────────────────────────────────
function initSidebarToggle() {
  const btn = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('mainContent');
  if (!btn) return;
  btn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    main.classList.toggle('expanded');
  });
}

// ──────────────────────────────────────────
// SEARCH & FILTERS
// ──────────────────────────────────────────
function initSearchAndFilters() {
  const search = document.getElementById('searchInput');
  if (search) {
    search.addEventListener('input', e => {
      const q = e.target.value.toLowerCase();
      const match = ATIVOS.find(a => a.nome.toLowerCase().includes(q) && q.length > 2);
      if (match) {
        openModal(match.id);
      }
    });
  }
}

// ──────────────────────────────────────────
// HOME EXECUTIVA
// ──────────────────────────────────────────
function renderHome() {
  renderMiniSinotico();
  renderHomeAlertas();
  renderHomeDesvios();
  renderTrendChart();
}

function renderMiniSinotico() {
  const el = document.getElementById('miniSinotico');
  if (!el) return;

  const nodes = [
    { id: 'jati', label: 'Jati', val: '3,2 m³/s' },
    { id: 'cac', label: 'CAC', val: '53 km' },
    { id: 'castanhao', label: 'Castanhão', val: '68,7%' },
    { id: 'eixao-1', label: 'Eixão I', val: '7,65 m³/s' },
    { id: 'eixao-2', label: 'Eixão II', val: '7,55 m³/s' },
    { id: 'eixao-3', label: 'Eixão III', val: '7,48 m³/s' },
    { id: 'acude-pacoti', label: 'Pacoti/Riachão', val: '58,6%' },
    { id: 'acude-gaviao', label: 'Gavião', val: '62,4%' },
    { id: 'eta-gaviao', label: 'ETAs', val: '9,66 m³/s' },
    { id: 'eixao-5', label: 'Eixão V', val: '0,83 m³/s' },
    { id: 'rap-pecem', label: 'RAP Pecém', val: '77,4%' },
  ];

  // Linha horizontal
  let html = '<div style="display:flex;align-items:center;flex-wrap:wrap;gap:4px;padding:4px 0;">';
  nodes.forEach((n, i) => {
    const ativo = getAtivo(n.id);
    const st = ativo ? ativo.status : 'normal';
    html += `<div class="sn-node" onclick="openModal('${n.id}')">
      <div class="sn-box ${st}" title="${n.label}">${n.label}</div>
      <div class="sn-metric">${n.val}</div>
    </div>`;
    if (i < nodes.length - 1) {
      html += `<div class="sn-arrow"><i class="fa-solid fa-chevron-right"></i></div>`;
    }
  });
  html += '</div>';
  el.innerHTML = html;
}

function renderHomeAlertas() {
  const el = document.getElementById('homeAlertList');
  if (!el) return;
  if (ALERTAS.length === 0) {
    el.innerHTML = '<li style="font-size:11px;color:var(--text-muted)">Nenhum alerta ativo</li>';
    return;
  }
  el.innerHTML = ALERTAS.map(a => `
    <li class="alert-item" onclick="openModal('${a.ativo}')">
      <span class="ai-dot ${a.severidade === 'critico' ? 'red' : 'amber'}"></span>
      <span class="ai-name">${a.nome}</span>
      <span class="ai-desc">${a.hora}</span>
    </li>
  `).join('');
}

function renderHomeDesvios() {
  const el = document.getElementById('homeDesvioList');
  if (!el) return;
  const desvios = ATIVOS
    .filter(a => a.desvio && a.desvio !== '0,0%')
    .map(a => {
      const raw = parseFloat(a.desvio.replace('%','').replace('+','').replace(',','.'));
      return { ...a, desvioNum: raw };
    })
    .sort((a,b) => Math.abs(b.desvioNum) - Math.abs(a.desvioNum))
    .slice(0, 5);

  el.innerHTML = desvios.map(d => {
    const pct = Math.min(Math.abs(d.desvioNum), 15);
    const isNeg = d.desvioNum < 0;
    return `<li class="desvio-item" onclick="openModal('${d.id}')">
      <span style="font-size:10px;font-weight:600;min-width:90px;color:var(--text)">${d.nome.split(' ').slice(0,2).join(' ')}</span>
      <div class="desvio-bar"><div class="desvio-fill ${isNeg?'neg':'pos'}" style="width:${(pct/15)*100}%"></div></div>
      <span class="desvio-pct ${isNeg?'red-text':'green-text'}">${d.desvio}</span>
    </li>`;
  }).join('');
}

function renderTrendChart() {
  const canvas = document.getElementById('trendChart');
  if (!canvas) return;
  if (trendChartInstance) trendChartInstance.destroy();

  const ctx = canvas.getContext('2d');
  trendChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: TENDENCIA_7D.labels,
      datasets: [
        {
          label: 'Vazão Total',
          data: TENDENCIA_7D.vazaoTotal,
          borderColor: '#1D4ED8',
          backgroundColor: 'rgba(29,78,216,0.08)',
          tension: 0.4, fill: true, pointRadius: 2, borderWidth: 2
        },
        {
          label: 'ETAs',
          data: TENDENCIA_7D.etasSomadas,
          borderColor: '#059669',
          backgroundColor: 'transparent',
          tension: 0.4, fill: false, pointRadius: 2, borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { display: false },
        y: { display: false }
      }
    }
  });
}

// ──────────────────────────────────────────
// MAPA SINÓTICO COMPLETO
// ──────────────────────────────────────────
function renderMapa() {
  const el = document.getElementById('sinoticoFull');
  if (!el) return;

  const html = buildSinoticoHTML();
  el.innerHTML = html;

  // eventos de clique nos nós
  el.querySelectorAll('.sf-node').forEach(n => {
    n.addEventListener('click', () => {
      const id = n.dataset.id;
      if (!id) return;
      el.querySelectorAll('.sf-node').forEach(x => x.classList.remove('selected'));
      n.classList.add('selected');
      selectedAtivoId = id;
      renderDetailPanel(id);
    });
  });
}

function buildSinoticoHTML() {
  function node(id, showDetail) {
    const a = getAtivo(id);
    if (!a) return '';
    const iconeMap = { acude: '💧', eb: '⚙️', ee: '⚙️', eta: '🔬', canal: '〰️', rio: '🌊', usuario: '◆', barragem: '🏗️' };
    const ic = iconeMap[a.tipo] || '●';
    const val = a.indicadorPrincipal.valor + ' ' + a.indicadorPrincipal.unidade;
    return `<div class="sf-node" data-id="${id}">
      <div class="sf-box ${a.status}">
        <div class="sf-box-icon">${ic}</div>
        <div class="sf-box-name">${a.nome.replace('Açude ','').replace('Eixão — ','').replace(' — ','')}</div>
        ${showDetail !== false ? `<div class="sf-box-val">${val}</div>` : ''}
      </div>
    </div>`;
  }
  function arr() { return '<div class="sf-arrow-h"><i class="fa-solid fa-chevron-right"></i></div>'; }
  function arrDown() { return '<div class="sf-arrow-v" style="text-align:center;width:100%"><i class="fa-solid fa-chevron-down"></i></div>'; }
  function label(txt) { return `<div class="sf-section-label">${txt}</div>`; }

  return `<div class="sf-wrapper">
    ${label('ENTRADA — PISF / JATI')}
    <div class="sf-row">
      ${node('jati')} ${arr()} ${node('cac')} ${arr()} ${node('rio-salgado')} ${arr()} ${node('rio-jaguaribe')}
    </div>
    ${arrDown()}

    ${label('CASTANHÃO + EIXÃO I')}
    <div class="sf-row">
      ${node('castanhao')} ${arr()} ${node('eb-castanhao')} ${arr()} ${node('eixao-1')} ${arr()} ${node('acude-curral-velho')}
    </div>
    ${arrDown()}

    ${label('EIXÃO II + III')}
    <div class="sf-row">
      ${node('eb-itaicaba')} ${arr()} ${node('eixao-2')} ${arr()} ${node('eb-piranji')} ${arr()} ${node('eixao-3')} ${arr()} ${node('eb-umburanas')} ${arr()} ${node('canal-trabalhador')}
    </div>
    ${arrDown()}

    ${label('PACOTI → RIACHÃO → GAVIÃO')}
    <div class="sf-row">
      ${node('acude-pacajus')} ${arr()} ${node('acude-pacoti')} ${arr()} ${node('acude-riachaoo')} ${arr()} ${node('acude-gaviao')}
    </div>
    ${arrDown()}

    ${label('ETAs + RMF')}
    <div class="sf-row">
      ${node('eta-gaviao')} ${arr()} ${node('eta-oeste')} ${arr()} ${node('eta-maranguape')} ${arr()} ${node('eta-catuana')} ${arr()} ${node('rmf')}
    </div>
    ${arrDown()}

    ${label('EIXÃO IV/V + PECÉM INDUSTRIAL')}
    <div class="sf-row">
      ${node('eixao-4')} ${arr()} ${node('eixao-5')} ${arr()} ${node('rap-pecem')} ${arr()} ${node('eb-pecem')}
    </div>
    <div class="sf-row" style="margin-top:8px;">
      ${node('edp')} ${arr()} ${node('arcelormittal')} ${arr()} ${node('eneva')} ${arr()} ${node('gerdau')}
    </div>
  </div>`;
}

function renderDetailPanel(id) {
  const panel = document.getElementById('mapaDetailPanel');
  if (!panel) return;
  const a = getAtivo(id);
  if (!a) return;

  const desvioColor = (a.desvio && a.desvio.startsWith('-')) ? 'var(--red)' : 'var(--green)';

  panel.innerHTML = `
    <div class="dp-header">
      <div class="dp-type">${tipoLabel(a.tipo)}</div>
      <div class="dp-name">${a.nome}</div>
      <div class="dp-trecho">Trecho ${a.trecho} — ${TRECHOS.find(t=>t.id===a.trecho)?.nome || ''}</div>
    </div>
    <div class="dp-main">
      <div class="dp-val">${a.indicadorPrincipal.valor}</div>
      <div class="dp-unit">${a.indicadorPrincipal.unidade}</div>
      <div class="dp-label">${a.indicadorPrincipal.label}</div>
    </div>
    <div class="dp-metrics">
      ${Object.entries(a.metricas).slice(0,4).map(([k,v]) => `
        <div class="dp-metric">
          <div class="dp-metric-label">${k}</div>
          <div class="dp-metric-val">${v}</div>
        </div>
      `).join('')}
    </div>
    <div style="font-size:11px;margin-bottom:10px;">
      <span>Desvio vs. média mês: </span>
      <strong style="color:${desvioColor}">${a.desvio || 'N/D'}</strong>
    </div>
    <div style="font-size:10px;color:var(--text-muted);background:var(--bg);border-radius:6px;padding:8px;margin-bottom:10px;">
      <i class="fa-solid fa-circle-info" style="margin-right:4px;"></i>${a.limiteOp}
    </div>
    <button class="dp-btn" onclick="openModal('${id}')">
      <i class="fa-solid fa-expand"></i> Ver Detalhe Completo
    </button>
  `;
}

// ──────────────────────────────────────────
// TRECHOS
// ──────────────────────────────────────────
function initTrechoTabs() {
  document.querySelectorAll('.trecho-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.trecho-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const id = parseInt(tab.dataset.trecho);
      currentTrecho = id;
      renderTrechoContent(id);
    });
  });
}

function renderTrechoContent(trechoId) {
  const el = document.getElementById('trechoContent');
  if (!el) return;

  const trecho = TRECHOS.find(t => t.id === trechoId);
  if (!trecho) return;

  const ativos = trecho.ativos.map(id => getAtivo(id)).filter(Boolean);
  const alertCount = ativos.filter(a => a.status === 'atencao' || a.status === 'critico').length;

  el.innerHTML = `
    <div class="tc-header">
      <div class="tc-title" style="color:${trecho.cor}">${trecho.id}. ${trecho.nome}</div>
      <div class="tc-subtitle">${trecho.subtitulo}</div>
    </div>

    <div class="tc-kpis">
      <div class="tc-kpi" style="border-left:4px solid var(--blue)">
        <div class="tc-kpi-val">${trecho.entrada.val} <span class="tc-kpi-unit">${trecho.entrada.unit}</span></div>
        <div class="tc-kpi-label">↓ ${trecho.entrada.label}</div>
      </div>
      <div class="tc-kpi" style="border-left:4px solid var(--green)">
        <div class="tc-kpi-val">${trecho.saida.val} <span class="tc-kpi-unit">${trecho.saida.unit}</span></div>
        <div class="tc-kpi-label">↑ ${trecho.saida.label}</div>
      </div>
      <div class="tc-kpi" style="border-left:4px solid var(--amber)">
        <div class="tc-kpi-val">${trecho.perda.val}</div>
        <div class="tc-kpi-label">${trecho.perda.label}</div>
      </div>
      <div class="tc-kpi" style="border-left:4px solid ${alertCount > 0 ? 'var(--red)' : 'var(--green)'}">
        <div class="tc-kpi-val" style="color:${alertCount>0?'var(--red)':'var(--green)'}">${alertCount}</div>
        <div class="tc-kpi-label">Alertas no trecho</div>
      </div>
    </div>

    <div class="tc-sinotico">
      <h4><i class="fa-solid fa-diagram-project"></i> Fluxo do Trecho</h4>
      <div style="display:flex;align-items:center;flex-wrap:wrap;gap:6px;padding:4px 0;">
        ${renderTrechoSinotico(ativos)}
      </div>
    </div>

    <div class="cards-grid">
      ${ativos.map(a => buildAssetCard(a)).join('')}
    </div>
  `;

  // Click em cards
  el.querySelectorAll('.asset-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      if (id) openModal(id);
    });
  });
}

function renderTrechoSinotico(ativos) {
  return ativos.map((a, i) => {
    const ic = { acude: '💧', eb: '⚙️', ee: '⚙️', eta: '🔬', canal: '〰️', rio: '🌊', usuario: '◆', barragem: '🏗️' }[a.tipo] || '●';
    const val = a.indicadorPrincipal.valor + ' ' + a.indicadorPrincipal.unidade;
    return `<div class="sn-node" onclick="openModal('${a.id}')">
        <div class="sn-box ${a.status}">${ic} ${a.nome.replace('Açude ','').split(' ').slice(0,2).join(' ')}</div>
        <div class="sn-metric">${val}</div>
      </div>
      ${i < ativos.length - 1 ? '<div class="sn-arrow"><i class="fa-solid fa-chevron-right"></i></div>' : ''}`;
  }).join('');
}

// ──────────────────────────────────────────
// CARDS DE ATIVOS
// ──────────────────────────────────────────
function buildAssetCard(a) {
  const desvioClass = (a.desvio && a.desvio.startsWith('-')) ? 'down' : (a.desvio && a.desvio.startsWith('+')) ? 'up' : 'st';
  const desvioIcon = desvioClass === 'down' ? '↓' : desvioClass === 'up' ? '↑' : '→';

  let extraHTML = '';

  if (a.tipo === 'acude') {
    const pct = parseFloat(a.indicadorPrincipal.unidade === '%' ? a.indicadorPrincipal.valor : 50);
    const barColor = pct > 50 ? 'green' : pct > 25 ? 'amber' : 'red';
    extraHTML = `
      <div class="ac-progress">
        <div class="ac-progress-bar">
          <div class="ac-progress-fill ${barColor}" style="width:${pct}%"></div>
        </div>
        <div class="ac-progress-label"><span>0%</span><span>${pct}%</span><span>100%</span></div>
      </div>`;
  }

  if (a.bombas) {
    extraHTML += `<div class="ac-bombs">
      ${a.bombas.map(b => `<div class="bomb-dot ${b ? 'on' : 'off'}" title="${b ? 'Operando' : 'Parada'}"></div>`).join('')}
    </div>`;
  }

  return `
    <div class="asset-card ${a.status}" data-id="${a.id}">
      <div class="ac-header">
        <span class="ac-type">${a.icone}</span>
        <span class="ac-badge ${a.status}">${statusLabel(a.status)}</span>
      </div>
      <div class="ac-name">${a.nome}</div>
      <div>
        <span class="ac-main">${a.indicadorPrincipal.valor}</span>
        <span class="ac-unit">${a.indicadorPrincipal.unidade}</span>
      </div>
      <div class="ac-label">${a.indicadorPrincipal.label}</div>
      <div class="ac-metrics">
        ${Object.entries(a.metricas).slice(0,2).map(([k,v]) => `
          <div class="ac-metric">
            <div class="ac-metric-label">${k}</div>
            <div class="ac-metric-val">${v}</div>
          </div>
        `).join('')}
      </div>
      ${extraHTML}
      <div class="ac-trend ${desvioClass}">${desvioIcon} ${a.desvio} vs. média mês</div>
    </div>
  `;
}

function renderReservatorios() {
  const el = document.getElementById('reservCards');
  if (!el) return;
  const acudes = ATIVOS.filter(a => a.tipo === 'acude');
  el.innerHTML = acudes.map(a => buildAssetCard(a)).join('');
  el.querySelectorAll('.asset-card').forEach(c => {
    c.addEventListener('click', () => openModal(c.dataset.id));
  });
}

function renderBombeamento() {
  const el = document.getElementById('bombCards');
  if (!el) return;
  const ebs = ATIVOS.filter(a => a.tipo === 'eb' || a.tipo === 'ee');
  el.innerHTML = ebs.map(a => buildAssetCard(a)).join('');
  el.querySelectorAll('.asset-card').forEach(c => {
    c.addEventListener('click', () => openModal(c.dataset.id));
  });
}

function renderETAs() {
  const el = document.getElementById('etaCards');
  if (!el) return;
  const etas = ATIVOS.filter(a => a.tipo === 'eta');
  el.innerHTML = etas.map(a => buildAssetCard(a)).join('');
  el.querySelectorAll('.asset-card').forEach(c => {
    c.addEventListener('click', () => openModal(c.dataset.id));
  });
}

function renderUsuarios() {
  const el = document.getElementById('userCards');
  if (!el) return;
  const users = ATIVOS.filter(a => a.tipo === 'usuario');
  el.innerHTML = users.map(a => buildAssetCard(a)).join('');
  el.querySelectorAll('.asset-card').forEach(c => {
    c.addEventListener('click', () => openModal(c.dataset.id));
  });
}

// ──────────────────────────────────────────
// ALERTAS VIEW
// ──────────────────────────────────────────
function renderAlertas() {
  const el = document.getElementById('alertasContent');
  if (!el) return;
  const criticos = ALERTAS.filter(a => a.severidade === 'critico').length;
  const atencao = ALERTAS.filter(a => a.severidade === 'atencao').length;
  const normais = ATIVOS.filter(a => a.status === 'normal').length;

  el.innerHTML = `
    <div class="alertas-summary">
      <div class="alerta-stat">
        <div class="alerta-stat-val red">${criticos}</div>
        <div class="alerta-stat-label">Críticos</div>
      </div>
      <div class="alerta-stat">
        <div class="alerta-stat-val amber">${atencao}</div>
        <div class="alerta-stat-label">Atenção</div>
      </div>
      <div class="alerta-stat">
        <div class="alerta-stat-val green">${normais}</div>
        <div class="alerta-stat-label">Normais</div>
      </div>
    </div>
    <div class="alertas-list">
      ${ALERTAS.map(a => `
        <div class="alerta-item" onclick="openModal('${a.ativo}')">
          <div class="a-sev ${a.severidade}"></div>
          <div class="a-icon">${a.icone}</div>
          <div class="a-body">
            <div class="a-name">${a.nome}</div>
            <div class="a-desc">${a.descricao}</div>
            <div class="a-desc" style="margin-top:3px;font-style:italic;color:var(--amber)">→ ${a.acao}</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;">
            <div class="a-time">${a.hora}</div>
            <div class="a-trecho">${a.trecho}</div>
          </div>
        </div>
      `).join('')}
      ${ALERTAS.length === 0 ? '<p style="text-align:center;color:var(--text-muted);padding:30px 0;">Nenhum alerta ativo</p>' : ''}
    </div>
  `;
}

// ──────────────────────────────────────────
// HISTÓRICO VIEW
// ──────────────────────────────────────────
function renderHistoricoOptions() {
  const sel = document.getElementById('historicoAtivo');
  if (!sel) return;
  ATIVOS.forEach(a => {
    const opt = document.createElement('option');
    opt.value = a.id;
    opt.textContent = a.nome;
    sel.appendChild(opt);
  });
  sel.addEventListener('change', initHistoricoChart);
  document.getElementById('historicoIndicador')?.addEventListener('change', initHistoricoChart);
}

function initHistoricoChart() {
  const sel = document.getElementById('historicoAtivo');
  const ind = document.getElementById('historicoIndicador');
  if (!sel || !ind) return;

  const id = sel.value;
  if (!id) return;
  const ativo = getAtivo(id);
  if (!ativo) return;

  const canvas = document.getElementById('historicoChart');
  if (!canvas) return;
  if (historicoChartInstance) historicoChartInstance.destroy();

  const ctx = canvas.getContext('2d');
  historicoChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: TENDENCIA_7D.labels,
      datasets: [{
        label: `${ativo.nome} — ${ind.value}`,
        data: ativo.historico,
        borderColor: '#1D4ED8',
        backgroundColor: 'rgba(29,78,216,0.08)',
        tension: 0.4, fill: true, pointRadius: 5,
        pointBackgroundColor: '#1D4ED8', borderWidth: 2
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: true, labels: { font: { size: 12 } } },
        tooltip: { mode: 'index', intersect: false }
      },
      scales: {
        x: { grid: { color: '#F1F5F9' } },
        y: { grid: { color: '#F1F5F9' }, beginAtZero: false }
      }
    }
  });
}

// ──────────────────────────────────────────
// MODAL — DETALHE DO ATIVO
// ──────────────────────────────────────────
function openModal(id) {
  const a = getAtivo(id);
  if (!a) return;

  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  if (!overlay || !content) return;

  const desvioColor = (a.desvio && a.desvio.startsWith('-')) ? 'var(--red)' : 'var(--green)';
  const statusBadge = `<span class="status-badge ${a.status}" style="display:inline-flex">${statusLabel(a.status)}</span>`;
  const trechoInfo = TRECHOS.find(t => t.id === a.trecho);

  // Mini trend data
  const trendData = a.historico || [0,0,0,0,0,0,0];

  content.innerHTML = `
    <div class="modal-header">
      <div>
        <div class="modal-title">${a.icone} ${a.nome}</div>
        <div class="modal-subtitle">
          ${tipoLabel(a.tipo)} &nbsp;•&nbsp;
          Trecho ${a.trecho}: ${trechoInfo?.nome || ''}
          &nbsp;&nbsp;${statusBadge}
        </div>
      </div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>

    <div class="modal-kpis">
      <div class="modal-kpi">
        <div class="modal-kpi-val" style="color:var(--blue)">${a.indicadorPrincipal.valor}</div>
        <div class="modal-kpi-label">${a.indicadorPrincipal.unidade} — ${a.indicadorPrincipal.label}</div>
      </div>
      <div class="modal-kpi">
        <div class="modal-kpi-val">${a.mediaMes}</div>
        <div class="modal-kpi-label">Média do Mês</div>
      </div>
      <div class="modal-kpi">
        <div class="modal-kpi-val" style="color:${desvioColor}">${a.desvio}</div>
        <div class="modal-kpi-label">Desvio %</div>
      </div>
      <div class="modal-kpi">
        <div class="modal-kpi-val" style="color:${a.status==='normal'?'var(--green)':a.status==='atencao'?'var(--amber)':'var(--red)'}">${statusLabel(a.status)}</div>
        <div class="modal-kpi-label">Status</div>
      </div>
    </div>

    <div class="modal-chart-tabs">
      <button class="modal-chart-tab active">7 dias</button>
      <button class="modal-chart-tab">30 dias</button>
    </div>
    <div class="modal-chart-area">
      <canvas id="modalChart"></canvas>
    </div>

    <div class="modal-secondary">
      <div class="modal-info-box">
        <h5>Indicadores</h5>
        ${Object.entries(a.metricas).map(([k,v]) => `
          <div class="modal-info-row"><span>${k}</span><span>${v}</span></div>
        `).join('')}
      </div>
      <div class="modal-info-box">
        <h5>Operação</h5>
        <div class="modal-info-row"><span>Limite operacional</span><span>${a.limiteOp}</span></div>
        ${a.bombas ? `<div class="modal-info-row"><span>Bombas</span><span></span></div>
          <div class="ac-bombs" style="justify-content:flex-end;">
            ${a.bombas.map(b => `<div class="bomb-dot ${b?'on':'off'}" title="${b?'Operando':'Parada'}"></div>`).join('')}
          </div>` : ''}
        <div class="modal-info-row"><span>Ref. dados</span><span>${DATA_REF}</span></div>
        <div class="modal-info-row"><span>Ref. média</span><span>${DATA_MEDIA_REF}</span></div>
        ${a.conexoes?.montante?.length > 0 ? `<div class="modal-info-row"><span>A montante</span><span>${a.conexoes.montante.map(id => getAtivo(id)?.nome || id).join(', ')}</span></div>` : ''}
        ${a.conexoes?.jusante?.length > 0 ? `<div class="modal-info-row"><span>A jusante</span><span>${a.conexoes.jusante.map(id => getAtivo(id)?.nome || id).join(', ')}</span></div>` : ''}
      </div>
    </div>

    <div class="modal-actions">
      <button class="btn btn-primary" onclick="navigateTo('trechos','${a.trecho}');closeModal()">
        <i class="fa-solid fa-route"></i> Ver Trecho ${a.trecho}
      </button>
      <button class="btn btn-secondary" onclick="navigateTo('mapa');closeModal()">
        <i class="fa-solid fa-diagram-project"></i> Ver no Mapa
      </button>
      <button class="btn btn-secondary" onclick="navigateTo('historico');document.getElementById('historicoAtivo').value='${id}';initHistoricoChart();closeModal()">
        <i class="fa-solid fa-clock-rotate-left"></i> Histórico
      </button>
    </div>
  `;

  overlay.classList.add('open');

  // Render modal chart
  const mCanvas = document.getElementById('modalChart');
  if (mCanvas) {
    if (modalChartInstance) modalChartInstance.destroy();
    const ctx = mCanvas.getContext('2d');
    modalChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: TENDENCIA_7D.labels,
        datasets: [{
          label: a.indicadorPrincipal.label,
          data: trendData,
          borderColor: '#1D4ED8',
          backgroundColor: 'rgba(29,78,216,0.1)',
          tension: 0.4, fill: true, pointRadius: 4,
          pointBackgroundColor: '#1D4ED8', borderWidth: 2
        }, {
          label: 'Média do mês',
          data: Array(7).fill(a.mediaMes),
          borderColor: '#D97706',
          borderDash: [6,4],
          backgroundColor: 'transparent',
          tension: 0, fill: false, pointRadius: 0, borderWidth: 2
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: true, labels: { font: { size: 10 } } },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: {
          x: { grid: { color: '#F1F5F9' }, ticks: { font: { size: 10 } } },
          y: { grid: { color: '#F1F5F9' }, ticks: { font: { size: 10 } }, beginAtZero: false }
        }
      }
    });
  }

  // Chart tab switch
  content.querySelectorAll('.modal-chart-tab').forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      content.querySelectorAll('.modal-chart-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      // Se 30d, extrapola dados
      if (idx === 1 && modalChartInstance) {
        const extended30 = [];
        const labels30 = [];
        for (let i = 30; i >= 1; i--) {
          labels30.push(`D-${i}`);
          const base = trendData[0];
          extended30.push(+(base + (Math.random() - 0.48) * base * 0.05).toFixed(2));
        }
        modalChartInstance.data.labels = labels30;
        modalChartInstance.data.datasets[0].data = extended30;
        modalChartInstance.data.datasets[1].data = Array(30).fill(a.mediaMes);
        modalChartInstance.update();
      } else if (idx === 0 && modalChartInstance) {
        modalChartInstance.data.labels = TENDENCIA_7D.labels;
        modalChartInstance.data.datasets[0].data = trendData;
        modalChartInstance.data.datasets[1].data = Array(7).fill(a.mediaMes);
        modalChartInstance.update();
      }
    });
  });
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.classList.remove('open');
  if (modalChartInstance) { modalChartInstance.destroy(); modalChartInstance = null; }
}

// Fechar modal clicando no overlay
document.addEventListener('click', e => {
  if (e.target.id === 'modalOverlay') closeModal();
});

// ESC fecha modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ──────────────────────────────────────────
// BADGE ALERTAS
// ──────────────────────────────────────────
(function updateAlertBadge() {
  const badge = document.getElementById('alertBadge');
  if (badge) badge.textContent = ALERTAS.length;
})();
