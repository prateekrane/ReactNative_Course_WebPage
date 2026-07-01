/* ============================================================
   COURSE MAP
============================================================ */
/* ============================================================
   COURSE MAP — full structure from the PDF.
   Only Section 1's topics are "built" (have real content ids);
   everything else renders as a locked/soon nav entry for now.
============================================================ */
const COURSE = [
  { id:"s1", title:"React Native for Beginners", built:true, topics:[
    "What is React Native?","How React Native Works","Why Expo and Expo Go","Setting Up Your Environment",
    "Creating Your First App","Project Structure","Fetching Data from an API","Rendering Lists and TypeScript",
    "Working with Images","Styling Your App","Navigation Basics","Recap and Next Steps"
  ]},
  { id:"s2", title:"Introduction", built:true, topics:["How to take this course","Why Expo","Android Environment Setup","iOS Environment Setup","RN New Architecture","Expo Go vs Development Builds"]},
  { id:"s3", title:"Components and APIs", built:true, topics:["Basic Components","Custom Components","Advanced Custom Components"]},
  { id:"s4", title:"Style and Design", built:true, topics:["Designing with Figma","Style & StyleSheet","Design System Tips","Layout with Flexbox","Dark Mode"]},
  { id:"s5", title:"Expo Router (Navigation)", built:true, topics:["File-Based Routing","Dynamic Routes","Stack & Tabs","Router Hooks","Authentication Flow","Role-Based Access","Deep Linking","Liquid Glass Bottom Tabs"]},
  { id:"s6", title:"Animations & Gestures", built:true, topics:["Animations and Gestures","Composition & Interactions","Swipeable Components"]},
  { id:"s7", title:"Expo UI", built:true, topics:["What is Expo UI?","Expo UI on iOS","Expo UI on Android","Native state and worklets","Universal components","Custom SwiftUI views and modifiers","Custom Compose views and modifiers","Architecting a maintainable screen"]},
  { id:"s8", title:"Testing", built:true, topics:["Unit Test with Jest","E2E with Maestro"]},
  { id:"s9", title:"Push Notification", built:true, topics:["Expo Notifications","OneSignal Integration","Rich Notifications iOS"]},
  { id:"s10", title:"Backend Basics", built:true, topics:["Environment Variables","Expo Router API Routes","Streaming Data with Expo Fetch","Deploying with EAS Hosting"]},
  { id:"s11", title:"Supabase", built:true, topics:["Supabase UI Tour","Creating Tables","Installation and CRUD Operations"]},
  { id:"s12", title:"EAS Build", built:true, topics:["Development Builds","Preview Builds","Production Builds","Automating App Version Code"]},
  { id:"s13", title:"EAS Submit", built:true, topics:["Submit to App Store","Submit to Google Play"]},
  { id:"s14", title:"EAS Update", built:true, topics:["Configuring EAS Update","Deploying Updates","Reverting Updates"]},
  { id:"s15", title:"EAS Workflows", built:true, topics:["Getting Started with Workflows","E2E with Maestro Workflow","Build and Submit Workflow"]},
  { id:"s16", title:"Publishing", built:true, topics:["App Store Submission","Play Store Submission"]},
  { id:"s17", title:"Payments", built:true, topics:["Payment Basics","In-app Purchases"]},
  { id:"s18", title:"Native Modules", badge:"NEW", built:true, topics:["Introduction to Native Modules","Create a Native Module","Create a Native View","Native Modules Next Steps"]},
  { id:"s19", title:"Bonus", badge:"NEW", built:true, topics:["Apple Widgets","How to Upgrade Expo SDK","Meta Ads & Facebook SDK"]},
];

function slugify(s){ return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }



/* ---------- Search ---------- */
document.getElementById('searchInput').addEventListener('input', (e)=>{
  const q = e.target.value.toLowerCase();
  document.querySelectorAll('.nav-list li').forEach(li=>{
    const text = li.textContent.toLowerCase();
    li.style.display = text.includes(q) ? '' : 'none';
  });
  document.querySelectorAll('.nav-section').forEach(sec=>{
    if(q) sec.classList.add('open');
  });
});



/* ---------- Mobile sidebar ---------- */
document.getElementById('menuBtn').onclick = ()=>{
  document.getElementById('sidebar').classList.toggle('open');
};

/* ---------- Copy / collapse code ---------- */
function copyCode(btn){
  const block = btn.closest('.code-block');
  const code = block.querySelector('code').innerText;
  navigator.clipboard.writeText(code).then(()=>{
    const old = btn.textContent;
    btn.textContent = 'Copied ✓';
    setTimeout(()=> btn.textContent = old, 1400);
  });
}
function toggleCollapse(btn){
  const block = btn.closest('.code-block');
  block.classList.toggle('collapsed');
  btn.textContent = block.classList.contains('collapsed') ? 'Expand' : 'Collapse';
}

