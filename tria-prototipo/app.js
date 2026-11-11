/* TRIA: protótipo navegável. Dados de exemplo, mantidos só em memória. */

const TODAY = new Date(2026, 9, 29); // quinta, 29 de outubro de 2026 (data fixa do protótipo)
const MESES = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
const MESES_LONGO = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
const DIAS = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];

const PEOPLE = {
  AP:'Ana Prado', RF:'Rafael', MA:'Marina', CL:'Clara', LI:'Lia', BR:'Bruno', PA:'Paula', DI:'Diego'
};
const PROFESSOR = { initials:'RL', name:'Prof. Ricardo Lima' };

const GROUPS = [
  { id:'aurora', name:'Portal Aurora', area:'Experiência e produto', members:['AP','RF','MA','CL','LI'], due:'2026-11-12',
    comments:[{by:'Prof. Ricardo Lima', text:'Lembrem de anexar os resultados dos testes com usuários no relatório.', when:'27 out'}] },
  { id:'conteudo', name:'Conteúdo & lançamento', area:'Narrativa e comunicação', members:['AP','BR','CL','PA'], due:'2026-11-10',
    comments:[] },
  { id:'operacoes', name:'Operações', area:'Rotina e organização', members:['AP','CL','DI'], due:'2026-11-12',
    comments:[] },
];

let uid = 0;
const T = (group, title, date, status, who, doneAt) =>
  ({ id:++uid, group, title, date, status, who, doneAt: doneAt || null, desc:'' });

const TASKS = [
  // Portal Aurora — 16 tarefas
  T('aurora','Revisar fluxos de cadastro','2026-10-27','andamento','RF'),
  T('aurora','Ajustar navegação do protótipo','2026-10-29','andamento','MA'),
  T('aurora','Revisar acessibilidade','2026-11-02','pendente','CL'),
  T('aurora','Testar protótipo com usuários','2026-11-03','pendente','LI'),
  T('aurora','Consolidar feedback dos testes','2026-11-05','pendente','RF'),
  T('aurora','Ajustar componentes visuais','2026-11-06','pendente','MA'),
  T('aurora','Documentar decisões de interface','2026-11-09','pendente','AP'),
  T('aurora','Preparar apresentação final','2026-11-11','pendente','AP'),
  T('aurora','Mapear jornadas principais','2026-10-29','concluida','LI','2026-10-29'),
  T('aurora','Definir personas','2026-10-14','concluida','RF','2026-10-13'),
  T('aurora','Levantar requisitos','2026-10-09','concluida','AP','2026-10-09'),
  T('aurora','Criar wireframes','2026-10-20','concluida','MA','2026-10-19'),
  T('aurora','Montar moodboard','2026-10-16','concluida','CL','2026-10-16'),
  T('aurora','Definir paleta de cores','2026-10-21','concluida','CL','2026-10-21'),
  T('aurora','Desenhar tela inicial','2026-10-24','concluida','MA','2026-10-23'),
  T('aurora','Organizar arquivos do projeto','2026-10-12','concluida','LI','2026-10-12'),
  // Conteúdo & lançamento — 12 tarefas
  T('conteudo','Validar texto da página inicial','2026-10-28','pendente','BR'),
  T('conteudo','Preparar newsletter de lançamento','2026-10-30','pendente','BR'),
  T('conteudo','Escrever perguntas frequentes','2026-11-04','pendente','PA'),
  T('conteudo','Revisar mensagens de erro','2026-11-05','andamento','CL'),
  T('conteudo','Agendar publicações','2026-11-07','pendente','PA'),
  T('conteudo','Revisar material final','2026-11-10','pendente','AP'),
  T('conteudo','Revisar tom de voz','2026-10-28','concluida','BR','2026-10-28'),
  T('conteudo','Definir mensagens-chave','2026-10-15','concluida','AP','2026-10-15'),
  T('conteudo','Criar calendário editorial','2026-10-19','concluida','PA','2026-10-18'),
  T('conteudo','Levantar referências','2026-10-08','concluida','CL','2026-10-08'),
  T('conteudo','Escrever apresentação do projeto','2026-10-22','concluida','BR','2026-10-22'),
  T('conteudo','Aprovar identidade verbal','2026-10-26','concluida','AP','2026-10-26'),
  // Operações — 8 tarefas
  T('operacoes','Atualizar cronograma','2026-10-31','andamento','DI'),
  T('operacoes','Organizar pasta compartilhada','2026-11-03','pendente','CL'),
  T('operacoes','Registrar ata da reunião','2026-11-06','pendente','DI'),
  T('operacoes','Fechar relatório do ciclo','2026-11-12','pendente','AP'),
  T('operacoes','Definir rituais da equipe','2026-10-28','concluida','CL','2026-10-28'),
  T('operacoes','Montar quadro de tarefas','2026-10-10','concluida','DI','2026-10-10'),
  T('operacoes','Combinar canais de comunicação','2026-10-07','concluida','AP','2026-10-07'),
  T('operacoes','Dividir responsabilidades','2026-10-06','concluida','CL','2026-10-06'),
];

