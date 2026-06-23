const $ = (q, root=document) => root.querySelector(q);
const $$ = (q, root=document) => Array.from(root.querySelectorAll(q));
const todayKey = () => new Date().toISOString().slice(0,10);
const storage = {
  get(key, fallback){ try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; } },
  set(key, value){ localStorage.setItem(key, JSON.stringify(value)); },
  remove(key){ localStorage.removeItem(key); }
};

const APP_VERSION = 'v6.0-real-smart-scroll';
const defaultReminders = [
  {id:'rise', time:'07:30', title:'Aelin: rise, fireheart', body:'Water, curtains, bed, oath. Begin before you feel ready.'},
  {id:'plan', time:'07:40', title:'Jude: choose the strategy', body:'Pick the top 3 moves. Your day needs a commander.'},
  {id:'body', time:'08:00', title:'Poppy: body is sacred', body:'Today’s workout or the low-energy swap. Body first, shame never.'},
  {id:'armor', time:'08:25', title:'Armor on', body:'Choose one intentional outfit detail from your court.'},
  {id:'learn', time:'11:30', title:'Smart scroll', body:'Open one learning card before opening the infinite scroll.'},
  {id:'meal', time:'12:30', title:'Court meal', body:'Protein + carbs + colour + water. Stability is magic.'},
  {id:'strategy', time:'15:30', title:'Jude: next smart move', body:'What is the next move your future self will respect?'},
  {id:'train', time:'18:30', title:'Training montage', body:'Workout, walk, tidy, errands, or life admin sprint.'},
  {id:'night', time:'21:30', title:'Night Court reset', body:'10-minute tidy, shower/skincare, tomorrow outfit.'},
  {id:'curfew', time:'22:30', title:'Phone curfew', body:'Read. Journal three wins. Let the realm go dark.'}
];

const timeline = [
  {w:1,title:'Week 1 — Foundation of the Court',desc:'Wake, hydrate, light, 10-minute movement, 10-minute room reset. No judging, only observing.'},
  {w:2,title:'Week 2 — Body and Realm',desc:'Train 3 times, walk 4 times, dress with intention, eat stabilizing meals, reclaim your space.'},
  {w:3,title:'Week 3 — Strategy and Courage',desc:'Main quest before phone, boundaries, brave messages, admin magic, and deep work sprints.'},
  {w:4,title:'Week 4 — Embodiment and Coronation',desc:'Become visible to yourself. Finish something. Choose what continues after day 30.'}
];

const questLibrary = {
  foundation: [
    ['🔥','Aelin proof','Open curtains, drink water, make your bed.'],
    ['🗡️','Jude proof','Write your top 3 moves for the day.'],
    ['🌿','Poppy proof','Complete today’s workout or low-energy swap.'],
    ['📚','Smart scroll','Learn one card before social media.'],
    ['✨','Night proof','10-minute reset before bed.']
  ],
  body: [
    ['🔥','Training proof','Complete today’s workout or a 25-minute walk.'],
    ['🍽️','Court meal','Eat one stabilizing meal: protein + carbs + colour.'],
    ['👗','Armor proof','Wear one intentional detail.'],
    ['🧺','Realm reset','Clean one visible surface or laundry zone.'],
    ['📖','Reading ritual','Read 15 minutes without scrolling.']
  ],
  strategy: [
    ['🗡️','First strike','Do the main quest before social media.'],
    ['👑','Boundary','Say no, delay, mute, unfollow, or protect your time.'],
    ['📜','Admin spell','Handle one avoided task.'],
    ['🧠','Thought alchemy','Rewrite one spiral into a next action.'],
    ['🏹','Brave message','Ask, apply, clarify, apologize, or initiate.']
  ],
  embodiment: [
    ['👗','Armor','Create or log one outfit.'],
    ['🕯️','Atmosphere','Make your room/desk beautiful for free.'],
    ['📚','Skill proof','Study/learn for 25 minutes.'],
    ['🌌','Solo adventure','Take yourself outside like a heroine between chapters.'],
    ['👑','Coronation note','Write one thing you are no longer available for.']
  ]
};

const vibes = {
  Aelin:{emoji:'🔥', words:'fireheart discipline', armor:'black/cream base, gold detail, sharp shoes, one bold lip or scent', mantra:'Begin before you feel ready.'},
  Feyre:{emoji:'🌙', words:'soft power and artistry', armor:'soft layer, silver/blue/cream, glowy skin, braid or scarf', mantra:'Healing is also work.'},
  Poppy:{emoji:'🌿', words:'curiosity and body trust', armor:'ivory/white detail, romantic sleeve, balm, comfortable structure', mantra:'Ask the question. Want the life.'},
  Jude:{emoji:'🗡️', words:'strategy and boundaries', armor:'dark green/black, blazer or belt, rings, clean lines', mantra:'Be harder to move.'},
  Academic:{emoji:'📜', words:'library heir energy', armor:'knit, collar, loafers/boots, tote, neat hair', mantra:'Study like knowledge is a weapon.'},
  Cozy:{emoji:'🕯️', words:'hearth magic', armor:'soft sweater, leggings/jeans, warm socks, tidy bun', mantra:'Comfort can be preparation.'},
  'Dark Fae':{emoji:'🦇', words:'dangerous elegance', armor:'black base, metal jewelry, smoky eye, leather detail', mantra:'Mystery is allowed.'},
  'Soft Court':{emoji:'🩰', words:'romantic softness', armor:'cream/pink, ribbons, pearls, soft curls, delicate jewelry', mantra:'Tender is not powerless.'}
};

const trainingPlan = [
  {day:1, name:'Lower Realm + Core', court:'Aelin', purpose:'Strength foundation: legs, glutes, core, confidence.', warmup:'5 min: march, hip circles, bodyweight good mornings, ankle rolls.', moves:[['Squats','10–15 reps'],['Reverse lunges','8–12 / leg'],['Glute bridges','12–20 reps'],['Calf raises','15–25 reps'],['Dead bug','8–12 / side']], finisher:'6 min brisk walk, stairs, or dance.', low:'2 rounds: 8 squats, 8 glute bridges, 20 sec wall sit, 1 minute walk.'},
  {day:2, name:'Scholar Walk + Mobility', court:'Poppy', purpose:'Cardio without punishment. Curiosity walk + soft joints.', warmup:'Put shoes on. Choose a playlist or silence.', moves:[['Brisk walk','25–45 min'],['Neck/shoulder release','2 min'],['Hip flexor stretch','45 sec / side'],['Hamstring stretch','45 sec / side'],['Child’s pose or forward fold','1 min']], finisher:'Write one thing you noticed outside.', low:'Walk 7 minutes or do 5 minutes of mobility beside your bed.'},
  {day:3, name:'Upper Court + Posture', court:'Jude', purpose:'Back, arms, posture, “I can hold myself” energy.', warmup:'5 min: arm circles, wall slides, scapula squeezes, wrist circles.', moves:[['Incline pushups','6–12 reps'],['Backpack rows','10–15 reps'],['Shoulder taps','8–12 / side'],['Triceps dips on chair','6–12 reps'],['Plank','20–45 sec']], finisher:'2 min tall posture walk around the room.', low:'1 round: 5 incline pushups, 10 backpack rows, 20 sec plank.'},
  {day:4, name:'Feyre Recovery + Deep Stretch', court:'Feyre', purpose:'Nervous-system reset. Still training, softer spell.', warmup:'Dim lights or play slow music.', moves:[['Cat-cow','8 slow reps'],['Thread the needle','6 / side'],['Low lunge','45 sec / side'],['Figure-four stretch','45 sec / side'],['Box breathing','4 cycles']], finisher:'Shower or skincare as a transition ritual.', low:'Lie down, one hand on chest, one on belly: 10 slow breaths.'},
  {day:5, name:'Full-Body Fire Circuit', court:'Aelin', purpose:'Sweat, strength, main-character montage.', warmup:'5 min: march, squats, arm circles, easy jumping jacks.', moves:[['Squat to reach','10–15 reps'],['Incline pushups','6–12 reps'],['Reverse lunges','8–12 / leg'],['Backpack rows','10–15 reps'],['Mountain climbers or step-outs','20–40 sec']], finisher:'3 rounds: 20 sec fast / 40 sec easy.', low:'Set a 10-min timer: alternate 1 min walk + 5 squats.'},
  {day:6, name:'Realm Reset Walk', court:'Jude', purpose:'Long gentle cardio + life reset. Clean realm, clear mind.', warmup:'Start with one bag, one bottle of water, one playlist.', moves:[['Walk','35–60 min'],['Laundry or surfaces','10 min'],['Tomorrow outfit','5 min'],['Meal idea chosen','2 min'],['One message sent','2 min']], finisher:'Make your space slightly more beautiful.', low:'10-minute tidy + 5-minute walk outside or near a window.'},
  {day:0, name:'Coronation Recovery + Planning', court:'Feyre', purpose:'Rest counts. Plan the week like a queen, not a machine.', warmup:'Tea/water. Sit somewhere clean if possible.', moves:[['Gentle stretch','10 min'],['Review past week','5 min'],['Choose 3 priorities','5 min'],['Plan workouts','3 min'],['Prepare one outfit','5 min']], finisher:'Read without your phone for 15 minutes.', low:'Write tomorrow’s first tiny action on a note.'}
];
const weekProgression = {
  1:{rounds:'2 rounds', rest:'60–90 sec rest', rule:'Learn the moves. Stop with energy left.'},
  2:{rounds:'3 rounds', rest:'60 sec rest', rule:'Add reps before adding intensity.'},
  3:{rounds:'3 rounds + tempo', rest:'45–60 sec rest', rule:'Slow lowering: 3 seconds down on squats/pushups.'},
  4:{rounds:'4 rounds or harder variations', rest:'45 sec rest', rule:'Choose one: more reps, shorter rest, or harder version.'}
};

const meals = ['Eggs/tofu + toast + fruit','Tuna/chickpea bowl + bread','Pasta + protein + vegetables','Yogurt + granola + berries','Rice + chicken/beans + salad','Soup + bread + cheese/tofu','Wrap with hummus/egg/chicken + crunchy veg','Oats + banana + peanut butter or yogurt'];

