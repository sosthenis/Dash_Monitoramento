// ============================================================
// APP.JS — Lógica principal do Dashboard Jati → Pecém
// ============================================================

let currentView = 'home';
let currentTrecho = 1;

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSidebarToggle();
  initCharts();
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