/* ---------- Quiz logic ---------- */
function answerQuiz(btn, correct){
  const opts = btn.parentElement.querySelectorAll('.quiz-opt');
  opts.forEach(o=> o.disabled = true);
  if(correct){ btn.classList.add('correct'); }
  else { btn.classList.add('wrong'); }
  const exp = btn.parentElement.nextElementSibling;
  if(exp && exp.classList.contains('quiz-explain')) exp.classList.add('show');
}

/* ---------- Scroll-based progress + crumb + active-nav tracking ---------- */
function updateProgress(){
  // Build list of topics visible on this page only
  const pageItems = [];
  COURSE.filter(s=>s.built).forEach(sec => {
    sec.topics.forEach(t => {
      const slug = slugify(t);
      const el = document.getElementById(slug);
      if(el) pageItems.push({ el, title:t, slug, secTitle:sec.title,
        secIndex: COURSE.filter(s=>s.built).findIndex(x=>x.id===sec.id)+1 });
    });
  });
  if(!pageItems.length) return;
  let passed = 0;
  let current = pageItems[0];
  pageItems.forEach((item, i) => {
    const rect = item.el.getBoundingClientRect();
    if(rect.top < 140){ passed = i+1; current = item; }
  });
  const pct = Math.round((passed/pageItems.length)*100);
  document.getElementById('progressFill').style.width = pct+'%';
  document.getElementById('progressPct').textContent = pct+'%';
  document.getElementById('crumbBar').innerHTML =
    `Section ${current.secIndex} · ${current.secTitle} → <b id="crumbCurrent">${current.title}</b>`;
  document.querySelectorAll('.nav-list a[data-slug]').forEach(a=>{
    a.classList.toggle('current', a.dataset.slug === current.slug);
  });
}
window.addEventListener('scroll', updateProgress);

/* ============================================================
   SECTION → FILE MAP (used by renderNav)
============================================================ */
const SECTION_FILES = {
  s1:'section1.html', s2:'section2.html', s3:'section3.html',
  s4:'section4.html', s5:'section5.html', s6:'section6.html',
  s7:'section7.html', s8:'section8.html', s9:'section9.html',
  s10:'section10.html', s11:'section11.html', s12:'section12.html',
  s13:'section13.html', s14:'section14.html', s15:'section15.html',
  s16:'section16.html', s17:'section17.html', s18:'section18.html',
  s19:'section19.html'
};

/* ---------- renderNav: build sidebar nav with multi-page links ---------- */
function renderNav(){
  const currentSection = window.CURRENT_SECTION || 's1';
  const root = document.getElementById('navRoot');
  root.innerHTML = '';
  COURSE.forEach((sec, i)=>{
    const isCurrent = sec.id === currentSection;
    const secEl = document.createElement('div');
    secEl.className = 'nav-section' + (isCurrent ? ' open active' : '');
    const head = document.createElement('div');
    head.className = 'nav-head';
    head.innerHTML = `<span><span class="num">${String(i+1).padStart(2,'0')}</span>${sec.title}</span>
      <span>${sec.badge?`<span class="nav-badge">${sec.badge}</span>`:''}${!sec.built?'<span class="nav-soon">soon</span>':''}<span class="chev">&#9656;</span></span>`;
    head.onclick = ()=> secEl.classList.toggle('open');
    const list = document.createElement('ul');
    list.className = 'nav-list';
    const filePrefix = isCurrent ? '' : (SECTION_FILES[sec.id] || '');
    sec.topics.forEach(t=>{
      const li = document.createElement('li');
      const slug = slugify(t);
      if(sec.built){
        const href = filePrefix ? filePrefix + '#' + slug : '#' + slug;
        li.innerHTML = `<a href="${href}" data-slug="${slug}">${t}</a>`;
      } else {
        li.innerHTML = `<a style="opacity:.5; cursor:default;">${t}</a>`;
      }
      list.appendChild(li);
    });
    secEl.appendChild(head);
    secEl.appendChild(list);
    root.appendChild(secEl);
  });
}
renderNav();



/* ---------- Fetch demo logic (real API call) ---------- */
function runFetchDemo(){
  const screen = document.getElementById('fetchDemoScreen');
  screen.innerHTML = "<span style=\"font-family:'JetBrains Mono',monospace; font-size:12px; color:#5c6070;\">Loading…</span>";
  fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
    .then(r=>r.json())
    .then(data=>{
      screen.innerHTML = '';
      screen.style.alignItems = 'stretch';
      const wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex;flex-direction:column;gap:8px;';
      wrap.innerHTML = `<div style="font-family:'Inter',sans-serif;font-size:12px;color:#5c6070;margin-bottom:2px;">Loaded ${data.length} posts!</div>` +
        data.map(p=>`<div style="background:#f2f0ea;border-radius:8px;padding:8px 10px;font-family:'Inter',sans-serif;font-size:11.5px;color:#1a1d24;">${p.title.slice(0,40)}…</div>`).join('');
      screen.appendChild(wrap);
    })
    .catch(()=>{
      screen.innerHTML = "<span style=\"font-family:'Inter',sans-serif;font-size:12px;color:#ff5a3c;\">Network error — try again</span>";
    });
}