const learningCards = [
  {cat:'Data spell', title:'Correlation is not causation', idea:'Two things moving together does not prove one caused the other. Ask: what third factor could explain both?', action:'Today, notice one “X caused Y” claim online and ask what evidence would prove it.'},
  {cat:'CBT skill', title:'Name the story', idea:'Your brain creates interpretations fast. Separating facts from story reduces the spell’s power.', action:'Write: “Fact: __. Story: __. Kinder truth: __.”'},
  {cat:'French/English power', title:'Precision makes confidence', idea:'Replace vague “I’m bad at this” with precise language: “I haven’t practiced this subskill yet.”', action:'Choose one skill and name the exact tiny subskill.'},
  {cat:'Style theory', title:'Contrast creates intention', idea:'Outfits often feel styled when they combine contrast: soft + sharp, fitted + loose, light + dark, plain + textured.', action:'Build one outfit with two contrasts.'},
  {cat:'Finance tiny gate', title:'The 24-hour spell', idea:'For non-essential purchases, waiting 24 hours turns impulse into choice.', action:'Put one wanted item on a wishlist instead of buying today.'},
  {cat:'Book craft', title:'A heroine is revealed by choice', idea:'Characters become iconic because they choose under pressure. Your lifestyle changes when you choose under friction.', action:'Where is the friction today? Pick one tiny courageous choice.'},
  {cat:'Data science', title:'Baseline before glow-up', idea:'A model needs a baseline; so does a life change. Measure before optimizing.', action:'Track sleep, movement, mood, and screen time for one day without judging.'},
  {cat:'Nervous system', title:'Longer exhale = downshift', idea:'Extending the exhale can help signal safety. It is not magic, but it is a body lever.', action:'Try 4 seconds in, 6 seconds out, six times.'},
  {cat:'Productivity', title:'Make the task physical', idea:'If a task is vague, make it visible: open the file, place the book, write the first line.', action:'Turn one abstract task into a physical next move.'},
  {cat:'Romantasy translation', title:'Steal the behavior, not the trauma', idea:'You do not need chaos to become powerful. Extract the heroine’s skill: courage, loyalty, strategy, tenderness.', action:'Pick a scene you love and translate it into one real action.'},
  {cat:'Body literacy', title:'Minimum effective movement', idea:'The best workout is not the hardest; it is the one you can repeat.', action:'Choose the low-energy swap before choosing nothing.'},
  {cat:'Social courage', title:'The brave message', idea:'A lot of life changes after one clear message: ask, clarify, apologize, invite, apply.', action:'Send one message you have delayed.'}
];

const learningLinks = [
  ['Khan Academy','Free lessons/practice for math, science, economics, history, and more.','https://www.khanacademy.org/'],
  ['freeCodeCamp','Free coding curriculum, projects, and certifications.','https://www.freecodecamp.org/'],
  ['OpenLearn','Free short courses from The Open University.','https://www.open.edu/openlearn/free-courses'],
  ['OpenAlex','Scholarly works, authors, institutions, topics and citations.','https://openalex.org/'],
  ['Crossref Metadata','Scholarly metadata lookup and DOI ecosystem.','https://www.crossref.org/'],
  ['arXiv','Preprints in physics, math, CS, statistics and more.','https://arxiv.org/'],
  ['Project Gutenberg','Public-domain ebooks and classics.','https://www.gutenberg.org/'],
  ['Hacker News','Tech/startup/project discovery. Use intentionally.','https://news.ycombinator.com/'],
  ['GitHub Explore','Find open-source projects and inspiration.','https://github.com/explore'],
  ['NHS CBT techniques','Structured self-help techniques for worries and unhelpful thoughts.','https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/self-help-cbt-techniques/'],
  ['CCI self-help workbooks','Free evidence-informed modules for anxiety, self-esteem, sleep and more.','https://www.cci.health.wa.gov.au/resources/looking-after-yourself'],
  ['Open Library','Search books with a free public-good library API/site.','https://openlibrary.org/']
];
const radarLinks = [
  ['Google News: romantasy','Broad latest news search.','https://news.google.com/search?q=romantasy'],
  ['Book Riot: romantasy','Book culture, lists, and reading recommendations.','https://bookriot.com/?s=romantasy'],
  ['Goodreads lists','Community lists and new-release discovery.','https://www.goodreads.com/search?q=romantasy'],
  ['Open Library search','Free book metadata search.','https://openlibrary.org/search?q=romantasy'],
  ['StoryGraph search','Mood-based book discovery/community.','https://app.thestorygraph.com/browse?search_term=romantasy'],
  ['TikTok search','For trends only: verify release dates elsewhere.','https://www.tiktok.com/search?q=romantasy%20books']
];

const agentDefs = [
  {id:'aelin', name:'Aelin Fireheart', emoji:'🔥', role:'bravery + execution', prompt:'You are my Aelin-inspired coach: direct, brave, warm, and action-oriented. Turn my situation into a 10-minute first move, a 30-minute brave move, and one line I can repeat when I want to quit.'},
  {id:'feyre', name:'Feyre Healer', emoji:'🌙', role:'healing + beauty', prompt:'You are my Feyre-inspired coach: gentle, creative, honest. Help me regulate, make my environment beautiful for free, and choose a soft-but-real next step.'},
  {id:'poppy', name:'Poppy Rebel', emoji:'🌿', role:'curiosity + body trust', prompt:'You are my Poppy-inspired coach: curious, embodied, freeing. Help me ask better questions, respect my body, and choose nourishment over punishment.'},
  {id:'jude', name:'Jude Strategist', emoji:'🗡️', role:'boundaries + strategy', prompt:'You are my Jude-inspired strategist: sharp, practical, unsentimental but caring. Give me the next 3 moves, the boundary I need, and the trap to avoid.'},
  {id:'stylist', name:'Court Stylist', emoji:'👗', role:'outfit builder', prompt:'You are my romantasy stylist. Build outfits from what I own, by vibe, weather, comfort, and occasion. Make it realistic, free, and confidence-giving.'},
  {id:'scholar', name:'Scholar Agent', emoji:'📚', role:'learning plan', prompt:'You are my learning agent. Turn my interests into a tiny daily curriculum with free resources, 10-minute tasks, and one way to prove I learned it.'}
];
let selectedMood = null;
let selectedAgent = 'aelin';
let currentLearnCard = null;
let smartFeedLoading = false;
let smartFeedObserver = null;
let notificationTimers = [];
let timerInterval = null;

function init(){
  storage.set('appVersion', APP_VERSION);
  setupTabs(); setupInstall(); registerSW(); initDB(); renderAll(); attachEvents(); scheduleNotificationTimers();
}
function renderAll(){ renderBriefing(); renderToday(); renderMood(); renderTraining(getWeek(getProgramDay())); renderLinks(); renderAgents(); renderAlchemy(); renderSavedLearn(); renderTBR(); renderReminderEditor(); renderCloset(); renderApiVault(); initSmartFeed(); }
function getProgramDay(){ let start = storage.get('startDate', null); if(!start){ start = todayKey(); storage.set('startDate', start); } const d0 = new Date(start+'T00:00:00'); const d1 = new Date(todayKey()+'T00:00:00'); return Math.min(30, Math.max(1, Math.floor((d1-d0)/86400000)+1)); }
function getWeek(day){ return Math.min(4, Math.ceil(day/7)); }
function questSetFor(day){ const w=getWeek(day); return w===1?questLibrary.foundation:w===2?questLibrary.body:w===3?questLibrary.strategy:questLibrary.embodiment; }
function getTodayWorkout(){ return trainingPlan.find(w=>w.day===new Date().getDay()); }
function getTodayVibe(){ return getTodayWorkout().court; }
function getCompletions(){ return storage.get('completions', {}); }
function setCompletions(c){ storage.set('completions', c); }

function renderBriefing(){
  const w = getTodayWorkout(); const vibe = vibes[w.court]; const meal = meals[new Date().getDate()%meals.length];
  $('#briefingTitle').textContent = `${vibe.emoji} ${w.court} day: ${w.name}`;
  $('#briefingText').textContent = `${w.purpose} Armor: ${vibe.armor}. Meal idea: ${meal}. Queen rule: ${vibe.mantra}`;
}
function renderToday(){
  const day = getProgramDay(), week = getWeek(day), key = todayKey();
  $('#programDay').textContent = day; $('#dayTitle').textContent = timeline[week-1].title.replace(`Week ${week} — `,''); $('#dayDescription').textContent = timeline[week-1].desc;
  const list = $('#todayQuests'); list.innerHTML = ''; const completions = getCompletions();
  questSetFor(day).forEach((q,i)=>{ const node = $('#questTemplate').content.cloneNode(true); const input = $('input', node); const id = `${key}-${i}`; input.checked = !!completions[id]; input.addEventListener('change',()=>{ const c=getCompletions(); c[id]=input.checked; setCompletions(c); updateProgress(); }); $('.quest-icon',node).textContent = q[0]; $('.quest-title',node).textContent=q[1]; $('.quest-detail',node).textContent=q[2]; list.appendChild(node); });
  renderTodayWorkout(); updateProgress();
}
function updateProgress(){
  const key = todayKey(); const completions = getCompletions(); const total = questSetFor(getProgramDay()).length;
  const done = Object.entries(completions).filter(([k,v])=>k.startsWith(key+'-') && v).length;
  $('#progressBar').style.width = `${(done/total)*100}%`;
  const xp = Object.values(completions).filter(Boolean).length * 10 + storage.get('workoutsDone',[]).length*20 + storage.get('learnedCards',[]).length*5;
  $('#xp').textContent = xp; $('#level').textContent = Math.floor(xp/120)+1; $('#streak').textContent = calculateStreak();
}
function calculateStreak(){ const completions=getCompletions(); let streak=0; for(let offset=0; offset<60; offset++){ const d=new Date(); d.setDate(d.getDate()-offset); const key=d.toISOString().slice(0,10); const dayDone=Object.keys(completions).some(k=>k.startsWith(key+'-')&&completions[k]); if(dayDone) streak++; else if(offset>0) break; } return streak; }
function renderTodayWorkout(){
  const w = getTodayWorkout(); const week = getWeek(getProgramDay()); const prog = weekProgression[week]; const vibe = vibes[w.court];
  $('#todayWorkoutName').textContent = `${vibe.emoji} ${w.name}`; $('#todayWorkoutPurpose').textContent = `${w.purpose} ${prog.rounds}. ${prog.rest}. ${prog.rule}`;
  $('#todayWorkoutSteps').innerHTML = `<div class="mini-item"><strong>Warm-up</strong><br><span class="muted">${w.warmup}</span></div>` + w.moves.map(m=>`<div class="mini-item"><strong>${m[0]}</strong><br><span class="muted">${m[1]}</span></div>`).join('') + `<div class="mini-item"><strong>Finisher</strong><br><span class="muted">${w.finisher}</span></div>`;
  $('#todayWorkoutLow').textContent = w.low; $('#todayVibe').textContent = `${vibe.emoji} ${w.court} armor`; $('#todayArmor').textContent = vibe.armor; $('#todayMeal').textContent = 'Court meal: ' + meals[new Date().getDate()%meals.length];
  const done = storage.get('workoutsDone', []).includes(todayKey()); $('#markWorkout').textContent = done ? 'Workout complete ✓' : 'Mark workout complete';
}
function renderMood(){ const moods=['😶‍🌫️','😢','😐','🙂','🔥']; $('#moodButtons').innerHTML=moods.map(m=>`<button class="mood" data-mood="${m}">${m}</button>`).join(''); $$('.mood').forEach(b=>b.addEventListener('click',()=>{ selectedMood=b.dataset.mood; $$('.mood').forEach(x=>x.classList.remove('selected')); b.classList.add('selected'); })); }
function saveMood(){ const entries=storage.get('moods',[]); entries.unshift({date:new Date().toLocaleString(), mood:selectedMood||'unmarked', note:$('#moodNote').value.trim()}); storage.set('moods', entries.slice(0,90)); $('#moodNote').value=''; selectedMood=null; $$('.mood').forEach(x=>x.classList.remove('selected')); toast('Mood saved.'); }

