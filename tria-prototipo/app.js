/* TRIA — protótipo navegável (dados fictícios, mantidos só em memória) */

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
    comments:[{by:'RL', text:'Bom ritmo! Lembrem de anexar os resultados dos testes com usuários no relatório.', when:'27 out'}] },
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
const dayDiff = s => Math.round((parse(s) - TODAY) / 86400000);
const fmt = s => { const d = parse(s); return String(d.getDate()).padStart(2,'0') + ' ' + MESES[d.getMonth()]; };
const isDone = t => t.status === 'concluida';
const isLate = t => !isDone(t) && dayDiff(t.date) < 0;
const group = id => GROUPS.find(g => g.id === id);
const tasksOf = id => TASKS.filter(t => t.group === id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const firstName = k => PEOPLE[k].split(' ')[0];
const avatar = k => `<span class="avatar" title="${esc(PEOPLE[k] || PROFESSOR.name)}">${k}</span>`;
const pct = (a, b) => b ? Math.round(a / b * 100) : 0;

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
  return { total, done, pending: total - done, late: TASKS.filter(isLate).length, pct: pct(done, total) };
}
const ICON = {
  arrow:'<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  ext:'<svg viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9"/></svg>',
  check:'<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  plus:'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  back:'<svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
};

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
    <div class="gc-sub"><span>${esc(g.area)}</span><span>${g.members.length} membros</span></div>
    ${track(list)}
    <div class="gc-foot"><span>${done} de ${list.length} concluídas</span><b>${pct(done, list.length)}%</b></div>
    <div class="gc-date">Entrega do ciclo · ${fmt(g.due)}</div>
  </a>`;
}
const legend = `<div class="legend"><span><i class="c"></i>Concluída</span><span><i class="a"></i>Em andamento</span><span><i></i>Pendente</span></div>`;

/* ---------- telas ---------- */
let homeTab = 'destaque';

function viewHome() {
  const s = stats();
  const ring = `conic-gradient(var(--lime) ${s.pct * 3.6}deg, #2a3360 0)`;
  const open = TASKS.filter(t => !isDone(t)).sort((a, b) => a.date.localeCompare(b.date));
  const shown = homeTab === 'destaque' ? open.slice(0, 5) : open;
  const recent = TASKS.filter(isDone).sort((a, b) => b.doneAt.localeCompare(a.doneAt)).slice(0, 3);
  const d = TODAY;
  return `
  <div class="page-head">
    <div><div class="eyebrow">${DIAS[d.getDay()]}, ${d.getDate()} de ${MESES_LONGO[d.getMonth()]}</div>
      <h1>Olá, Ana. Vamos fazer acontecer?</h1>
      <p class="sub">Seu time está em bom ritmo — acompanhe os próximos passos da equipe.</p></div>
    <button class="btn btn-primary" data-action="new-task">${ICON.plus} Nova tarefa</button>
  </div>

  <div class="stats">
    <div class="card hero">
      <div><div class="eyebrow">Ritmo geral</div>
        <div class="big">${s.pct}%</div><p>das tarefas concluídas</p>
        <span class="pill-lime">+10% nesta semana</span></div>
      <div class="ring" style="background:${ring}"><div class="ring-in"><div><b>${s.done}</b> <small>/ ${s.total}</small></div></div></div>
    </div>
    <a class="card stat" href="#/tarefas?f=pendente">
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
      <div><div class="eyebrow">Precisa de atenção</div>
      <h3>${s.late} ${s.late > 1 ? 'tarefas estão atrasadas' : 'tarefa está atrasada'}</h3>
      <p>Uma pequena ação agora mantém todo o grupo no ritmo.</p></div>
      <a class="btn btn-salmon" href="#/tarefas?f=atrasada">Ver atrasadas</a></div>`
    : `<div class="alert ok"><div class="alert-ico"><i style="background:#bff0d2"></i></div>
      <div><div class="eyebrow">Tudo em dia</div><h3>Nenhuma tarefa atrasada</h3><p>O grupo está no ritmo certo. Continue assim!</p></div></div>`}

  <div class="cols">
    <div>
      <div class="sec-head"><h2>O que pede atenção</h2>${s.late ? `<span class="late-tag">${s.late} atrasada${s.late > 1 ? 's' : ''}</span>` : ''}</div>
      <div class="tabs">
        <button class="tab ${homeTab === 'destaque' ? 'active' : ''}" data-tab="destaque">Prazos em destaque</button>
        <button class="tab ${homeTab === 'todos' ? 'active' : ''}" data-tab="todos">Toda a equipe ▾</button>
        <span class="right">Arraste para priorizar</span>
      </div>
      <div class="card list">${shown.map(taskRow).join('') || '<div class="empty">Nada pendente 🎉</div>'}</div>

      <div class="sec-head" style="margin-top:28px"><h2>Passos que já demos</h2><a class="link" href="#/tarefas?f=concluida">Ver ${s.done} concluídas →</a></div>
      <div class="card done-list">${recent.map(t => `
        <div class="row" data-task="${t.id}" style="cursor:pointer"><span class="check">${ICON.check}</span>
          <div><div class="t">${esc(t.title)}</div><div class="g">${esc(group(t.group).name)} · ${esc(firstName(t.who))} · ${dayDiff(t.doneAt) === 0 ? 'hoje' : fmt(t.doneAt)}</div></div>
          <span class="lbl">Concluída</span></div>`).join('')}</div>
    </div>

    <div>
      <div class="sec-head"><h2>Cada grupo, uma trilha</h2><span class="count-badge">${String(GROUPS.length).padStart(2,'0')}</span></div>
      <p class="groups-intro">Cada ponto é uma tarefa. Cada conclusão abre caminho para a próxima.</p>
      <div class="card">${GROUPS.map(groupCard).join('')}</div>
      ${legend}
      <button class="new-group" data-action="new-group">${ICON.plus} Criar um novo grupo</button>
    </div>
  </div>`;
}

function viewGroups() {
  return `
  <div class="page-head">
    <div><div class="eyebrow">Meus grupos</div><h1>Seus grupos de trabalho</h1>
    <p class="sub">Veja quem está em cada grupo e quanto do trabalho já foi feito.</p></div>
    <button class="btn btn-primary" data-action="new-group">${ICON.plus} Novo grupo</button>
  </div>
  <div class="grid-groups">${GROUPS.map(g => {
    const list = tasksOf(g.id), done = list.filter(isDone).length, late = list.filter(isLate).length;
    return `<a class="card gbox" href="#/grupos/${g.id}">
      <div class="gc-top"><div><h3>${esc(g.name)}</h3><span class="muted small">${esc(g.area)}</span></div>${late ? `<span class="chip atr">${late} atrasada${late > 1 ? 's' : ''}</span>` : ''}</div>
      <div class="avatars">${g.members.map(avatar).join('')}</div>
      <div class="gc-foot"><span class="small">${done} de ${list.length} tarefas concluídas</span><b>${pct(done, list.length)}%</b></div>
      <div class="bar"><i style="width:${pct(done, list.length)}%"></i></div>
      <span class="muted small">Entrega do ciclo · ${fmt(g.due)}</span>
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
    <div style="display:flex;gap:8px"><button class="btn btn-ghost" data-action="members" data-group="${id}">Gerenciar membros</button>
    <button class="btn btn-primary" data-action="new-task" data-group="${id}">${ICON.plus} Nova tarefa</button></div>
  </div>
  <div class="detail">
    <div>
      <div class="card panel" style="margin-bottom:16px">
        <div class="gc-foot" style="margin-bottom:8px"><span>Progresso do grupo</span><b>${pct(done, list.length)}%</b></div>
        ${track(list)}${legend}
      </div>
      <div class="card list">${list.map(taskRow).join('')}</div>
    </div>
    <div>
      <div class="card panel" style="margin-bottom:16px"><h4>Time (${g.members.length})</h4>
        ${g.members.map(k => {
          const mine = list.filter(t => t.who === k);
          return `<div class="member">${avatar(k)}<div><div>${esc(PEOPLE[k])}</div><div class="muted small">${mine.filter(isDone).length}/${mine.length} tarefas</div></div></div>`;
        }).join('')}
      </div>
      <div class="card panel"><h4>Recados do professor</h4>
        ${g.comments.length ? g.comments.map(c => `<div class="comment"><b>${esc(PROFESSOR.name)}</b><small>${esc(c.when)}</small><div>${esc(c.text)}</div></div>`).join('')
          : '<p class="muted small" style="margin:0">Nenhum recado ainda.</p>'}
      </div>
    </div>
  </div>`;
}

const FILTERS = [['todas','Todas'],['pendente','Pendentes'],['andamento','Em andamento'],['concluida','Concluídas'],['atrasada','Atrasadas']];
function filterTasks(f, q) {
  let list = [...TASKS];
  if (f === 'atrasada') list = list.filter(isLate);
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
    <div><div class="eyebrow">Todas as tarefas</div><h1>Tudo o que o time tem pela frente</h1>
    <p class="sub">${q ? `Resultados para “${esc(q)}” · ` : ''}Tarefas de todos os grupos, com prazo, grupo e responsável.</p></div>
    <button class="btn btn-primary" data-action="new-task">${ICON.plus} Nova tarefa</button>
  </div>
  <div class="filters">${FILTERS.map(([k, l]) =>
    `<a class="filter ${f === k ? 'active' : ''}" href="#/tarefas?f=${k}${q ? '&q=' + encodeURIComponent(q) : ''}">${l}<span>${filterTasks(k, q).length}</span></a>`).join('')}</div>
  <div class="card list">${list.map(taskRow).join('') || '<div class="empty">Nenhuma tarefa neste filtro.</div>'}</div>`;
}

function viewProfessor() {
  const s = stats();
  const students = new Set(GROUPS.flatMap(g => g.members)).size;
  const comments = GROUPS.reduce((n, g) => n + g.comments.length, 0);
  return `
  <div class="page-head">
    <div><div class="eyebrow">Painel do professor · ${esc(PROFESSOR.name)}</div><h1>Acompanhe a turma de perto</h1>
    <p class="sub">Veja o andamento de cada grupo, identifique atrasos e oriente os alunos antes da entrega.</p></div>
  </div>
  <div class="kpis">
    <div class="card kpi"><span class="muted small">Grupos acompanhados</span><b>${GROUPS.length}</b></div>
    <div class="card kpi"><span class="muted small">Alunos</span><b>${students}</b></div>
    <div class="card kpi"><span class="muted small">Tarefas atrasadas</span><b style="color:var(--red)">${s.late}</b></div>
    <div class="card kpi"><span class="muted small">Recados enviados</span><b>${comments}</b></div>
  </div>
  <div class="card">
    <div class="prof-row prof-head"><span>Grupo</span><span>Progresso</span><span>Situação</span><span></span></div>
    ${GROUPS.map(g => {
      const list = tasksOf(g.id), done = list.filter(isDone).length, late = list.filter(isLate).length;
      return `<div class="prof-row">
        <div><b>${esc(g.name)}</b><div class="avatars" style="margin-top:6px">${g.members.map(avatar).join('')}</div></div>
        <div><div class="gc-foot small" style="margin-bottom:6px"><span>${done}/${list.length}</span><b>${pct(done, list.length)}%</b></div><div class="bar"><i style="width:${pct(done, list.length)}%"></i></div></div>
        <div>${late ? `<span class="chip atr">${late} atrasada${late > 1 ? 's' : ''}</span>` : '<span class="chip con">Em dia</span>'}</div>
        <div style="display:flex;gap:6px;justify-content:flex-end">
          <button class="btn btn-ghost" style="padding:8px 12px" data-action="remind" data-group="${g.id}">Lembrar</button>
          <button class="btn btn-primary" style="padding:8px 12px" data-action="comment" data-group="${g.id}">Recado</button>
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

/* ---------- roteamento ---------- */
function render() {
  const [path, qs] = (location.hash.slice(1) || '/').split('?');
  const params = new URLSearchParams(qs || '');
  const parts = path.split('/').filter(Boolean);
  let html, route;
  if (!parts.length) { html = viewHome(); route = 'home'; }
  else if (parts[0] === 'grupos') { html = parts[1] ? viewGroup(parts[1]) : viewGroups(); route = 'grupos'; }
  else if (parts[0] === 'tarefas') { html = viewTasks(params); route = 'tarefas'; }
  else if (parts[0] === 'professor') { html = viewProfessor(); route = 'professor'; }
  else { html = viewHome(); route = 'home'; }
  $('#view').innerHTML = html;
  document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('active', a.dataset.route === route));
  const s = stats();
  $('#navCount').textContent = s.total;
  $('#miniRing').style.background = `conic-gradient(var(--lime) ${s.pct * 3.6}deg, #2a3360 0)`;
  $('#miniRing').innerHTML = `<span style="background:var(--navy-2);width:32px;height:32px;border-radius:50%;display:grid;place-items:center">${s.pct}%</span>`;
  $('#miniText').textContent = `${s.done} de ${s.total} tarefas`;
  $('#bellDot').style.display = s.late ? 'block' : 'none';
  $('#sidebar').classList.remove('open');
}
window.addEventListener('hashchange', () => { render(); window.scrollTo(0, 0); });

/* ---------- modais ---------- */
function openModal(html) { $('#modal').innerHTML = html; $('#modalBg').classList.add('open'); }
function closeModal() { $('#modalBg').classList.remove('open'); }
$('#modalBg').addEventListener('click', e => { if (e.target.id === 'modalBg' || e.target.dataset.close !== undefined) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function toast(msg) {
  const el = $('#toast'); el.textContent = msg; el.classList.add('show');
  clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('show'), 2400);
}

function modalNewTask(gid) {
  const g0 = gid || GROUPS[0].id;
  const memberOpts = id => group(id).members.map(k => `<option value="${k}">${esc(PEOPLE[k])}</option>`).join('');
  openModal(`
    <h3>Nova tarefa</h3><p class="sub">Defina o que precisa ser feito, quem cuida e até quando.</p>
    <form id="taskForm">
      <label class="field">Título<input name="title" required placeholder="Ex.: Revisar referências do relatório"></label>
      <label class="field">Descrição<textarea name="desc" rows="3" placeholder="Detalhes para quem vai executar"></textarea></label>
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
    const t = T(f.group, f.title.trim(), f.date, f.status, f.who, f.status === 'concluida' ? '2026-10-29' : null);
    t.desc = f.desc;
    TASKS.push(t);
    closeModal(); render(); toast('Tarefa criada em ' + group(f.group).name);
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
      <div class="field">Prazo<span style="color:var(--text)">${fmt(t.date)} · ${relLabel(t)}</span></div>
    </div>
    <label class="field">Alterar status<select id="stSel">
      <option value="pendente" ${t.status === 'pendente' ? 'selected' : ''}>Pendente</option>
      <option value="andamento" ${t.status === 'andamento' ? 'selected' : ''}>Em andamento</option>
      <option value="concluida" ${t.status === 'concluida' ? 'selected' : ''}>Concluída</option></select></label>
    <div class="actions"><button class="btn btn-ghost" data-close>Fechar</button>
      ${isDone(t) ? '' : `<button class="btn btn-primary" id="doneBtn">${ICON.check} Marcar como concluída</button>`}</div>`);
  const setStatus = st => { t.status = st; t.doneAt = st === 'concluida' ? '2026-10-29' : null; closeModal(); render(); };
  $('#stSel').onchange = e => { setStatus(e.target.value); toast('Status atualizado'); };
  const b = $('#doneBtn'); if (b) b.onclick = () => { setStatus('concluida'); toast('Boa! Mais um passo dado ✓'); };
}

function modalNewGroup() {
  openModal(`
    <h3>Criar um novo grupo</h3><p class="sub">Dê um nome e convide os integrantes.</p>
    <form id="groupForm">
      <label class="field">Nome do grupo<input name="name" required placeholder="Ex.: Trabalho de Engenharia de Software"></label>
      <label class="field">Área / disciplina<input name="area" placeholder="Ex.: Engenharia de Software"></label>
      <label class="field">Entrega do ciclo<input type="date" name="due" value="2026-11-20"></label>
      <div class="field">Integrantes<div style="display:flex;flex-wrap:wrap;gap:10px;color:var(--text)">
        ${Object.keys(PEOPLE).map(k => `<label style="display:flex;gap:5px;align-items:center"><input type="checkbox" name="m" value="${k}" ${k === 'AP' ? 'checked disabled' : ''}>${esc(PEOPLE[k])}</label>`).join('')}</div></div>
      <div class="actions"><button type="button" class="btn btn-ghost" data-close>Cancelar</button><button class="btn btn-primary">Criar grupo</button></div>
    </form>`);
  $('#groupForm').onsubmit = e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const id = 'g' + Date.now();
    GROUPS.push({ id, name: fd.get('name').trim(), area: fd.get('area').trim() || 'Novo grupo', due: fd.get('due') || '2026-11-20',
      members: ['AP', ...fd.getAll('m')], comments: [] });
    closeModal(); location.hash = '#/grupos/' + id; toast('Grupo criado');
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
    closeModal(); render(); toast('Membros atualizados');
  };
}

function modalComment(gid) {
  const g = group(gid);
  openModal(`
    <h3>Enviar recado ao grupo</h3><p class="sub">${esc(g.name)} · ${g.members.length} alunos</p>
    <form id="cForm"><label class="field">Mensagem<textarea name="text" rows="4" required placeholder="Ex.: Ótimo progresso! Revisem as tarefas atrasadas antes da próxima aula."></textarea></label>
    <div class="actions"><button type="button" class="btn btn-ghost" data-close>Cancelar</button><button class="btn btn-primary">Enviar recado</button></div></form>`);
  $('#cForm').onsubmit = e => {
    e.preventDefault();
    g.comments.unshift({ by: 'RL', text: new FormData(e.target).get('text').trim(), when: fmt('2026-10-29') });
    closeModal(); render(); toast('Recado enviado para ' + g.name);
  };
}

/* ---------- eventos globais ---------- */
document.addEventListener('click', e => {
  const tab = e.target.closest('[data-tab]');
  if (tab) { homeTab = tab.dataset.tab; render(); return; }
  const task = e.target.closest('[data-task]');
  if (task) { modalTask(Number(task.dataset.task)); return; }
  const act = e.target.closest('[data-action]');
  if (act) {
    const gid = act.dataset.group;
    ({
      'new-task': () => modalNewTask(gid),
      'new-group': modalNewGroup,
      'members': () => modalMembers(gid),
      'comment': () => modalComment(gid),
      'remind': () => toast('Lembrete de prazo enviado para ' + group(gid).name),
    })[act.dataset.action]();
    return;
  }
  const t = e.target.closest('[data-toast]');
  if (t) { e.preventDefault(); toast(t.dataset.toast); }
});
$('#logout').onclick = e => { e.preventDefault(); toast('Sair da conta não está ativo no protótipo'); };
$('#bell').onclick = () => { const s = stats(); toast(s.late ? `Você tem ${s.late} tarefa(s) atrasada(s)` : 'Sem novas notificações'); };
$('#menuBtn').onclick = () => $('#sidebar').classList.toggle('open');
$('#search').addEventListener('keydown', e => {
  if (e.key === 'Enter') location.hash = '#/tarefas?f=todas&q=' + encodeURIComponent(e.target.value.trim());
});

render();