/* ---------- Like button demo (Section 3) ---------- */
function toggleLikeDemo(){
  const btn = document.getElementById('likeDemoBtn');
  if(!btn) return;
  const liked = btn.dataset.liked === 'true';
  btn.dataset.liked = (!liked).toString();
  btn.textContent = !liked ? '❤️ Liked' : '🤍 Like';
}

/* ---------- Dark mode demo (Section 4) ---------- */
function toggleDarkDemo(){
  const screen = document.getElementById('darkDemoScreen');
  const text = document.getElementById('darkDemoText');
  if(!screen || !text) return;
  const isDark = screen.dataset.dark === 'true';
  screen.dataset.dark = (!isDark).toString();
  screen.style.background = !isDark ? '#0f1115' : '#fbf9f4';
  text.style.color = !isDark ? '#eceaf0' : '#1a1d24';
}

/* ---------- Fade/scale demo (Section 6) ---------- */
function runFadeDemo(){
  const box = document.getElementById('fadeDemoBox');
  if(!box) return;
  box.style.opacity = '1';
  box.style.transform = 'scale(1.1)';
  setTimeout(()=>{ box.style.transform = 'scale(1)'; }, 250);
}
function resetFadeDemo(){
  const box = document.getElementById('fadeDemoBox');
  if(!box) return;
  box.style.opacity = '0';
  box.style.transform = 'scale(1)';
}

/* ---------- Supabase UI Tour demo (Section 11) ---------- */
const supabaseTabContent = {
  table: "<b>Table Editor</b><br><br>A spreadsheet-like grid view of every table in your database. Add columns, edit rows, and set constraints visually — every change here is really just running SQL behind the scenes.",
  sql: "<b>SQL Editor</b><br><br>Write and run raw SQL directly against your Postgres database. Useful for complex queries, migrations, or anything the visual Table Editor doesn't cover.",
  auth: "<b>Auth</b><br><br>Manage registered users, enable sign-in providers (email, Google, Apple), and configure security settings like email confirmation requirements.",
  storage: "<b>Storage</b><br><br>Upload and serve files — profile photos, attachments, videos — similar to S3-style object storage, with access rules that can mirror your database's RLS policies.",
  realtime: "<b>Realtime</b><br><br>Subscribe to live changes on a table. When a row is inserted, updated, or deleted, subscribed clients receive the change instantly, without polling."
};
function showSupabaseTab(tab){
  document.querySelectorAll('.supa-tab-btn').forEach(btn=>{
    const active = btn.dataset.tab === tab;
    btn.style.background = active ? 'rgba(255,255,255,0.12)' : 'transparent';
    btn.style.color = active ? '#fff' : '#9a9db0';
  });
  const content = document.getElementById('supabaseTabContent');
  if(content) content.innerHTML = supabaseTabContent[tab] || '';
}

/* ---------- Table builder demo (Section 11) ---------- */
let tableBuilderCols = [{ name: 'id', type: 'uuid primary key default gen_random_uuid()' }];
function renderTableBuilder(){
  const list = document.getElementById('tableBuilderColumns');
  const sql = document.getElementById('tableBuilderSql');
  if(!list || !sql) return;
  list.innerHTML = tableBuilderCols.map(c =>
    '<div style="display:flex; justify-content:space-between; padding:6px 10px; background:var(--paper-dim); border-radius:6px; font-family:var(--font-mono); font-size:11.5px;"><span>'+c.name+'</span><span style="color:var(--text-mute);">'+c.type+'</span></div>'
  ).join('');
  const lines = tableBuilderCols.map((c,i) => '  ' + c.name + ' ' + c.type + (i < tableBuilderCols.length-1 ? ',' : ''));
  sql.querySelector('code').textContent = 'CREATE TABLE todos (\n' + lines.join('\n') + '\n);';
}
function addTableColumn(){
  const nameInput = document.getElementById('colNameInput');
  const typeInput = document.getElementById('colTypeInput');
  if(!nameInput.value.trim()) return;
  tableBuilderCols.push({ name: nameInput.value.trim(), type: typeInput.value });
  nameInput.value = '';
  renderTableBuilder();
}
function resetTableBuilder(){
  tableBuilderCols = [{ name: 'id', type: 'uuid primary key default gen_random_uuid()' }];
  renderTableBuilder();
}

/* ---------- CRUD simulator demo (Section 11) ---------- */
let crudRows = [
  { id: 1, text: 'Buy milk', done: false },
  { id: 2, text: 'Write course notes', done: true },
];
let crudNextId = 3;
function crudRenderList(){
  const list = document.getElementById('crudDemoList');
  if(!list) return;
  list.innerHTML = crudRows.map(row =>
    '<div style="display:flex; align-items:center; gap:8px; background:#f2f0ea; border-radius:8px; padding:8px 10px;">' +
      '<input type="checkbox" '+(row.done?'checked':'')+' onchange="crudToggleRow('+row.id+')">' +
      '<span style="flex:1; font-family:\'Inter\',sans-serif; font-size:12px; color:#1a1d24; text-decoration:'+(row.done?'line-through':'none')+';">'+row.text+'</span>' +
      '<span style="cursor:pointer; color:#ff5a3c; font-size:13px;" onclick="crudDeleteRow('+row.id+')">✕</span>' +
    '</div>'
  ).join('');
}
function crudAddRow(){
  const input = document.getElementById('crudNewTodo');
  if(!input.value.trim()) return;
  crudRows.push({ id: crudNextId++, text: input.value.trim(), done: false });
  input.value = '';
  crudRenderList();
}
function crudToggleRow(id){
  const row = crudRows.find(r => r.id === id);
  if(row) row.done = !row.done;
  crudRenderList();
}
function crudDeleteRow(id){
  crudRows = crudRows.filter(r => r.id !== id);
  crudRenderList();
}