function renderTraining(week){
  const prog=weekProgression[week]; $$('.weekBtn').forEach(b=>b.classList.toggle('active', Number(b.dataset.week)===week));
  $('#trainingWeek').innerHTML = trainingPlan.map(w=>{
    const isToday = w.day===new Date().getDay(); const vibe=vibes[w.court];
    return `<article class="training-day ${isToday?'today':''}"><p class="small-label">${isToday?'Today':'Day'} · ${vibe.emoji} ${w.court}</p><h3>${w.name}</h3><p class="muted">${prog.rounds}. ${prog.rest}. ${prog.rule}</p><ul>${w.moves.map(m=>`<li><strong>${m[0]}:</strong> ${m[1]}</li>`).join('')}</ul><p class="muted"><strong>Low energy:</strong> ${w.low}</p></article>`;
  }).join('');
}
function startTimer(seconds=30){ clearInterval(timerInterval); let left=seconds; $('#timerDisplay').textContent = fmt(left); $('#timerStep').textContent='Work with clean form. Stop if pain, dizziness, or sharp discomfort.'; timerInterval=setInterval(()=>{ left--; $('#timerDisplay').textContent=fmt(left); if(left<=0){ clearInterval(timerInterval); $('#timerStep').textContent='Done. Breathe. Next move or rest.'; notify('Timer complete','Training room interval finished.'); } },1000); }
function fmt(s){ return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`; }

function setupTabs(){ $$('.tab').forEach(tab=>tab.addEventListener('click',()=>{ $$('.tab').forEach(t=>t.classList.remove('active')); tab.classList.add('active'); $$('.panel').forEach(p=>p.classList.remove('active')); $('#'+tab.dataset.tab).classList.add('active'); window.scrollTo({top:0,behavior:'smooth'}); })); }
function openTab(name){ $(`.tab[data-tab="${name}"]`)?.click(); }
function attachEvents(){
  $('#saveMood').addEventListener('click', saveMood);
  $('#resetToday').addEventListener('click',()=>{ if(!confirm('Reset today’s checkboxes?')) return; const key=todayKey(); const c=getCompletions(); Object.keys(c).forEach(k=>{if(k.startsWith(key+'-')) delete c[k];}); setCompletions(c); renderToday(); });
  $('#markWorkout').addEventListener('click',()=>{ const arr=storage.get('workoutsDone',[]); if(!arr.includes(todayKey())) arr.push(todayKey()); storage.set('workoutsDone',arr); renderTodayWorkout(); updateProgress(); toast('Training proof logged.'); });
  $('#openWardrobeFromToday').addEventListener('click',()=>openTab('wardrobe'));
  $$('.weekBtn').forEach(b=>b.addEventListener('click',()=>renderTraining(Number(b.dataset.week))));
  $('#startTimer').addEventListener('click',()=>startTimer(30)); $('#stopTimer').addEventListener('click',()=>{ clearInterval(timerInterval); $('#timerDisplay').textContent='00:00'; $('#timerStep').textContent='Stopped. Choose the next kind move.'; });
  $('#saveClothing').addEventListener('click',saveClothing); $('#buildOutfit').addEventListener('click',buildOutfit); $('#getWeather').addEventListener('click',fetchWeather); $('#exportWardrobe').addEventListener('click',exportWardrobe);
  $('#newLearnCard').addEventListener('click',()=>randomLearnCard(true)); $('#saveLearnCard').addEventListener('click',saveCurrentLearn); $('#markLearned').addEventListener('click',markLearned);
  $('#copyAgentPrompt').addEventListener('click',copyAgentPrompt); $('#saveAgentNote').addEventListener('click',saveAgentNote);
  $('#searchBooks').addEventListener('click',searchBooks);
  $('#saveAlchemy').addEventListener('click',saveAlchemy);
  $('#panicButton').addEventListener('click',()=>{openTab('mind'); setTimeout(()=>$('#emergencyResetCard').scrollIntoView({behavior:'smooth'}),100);});
  $('#shareBriefing').addEventListener('click',shareBriefing);
  $('#enableNotifications').addEventListener('click',enableNotifications); $('#testNotification').addEventListener('click',()=>notify('Queen OS test','If you see this, app notifications are allowed.')); $('#downloadICS').addEventListener('click',downloadICS);
  $('#exportData').addEventListener('click',exportData); $('#importDataBtn').addEventListener('click',()=>$('#importDataFile').click()); $('#importDataFile').addEventListener('change',importData); $('#hardReset').addEventListener('click',hardReset);
}

// Wardrobe IndexedDB
let dbPromise;
function initDB(){ dbPromise = new Promise((resolve,reject)=>{ const req=indexedDB.open('QueenOSWardrobe',1); req.onupgradeneeded=e=>{ const db=e.target.result; if(!db.objectStoreNames.contains('clothes')) db.createObjectStore('clothes',{keyPath:'id'}); }; req.onsuccess=()=>resolve(req.result); req.onerror=()=>reject(req.error); }); }
async function dbGetAll(){ const db=await dbPromise; return new Promise((resolve,reject)=>{ const tx=db.transaction('clothes','readonly'); const req=tx.objectStore('clothes').getAll(); req.onsuccess=()=>resolve(req.result||[]); req.onerror=()=>reject(req.error); }); }
async function dbPut(item){ const db=await dbPromise; return new Promise((resolve,reject)=>{ const tx=db.transaction('clothes','readwrite'); tx.objectStore('clothes').put(item); tx.oncomplete=resolve; tx.onerror=()=>reject(tx.error); }); }
async function dbDelete(id){ const db=await dbPromise; return new Promise((resolve,reject)=>{ const tx=db.transaction('clothes','readwrite'); tx.objectStore('clothes').delete(id); tx.oncomplete=resolve; tx.onerror=()=>reject(tx.error); }); }
async function compressImage(file){ return new Promise((resolve,reject)=>{ const reader=new FileReader(); reader.onload=()=>{ const img=new Image(); img.onload=()=>{ const max=900; let {width,height}=img; if(width>height && width>max){height*=max/width;width=max;} else if(height>max){width*=max/height;height=max;} const canvas=document.createElement('canvas'); canvas.width=width; canvas.height=height; const ctx=canvas.getContext('2d'); ctx.drawImage(img,0,0,width,height); resolve(canvas.toDataURL('image/jpeg',.82)); }; img.onerror=reject; img.src=reader.result; }; reader.onerror=reject; reader.readAsDataURL(file); }); }
async function saveClothing(){
  const file=$('#clothingPhoto').files[0]; if(!file){ toast('Add a photo first.'); return; }
  const item={ id:(crypto.randomUUID ? crypto.randomUUID() : 'id-'+Date.now()+'-'+Math.random().toString(16).slice(2)), name:$('#clothingName').value.trim()||'Unnamed piece', category:$('#clothingCategory').value, vibe:$('#clothingVibe').value, tags:$('#clothingTags').value.split(',').map(t=>t.trim()).filter(Boolean), photo:await compressImage(file), created:Date.now() };
  await dbPut(item); $('#clothingPhoto').value=''; $('#clothingName').value=''; $('#clothingTags').value=''; renderCloset(); toast('Added to closet.');
}
async function renderCloset(){
  await dbPromise; const items=await dbGetAll();
  $('#closetGrid').innerHTML = items.length ? items.sort((a,b)=>b.created-a.created).map(item=>`<div class="closet-item"><button class="delete-mini" data-del="${item.id}">×</button><img src="${item.photo}" alt="${escapeHtml(item.name)}"><strong>${escapeHtml(item.name)}</strong><div class="tagline">${item.category} · ${item.vibe}<br>${item.tags.map(escapeHtml).join(', ')}</div></div>`).join('') : '<div class="empty">Your closet is empty. Add 5–10 favorite pieces first: shoes, coat, tops, bottoms, accessories.</div>';
  $$('[data-del]').forEach(b=>b.addEventListener('click',async()=>{ await dbDelete(b.dataset.del); renderCloset(); }));
}
async function buildOutfit(){
  const all=await dbGetAll(); const vibe=$('#outfitVibe').value; const weather=$('#manualWeather').value.toLowerCase();
  const cats=['Top','Bottom','Dress','Outerwear','Shoes','Accessory','Bag'];
  const pool=all.filter(i=>i.vibe===vibe || i.tags.map(t=>t.toLowerCase()).includes(vibe.toLowerCase()));
  const source=pool.length?pool:all;
  if(!source.length){ $('#outfitResult').innerHTML='<div class="empty">Add closet photos first. Minimum useful set: 1 shoes, 1 bottom, 2 tops, 1 outerwear, 2 accessories.</div>'; return; }
  const cold=/cold|rain|winter|coat|below|0|1|2|3|4|5|6|7|8|9|10/.test(weather);
  let chosen=[];
  if(source.some(i=>i.category==='Dress')) chosen.push(pick(source,'Dress'));
  if(!chosen[0]) { chosen.push(pick(source,'Top')); chosen.push(pick(source,'Bottom')); }
  if(cold) chosen.push(pick(source,'Outerwear'));
  chosen.push(pick(source,'Shoes')); chosen.push(pick(source,'Accessory')); chosen.push(pick(source,'Bag'));
  chosen = chosen.filter(Boolean).filter((v,i,a)=>a.findIndex(x=>x.id===v.id)===i);
  $('#outfitResult').innerHTML = chosen.map(item=>`<div class="outfit-piece"><img src="${item.photo}" alt="${escapeHtml(item.name)}"><strong>${escapeHtml(item.name)}</strong><div class="tagline">${item.category} · ${item.vibe}</div></div>`).join('') + `<div class="mini-item"><strong>Styling spell</strong><br><span class="muted">${vibes[vibe]?.armor || 'Add one intentional detail.'} If it feels boring, add contrast: soft + sharp, light + dark, fitted + loose.</span></div>`;
}
function pick(arr,cat){ const options=arr.filter(i=>i.category===cat); return options[Math.floor(Math.random()*options.length)]; }
async function fetchWeather(){
  if($('#weatherMode').value!=='auto'){ $('#weatherResult').textContent='Set Weather to “Use location” first, or type the context manually.'; return; }
  if(!navigator.geolocation){ $('#weatherResult').textContent='Geolocation unavailable. Type weather manually.'; return; }
  $('#weatherResult').textContent='Asking your phone for location...';
  navigator.geolocation.getCurrentPosition(async pos=>{
    try{ const {latitude,longitude}=pos.coords; const url=`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,weather_code&forecast_days=1`; const res=await fetch(url); const data=await res.json(); const temp=data.current?.temperature_2m; const rain=data.current?.precipitation; $('#manualWeather').value = `${temp}°C ${rain>0?'rain':'dry'}`; $('#weatherResult').textContent=`Weather added: ${$('#manualWeather').value}`; }
    catch(e){ $('#weatherResult').textContent='Weather fetch failed. Type it manually.'; }
  },()=>{$('#weatherResult').textContent='Location denied. Type weather manually.';});
}
async function exportWardrobe(){ const items=await dbGetAll(); downloadText('queen-os-wardrobe-backup.json', JSON.stringify(items,null,2), 'application/json'); }

function randomLearnCard(advance=true){
  const used=storage.get('learnCardHistory',[]); let card=learningCards[Math.floor(Math.random()*learningCards.length)];
  if(advance && learningCards.length>1){ let tries=0; while(used[0]===card.title && tries<8){ card=learningCards[Math.floor(Math.random()*learningCards.length)]; tries++; } }
  currentLearnCard=card; storage.set('learnCardHistory',[card.title,...used].slice(0,20));
  $('#learnCard').innerHTML=`<div class="category">${card.cat}</div><h3>${card.title}</h3><p>${card.idea}</p><p class="action"><strong>Quest:</strong> ${card.action}</p>`;
}
function renderLinks(){ $('#learningLinks').innerHTML=learningLinks.map(l=>`<a class="link-card" target="_blank" rel="noopener" href="${l[2]}"><strong>${l[0]}</strong><span>${l[1]}</span></a>`).join(''); $('#radarLinks').innerHTML=radarLinks.map(l=>`<a class="link-card" target="_blank" rel="noopener" href="${l[2]}"><strong>${l[0]}</strong><span>${l[1]}</span></a>`).join(''); }
function saveCurrentLearn(){ if(!currentLearnCard) return; const saved=storage.get('savedLearnCards',[]); saved.unshift({...currentLearnCard,date:new Date().toLocaleDateString()}); storage.set('savedLearnCards',saved.slice(0,50)); renderSavedLearn(); toast('Card saved.'); }
function markLearned(){ const learned=storage.get('learnedCards',[]); learned.push({title:currentLearnCard?.title||'unknown', date:todayKey()}); storage.set('learnedCards',learned); updateProgress(); toast('Learning proof logged.'); }
function renderSavedLearn(){ const saved=storage.get('savedLearnCards',[]); $('#savedLearnCards').innerHTML=saved.length?saved.map(c=>`<div class="history-item"><strong>${escapeHtml(c.title)}</strong><p class="muted">${escapeHtml(c.idea)}</p><small>${escapeHtml(c.date)}</small></div>`).join(''):'<p class="muted">No saved cards yet.</p>'; }

function renderAgents(){
  $('#agentGrid').innerHTML=agentDefs.map(a=>`<button class="agent ${a.id===selectedAgent?'active':''}" data-agent="${a.id}"><strong>${a.emoji} ${a.name}</strong><br><span class="muted">${a.role}</span></button>`).join('');
  $$('.agent').forEach(b=>b.addEventListener('click',()=>{ selectedAgent=b.dataset.agent; renderAgents(); generateAgentPrompt(); })); generateAgentPrompt();
  $('#agentSituation').addEventListener('input',generateAgentPrompt);
}
function generateAgentPrompt(){ const agent=agentDefs.find(a=>a.id===selectedAgent); const situation=$('#agentSituation')?.value.trim()||'I want to improve my mental health, lifestyle, body, confidence, learning, and style in a realistic way today.'; if($('#agentPrompt')) $('#agentPrompt').value=`${agent.prompt}\n\nMy situation: ${situation}\n\nPlease answer with: 1) what I should do in the next 10 minutes, 2) what I should do today, 3) what to avoid, 4) a romantasy-style line that helps me act without being cringe.`; }
async function copyAgentPrompt(){ await navigator.clipboard.writeText($('#agentPrompt').value); toast('Agent prompt copied.'); }
function saveAgentNote(){ const notes=storage.get('agentNotes',[]); notes.unshift({date:new Date().toLocaleString(), prompt:$('#agentPrompt').value}); storage.set('agentNotes',notes.slice(0,30)); toast('Agent note saved.'); }

async function searchBooks(){
  const q=$('#bookQuery').value.trim()||'romantasy'; $('#bookResults').innerHTML='<p class="muted">Searching...</p>';
  try{ const res=await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=8`); const data=await res.json(); const docs=data.docs||[]; $('#bookResults').innerHTML=docs.map(b=>{ const cover=b.cover_i?`https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`:''; const title=escapeHtml(b.title||'Untitled'); const author=escapeHtml((b.author_name||[]).slice(0,2).join(', ')||'Unknown author'); const year=b.first_publish_year||'n.d.'; return `<div class="book-card"><img class="book-cover" src="${cover}" alt=""><div><strong>${title}</strong><p class="muted">${author} · ${year}</p><button class="ghost addTBR" data-title="${title}" data-author="${author}" data-year="${year}">Add to TBR</button></div></div>`; }).join('') || '<p class="muted">No results found.</p>'; $$('.addTBR').forEach(b=>b.addEventListener('click',()=>{ const tbr=storage.get('tbr',[]); tbr.unshift({title:b.dataset.title, author:b.dataset.author, year:b.dataset.year, date:todayKey()}); storage.set('tbr',tbr.slice(0,100)); renderTBR(); toast('Added to TBR.'); })); }
  catch(e){ $('#bookResults').innerHTML='<p class="muted">Search failed. Use the radar links instead.</p>'; }
}
function renderTBR(){ const tbr=storage.get('tbr',[]); $('#tbrList').innerHTML=tbr.length?tbr.map((b,i)=>`<div class="history-item"><strong>${escapeHtml(b.title)}</strong><p class="muted">${escapeHtml(b.author)} · ${escapeHtml(b.year)}</p><button class="ghost danger" data-tbr-del="${i}">Remove</button></div>`).join(''):'<p class="muted">Your TBR is empty.</p>'; $$('[data-tbr-del]').forEach(b=>b.addEventListener('click',()=>{ const t=storage.get('tbr',[]); t.splice(Number(b.dataset.tbrDel),1); storage.set('tbr',t); renderTBR(); })); }

