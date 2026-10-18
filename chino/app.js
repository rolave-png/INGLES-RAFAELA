(() => {
'use strict';
const $ = s => document.querySelector(s);
const app = $('#app');
const U = CONTENT.units;
U.forEach((u, i) => { u.idx = i; });
const ITEM = {};
U.forEach(u => u.vocab.forEach(v => { ITEM[u.id + ':' + v[0]] = { u, v }; }));

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.random() * a.length | 0];
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
const normZh = s => String(s).replace(/[\s，。？！、,.?!“”"'：:；;]/g, '');
const TM = { a: 'āáǎà', e: 'ēéěè', i: 'īíǐì', o: 'ōóǒò', u: 'ūúǔù', 'ü': 'ǖǘǚǜ' };
const TONE_OF = {}; Object.entries(TM).forEach(([b, t]) => [...t].forEach((c, i) => { TONE_OF[c] = [b, i + 1]; }));
const VOW = /[aeiouüāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]+/i;
// Cambia el tono de la primera sílaba de un pinyin (para ejercicios de oído)
function setTone(py, t) {
  const m = py.match(VOW); if (!m) return py;
  const base = [...m[0]].map(c => (TONE_OF[c] ? TONE_OF[c][0] : c));
  let k = base.indexOf('a'); if (k < 0) k = base.indexOf('e');
  if (k < 0 && base.join('').includes('ou')) k = base.indexOf('o');
  if (k < 0) k = base.length - 1;
  base[k] = TM[base[k]][t - 1];
  return py.slice(0, m.index) + base.join('') + py.slice(m.index + m[0].length);
}
function firstTone(py) { const m = py.match(VOW); if (!m) return 0; for (const c of m[0]) if (TONE_OF[c]) return TONE_OF[c][1]; return 5; }
// Colorea las vocales con marca de tono (rojo 1, naranja 2, verde 3, azul 4)
const pyHtml = p => esc(p).replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, c => `<span class="t${TONE_OF[c][1]}">${c}</span>`);
const lev = (a, b) => {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
};
const judge = (input, ans) => {
  const a = norm(input), b = norm(ans);
  if (a === b) return 'ok';
  if (b.length >= 5 && lev(a, b) === 1) return 'close';
  return 'no';
};
const judgeZh = (input, ans) => (normZh(input) === normZh(ans) ? 'ok' : 'no');
const day = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 6e4) / 864e5);

// ---------- Estado guardado (solo en este dispositivo) ----------
const KEY = 'mandarin-quest-v1';
const fresh = () => ({ name: '', py: true, xp: 0, streak: 0, last: -99, items: {}, units: {}, log: {} });
let S = (() => { try { return Object.assign(fresh(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch { return fresh(); } })();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* sin almacenamiento */ } };
const INTER = [0, 1, 2, 4, 8, 16]; // días entre repasos según la "caja" (Leitner)
function rec(key, ok) {
  const it = S.items[key] || { box: 0, seen: 0, wrong: 0, due: 0 };
  it.seen++;
  if (ok) it.box = Math.min(5, it.box + 1); else { it.box = Math.max(0, it.box - 2); it.wrong++; }
  it.due = day() + INTER[it.box];
  S.items[key] = it;
}
const dueKeys = () => Object.keys(S.items).filter(k => ITEM[k] && S.items[k].due <= day());
const stars = u => (S.units[u.id] || {}).stars || 0;
const unlocked = u => u.idx === 0 || stars(U[u.idx - 1]) >= 1;
function touchDay(xp) {
  const d = day();
  if (S.last !== d) S.streak = S.last === d - 1 ? S.streak + 1 : 1;
  S.last = d;
  S.xp += xp;
  const l = S.log[d] || { xp: 0, lessons: 0 };
  l.xp += xp; l.lessons++;
  S.log[d] = l;
  save();
}

// ---------- Audio ----------
let voice = null;
const pickVoice = () => {
  if (!('speechSynthesis' in window)) return;
  const v = speechSynthesis.getVoices();
  voice = v.find(x => /^zh[-_]CN/i.test(x.lang)) || v.find(x => /^zh/i.test(x.lang)) || null;
};
if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
function say(t, slow) {
  if (!('speechSynthesis' in window)) return;
  if (!voice && !say.warned) { say.warned = true; toast('Tu dispositivo no tiene voz en chino. Instálala en Ajustes > Idioma/Voz.'); }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(t);
  u.lang = 'zh-CN'; u.rate = slow ? 0.45 : 0.75;
  if (voice) u.voice = voice;
  speechSynthesis.speak(u);
}
let AC;
function tone(freqs) {
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    freqs.forEach((f, i) => {
      const o = AC.createOscillator(), g = AC.createGain(), t = AC.currentTime + i * 0.12;
      o.frequency.value = f; o.type = 'sine';
      g.gain.setValueAtTime(0.12, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + 0.2);
    });
  } catch { /* sin audio */ }
}
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.hidden = false;
  clearTimeout(toast.h); toast.h = setTimeout(() => { t.hidden = true; }, 2200);
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-say]');
  if (b) say(b.dataset.say, b.dataset.slow === '1');
});

