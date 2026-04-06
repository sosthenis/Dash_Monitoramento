/* ==============================
   RESET & BASE
============================== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:         #0F172A;
  --surface:    #1E293B;
  --surface-hover: #334155;
  --border:     #334155;
  --text:       #F8FAFC;
  --text-sec:   #CBD5E1;
  --text-muted: #94A3B8;

  --blue:       #3B82F6;
  --blue-l:     #60A5FA;
  --blue-xl:    #EFF6FF;
  --green:      #10B981;
  --green-l:    #34D399;
  --amber:      #F59E0B;
  --amber-l:    #FBBF24;
  --red:        #EF4444;
  --red-l:      #F87171;
  --gray:       #64748B;
  --gray-l:     #94A3B8;
  --purple:     #8B5CF6;
  --purple-l:   #A78BFA;

  --sidebar-w:  260px;
  --topbar-h:   70px;
  --radius:     12px;
  --shadow:     0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.26);
}

html, body { 
  height: 100%; 
  font-family: 'Inter', sans-serif; 
  font-size: 14px; 
  color: var(--text); 
  background: var(--bg); 
  overflow: hidden; 
  display: flex;
}

/* ==============================
   LAYOUT
============================== */
.sidebar {
  width: var(--sidebar-w);
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  z-index: 100;
}

.sidebar-header {
  height: var(--topbar-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid var(--border);
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--blue), var(--purple));
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.logo-title {
  display: block;
  font-weight: 700;
  font-size: 1rem;
}

.logo-sub {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.sidebar-toggle {
  background: none;
  border: none;
  color: var(--text-sec);
  cursor: pointer;
  font-size: 1.2rem;
}

.nav-menu {
  list-style: none;
  padding: 20px 10px;
  flex: 1;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  color: var(--text-sec);
  transition: all 0.2s;
  margin-bottom: 4px;
  position: relative;
}

.nav-item:hover, .nav-item.active {
  background: var(--surface-hover);
  color: var(--blue-l);
}

.nav-item.active {
  background: rgba(59, 130, 246, 0.1);
  border-left: 3px solid var(--blue);
}

.badge {
  background: var(--red);
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 10px;
  position: absolute;
  right: 16px;
  font-weight: 600;
}

.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--border);
  font-size: 0.8rem;
  color: var(--text-muted);
}

.update-dot {
  color: var(--green);
  font-size: 0.5rem;
  margin-right: 6px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}

/* ==============================
   MAIN CONTENT
============================== */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.topbar {
  height: var(--topbar-h);
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
}

.breadcrumb {
  font-weight: 600;
  font-size: 1.1rem;
}

.topbar-filters {
  display: flex;
  gap: 12px;
  align-items: center;
}

.filter-select {
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
}

.search-box {
  position: relative;
}

.search-box input {
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 8px 12px 8px 36px;
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  width: 200px;
}

.search-box i {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
}

.date-display {
  text-align: right;
  display: flex;
  flex-direction: column;
}

.date-display span {
  font-weight: 600;
}

.ref-date {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 400 !important;
}

/* ==============================
   VIEWS
============================== */
.view-container {
  flex: 1;
  overflow-y: auto;
  padding: 30px;
}

.view {
  display: none;
  animation: fadeIn 0.4s ease;
}

.view.active {
  display: block;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.view-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.view-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-badge.atencao { background: rgba(245, 158, 11, 0.15); color: var(--amber-l); }
.status-badge.normal { background: rgba(16, 185, 129, 0.15); color: var(--green-l); }
.status-badge.critico { background: rgba(239, 68, 68, 0.15); color: var(--red-l); }

/* ==============================
   CARDS & GRID
============================== */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.kpi-card {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  transition: transform 0.2s;
}

.kpi-card:hover {
  transform: translateY(-2px);
  border-color: var(--blue);
}

.kpi-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  flex-shrink: 0;
}

.kpi-icon.blue { background: linear-gradient(135deg, var(--blue), #2563EB); }
.kpi-icon.green { background: linear-gradient(135deg, var(--green), #059669); }
.kpi-icon.amber { background: linear-gradient(135deg, var(--amber), #D97706); }
.kpi-icon.red { background: linear-gradient(135deg, var(--red), #DC2626); }
.kpi-icon.purple { background: linear-gradient(135deg, var(--purple), #6D28D9); }

.kpi-data {
  display: flex;
  flex-direction: column;
}

.kpi-value {
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 1.2;
}

.kpi-unit {
  font-size: 0.85rem;
  color: var(--text-sec);
  margin-left: 4px;
}

.kpi-label {
  font-size: 0.9rem;
  color: var(--text-sec);
  margin: 4px 0 8px;
}

.kpi-trend {
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}
.kpi-trend.up { color: var(--green-l); }
.kpi-trend.down { color: var(--red-l); }
.kpi-trend.stable { color: var(--gray-l); }

/* ==============================
   HOME BOTTOM PANELS
============================== */
.home-bottom {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.mini-sinotico-panel, .side-panels {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.mini-sinotico-panel {
  background: var(--surface);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  padding: 20px;
  box-shadow: var(--shadow);
}

.mini-sinotico-panel h3, .panel-section h3 {
  font-size: 1.1rem;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-link {
  background: none;
  border: none;
  color: var(--blue-l);
  cursor: pointer;
  text-align: right;
  margin-top: auto;
  font-weight: 600;
}

.panel-section {
  background: var(--surface);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  padding: 20px;
  box-shadow: var(--shadow);
}

.alert-list, .desvio-list {
  list-style: none;
  font-size: 0.9rem;
}

.alert-list li, .desvio-list li {
  padding: 10px 0;
  border-bottom: 1px dashed var(--border);
}

.alert-list li:last-child, .desvio-list li:last-child {
  border-bottom: none;
}

.chart-mini-container {
  height: 150px;
  position: relative;
}

/* Utilities */
.red-text { color: var(--red-l); }
.purple-text { color: var(--purple-l); }

/* FLUXOGRAMA MINI */
.fluxo-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-bottom: 10px;
}
.fluxo-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 90px;
}
.fluxo-box {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid var(--blue);
  color: var(--blue-l);
  padding: 8px 6px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.85rem;
  text-align: center;
  width: 100%;
}
.fluxo-val {
  font-size: 0.75rem;
  color: var(--text-sec);
  margin-top: 6px;
}
.fluxo-arrow {
  color: var(--blue);
  font-size: 1rem;
}

/* PROGRESS BAR DE DESVIOS */
.desvio-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.desvio-name {
  width: 120px;
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-sec);
}
.desvio-bar-container {
  flex: 1;
  height: 6px;
  background: var(--surface-hover);
  border-radius: 4px;
  margin: 0 10px;
}
.desvio-bar {
  height: 100%;
  border-radius: 4px;
  background: var(--red-l);
}
.desvio-val {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--red-l);
  width: 50px;
  text-align: right;
}