function saveAlchemy(){ const entry={date:new Date().toLocaleString(), fact:$('#fact').value.trim(), story:$('#story').value.trim(), kindTruth:$('#kindTruth').value.trim(), nextAction:$('#nextAction').value.trim()}; const entries=storage.get('alchemy',[]); entries.unshift(entry); storage.set('alchemy',entries.slice(0,50)); ['fact','story','kindTruth','nextAction'].forEach(id=>$('#'+id).value=''); renderAlchemy(); toast('Reset saved.'); }
function renderAlchemy(){ const entries=storage.get('alchemy',[]); $('#alchemyHistory').innerHTML=entries.length?entries.slice(0,5).map(e=>`<div class="history-item"><strong>${escapeHtml(e.date)}</strong><p><b>Fact:</b> ${escapeHtml(e.fact)}</p><p><b>Kinder truth:</b> ${escapeHtml(e.kindTruth)}</p><p><b>Next:</b> ${escapeHtml(e.nextAction)}</p></div>`).join(''):'<p class="muted">No thought resets saved yet.</p>'; }

function renderReminderEditor(){ const reminders=storage.get('reminders',defaultReminders); $('#reminderEditor').innerHTML=reminders.map((r,i)=>`<div class="reminder-row"><div><strong>${escapeHtml(r.title)}</strong><p class="muted">${escapeHtml(r.body)}</p></div><input type="time" data-reminder-index="${i}" value="${r.time}" /></div>`).join(''); $$('[data-reminder-index]').forEach(input=>input.addEventListener('change',()=>{ const rs=storage.get('reminders',defaultReminders); rs[Number(input.dataset.reminderIndex)].time=input.value; storage.set('reminders',rs); scheduleNotificationTimers(); })); }
async function enableNotifications(){ if(!('Notification' in window)){ $('#notificationStatus').textContent='This browser does not support notifications.'; return; } const perm=await Notification.requestPermission(); $('#notificationStatus').textContent = perm==='granted' ? 'Notifications enabled. Keep the app installed/opened recently for best results. Import calendar backup for exact alarms.' : 'Notifications not enabled. Use the calendar backup.'; if(perm==='granted') scheduleNotificationTimers(); }
function scheduleNotificationTimers(){ notificationTimers.forEach(clearTimeout); notificationTimers=[]; if(!('Notification' in window) || Notification.permission!=='granted') return; const now=new Date(); const reminders=storage.get('reminders',defaultReminders); reminders.forEach(r=>{ const [h,m]=r.time.split(':').map(Number); const target=new Date(); target.setHours(h,m,0,0); if(target<now) target.setDate(target.getDate()+1); const ms=target-now; notificationTimers.push(setTimeout(()=>{ notify(r.title,r.body); },ms)); }); }
function notify(title,body){ if('Notification' in window && Notification.permission==='granted'){ navigator.serviceWorker?.ready?.then(reg=>reg.showNotification(title,{body,icon:'assets/icon-192.png',badge:'assets/icon-192.png'})).catch(()=>new Notification(title,{body})); } }
function downloadICS(){ downloadText('queen_os_samsung_calendar_backup.ics', buildICS(), 'text/calendar'); }
function buildICS(){ const reminders=storage.get('reminders',defaultReminders); const start=new Date(); start.setDate(start.getDate()+1); const stamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,''); let out='BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Romantasy Queen OS//EN\nCALSCALE:GREGORIAN\n'; reminders.forEach(r=>{ const [h,m]=r.time.split(':'); const dt=new Date(start); dt.setHours(Number(h),Number(m),0,0); const dtstr=localICSDate(dt); out += `BEGIN:VEVENT\nUID:${r.id}-${Date.now()}@queen-os\nDTSTAMP:${stamp}\nDTSTART:${dtstr}\nRRULE:FREQ=DAILY;COUNT=30\nSUMMARY:${escapeICS(r.title)}\nDESCRIPTION:${escapeICS(r.body)}\nBEGIN:VALARM\nTRIGGER:-PT0M\nACTION:DISPLAY\nDESCRIPTION:${escapeICS(r.title)}\nEND:VALARM\nEND:VEVENT\n`; }); return out+'END:VCALENDAR\n'; }
function localICSDate(d){ return `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}T${String(d.getHours()).padStart(2,'0')}${String(d.getMinutes()).padStart(2,'0')}00`; }
function escapeICS(s){ return String(s).replace(/,/g,'\\,').replace(/;/g,'\\;').replace(/\n/g,'\\n'); }