// ---------- Pantalla de inicio ----------
function home() {
  if (!S.name) return welcome();
  const due = dueKeys().length;
  const streak = S.last >= day() - 1 ? S.streak : 0;
  const tile = u => {
    const lock = !unlocked(u), s = stars(u);
    const cur = !lock && s < 1;
    return `<button class="tile ${lock ? 'lock' : ''} ${cur ? 'cur' : ''}" data-u="${u.id}">
      <span class="em">${lock ? '🔒' : u.emoji}</span><b>${esc(u.title)}</b>
      <span class="st">${'★'.repeat(s)}${'☆'.repeat(3 - s)}</span></button>`;
  };
  app.innerHTML = `
  <header class="top"><div><small>你好！</small><h1>${esc(S.name)}</h1></div>
    <div class="chips"><span title="Días seguidos">🔥 ${streak}</span><span title="Puntos">⭐ ${S.xp}</span></div></header>
  <button class="review ${due ? '' : 'off'}" id="rev"><span>🧠</span><div><b>Repaso del día</b>
    <small>${due ? due + (due === 1 ? ' palabra lista' : ' palabras listas') + ' para repasar' : '¡Estás al día! Vuelve mañana'}</small></div></button>
  <a class="lang" href="../"><span>🇬🇧</span><div><b>Back to English Quest</b><small>Volver a la app de inglés</small></div></a>
  ${CONTENT.stages.map(st => `<section><h2>${st.name}</h2><p class="sub">${st.sub}</p>
    <div class="grid">${U.filter(u => u.stage === st.id).map(tile).join('')}</div></section>`).join('')}
  <footer><button class="btn small" id="share">📤 Enviar mi resumen</button><br><button class="link" id="pytog">Pinyin en los ejercicios: ${S.py ? 'sí' : 'no'}</button><br><button class="link" id="parent">📊 Mi progreso</button></footer>`;
  $('#pytog').onclick = () => { S.py = !S.py; save(); home(); };
  $('#rev').onclick = () => due ? startReview() : toast('Hoy no hay nada por repasar. ¡Haz una unidad nueva!');
  app.querySelectorAll('.tile').forEach(b => {
    b.onclick = () => {
      const u = U.find(x => x.id === b.dataset.u);
      unlocked(u) ? intro(u) : toast('Primero completa la unidad anterior (al menos 1 estrella).');
    };
  });
  $('#share').onclick = sendSummary;
  $('#parent').onclick = parent;
}