/* ---------- Build profile demo (Section 12) ---------- */
const buildProfileDetails = {
  development: "<b>Development:</b> Includes dev-client tooling, installs directly on your own registered device, used for day-to-day feature work with live JS reload.",
  preview: "<b>Preview:</b> Release-like build (no debug tooling), distributed via a shareable install link — perfect for QA and stakeholder review before a real release.",
  production: "<b>Production:</b> The final, store-ready artifact submitted to the App Store or Play Store, typically with autoIncrement enabled for its build number."
};
function showBuildProfile(profile){
  document.querySelectorAll('.build-profile-btn').forEach(btn=>{
    const active = btn.dataset.profile === profile;
    btn.style.borderColor = active ? 'var(--coral)' : 'var(--line)';
    btn.style.background = active ? 'var(--coral-dim)' : 'var(--card)';
    btn.style.color = active ? 'var(--coral)' : 'var(--text)';
  });
  const detail = document.getElementById('buildProfileDetail');
  if(detail) detail.innerHTML = buildProfileDetails[profile];
}

/* ---------- Build pipeline animation (Section 12) ---------- */
const pipelineDescriptions = [
  "Your build request is queued on EAS Build's servers, waiting for a free machine.",
  "A fresh build machine installs your project's npm dependencies.",
  'Native iOS/Android code is compiled from your JS and native project files.',
  'The compiled app is cryptographically signed with your credentials.',
  'A downloadable, installable build artifact is ready — for a device, or app store submission.'
];
function runBuildPipeline(){
  const stages = document.querySelectorAll('.pipeline-stage');
  const desc = document.getElementById('buildPipelineDescription');
  const btn = document.getElementById('buildPipelineBtn');
  if(!stages.length) return;
  btn.disabled = true;
  btn.textContent = 'Building…';
  stages.forEach(s => { s.style.background = 'var(--card)'; s.style.borderColor = 'var(--line)'; s.style.color = 'var(--text)'; });
  let i = 0;
  function step(){
    if(i > 0) stages[i-1].style.background = 'var(--teal-dim)';
    if(i > 0) stages[i-1].style.borderColor = 'var(--teal)';
    if(i < stages.length){
      stages[i].style.background = 'var(--coral-dim)';
      stages[i].style.borderColor = 'var(--coral)';
      desc.textContent = pipelineDescriptions[i];
      i++;
      setTimeout(step, 900);
    } else {
      btn.disabled = false;
      btn.textContent = '▶ Start build';
    }
  }
  step();
}

/* ---------- Version bump demo (Section 12) ---------- */
let versionDemoNum = 12;
function triggerVersionBump(){
  versionDemoNum++;
  const el = document.getElementById('versionDemoNumber');
  if(el){
    el.textContent = versionDemoNum;
    el.style.transform = 'scale(1.3)';
    setTimeout(()=>{ el.style.transform = 'scale(1)'; }, 200);
  }
}

/* ---------- App Store submission pipeline (Section 13) ---------- */
const appStoreDescriptions = [
  'Your production build is uploaded to App Store Connect on your behalf.',
  "Apple's servers process the binary — checking format, extracting metadata.",
  'Your submission sits in the review queue until an Apple reviewer is available.',
  'A human (or automated) reviewer actually tests and evaluates your app.',
  'Approved! The app is live and available for download on the App Store.'
];
function runAppStorePipeline(){
  const stages = document.querySelectorAll('.as-stage');
  const desc = document.getElementById('appStoreDescription');
  const btn = document.getElementById('appStoreBtn');
  if(!stages.length) return;
  btn.disabled = true;
  btn.textContent = 'Submitting…';
  stages.forEach(s => { s.style.background = 'var(--card)'; s.style.borderColor = 'var(--line)'; });
  let i = 0;
  function step(){
    if(i > 0){ stages[i-1].style.background = 'var(--teal-dim)'; stages[i-1].style.borderColor = 'var(--teal)'; }
    if(i < stages.length){
      stages[i].style.background = 'var(--coral-dim)';
      stages[i].style.borderColor = 'var(--coral)';
      desc.textContent = appStoreDescriptions[i];
      i++;
      setTimeout(step, 900);
    } else {
      btn.disabled = false;
      btn.textContent = '▶ Run eas submit';
    }
  }
  step();
}