/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const parse = s => { const [y,m,d] = s.split('-').map(Number); return new Date(y, m-1, d); };
const iso = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const TODAY_ISO = iso(TODAY);
const dayDiff = s => Math.round((parse(s) - TODAY) / 86400000);
const fmt = s => { const d = parse(s); return String(d.getDate()).padStart(2,'0') + ' ' + MESES[d.getMonth()]; };
const isDone = t => t.status === 'concluida';
const isLate = t => !isDone(t) && dayDiff(t.date) < 0;
const group = id => GROUPS.find(g => g.id === id);
const tasksOf = id => TASKS.filter(t => t.group === id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const initials = name => {
  const w = name.replace(/^Prof(a)?\.\s*/i, '').trim().split(/\s+/).filter(Boolean);
  if (!w.length) return '?';
  return (w.length === 1 ? w[0].slice(0, 2) : w[0][0] + w[w.length - 1][0]).toUpperCase();
};
const firstName = k => PEOPLE[k].split(' ')[0];
const avatar = k => `<span class="avatar" title="${esc(PEOPLE[k])}">${esc(initials(PEOPLE[k]))}</span>`;
const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
const plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`;

// semana atual: segunda a domingo
const WEEK_START = new Date(TODAY); WEEK_START.setDate(TODAY.getDate() - ((TODAY.getDay() + 6) % 7));
const WEEK_END = new Date(WEEK_START); WEEK_END.setDate(WEEK_START.getDate() + 6);
const inWeek = s => s >= iso(WEEK_START) && s <= iso(WEEK_END);

function relLabel(t) {
  if (isLate(t)) return 'Atrasada';
  const d = dayDiff(t.date);
  if (d === 0) return 'Hoje';
  if (d === 1) return 'Amanhã';
  return DIAS[parse(t.date).getDay()];
}
function chip(t) {
  if (t.status === 'concluida') return '<span class="chip con">Concluída</span>';
  if (t.status === 'andamento') return '<span class="chip and">Em andamento</span>';
  return '<span class="chip pen">Pendente</span>';
}
function stats() {
  const total = TASKS.length, done = TASKS.filter(isDone).length;
  const week = TASKS.filter(t => inWeek(t.date));
  const weekDone = week.filter(isDone).length;
  const doneThisWeek = TASKS.filter(t => isDone(t) && t.doneAt && inWeek(t.doneAt)).length;
  return { total, done, pending: total - done, late: TASKS.filter(isLate).length, pct: pct(done, total),
           weekTotal: week.length, weekDone, weekPct: pct(weekDone, week.length), doneThisWeek };
}
const ICON = {
  arrow:'<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  ext:'<svg viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9"/></svg>',
  check:'<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  plus:'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  back:'<svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
};

/* ---------- contas (salvas no navegador) ---------- */
const memStore = {};
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return memStore[k] ?? null; } },
  set(k, v) { memStore[k] = v; try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  del(k) { delete memStore[k]; try { localStorage.removeItem(k); } catch {} },
};
let ME = null;
const isProf = () => ME && ME.role === 'professor';

function applyUser() {
  if (isProf()) { PROFESSOR.name = ME.name; PEOPLE.AP = 'Ana Prado'; }
  else { PEOPLE.AP = ME.name; PROFESSOR.name = 'Prof. Ricardo Lima'; }
  $('#userAv').textContent = initials(ME.name);
  $('#userName').textContent = ME.name;
  $('#userMail').textContent = ME.email;
  $('#navProf').style.display = isProf() ? '' : 'none';
}

let authTab = 'criar';
function showAuth() {
  $('#app').classList.add('hidden');
  const a = $('#auth'); a.classList.add('open');
  a.innerHTML = `
  <div class="auth-side">
    <div class="brand"><span class="logo"><i></i><i></i><i></i></span>TRIA</div>
    <div>
      <h2>Organização de trabalhos em grupo</h2>
      <p>Tarefas, responsáveis e prazos dos grupos, com acompanhamento do professor.</p>
      <ul><li>Divisão de tarefas por integrante</li><li>Controle de prazos e atrasos</li><li>Painel do professor com recados aos grupos</li></ul>
    </div>
    <div class="side-version" style="margin:0">Protótipo acadêmico · UNIPÊ</div>
  </div>
  <div class="auth-form"><div class="auth-box">
    <div class="auth-tabs"><button data-auth="criar" class="${authTab === 'criar' ? 'active' : ''}">Criar conta</button><button data-auth="entrar" class="${authTab === 'entrar' ? 'active' : ''}">Entrar</button></div>
    ${authTab === 'criar' ? `
    <form id="signupForm">
      <label class="field">Nome completo<input name="name" required placeholder="Ex.: Victor Gabriel"></label>
      <label class="field">E-mail<input name="email" type="email" required placeholder="nome@email.com"></label>
      <label class="field">Senha<input name="pass" type="password" required minlength="4" placeholder="Mínimo de 4 caracteres"></label>
      <div class="field">Perfil<div class="roles">
        <label><input type="radio" name="role" value="aluno" checked> Aluno</label>
        <label><input type="radio" name="role" value="professor"> Professor</label></div></div>
      <div class="err" id="authErr"></div>
      <button class="btn btn-primary">Criar conta</button>
    </form>` : `
    <form id="loginForm">
      <label class="field">E-mail<input name="email" type="email" required></label>
      <label class="field">Senha<input name="pass" type="password" required></label>
      <div class="err" id="authErr"></div>
      <button class="btn btn-primary">Entrar</button>
    </form>`}
    <p class="hint">As contas ficam salvas apenas neste navegador.</p>
  </div></div>`;

  a.querySelectorAll('[data-auth]').forEach(b => b.onclick = () => { authTab = b.dataset.auth; showAuth(); });
  const su = $('#signupForm');
  if (su) su.onsubmit = e => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(su));
    const email = f.email.trim().toLowerCase();
    const accounts = store.get('tria_accounts') || [];
    if (accounts.some(x => x.email === email)) { $('#authErr').textContent = 'Já existe uma conta com esse e-mail. Use "Entrar".'; return; }
    const acc = { name: f.name.trim(), email, pass: f.pass, role: f.role };
    accounts.push(acc); store.set('tria_accounts', accounts);
    login(acc, true);
  };
  const li = $('#loginForm');
  if (li) li.onsubmit = e => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(li));
    const acc = (store.get('tria_accounts') || []).find(x => x.email === f.email.trim().toLowerCase());
    if (!acc || acc.pass !== f.pass) { $('#authErr').textContent = 'E-mail ou senha incorretos.'; return; }
    login(acc, false);
  };
}

function login(acc, isNew) {
  ME = acc; store.set('tria_session', acc.email);
  $('#auth').classList.remove('open'); $('#auth').innerHTML = '';
  $('#app').classList.remove('hidden');
  applyUser();
  const target = isProf() ? '#/professor' : '#/';
  if (location.hash === target) render(); else location.hash = target;
  toast(isNew ? `Conta criada. Bem-vindo(a), ${ME.name.split(' ')[0]}!` : `Bem-vindo(a) de volta, ${ME.name.split(' ')[0]}.`);
}
function logout() {
  ME = null; store.del('tria_session'); authTab = 'entrar';
  history.replaceState(null, '', location.pathname + location.search);
  showAuth();
}

/* ---------- componentes ---------- */
function taskRow(t) {
  const g = group(t.group);
  const cls = isLate(t) ? 'late' : dayDiff(t.date) === 0 ? 'today' : '';
  return `<div class="task ${isDone(t) ? 'done' : ''}" data-task="${t.id}">
    <div class="date ${cls}"><b>${fmt(t.date)}</b><small>${isDone(t) ? 'Entregue' : relLabel(t)}</small></div>
    <div><div class="t">${esc(t.title)}</div><div class="g">${esc(g.name)}</div></div>
    <div class="meta">${isLate(t) ? '<span class="chip atr">Atrasada</span>' : chip(t)}<span class="who">${avatar(t.who)} ${esc(firstName(t.who))}</span></div>
  </div>`;
}
function track(list) {
  const sorted = [...list].sort((a, b) => (isDone(b) - isDone(a)) || a.date.localeCompare(b.date));
  return `<div class="track">${sorted.map(t => `<i class="${isDone(t) ? 'c' : t.status === 'andamento' ? 'a' : ''}" title="${esc(t.title)}"></i>`).join('')}</div>`;
}
function groupCard(g) {
  const list = tasksOf(g.id), done = list.filter(isDone).length;
  return `<a class="group-card" href="#/grupos/${g.id}">
    <div class="gc-top"><b>${esc(g.name)}</b>${ICON.ext}</div>
    <div class="gc-sub"><span>${esc(g.area)}</span><span>${plural(g.members.length, 'membro', 'membros')}</span></div>
    ${track(list)}
    <div class="gc-foot"><span>${done} de ${list.length} concluídas</span><b>${pct(done, list.length)}%</b></div>
    <div class="gc-date">Entrega: ${fmt(g.due)}</div>
  </a>`;
}
const legend = `<div class="legend"><span><i class="c"></i>Concluída</span><span><i class="a"></i>Em andamento</span><span><i></i>Pendente</span></div>`;

/* ---------- telas ---------- */
let homeTab = 'proximas';

function viewHome() {
  const s = stats();
  const ring = `conic-gradient(var(--lime) ${s.pct * 3.6}deg, #2a3360 0)`;
  const open = TASKS.filter(t => !isDone(t)).sort((a, b) => a.date.localeCompare(b.date));
  const mine = open.filter(t => t.who === 'AP');
  const shown = homeTab === 'proximas' ? open.slice(0, 5) : homeTab === 'minhas' ? mine : open;
  const recent = TASKS.filter(isDone).sort((a, b) => (b.doneAt || '').localeCompare(a.doneAt || '')).slice(0, 3);
  const d = TODAY;
  const sub = isProf()
    ? `Resumo das tarefas dos ${GROUPS.length} grupos da turma.`
    : `Você tem ${plural(mine.length, 'tarefa', 'tarefas')} em aberto nos seus grupos.`;
  return `
  <div class="page-head">
    <div><div class="eyebrow">${DIAS[d.getDay()]}, ${d.getDate()} de ${MESES_LONGO[d.getMonth()]}</div>
      <h1>Olá, ${esc(ME.name.split(' ')[0])}</h1>
      <p class="sub">${sub}</p></div>
    <button class="btn btn-primary" data-action="new-task">${ICON.plus} Nova tarefa</button>
  </div>

  <div class="stats">
    <div class="card hero">
      <div><div class="eyebrow">Progresso geral</div>
        <div class="big">${s.pct}%</div><p>das tarefas concluídas</p>
        <span class="pill-lime">${plural(s.doneThisWeek, 'concluída', 'concluídas')} nesta semana</span></div>
      <div class="ring" style="background:${ring}"><div class="ring-in"><div><b>${s.done}</b> <small>/ ${s.total}</small></div></div></div>
    </div>
    <a class="card stat" href="#/tarefas?f=aberta">
      <div class="stat-ico" style="background:var(--yellow-soft)"><span style="width:10px;height:10px;border-radius:3px;border:2px solid var(--yellow)"></span></div>
      <div class="label">PENDENTES</div>
      <div class="row"><span class="num">${s.pending}</span><span class="arrow">${ICON.arrow}</span></div>
    </a>
    <a class="card stat" href="#/tarefas?f=concluida">
      <div class="stat-ico" style="background:var(--green-soft);color:var(--green)">${ICON.check}</div>
      <div class="label">CONCLUÍDAS</div>
      <div class="row"><span class="num">${s.done}</span><span class="arrow">${ICON.arrow}</span></div>
    </a>
  </div>

  ${s.late ? `<div class="alert"><div class="alert-ico"><i></i></div>
      <div><div class="eyebrow">Atenção</div>
      <h3>${plural(s.late, 'tarefa atrasada', 'tarefas atrasadas')}</h3>
      <p>O prazo já passou e ${s.late === 1 ? 'ela ainda não foi concluída' : 'elas ainda não foram concluídas'}.</p></div>
      <a class="btn btn-salmon" href="#/tarefas?f=atrasada">Ver atrasadas</a></div>`
    : `<div class="alert ok"><div class="alert-ico"><i style="background:#bff0d2"></i></div>
      <div><div class="eyebrow">Prazos</div><h3>Nenhuma tarefa atrasada</h3><p>Todas as tarefas estão dentro do prazo.</p></div></div>`}

  <div class="cols">
    <div>
      <div class="sec-head"><h2>Próximos prazos</h2>${s.late ? `<span class="late-tag">${plural(s.late, 'atrasada', 'atrasadas')}</span>` : ''}</div>
      <div class="tabs">
        <button class="tab ${homeTab === 'proximas' ? 'active' : ''}" data-tab="proximas">Próximas</button>
        ${isProf() ? '' : `<button class="tab ${homeTab === 'minhas' ? 'active' : ''}" data-tab="minhas">Minhas tarefas (${mine.length})</button>`}
        <button class="tab ${homeTab === 'todas' ? 'active' : ''}" data-tab="todas">Todas em aberto (${open.length})</button>
      </div>
      <div class="card list">${shown.map(taskRow).join('') || '<div class="empty">Nenhuma tarefa em aberto.</div>'}</div>

      <div class="sec-head" style="margin-top:28px"><h2>Concluídas recentemente</h2><a class="link" href="#/tarefas?f=concluida">Ver todas (${s.done})</a></div>
      <div class="card done-list">${recent.map(t => `
        <div class="row" data-task="${t.id}" style="cursor:pointer"><span class="check">${ICON.check}</span>
          <div><div class="t">${esc(t.title)}</div><div class="g">${esc(group(t.group).name)} · ${esc(firstName(t.who))} · ${t.doneAt === TODAY_ISO ? 'hoje' : fmt(t.doneAt)}</div></div>
          <span class="lbl">Concluída</span></div>`).join('') || '<div class="empty">Nenhuma tarefa concluída ainda.</div>'}</div>
    </div>

    <div>
      <div class="sec-head"><h2>Progresso dos grupos</h2><span class="count-badge">${String(GROUPS.length).padStart(2,'0')}</span></div>
      <p class="groups-intro">Cada ponto representa uma tarefa do grupo.</p>
      <div class="card">${GROUPS.map(groupCard).join('')}</div>
      ${legend}
      <button class="new-group" data-action="new-group">${ICON.plus} Criar grupo</button>
    </div>
  </div>`;
}

function viewGroups() {
  return `
  <div class="page-head">
    <div><div class="eyebrow">Meus grupos</div><h1>Grupos</h1>
    <p class="sub">Integrantes, progresso e data de entrega de cada grupo.</p></div>
    <button class="btn btn-primary" data-action="new-group">${ICON.plus} Novo grupo</button>
  </div>
  <div class="grid-groups">${GROUPS.map(g => {
    const list = tasksOf(g.id), done = list.filter(isDone).length, late = list.filter(isLate).length;
    return `<a class="card gbox" href="#/grupos/${g.id}">
      <div class="gc-top"><div><h3>${esc(g.name)}</h3><span class="muted small">${esc(g.area)}</span></div>${late ? `<span class="chip atr">${plural(late, 'atrasada', 'atrasadas')}</span>` : ''}</div>
      <div class="avatars">${g.members.map(avatar).join('')}</div>
      <div class="gc-foot"><span class="small">${done} de ${list.length} tarefas concluídas</span><b>${pct(done, list.length)}%</b></div>
      <div class="bar"><i style="width:${pct(done, list.length)}%"></i></div>
      <span class="muted small">Entrega: ${fmt(g.due)}</span>
    </a>`;
  }).join('')}</div>`;
}

function viewGroup(id) {
  const g = group(id);
  if (!g) return `<div class="empty">Grupo não encontrado. <a class="link" href="#/grupos">Voltar</a></div>`;
  const list = tasksOf(id).sort((a, b) => isDone(a) - isDone(b) || a.date.localeCompare(b.date));
  const done = list.filter(isDone).length;
  return `
  <a class="back" href="#/grupos">${ICON.back} Meus grupos</a>
  <div class="page-head">
    <div><div class="eyebrow">${esc(g.area)}</div><h1>${esc(g.name)}</h1>
    <p class="sub">${done} de ${list.length} tarefas concluídas · entrega em ${fmt(g.due)}</p></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      ${isProf() ? `<button class="btn btn-ghost" data-action="comment" data-group="${id}">Enviar recado</button>` : `<button class="btn btn-ghost" data-action="members" data-group="${id}">Gerenciar membros</button>`}
      <button class="btn btn-primary" data-action="new-task" data-group="${id}">${ICON.plus} Nova tarefa</button></div>
  </div>
  <div class="detail">
    <div>
      <div class="card panel" style="margin-bottom:16px">
        <div class="gc-foot" style="margin-bottom:8px"><span>Progresso do grupo</span><b>${pct(done, list.length)}%</b></div>
        ${track(list)}${legend}
      </div>
      <div class="card list">${list.map(taskRow).join('') || '<div class="empty">Este grupo ainda não tem tarefas.</div>'}</div>
    </div>
    <div>
      <div class="card panel" style="margin-bottom:16px"><h4>Integrantes (${g.members.length})</h4>
        ${g.members.map(k => {
          const mine = list.filter(t => t.who === k);
          return `<div class="member">${avatar(k)}<div><div>${esc(PEOPLE[k])}</div><div class="muted small">${mine.filter(isDone).length} de ${mine.length} tarefas concluídas</div></div></div>`;
        }).join('')}
      </div>
      <div class="card panel"><h4>Recados do professor</h4>
        ${g.comments.length ? g.comments.map(c => `<div class="comment"><b>${esc(c.by)}</b><small>${esc(c.when)}</small><div>${esc(c.text)}</div></div>`).join('')
          : '<p class="muted small" style="margin:0">Nenhum recado.</p>'}
      </div>
    </div>
  </div>`;
}

const FILTERS = [['todas','Todas'],['aberta','Em aberto'],['pendente','Pendentes'],['andamento','Em andamento'],['concluida','Concluídas'],['atrasada','Atrasadas']];
function filterTasks(f, q) {
  let list = [...TASKS];
  if (f === 'atrasada') list = list.filter(isLate);
  else if (f === 'aberta') list = list.filter(t => !isDone(t));
  else if (f !== 'todas') list = list.filter(t => t.status === f);
  if (q) {
    const s = q.toLowerCase();
    list = list.filter(t => t.title.toLowerCase().includes(s) || group(t.group).name.toLowerCase().includes(s) || PEOPLE[t.who].toLowerCase().includes(s));
  }
  return list.sort((a, b) => isDone(a) - isDone(b) || a.date.localeCompare(b.date));
}
function viewTasks(params) {
  const f = params.get('f') || 'todas', q = params.get('q') || '';
  const list = filterTasks(f, q);
  return `
  <div class="page-head">
    <div><div class="eyebrow">Todas as tarefas</div><h1>Tarefas</h1>
    <p class="sub">${q ? `Busca: “${esc(q)}” · <a class="link" href="#/tarefas?f=${f}">limpar</a>` : 'Tarefas de todos os grupos, com prazo, grupo e responsável.'}</p></div>
    <button class="btn btn-primary" data-action="new-task">${ICON.plus} Nova tarefa</button>
  </div>
  <div class="filters">${FILTERS.map(([k, l]) =>
    `<a class="filter ${f === k ? 'active' : ''}" href="#/tarefas?f=${k}${q ? '&q=' + encodeURIComponent(q) : ''}">${l}<span>${filterTasks(k, q).length}</span></a>`).join('')}</div>
  <div class="card list">${list.map(taskRow).join('') || '<div class="empty">Nenhuma tarefa encontrada.</div>'}</div>`;
}

function viewProfessor() {
  const s = stats();
  const students = new Set(GROUPS.flatMap(g => g.members)).size;
  const comments = GROUPS.reduce((n, g) => n + g.comments.length, 0);
  return `
  <div class="page-head">
    <div><div class="eyebrow">${esc(PROFESSOR.name)}</div><h1>Painel do professor</h1>
    <p class="sub">Progresso dos grupos da turma, tarefas atrasadas e recados para os alunos.</p></div>
  </div>
  <div class="kpis">
    <div class="card kpi"><span class="muted small">Grupos</span><b>${GROUPS.length}</b></div>
    <div class="card kpi"><span class="muted small">Alunos</span><b>${students}</b></div>
    <div class="card kpi"><span class="muted small">Tarefas atrasadas</span><b style="color:${s.late ? 'var(--red)' : 'inherit'}">${s.late}</b></div>
    <div class="card kpi"><span class="muted small">Recados enviados</span><b>${comments}</b></div>
  </div>
  <div class="card">
    <div class="prof-row prof-head"><span>Grupo</span><span>Progresso</span><span>Situação</span><span></span></div>
    ${GROUPS.map(g => {
      const list = tasksOf(g.id), done = list.filter(isDone).length, late = list.filter(isLate).length;
      return `<div class="prof-row">
        <div><a href="#/grupos/${g.id}"><b>${esc(g.name)}</b></a><div class="avatars" style="margin-top:6px">${g.members.map(avatar).join('')}</div></div>
        <div><div class="gc-foot small" style="margin-bottom:6px"><span>${done}/${list.length}</span><b>${pct(done, list.length)}%</b></div><div class="bar"><i style="width:${pct(done, list.length)}%"></i></div></div>
        <div>${late ? `<span class="chip atr">${plural(late, 'atrasada', 'atrasadas')}</span>` : '<span class="chip con">Em dia</span>'}</div>
        <div style="display:flex;gap:6px;justify-content:flex-end">
          <button class="btn btn-ghost" style="padding:8px 12px" data-action="remind" data-group="${g.id}" ${late ? '' : 'disabled title="Nenhuma tarefa atrasada"'}>Lembrar prazo</button>
          <button class="btn btn-primary" style="padding:8px 12px" data-action="comment" data-group="${g.id}">Recado</button>
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

/* ---------- roteamento ---------- */
function render() {
  if (!ME) return;
  const [path, qs] = (location.hash.slice(1) || '/').split('?');
  const params = new URLSearchParams(qs || '');
  const parts = path.split('/').filter(Boolean);
  let html, route;
  if (!parts.length) { html = viewHome(); route = 'home'; }
  else if (parts[0] === 'grupos') { html = parts[1] ? viewGroup(parts[1]) : viewGroups(); route = 'grupos'; }
  else if (parts[0] === 'tarefas') { html = viewTasks(params); route = 'tarefas'; }
  else if (parts[0] === 'professor' && isProf()) { html = viewProfessor(); route = 'professor'; }
  else { html = viewHome(); route = 'home'; }
  $('#view').innerHTML = html;
  document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('active', a.dataset.route === route));
  const s = stats();
  $('#navCount').textContent = s.total;
  $('#miniRing').style.background = `conic-gradient(var(--lime) ${s.weekPct * 3.6}deg, #2a3360 0)`;
  $('#miniRing').innerHTML = `<span style="background:var(--navy-2);width:32px;height:32px;border-radius:50%;display:grid;place-items:center">${s.weekPct}%</span>`;
  $('#miniText').textContent = `${s.weekDone} de ${s.weekTotal} concluídas`;
  $('#bellDot').style.display = s.late ? 'block' : 'none';
  $('#search').value = params.get('q') || '';
  $('#sidebar').classList.remove('open');
}
window.addEventListener('hashchange', () => { render(); window.scrollTo(0, 0); });

/* ---------- modais ---------- */
function openModal(html) { $('#modal').innerHTML = html; $('#modalBg').classList.add('open'); }
function closeModal() { $('#modalBg').classList.remove('open'); }
$('#modalBg').addEventListener('click', e => { if (e.target.id === 'modalBg' || e.target.closest('[data-close]')) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function toast(msg) {
  const el = $('#toast'); el.textContent = msg; el.classList.add('show');
  clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('show'), 2600);
}

function modalNewTask(gid) {
  const g0 = gid || GROUPS[0].id;
  const memberOpts = id => group(id).members.map(k => `<option value="${k}">${esc(PEOPLE[k])}</option>`).join('');
  openModal(`
    <h3>Nova tarefa</h3><p class="sub">Preencha os dados da tarefa.</p>
    <form id="taskForm">
      <label class="field">Título<input name="title" required placeholder="Ex.: Revisar referências do relatório"></label>
      <label class="field">Descrição<textarea name="desc" rows="3" placeholder="Opcional"></textarea></label>
      <div class="two">
        <label class="field">Grupo<select name="group" id="fGroup">${GROUPS.map(g => `<option value="${g.id}" ${g.id === g0 ? 'selected' : ''}>${esc(g.name)}</option>`).join('')}</select></label>
        <label class="field">Responsável<select name="who" id="fWho">${memberOpts(g0)}</select></label>
      </div>
      <div class="two">
        <label class="field">Prazo<input type="date" name="date" required value="2026-11-05"></label>
        <label class="field">Status<select name="status"><option value="pendente">Pendente</option><option value="andamento">Em andamento</option><option value="concluida">Concluída</option></select></label>
      </div>
      <div class="actions"><button type="button" class="btn btn-ghost" data-close>Cancelar</button><button class="btn btn-primary">Criar tarefa</button></div>
    </form>`);
  $('#fGroup').onchange = e => { $('#fWho').innerHTML = memberOpts(e.target.value); };
  $('#taskForm').onsubmit = e => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    const t = T(f.group, f.title.trim(), f.date, f.status, f.who, f.status === 'concluida' ? TODAY_ISO : null);
    t.desc = f.desc.trim();
    TASKS.push(t);
    closeModal(); render(); toast('Tarefa criada em ' + group(f.group).name + '.');
  };
}

function modalTask(id) {
  const t = TASKS.find(x => x.id === id), g = group(t.group);
  openModal(`
    <div class="eyebrow">${esc(g.name)}</div><h3 style="margin-top:6px">${esc(t.title)}</h3>
    <div style="display:flex;gap:8px;margin:10px 0 4px">${isLate(t) ? '<span class="chip atr">Atrasada</span>' : ''}${chip(t)}</div>
    <p class="sub">${esc(t.desc || 'Sem descrição.')}</p>
    <div class="two" style="margin-top:14px">
      <div class="field">Responsável<span style="color:var(--text);display:flex;gap:6px;align-items:center">${avatar(t.who)} ${esc(PEOPLE[t.who])}</span></div>
      <div class="field">Prazo<span style="color:var(--text)">${fmt(t.date)} · ${isDone(t) ? 'entregue' : relLabel(t).toLowerCase()}</span></div>
    </div>
    <label class="field">Status<select id="stSel">
      <option value="pendente" ${t.status === 'pendente' ? 'selected' : ''}>Pendente</option>
      <option value="andamento" ${t.status === 'andamento' ? 'selected' : ''}>Em andamento</option>
      <option value="concluida" ${t.status === 'concluida' ? 'selected' : ''}>Concluída</option></select></label>
    <div class="actions"><button class="btn btn-ghost" id="delBtn" style="margin-right:auto;color:var(--red)">Excluir</button><button class="btn btn-ghost" data-close>Fechar</button>
      ${isDone(t) ? '' : `<button class="btn btn-primary" id="doneBtn">${ICON.check} Concluir</button>`}</div>`);
  const setStatus = st => { t.status = st; t.doneAt = st === 'concluida' ? TODAY_ISO : null; closeModal(); render(); };
  $('#stSel').onchange = e => { setStatus(e.target.value); toast('Status alterado.'); };
  const b = $('#doneBtn'); if (b) b.onclick = () => { setStatus('concluida'); toast('Tarefa concluída.'); };
  $('#delBtn').onclick = () => {
    if (!confirm('Excluir esta tarefa?')) return;
    TASKS.splice(TASKS.indexOf(t), 1); closeModal(); render(); toast('Tarefa excluída.');
  };
}

function modalNewGroup() {
  openModal(`
    <h3>Novo grupo</h3><p class="sub">Informe o nome e escolha os integrantes.</p>
    <form id="groupForm">
      <label class="field">Nome do grupo<input name="name" required placeholder="Ex.: Trabalho de Engenharia de Software"></label>
      <label class="field">Disciplina<input name="area" placeholder="Ex.: Engenharia de Software"></label>
      <label class="field">Data de entrega<input type="date" name="due" value="2026-11-20"></label>
      <div class="field">Integrantes<div style="display:flex;flex-wrap:wrap;gap:10px;color:var(--text)">
        ${Object.keys(PEOPLE).map(k => `<label style="display:flex;gap:5px;align-items:center"><input type="checkbox" name="m" value="${k}" ${k === 'AP' && !isProf() ? 'checked disabled' : ''}>${esc(PEOPLE[k])}</label>`).join('')}</div></div>
      <div class="actions"><button type="button" class="btn btn-ghost" data-close>Cancelar</button><button class="btn btn-primary">Criar grupo</button></div>
    </form>`);
  $('#groupForm').onsubmit = e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const id = 'g' + Date.now();
    const members = [...new Set([...(isProf() ? [] : ['AP']), ...fd.getAll('m')])];
    GROUPS.push({ id, name: fd.get('name').trim(), area: fd.get('area').trim() || 'Sem disciplina', due: fd.get('due') || '2026-11-20',
      members: members.length ? members : ['AP'], comments: [] });
    closeModal(); location.hash = '#/grupos/' + id; toast('Grupo criado.');
  };
}

