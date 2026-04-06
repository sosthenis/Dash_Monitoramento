// ============================================================
// APP.JS — Lógica principal do Dashboard Jati → Pecém
// ============================================================

let currentView = 'home';
let currentTrecho = 1;

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSidebarToggle();
  initCharts();
  renderMiniSinotico();
  renderAlertas();
  renderDesvios();
});

function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const views = document.querySelectorAll('.view');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active from all nav items
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      
      const viewName = item.getAttribute('data-view');
      navigateTo(viewName);
    });
  });
}

function initSidebarToggle() {
  const toggleBtn = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  
  toggleBtn.addEventListener('click', () => {
    if (sidebar.style.width === '80px') {
      sidebar.style.width = '260px';
      document.querySelectorAll('.nav-item span, .logo-text').forEach(el => el.style.display = 'block');
    } else {
      sidebar.style.width = '80px';
      document.querySelectorAll('.nav-item span, .logo-text').forEach(el => el.style.display = 'none');
    }
  });
}

function navigateTo(viewName) {
  const views = document.querySelectorAll('.view');
  views.forEach(view => view.classList.remove('active'));
  
  const targetView = document.getElementById(`view-${viewName}`);
  if (targetView) targetView.classList.add('active');
  
  const breadcrumb = document.getElementById('breadcrumb');
  if (breadcrumb) {
    const activeNav = document.querySelector('.nav-item.active span');
    breadcrumb.innerHTML = `<span>${activeNav ? activeNav.textContent : viewName}</span>`;
  }
}

function initCharts() {
  const ctx = document.getElementById('trendChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: TENDENCIA_7D.labels,
      datasets: [{
        label: 'Vazão Total',
        data: TENDENCIA_7D.data,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { 
          grid: { display: false, color: '#334155' },
          ticks: { color: '#94A3B8', font: { size: 10 } }
        },
        y: { 
          grid: { color: '#334155' },
          ticks: { color: '#94A3B8', font: { size: 10 } }
        }
      }
    }
  });
}

function renderMiniSinotico() {
  const container = document.getElementById('miniSinotico');
  if (!container) return;
  
  const rows = [
    [
      { name: 'Jati', val: '3,2 m³/s' },
      { name: 'CAC', val: '53 km' },
      { name: 'Castanhão', val: '68,7%' },
      { name: 'Eixão I', val: '7,65 m³/s' },
      { name: 'Eixão II', val: '7,55 m³/s' },
      { name: 'Eixão III', val: '7,48 m³/s' }
    ],
    [
      { name: 'Pacoti/Riachão', val: '58,6%' },
      { name: 'Gavião', val: '62,4%' },
      { name: 'ETAs', val: '9,66 m³/s' },
      { name: 'Eixão V', val: '0,83 m³/s' },
      { name: 'RAP Pecém', val: '77,4%' }
    ]
  ];

  let html = '';
  rows.forEach(row => {
    html += '<div class="fluxo-row">';
    row.forEach((node, index) => {
      html += `
        <div class="fluxo-node">
          <div class="fluxo-box">${node.name}</div>
          <div class="fluxo-val">${node.val}</div>
        </div>
      `;
      if (index < row.length - 1) {
        html += '<div class="fluxo-arrow"><i class="fa-solid fa-chevron-right"></i></div>';
      }
    });
    html += '</div>';
  });
  container.innerHTML = html;
}

function renderAlertas() {
  const container = document.getElementById('homeAlertList');
  if (!container) return;
  
  const alertas = [
    { name: 'EB Castanhão', time: '05:42' },
    { name: 'Açude Riachão', time: '07:00' },
    { name: 'Eixão — Trecho I', time: '05:45' }
  ];
  
  let html = '';
  alertas.forEach(a => {
    html += `
      <li style="display:flex; justify-content:space-between; align-items:center;">
        <span><span style="color:var(--amber-l); font-size:0.6rem; margin-right:6px;">●</span> ${a.name}</span>
        <span style="color:var(--text-muted); font-size:0.85rem;">${a.time}</span>
      </li>
    `;
  });
  container.innerHTML = html;
}

function renderDesvios() {
  const container = document.getElementById('homeDesvioList');
  if (!container) return;
  
  const desvios = [
    { name: 'Eixão —', val: '-12,6%', w: '100%' },
    { name: 'EB Castanhão', val: '-12,4%', w: '98%' },
    { name: 'Eixão —', val: '-12,2%', w: '96%' },
    { name: 'Eixão —', val: '-12,2%', w: '96%' },
    { name: 'EB Itaiçaba', val: '-12,1%', w: '95%' }
  ];
  
  let html = '';
  desvios.forEach(d => {
    html += `
      <div class="desvio-item">
        <div class="desvio-name" title="${d.name}">${d.name}</div>
        <div class="desvio-bar-container">
          <div class="desvio-bar" style="width: ${d.w};"></div>
        </div>
        <div class="desvio-val">${d.val}</div>
      </div>
    `;
  });
  container.innerHTML = html;
}