/* ---------- Google Play track demo (Section 13) ---------- */
const playTrackDetails = {
  internal: "<b>Internal testing:</b> Up to 100 hand-picked testers, updates appear almost instantly, no Google review required — the fastest feedback loop.",
  closed: "<b>Closed testing:</b> Specific groups or email lists you invite, with a lighter review than full production.",
  open: "<b>Open testing:</b> Anyone can opt in via a public link, subject to Google's full review process.",
  production: "<b>Production:</b> All Play Store users, released either fully or via a staged rollout percentage."
};
function showPlayTrack(track){
  document.querySelectorAll('.play-track-btn').forEach(btn=>{
    const active = btn.dataset.track === track;
    btn.style.borderColor = active ? 'var(--coral)' : 'var(--line)';
    btn.style.background = active ? 'var(--coral-dim)' : 'var(--card)';
    btn.style.color = active ? 'var(--coral)' : 'var(--text)';
  });
  const detail = document.getElementById('playTrackDetail');
  if(detail) detail.innerHTML = playTrackDetails[track];
}
function updateRolloutDemo(val){
  document.getElementById('rolloutPct').textContent = val + '%';
  const explain = document.getElementById('rolloutExplain');
  if(val == 0){
    explain.textContent = 'At 0%, no users receive the new version yet — the rollout is effectively paused.';
  } else if(val == 100){
    explain.textContent = 'At 100%, every user updating now gets the new version — the full rollout is complete.';
  } else {
    explain.textContent = '~' + val + ' out of every 100 users updating right now get the new version; the rest stay on the previous one until you increase the percentage.';
  }
}

/* ---------- EAS Update publish animation (Section 14) ---------- */
function runUpdatePublish(){
  const source = document.getElementById('updateSourceBox');
  const server = document.getElementById('updateServerBox');
  const devices = document.querySelectorAll('.update-device');
  const status = document.getElementById('updatePublishStatus');
  const btn = document.getElementById('updatePublishBtn');
  btn.disabled = true;
  btn.textContent = 'Publishing…';
  devices.forEach(d => d.style.opacity = '0.3');
  source.style.borderColor = 'var(--coral)';
  status.textContent = 'Bundling JS and assets…';
  setTimeout(()=>{
    server.style.borderColor = 'var(--coral)';
    status.textContent = 'Uploaded to EAS Update servers.';
    setTimeout(()=>{
      let i = 0;
      const interval = setInterval(()=>{
        if(i < devices.length){
          devices[i].style.opacity = '1';
          i++;
        } else {
          clearInterval(interval);
          status.textContent = 'All connected devices will receive this on their next cold start.';
          btn.disabled = false;
          btn.textContent = '▶ Publish update';
          source.style.borderColor = 'var(--line)';
          server.style.borderColor = 'var(--line)';
        }
      }, 500);
    }, 700);
  }, 700);
}

/* ---------- Update history / revert demo (Section 14) ---------- */
let updateHistory = [
  { id: 'grp_003', message: 'Fix checkout crash', date: 'Today', current: true },
  { id: 'grp_002', message: 'Add dark mode toggle', date: '3 days ago', current: false },
  { id: 'grp_001', message: 'Initial release update', date: '1 week ago', current: false },
];
function renderUpdateHistory(){
  const list = document.getElementById('updateHistoryList');
  if(!list) return;
  list.innerHTML = updateHistory.map(u =>
    '<div style="display:flex; align-items:center; justify-content:space-between; gap:10px; padding:12px 14px; border-radius:10px; border:1px solid '+(u.current?'var(--teal)':'var(--line)')+'; background:'+(u.current?'var(--teal-dim)':'var(--card)')+';">' +
      '<div><div style="font-family:var(--font-mono); font-size:11px; color:var(--text-mute);">'+u.id+' · '+u.date+(u.current?' · <b style="color:var(--teal);">CURRENT</b>':'')+'</div>' +
      '<div style="font-size:13px; color:var(--text); margin-top:2px;">'+u.message+'</div></div>' +
      (u.current ? '' : '<button class="demo-btn ghost update-revert-btn" style="white-space:nowrap;" data-revert-id="'+u.id+'">Revert to this</button>') +
    '</div>'
  ).join('');
  list.querySelectorAll('.update-revert-btn').forEach(btn=>{
    btn.addEventListener('click', () => revertToUpdate(btn.dataset.revertId));
  });
}
function revertToUpdate(id){
  const target = updateHistory.find(u => u.id === id);
  if(!target) return;
  updateHistory.forEach(u => u.current = false);
  updateHistory.unshift({ id: 'grp_00' + (updateHistory.length+1), message: 'Reverted to: ' + target.message, date: 'Just now', current: true });
  renderUpdateHistory();
}