function welcome() {
  app.innerHTML = `<div class="center"><div class="logo">中</div><h1>Mandarín Quest</h1>
    <p>Aprende mandarín paso a paso, jugando. ¿Cómo te llamas?</p>
    <input id="nm" maxlength="20" placeholder="Tu nombre" autocomplete="off">
    <button class="btn" id="go">¡Empezar!</button></div>`;
  const go = () => { const n = $('#nm').value.trim(); if (!n) return; S.name = n; save(); home(); };
  $('#go').onclick = go;
  $('#nm').onkeydown = e => { if (e.key === 'Enter') go(); };
}

// ---------- Tarjetas de aprendizaje ----------
function intro(u) {
  const cards = [{ tip: true }, ...u.vocab.map(v => ({ v }))];
  let i = 0;
  const draw = () => {
    const c = cards[i], last = i === cards.length - 1;
    const body = c.tip
      ? `<div class="card"><div class="em big">${u.emoji}</div><h2>${esc(u.title)}</h2><p class="tipbox">💡 ${esc(u.tip)}</p></div>`
      : `<div class="card"><div class="em big">${c.v[3] || '💬'}</div>
          <div class="word zh">${esc(c.v[0])}</div><div class="py">${pyHtml(c.v[1])}</div><div class="es">${esc(c.v[2])}</div>
          <div class="row"><button class="sound" data-say="${esc(c.v[0])}">🔊</button>
          <button class="sound" data-say="${esc(c.v[0])}" data-slow="1">🐢</button></div></div>`;
    app.innerHTML = `<div class="lesson"><div class="topbar"><button class="x" id="x">✕</button>
      <div class="bar"><i style="width:${(i + 1) / cards.length * 100}%"></i></div></div>
      <div class="ex">${body}</div>
      <div class="foot"><button class="btn" id="nx">${last ? '¡A practicar!' : 'Siguiente'}</button>
      ${i === 0 ? '<button class="link" id="skip">Saltar a practicar</button>' : ''}</div></div>`;
    $('#x').onclick = home;
    $('#nx').onclick = () => { if (last) startUnit(u); else { i++; draw(); } };
    if ($('#skip')) $('#skip').onclick = () => startUnit(u);
    if (c.v) say(c.v[0]);
  };
  draw();
}