function modalMembers(gid) {
  const g = group(gid);
  openModal(`
    <h3>Gerenciar membros</h3><p class="sub">${esc(g.name)}</p>
    <form id="memForm"><div class="field"><div style="display:flex;flex-direction:column;gap:8px;color:var(--text)">
      ${Object.keys(PEOPLE).map(k => `<label style="display:flex;gap:8px;align-items:center"><input type="checkbox" name="m" value="${k}" ${g.members.includes(k) ? 'checked' : ''} ${k === 'AP' ? 'disabled' : ''}>${avatar(k)} ${esc(PEOPLE[k])}</label>`).join('')}
    </div></div>
    <div class="actions"><button type="button" class="btn btn-ghost" data-close>Cancelar</button><button class="btn btn-primary">Salvar</button></div></form>`);
  $('#memForm').onsubmit = e => {
    e.preventDefault();
    g.members = ['AP', ...new FormData(e.target).getAll('m')];
    closeModal(); render(); toast('Integrantes atualizados.');
  };
}

function modalComment(gid) {
  const g = group(gid);
  openModal(`
    <h3>Recado para o grupo</h3><p class="sub">${esc(g.name)} · ${plural(g.members.length, 'aluno', 'alunos')}</p>
    <form id="cForm"><label class="field">Mensagem<textarea name="text" rows="4" required placeholder="Ex.: Revisem as tarefas atrasadas antes da próxima aula."></textarea></label>
    <div class="actions"><button type="button" class="btn btn-ghost" data-close>Cancelar</button><button class="btn btn-primary">Enviar</button></div></form>`);
  $('#cForm').onsubmit = e => {
    e.preventDefault();
    g.comments.unshift({ by: PROFESSOR.name, text: new FormData(e.target).get('text').trim(), when: fmt(TODAY_ISO) });
    closeModal(); render(); toast('Recado enviado para ' + g.name + '.');
  };
}