function setupInstall(){ let deferredPrompt; window.addEventListener('beforeinstallprompt',e=>{ e.preventDefault(); deferredPrompt=e; $('#installBtn').classList.remove('hidden'); }); $('#installBtn').addEventListener('click',async()=>{ if(!deferredPrompt) return; deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null; $('#installBtn').classList.add('hidden'); }); }
function registerSW(){ if('serviceWorker' in navigator){ navigator.serviceWorker.register('./sw.js').catch(()=>{}); } }
async function shareBriefing(){ const text=`Romantasy Queen OS briefing: ${$('#briefingTitle').textContent}\n${$('#briefingText').textContent}`; if(navigator.share){ try{ await navigator.share({title:'Queen OS briefing',text}); } catch{} } else { await navigator.clipboard.writeText(text); toast('Briefing copied.'); } }
function exportData(){ const data={version:APP_VERSION, localStorage:{}}; Object.keys(localStorage).forEach(k=>data.localStorage[k]=localStorage.getItem(k)); downloadText('queen-os-progress-backup.json',JSON.stringify(data,null,2),'application/json'); }
function importData(e){ const file=e.target.files[0]; if(!file) return; const reader=new FileReader(); reader.onload=()=>{ try{ const data=JSON.parse(reader.result); if(data.localStorage) Object.entries(data.localStorage).forEach(([k,v])=>localStorage.setItem(k,v)); renderAll(); toast('Progress imported.'); } catch { toast('Import failed.'); } }; reader.readAsText(file); }
function hardReset(){ if(!confirm('Reset local app progress? Wardrobe photos may remain unless browser storage is cleared.')) return; localStorage.clear(); renderAll(); }
function downloadText(filename,text,type='text/plain'){ const blob=new Blob([text],{type}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); }
function exportSafeLocalStorage(){ const out={}; Object.keys(localStorage).forEach(k=>out[k]=localStorage.getItem(k)); return out; }
function escapeHtml(s){ return String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function toast(msg){ const n=document.createElement('div'); n.textContent=msg; Object.assign(n.style,{position:'fixed',left:'50%',bottom:'22px',transform:'translateX(-50%)',background:'rgba(0,0,0,.82)',color:'white',border:'1px solid rgba(255,255,255,.2)',padding:'12px 16px',borderRadius:'999px',zIndex:99,boxShadow:'0 10px 30px rgba(0,0,0,.35)'}); document.body.appendChild(n); setTimeout(()=>n.remove(),2200); }


// --- V6 Infinite Knowledge Smart Scroll + API Vault --------------------------
const smartDomains = [
  'data science', 'AI agents', 'open-source tools', 'psychology', 'romantasy craft', 'public-domain classics',
  'research methods', 'history', 'philosophy', 'style theory', 'financial calm', 'language precision',
  'fitness literacy', 'sleep hygiene', 'emotional regulation', 'study strategy', 'boundaries', 'career courage',
  'wardrobe styling', 'nutrition basics', 'cleaning systems', 'book discovery', 'French-English fluency',
  'software engineering', 'statistics', 'visual design', 'productivity systems', 'personal knowledge management'
];
const repoSeeds = ['ai agent', 'personal knowledge management', 'data visualization', 'habit tracker', 'productivity', 'pwa', 'dashboard', 'automation', 'python data science', 'open source education', 'notion alternative', 'wardrobe app', 'study timer', 'llm tools'];
const paperSeeds = ['mental wellbeing habits', 'exercise cognition', 'sleep learning', 'data science education', 'AI agents', 'recommendation systems', 'habit formation', 'emotion regulation', 'fashion psychology', 'reading fiction empathy'];
const classicSeeds = ['mythology', 'gothic', 'fairy tales', 'folklore', 'women writers', 'adventure', 'poetry', 'philosophy', 'romance', 'fantasy'];
const stackSites = ['stackoverflow', 'datascience', 'stats', 'academia', 'productivity', 'worldbuilding', 'literature'];
const smartVibes = ['Aelin', 'Feyre', 'Poppy', 'Jude', 'Academic', 'Cozy', 'Dark Fae', 'Soft Court'];
const smartVerbs = ['notice', 'define', 'compare', 'practice', 'rewrite', 'test', 'summarize', 'teach', 'track', 'choose', 'remove', 'prepare', 'bookmark', 'prototype', 'question', 'verify'];
const smartIdeas = [
  ['Baseline first', 'Before changing a habit, observe it without shame. Data before drama.'],
  ['Friction is information', 'If you avoid something, the task may be too vague, too large, or emotionally loaded. Make it smaller.'],
  ['Identity follows evidence', 'Confidence grows faster when you collect proof: tiny completed actions, repeated.'],
  ['Contrast creates style', 'A look feels intentional when it has contrast: soft/sharp, loose/fitted, light/dark, simple/textured.'],
  ['Recovery is training', 'A body that never recovers stops adapting. Rest is not a moral failure.'],
  ['Specific beats intense', 'A precise 10-minute task beats a dramatic plan you never start.'],
  ['Curiosity breaks shame', 'Ask “what is this trying to protect me from?” before judging yourself.'],
  ['Default systems win', 'Make the good choice visible and the bad loop slightly harder to begin.'],
  ['Teach to learn', 'If you can explain an idea simply, you probably understand it.'],
  ['Romantasy translation', 'Steal the heroine behavior, not the trauma: strategy, courage, loyalty, softness, endurance.'],
  ['Useful beats viral', 'A source is worth your attention if it changes a decision, skill, question, or action.'],
  ['One artifact rule', 'After consuming knowledge, create one artifact: a note, checklist, sketch, question, or tiny prototype.']
];
const microQuests = [
  'Write a one-sentence summary in your own words.',
  'Set a 10-minute timer and do the first visible step.',
  'Find one example from your own life today.',
  'Teach the idea out loud as if explaining it to a friend.',
  'Turn the idea into one checkbox for today.',
  'Save one useful sentence and delete one useless tab.',
  'Ask: what would Jude do strategically, not emotionally?',
  'Ask: what would Feyre make beautiful or gentle here?',
  'Ask: what would Aelin do before feeling ready?',
  'Ask: what would Poppy question instead of accepting?',
  'Bookmark only if you know exactly why you will return.',
  'Write “I can use this for ___” or let it go.'
];
const surpriseTopics = [
  'new open-source tools for students', 'interesting GitHub repos to build with', 'beginner data science projects',
  'old books about mythology and courage', 'psychology of habit formation', 'AI agents for personal productivity',
  'romantasy heroines and courage', 'CBT thought reframing', 'capsule wardrobe styling', 'healthy no equipment workout',
  'language learning micro habit', 'fantasy book releases', 'study motivation', 'budgeting for students',
  'sleep routine and phone boundaries', 'outfit formulas for class', 'bodyweight workout form', 'research papers on learning',
  'public domain gothic novels', 'Hacker News interesting projects', 'statistics intuition', 'personal knowledge management'
];
function getApiKeys(){ return storage.get('apiKeys', {gemini:'', guardian:'', youtube:'', googleBooks:'', github:'', openAlex:''}); }
function renderApiVault(){
  const keys=getApiKeys();
  [['geminiKey','gemini'],['guardianKey','guardian'],['youtubeKey','youtube'],['googleBooksKey','googleBooks'],['githubKey','github'],['openAlexKey','openAlex']].forEach(([id,k])=>{ const el=$('#'+id); if(el) el.value=keys[k]||''; });
  const status=[];
  if(keys.gemini) status.push('Gemini'); if(keys.github) status.push('GitHub'); if(keys.openAlex) status.push('OpenAlex'); if(keys.guardian) status.push('Guardian'); if(keys.youtube) status.push('YouTube'); if(keys.googleBooks) status.push('Google Books');
  const s=$('#apiStatus'); if(s) s.textContent = status.length ? `Active optional sources: ${status.join(', ')}. Public/no-key sources still work too.` : 'No API keys saved yet. Smart Scroll still works with public sources + infinite offline cards.';
}
function saveApiKeys(){
  const keys={gemini:$('#geminiKey')?.value.trim()||'', guardian:$('#guardianKey')?.value.trim()||'', youtube:$('#youtubeKey')?.value.trim()||'', googleBooks:$('#googleBooksKey')?.value.trim()||'', github:$('#githubKey')?.value.trim()||'', openAlex:$('#openAlexKey')?.value.trim()||''};
  storage.set('apiKeys', keys); renderApiVault(); toast('API vault saved locally on this browser.');
}
function clearApiKeys(){ if(!confirm('Clear saved API keys/tokens from this browser?')) return; storage.remove('apiKeys'); renderApiVault(); toast('API vault cleared.'); }
function smartTopic(){ return ($('#smartTopic')?.value || 'data science, ai agents, psychology, old books, style').trim(); }
function setSourceStatus(msg){ const el=$('#onlineSourceStatus'); if(el) el.textContent=msg; }
function randomFrom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function shuffle(arr){ return [...arr].sort(()=>Math.random()-0.5); }
function getSmartSource(){ return $('#smartSource')?.value || 'auto'; }
function randomLearnCard(advance=true){ nextSmartCard(advance); }
function topicPieces(topic){ return topic.split(',').map(x=>x.trim()).filter(Boolean); }
function primaryTopic(topic, fallback='knowledge'){ const parts=topicPieces(topic); return parts.length ? randomFrom(parts) : fallback; }
function cleanText(x, n=360){ return String(x||'').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim().slice(0,n); }
function yearsAgoDate(years){ const d=new Date(); d.setFullYear(d.getFullYear()-years); return d.toISOString().slice(0,10); }
function cardUrl(url){ return url || ''; }
function fetchJson(url, opts={}){ return fetch(url, opts).then(res=>{ if(!res.ok) throw new Error(`${res.status} ${url}`); return res.json(); }); }
function sourceOrder(mode, count, keys){
  const publicWide=['github','openalex','crossref','gutenberg','hn','wiki','europepmc','stackexchange','openlibrary'];
  const research=['openalex','crossref','europepmc','arxiv'];
  const optional=[];
  if(keys.gemini && count%5===0) optional.push('gemini');
  if(keys.guardian && count%6===0) optional.push('guardian');
  if(keys.googleBooks && count%7===0) optional.push('googlebooks');
  if(keys.youtube && count%8===0) optional.push('youtube');
  if(mode==='auto' || mode==='universe') return [...optional, ...shuffle(publicWide), 'offline'];
  if(mode==='studies') return [...shuffle(research), 'offline'];
  return [mode, 'offline'];
}
async function nextSmartCard(advance=true){
  const count = storage.get('smartScrollCount',0) + (advance ? 1 : 0); if(advance) storage.set('smartScrollCount',count);
  const mode=getSmartSource(); const topic=smartTopic(); const keys=getApiKeys();
  setSourceStatus('Opening a knowledge gate...');
  const order=sourceOrder(mode, count, keys);
  for(const src of order){
    try{
      let card=null;
      if(src==='gemini') card=await fetchGeminiCard(topic, keys.gemini);
      if(src==='github') card=await fetchGithubRepoCard(topic, keys.github);
      if(src==='openalex') card=await fetchOpenAlexCard(topic, keys.openAlex);
      if(src==='crossref') card=await fetchCrossrefCard(topic);
      if(src==='europepmc') card=await fetchEuropePmcCard(topic);
      if(src==='arxiv') card=await fetchArxivCard(topic);
      if(src==='gutenberg') card=await fetchGutenbergCard(topic);
      if(src==='hn') card=await fetchHNCard(topic);
      if(src==='stackexchange') card=await fetchStackExchangeCard(topic);
      if(src==='wiki') card=await fetchWikiCard(topic);
      if(src==='openlibrary') card=await fetchOpenLibraryCard(topic);
      if(src==='guardian') card=await fetchGuardianCard(topic, keys.guardian);
      if(src==='youtube') card=await fetchYoutubeCard(topic, keys.youtube);
      if(src==='googlebooks') card=await fetchGoogleBooksCard(topic, keys.googleBooks);
      if(src==='offline') card=generateOfflineSmartCard(topic);
      if(card){ displayLearnCard(card, advance); setSourceStatus(`Source: ${card.source || src}. ${card.note || 'Read, save, or act — do not fall into the void.'}`); return card; }
    } catch(e){ console.warn('Smart source failed', src, e); }
  }
  const fallback=generateOfflineSmartCard(topic); displayLearnCard(fallback, advance); setSourceStatus('Offline generator used. This never runs out.'); return fallback;
}
function generateOfflineSmartCard(topic){
  const domain = randomFrom(smartDomains); const vibe=randomFrom(smartVibes); const idea=randomFrom(smartIdeas); const verb=randomFrom(smartVerbs); const quest=randomFrom(microQuests);
  const focus = primaryTopic(topic, domain);
  const title = `${vibes[vibe]?.emoji || '✨'} ${idea[0]} · ${domain}`;
  return {cat:`Infinite offline · ${vibe}`, title, idea:`${idea[1]} Focus lens: ${focus}. Your move is to ${verb} something tiny rather than consume more content.`, action:quest, source:'Offline generator', generated:true, note:'Generated forever with no internet.'};
}
function getSmartFeedCards(){ return storage.get('smartFeedCards',[]); }
function setSmartFeedCards(cards){ storage.set('smartFeedCards', cards.slice(-120)); }
function normalizeSmartCard(card){
  return {...card, id: card.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`, date: card.date || new Date().toLocaleString()};
}
function displayLearnCard(card, advance=true){
  const normalized=normalizeSmartCard(card);
  currentLearnCard=normalized;
  const used=storage.get('learnCardHistory',[]); if(advance) storage.set('learnCardHistory',[normalized.title,...used].slice(0,120));
  const cards=getSmartFeedCards();
  cards.push(normalized);
  setSmartFeedCards(cards);
  renderSmartFeed();
  return normalized;
}
function smartFeedCardHtml(card, index){
  const url = card.url ? `<a class="source-link" target="_blank" rel="noopener" href="${escapeHtml(card.url)}">Open source ↗</a>` : '';
  const source = card.source ? `<span class="pill">${escapeHtml(card.source)}</span>` : '';
  const topic = card.topic ? `<span class="pill">${escapeHtml(card.topic)}</span>` : '';
  const cat = `<span class="pill">${escapeHtml(card.cat || 'Smart Scroll')}</span>`;
  return `<article class="learn-feed-card" data-feed-id="${escapeHtml(card.id)}">
    <div>
      <div class="feed-meta"><span class="feed-number">Gate ${index+1}</span>${cat}${source}${topic}</div>
      <h3>${escapeHtml(card.title || 'Untitled card')}</h3>
      <p class="feed-idea">${escapeHtml(card.idea || '')}</p>
    </div>
    <div>
      <p class="feed-quest"><strong>Quest:</strong> ${escapeHtml(card.action || 'Turn this into one small action today.')}</p>
      <div class="feed-buttons">
        ${url}
        <button class="ghost" data-save-feed="${escapeHtml(card.id)}">Save</button>
        <button class="ghost" data-learn-feed="${escapeHtml(card.id)}">Mark learned</button>
        <button class="ghost" data-copy-feed="${escapeHtml(card.id)}">Copy</button>
      </div>
    </div>
  </article>`;
}
function renderSmartFeed(){
  const feed=$('#learnFeed'); if(!feed) return;
  const cards=getSmartFeedCards();
  if(cards.length){
    feed.innerHTML=cards.map((card,i)=>smartFeedCardHtml(card,i)).join('');
  } else {
    feed.innerHTML='<div class="feed-empty"><div><h2>No gates open yet.</h2><p>Tap “Load 10 cards” or just scroll to begin the real Smart Scroll.</p></div></div>';
  }
  $$('.learn-feed-card [data-save-feed]').forEach(btn=>btn.addEventListener('click',()=>saveFeedCard(btn.dataset.saveFeed)));
  $$('.learn-feed-card [data-learn-feed]').forEach(btn=>btn.addEventListener('click',()=>markFeedCardLearned(btn.dataset.learnFeed)));
  $$('.learn-feed-card [data-copy-feed]').forEach(btn=>btn.addEventListener('click',()=>copyFeedCard(btn.dataset.copyFeed)));
}
async function loadSmartFeed(amount=6, options={}){
  if(smartFeedLoading) return;
  smartFeedLoading=true;
  const statusStart = amount > 1 ? `Opening ${amount} knowledge gates...` : 'Opening a knowledge gate...';
  setSourceStatus(statusStart);
  for(let i=0;i<amount;i++){
    await nextSmartCard(true);
  }
  smartFeedLoading=false;
  updateSmartAutoLoadButton();
  if(options.scrollLatest) focusLatestCard();
}
function initSmartFeed(){
  renderSmartFeed();
  updateSmartAutoLoadButton();
  setupSmartFeedObserver();
  if(getSmartFeedCards().length===0) loadSmartFeed(8);
}
function setupSmartFeedObserver(){
  const sentinel=$('#learnFeedSentinel');
  if(!sentinel || !('IntersectionObserver' in window)) return;
  if(smartFeedObserver) smartFeedObserver.disconnect();
  smartFeedObserver=new IntersectionObserver(entries=>{
    if(entries.some(e=>e.isIntersecting) && storage.get('smartAutoLoad',true)) loadSmartFeed(4);
  }, {root:null, rootMargin:'650px 0px', threshold:.01});
  smartFeedObserver.observe(sentinel);
}
function focusLatestCard(){
  const cards=$$('.learn-feed-card');
  const latest=cards[cards.length-1];
  if(latest) latest.scrollIntoView({behavior:'smooth', block:'start'});
}
function saveFeedCard(id){
  const card=getSmartFeedCards().find(c=>c.id===id); if(!card) return;
  currentLearnCard=card; saveCurrentLearn();
}
function markFeedCardLearned(id){
  const card=getSmartFeedCards().find(c=>c.id===id); if(!card) return;
  currentLearnCard=card; markLearned();
}
async function copyFeedCard(id){
  const card=getSmartFeedCards().find(c=>c.id===id); if(!card) return;
  const text=[card.title, '', card.idea, '', `Quest: ${card.action}`, card.url ? `Source: ${card.url}` : ''].filter(Boolean).join('\n');
  await navigator.clipboard.writeText(text); toast('Card copied.');
}
function clearSmartFeed(){
  if(!confirm('Clear the visible Smart Scroll feed? Saved cards stay saved.')) return;
  storage.remove('smartFeedCards'); renderSmartFeed(); toast('Feed cleared.');
}
function toggleSmartAutoload(){
  const next=!storage.get('smartAutoLoad',true);
  storage.set('smartAutoLoad',next);
  updateSmartAutoLoadButton();
  toast(next?'Auto-load on.':'Auto-load paused.');
}
function updateSmartAutoLoadButton(){
  const btn=$('#toggleSmartAutoload'); if(btn) btn.textContent=storage.get('smartAutoLoad',true)?'Auto-load on':'Auto-load paused';
}
function toggleFeedFocus(){
  document.body.classList.toggle('feed-focus');
  const btn=$('#toggleFeedFocus'); if(btn) btn.textContent=document.body.classList.contains('feed-focus')?'Exit focus':'Focus feed';
}
async function fetchGithubRepoCard(topic, token){
  const seed=primaryTopic(topic, randomFrom(repoSeeds));
  const since=yearsAgoDate(1);
  const q=`${seed} stars:>20 pushed:>${since} fork:false archived:false`;
  const headers={'Accept':'application/vnd.github+json'}; if(token) headers.Authorization=`Bearer ${token}`;
  const data=await fetchJson(`https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=25`, {headers});
  const items=(data.items||[]).filter(r=>r.full_name && !r.archived);
  if(!items.length) return null;
  const r=randomFrom(items.slice(0,18));
  const desc=cleanText(r.description || 'No description provided.', 260);
  return {cat:'Build gate · GitHub', title:r.full_name, idea:`${desc} Language: ${r.language || 'mixed/unknown'} · ⭐ ${r.stargazers_count || 0} · updated ${String(r.pushed_at||'').slice(0,10)}.`, action:'Open the README. Decide: could this help you build, learn, or automate something this month?', source:'GitHub Search API', url:r.html_url, topic:seed, note: token ? 'Using your optional GitHub token.' : 'Public GitHub search; optional token raises limits.'};
}
function abstractFromOpenAlex(inv){
  if(!inv || typeof inv !== 'object') return '';
  const pairs=[]; Object.entries(inv).forEach(([word,positions])=>{ (positions||[]).forEach(pos=>pairs[pos]=word); });
  return cleanText(pairs.join(' '), 420);
}
async function fetchOpenAlexCard(topic, key){
  const q=primaryTopic(topic, randomFrom(paperSeeds));
  const params=new URLSearchParams({search:q, 'per-page':'25', sort:'cited_by_count:desc', filter:`from_publication_date:${yearsAgoDate(6)}`});
  if(key) params.set('api_key', key);
  let data=await fetchJson(`https://api.openalex.org/works?${params.toString()}`);
  let results=data.results||[];
  if(!results.length){ params.delete('filter'); data=await fetchJson(`https://api.openalex.org/works?${params.toString()}`); results=data.results||[]; }
  if(!results.length) return null;
  const w=randomFrom(results.slice(0,20));
  const authors=(w.authorships||[]).slice(0,3).map(a=>a.author?.display_name).filter(Boolean).join(', ') || 'Unknown authors';
  const abstract=abstractFromOpenAlex(w.abstract_inverted_index) || `Published ${w.publication_year || 'n.d.'}; cited by ${w.cited_by_count || 0}; type: ${w.type || 'work'}.`;
  return {cat:'Study gate · OpenAlex', title:cleanText(w.display_name || 'Untitled work',160), idea:`${authors}. ${abstract}`, action:'Write the research question in plain English and one possible limitation before trusting it.', source:'OpenAlex', url:cardUrl(w.doi || w.id), topic:q, note:key ? 'Using optional OpenAlex key.' : 'Scholarly metadata source.'};
}
async function fetchCrossrefCard(topic){
  const q=primaryTopic(topic, randomFrom(paperSeeds));
  const params=new URLSearchParams({query:q, rows:'20', sort:'published', order:'desc', filter:`from-pub-date:${yearsAgoDate(8)}`});
  const data=await fetchJson(`https://api.crossref.org/works?${params.toString()}`);
  const items=(data.message?.items||[]).filter(x=>x.title?.length);
  if(!items.length) return null;
  const w=randomFrom(items.slice(0,18));
  const authors=(w.author||[]).slice(0,3).map(a=>[a.given,a.family].filter(Boolean).join(' ')).filter(Boolean).join(', ') || 'Unknown authors';
  const title=cleanText(w.title?.[0] || 'Untitled scholarly work',160);
  const pub=(w.published?.['date-parts']?.[0]||[]).join('-') || w.created?.['date-time']?.slice(0,10) || 'n.d.';
  const container=cleanText((w['container-title']||[])[0] || w.publisher || 'Unknown venue',120);
  return {cat:'Study gate · Crossref', title, idea:`${authors}. ${container} · ${pub}. ${cleanText(w.abstract || 'Metadata card: open the source to inspect abstract/full text availability.',320)}`, action:'Before saving: identify topic, method, and whether it is a paper, book chapter, preprint, or review.', source:'Crossref', url:cardUrl(w.URL || (w.DOI?`https://doi.org/${w.DOI}`:'')), topic:q};
}
async function fetchEuropePmcCard(topic){
  const q=primaryTopic(topic, randomFrom(['sleep learning','exercise mental health','habit formation','emotion regulation','nutrition students']));
  const params=new URLSearchParams({query:q, format:'json', pageSize:'20', sort:'CITED desc'});
  const data=await fetchJson(`https://www.ebi.ac.uk/europepmc/webservices/rest/search?${params.toString()}`);
  const items=data.resultList?.result || [];
  if(!items.length) return null;
  const r=randomFrom(items.slice(0,18));
  const title=cleanText(r.title || 'Untitled Europe PMC result',160);
  const url=r.doi ? `https://doi.org/${r.doi}` : `https://europepmc.org/article/${encodeURIComponent(r.source||'MED')}/${encodeURIComponent(r.id||'')}`;
  return {cat:'Life science gate · Europe PMC', title, idea:`${cleanText(r.authorString || 'Unknown authors',140)} · ${r.journalTitle || r.source || 'Europe PMC'} · ${r.pubYear || 'n.d.'}. ${cleanText(r.abstractText || 'Open the record for abstract/full text availability.',350)}`, action:'Translate the finding into one cautious sentence. Do not turn one paper into a life rule.', source:'Europe PMC', url, topic:q};
}
async function fetchArxivCard(topic){
  const q=primaryTopic(topic, randomFrom(['artificial intelligence','data visualization','statistics','machine learning','human computer interaction']));
  const url=`https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(q)}&start=0&max_results=10&sortBy=submittedDate&sortOrder=descending`;
  const res=await fetch(url); if(!res.ok) throw new Error('arxiv');
  const text=await res.text();
  const xml=new DOMParser().parseFromString(text,'application/xml');
  const entries=Array.from(xml.querySelectorAll('entry'));
  if(!entries.length) return null;
  const e=randomFrom(entries);
  const title=cleanText(e.querySelector('title')?.textContent || 'arXiv preprint',160);
  const summary=cleanText(e.querySelector('summary')?.textContent || '',420);
  const authors=Array.from(e.querySelectorAll('author name')).slice(0,3).map(n=>n.textContent).join(', ') || 'Unknown authors';
  const link=Array.from(e.querySelectorAll('link')).find(l=>l.getAttribute('rel')==='alternate')?.getAttribute('href') || url;
  return {cat:'Preprint gate · arXiv', title, idea:`${authors}. ${summary}`, action:'Ask: what problem does this solve, and what would I need to learn to understand it?', source:'arXiv', url:link, topic:q, note:'If arXiv is blocked by browser CORS, use another research source.'};
}
async function fetchGutenbergCard(topic){
  const q=primaryTopic(topic, randomFrom(classicSeeds));
  let data=await fetchJson(`https://gutendex.com/books/?search=${encodeURIComponent(q)}`);
  let books=(data.results||[]).filter(b=>b.title);
  if(!books.length){ data=await fetchJson(`https://gutendex.com/books/?languages=en&sort=popular`); books=data.results||[]; }
  if(!books.length) return null;
  const b=randomFrom(books.slice(0,24));
  const authors=(b.authors||[]).map(a=>`${a.name}${a.birth_year?` (${a.birth_year}–${a.death_year||''})`:''}`).join(', ') || 'Unknown author';
  const subjects=(b.subjects||[]).slice(0,5).join('; ');
  const htmlUrl=b.formats?.['text/html'] || b.formats?.['text/html; charset=utf-8'] || b.formats?.['application/epub+zip'] || `https://www.gutenberg.org/ebooks/${b.id}`;
  return {cat:'Old book gate · Gutenberg', title:b.title, idea:`${authors}. Subjects: ${subjects || 'not listed'}. Downloads: ${b.download_count || 'n.d.'}.`, action:'Read the first page. Save one sentence that still feels alive today.', source:'Gutendex / Project Gutenberg metadata', url:htmlUrl, topic:q};
}
async function fetchHNCard(topic){
  const listName=Math.random()<0.5?'topstories':'newstories';
  const ids=await fetchJson(`https://hacker-news.firebaseio.com/v0/${listName}.json?print=pretty`);
  if(!ids?.length) return null;
  for(const id of shuffle(ids.slice(0,80)).slice(0,12)){
    const item=await fetchJson(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
    if(item && item.title){
      const url=item.url || `https://news.ycombinator.com/item?id=${id}`;
      return {cat:'Tech curiosity gate · Hacker News', title:item.title, idea:`${item.score || 0} points · ${item.descendants || 0} comments. This is a discovery card, not a command to scroll forever.`, action:'Open only if the title can teach, inspire a project, or improve your tools. Otherwise skip like a queen.', source:'Hacker News API', url, topic:listName};
    }
  }
  return null;
}
async function fetchStackExchangeCard(topic){
  const q=primaryTopic(topic, randomFrom(['python data science','statistics regression','study habits','worldbuilding magic systems']));
  const site = /stat|data|regression|model/i.test(q) ? 'stats' : /book|literature|novel|romantasy/i.test(q) ? 'literature' : /world|fantasy|magic/i.test(q) ? 'worldbuilding' : randomFrom(stackSites);
  const params=new URLSearchParams({order:'desc', sort:'votes', q, site, pagesize:'12'});
  const data=await fetchJson(`https://api.stackexchange.com/2.3/search/advanced?${params.toString()}`);
  const items=data.items||[];
  if(!items.length) return null;
  const x=randomFrom(items.slice(0,12));
  const title=cleanText(x.title || 'StackExchange question',180);
  return {cat:`Answer gate · ${site}`, title, idea:`Score ${x.score || 0} · ${x.answer_count || 0} answers · ${x.is_answered ? 'answered' : 'not fully answered'}. Community answers can be useful, but verify important claims.`, action:'Open and extract one technique, warning, or better search phrase.', source:'StackExchange API', url:x.link, topic:q};
}
async function fetchWikiCard(topic){
  const q=encodeURIComponent(primaryTopic(topic, randomFrom(['history','science','art','philosophy','mythology','statistics'])));
  const url=`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrsearch=${q}&gsrlimit=10&prop=extracts|info&exintro=1&explaintext=1&inprop=url`;
  const res=await fetch(url); if(!res.ok) throw new Error('wiki'); const data=await res.json(); const pages=Object.values(data.query?.pages || {}).filter(p=>p.extract);
  if(!pages.length) return null; const p=randomFrom(pages); const extract=cleanText(p.extract,390);
  return {cat:'Knowledge gate · Wikipedia', title:p.title, idea:extract, action:'Summarize this in one sentence, then ask how it connects to your life, studies, or style today.', source:'Wikipedia/Wikimedia', url:p.fullurl, topic:decodeURIComponent(q)};
}
async function fetchOpenLibraryCard(topic){
  const q=encodeURIComponent(primaryTopic(topic, 'romantasy fantasy')); const res=await fetch(`https://openlibrary.org/search.json?q=${q}&limit=20`); if(!res.ok) throw new Error('openlibrary'); const data=await res.json(); const docs=(data.docs||[]).filter(b=>b.title);
  if(!docs.length) return null; const b=randomFrom(docs); const author=(b.author_name||[]).slice(0,2).join(', ') || 'Unknown author'; const year=b.first_publish_year || 'n.d.'; const key=b.key ? `https://openlibrary.org${b.key}` : `https://openlibrary.org/search?q=${q}`;
  return {cat:'Library gate · Open Library', title:b.title, idea:`${author} · first published ${year}. Subjects/keywords: ${(b.subject||[]).slice(0,5).join(', ') || 'not listed'}.`, action:'Decide: TBR, library later, or skip. If TBR, write why in 5 words.', source:'Open Library', url:key, topic:decodeURIComponent(q)};
}
async function fetchGoogleBooksCard(topic, key){
  if(!key) throw new Error('Google Books key missing'); const q=encodeURIComponent(primaryTopic(topic,'romantasy')); const res=await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=20&key=${encodeURIComponent(key)}`); if(!res.ok) throw new Error('googlebooks'); const data=await res.json(); const items=(data.items||[]).map(x=>x.volumeInfo).filter(Boolean);
  if(!items.length) return null; const b=randomFrom(items); const desc=cleanText(b.description||'No description available.',360);
  return {cat:'Book gate · Google Books', title:b.title || 'Book find', idea:`${(b.authors||['Unknown author']).join(', ')}. ${desc}`, action:'Read the description critically: what trope, promise, or theme is being sold?', source:'Google Books', url:b.infoLink, topic:decodeURIComponent(q)};
}
async function fetchGuardianCard(topic, key){
  if(!key) throw new Error('Guardian key missing'); const q=encodeURIComponent(primaryTopic(topic, 'romantasy books OR fantasy books'));
  const url=`https://content.guardianapis.com/search?q=${q}&section=books|culture&show-fields=trailText,headline,shortUrl&order-by=newest&page-size=20&api-key=${encodeURIComponent(key)}`;
  const res=await fetch(url); if(!res.ok) throw new Error('guardian'); const data=await res.json(); const results=data.response?.results || []; if(!results.length) return null; const a=randomFrom(results); const fields=a.fields||{}; const trail=cleanText(fields.trailText||'',360);
  return {cat:'Book/culture radar · Guardian', title:fields.headline || a.webTitle, idea:trail || a.webTitle, action:'Open only if it serves you: save one title, trend, or idea — then leave the feed.', source:'The Guardian', url:a.webUrl || fields.shortUrl, topic:decodeURIComponent(q)};
}
async function fetchYoutubeCard(topic, key){
  if(!key) throw new Error('YouTube key missing'); const q=encodeURIComponent(primaryTopic(topic,'study motivation beginner workout style tips'));
  const res=await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=${q}&safeSearch=moderate&key=${encodeURIComponent(key)}`); if(!res.ok) throw new Error('youtube'); const data=await res.json(); const vids=(data.items||[]).filter(v=>v.id?.videoId); if(!vids.length) return null; const v=randomFrom(vids); const sn=v.snippet||{};
  return {cat:'Video gate · YouTube', title:sn.title || 'Learning video', idea:`${sn.channelTitle || 'YouTube'} — ${cleanText(sn.description||'',260)}`, action:'Watch with a mission: write 3 notes and 1 action. No autoplay rabbit hole.', source:'YouTube Data API', url:`https://www.youtube.com/watch?v=${v.id.videoId}`, topic:decodeURIComponent(q)};
}
async function fetchGeminiCard(topic, key){
  if(!key) throw new Error('Gemini key missing');
  const body={contents:[{parts:[{text:`Create one compact Smart Scroll learning card for Ilona's Romantasy Queen OS app. Topic: ${topic}. It can be about science, old books, GitHub/building, research, history, psychology, style, fitness, language, productivity, or romantasy craft. Return ONLY valid JSON with keys cat,title,idea,action. Keep idea under 85 words and action under 28 words. No medical advice.`}]}], generationConfig:{temperature:0.95, maxOutputTokens:420}};
  const models=['gemini-2.5-flash-lite','gemini-2.5-flash','gemini-2.0-flash'];
  let lastErr;
  for(const model of models){
    try{
      const res=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
      if(!res.ok) { lastErr=new Error('gemini '+res.status); continue; }
      const data=await res.json(); const txt=data.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('\n') || ''; const jsonText=(txt.match(/\{[\s\S]*\}/)||[])[0]; if(!jsonText) throw new Error('no json'); const obj=JSON.parse(jsonText);
      return {cat:obj.cat || 'AI oracle', title:obj.title || 'Generated card', idea:obj.idea || '', action:obj.action || 'Choose one small action.', source:`Gemini API (${model})`, topic:topic, note:'Personalized card from your API key.'};
    }catch(e){ lastErr=e; }
  }
  throw lastErr || new Error('gemini failed');
}
function surpriseLearning(){
  const topic=randomFrom(surpriseTopics); if($('#smartTopic')) $('#smartTopic').value=topic; if($('#smartSource')) $('#smartSource').value='auto'; loadSmartFeed(6, {scrollLatest:true});
}
function renderSavedLearn(){
  const saved=storage.get('savedLearnCards',[]);
  $('#savedLearnCards').innerHTML=saved.length?saved.map(c=>`<div class="history-item"><strong>${escapeHtml(c.title)}</strong><p class="muted">${escapeHtml(c.idea)}</p><small>${escapeHtml(c.date)}${c.source?' · '+escapeHtml(c.source):''}</small></div>`).join(''):'<p class="muted">No saved cards yet.</p>';
}
function renderAll(){ renderBriefing(); renderToday(); renderMood(); renderTraining(getWeek(getProgramDay())); renderLinks(); renderAgents(); renderAlchemy(); renderSavedLearn(); renderTBR(); renderReminderEditor(); renderCloset(); renderApiVault(); initSmartFeed(); }
function attachEvents(){
  $('#saveMood')?.addEventListener('click', saveMood);
  $('#resetToday')?.addEventListener('click',()=>{ if(!confirm('Reset today’s checkboxes?')) return; const key=todayKey(); const c=getCompletions(); Object.keys(c).forEach(k=>{if(k.startsWith(key+'-')) delete c[k];}); setCompletions(c); renderToday(); });
  $('#markWorkout')?.addEventListener('click',()=>{ const arr=storage.get('workoutsDone',[]); if(!arr.includes(todayKey())) arr.push(todayKey()); storage.set('workoutsDone',arr); renderTodayWorkout(); updateProgress(); toast('Training proof logged.'); });
  $('#openWardrobeFromToday')?.addEventListener('click',()=>openTab('wardrobe'));
  $$('.weekBtn').forEach(b=>b.addEventListener('click',()=>renderTraining(Number(b.dataset.week))));
  $('#startTimer')?.addEventListener('click',()=>startTimer(30)); $('#stopTimer')?.addEventListener('click',()=>{ clearInterval(timerInterval); $('#timerDisplay').textContent='00:00'; $('#timerStep').textContent='Stopped. Choose the next kind move.'; });
  $('#saveClothing')?.addEventListener('click',saveClothing); $('#buildOutfit')?.addEventListener('click',buildOutfit); $('#getWeather')?.addEventListener('click',fetchWeather); $('#exportWardrobe')?.addEventListener('click',exportWardrobe);
  $('#newLearnCard')?.addEventListener('click',()=>loadSmartFeed(1,{scrollLatest:true})); $('#loadMoreLearn')?.addEventListener('click',()=>loadSmartFeed(10,{scrollLatest:true})); $('#surpriseLearning')?.addEventListener('click',surpriseLearning); $('#focusLatestCard')?.addEventListener('click',focusLatestCard); $('#toggleSmartAutoload')?.addEventListener('click',toggleSmartAutoload); $('#clearLearnFeed')?.addEventListener('click',clearSmartFeed); $('#toggleFeedFocus')?.addEventListener('click',toggleFeedFocus); $('#saveLearnCard')?.addEventListener('click',saveCurrentLearn); $('#markLearned')?.addEventListener('click',markLearned);
  $('#copyAgentPrompt')?.addEventListener('click',copyAgentPrompt); $('#saveAgentNote')?.addEventListener('click',saveAgentNote);
  $('#searchBooks')?.addEventListener('click',searchBooks);
  $('#saveAlchemy')?.addEventListener('click',saveAlchemy);
  $('#panicButton')?.addEventListener('click',()=>{openTab('mind'); setTimeout(()=>$('#emergencyResetCard').scrollIntoView({behavior:'smooth'}),100);});
  $('#shareBriefing')?.addEventListener('click',shareBriefing);
  $('#enableNotifications')?.addEventListener('click',enableNotifications); $('#testNotification')?.addEventListener('click',()=>notify('Queen OS test','If you see this, app notifications are allowed.')); $('#downloadICS')?.addEventListener('click',downloadICS);
  $('#saveApiKeys')?.addEventListener('click',saveApiKeys); $('#clearApiKeys')?.addEventListener('click',clearApiKeys);
  $('#exportData')?.addEventListener('click',exportData); $('#importDataBtn')?.addEventListener('click',()=>$('#importDataFile').click()); $('#importDataFile')?.addEventListener('change',importData); $('#hardReset')?.addEventListener('click',hardReset);
}

window.addEventListener('load', init);
