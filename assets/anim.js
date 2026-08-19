
(function () {
'use strict';
var html = document.documentElement;
html.classList.add('js');
var failsafe = window.__animFailsafe || setTimeout(function () { html.classList.add('anim-done'); }, 2500);
function onMQ(mq, fn) { mq.addEventListener ? mq.addEventListener('change', fn) : mq.addListener(fn); }
function isMouse(e) { return !e.pointerType || e.pointerType === 'mouse'; }
function tapHold(el, holdMs) {
var pressT = 0, holdT = 0, rx = 0, ry = 0, down = false;
function drop() {
down = false;
clearTimeout(pressT); clearTimeout(holdT);
el.classList.remove('tap', 'hold');
}
el.addEventListener('pointerdown', function (e) {
if (isMouse(e)) return;
clearTimeout(pressT); clearTimeout(holdT);
down = true; rx = e.clientX; ry = e.clientY;
el.classList.remove('hold');
pressT = setTimeout(function () { if (down) el.classList.add('tap'); }, 110);
}, { passive: true });
el.addEventListener('pointermove', function (e) {
if (down && Math.abs(e.clientY - ry) + Math.abs(e.clientX - rx) > 16) drop();
}, { passive: true });
el.addEventListener('pointercancel', drop, { passive: true });
el.addEventListener('pointerup', function () {
if (!down) return;
down = false; clearTimeout(pressT);
el.classList.remove('tap');
el.classList.add('hold');
holdT = setTimeout(function () { el.classList.remove('hold'); }, holdMs);
}, { passive: true });
}
var subs = [], rafId = 0, mode;
function loop(now) {
rafId = 0;
if (html.classList.contains('anim-paused')) return;
var active = false;
for (var i = 0; i < subs.length; i++) {
if (subs[i].on) { subs[i].fn(now); active = true; }
}
if (active && !document.hidden) rafId = requestAnimationFrame(loop);
}
function wake() { if (!rafId && !document.hidden && mode !== 'reduced') rafId = requestAnimationFrame(loop); }
function ticker(fn) {
var s = { fn: fn, on: false };
subs.push(s);
return {
start: function () { if (!s.on && mode !== 'reduced') { s.on = true; wake(); } },
stop: function () { s.on = false; }
};
}
document.addEventListener('visibilitychange', function () { if (!document.hidden) wake(); });
function gate(el, t) {
new IntersectionObserver(function (en) {
en[en.length - 1].isIntersecting ? t.start() : t.stop();
}, { rootMargin: '80px' }).observe(el);
}
var mqReduced = matchMedia('(prefers-reduced-motion: reduce)');
var mqFine = matchMedia('(hover: hover) and (pointer: fine)');
var weak = (navigator.connection && navigator.connection.saveData) ||
(navigator.hardwareConcurrency || 8) < 4;
function applyMode() {
mode = mqReduced.matches ? 'reduced' : (mqFine.matches && !weak ? 'full' : 'lite');
html.classList.remove('anim-full', 'anim-lite', 'anim-reduced');
html.classList.add('anim-' + mode);
if (mode === 'reduced') {
for (var i = 0; i < subs.length; i++) subs[i].on = false;
[].forEach.call(document.querySelectorAll('.tc'), function (c) { c.style.transform = ''; });
[].forEach.call(document.querySelectorAll('.stat'), function (c) {
c.style.transform = '';
c.classList.remove('hot');
c.style.removeProperty('--nx'); c.style.removeProperty('--ny');
});
[].forEach.call(document.querySelectorAll('#signs .sign'), function (c) {
c.style.transform = '';
c.classList.remove('hot', 'xin');
c.style.removeProperty('--nx'); c.style.removeProperty('--ny');
});
var c0r = document.querySelector('#case0 .case0-box');
if (c0r) {
c0r.classList.remove('boot', 'lit1', 'lit2', 'lit3', 'zap1', 'zap2', 'zap3');
[].forEach.call(c0r.querySelectorAll('.case0-agent'), function (a) { a.classList.remove('run'); });
}
[].forEach.call(document.querySelectorAll('#formats .fmt'), function (c) {
c.classList.remove('demo', 'hit', 'rst');
});
var fgr = document.querySelector('#formats .formats');
if (fgr) fgr.classList.remove('fpon');
var fmb = document.querySelector('#formats .memeband');
if (fmb) fmb.classList.remove('clk');
var sgb = document.querySelector('#try .sigbar');
if (sgb) {
sgb.classList.remove('sigin');
[].forEach.call(sgb.querySelectorAll('.sig i'), function (b) { b.style.removeProperty('--a'); });
}
var sgt = document.querySelector('#try .try');
if (sgt) { sgt.classList.remove('sigon'); sgt.style.removeProperty('--tone'); sgt.style.removeProperty('--near'); }
var sgc = document.querySelector('#try .try-cta');
if (sgc) {
sgc.classList.remove('hit', 'rush');
var sgb2 = sgc.querySelector('.btn');
if (sgb2) sgb2.setAttribute('href', sgb2.getAttribute('href').replace(/try_\w+/, 'try_demo'));
}
[].forEach.call(document.querySelectorAll('#try .tc'), function (c) { c.classList.remove('on'); });
[].forEach.call(document.querySelectorAll('#reviews .review'), function (c) { c.classList.remove('tap', 'hold'); });
[].forEach.call(document.querySelectorAll('#guarantee .g'), function (c) { c.classList.remove('tap', 'hold'); });
var prg = document.querySelector('#pricing .prices');
if (prg) {
prg.classList.remove('lit');
[].forEach.call(prg.querySelectorAll('.price'), function (c) {
c.classList.remove('near', 'adj', 'tap', 'hold');
var rim = c.querySelector('.rim');
if (rim) rim.style.removeProperty('--gx');
});
}
var cfb = document.querySelector('.memeband.cofe');
if (cfb) cfb.classList.remove('sip');
var csb = document.querySelector('#cases .cases');
if (csb) {
csb.style.transform = '';
[].forEach.call(csb.querySelectorAll('.case'), function (c) { c.classList.remove('chg', 'near', 'far', 'hit'); });
}
[].forEach.call(document.querySelectorAll('.steps5 .step'), function (s) {
s.classList.remove('run', 'pass', 'tap', 'hov', 'fade');
s.style.removeProperty('--durx');
s.style.removeProperty('--fadex');
});
var snt = document.querySelector('#process .setupnote');
if (snt) { snt.classList.remove('on'); snt.style.removeProperty('--durx'); }
var mb = document.querySelector('.final .box .btn');
if (mb) mb.style.transform = '';
var fnb = document.querySelector('.final .box');
if (fnb) {
fnb.classList.remove('tap', 'hold', 'zap');
var fnn = fnb.querySelector('.fr-near');
if (fnn) fnn.style.removeProperty('opacity');
}
var de = document.querySelector('.dm-eyes');
if (de) { de.style.setProperty('--ex', '0px'); de.style.setProperty('--ey', '0px'); }
}
}
applyMode();
onMQ(mqReduced, applyMode);
onMQ(mqFine, applyMode);
[].forEach.call(document.querySelectorAll('[data-stagger]'), function (grid) {
[].forEach.call(grid.children, function (child, i) {
if (!child.hasAttribute('data-reveal')) child.setAttribute('data-reveal', grid.getAttribute('data-stagger') || 'up');
child.style.setProperty('--d', Math.min(i, 6) * 60 + 'ms');
});
});
var toReveal = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && mode !== 'reduced') {
var ioAlive = false;
var rio = new IntersectionObserver(function (entries) {
if (!ioAlive) { ioAlive = true; clearTimeout(failsafe); }
entries.forEach(function (e) {
if (e.isIntersecting) { e.target.classList.add('in'); e.target.classList.add('seen'); }
});
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
var rioOut = new IntersectionObserver(function (entries) {
entries.forEach(function (e) {
if (e.isIntersecting) return;
var r = e.boundingClientRect;
var vh = window.innerHeight || document.documentElement.clientHeight;
if (r.bottom <= 1 || r.top >= vh - 1) e.target.classList.remove('in');
});
}, { threshold: 0 });
[].forEach.call(toReveal, function (el) { rio.observe(el); rioOut.observe(el); });
document.addEventListener('focusin', function (e) {
var host = e.target.closest && e.target.closest('[data-reveal]');
if (host) host.classList.add('in');
});
} else {
[].forEach.call(toReveal, function (el) { el.classList.add('in'); });
}
var nav = document.querySelector('nav');
var lastY = -1, scheduled = false;
addEventListener('scroll', function () {
if (scheduled) return;
scheduled = true;
requestAnimationFrame(function () {
scheduled = false;
var y = scrollY;
if ((y > 80) !== (lastY > 80) || lastY < 0) nav.classList.toggle('shrunk', y > 80);
lastY = y;
});
}, { passive: true });
var sticky = document.querySelector('.sticky');
if (sticky) {
sticky.classList.add('wait');
var stickyShown = false;
addEventListener('scroll', function () {
if (!stickyShown && scrollY > innerHeight * 0.8) {
stickyShown = true;
sticky.classList.remove('wait');
}
}, { passive: true });
}
var signsGrid = document.querySelector('#signs .signs');
if (signsGrid) {
var signEls = [].slice.call(signsGrid.querySelectorAll('.sign:not(.win)'));
var winEl = signsGrid.querySelector('.sign.win');
var band = document.querySelector('#signs .memeband');
var sPaused = function () { return html.classList.contains('anim-paused'); };
function syncOwned() {
if (!winEl || !signEls.length) return;
var n = signsGrid.querySelectorAll('.sign.own').length;
winEl.style.setProperty('--p', (n / signEls.length * 100).toFixed(1));
winEl.classList.toggle('urge', n >= 3);
}
syncOwned();
function signPing(el, e) {
var b = el.getBoundingClientRect();
var ping = document.createElement('span');
ping.className = 'ping';
ping.setAttribute('aria-hidden', 'true');
ping.style.setProperty('--px', (e && e.clientX ? e.clientX - b.left : b.width / 2).toFixed(0) + 'px');
ping.style.setProperty('--py', (e && e.clientY ? e.clientY - b.top : b.height / 2).toFixed(0) + 'px');
el.appendChild(ping);
setTimeout(function () { ping.remove(); }, 640);
el.classList.remove('tap');
void el.offsetWidth;
el.classList.add('tap');
}
signEls.forEach(function (sg) {
sg.setAttribute('role', 'checkbox');
sg.setAttribute('aria-checked', 'false');
sg.setAttribute('tabindex', '0');
function toggle(e) {
var on = !sg.classList.contains('own');
sg.classList.toggle('own', on);
sg.setAttribute('aria-checked', on ? 'true' : 'false');
syncOwned();
if (mode === 'reduced' || sPaused()) return;
signPing(sg, e);
}
sg.addEventListener('click', toggle);
sg.addEventListener('keydown', function (e) {
if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') { e.preventDefault(); toggle(null); }
});
sg.addEventListener('animationend', function (e) {
if (e.animationName === 'tapSpring') sg.classList.remove('tap');
});
var box = null, live = false;
var nxT = 0, nyT = 0, nx = 0, ny = 0;
var sxT = 0, syT = 0, sx = 0, sy = 0;
var tick = ticker(function () {
nx += (nxT - nx) * 0.16; ny += (nyT - ny) * 0.16;
sx += (sxT - sx) * 0.16; sy += (syT - sy) * 0.16;
sg.style.setProperty('--nx', nx.toFixed(4));
sg.style.setProperty('--ny', ny.toFixed(4));
sg.style.setProperty('--sx', sx.toFixed(1) + 'px');
sg.style.setProperty('--sy', sy.toFixed(1) + 'px');
sg.style.transform = 'perspective(800px) rotateX(' + (-ny * 3.2).toFixed(2) +
'deg) rotateY(' + (nx * 3.2).toFixed(2) + 'deg) translateY(' + (live ? -3 : 0) + 'px)';
if (!live && Math.abs(nx) + Math.abs(ny) < 0.002) {
sg.style.transform = '';
sg.style.removeProperty('--nx'); sg.style.removeProperty('--ny');
tick.stop();
}
});
if (mode === 'full') {
sg.addEventListener('pointerenter', function (e) {
if (!isMouse(e) || mode !== 'full') return;
box = sg.getBoundingClientRect(); live = true;
sg.classList.add('hot');
tick.start();
}, { passive: true });
sg.addEventListener('pointermove', function (e) {
if (!box || !isMouse(e) || mode !== 'full') return;
nxT = (e.clientX - box.left) / box.width - 0.5;
nyT = (e.clientY - box.top) / box.height - 0.5;
sxT = e.clientX - box.left; syT = e.clientY - box.top;
tick.start();
}, { passive: true });
sg.addEventListener('pointerleave', function () {
live = false; box = null; nxT = 0; nyT = 0;
sg.classList.remove('hot');
tick.start();
}, { passive: true });
addEventListener('scroll', function () { if (live) box = sg.getBoundingClientRect(); }, { passive: true });
}
});
if (winEl && mode === 'full') {
var wb = null, wLive = false, wxT = 0, wyT = 0, wx = 0, wy = 0;
var wTick = ticker(function () {
wx += (wxT - wx) * 0.14; wy += (wyT - wy) * 0.14;
winEl.style.transform = 'translate(' + wx.toFixed(2) + 'px,' + wy.toFixed(2) + 'px)';
if (!wLive && Math.abs(wx) + Math.abs(wy) < 0.05) {
winEl.style.transform = '';
wTick.stop();
}
});
winEl.addEventListener('pointerenter', function (e) {
if (!isMouse(e) || mode !== 'full') return;
wb = winEl.getBoundingClientRect(); wLive = true;
winEl.classList.add('hot'); wTick.start();
}, { passive: true });
winEl.addEventListener('pointermove', function (e) {
if (!wb || !isMouse(e) || mode !== 'full') return;
wxT = ((e.clientX - wb.left) / wb.width - 0.5) * 6;
wyT = ((e.clientY - wb.top) / wb.height - 0.5) * 6;
winEl.style.setProperty('--sx', (e.clientX - wb.left).toFixed(1) + 'px');
winEl.style.setProperty('--sy', (e.clientY - wb.top).toFixed(1) + 'px');
wTick.start();
}, { passive: true });
winEl.addEventListener('pointerleave', function () {
wLive = false; wb = null; wxT = 0; wyT = 0;
winEl.classList.remove('hot'); wTick.start();
}, { passive: true });
addEventListener('scroll', function () { if (wLive) wb = winEl.getBoundingClientRect(); }, { passive: true });
}
if ('IntersectionObserver' in window) {
var xio = new IntersectionObserver(function (en) {
en.forEach(function (e) {
if (!e.isIntersecting) return;
xio.unobserve(e.target);
if (mode === 'reduced' || sPaused()) return;
var el = e.target, d = signEls.indexOf(el) * 90 + 120;
setTimeout(function () {
el.classList.add('xin');
setTimeout(function () { el.classList.remove('xin'); }, 620);
}, d);
});
}, { threshold: 0.4 });
signEls.forEach(function (sg) { xio.observe(sg); });
}
if (band) {
var wtfT = 0, wtfCool = 0;
var wtf = function () {
if (mode === 'reduced' || sPaused()) return;
var now = performance.now();
if (now < wtfCool) return;
wtfCool = now + 1600;
band.classList.add('wtf');
clearTimeout(wtfT);
wtfT = setTimeout(function () { band.classList.remove('wtf'); }, 560);
};
band.addEventListener('pointerenter', function (e) { if (isMouse(e) && mode === 'full') wtf(); }, { passive: true });
band.addEventListener('click', wtf);
var mbPh = band.querySelector('.mb-photo');
if (mbPh && 'IntersectionObserver' in window) {
var capT = 0;
new IntersectionObserver(function (en) {
if (!en[en.length - 1].isIntersecting || mode === 'reduced') return;
mbPh.classList.add('capin');
clearTimeout(capT);
capT = setTimeout(function () { mbPh.classList.remove('capin'); }, 950);
}, { threshold: .35 }).observe(mbPh);
}
var mbP = band.querySelector('.mb-text p:not(.mb-h)');
if (mbP) {
[].slice.call(mbP.querySelectorAll('span')).concat([mbP]).some(function (host) {
var node = host.firstChild;
if (!node || node.nodeType !== 3) return false;
var txt = node.nodeValue;
var dot = txt.indexOf('.');
if (dot < 4) return false;
var head = txt.slice(0, dot), tail = txt.slice(dot);
var parts = head.split(',');
if (parts.length < 3 || parts.length > 4) return false;
var frag = document.createDocumentFragment();
parts.forEach(function (part, i) {
if (i) frag.appendChild(document.createTextNode(','));
var lead = part.match(/^\s*/)[0];
if (lead) frag.appendChild(document.createTextNode(lead));
var sp = document.createElement('span');
sp.className = 'rt';
sp.style.setProperty('--r', i);
sp.textContent = part.slice(lead.length);
frag.appendChild(sp);
});
frag.appendChild(document.createTextNode(tail));
host.replaceChild(frag, node);
return true;
});
var rts = [].slice.call(mbP.querySelectorAll('.rt'));
if (rts.length && mode !== 'reduced') {
var rIdx = 0, rOn = true, rT = 0, rHit = 0;
var STEP = 700, HOLD = 2800;
var rStop = function () {
var sec = document.getElementById('signs');
return document.hidden || sPaused() || !(sec && sec.classList.contains('amb-on'));
};
var rNext = function (ms) { rT = setTimeout(rTick, ms); };
function rTick() {
if (rStop()) return rNext(STEP);
if (rOn) {
rts[rIdx].classList.add('x');
if (++rIdx >= rts.length) { rOn = false; rIdx = rts.length - 1; return rNext(HOLD); }
} else {
rts[rIdx].classList.remove('x');
if (--rIdx < 0) { rOn = true; rIdx = 0; return rNext(HOLD); }
}
rNext(STEP);
}
rNext(1200);
band.addEventListener('click', function () {
if (sPaused()) return;
clearTimeout(rT); clearTimeout(rHit);
mbP.classList.add('hit');
rts.forEach(function (el) { el.classList.add('x'); });
rOn = false; rIdx = rts.length - 1;
rHit = setTimeout(function () { mbP.classList.remove('hit'); }, 600);
rNext(HOLD);
});
}
}
}
}
[].forEach.call(document.querySelectorAll('#reviews .review'), function (c) { tapHold(c, 1800); });
[].forEach.call(document.querySelectorAll('#guarantee .guar .g'), function (g) { tapHold(g, 1400); });
var finBox = document.querySelector('.final .box');
if (finBox) {
var finNear = finBox.querySelector('.fr-near');
var finBtn = finBox.querySelector('.btn');
var FIN_BASE = 0.72;
var FIN_R = 380;
var finWant = 0, finV = FIN_BASE, finRect = null, finTouch = 0, finRel = 0, finZapT = 0;
tapHold(finBox, 1500);
var finTick = ticker(function () {
var t = finBox.classList.contains('tap') ? 1
: finBox.classList.contains('hold') ? 0.55 : finWant;
var to = FIN_BASE + (1 - FIN_BASE) * t;
finV += (to - finV) * 0.12;
if (Math.abs(to - finV) < 0.004) {
finV = to;
if (!finTouch) finTick.stop();
}
if (finV <= FIN_BASE + 0.001) finNear.style.removeProperty('opacity');
else finNear.style.opacity = finV.toFixed(3);
});
addEventListener('scroll', function () { finRect = null; }, { passive: true });
finBox.addEventListener('pointermove', function (e) {
if (!isMouse(e) || mode === 'reduced') return;
if (!finRect) finRect = finBtn.getBoundingClientRect();
var dx = e.clientX - (finRect.left + finRect.width / 2);
var dy = e.clientY - (finRect.top + finRect.height / 2);
var k = 1 - Math.sqrt(dx * dx + dy * dy) / FIN_R;
finWant = k <= 0 ? 0 : k * k * (3 - 2 * k);
finTick.start();
}, { passive: true });
finBox.addEventListener('pointerleave', function () {
finWant = 0; finRect = null; finTick.start();
}, { passive: true });
finBox.addEventListener('pointerdown', function (e) {
if (isMouse(e)) return;
clearTimeout(finRel); finTouch = 1; finTick.start();
}, { passive: true });
function finRelease(e) {
if (e && isMouse(e)) return;
clearTimeout(finRel);
finRel = setTimeout(function () { finTouch = 0; finTick.start(); }, 1700);
}
finBox.addEventListener('pointerup', finRelease, { passive: true });
finBox.addEventListener('pointercancel', finRelease, { passive: true });
if (finBtn) finBtn.addEventListener('pointerdown', function () {
finBox.classList.remove('zap');
void finBox.offsetWidth;
finBox.classList.add('zap');
clearTimeout(finZapT);
finZapT = setTimeout(function () { finBox.classList.remove('zap'); }, 820);
}, { passive: true });
}
if (mode === 'reduced') return;
var vh = document.querySelector('.voicehook');
var waveBox = vh && vh.querySelector('.wave');
if (waveBox) {
waveBox.textContent = '';
var bars = [];
for (var b = 0; b < 16; b++) {
var bar = document.createElement('i');
waveBox.appendChild(bar);
bars.push(bar);
}
var gain = 0.35, targetGain = 0.35;
function levelAt(i, t, g) {
if (window.__waveLevel) return window.__waveLevel(i, t, g);
var a = Math.sin(t * 2.1 + i * 0.55) * 0.5 + 0.5;
var c = Math.sin(t * 3.7 + i * 1.31) * 0.5 + 0.5;
return (0.18 + (a * 0.6 + c * 0.4) * 0.72) * g;
}
var waveT = ticker(function (now) {
var t = now / 1000;
gain += (targetGain - gain) * 0.08;
for (var i = 0; i < bars.length; i++) {
bars[i].style.setProperty('--l', levelAt(i, t, gain).toFixed(3));
}
});
gate(vh, waveT);
vh.addEventListener('pointerenter', function (e) { if (isMouse(e)) targetGain = 0.7; }, { passive: true });
vh.addEventListener('pointerleave', function () { targetGain = 0.35; }, { passive: true });
vh.addEventListener('focusin', function () { targetGain = 0.7; });
vh.addEventListener('focusout', function () { targetGain = 0.35; });
vh.addEventListener('click', function () {
targetGain = 1;
setTimeout(function () { targetGain = 0.35; }, 900);
});
}
var tryBox = document.querySelector('.try');
if (tryBox) {
var P = parseInt(getComputedStyle(tryBox).getPropertyValue('--particles'), 10);
if (isNaN(P)) P = 50;
var starN = mode === 'full' ? P : Math.round(P * 0.35);
if (starN > 0) {
var starsHost = document.createElement('div');
starsHost.className = 'stars';
starsHost.setAttribute('aria-hidden', 'true');
for (var st = 0; st < starN; st++) {
var star = document.createElement('i');
star.style.left = (Math.random() * 100) + '%';
star.style.top = (Math.random() * 100) + '%';
star.style.animationDelay = (Math.random() * 3).toFixed(2) + 's';
starsHost.appendChild(star);
}
tryBox.insertBefore(starsHost, tryBox.firstChild);
}
var rect = null, live = false;
var tx1 = 0, ty1 = 0, cx1 = 0, cy1 = 0, tx2 = 0, ty2 = 0, cx2 = 0, cy2 = 0;
var sx = 0, sy = 0, csx = 0, csy = 0;
var PULL1 = 110, PULL2 = 70, EASE = 0.055;
var TILT = parseFloat(getComputedStyle(tryBox).getPropertyValue('--tilt-max')) || 10;
var t0 = performance.now(), last = t0;
var measureQueued = false;
function measure() { rect = tryBox.getBoundingClientRect(); }
function queueMeasure() {
if (measureQueued) return;
measureQueued = true;
requestAnimationFrame(function () { measureQueued = false; measure(); });
}
var nearBtn = tryBox.querySelector('.try-cta .btn'), bcx = 0, bcy = 0, nearNow = -1;
var NEAR_R = matchMedia('(max-width:860px)').matches ? 300 : 420;
function nearMeasure() {
if (!nearBtn) return;
var b = nearBtn.getBoundingClientRect();
bcx = b.left + b.width / 2; bcy = b.top + b.height / 2;
}
function setNear(v) {
if (v === nearNow) return;
nearNow = v;
tryBox.style.setProperty('--near', v);
}
if (mode === 'full') {
var spot = document.createElement('div');
spot.className = 'spot';
spot.setAttribute('aria-hidden', 'true');
tryBox.insertBefore(spot, tryBox.firstChild);
tryBox.addEventListener('pointerenter', function (e) {
if (!isMouse(e)) return;
measure(); nearMeasure(); live = true; tryBox.classList.add('live');
}, { passive: true });
tryBox.addEventListener('pointermove', function (e) {
if (!rect || !isMouse(e)) return;
var nx = (e.clientX - rect.left) / rect.width - 0.5;
var ny = (e.clientY - rect.top) / rect.height - 0.5;
tx1 = nx * PULL1 * 2; ty1 = ny * PULL1 * 2;
tx2 = -nx * PULL2 * 2; ty2 = -ny * PULL2 * 2;
sx = e.clientX - rect.left; sy = e.clientY - rect.top;
var d = Math.sqrt((e.clientX - bcx) * (e.clientX - bcx) + (e.clientY - bcy) * (e.clientY - bcy));
setNear(Math.round(Math.pow(Math.max(0, 1 - d / NEAR_R), 1.6) * 10) / 10);
}, { passive: true });
tryBox.addEventListener('pointerleave', function () {
live = false; tryBox.classList.remove('live');
tx1 = ty1 = tx2 = ty2 = 0;
setNear(0);
}, { passive: true });
addEventListener('resize', function () { queueMeasure(); nearMeasure(); }, { passive: true });
addEventListener('scroll', function () { if (live) { queueMeasure(); nearMeasure(); } }, { passive: true });
}
var glowT = ticker(function (now) {
var dt = Math.min((now - last) / 1000, 0.05); last = now;
var t = (now - t0) / 1000;
var fx1 = Math.sin(t * 0.31) * 34 + Math.sin(t * 0.113 + 1.7) * 18;
var fy1 = Math.cos(t * 0.23) * 26 + Math.cos(t * 0.171 + 0.4) * 14;
var fx2 = Math.cos(t * 0.27) * 30 + Math.sin(t * 0.097 + 3.1) * 16;
var fy2 = Math.sin(t * 0.19) * 22 + Math.cos(t * 0.143 + 2.2) * 12;
var k = 1 - Math.pow(1 - EASE, dt * 60);
cx1 += ((tx1 + fx1) - cx1) * k; cy1 += ((ty1 + fy1) - cy1) * k;
cx2 += ((tx2 + fx2) - cx2) * k; cy2 += ((ty2 + fy2) - cy2) * k;
tryBox.style.setProperty('--gx1', cx1.toFixed(1) + 'px');
tryBox.style.setProperty('--gy1', cy1.toFixed(1) + 'px');
tryBox.style.setProperty('--gx2', cx2.toFixed(1) + 'px');
tryBox.style.setProperty('--gy2', cy2.toFixed(1) + 'px');
var s1 = 1 + Math.sin(t * 0.41 + 0.9) * 0.09 + Math.sin(t * 0.157) * 0.05;
var s2 = 1 + Math.cos(t * 0.34 + 2.6) * 0.08 + Math.sin(t * 0.121 + 1.1) * 0.06;
tryBox.style.setProperty('--gs1', s1.toFixed(3));
tryBox.style.setProperty('--gs2', s2.toFixed(3));
if (live) {
csx += (sx - csx) * k; csy += (sy - csy) * k;
tryBox.style.setProperty('--spx', csx.toFixed(1) + 'px');
tryBox.style.setProperty('--spy', csy.toFixed(1) + 'px');
}
});
gate(tryBox, glowT);
if (mode === 'full') {
[].forEach.call(tryBox.querySelectorAll('.tc'), function (card) {
var r = null;
card.addEventListener('pointerenter', function (e) {
if (isMouse(e)) r = card.getBoundingClientRect();
}, { passive: true });
card.addEventListener('pointermove', function (e) {
if (!r || !isMouse(e)) return;
var nx = (e.clientX - r.left) / r.width - 0.5;
var ny = (e.clientY - r.top) / r.height - 0.5;
card.style.transform = 'perspective(600px) rotateX(' + (-ny * TILT) + 'deg) rotateY(' + (nx * TILT) + 'deg) translateY(-3px)';
}, { passive: true });
card.addEventListener('pointerleave', function () { card.style.transform = ''; r = null; }, { passive: true });
});
}
}
var sigBar = document.querySelector('#try .sigbar');
if (sigBar) {
var sigEls = [].slice.call(sigBar.querySelectorAll('.sig i'));
var SN = sigEls.length;
for (var sgi = 0; sgi < SN; sgi++) sigEls[sgi].style.setProperty('--k', sgi);
var tryEl = document.querySelector('#try .try');
var sigCta = document.querySelector('#try .try-cta');
var sigCards = [].slice.call(document.querySelectorAll('#try .tc'));
function sigNz(k) { var s = Math.sin(k * 127.1 + 4.3) * 43758.5453; return s - Math.floor(s); }
var SPAT = {
voice: function (k, n) {
var u = k / (n - 1);
var env = Math.pow(Math.sin(Math.PI * u), 0.6) * (0.58 + 0.42 * Math.sin(u * 9.4));
return 50 + 42 * env * Math.sin(k * 0.62);
},
market: function (k, n) {
return 16 + 62 * (k / (n - 1)) + 9 * Math.sin(k * 0.72) + 5 * sigNz(k);
},
photo: function (k) { return 26 + 48 * sigNz(Math.floor(k / 6)); },
pain: function (k, n) {
var u = k / (n - 1);
var m = Math.min(1, Math.max(0, (u - 0.2) / 0.55));
return (18 + 68 * sigNz(k)) * (1 - m) + 50 * m;
}
};
var sigOffT = 0, sigFireT = 0, sigHrefT = 0, sigUser = false, sigHold = 0, sigSeen = false;
var sigBtnEl = sigCta && sigCta.querySelector('.btn');
var sigHref = sigBtnEl ? sigBtnEl.getAttribute('href') : '';
function sigOn(card, shoot, auto) {
if (html.classList.contains('anim-paused')) return;
if (auto) { if (sigUser || performance.now() < sigHold) return; } else { sigUser = true; }
clearTimeout(sigOffT);
for (var i = 0; i < sigCards.length; i++) sigCards[i].classList.remove('on');
card.classList.add('on');
tryEl.classList.add('sigon');
tryEl.style.setProperty('--tone', getComputedStyle(card).getPropertyValue('--tone').trim());
if (mode !== 'full' && !auto) tryEl.style.setProperty('--near', '1');
var ch = card.getAttribute('data-sig');
var f = SPAT[ch] || SPAT.voice;
for (var j = 0; j < SN; j++) sigEls[j].style.setProperty('--a', f(j, SN).toFixed(1));
if (sigBtnEl && !auto && sigHref) {
clearTimeout(sigHrefT);
sigBtnEl.setAttribute('href', sigHref.replace('try_demo', 'try_' + ch));
}
if (!shoot || mode === 'reduced') return;
clearTimeout(sigFireT);
sigCta.classList.remove('hit');
void sigCta.offsetWidth;
sigCta.classList.add('hit');
sigFireT = setTimeout(function () { sigCta.classList.remove('hit'); }, 1400);
}
function sigOff(auto) {
if (!auto) { sigUser = false; sigHold = performance.now() + 12000; }
if (sigBtnEl && sigHref) {
clearTimeout(sigHrefT);
sigHrefT = setTimeout(function () { sigBtnEl.setAttribute('href', sigHref); }, 8000);
}
for (var i = 0; i < sigCards.length; i++) sigCards[i].classList.remove('on');
tryEl.classList.remove('sigon');
tryEl.style.removeProperty('--tone');
if (mode !== 'full') tryEl.style.setProperty('--near', sigSeen ? '.45' : '0');
for (var j = 0; j < SN; j++) sigEls[j].style.removeProperty('--a');
}
for (var sc = 0; sc < sigCards.length; sc++) {
(function (card) {
card.addEventListener('pointerenter', function (e) {
if (mode === 'lite' || !isMouse(e)) return;
sigOn(card, false);
}, { passive: true });
card.addEventListener('pointerleave', function (e) {
if (mode === 'lite' || !isMouse(e)) return;
sigOff();
}, { passive: true });
function sigPick() {
sigOn(card, true);
if (mode !== 'full') sigOffT = setTimeout(sigOff, 2800);
}
card.addEventListener('click', sigPick);
card.setAttribute('tabindex', '0');
card.addEventListener('keydown', function (e) {
if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') { e.preventDefault(); sigPick(); }
});
})(sigCards[sc]);
}
var sigBtn = sigCta && sigCta.querySelector('.btn');
if (sigBtn) {
sigBtn.addEventListener('pointerenter', function (e) {
if (mode !== 'full' || !isMouse(e) || html.classList.contains('anim-paused')) return;
sigCta.classList.add('rush');
}, { passive: true });
sigBtn.addEventListener('pointerleave', function () { sigCta.classList.remove('rush'); }, { passive: true });
}
if ('IntersectionObserver' in window) {
var sio = new IntersectionObserver(function (en) {
if (!en[en.length - 1].isIntersecting) return;
sio.disconnect();
if (mode === 'reduced') return;
sigBar.classList.add('sigin');
setTimeout(function () { sigBar.classList.remove('sigin'); }, 1300);
}, { threshold: 0.3 });
sio.observe(sigBar);
var sigAutoIv = 0, sigAutoI = 0, sigAutoT0 = 0, sigAutoOffT = 0;
function sigAutoStep() {
if (document.hidden || mode === 'reduced' || html.classList.contains('anim-paused')) return;
var card = sigCards[sigAutoI++ % sigCards.length];
sigOn(card, false, true);
clearTimeout(sigAutoOffT);
sigAutoOffT = setTimeout(function () { if (!sigUser) sigOff(true); }, 3400);
}
new IntersectionObserver(function (en) {
var vis = en[en.length - 1].isIntersecting;
sigSeen = vis;
if (mode !== 'full' && !sigUser) tryEl.style.setProperty('--near', vis ? '.45' : '0');
if (vis && !sigAutoIv && !sigAutoT0 && mode !== 'reduced') {
sigAutoT0 = setTimeout(function () {
sigAutoT0 = 0;
sigAutoStep();
sigAutoIv = setInterval(sigAutoStep, 8000);
}, 4000);
} else if (!vis) {
clearTimeout(sigAutoT0); sigAutoT0 = 0;
clearTimeout(sigAutoOffT);
if (sigAutoIv) { clearInterval(sigAutoIv); sigAutoIv = 0; }
if (!sigUser) sigOff(true);
}
}, { threshold: 0.35 }).observe(sigBar);
}
}
var cofeBand = document.querySelector('.memeband.cofe');
if (cofeBand) {
var cofeH = cofeBand.querySelector('.mb-h span');
if (cofeH && cofeH.textContent.indexOf('☕') > -1) {
cofeH.innerHTML = cofeH.textContent.replace(/\s*☕/, ' <i class="cu">☕</i>');
}
var cofeT = 0;
cofeBand.addEventListener('click', function () {
if (mode === 'reduced' || html.classList.contains('anim-paused')) return;
clearTimeout(cofeT);
cofeBand.classList.remove('sip');
void cofeBand.offsetWidth;
cofeBand.classList.add('sip');
cofeT = setTimeout(function () { cofeBand.classList.remove('sip'); }, 1400);
});
}
var statGrid = document.querySelector('.statgrid');
if (statGrid) {
var statEls = [].slice.call(statGrid.querySelectorAll('.stat'));
var memeEl = statGrid.querySelector('.meme');
var jet = statGrid.querySelector('.jet');
var isPaused = function () { return html.classList.contains('anim-paused'); };
function makeSpark(one, i) {
var sp = document.createElement('i');
sp.className = one ? 'sp one' : 'sp';
sp.style.setProperty('--dx', ((i % 2 ? 1 : -1) * (one ? 4 + Math.random() * 9 : 1 + Math.random() * 3)).toFixed(1) + 'px');
sp.style.setProperty('--dy', ((one ? 72 : 52) + Math.random() * 26).toFixed(0) + 'px');
sp.style.setProperty('--sd', (one ? 0.5 + Math.random() * 0.35 : 0.95 + Math.random() * 0.75).toFixed(2) + 's');
sp.style.setProperty('--dl', (one ? Math.random() * 0.12 : i * 0.19 + Math.random() * 0.5).toFixed(2) + 's');
sp.style.marginLeft = ((i % 2 ? -1 : 1) * Math.random() * 3).toFixed(1) + 'px';
return sp;
}
if (jet) {
var sparkN = mode === 'full' ? 12 : 5;
for (var sI = 0; sI < sparkN; sI++) jet.appendChild(makeSpark(false, sI));
}
if (memeEl) {
var launched = false, rktIn = memeEl.querySelector('.rkt-in');
var launch = function (instant) {
if (launched) return;
launched = true;
if (instant && rktIn) {
rktIn.style.transition = 'none';
memeEl.classList.add('launched');
void rktIn.offsetWidth;
rktIn.style.transition = '';
return;
}
memeEl.classList.add('launched', 'liftoff');
setTimeout(function () { memeEl.classList.remove('liftoff'); }, 2650);
};
if (!('IntersectionObserver' in window)) launch(true);
else {
var lio = new IntersectionObserver(function (en) {
en.forEach(function (e) {
if (!e.isIntersecting) return;
lio.disconnect();
launch(isPaused());
});
}, { threshold: 0.25 });
lio.observe(memeEl);
}
}
var counters = [];
statEls.forEach(function (st) {
var num = st.querySelector('.num');
if (!num) return;
[].slice.call(num.childNodes).forEach(function (node) {
if (node.nodeType !== 3 || !/\d/.test(node.nodeValue)) return;
var frag = document.createDocumentFragment();
node.nodeValue.split(/(\d+)/).forEach(function (p) {
if (!p) return;
if (/^\d+$/.test(p)) {
var cn = document.createElement('span');
cn.className = 'cn';
cn.textContent = p;
cn.setAttribute('data-to', p);
counters.push(cn);
frag.appendChild(cn);
} else frag.appendChild(document.createTextNode(p));
});
node.parentNode.replaceChild(frag, node);
});
});
var cRaf = 0;
function countFinish() {
counters.forEach(function (cn) {
cn.textContent = cn.getAttribute('data-to');
cn.style.minWidth = '';
});
}
function countRun() {
if (!counters.length || mode === 'reduced') return;
cancelAnimationFrame(cRaf);
if (isPaused()) return countFinish();
counters.forEach(function (cn) {
cn.textContent = cn.getAttribute('data-to');
cn.style.minWidth = '';
cn.style.minWidth = cn.getBoundingClientRect().width.toFixed(1) + 'px';
});
var t0 = performance.now(), DUR = 700;
(function step(now) {
if (mode === 'reduced' || isPaused()) return countFinish();
var p = Math.min((now - t0) / DUR, 1);
var e = 1 - Math.pow(1 - p, 3);
counters.forEach(function (cn) {
cn.textContent = String(Math.round(parseInt(cn.getAttribute('data-to'), 10) * e));
});
if (p < 1) cRaf = requestAnimationFrame(step);
else countFinish();
})(performance.now());
}
if ('IntersectionObserver' in window) {
new IntersectionObserver(function (en) {
if (en[en.length - 1].isIntersecting) countRun();
}, { rootMargin: '10%' }).observe(statGrid);
}
statEls.forEach(function (st) {
var box = null, live = false;
var nxT = 0, nyT = 0, nx = 0, ny = 0;
var sxT = 0, syT = 0, sx = 0, sy = 0;
var tick = ticker(function () {
nx += (nxT - nx) * 0.16; ny += (nyT - ny) * 0.16;
sx += (sxT - sx) * 0.16; sy += (syT - sy) * 0.16;
st.style.setProperty('--nx', nx.toFixed(4));
st.style.setProperty('--ny', ny.toFixed(4));
st.style.setProperty('--sx', sx.toFixed(1) + 'px');
st.style.setProperty('--sy', sy.toFixed(1) + 'px');
st.style.transform = 'perspective(700px) rotateX(' + (-ny * 6).toFixed(2) +
'deg) rotateY(' + (nx * 6).toFixed(2) + 'deg) translateY(' + (live ? -4 : 0) + 'px)';
if (!live && Math.abs(nx) + Math.abs(ny) < 0.002) {
st.style.transform = '';
st.style.removeProperty('--nx'); st.style.removeProperty('--ny');
tick.stop();
}
});
if (mode === 'full') {
st.addEventListener('pointerenter', function (e) {
if (!isMouse(e) || mode !== 'full') return;
box = st.getBoundingClientRect();
live = true;
st.classList.add('hot');
if (memeEl && st.classList.contains('t-pink')) memeEl.classList.add('thrust');
tick.start();
}, { passive: true });
st.addEventListener('pointermove', function (e) {
if (!box || !isMouse(e) || mode !== 'full') return;
nxT = (e.clientX - box.left) / box.width - 0.5;
nyT = (e.clientY - box.top) / box.height - 0.5;
sxT = e.clientX - box.left; syT = e.clientY - box.top;
tick.start();
}, { passive: true });
st.addEventListener('pointerleave', function () {
live = false; box = null; nxT = 0; nyT = 0;
st.classList.remove('hot');
if (memeEl) memeEl.classList.remove('thrust');
tick.start();
}, { passive: true });
addEventListener('scroll', function () { if (live) box = st.getBoundingClientRect(); }, { passive: true });
}
st.addEventListener('click', function (e) {
if (mode === 'reduced' || isPaused()) return;
var b = st.getBoundingClientRect();
var ping = document.createElement('span');
ping.className = 'ping';
ping.setAttribute('aria-hidden', 'true');
ping.style.setProperty('--px', (e.clientX ? e.clientX - b.left : b.width / 2).toFixed(0) + 'px');
ping.style.setProperty('--py', (e.clientY ? e.clientY - b.top : b.height / 2).toFixed(0) + 'px');
st.appendChild(ping);
setTimeout(function () { ping.remove(); }, 640);
st.classList.remove('tap');
void st.offsetWidth;
st.classList.add('tap');
if (memeEl && st.classList.contains('t-pink') && mode !== 'full') {
memeEl.classList.add('thrust');
setTimeout(function () { memeEl.classList.remove('thrust'); }, 1800);
}
});
st.addEventListener('animationend', function (e) {
if (e.animationName === 'tapSpring') st.classList.remove('tap');
});
});
if (memeEl && jet) {
var fireT = 0, fireCool = 0;
memeEl.addEventListener('click', function () {
if (mode === 'reduced' || isPaused()) return;
var now = performance.now();
if (now < fireCool) return;
fireCool = now + 2400;
memeEl.classList.add('fire');
var burst = mode === 'full' ? 14 : 8;
for (var i = 0; i < burst; i++) {
var sp = makeSpark(true, i);
jet.appendChild(sp);
setTimeout(function (el) { return function () { el.remove(); }; }(sp), 1200);
}
clearTimeout(fireT);
fireT = setTimeout(function () { memeEl.classList.remove('fire'); }, 900);
});
}
}
var casesBox = document.querySelector('#cases .cases');
if (casesBox) {
var caseEls = [].slice.call(casesBox.querySelectorAll('.case'));
var csPaused = function () { return html.classList.contains('anim-paused'); };
var csHold = 0, csChgT = [], csHitT = [], csOver = false, csAt = null, csLast = 0;
caseEls.forEach(function (c) {
var b = c.querySelector('.big');
if (!b) return;
var g = document.createElement('span');
g.className = 'ghost';
g.setAttribute('aria-hidden', 'true');
g.textContent = b.textContent.replace(/\s+/g, ' ').trim();
c.insertBefore(g, c.firstChild);
});
function csFit() {
caseEls.forEach(function (c) {
var g = c.querySelector('.ghost');
if (!g) return;
g.style.fontSize = '';
var have = g.getBoundingClientRect().width;
if (!have) return;
var want = c.getBoundingClientRect().width * 1.18;
var base = parseFloat(getComputedStyle(g).fontSize);
g.style.fontSize = Math.round(base * want / have) + 'px';
});
}
if (document.fonts && document.fonts.ready) document.fonts.ready.then(csFit); else csFit();
var csFitT = 0;
addEventListener('resize', function () { clearTimeout(csFitT); csFitT = setTimeout(csFit, 180); });
if ('IntersectionObserver' in window) {
var csIn = new IntersectionObserver(function (en) {
en.forEach(function (e) {
if (!e.isIntersecting) return;
csIn.disconnect();
casesBox.classList.add('cs-in');
setTimeout(function () { casesBox.classList.add('cs-done'); }, 90 * caseEls.length + 700);
});
}, { threshold: 0.2 });
csIn.observe(casesBox);
} else casesBox.classList.add('cs-in', 'cs-done');
var CS_STEP = 700, CS_RISE = 650, CS_TOGETHER = 1000, CS_REST = 2000;
var csChgMs = (caseEls.length - 1) * CS_STEP + CS_RISE + CS_TOGETHER;
function csStopWave() {
for (var i = 0; i < caseEls.length; i++) {
clearTimeout(csChgT[i]);
caseEls[i].classList.remove('chg');
}
}
function csWave() {
if (csPaused() || csOver || performance.now() < csHold) return;
caseEls.forEach(function (c, i) {
clearTimeout(csChgT[i]);
csChgT[i] = setTimeout(function () {
if (csPaused() || csOver) return;
c.classList.add('chg');
csChgT[i] = setTimeout(function () { c.classList.remove('chg'); }, csChgMs);
}, i * CS_STEP);
});
}
var csTimer = 0;
function csPlan(ms) { clearTimeout(csTimer); csTimer = setTimeout(csRun, ms); }
function csRun() {
csTimer = 0;
if (csOver && performance.now() - csLast > 4000) csOut();
if (csPaused() || csOver) { csPlan(900); return; }
var wait = csHold - performance.now();
if (wait > 0) { csPlan(wait + 30); return; }
csWave();
csPlan((caseEls.length - 1) * CS_STEP + csChgMs + CS_RISE + CS_REST);
}
var csFirst = true;
var csTick = { start: function () { if (!csTimer) { csPlan(csFirst ? 1800 : CS_REST); csFirst = false; } },
stop: function () { clearTimeout(csTimer); csTimer = 0; } };
if ('IntersectionObserver' in window) {
new IntersectionObserver(function (en) {
en.forEach(function (e) { e.isIntersecting ? csTick.start() : csTick.stop(); });
}, { threshold: 0.25 }).observe(casesBox);
}
var csRaf = 0, csX = 0, csY = 0, csSec = document.getElementById('cases');
var csHostRect = null, csZones = [], csBoxZone = null;
function csOff(el) {
var x = 0, y = 0, n = el;
while (n && n !== csSec) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
return { x: x, y: y };
}
function csZones2() {
csHostRect = csSec.getBoundingClientRect();
csZones = caseEls.map(function (c) {
var o = csOff(c);
return { el: c, x: o.x, y: o.y, w: c.offsetWidth, h: c.offsetHeight };
});
var b = csOff(casesBox);
csBoxZone = { x: b.x, y: b.y, w: casesBox.offsetWidth, h: casesBox.offsetHeight };
}
function csEnsure() { if (!csHostRect || !csBoxZone) csZones2(); }
function csHit(e) {
csEnsure();
var x = e.clientX - csHostRect.left, y = e.clientY - csHostRect.top;
for (var i = 0; i < csZones.length; i++) {
var z = csZones[i];
if (x >= z.x && x <= z.x + z.w && y >= z.y && y <= z.y + z.h) return z.el;
}
return null;
}
function csInBox(e) {
csEnsure();
var x = e.clientX - csHostRect.left, y = e.clientY - csHostRect.top;
return x >= csBoxZone.x && x <= csBoxZone.x + csBoxZone.w &&
y >= csBoxZone.y && y <= csBoxZone.y + csBoxZone.h;
}
function csCam() {
csRaf = 0;
casesBox.style.transform = 'rotateY(' + (csX * 7).toFixed(2) + 'deg) rotateX(' + (-csY * 4).toFixed(2) + 'deg)';
casesBox.style.setProperty('--px', (-csX).toFixed(2));
}
function csDepth() {
for (var i = 0; i < caseEls.length; i++) {
var c = caseEls[i];
c.classList.toggle('near', c === csAt);
c.classList.toggle('far', !!csAt && c !== csAt);
if (c === csAt) { clearTimeout(csChgT[i]); c.classList.remove('chg'); }
}
}
function csMove(e) {
if (mode !== 'full' || !isMouse(e) || csPaused()) return;
csLast = performance.now();
var inBox = csInBox(e);
if (inBox !== csOver) {
csOver = inBox;
if (inBox) csStopWave();
else csHold = performance.now() + 4000;
}
var was = csAt;
csAt = inBox ? csHit(e) : null;
if (csAt !== was) csDepth();
if (!inBox) { csRest(); return; }
var r = csHostRect;
csX = (e.clientX - r.left - csBoxZone.x) / csBoxZone.w - 0.5;
csY = (e.clientY - r.top - csBoxZone.y) / csBoxZone.h - 0.5;
if (!csRaf) csRaf = requestAnimationFrame(csCam);
}
function csRest() {
csX = csY = 0;
casesBox.style.transform = '';
casesBox.style.removeProperty('--px');
}
function csOut(e) {
if (e && !isMouse(e)) return;
csOver = false;
if (csAt) { csAt = null; csDepth(); }
csHold = performance.now() + 4000;
csRest();
}
csSec.addEventListener('pointermove', csMove);
csSec.addEventListener('pointerleave', csOut);
var csZT = 0, csZoneLater = function () { clearTimeout(csZT); csZT = setTimeout(csZones2, 150); };
addEventListener('resize', csZoneLater);
addEventListener('scroll', function () { csHostRect = null; }, { passive: true });
csSec.addEventListener('pointerdown', function (e) {
if (csPaused()) return;
var c = csHit(e);
if (!c) return;
var i = caseEls.indexOf(c);
csHold = performance.now() + 9000;
clearTimeout(csChgT[i]);
clearTimeout(csHitT[i]);
c.classList.remove('chg');
c.classList.add('hit');
csHitT[i] = setTimeout(function () { c.classList.remove('hit'); }, 620);
});
}
var steps = document.querySelector('.steps5');
if (steps) {
var stepEls = [].slice.call(steps.querySelectorAll('.step'));
var procSec = document.querySelector('#process');
var setupNote = procSec && procSec.querySelector('.setupnote');
var mqTie = window.matchMedia && window.matchMedia('(max-width:900px)');
function noTie() { return !!(mqTie && mqTie.matches); }
var sio = new IntersectionObserver(function (entries) {
entries.forEach(function (e) {
if (e.isIntersecting) { e.target.classList.add('lit'); sio.unobserve(e.target); }
});
}, { threshold: 0.5 });
stepEls.forEach(function (s) { sio.observe(s); });
var noteRing = null;
if (setupNote && mode !== 'reduced') {
var svgNS = 'http://www.w3.org/2000/svg';
var rsvg = document.createElementNS(svgNS, 'svg');
rsvg.setAttribute('class', 'note-ring');
rsvg.setAttribute('aria-hidden', 'true');
rsvg.setAttribute('preserveAspectRatio', 'none');
var ringPaths = ['r-cw r-glow', 'r-ccw r-glow', 'r-cw r-line', 'r-ccw r-line'].map(function (cl) {
var p = document.createElementNS(svgNS, 'path');
p.setAttribute('class', cl);
p.setAttribute('pathLength', '100');
rsvg.appendChild(p);
return p;
});
setupNote.appendChild(rsvg);
noteRing = ringPaths;
var buildRing = function () {
var cs = getComputedStyle(setupNote);
var bw = parseFloat(cs.borderTopWidth) || 0;
var box = setupNote.getBoundingClientRect();
var w = box.width - bw * 2, h = box.height - bw * 2;
if (w <= 0 || h <= 0) return;
var r = Math.max(0, Math.min(parseFloat(cs.borderTopLeftRadius) - bw, w / 2, h / 2));
var tap = parseFloat(cs.getPropertyValue('--tap-x')) / 100;
var sx = Math.min(Math.max(r, w * (tap || .703)), w - r);
rsvg.setAttribute('viewBox', '0 0 ' + w.toFixed(2) + ' ' + h.toFixed(2));
var d = 'M' + sx.toFixed(1) + ' 0' +
'H' + (w - r).toFixed(1) + 'A' + r.toFixed(1) + ' ' + r.toFixed(1) + ' 0 0 1 ' + w.toFixed(1) + ' ' + r.toFixed(1) +
'V' + (h - r).toFixed(1) + 'A' + r.toFixed(1) + ' ' + r.toFixed(1) + ' 0 0 1 ' + (w - r).toFixed(1) + ' ' + h.toFixed(1) +
'H' + r.toFixed(1) + 'A' + r.toFixed(1) + ' ' + r.toFixed(1) + ' 0 0 1 0 ' + (h - r).toFixed(1) +
'V' + r.toFixed(1) + 'A' + r.toFixed(1) + ' ' + r.toFixed(1) + ' 0 0 1 ' + r.toFixed(1) + ' 0Z';
ringPaths.forEach(function (p) { p.setAttribute('d', d); });
};
buildRing();
if (window.ResizeObserver) new ResizeObserver(buildRing).observe(setupNote);
else window.addEventListener('resize', buildRing);
}
var stepT = [], stepClr = [], noteT = 0, chainT = 0, stHold = 0, stepHover = null;
var STEP_PAUSE = 5000;
var PASS = 300;
var stepDurs = stepEls.map(function (el) {
var v = parseFloat(getComputedStyle(el).getPropertyValue('--dur'));
return v > 0 ? v * 1000 : 1000;
});
function stepIdle() {
return !!stepHover || document.hidden || html.classList.contains('anim-paused') ||
!(procSec && procSec.classList.contains('amb-on'));
}
function stepOff(el) {
var i = stepEls.indexOf(el);
if (i >= 0) clearTimeout(stepClr[i]);
el.classList.remove('run', 'pass', 'hov', 'fade');
el.style.removeProperty('--durx');
el.style.removeProperty('--fadex');
if (i === 3 && setupNote) { clearTimeout(noteT); setupNote.classList.remove('on'); }
}
function stepOffAll(except) {
stepEls.forEach(function (el) { if (el !== except) stepOff(el); });
}
function stepRun(i, rate, hold) {
var el = stepEls[i];
if (!el) return 0;
var d = Math.round(stepDurs[i] / (rate || 1));
var fd = Math.max(220, Math.round(500 / (rate || 1)));
clearTimeout(stepClr[i]);
el.classList.remove('run', 'fade');
[].forEach.call(el.querySelectorAll('.d-run,.d-hot'), function (n) {
if (n.getAnimations) n.getAnimations().forEach(function (a) { a.cancel(); });
});
el.style.setProperty('--durx', (d / 1000).toFixed(3) + 's');
el.style.setProperty('--fadex', (fd / 1000).toFixed(3) + 's');
el.classList.toggle('hov', !!hold);
el.classList.add('run');
if (!hold) stepClr[i] = setTimeout(function () { el.classList.remove('run'); }, d + fd + 60);
if (setupNote && i === 3 && !noTie()) {
setupNote.classList.remove('on');
void setupNote.offsetWidth;
setupNote.style.setProperty('--durx', (d / 1000).toFixed(3) + 's');
setupNote.classList.add('on');
clearTimeout(noteT);
if (!hold) noteT = setTimeout(function () { setupNote.classList.remove('on'); }, d);
}
return d;
}
function stepChain(from, rate) {
stepT.forEach(clearTimeout); stepT = [];
var at = 0;
var pass = Math.max(120, Math.round(PASS / (rate || 1)));
for (var i = from; i < stepEls.length; i++) {
(function (i, at) {
stepT.push(setTimeout(function () {
if (i > from && stepIdle()) return;
if (i > from) {
var cur = stepEls[i];
cur.classList.add('pass');
setTimeout(function () { cur.classList.remove('pass'); }, pass);
}
stepRun(i, rate);
}, at));
})(i, at);
at += Math.round(stepDurs[i] / (rate || 1)) + (i < stepEls.length - 1 ? pass : 0);
}
return at;
}
function stepPlan(delay) {
clearTimeout(chainT);
chainT = setTimeout(function () {
if (stepIdle() || performance.now() < stHold) { stepPlan(1200); return; }
var span = stepChain(0);
stepPlan(span + STEP_PAUSE);
}, delay);
}
if (mode !== 'reduced') {
var seenProc = false;
new IntersectionObserver(function (en) {
var vis = en[en.length - 1].isIntersecting;
if (!vis) { clearTimeout(chainT); return; }
stepPlan(seenProc ? STEP_PAUSE : 1200);
seenProc = true;
}, { threshold: .25 }).observe(steps);
var stepFadeT = 0, stepGuard = 0;
function stepRelease(el) {
if (!el) return;
clearTimeout(stepFadeT);
el.classList.remove('hov');
el.classList.add('fade');
if (el === stepEls[3] && setupNote) setupNote.classList.remove('on');
stepFadeT = setTimeout(function () { el.classList.remove('run', 'fade'); }, 520);
}
steps.addEventListener('pointerover', function (e) {
if (!isMouse(e) || mode !== 'full') return;
var el = e.target.closest && e.target.closest('.step');
if (!el || el === stepHover) return;
stepHover = el;
stHold = performance.now() + 6000;
stepT.forEach(clearTimeout); stepT = [];
clearTimeout(stepFadeT);
stepOffAll(el);
stepRun(stepEls.indexOf(el), 1, true);
clearTimeout(stepGuard);
stepGuard = setTimeout(function () {
if (stepHover === el) { stepHover = null; stepRelease(el); stHold = 0; }
}, 45000);
});
steps.addEventListener('pointerout', function (e) {
if (!isMouse(e)) return;
var to = e.relatedTarget;
if (to && to.closest && to.closest('.step') === stepHover) return;
var left = stepHover;
stepHover = null;
clearTimeout(stepGuard);
stepRelease(left);
stHold = Math.max(stHold, performance.now() + 1200);
stepPlan(1800);
});
function stepBlur() {
if (!stepHover) return;
var el = stepHover; stepHover = null;
clearTimeout(stepGuard); stepRelease(el); stepPlan(1800);
}
window.addEventListener('blur', stepBlur);
document.addEventListener('visibilitychange', function () { if (document.hidden) stepBlur(); });
steps.addEventListener('pointerdown', function (e) {
var el = e.target.closest && e.target.closest('.step');
if (!el) return;
el.classList.add('tap');
setTimeout(function () { el.classList.remove('tap'); }, 420);
stHold = performance.now() + 9000;
clearTimeout(stepFadeT);
stepOffAll(null);
stepHover = null;
stepChain(stepEls.indexOf(el), 2.2);
});
if (setupNote) {
setupNote.addEventListener('pointerdown', function () {
if (noTie()) return;
stHold = performance.now() + 6000;
stepT.forEach(clearTimeout); stepT = [];
stepOffAll(null);
stepRun(3, 1.6);
});
}
}
}
var prGrid = document.querySelector('#pricing .prices');
if (prGrid) {
var prCards = [].slice.call(prGrid.querySelectorAll('.price'));
var prBoxes = null, prRaf = 0, prX = 0, prY = 0, prRz = 0;
function prEnsure() {
if (prBoxes) return;
prBoxes = prCards.map(function (c) {
var r = c.getBoundingClientRect();
return { l: r.left, r: r.right, t: r.top, b: r.bottom, rim: c.querySelector('.rim'), px: null };
});
}
function prPlace() {
prRaf = 0;
if (!prBoxes) return;
for (var i = 0; i < prCards.length; i++) {
var c = prCards[i], b = prBoxes[i];
var on = prX >= b.l && prX <= b.r && prY >= b.t && prY <= b.b;
c.classList.toggle('near', on);
c.classList.toggle('adj', !on);
if (b.rim) {
var px = Math.round(prX - b.l - 120);
if (b.px !== px) { b.px = px; b.rim.style.setProperty('--gx', px + 'px'); }
}
}
}
function prOff() {
if (prRaf) { cancelAnimationFrame(prRaf); prRaf = 0; }
prGrid.classList.remove('lit');
for (var i = 0; i < prCards.length; i++) prCards[i].classList.remove('near', 'adj');
}
prGrid.addEventListener('pointerenter', function (e) {
if (mode !== 'full' || !isMouse(e)) return;
prBoxes = null; prEnsure();
prGrid.classList.add('lit');
}, { passive: true });
prGrid.addEventListener('pointermove', function (e) {
if (mode !== 'full' || !isMouse(e)) return;
prEnsure();
prX = e.clientX; prY = e.clientY;
if (!prRaf) prRaf = requestAnimationFrame(prPlace);
}, { passive: true });
prGrid.addEventListener('pointerleave', function (e) { if (isMouse(e)) prOff(); }, { passive: true });
addEventListener('scroll', function () { prBoxes = null; }, { passive: true });
addEventListener('resize', function () {
clearTimeout(prRz); prRz = setTimeout(function () { prBoxes = null; }, 150);
});
prCards.forEach(function (card) { tapHold(card, 1800); });
}
var solGrid = document.querySelector('#solutions .cards');
if (solGrid) {
var gsvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
gsvg.setAttribute('class', 'net');
gsvg.setAttribute('aria-hidden', 'true');
solGrid.appendChild(gsvg);
var cardEls = [].slice.call(solGrid.querySelectorAll('.card'));
var centers = [], edges = [], nodes = [];
function buildNet() {
gsvg.setAttribute('viewBox', '0 0 ' + solGrid.clientWidth + ' ' + solGrid.clientHeight);
centers = cardEls.map(function (c) {
return { x: c.offsetLeft + c.offsetWidth / 2, y: c.offsetTop + c.offsetHeight / 2 };
});
edges = []; nodes = [];
gsvg.textContent = '';
for (var i = 0; i < centers.length; i++) {
[1, 2].forEach(function (d) {
var j = i + d;
if (j >= centers.length) return;
var ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
ln.setAttribute('x1', centers[i].x); ln.setAttribute('y1', centers[i].y);
ln.setAttribute('x2', centers[j].x); ln.setAttribute('y2', centers[j].y);
gsvg.appendChild(ln);
edges.push({ a: i, b: j });
});
}
centers.forEach(function (c) {
var nd = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
nd.setAttribute('cx', c.x); nd.setAttribute('cy', c.y);
nd.setAttribute('r', '4');
nd.setAttribute('class', 'node');
gsvg.appendChild(nd);
nodes.push(nd);
});
}
var pulses = [];
function firePulse(edge, back) {
var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
c.setAttribute('r', '3');
gsvg.appendChild(c);
pulses.push({ el: c, e: edge, p: 0, back: !!back });
}
var lastFire = 0, netLast = 0;
var netT = ticker(function (now) {
var dt = netLast ? Math.min((now - netLast) / 1000, 0.05) : 0.016; netLast = now;
if (!centers.length) buildNet();
if (now - lastFire > (mode === 'full' ? 2800 : 4200) && edges.length) {
lastFire = now;
firePulse(edges[Math.floor(Math.random() * edges.length)]);
}
for (var i = pulses.length - 1; i >= 0; i--) {
var p = pulses[i];
p.p += dt / 1.05;
var A = centers[p.back ? p.e.b : p.e.a], B = centers[p.back ? p.e.a : p.e.b];
if (p.p >= 1 || !A) {
p.el.remove();
pulses.splice(i, 1);
continue;
}
p.el.setAttribute('cx', A.x + (B.x - A.x) * p.p);
p.el.setAttribute('cy', A.y + (B.y - A.y) * p.p);
p.el.setAttribute('opacity', String(1 - Math.abs(p.p - 0.5) * 1.2));
}
});
gate(solGrid, netT);
var lastW = innerWidth, resizeTid = 0;
addEventListener('resize', function () {
if (innerWidth === lastW) return;
lastW = innerWidth;
clearTimeout(resizeTid);
resizeTid = setTimeout(function () { centers = []; }, 150);
}, { passive: true });
if (mode === 'full') {
cardEls.forEach(function (card, idx) {
card.addEventListener('pointerenter', function (e) {
if (!isMouse(e)) return;
if (nodes[idx]) nodes[idx].classList.add('hot');
edges.forEach(function (ed) {
if (ed.a === idx) firePulse(ed);
else if (ed.b === idx) firePulse(ed, true);
});
}, { passive: true });
card.addEventListener('pointerleave', function () {
if (nodes[idx]) nodes[idx].classList.remove('hot');
}, { passive: true });
});
}
}
var ambHref = html.getAttribute('data-amb');
if (ambHref) {
var ambLink = document.createElement('link');
ambLink.rel = 'stylesheet';
ambLink.href = ambHref;
document.head.appendChild(ambLink);
}
var ambEls = document.querySelectorAll('[data-ambient]');
if (ambEls.length && 'IntersectionObserver' in window) {
var ambIO = new IntersectionObserver(function (en) {
en.forEach(function (e) { e.target.classList.toggle('amb-on', e.isIntersecting); });
}, { rootMargin: '10%' });
[].forEach.call(ambEls, function (el) { ambIO.observe(el); });
} else {
[].forEach.call(ambEls, function (el) { el.classList.add('amb-on'); });
}
var magBtn = document.querySelector('.final .box .btn');
if (magBtn) {
var mTx = 0, mTy = 0, mX = 0, mY = 0, mRect = null;
var mTick = ticker(function () {
mX += (mTx - mX) * .14; mY += (mTy - mY) * .14;
magBtn.style.transform = 'translate(' + mX.toFixed(1) + 'px,' + mY.toFixed(1) + 'px)';
if (Math.abs(mTx - mX) + Math.abs(mTy - mY) < .15) {
if (!mTx && !mTy) magBtn.style.transform = '';
mTick.stop();
}
});
addEventListener('scroll', function () { mRect = null; }, { passive: true });
magBtn.addEventListener('pointerenter', function (e) {
if (isMouse(e) && mode === 'full') mRect = magBtn.getBoundingClientRect();
}, { passive: true });
magBtn.addEventListener('pointermove', function (e) {
if (!isMouse(e) || mode !== 'full') return;
if (!mRect) mRect = magBtn.getBoundingClientRect();
mTx = (e.clientX - mRect.left - mRect.width / 2) * .24;
mTy = (e.clientY - mRect.top - mRect.height / 2) * .24;
mTick.start();
}, { passive: true });
magBtn.addEventListener('pointerleave', function () {
mTx = 0; mTy = 0; mRect = null; mTick.start();
}, { passive: true });
}
function spotlight(box, k) {
if (!box) return;
var sr = null;
addEventListener('scroll', function () { sr = null; }, { passive: true });
box.addEventListener('pointermove', function (e) {
if (!isMouse(e) || mode !== 'full') return;
if (!sr) sr = box.getBoundingClientRect();
box.style.setProperty('--sx', (e.clientX - sr.left).toFixed(0) + 'px');
box.style.setProperty('--sy', (e.clientY - sr.top).toFixed(0) + 'px');
if (k) {
box.style.setProperty('--nx', ((e.clientX - sr.left) / sr.width - .5).toFixed(3));
box.style.setProperty('--ny', ((e.clientY - sr.top) / sr.height - .5).toFixed(3));
}
box.classList.add('hot');
}, { passive: true });
box.addEventListener('pointerleave', function () {
sr = null; box.classList.remove('hot');
if (k) { box.style.setProperty('--nx', 0); box.style.setProperty('--ny', 0); }
}, { passive: true });
}
spotlight(document.querySelector('#teaser .teaser-card'), 0);
var pers = document.querySelector('#about .personal');
if (pers) {
spotlight(pers, 1);
var badge = pers.querySelector('.pa-badge span');
if (badge) {
var m = badge.firstChild && badge.firstChild.nodeType === 3 &&
badge.firstChild.nodeValue.match(/^([\uD800-\uDBFF][\uDC00-\uDFFF]|[☝✊-✍])/);
if (m) {
var wv = document.createElement('span');
wv.className = 'wv';
wv.textContent = m[1];
badge.firstChild.nodeValue = badge.firstChild.nodeValue.slice(m[1].length);
badge.insertBefore(wv, badge.firstChild);
}
}
if ('IntersectionObserver' in window) {
var persIO = new IntersectionObserver(function (en) {
if (!en[en.length - 1].isIntersecting) return;
persIO.disconnect(); pers.classList.add('met');
}, { threshold: .25 });
persIO.observe(pers);
} else {
pers.classList.add('met');
}
}
var c0box = document.querySelector('#case0 .case0-box');
if (c0box) {
if ('IntersectionObserver' in window) {
var c0io = new IntersectionObserver(function (en) {
if (!en[en.length - 1].isIntersecting) return;
c0io.disconnect();
if (mode === 'reduced') return;
c0box.classList.add('boot');
setTimeout(function () { c0box.classList.remove('boot'); }, 2200);
}, { threshold: .2 });
c0io.observe(c0box);
}
[].forEach.call(c0box.querySelectorAll('.case0-agent'), function (ag, i) {
var lit = 'lit' + (i + 1), zap = 'zap' + (i + 1), zt = 0, rt = 0;
ag.addEventListener('pointerenter', function (e) {
if (mode === 'full' && isMouse(e)) c0box.classList.add(lit);
}, { passive: true });
ag.addEventListener('pointerleave', function () { c0box.classList.remove(lit); }, { passive: true });
ag.addEventListener('click', function () {
if (mode === 'reduced' || html.classList.contains('anim-paused')) return;
clearTimeout(rt); clearTimeout(zt);
ag.classList.remove('run'); c0box.classList.remove(zap);
void ag.offsetWidth;
ag.classList.add('run'); c0box.classList.add(zap);
rt = setTimeout(function () { ag.classList.remove('run'); }, 560);
zt = setTimeout(function () { c0box.classList.remove(zap); }, 2400);
});
});
}
var fGrid = document.querySelector('#formats .formats');
if (fGrid) {
if ('IntersectionObserver' in window) {
var fio = new IntersectionObserver(function (en) {
if (!en[en.length - 1].isIntersecting) return;
fio.disconnect();
if (mode === 'reduced') return;
fGrid.classList.add('fpon');
setTimeout(function () { fGrid.classList.remove('fpon'); }, 1600);
}, { threshold: .25 });
fio.observe(fGrid);
}
[].forEach.call(fGrid.querySelectorAll('.fmt'), function (card) {
var ht = 0;
function rerun() {
card.classList.add('rst');
void card.offsetWidth;
card.classList.remove('rst');
}
card.addEventListener('pointerenter', function (e) {
if (mode !== 'full' || !isMouse(e) || html.classList.contains('anim-paused')) return;
card.classList.add('demo');
rerun();
}, { passive: true });
card.addEventListener('pointerleave', function () { card.classList.remove('demo'); }, { passive: true });
card.addEventListener('click', function () {
if (mode === 'reduced' || html.classList.contains('anim-paused')) return;
clearTimeout(ht);
card.classList.add('demo');
card.classList.remove('hit');
rerun();
card.classList.add('hit');
ht = setTimeout(function () {
card.classList.remove('hit');
if (mode !== 'full') card.classList.remove('demo');
}, 1200);
});
});
}
var fBand = document.querySelector('#formats .memeband');
if (fBand) {
var fbH = fBand.querySelector('.mb-h span');
if (fbH && fbH.textContent.indexOf('🥂') > -1) {
fbH.innerHTML = fbH.textContent.replace(/\s*🥂/, ' <i class="cl">🥂</i>');
}
var fbT = 0;
fBand.addEventListener('click', function () {
if (mode === 'reduced' || html.classList.contains('anim-paused')) return;
clearTimeout(fbT);
fBand.classList.remove('clk');
void fBand.offsetWidth;
fBand.classList.add('clk');
fbT = setTimeout(function () { fBand.classList.remove('clk'); }, 1000);
});
}
var dmStage = document.querySelector('.dm-stage');
if (dmStage) {
var dmSvg = dmStage.querySelector('.domovyk');
var dmEyes = dmSvg.querySelector('.dm-eyes');
var dmBody = dmSvg.querySelector('.dm-body');
var dmHero = document.querySelector('.hero');
var dmToasts = document.getElementById('dm-toasts');
var dmPops = document.getElementById('dm-pops');
var dmSeen = true, dmBusy = false, dmHypno = false, dmDead = false, dmSipping = false;
new IntersectionObserver(function (en) { dmSeen = en[en.length - 1].isIntersecting; }, { rootMargin: '60px' }).observe(dmStage);
var dmFlashT = {};
var DM_ANIM = {
dmSip: 'dm-sip', dmCheers: 'dm-cheers', dmBlink: 'dm-blink', dmStretch: 'dm-stretch',
dmWink: 'dm-wink', dmSquint: 'dm-squint', dmHeart: 'dm-joy', dmWide: 'dm-wide',
dmBlushIn: 'dm-shy', dmRise: 'dm-rise'
};
function dmDone(cls) {
clearTimeout(dmFlashT[cls]);
dmSvg.classList.remove(cls);
}
dmSvg.addEventListener('animationend', function (e) {
var cls = DM_ANIM[e.animationName];
if (cls) dmDone(cls);
});
function dmFlash(cls, ms, exact) {
clearTimeout(dmFlashT[cls]);
dmSvg.classList.remove(cls);
void dmSvg.getBoundingClientRect();
dmSvg.classList.add(cls);
dmFlashT[cls] = setTimeout(function () { dmDone(cls); }, exact ? ms : ms + 600);
}
function dmPaused() { return html.classList.contains('anim-paused'); }
function dmIdle() { return !document.hidden && dmSeen && mode !== 'reduced' && !dmPaused(); }
function dmRest() {
clearTimeout(dmLookT); clearTimeout(dmTiltT); clearTimeout(dmEyeT);
clearTimeout(dmSteamT); clearTimeout(dmBusyT);
for (var k in dmFlashT) clearTimeout(dmFlashT[k]);
dmBusy = false; dmDead = false; dmBusyTill = 0; dmGazing = false;
clearTimeout(dmCupT);
dmSvg.setAttribute('class', 'domovyk');
if (!dmHypno) dmSvg.setAttribute('data-eye', 'dot');
dmEyes.style.setProperty('--ex', '0px');
dmEyes.style.setProperty('--ey', '0px');
dmBody.style.setProperty('--tilt', '0deg');
dmSipping = false;
if (dmPops) dmPops.textContent = '';
if (dmToasts) { clearTimeout(dmTimer); dmToasts.textContent = ''; }
}
var dmLookT = 0, dmGazing = false;
function dmLook(x, y, holdMs) {
clearTimeout(dmLookT);
dmEyes.style.setProperty('--ex', x + 'px');
dmEyes.style.setProperty('--ey', y + 'px');
dmSvg.classList.toggle('dm-up', y < -1);
dmSvg.classList.toggle('dm-dn', y > .6);
dmGazing = !!(x || y);
if (holdMs) dmLookT = setTimeout(dmLookBack, holdMs);
}
function dmLookBack() {
dmEyes.style.setProperty('--ex', '0px');
dmEyes.style.setProperty('--ey', '0px');
dmSvg.classList.remove('dm-up');
dmSvg.classList.remove('dm-dn');
dmGazing = false;
dmCupDown();
}
var dmTiltT = 0;
function dmTilt(deg, ms) {
clearTimeout(dmTiltT);
dmBody.style.setProperty('--tilt', deg + 'deg');
if (ms) dmTiltT = setTimeout(function () { dmBody.style.setProperty('--tilt', '0deg'); }, ms);
}
var dmEyeT = 0;
function dmSetEye(kind, ms) {
clearTimeout(dmEyeT);
dmSvg.setAttribute('data-eye', kind);
if (kind !== 'dot') dmLookBack();
if (ms) dmEyeT = setTimeout(function () {
if (!dmHypno) dmSvg.setAttribute('data-eye', 'dot');
}, ms);
}
var dmSteamT = 0;
function dmNoSteam(ms) {
clearTimeout(dmSteamT);
dmSvg.classList.add('dm-nosteam');
dmSteamT = setTimeout(function () { dmSvg.classList.remove('dm-nosteam'); }, ms);
}
var DM_GAP = 10000, dmFree = 0, dmBusyT = 0, dmBusyTill = 0;
function dmMark(ms, isFx) {
var till = Date.now() + ms;
if (till < dmBusyTill) till = dmBusyTill;
dmBusyTill = till;
clearTimeout(dmBusyT);
dmBusy = true;
dmBusyT = setTimeout(function () { dmBusy = false; }, till - Date.now());
if (isFx && till + DM_GAP > dmFree) dmFree = till + DM_GAP;
}
function dmHearts(n) {
if (!dmPops || mode === 'reduced' || dmPops.childElementCount > 21) return;
for (var i = 0; i < n; i++) {
var s = document.createElement('span');
s.className = 'dm-pop';
s.textContent = '♥';
s.style.setProperty('--dx', (Math.random() * 46 - 23).toFixed(0) + 'px');
s.style.setProperty('--rot', (Math.random() * 50 - 25).toFixed(0) + 'deg');
s.style.animationDelay = (i * 90) + 'ms';
s.style.fontSize = (12 + Math.random() * 7).toFixed(0) + 'px';
dmPops.appendChild(s);
setTimeout(function (el) { return function () { el.remove(); }; }(s), 1500 + i * 90);
}
}
onMQ(mqReduced, function () {
if (mode !== 'reduced') return;
dmHypno = false; dmDead = false; dmBusy = false;
clearTimeout(dmBusyT); clearTimeout(dmEyeT); clearTimeout(dmTiltT); clearTimeout(dmSteamT);
dmSvg.setAttribute('class', 'domovyk');
dmSvg.setAttribute('data-eye', 'dot');
dmBody.style.setProperty('--tilt', '0deg');
if (dmPops) dmPops.textContent = '';
});
var dmPause = document.getElementById('dm-pause');
if (dmPause) {
dmPause.hidden = false;
var pauseLbl = dmPause.getAttribute('aria-label');
var playLbl = dmPause.getAttribute('data-play-label') || pauseLbl;
dmPause.addEventListener('click', function () {
var on = html.classList.toggle('anim-paused');
dmPause.setAttribute('aria-pressed', on ? 'true' : 'false');
dmPause.setAttribute('aria-label', on ? playLbl : pauseLbl);
dmPause.textContent = on ? '▶' : '⏸';
if (on) dmRest();
else { wake(); dmSchedule(1200); }
});
}
if (dmHero) {
var dmCta = dmHero.querySelector('.hero-cta .btn-tg');
if (dmCta) dmCta.addEventListener('pointerenter', function (e) {
if (isMouse(e) && mode === 'full' && !dmBusy && !dmSipping && !dmHypno && !dmDead) dmFlash('dm-cheers', 700);
}, { passive: true });
}
var dmNotes = [], DM_ICONS = ['📥', '💬', '🗓️', '📄', '✅', '📊', '🔔', '🎙️'];
var dmNowTxt = '', dmPayTitles = [], dmPayVia = '';
var dmBag = [], dmTimer = 0;
var DM_SLOTS = ['s-tr', 's-bl', 's-tl', 's-br'], dmSlotI = 0;
var DM_GAZE = { 's-tr': [5.2, -2.7], 's-tl': [-6.6, -2.6], 's-br': [5.2, .24], 's-bl': [-6.6, .24] };
var DM_PAYS = [
{ a: '$180', p: 'Stripe', ic: '💳' },
{ a: '$340', p: 'Stripe', ic: '💳' },
{ a: '$720', p: 'Stripe', ic: '💳' },
{ a: '$1 200', p: 'Stripe', ic: '💳' },
{ a: '250 USDT', p: 'TRC-20', ic: '🪙' },
{ a: '900 USDT', p: 'TRC-20', ic: '🪙' }
];
if (dmToasts) {
for (var dni = 1; dni <= 8; dni++) {
var dnt = dmToasts.getAttribute('data-n' + dni);
if (dnt) dmNotes.push({ t: dnt, ic: DM_ICONS[dni - 1] });
}
dmNowTxt = dmToasts.getAttribute('data-now') || '';
dmPayVia = dmToasts.getAttribute('data-payvia') || '';
for (var dpi = 1; dpi <= 2; dpi++) {
var dpt = dmToasts.getAttribute('data-pay' + dpi);
if (dpt) dmPayTitles.push(dpt);
}
}
function dmCardsOff() { return !dmToasts || mode === 'reduced' || matchMedia('(max-width: 299px)').matches; }
var dmLastNote = null;
function dmNext() {
if (!dmBag.length) {
dmBag = dmNotes.slice();
for (var i = dmBag.length - 1; i > 0; i--) {
var j = Math.floor(Math.random() * (i + 1)), tmp = dmBag[i]; dmBag[i] = dmBag[j]; dmBag[j] = tmp;
}
if (dmBag.length > 1 && dmBag[dmBag.length - 1] === dmLastNote) {
var last = dmBag.pop(); dmBag.unshift(last);
}
}
dmLastNote = dmBag.pop();
return dmLastNote;
}
function dmCard(n) {
var slot = DM_SLOTS[dmSlotI++ % DM_SLOTS.length];
var el = document.createElement('div');
el.className = 'dm-toast ' + slot + (n.amt ? ' pay' : '');
var ic = document.createElement('span'); ic.className = 'ic'; ic.textContent = n.ic;
var tx = document.createElement('span');
tx.appendChild(document.createTextNode(n.t));
if (n.amt) {
tx.appendChild(document.createTextNode(' · '));
var am = document.createElement('span'); am.className = 'amt'; am.textContent = n.amt;
tx.appendChild(am);
}
var sub = n.tm || dmNowTxt;
if (sub) { var tm = document.createElement('span'); tm.className = 'tm'; tm.textContent = sub; tx.appendChild(tm); }
el.appendChild(ic); el.appendChild(tx);
dmToasts.appendChild(el);
requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('show'); }); });
setTimeout(function () {
el.classList.remove('show'); el.classList.add('hide');
setTimeout(function () { el.remove(); }, 320);
}, n.amt ? 5000 : 3800);
return slot;
}
function dmWatch(slot, ms) {
if (dmHypno || dmDead || dmSipping) return;
if (dmSvg.getAttribute('data-eye') !== 'dot') return;
if (/dm-(wink|squint|joy|stretch|wide)/.test(dmSvg.getAttribute('class'))) return;
var g = DM_GAZE[slot] || [0, 0];
dmLook(g[0], g[1], ms);
if (g[1] > 0) dmSvg.classList.add('dm-dn');
dmTilt(g[0] > 0 ? 5 : -5, ms + 200);
if (slot === 's-br') dmCupUp(ms);
}
var dmCupT = 0;
function dmCupUp(ms) {
clearTimeout(dmCupT);
dmSvg.classList.add('dm-cup-up');
dmCupT = setTimeout(dmCupDown, ms);
}
function dmCupDown() { clearTimeout(dmCupT); dmSvg.classList.remove('dm-cup-up'); }
function dmSchedule(ms) { clearTimeout(dmTimer); dmTimer = setTimeout(dmSpawn, ms); }
function dmSpawn() {
if (!dmIdle()) return dmSchedule(3000);
if (dmHypno) return dmSchedule(1200);
if (dmCardsOff()) return dmSchedule(4000);
if (dmToasts.firstChild) return dmSchedule(1500);
var slot = dmCard(dmNext());
dmWatch(slot, 3600);
setTimeout(function () { if (dmToasts.firstChild) dmWatch(slot, 1900); }, 1700);
dmSchedule(4500 + Math.random() * 2500);
}
if (dmToasts) {
dmSchedule(1800);
document.addEventListener('visibilitychange', function () { if (!document.hidden) dmSchedule(1500); });
}
var dmPayLast = '';
function dmPayCard() {
var p = DM_PAYS[Math.floor(Math.random() * DM_PAYS.length)];
var title = dmPayTitles[Math.floor(Math.random() * dmPayTitles.length)] || '';
var tx = (Math.random().toString(36) + '000000').slice(2, 8);
return { ic: p.ic, t: title, amt: p.a, tm: (dmPayVia ? dmPayVia + ' ' : '') + p.p + ' · tx_' + tx };
}
function dmPayNext() {
var all = ['wide', 'money'], pool = [];
for (var i = 0; i < all.length; i++) if (all[i] !== dmPayLast) pool.push(all[i]);
dmPayLast = pool[Math.floor(Math.random() * pool.length)];
return dmPayLast;
}
function dmReact(kind) {
dmLookBack();
if (kind === 'money') {
dmSetEye('money', 2600);
dmFlash('dm-wide', 1150, true);
return;
}
dmFlash('dm-wide', 1600);
}
function dmPayGo() {
clearTimeout(dmTimer);
var cur = dmToasts.firstChild, wait = 0;
if (cur) {
cur.classList.remove('show'); cur.classList.add('hide');
setTimeout(function () { if (cur.parentNode) cur.parentNode.removeChild(cur); }, 320);
wait = 380;
}
setTimeout(dmPayShow, wait);
}
function dmPayShow() {
var slot = dmCard(dmPayCard());
dmSchedule(8000);
var react = dmPayNext();
setTimeout(function () {
if (!dmIdle() || dmDead || dmHypno) return;
dmWatch(slot, 2800);
setTimeout(function () { if (dmIdle() && !dmDead && !dmHypno) dmReact(react); }, 430);
}, 780 + Math.random() * 620);
}
var DM_FX = [
{ id: 'wink', ms: 800, run: function () { dmFlash('dm-wink', 800); dmTilt(-4, 1100); } },
{ id: 'squint', ms: 1700, run: function () { dmFlash('dm-squint', 1700); dmTilt(4, 2000); } },
{ id: 'joy', ms: 1900, run: function () { dmNoSteam(2200); dmSetEye('joy', 1900); dmFlash('dm-joy', 1900); } },
{ id: 'stretch', ms: 1400, run: function () { dmFlash('dm-stretch', 1400); } },
{ id: 'pay', ms: 5600, run: dmPayGo }
];
var dmRecent = [], dmFxT = 0;
function dmPick() {
var pool = [];
for (var i = 0; i < DM_FX.length; i++) {
var f = DM_FX[i];
if (dmRecent.indexOf(f.id) >= 0) continue;
if (f.id === 'pay' && dmCardsOff()) continue;
pool.push(f);
}
return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
}
function dmPlan(ms) { clearTimeout(dmFxT); dmFxT = setTimeout(dmStep, ms); }
function dmStep() {
if (!dmIdle()) return dmPlan(3000);
if (dmBusy || dmHypno || dmDead) return dmPlan(1400);
if (dmGazing) return dmPlan(1200);
var wait = dmFree - Date.now();
if (wait > 0) return dmPlan(Math.min(wait + 60, 2500));
var fx = dmPick();
if (!fx) { dmRecent.length = 0; return dmPlan(900); }
dmRecent.push(fx.id);
if (dmRecent.length > 2) dmRecent.shift();
fx.run();
dmMark(fx.ms, true);
dmPlan(fx.ms + DM_GAP + 800 + Math.random() * 2600);
}
dmPlan(11000);
var dmSipT = 0, dmBeanAt = 0;
function dmSipPlan(ms) { clearTimeout(dmSipT); dmSipT = setTimeout(dmSipGo, ms); }
function dmSipGo() {
if (!dmIdle()) return dmSipPlan(3000);
if (dmBusy || dmHypno || dmDead) return dmSipPlan(900);
var bean = Date.now() - dmBeanAt > 30000 && Math.random() < .6;
var wasUp = dmSvg.classList.contains('dm-cup-up');
dmCupDown();
dmSipping = true;
setTimeout(function () { dmSipping = false; }, bean ? 4000 : 2450);
dmNoSteam(bean ? 4200 : 2700);
dmTilt(5, 2700);
dmLook(0.5, 1.7, 2500);
setTimeout(function () { if (dmIdle() && !dmDead) dmFlash('dm-sip', 1800); }, wasUp ? 620 : 420);
if (bean) {
dmBeanAt = Date.now();
setTimeout(function () { if (dmIdle() && !dmDead && !dmHypno) dmSetEye('bean', 1600); }, 2320);
}
dmMark(bean ? 4000 : 2450);
dmSipPlan(15000 + Math.random() * 3000);
}
dmSipPlan(5000);
(function planBlink() {
setTimeout(function () {
if (dmIdle() && !dmBusy && !dmHypno && !dmDead && !dmGazing && dmSvg.getAttribute('data-eye') === 'dot') {
dmFlash('dm-blink', 220);
if (Math.random() < .15) setTimeout(function () { dmFlash('dm-blink', 220); }, 280);
}
planBlink();
}, dmIdle() ? 2400 + Math.random() * 3600 : 4000);
})();
(function planDart() {
setTimeout(function () {
if (dmIdle() && !dmBusy && !dmHypno && !dmDead && dmSvg.getAttribute('data-eye') === 'dot' && (!dmToasts || !dmToasts.firstChild)) {
dmLook((Math.random() * 3.4 - 1.7).toFixed(2), (Math.random() * 1.2 - .8).toFixed(2), 900);
}
planDart();
}, dmIdle() ? 5000 + Math.random() * 4000 : 5000);
})();
var dmIdleT = 0, dmActAt = 0;
function dmHypnoGo() {
if (!dmIdle() || dmDead) { dmIdleT = setTimeout(dmHypnoGo, 1200); return; }
var left = dmBusyTill - Date.now();
if (left > 0) { dmIdleT = setTimeout(dmHypnoGo, left + 80); return; }
dmHypno = true;
dmSetEye('spiral', 0);
dmTilt(0, 0);
}
function dmAct() {
if (dmHypno) {
dmHypno = false;
dmSetEye('dot', 0);
dmFlash('dm-blink', 220);
dmFree = Date.now() + 1500;
}
var t = Date.now();
if (t - dmActAt < 2000) return;
dmActAt = t;
clearTimeout(dmIdleT);
dmIdleT = setTimeout(dmHypnoGo, 40000);
}
var dmActs = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart'];
for (var dai = 0; dai < dmActs.length; dai++) addEventListener(dmActs[dai], dmAct, { passive: true });
addEventListener('scroll', dmAct, { passive: true });
dmIdleT = setTimeout(dmHypnoGo, 40000);
var dmClicks = 0, dmClickAt = 0, dmLoveAt = 0, dmShy = false, dmDeadTill = 0;
var DM_DEAD_MS = 5000;
function dmDie() {
dmClicks = 0;
dmDead = true;
dmDeadTill = Date.now() + DM_DEAD_MS;
dmDone('dm-shy'); dmDone('dm-joy');
dmDone('dm-rise'); dmDone('dm-sip'); dmDone('dm-wide');
dmSipping = false;
dmCupDown();
dmNoSteam(DM_DEAD_MS + 900);
dmSetEye('dead', 0);
dmTilt(9, 0);
dmSvg.classList.add('dm-dead');
dmMark(DM_DEAD_MS + 400, true);
dmRevive();
}
function dmRevive() {
var left = dmDeadTill - Date.now();
if (left > 0) return setTimeout(dmRevive, Math.min(left + 40, 900));
dmDead = false;
dmSvg.classList.remove('dm-dead');
dmFlash('dm-rise', 600);
dmSetEye('dot', 0);
dmTilt(0, 0);
dmNoSteam(600);
setTimeout(function () { if (!dmDead) dmFlash('dm-blink', 220); }, 620);
}
dmStage.addEventListener('pointerdown', function () {
if (mode === 'reduced' || html.classList.contains('anim-paused')) return;
var t = Date.now();
if (dmDead) {
dmDeadTill = t + DM_DEAD_MS;
dmNoSteam(DM_DEAD_MS + 900);
dmMark(DM_DEAD_MS + 400, true);
return;
}
dmClicks = (t - dmClickAt < 900) ? dmClicks + 1 : 1;
dmClickAt = t;
dmHearts(3);
if (dmClicks >= 10) return dmDie();
if (t - dmLoveAt < 700) return;
dmLoveAt = t;
dmShy = dmSvg.classList.contains('dm-sip') ? true : !dmShy;
if (dmShy) {
dmFlash('dm-shy', 2300);
if (!dmSipping) dmTilt(-6, 2400);
} else {
dmNoSteam(2200);
dmSetEye('joy', 1900);
dmFlash('dm-joy', 1900);
}
dmMark(dmShy ? 2300 : 1900, true);
});
}
var rotEm = document.getElementById('hero-rot');
if (rotEm && mode !== 'reduced') {
var rotVis = rotEm.querySelector('.rot-vis');
var rotHero = document.querySelector('.hero');
var rotWords = [rotVis.textContent];
for (var rwi = 1; rwi <= 3; rwi++) {
var rotBuf = rotEm.getAttribute('data-r' + rwi);
if (rotBuf) rotWords.push(rotBuf);
}
if (rotWords.length > 1) {
var rotH1 = rotEm.closest('h1');
var rotBind = rotEm.parentNode;
var rotRzT = 0;
var rotReserve = function () {
var keep = rotVis.textContent;
rotH1.style.minHeight = '';
rotH1.classList.remove('h1-split');
var lh = parseFloat(getComputedStyle(rotH1).lineHeight) ||
parseFloat(getComputedStyle(rotH1).fontSize) * 1.08;
for (var s = 0; s < rotWords.length; s++) {
rotVis.textContent = rotWords[s];
if (rotBind.offsetHeight > lh * 1.4) { rotH1.classList.add('h1-split'); break; }
}
var hMax = 0;
for (var i = 0; i < rotWords.length; i++) {
rotVis.textContent = rotWords[i];
if (rotH1.offsetHeight > hMax) hMax = rotH1.offsetHeight;
rotVis.textContent = rotWords[i].charAt(0);
if (rotH1.offsetHeight > hMax) hMax = rotH1.offsetHeight;
}
rotVis.textContent = keep;
rotH1.style.minHeight = hMax + 'px';
};
rotReserve();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(rotReserve);
addEventListener('resize', function () {
clearTimeout(rotRzT);
rotRzT = setTimeout(rotReserve, 300);
}, { passive: true });
var rotW = 0, rotLen = rotWords[0].length, rotDel = false;
(function rotTick() {
if (mode === 'reduced') {
rotVis.textContent = rotWords[0];
html.classList.remove('tw-on');
rotW = 0; rotLen = rotWords[0].length; rotDel = false;
return setTimeout(rotTick, 900);
}
if (document.hidden || !rotHero.classList.contains('amb-on') || html.classList.contains('anim-paused')) {
return setTimeout(rotTick, 900);
}
html.classList.add('tw-on');
var wait;
if (rotDel) {
rotLen--;
wait = 34;
if (!rotLen) { rotDel = false; rotW = (rotW + 1) % rotWords.length; wait = 380; }
} else if (rotLen < rotWords[rotW].length) {
rotLen++;
wait = 58 + Math.random() * 46;
} else {
rotDel = true;
wait = 2600;
}
rotVis.textContent = rotWords[rotW].slice(0, rotLen) || '\u00a0';
setTimeout(rotTick, wait);
})();
} else {
html.classList.remove('tw-on');
}
} else if (rotEm) {
html.classList.remove('tw-on');
}
var sumEl = document.getElementById('cfg-sum');
var cfgBox = document.querySelector('.cfg-box');
if (sumEl && cfgBox) {
var amt = sumEl.closest('.amt');
var odo = document.createElement('span');
odo.className = 'odo';
odo.setAttribute('aria-hidden', 'true');
amt.appendChild(odo);
amt.classList.add('odo-on');
var STRIP = '0123456789';
function renderOdo(text) {
var chars = text.split('');
while (odo.children.length > chars.length) odo.lastChild.remove();
chars.forEach(function (ch, i) {
var cell = odo.children[i];
if (!cell) {
cell = document.createElement('span');
cell.className = 'od';
var strip = document.createElement('span');
strip.className = 'strip';
STRIP.split('').forEach(function (d) {
var s = document.createElement('span'); s.textContent = d; strip.appendChild(s);
});
var sep = document.createElement('span');
sep.className = 'sep';
cell.appendChild(strip); cell.appendChild(sep);
odo.appendChild(cell);
}
var digit = STRIP.indexOf(ch);
if (digit >= 0) {
cell.classList.remove('is-sep');
cell.firstChild.style.transform = 'translateY(calc(' + (-digit) + ' * var(--odo-h,1em)))';
} else {
cell.classList.add('is-sep');
cell.lastChild.textContent = ch;
}
});
}
renderOdo(sumEl.textContent);
new MutationObserver(function () {
renderOdo(sumEl.textContent);
amt.classList.remove('spring');
void amt.offsetWidth;
amt.classList.add('spring');
}).observe(sumEl, { childList: true, characterData: true, subtree: true });
var cfgTotal = cfgBox.querySelector('.cfg-total');
var echo = document.createElement('span');
echo.className = 'cfg-echo';
echo.setAttribute('aria-hidden', 'true');
cfgBox.appendChild(echo);
var echoT1 = 0, echoT2 = 0, lastPT = '';
cfgBox.addEventListener('pointerdown', function (e) { lastPT = e.pointerType || 'mouse'; }, { passive: true });
cfgBox.addEventListener('keydown', function () { lastPT = ''; }, { passive: true });
var discEl = document.getElementById('cfg-disc'), discWas = discEl && discEl.hidden, gaveT = 0;
if (discEl) {
[].forEach.call(cfgBox.querySelectorAll('input[name="cfg-pkg"]'), function (p) {
p.addEventListener('change', function () { discWas = discEl.hidden; });
});
}
cfgBox.addEventListener('change', function (e) {
var inp = e.target;
if (!inp.matches('.cfg-addon input,.cfg-support input') || inp.getAttribute('aria-disabled') === 'true') return;
var row = inp.closest('.cfg-addon,.cfg-support');
if (discEl) {
var now = discEl.hidden;
if (row && discWas && !now && row.classList.contains('cfg-addon')) {
row.classList.add('gave');
clearTimeout(gaveT);
gaveT = setTimeout(function () { row.classList.remove('gave'); }, 900);
}
discWas = now;
}
if (!(parseInt(inp.getAttribute('data-price'), 10) || 0)) return;
var priceEl = row.querySelector('.p');
if (lastPT === 'mouse') { if (mode === 'full') fly(priceEl); return; }
var r = cfgTotal.getBoundingClientRect();
var atTotal = r.top > 60 && r.bottom < innerHeight;
var host = atTotal ? amt : row;
echo.style.setProperty('--ex', (host.offsetLeft + host.offsetWidth) + 'px');
echo.style.setProperty('--ey', (host.offsetTop - (atTotal ? 8 : 5)) + 'px');
echo.textContent = (inp.checked ? priceEl.textContent : priceEl.textContent.replace(/^\+/, '−')) +
' → $' + sumEl.textContent;
echo.className = 'cfg-echo' + (inp.checked ? '' : ' minus');
echo.style.transition = 'none';
void echo.offsetWidth;
echo.style.transition = '';
requestAnimationFrame(function () { echo.classList.add('go'); });
clearTimeout(echoT1); clearTimeout(echoT2);
echoT1 = setTimeout(function () { echo.classList.add('out'); }, 900);
echoT2 = setTimeout(function () { echo.classList.remove('go', 'out'); }, 1250);
});
(function () {
var cur = null, pressT = 0, rx = 0, ry = 0;
function drop() { clearTimeout(pressT); if (cur) cur.classList.remove('tapd'); cur = null; }
cfgBox.addEventListener('pointerdown', function (e) {
if (isMouse(e)) return;
var row = e.target.closest && e.target.closest('.cfg-addon,.cfg-support');
if (!row || row.classList.contains('off')) return;
drop();
cur = row; rx = e.clientX; ry = e.clientY;
pressT = setTimeout(function () { if (cur) cur.classList.add('tapd'); }, 110);
}, { passive: true });
cfgBox.addEventListener('pointermove', function (e) {
if (cur && Math.abs(e.clientY - ry) + Math.abs(e.clientX - rx) > 16) drop();
}, { passive: true });
cfgBox.addEventListener('pointercancel', drop, { passive: true });
cfgBox.addEventListener('pointerup', drop, { passive: true });
})();
var flyN = 0, flyT = 0;
function fly(priceEl) {
var from = priceEl.getBoundingClientRect();
var to = amt.getBoundingClientRect();
var dx = to.left - from.left, dy = to.top - from.top;
var i = flyN++;
clearTimeout(flyT); flyT = setTimeout(function () { flyN = 0; }, 700);
var chip = document.createElement('span');
chip.className = 'fly-chip';
chip.setAttribute('aria-hidden', 'true');
chip.textContent = priceEl.textContent;
chip.style.left = from.left + 'px';
chip.style.top = from.top + 'px';
document.body.appendChild(chip);
var arc = CSS.supports && CSS.supports('offset-path', 'path("M0 0")');
if (arc) {
var lift = -Math.max(60, Math.abs(dy) * 0.45) - i * 14;
var bow = (i % 2 ? 1 : -1) * (18 + i * 10);
chip.style.offsetPath = 'path("M0,0 C' + (dx * 0.25 + bow) + ',' + lift + ' ' +
(dx * 0.75 + bow) + ',' + (dy * 0.55 + lift * 0.3) + ' ' + dx + ',' + dy + '")';
chip.style.offsetRotate = '0deg';
chip.style.offsetDistance = '0%';
}
requestAnimationFrame(function () {
if (arc) {
chip.style.transition = 'offset-distance .62s cubic-bezier(.3,.7,.3,1),opacity .18s .44s,scale .62s ease-in';
chip.style.offsetDistance = '100%';
chip.style.scale = '.55';
} else {
chip.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(.5)';
}
chip.style.opacity = '0';
});
setTimeout(function () { chip.remove(); }, 700);
}
var hoursEl = document.getElementById('cfg-hours');
var bub = cfgBox.querySelector('.cfg-bub');
var roi = cfgBox.querySelector('.cfg-roi');
if (hoursEl && bub && roi) {
var bw = 0, bl = 0, bt = 0, kbdT = 0, bRz = 0;
function bMeasure() { bw = hoursEl.clientWidth; bl = hoursEl.offsetLeft; bt = hoursEl.offsetTop; }
function bMove() {
bub.textContent = hoursEl.value;
bub.style.setProperty('--bx', (bl + 11 + (bw - 22) * (hoursEl.value - 1) / 39) + 'px');
bub.style.setProperty('--by', bt + 'px');
}
bMeasure(); bMove();
hoursEl.addEventListener('pointerdown', function () { bMeasure(); roi.classList.add('drag'); }, { passive: true });
addEventListener('pointerup', function () { roi.classList.remove('drag'); }, { passive: true });
hoursEl.addEventListener('pointercancel', function () { roi.classList.remove('drag'); }, { passive: true });
hoursEl.addEventListener('blur', function () { roi.classList.remove('drag', 'kbd'); });
hoursEl.addEventListener('input', bMove);
hoursEl.addEventListener('keydown', function () {
bMeasure(); roi.classList.add('kbd');
clearTimeout(kbdT); kbdT = setTimeout(function () { roi.classList.remove('kbd'); }, 1200);
});
addEventListener('resize', function () {
clearTimeout(bRz); bRz = setTimeout(function () { bMeasure(); bMove(); }, 150);
});
}
}
})();