// ---------- Generación de ejercicios ----------
// v = [hanzi, pinyin, español, emoji]
const HW = () => typeof HanziWriter !== 'undefined' && navigator.onLine;
const allVocab = u => U.filter(x => x.idx <= u.idx).flatMap(x => x.vocab);
function distract(u, v, idx, n, needEmoji) {
  const ok = x => x[idx] !== v[idx] && x[0] !== v[0] && x[1] !== v[1] && (!needEmoji || (x[3] && x[3] !== v[3]));
  let c = shuffle(u.vocab.filter(ok));
  if (c.length < n) c = c.concat(shuffle(allVocab(u).filter(x => !u.vocab.includes(x) && ok(x))));
  return c.slice(0, n);
}
const pyLine = v => (S.py ? `<small class="pyline">${pyHtml(v[1])}</small>` : '');
function exVocab(u, v, kind) {
  const [zh, py, es, em] = v, key = u.id + ':' + zh;
  const mc = o => Object.assign({ kind: 'mc', key, say: zh }, o);
  switch (kind) {
    case 'img-zh': return mc({ title: '¿Cómo se dice en chino?', big: em, opts: [zh, ...distract(u, v, 0, 3).map(x => x[0])], ans: zh, say: null, zhopts: true });
    case 'listen-img': return mc({ title: 'Escucha y elige la imagen', big: '🔊', auto: zh, opts: [em, ...distract(u, v, 3, 3, true).map(x => x[3])], ans: em, emoji: true });
    case 'zh-es': return mc({ title: '¿Qué significa?', big: `<span class="zh">${esc(zh)}</span>${pyLine(v)}`, opts: [es, ...distract(u, v, 2, 3).map(x => x[2])], ans: es });
    case 'es-zh': return mc({ title: 'Elige la palabra en chino', big: esc(es), opts: [zh, ...distract(u, v, 0, 3).map(x => x[0])], ans: zh, say: null, zhopts: true });
    case 'listen-es': return mc({ title: 'Escucha y elige el significado', big: '🔊', auto: zh, opts: [es, ...distract(u, v, 2, 3).map(x => x[2])], ans: es });
    case 'listen-py': {
      const t = firstTone(py), vars = [1, 2, 3, 4].filter(x => x !== t).map(x => setTone(py, x));
      return mc({ title: 'Escucha: ¿qué tono tiene? Elige el pinyin', big: '🔊', auto: zh, opts: [py, ...shuffle(vars).slice(0, 3)], ans: py, pyopts: true, why: `${zh} · ${es}` });
    }
    case 'type': return { kind: 'type', key, title: 'Escribe en pinyin (los tonos son opcionales)', big: (em ? em + ' ' : '') + esc(es), ans: py, hz: zh, say: zh, show: `${zh} · ${py}` };
    case 'speak': return { kind: 'speak', title: 'Di en voz alta', big: `${em ? em + ' ' : ''}<span class="zh">${esc(zh)}</span>${pyLine(v)}`, ans: zh, say: zh };
    case 'write': return { kind: 'write', title: 'Dibuja el carácter trazo a trazo', ans: zh, py, es, say: zh };
  }
}
const kindsFor = (v, review) => {
  const k = v[3] ? ['img-zh', 'listen-img', 'zh-es', 'type'] : ['zh-es', 'es-zh', 'listen-es', 'type'];
  if (firstTone(v[1]) >= 1 && firstTone(v[1]) <= 4) k.push('listen-py');
  if (!review && SR) k.push('speak');
  return k;
};
const FILL = ['的', '吗', '不', '很', '是', '我'];
function exSentence(u, s, listen) {
  const [toks, py, es] = s, zh = toks.join('');
  const own = new Set(toks);
  const others = shuffle([...new Set(u.sentences.flatMap(x => x[0]))].filter(w => !own.has(w)));
  const extra = others.slice(0, 2).concat(others.length < 2 ? FILL.filter(w => !own.has(w) && !others.includes(w)).slice(0, 2 - others.length) : []);
  return {
    kind: 'build', es, title: listen ? 'Escucha y arma la frase' : 'Arma la frase en chino',
    big: listen ? '🔊' : esc(es), auto: listen ? zh : null, say: listen ? null : null, ans: zh, show: `${zh} · ${py}`,
    words: shuffle([...toks, ...extra]), note: `${py} — ${es}`,
  };
}
function exGram(g) {
  const zh = /[一-鿿]/.test(g.q);
  return { kind: 'mc', title: 'Completa la frase', big: esc(g.q).replace('___', '<span class="blank">___</span>'), opts: g.opts, ans: g.opts[g.a], why: g.why, sayFull: zh ? g.q.replace('___', g.opts[g.a]).replace(/[（(][^）)]*[）)]/g, '') : null, zhopts: zh };
}
function buildUnit(u) {
  const vs = shuffle(u.vocab);
  const q = vs.map(v => exVocab(u, v, pick(kindsFor(v))));
  const again = vs.slice(0, 3).map(v => exVocab(u, v, 'type'));
  const writes = HW() ? shuffle(u.vocab.filter(v => v[0].length === 1)).slice(0, 2).map(v => exVocab(u, v, 'write')) : [];
  const rest = shuffle([
    ...shuffle(u.sentences).slice(0, 3).map((s, i) => exSentence(u, s, i === 2)),
    ...shuffle(u.gram).slice(0, 3).map(exGram),
    ...again,
  ]);
  return [...q, ...rest, ...writes];
}