/* ---------- Workflow trigger demo (Section 15, Topic 1) ---------- */
function runWorkflowTrigger(){
  const jobs = document.querySelectorAll('#workflowJobsRow .wf-job');
  const status = document.getElementById('workflowStatus');
  const btn = document.getElementById('workflowTriggerBtn');
  if(!jobs.length) return;
  btn.disabled = true;
  jobs.forEach(j => { j.style.background = 'var(--card)'; j.style.borderColor = 'var(--line)'; });
  const messages = ['Push to main detected by EAS Workflows.', 'Running job: build_ios (profile: preview)…'];
  let i = 0;
  function step(){
    if(i > 0){ jobs[i-1].style.background = 'var(--teal-dim)'; jobs[i-1].style.borderColor = 'var(--teal)'; }
    if(i < jobs.length){
      jobs[i].style.background = 'var(--coral-dim)';
      jobs[i].style.borderColor = 'var(--coral)';
      status.textContent = messages[i];
      i++;
      setTimeout(step, 1000);
    } else {
      status.textContent = 'Workflow complete — build_ios finished successfully.';
      btn.disabled = false;
    }
  }
  step();
}

/* ---------- Maestro workflow demo (Section 15, Topic 2) ---------- */
function runMaestroWorkflow(){
  const jobs = document.querySelectorAll('#maestroWfRow .mwf-job');
  const status = document.getElementById('maestroWfStatus');
  const btn = document.getElementById('maestroWfBtn');
  if(!jobs.length) return;
  btn.disabled = true;
  jobs.forEach(j => { j.style.background = 'var(--card)'; j.style.borderColor = 'var(--line)'; });
  const messages = [
    'Pull request opened — building a preview profile app for testing.',
    'Installing the fresh build onto a cloud test device.',
    'Running .maestro/login-flow.yaml against the installed app.',
    'All Maestro assertions passed — safe to merge.'
  ];
  let i = 0;
  function step(){
    if(i > 0){ jobs[i-1].style.background = 'var(--teal-dim)'; jobs[i-1].style.borderColor = 'var(--teal)'; }
    if(i < jobs.length){
      jobs[i].style.background = 'var(--coral-dim)';
      jobs[i].style.borderColor = 'var(--coral)';
      status.textContent = messages[i];
      i++;
      setTimeout(step, 1000);
    } else {
      btn.disabled = false;
    }
  }
  step();
}

/* ---------- Release workflow demo (Section 15, Topic 3) ---------- */
function runReleaseWorkflow(){
  const btn = document.getElementById('releaseWfBtn');
  const status = document.getElementById('releaseWfStatus');
  btn.disabled = true;
  status.textContent = 'Tag v2.3.0 pushed — starting both platform chains in parallel…';
  document.querySelectorAll('.rel-job').forEach(j => { j.style.background = 'var(--card)'; j.style.borderColor = 'var(--line)'; });

  function animateChain(chainName, onDone){
    const jobs = document.querySelectorAll('.rel-job[data-chain="' + chainName + '"]');
    let i = 0;
    function step(){
      if(i > 0){ jobs[i-1].style.background = 'var(--teal-dim)'; jobs[i-1].style.borderColor = 'var(--teal)'; }
      if(i < jobs.length){
        jobs[i].style.background = 'var(--coral-dim)';
        jobs[i].style.borderColor = 'var(--coral)';
        i++;
        setTimeout(step, 1100);
      } else if(onDone){
        onDone();
      }
    }
    step();
  }

  let doneCount = 0;
  function checkAllDone(){
    doneCount++;
    if(doneCount === 2){
      status.textContent = 'Both platforms submitted — release v2.3.0 is on its way to review.';
      btn.disabled = false;
    }
  }
  animateChain('ios', checkAllDone);
  animateChain('android', checkAllDone);
}

/* ---------- Store submission checklists (Section 16) ---------- */
const appStoreItemsList = [
  'App icon (1024×1024, no transparency)',
  'Screenshots for all required device sizes',
  'App description and keywords written',
  'Privacy policy URL added',
  'App Privacy "nutrition label" completed',
  'Demo account provided, if login is required',
  'Reviewed against App Store Review Guidelines'
];
const playStoreItemsList = [
  'App icon and feature graphic (1024×500)',
  'Screenshots for phone and tablet',
  'Short and full store description written',
  'Data safety form completed',
  'Content rating questionnaire completed',
  'Privacy policy URL added',
  'Target API level requirement met'
];
function buildChecklist(containerId, items, progressId, fillId){
  const container = document.getElementById(containerId);
  if(!container) return;
  container.innerHTML = items.map((text,i) =>
    '<label style="display:flex; align-items:center; gap:10px; padding:8px 4px; font-size:13px; cursor:pointer; color:var(--text);">' +
      '<input type="checkbox" class="checklist-cb" data-idx="'+i+'">' +
      '<span>'+text+'</span>' +
    '</label>'
  ).join('');
  container.querySelectorAll('.checklist-cb').forEach(cb=>{
    cb.addEventListener('change', () => updateChecklistProgress(containerId, items.length, progressId, fillId));
  });
}
function updateChecklistProgress(containerId, total, progressId, fillId){
  const container = document.getElementById(containerId);
  const checked = container.querySelectorAll('.checklist-cb:checked').length;
  document.getElementById(progressId).textContent = checked + ' / ' + total;
  document.getElementById(fillId).style.width = Math.round((checked/total)*100) + '%';
}