function remind(gid) {
  const g = group(gid), late = tasksOf(gid).filter(isLate);
  if (!late.length) return;
  g.comments.unshift({ by: PROFESSOR.name, when: fmt(TODAY_ISO),
    text: 'Lembrete de prazo: ' + late.map(t => `"${t.title}" (${firstName(t.who)}, venceu em ${fmt(t.date)})`).join('; ') + '.' });
  render(); toast('Lembrete enviado para ' + g.name + '.');
}

/* ---------- eventos globais ---------- */
document.addEventListener('click', e => {
  if (!ME) return;
  const tab = e.target.closest('[data-tab]');
  if (tab) { homeTab = tab.dataset.tab; render(); return; }
  const task = e.target.closest('[data-task]');
  if (task) { modalTask(Number(task.dataset.task)); return; }
  const act = e.target.closest('[data-action]');
  if (act && !act.disabled) {
    const gid = act.dataset.group;
    ({
      'new-task': () => modalNewTask(gid),
      'new-group': modalNewGroup,
      'members': () => modalMembers(gid),
      'comment': () => modalComment(gid),
      'remind': () => remind(gid),
    })[act.dataset.action]();
  }
});
$('#logout').onclick = e => { e.preventDefault(); logout(); };
$('#bell').onclick = () => {
  const s = stats();
  const recados = isProf() ? 0 : GROUPS.filter(g => g.members.includes('AP')).reduce((n, g) => n + g.comments.length, 0);
  const msgs = [];
  if (s.late) msgs.push(plural(s.late, 'tarefa atrasada', 'tarefas atrasadas'));
  if (recados) msgs.push(plural(recados, 'recado do professor', 'recados do professor'));
  toast(msgs.length ? msgs.join(' · ') : 'Sem notificações.');
};
$('#menuBtn').onclick = () => $('#sidebar').classList.toggle('open');
$('#search').addEventListener('keydown', e => {
  if (e.key === 'Enter') location.hash = '#/tarefas?f=todas&q=' + encodeURIComponent(e.target.value.trim());
});

/* ---------- início ---------- */
(function start() {
  const email = store.get('tria_session');
  const acc = email && (store.get('tria_accounts') || []).find(x => x.email === email);
  if (acc) { ME = acc; applyUser(); render(); }
  else showAuth();
})();