// ---------- Motor de la lección ----------
let L = null;
function startUnit(u) { runLesson(buildUnit(u), { unit: u }); }
function startReview() {
  const keys = shuffle(dueKeys()).sort((a, b) => S.items[a].box - S.items[b].box).slice(0, 10);
  const q = keys.map(k => { const { u, v } = ITEM[k]; const kinds = kindsFor(v, true); return exVocab(u, v, S.items[k].box >= 2 ? 'type' : pick(kinds.filter(x => x !== 'type'))); });
  runLesson(q, { review: true });
}
function runLesson(queue, meta) {
  L = { queue, total: queue.length, answered: 0, requeued: 0, firstTry: 0, missed: new Set(), meta };
  nextEx();
}
const progress = () => L.answered / (L.total + L.requeued);
function nextEx() {
  if (!L.queue.length) return finish();
  L.cur = L.queue.shift();
  const ex = L.cur;
  app.innerHTML = `<div class="lesson"><div class="topbar"><button class="x" id="x">✕</button>
    <div class="bar"><i style="width:${progress() * 100}%"></i></div></div>
    <div class="ex" id="ex"></div><div class="foot" id="foot"></div></div>`;
  $('#x').onclick = () => { if (confirm('¿Salir de la lección? Perderás el avance de esta vez.')) home(); };
  ({ mc: drawMC, type: drawType, build: drawBuild, speak: drawSpeak, write: drawWrite })[ex.kind](ex);
  if (ex.auto) setTimeout(() => say(ex.auto), 350);
}
const head = ex => `<h2>${ex.title}</h2><div class="big">${ex.big ? `<span>${ex.big}</span>` : ''}${ex.say ? `<button class="sound" data-say="${esc(ex.say)}">🔊</button>` : ''}${ex.auto ? `<button class="sound" data-say="${esc(ex.auto)}">🔊</button><button class="sound" data-say="${esc(ex.auto)}" data-slow="1">🐢</button>` : ''}</div>`;

function resolve(ok, ex, note) {
  L.answered++;
  if (ex.key && !ex.retry) rec(ex.key, ok);
  if (ok && !ex.retry) L.firstTry++;
  if (!ok && !ex.retry) { L.queue.push({ ...ex, retry: true }); L.requeued++; L.missed.add(ex.key || ex.ans); }
  tone(ok ? [660, 880] : [300, 220]);
  const praise = pick(['¡Muy bien!', '¡Excelente!', '¡Perfecto!', '¡Genial!', '¡Eso es!', '¡Súper!']);
  const msg = ok ? `${praise}${note ? '<br><small>' + note + '</small>' : ''}`
    : `Casi… la respuesta es:<br><b class="zh">${esc(ex.show || ex.ans)}</b>${note ? '<br><small>' + note + '</small>' : ''}`;
  const fb = $('#foot');
  fb.className = 'foot ' + (ok ? 'good' : 'bad');
  fb.innerHTML = `<div class="msg">${ok ? '✅' : '💪'} <div>${msg}</div></div><button class="btn" id="cont">Continuar</button>`;
  $('#cont').onclick = nextEx;
  $('#cont').focus();
  const t = ex.sayFull || ex.say || ex.auto || (ex.kind === 'build' ? ex.ans : null);
  if (t) setTimeout(() => say(t), 250);
  const bar = document.querySelector('.bar i'); if (bar) bar.style.width = progress() * 100 + '%';
}

function drawMC(ex) {
  $('#ex').innerHTML = head(ex) + `<div class="opts ${ex.emoji ? 'emo' : ''} ${ex.zhopts ? 'zhs' : ''}">${shuffle(ex.opts).map(o => `<button class="opt" data-v="${esc(o)}">${ex.pyopts ? pyHtml(o) : esc(o)}</button>`).join('')}</div>`;
  $('#ex').querySelectorAll('.opt').forEach(b => {
    b.onclick = () => {
      const ok = b.dataset.v === ex.ans;
      $('#ex').querySelectorAll('.opt').forEach(x => { x.disabled = true; if (x.dataset.v === ex.ans) x.classList.add('right'); });
      if (!ok) b.classList.add('wrong');
      resolve(ok, ex, ex.why);
    };
  });
}