/* ---------- Payment decision demo (Section 17, Topic 1) ---------- */
const paymentAnswers = {
  digital: "<b>Use In-App Purchase (RevenueCat).</b><br><br>Since this unlocks features or content inside the app, Apple and Google require their own purchase systems — Stripe isn't allowed here, regardless of preference.",
  physical: "<b>Use Stripe.</b><br><br>Physical goods are exempt from in-app purchase requirements. Stripe gives you full payment method flexibility with no platform commission.",
  service: "<b>Use Stripe.</b><br><br>Real-world services consumed outside the app (rides, bookings, deliveries) are also typically exempt — this is exactly the case Stripe was built for."
};
function showPaymentAnswer(answer){
  document.querySelectorAll('.pay-decision-btn').forEach(btn=>{
    const active = btn.dataset.answer === answer;
    btn.style.borderColor = active ? 'var(--coral)' : 'var(--line)';
    btn.style.background = active ? 'var(--coral-dim)' : 'var(--paper)';
  });
  const box = document.getElementById('paymentAnswerBox');
  if(box) box.innerHTML = paymentAnswers[answer];
}

/* ---------- In-app purchase simulator (Section 17, Topic 2) ---------- */
function runIapDemo(){
  const screen = document.getElementById('iapDemoScreen');
  const status = document.getElementById('iapDemoStatus');
  if(!screen || !status) return;
  const steps = [
    'Opening native purchase sheet (StoreKit / Billing)…',
    'Waiting for Face ID / fingerprint confirmation…',
    'Sending receipt to RevenueCat for verification…',
    'Entitlement "premium" is now active for this user.'
  ];
  let i = 0;
  function step(){
    if(i < steps.length){
      status.textContent = steps[i];
      i++;
      setTimeout(step, 900);
    } else {
      screen.innerHTML =
        '<div style="font-size:28px;">✅</div>' +
        '<div style="font-family:\'Inter\',sans-serif; font-size:13px; font-weight:600; color:#1a1d24;">Premium Unlocked</div>' +
        '<div style="font-family:\'Inter\',sans-serif; font-size:11px; color:#5c6070;">Ad-free, unlimited exports</div>';
    }
  }
  step();
}

/* ---------- Native module architecture layers (Section 18, Topic 1) ---------- */
const nativeLayerDetails = {
  js: "<b>1. JS call:</b> Your code calls something like <code>await Flashlight.toggle()</code> — an ordinary-looking async function call, no different from calling any other JS function.",
  jsi: "<b>2. JSI:</b> The call and its arguments pass directly to native code via the JavaScript Interface, without JSON serialization or the old bridge's overhead.",
  module: "<b>3. Expo Module:</b> Your actual Swift (iOS) or Kotlin (Android) function runs, registered and exposed through the Expo Modules API.",
  os: "<b>4. OS API:</b> The native function calls a real platform capability — here, AVFoundation's torch control — something no amount of pure JS could access directly."
};
function showNativeLayer(layer){
  document.querySelectorAll('.nm-layer-btn').forEach(btn=>{
    const active = btn.dataset.layer === layer;
    btn.style.borderColor = active ? 'var(--coral)' : 'var(--line)';
    btn.style.background = active ? 'var(--coral-dim)' : 'var(--card)';
    btn.style.color = active ? 'var(--coral)' : 'var(--text)';
  });
  const detail = document.getElementById('nativeLayerDetail');
  if(detail) detail.innerHTML = nativeLayerDetails[layer];
}

/* ---------- Native module creation pipeline (Section 18, Topic 2) ---------- */
const nmCreateDescriptions = [
  'Scaffolding a new local module with create-expo-module.',
  'Writing the iOS implementation in Swift using ExpoModulesCore.',
  'Writing the Android implementation in Kotlin, mirroring the same API shape.',
  "Expo's build tooling generates the JS/TS binding automatically from your module definition.",
  'Calling Flashlight.toggle() from your app — indistinguishable from any other async function.'
];
function runNativeModuleCreation(){
  const stages = document.querySelectorAll('#nmCreateRow .nmc-stage');
  const status = document.getElementById('nmCreateStatus');
  const btn = document.getElementById('nmCreateBtn');
  if(!stages.length) return;
  btn.disabled = true;
  stages.forEach(s => { s.style.background = 'var(--card)'; s.style.borderColor = 'var(--line)'; });
  let i = 0;
  function step(){
    if(i > 0){ stages[i-1].style.background = 'var(--teal-dim)'; stages[i-1].style.borderColor = 'var(--teal)'; }
    if(i < stages.length){
      stages[i].style.background = 'var(--coral-dim)';
      stages[i].style.borderColor = 'var(--coral)';
      status.textContent = nmCreateDescriptions[i];
      i++;
      setTimeout(step, 900);
    } else {
      btn.disabled = false;
    }
  }
  step();
}