function drawType(ex) {
  $('#ex').innerHTML = head(ex) + `<input id="inp" class="inp" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Escribe el pinyin…">`;
  $('#foot').innerHTML = `<button class="btn" id="chk">Comprobar</button>`;
  const inp = $('#inp'); inp.focus();
  const check = () => {
    if (!inp.value.trim()) return;
    const r = inp.value.trim() === ex.hz ? 'ok' : judge(inp.value, ex.ans);
    inp.disabled = true;
    inp.classList.add(r === 'no' ? 'wrong' : 'right');
    resolve(r !== 'no', ex, r === 'close' ? `Ojo con la ortografía: se escribe “${esc(ex.ans)}”` : r === 'ok' ? `<span class="zh">${esc(ex.hz)}</span> · ${pyHtml(ex.ans)}` : '');
  };
  $('#chk').onclick = check;
  inp.onkeydown = e => { if (e.key === 'Enter') check(); };
}

function drawBuild(ex) {
  const chosen = [];
  const draw = () => {
    $('#line').innerHTML = chosen.map(i => `<button class="chip in zh" data-i="${i}">${esc(ex.words[i])}</button>`).join('') || '<span class="hint">Toca las palabras para armar la frase</span>';
    $('#bank').innerHTML = ex.words.map((w, i) => chosen.includes(i) ? `<span class="chip ghost">${esc(w)}</span>` : `<button class="chip zh" data-i="${i}">${esc(w)}</button>`).join('');
    $('#chk').disabled = !chosen.length;
  };
  $('#ex').innerHTML = head(ex) + `<div class="line" id="line"></div><div class="bank" id="bank"></div>`;
  $('#foot').innerHTML = `<button class="btn" id="chk" disabled>Comprobar</button>`;
  $('#ex').onclick = e => {
    const b = e.target.closest('.chip[data-i]'); if (!b || $('#chk').dataset.done) return;
    const i = +b.dataset.i;
    if (chosen.includes(i)) chosen.splice(chosen.indexOf(i), 1); else { chosen.push(i); say(ex.words[i]); }
    draw();
  };
  $('#chk').onclick = () => {
    $('#chk').dataset.done = 1;
    const r = judgeZh(chosen.map(i => ex.words[i]).join(''), ex.ans);
    resolve(r === 'ok', ex, ex.note);
  };
  draw();
}

function drawSpeak(ex) {
  $('#ex').innerHTML = head(ex) + `<button class="mic" id="mic">🎤</button><p class="hint" id="sp">Toca el micrófono y di la palabra en chino</p>`;
  $('#foot').innerHTML = `<button class="link" id="skipx">Saltar (no puedo hablar ahora)</button>`;
  $('#skipx').onclick = () => { L.total--; nextEx(); };
  let rec_;
  $('#mic').onclick = () => {
    try {
      rec_ = new SR(); rec_.lang = 'zh-CN'; rec_.maxAlternatives = 5;
      $('#mic').classList.add('on'); $('#sp').textContent = 'Te escucho…';
      rec_.onresult = e => {
        const alts = [...e.results[0]].map(a => a.transcript);
        if (alts.some(t => normZh(t).includes(normZh(ex.ans)))) resolve(true, ex, 'Pronunciación entendida 🎉');
        else { $('#sp').textContent = `Escuché “${alts[0]}”. Escucha el modelo e inténtalo otra vez.`; $('#mic').classList.remove('on'); }
      };
      rec_.onerror = () => { $('#sp').textContent = 'No pude escucharte. Revisa el permiso del micrófono o salta este ejercicio.'; $('#mic').classList.remove('on'); };
      rec_.onend = () => $('#mic') && $('#mic').classList.remove('on');
      rec_.start();
    } catch { $('#sp').textContent = 'El micrófono no está disponible. Salta este ejercicio.'; }
  };
}

function drawWrite(ex) {
  $('#ex').innerHTML = `<h2>${ex.title}</h2><div class="big"><span>${esc(ex.es)}</span><button class="sound" data-say="${esc(ex.ans)}">🔊</button></div>
    <p class="hint">${pyHtml(ex.py)} — dibuja con el dedo siguiendo el orden de los trazos</p><div id="writer" class="writer"></div>`;
  $('#foot').innerHTML = `<button class="btn alt" id="hint">💡 Mostrar guía</button><button class="link" id="skipw">Saltar</button>`;
  $('#skipw').onclick = () => { L.total--; nextEx(); };
  const size = Math.min(300, window.innerWidth - 60);
  const w = HanziWriter.create('writer', ex.ans, { width: size, height: size, padding: 10, showOutline: true, showCharacter: false,
    onLoadCharDataError: () => { $('#writer').innerHTML = '<p class="hint">No pude cargar el trazo. Revisa tu conexión.</p>'; } });
  $('#hint').onclick = () => w.animateCharacter();
  w.quiz({ onComplete: s => resolve(true, ex, s.totalMistakes ? `${s.totalMistakes} errores de trazo, ¡sigue practicando!` : '¡Sin errores de trazo!') });
}

// ---------- Resultado ----------
function finish() {
  const { unit, review } = L.meta;
  const pct = L.total ? L.firstTry / L.total : 1;
  let st = 0, xp;
  if (review) xp = L.firstTry * 3;
  else {
    st = pct >= 1 ? 3 : pct >= 0.85 ? 2 : pct >= 0.7 ? 1 : 0;
    const prev = S.units[unit.id] || { stars: 0 };
    S.units[unit.id] = { stars: Math.max(prev.stars, st), best: Math.max(prev.best || 0, Math.round(pct * 100)) };
    xp = L.firstTry * 5 + st * 10;
  }
  touchDay(xp);
  const missed = [...L.missed].map(k => ITEM[k] ? ITEM[k].v[0] : k);
  const msg = review ? '¡Repaso terminado!' : st === 3 ? '¡Perfecto!' : st >= 1 ? '¡Unidad superada!' : 'Casi lo logras';
  const sub = review ? '' : st >= 1 ? '' : '<p>Necesitas al menos 70% para ganar una estrella. ¡Inténtalo otra vez, cada vez sale mejor!</p>';
  app.innerHTML = `<div class="center"><div class="trophy">${review ? '🧠' : st >= 1 ? '🏆' : '💪'}</div><h1>${msg}</h1>
    ${review ? '' : `<div class="stars">${'★'.repeat(st)}${'☆'.repeat(3 - st)}</div>`}
    <p><b>${Math.round(pct * 100)}%</b> a la primera · <b>+${xp}</b> ⭐ puntos</p>${sub}
    ${missed.length ? `<p class="tipbox">Para repasar: <b>${missed.map(esc).join(', ')}</b></p>` : ''}
    <button class="btn" id="home">Continuar</button>
    ${review ? '' : '<button class="link" id="again">Repetir unidad</button>'}</div>`;
  $('#home').onclick = home;
  if ($('#again')) $('#again').onclick = () => startUnit(unit);
  if (st >= 1) tone([523, 659, 784, 1046]);
}