/* ---------- Native module decision checklist (Section 18, Topic 4) ---------- */
const nmDecisionQuestions = [
  'No existing Expo SDK package or community library already does this',
  'The capability genuinely requires a platform API, not just custom UI',
  "You're prepared to maintain both Swift and Kotlin code long-term",
  "You've confirmed this can't be solved another way"
];
function renderNmDecision(){
  const container = document.getElementById('nmDecisionItems');
  if(!container) return;
  container.innerHTML = nmDecisionQuestions.map((text,i) =>
    '<label style="display:flex; align-items:center; gap:10px; padding:8px 4px; font-size:13px; cursor:pointer; color:var(--text);">' +
      '<input type="checkbox" class="nm-decision-cb" data-idx="'+i+'">' +
      '<span>'+text+'</span>' +
    '</label>'
  ).join('');
  container.querySelectorAll('.nm-decision-cb').forEach(cb=>{
    cb.addEventListener('change', updateNmDecisionResult);
  });
}
function updateNmDecisionResult(){
  const container = document.getElementById('nmDecisionItems');
  const result = document.getElementById('nmDecisionResult');
  if(!container || !result) return;
  const checked = container.querySelectorAll('.nm-decision-cb:checked').length;
  if(checked === nmDecisionQuestions.length){
    result.innerHTML = '<b style="color:var(--teal);">Looks justified.</b> All boxes checked — a custom native module is a reasonable path here.';
  } else if(checked === 0){
    result.textContent = 'Check items above that are true for your situation.';
  } else {
    result.innerHTML = '<b style="color:var(--coral);">Not quite yet.</b> ' + (nmDecisionQuestions.length - checked) + ' item(s) unchecked — worth reconsidering an existing library or Expo UI component first.';
  }
}

/* ---------- Widget size preview (Section 19, Topic 1) ---------- */
const widgetSizeConfig = {
  small: {
    w: 150, h: 150,
    html: '<div style="font-size:22px;">☀️</div><div style="font-size:11px; margin-top:6px;">72°F</div>',
    desc: 'Small: one glanceable stat — a single piece of information, no interaction.'
  },
  medium: {
    w: 320, h: 150,
    html: '<div style="font-size:22px;">☀️</div><div style="font-size:11px; margin-top:6px;">72°F · High 78° / Low 65°</div>',
    desc: 'Medium: room for a couple of related data points, still fully static.'
  },
  large: {
    w: 320, h: 320,
    html: '<div style="font-size:22px;">☀️</div><div style="font-size:11px; margin-top:6px;">72°F today</div><div style="font-size:10px; margin-top:10px; opacity:.8;">Mon 75° · Tue 71° · Wed 68°</div>',
    desc: 'Large: enough space for a small multi-item layout, like a short forecast list.'
  }
};
function showWidgetSize(size){
  document.querySelectorAll('.widget-size-btn').forEach(btn=>{
    const active = btn.dataset.size === size;
    btn.style.borderColor = active ? 'var(--coral)' : 'var(--line)';
    btn.style.background = active ? 'var(--coral-dim)' : 'var(--card)';
    btn.style.color = active ? 'var(--coral)' : 'var(--text)';
  });
  const cfg = widgetSizeConfig[size];
  const box = document.getElementById('widgetPreviewBox');
  const desc = document.getElementById('widgetSizeDescription');
  if(box){ box.style.width = cfg.w + 'px'; box.style.height = cfg.h + 'px'; box.innerHTML = cfg.html; }
  if(desc) desc.textContent = cfg.desc;
}

/* ---------- SDK upgrade pipeline (Section 19, Topic 2) ---------- */
const upgradeDescriptions = [
  "Reading the new SDK version's changelog for breaking changes relative to your current version.",
  'Running npx expo install expo@latest to bump the core package.',
  'Running npx expo install --fix to align every dependency to compatible versions.',
  'Rebuilding your development build, since native code has changed.',
  'Testing critical flows thoroughly before rolling the upgrade out further.'
];
function runUpgradePipeline(){
  const stages = document.querySelectorAll('#upgradeStagesRow .upg-stage');
  const status = document.getElementById('upgradeStatus');
  const btn = document.getElementById('upgradeBtn');
  if(!stages.length) return;
  btn.disabled = true;
  stages.forEach(s => { s.style.background = 'var(--card)'; s.style.borderColor = 'var(--line)'; });
  let i = 0;
  function step(){
    if(i > 0){ stages[i-1].style.background = 'var(--teal-dim)'; stages[i-1].style.borderColor = 'var(--teal)'; }
    if(i < stages.length){
      stages[i].style.background = 'var(--coral-dim)';
      stages[i].style.borderColor = 'var(--coral)';
      status.textContent = upgradeDescriptions[i];
      i++;
      setTimeout(step, 900);
    } else {
      btn.disabled = false;
    }
  }
  step();
}

/* re-run progress calc now that topics exist */
renderTableBuilder();
crudRenderList();
renderUpdateHistory();
buildChecklist('appStoreChecklistItems', appStoreItemsList, 'appStoreProgress', 'appStoreProgressFill');
buildChecklist('playStoreChecklistItems', playStoreItemsList, 'playStoreProgress', 'playStoreProgressFill');
renderNmDecision();
window.addEventListener('load', updateProgress);
setTimeout(updateProgress, 300);