// ---------- Resumen para compartir (WhatsApp, etc.) ----------
function summaryText() {
  const d = day();
  const days = Array.from({ length: 7 }, (_, i) => S.log[d - i]).filter(Boolean);
  const lessons = days.reduce((a, l) => a + l.lessons, 0), xp = days.reduce((a, l) => a + l.xp, 0);
  const keys = Object.keys(S.items).filter(k => ITEM[k]);
  const mastered = keys.filter(k => S.items[k].box >= 4).length;
  const hard = keys.filter(k => S.items[k].wrong).sort((a, b) => S.items[b].wrong - S.items[a].wrong).slice(0, 5).map(k => ITEM[k].v[0]);
  const done = U.filter(u => stars(u) >= 1);
  const lastU = done.length ? done[done.length - 1] : null;
  const streak = S.last >= d - 1 ? S.streak : 0;
  return [
    `📕 Mandarín Quest — resumen de ${S.name}`,
    `📅 Últimos 7 días: practicó ${days.length} de 7 días · ${lessons} ${lessons === 1 ? "lección" : "lecciones"} · ${xp} puntos`,
    `🔥 Racha actual: ${streak} ${streak === 1 ? 'día' : 'días'}`,
    `🔤 Palabras vistas: ${keys.length} · bien aprendidas: ${mastered}`,
    `🏆 Unidades superadas: ${done.length} de ${U.length}${lastU ? ` (última: ${lastU.title})` : ''}`,
    hard.length ? `💪 Les cuestan: ${hard.join(', ')}` : '💪 Aún sin palabras difíciles registradas',
  ].join('\n');
}
async function sendSummary() {
  const text = summaryText();
  try {
    if (navigator.share) { await navigator.share({ text }); return; }
  } catch (e) { if (e && e.name === 'AbortError') return; }
  try { await navigator.clipboard.writeText(text); toast('Resumen copiado. Pégalo en WhatsApp.'); } catch { /* sin portapapeles */ }
  window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
}

// ---------- Panel para adultos ----------
function parent() {
  const keys = Object.keys(S.items).filter(k => ITEM[k]);
  const mastered = keys.filter(k => S.items[k].box >= 4).length;
  const hard = keys.filter(k => S.items[k].wrong).sort((a, b) => S.items[b].wrong - S.items[a].wrong).slice(0, 8);
  const d = day();
  const week = Array.from({ length: 7 }, (_, i) => { const x = d - 6 + i, l = S.log[x] || { xp: 0, lessons: 0 };
    return { n: ['D', 'L', 'M', 'M', 'J', 'V', 'S'][new Date((x * 864e5) + new Date().getTimezoneOffset() * 6e4).getDay()], xp: l.xp, ls: l.lessons }; });
  const mx = Math.max(10, ...week.map(w => w.xp));
  app.innerHTML = `<div class="lesson"><div class="topbar"><button class="x" id="x">←</button><h2 class="tt">Mi progreso</h2></div>
    <div class="ex scroll">
    <div class="stats"><div><b>${keys.length}</b><small>palabras vistas</small></div><div><b>${mastered}</b><small>bien aprendidas</small></div>
      <div><b>${S.streak}</b><small>racha (días)</small></div><div><b>${U.filter(u => stars(u) >= 1).length}/${U.length}</b><small>unidades</small></div></div>
    <h3>Últimos 7 días</h3><div class="week">${week.map(w => `<div><i style="height:${Math.max(4, w.xp / mx * 80)}px"></i><small>${w.n}</small><small>${w.ls || ''}</small></div>`).join('')}</div>
    <p class="sub">Altura = puntos del día · número = lecciones completadas.</p>
    <h3>Palabras que más cuestan</h3>
    ${hard.length ? `<ul>${hard.map(k => `<li><b class="zh">${esc(ITEM[k].v[0])}</b> ${pyHtml(ITEM[k].v[1])} — ${esc(ITEM[k].v[2])} <small>(${S.items[k].wrong} fallos)</small></li>`).join('')}</ul>` : '<p class="sub">Todavía no hay datos.</p>'}
    <h3>Datos</h3><p class="sub">El progreso se guarda solo en este dispositivo. Descarga una copia si quieres respaldarlo.</p>
    <button class="btn small" id="shr">Enviar resumen</button> <button class="btn small" id="exp">Descargar progreso</button> <button class="btn small danger" id="rst">Borrar todo</button></div></div>`;
  $('#x').onclick = home;
  $('#shr').onclick = sendSummary;
  $('#exp').onclick = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' }));
    a.download = 'mandarin-quest-progreso.json'; a.click();
  };
  $('#rst').onclick = () => { if (confirm('¿Seguro? Se borrará todo el progreso.')) { S = fresh(); save(); home(); } };
}

home();
})();
