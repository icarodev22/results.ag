/* Results.AG — abertura: globo neon com o R, órbita luminosa e seta de crescimento que revela o site */
(function () {
  'use strict';
function RGIntroEngine(wrap, glc, cv, opts) {
    /* ===== Abertura Results.AG: globo neon com R, órbita e seta de crescimento ===== */
    var raf = 0, stopped = false, revealed = false, finished = false, lateSent = false;
    var t0 = performance.now(), offset = 0, last = t0, spinA = 0;
    var mq = function (q) { try { return window.matchMedia(q).matches; } catch (e) { return false; } };
    var light = mq('(max-width: 700px)') || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    var ctx = cv.getContext('2d');
    var T_ARROW = 2.55, T_WIPE = 3.6, T_END = 4.65;

    function sm(a, b, x) { var t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
    function lin(a, b, x) { return Math.min(1, Math.max(0, (x - a) / (b - a))); }
    function easeIn(x) { return x * x * x; }
    function easeOutBack(x) { var c1 = 1.5, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); }
    function reveal() { if (revealed) return; revealed = true; try { opts.reveal && opts.reveal(); } catch (e) {} }
    function finish() {
      if (finished) return; finished = true; reveal(); stop();
      try { opts.done && opts.done(); } catch (e) {}
    }
    function stop() {
      stopped = true; if (raf) cancelAnimationFrame(raf); raf = 0;
      if (gl) { try { var l = gl.getExtension('WEBGL_lose_context'); if (l) l.loseContext(); } catch (e) {} gl = null; }
    }

    /* ---------- WebGL: globo ---------- */
    var gl = null, PG = null, U = {}, tR = null, quad = null, aQ = -1;
    try { gl = glc.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: 'high-performance' }) || glc.getContext('experimental-webgl'); } catch (e) { gl = null; }
    if (gl) {
      var VS = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}';
      var FS = [
        '#ifdef GL_FRAGMENT_PRECISION_HIGH',
        'precision highp float;',
        '#else',
        'precision mediump float;',
        '#endif',
        'uniform vec2 uC;uniform float uRad;uniform float uSpin;uniform float uBuild;uniform float uBody;uniform float uRon;uniform float uRScale;uniform float uRYaw;',
        'uniform float uOrbit;uniform float uOrbPh;uniform float uGlow;uniform float uFlare;uniform sampler2D uR;',
        'const float PI=3.14159265;',
        'const vec3 G=vec3(0.306,0.886,0.235);const vec3 LIME=vec3(0.80,1.0,0.52);',
        'vec3 rotv(vec3 v,float tl,float sp){v=vec3(v.x,v.y*cos(tl)-v.z*sin(tl),v.y*sin(tl)+v.z*cos(tl));float c=cos(sp),s=sin(sp);return vec3(v.x*c+v.z*s,v.y,-v.x*s+v.z*c);}',
        'vec2 grid(vec3 v,float w,float b){',
        '  float lat=asin(clamp(v.y,-1.0,1.0)); float lon=atan(v.x,v.z); float st=PI/6.0;',
        '  float dLat=abs(fract(lat/st+0.5)-0.5)*st; float np=step(abs(lat),PI/2.0-0.3);',
        '  float on1=step((lon+PI)/(2.0*PI),b*1.04);',
        '  float c1=(1.0-smoothstep(w*0.5,w,dLat))*np*on1; float g1=exp(-dLat/0.055)*np*on1;',
        '  float dLon=abs(fract(lon/st+0.5)-0.5)*st*cos(lat);',
        '  float on2=step((PI/2.0-lat)/PI,b*1.04);',
        '  float c2=(1.0-smoothstep(w*0.5,w,dLon))*on2; float g2=exp(-dLon/0.055)*on2;',
        '  return vec2(max(c1,c2),max(g1,g2));',
        '}',
        'void main(){',
        '  vec2 p=(gl_FragCoord.xy-uC)/uRad; float d=length(p); float px=1.0/uRad;',
        '  vec3 col=vec3(0.0,0.008,0.003);',
        '  col+=G*0.07*exp(-d*d*0.35)*uBody;',
        '  col+=G*uFlare*exp(-d*d*2.2);',
        '  vec2 gq=vec2(p.x/0.85,(p.y+1.30)/0.06); col+=G*0.5*uBody*exp(-dot(gq,gq));',
        '  float w=0.032;',
        '  float rA=0.0;',
        '  if(d<1.0+px){',
        '    float z=sqrt(max(0.0,1.0-d*d)); vec3 nf=vec3(p,z), nb=vec3(p,-z);',
        '    float tl=0.26; vec2 gf=grid(rotv(nf,tl,uSpin),w,uBuild); vec2 gb=grid(rotv(nb,tl,uSpin),w,uBuild);',
        '    vec3 L=normalize(vec3(-0.45,0.62,0.65)); vec3 H=normalize(L+vec3(0.0,0.0,1.0));',
        '    float fres=pow(1.0-z,2.3);',
        '    vec3 sc=vec3(0.0,0.028,0.010)*uBody+G*0.06*z*uBody;',
        '    sc+=G*(gb.x*0.18+gb.y*0.06);',
        '    float cy=max(cos(uRYaw),0.25); vec2 ru=vec2(p.x/cy,p.y);',
        '    vec4 rr=texture2D(uR,vec2(ru.x,-ru.y)/(1.42*uRScale)+0.5)*uRon; rA=rr.a;',
        '    sc=sc*(1.0-rr.a)+rr.rgb*1.0;',
        '    sc+=G*fres*0.95*uBody;',
        '    float spec=pow(max(dot(nf,H),0.0),34.0); sc+=vec3(0.85,1.0,0.8)*spec*0.32*uBody;',
        '    float fl=1.0-0.94*rr.a;',
        '    sc+=(mix(G,LIME,0.35)*gf.x*1.3+G*gf.y*0.32)*fl*uGlow;',
        '    float edge=1.0-smoothstep(1.0-px,1.0+px,d);',
        '    col=mix(col,sc,edge);',
        '  }',
        '  col+=G*0.42*exp(-max(d-1.0,0.0)/0.055)*step(1.0,d)*uBody*uGlow;',
        '  float ro=0.24; vec2 r=vec2(p.x*cos(ro)+p.y*sin(ro),-p.x*sin(ro)+p.y*cos(ro));',
        '  vec2 E=vec2(1.52,0.30);',
        '  vec2 qe=r/E; float ql=length(qe); vec2 qn=ql>1e-5?qe/ql:vec2(1.0,0.0);',
        '  float th=atan(qn.y,abs(qn.x)<1e-4?(qn.x<0.0?-1e-4:1e-4):qn.x);',
        '  float sp=fract((th+0.85*PI)/(2.0*PI));',
        '  float drawn=uOrbit>0.999?1.0:(1.0-smoothstep(uOrbit-0.06,uOrbit,sp))*(1.0+1.6*exp(-pow(max(uOrbit-sp,0.0)/0.025,2.0)));',
        '  float front=step(r.y,0.0); float occ=(d<1.0)?mix(0.10,1.0,front):1.0;',
        '  float e1=length(r/E); float d1=abs(e1-1.0)*E.y*1.25;',
        '  float e2=length(r/(E*vec2(1.045,1.16))); float d2=abs(e2-1.0)*E.y*1.25;',
        '  float boost=exp((dot(qn,vec2(cos(uOrbPh),sin(uOrbPh)))-1.0)*10.0)*2.2;',
        '  float core=(1.0-smoothstep(0.0035,0.008+px,d1))+0.45*(1.0-smoothstep(0.002,0.006+px,d2));',
        '  float glow=exp(-d1/0.028)*0.55+exp(-d2/0.02)*0.18;',
        '  col+=(mix(G,LIME,0.55)*core*(0.85+boost)+G*glow*(0.4+boost*0.7))*drawn*occ*uGlow;',
        '  col=clamp(col,0.0,40.0); col=1.0-exp(-col*1.3);',
        '  gl_FragColor=vec4(col,1.0);',
        '}'
      ].join('\n');
      var sh = function (type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
      var vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
      if (vs && fs) {
        PG = gl.createProgram(); gl.attachShader(PG, vs); gl.attachShader(PG, fs); gl.linkProgram(PG);
        if (!gl.getProgramParameter(PG, gl.LINK_STATUS)) PG = null;
      }
      if (!PG) { gl = null; }
      else {
        gl.useProgram(PG);
        quad = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, quad);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        aQ = gl.getAttribLocation(PG, 'a'); gl.enableVertexAttribArray(aQ); gl.vertexAttribPointer(aQ, 2, gl.FLOAT, false, 0, 0);
        ['uC', 'uRad', 'uSpin', 'uBuild', 'uBody', 'uRon', 'uRScale', 'uRYaw', 'uOrbit', 'uOrbPh', 'uGlow', 'uFlare', 'uR'].forEach(function (k) { U[k] = gl.getUniformLocation(PG, k); });
        tR = gl.createTexture(); gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.uniform1i(U.uR, 0);
      }
    }

    /* ---------- o "R" (sólido, com volume) ---------- */
    /* R da logo oficial, redesenhado em vetor a partir da arte da marca (caixa 650 x 485) */
    function drawR() {
      if (!gl || stopped) return;
      var S = 1024, c = document.createElement('canvas'); c.width = c.height = S;
      var x = c.getContext('2d'); if (!x) return;
      var sc = (S * 0.8) / 650, ox = (S - 650 * sc) / 2 - 65 * sc, oy = (S - 485 * sc) / 2 - 70 * sc;
      function rPath(dx, dy) {
        var P = function (a, b) { return [ox + (a + dx) * sc, oy + (b + dy) * sc]; };
        var m = function (a, b) { var q = P(a, b); x.moveTo(q[0], q[1]); };
        var l = function (a, b) { var q = P(a, b); x.lineTo(q[0], q[1]); };
        var cb = function (a, b, a2, b2, a3, b3) { var q1 = P(a, b), q2 = P(a2, b2), q3 = P(a3, b3); x.bezierCurveTo(q1[0], q1[1], q2[0], q2[1], q3[0], q3[1]); };
        x.beginPath();
        m(65, 70); l(560, 70); cb(640, 70, 690, 120, 690, 205); cb(690, 290, 650, 350, 590, 372);
        l(715, 555); l(555, 555); l(420, 385); l(195, 385); l(195, 555); l(65, 555); x.closePath();
        m(195, 165); l(505, 165); cb(540, 165, 560, 190, 560, 220); cb(560, 250, 540, 272, 505, 272); l(195, 272); x.closePath();
      }
      x.lineJoin = 'round';
      x.save(); rPath(0, 0); x.shadowColor = 'rgba(78,226,60,0.75)'; x.shadowBlur = 64; x.fillStyle = 'rgba(40,160,35,0.55)'; x.fill('evenodd'); x.restore();
      for (var i = 10; i >= 1; i--) { rPath(i * 0.9, i * 1.1); x.fillStyle = 'rgb(' + (8 + i) + ',' + (58 + i * 3) + ',' + (14 + i) + ')'; x.fill('evenodd'); }
      rPath(0, 0);
      var gr = x.createLinearGradient(0, oy + 70 * sc, 0, oy + 555 * sc);
      gr.addColorStop(0, '#6ff257'); gr.addColorStop(0.5, '#3fd52c'); gr.addColorStop(1, '#25a51c');
      x.fillStyle = gr; x.fill('evenodd');
      x.save(); rPath(0, 0); x.clip('evenodd');
      var shn = x.createLinearGradient(ox + 65 * sc, oy + 70 * sc, ox + 520 * sc, oy + 520 * sc);
      shn.addColorStop(0, 'rgba(255,255,255,0.16)'); shn.addColorStop(0.45, 'rgba(255,255,255,0.03)'); shn.addColorStop(1, 'rgba(255,255,255,0)');
      x.fillStyle = shn; x.fillRect(0, 0, S, S);
      rPath(0, 0); x.lineWidth = 16 * sc; x.strokeStyle = 'rgba(8,60,10,0.22)'; x.stroke();
      x.restore();
      rPath(0, 0); x.lineWidth = 4.5; x.strokeStyle = 'rgba(208,255,188,0.95)'; x.shadowColor = 'rgba(120,255,90,0.9)'; x.shadowBlur = 12; x.stroke();
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tR);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c); } catch (e) {}
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    }
    drawR();

    /* ---------- alternativa leve (sem WebGL): arte oficial ---------- */
    var fbImg = null;
    if (!gl) { fbImg = new Image(); fbImg.decoding = 'async'; fbImg.src = opts.fallbackSrc || ''; glc.style.display = 'none'; }

    /* ---------- partículas de fundo ---------- */
    var NP = light ? 46 : 90, dots = [];
    for (var i = 0; i < NP; i++) dots.push({ x: Math.random(), y: Math.random(), r: 0.5 + Math.random() * 1.4, a: 0.15 + Math.random() * 0.55, ph: Math.random() * 6.28, d: (Math.random() - 0.5) * 0.004, t0: Math.random() * 0.9 });

    /* ---------- geometria da órbita e da seta ---------- */
    var RO = 0.24, EX = 1.52, EY = 0.30;
    function ringPt(th, cx, cy, rad) {
      var rx = EX * Math.cos(th), ry = EY * Math.sin(th);
      var px = rx * Math.cos(RO) - ry * Math.sin(RO), py = rx * Math.sin(RO) + ry * Math.cos(RO);
      return [cx + px * rad, cy - py * rad];
    }
    function buildPath(cx, cy, rad, W, H) {
      var pts = [], th0 = -0.85 * Math.PI, th1 = -0.22 * Math.PI, n = 50, k;
      for (k = 0; k <= n; k++) pts.push(ringPt(th0 + (th1 - th0) * k / n, cx, cy, rad));
      var p1 = pts[pts.length - 1], p0 = pts[pts.length - 3];
      var tx = p1[0] - p0[0], ty = p1[1] - p0[1], tl = Math.sqrt(tx * tx + ty * ty) || 1; tx /= tl; ty /= tl;
      var c1 = [p1[0] + tx * rad * 0.9, p1[1] + ty * rad * 0.9];
      var end = [W + 140, -140], c2 = [W * 0.86, H * 0.32];
      for (k = 1; k <= 70; k++) {
        var u = k / 70, a = 1 - u;
        pts.push([a * a * a * p1[0] + 3 * a * a * u * c1[0] + 3 * a * u * u * c2[0] + u * u * u * end[0], a * a * a * p1[1] + 3 * a * a * u * c1[1] + 3 * a * u * u * c2[1] + u * u * u * end[1]]);
      }
      var L = [0]; for (k = 1; k < pts.length; k++) { var dx = pts[k][0] - pts[k - 1][0], dy = pts[k][1] - pts[k - 1][1]; L.push(L[k - 1] + Math.sqrt(dx * dx + dy * dy)); }
      return { pts: pts, L: L, total: L[L.length - 1] };
    }
    function at(path, s) {
      var L = path.L, i = 1; while (i < L.length - 1 && L[i] < s) i++;
      var a = path.pts[i - 1], b = path.pts[i], f = (s - L[i - 1]) / Math.max(1e-6, L[i] - L[i - 1]);
      return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, b[0] - a[0], b[1] - a[1]];
    }

    /* ---------- recorte diagonal que revela o site ---------- */
    function clipPoly(W, H, S) {
      var v = [Math.SQRT1_2, -Math.SQRT1_2];
      var f = function (p) { return (p[0] - 0) * v[0] + (p[1] - H) * v[1] - S; };
      var R = [[0, 0], [W, 0], [W, H], [0, H]], out = [];
      for (var i = 0; i < 4; i++) {
        var a = R[i], b = R[(i + 1) % 4], fa = f(a), fb = f(b);
        if (fa >= 0) out.push(a);
        if ((fa >= 0) !== (fb >= 0)) { var tt = fa / (fa - fb); out.push([a[0] + (b[0] - a[0]) * tt, a[1] + (b[1] - a[1]) * tt]); }
      }
      if (out.length < 3) return 'polygon(0 0, 0 0, 0 0)';
      return 'polygon(' + out.map(function (p) { return p[0].toFixed(1) + 'px ' + p[1].toFixed(1) + 'px'; }).join(', ') + ')';
    }

    function frame(now) {
      if (stopped) return;
      raf = requestAnimationFrame(frame);
      var t = (now - t0) / 1000 + offset, dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (t >= T_END) { finish(); return; }
      if (t > T_ARROW - 0.2 && !lateSent) { lateSent = true; try { opts.late && opts.late(); } catch (e) {} }
      if (t >= T_WIPE) reveal();

      var dpr = Math.min(window.devicePixelRatio || 1, light ? 1.5 : 2);
      var W = wrap.clientWidth || 1, H = wrap.clientHeight || 1;
      var bw = Math.round(W * dpr), bh = Math.round(H * dpr);
      if (cv.width !== bw || cv.height !== bh) { cv.width = bw; cv.height = bh; }
      var rad = Math.min(W * 0.30, H * 0.27) * (0.9 + 0.1 * sm(0.4, 1.8, t));
      var cx = W / 2, cy = H * 0.5;
      var glow = 1 + 0.9 * sm(2.85, 3.55, t);
      var spinSpeed = 0.12 + 0.42 * sm(0.5, 2.5, t);
      spinA += spinSpeed * dt;
      var finalTurn = 1.4 * sm(2.8, 3.8, t);

      if (gl) {
        if (glc.width !== bw || glc.height !== bh) { glc.width = bw; glc.height = bh; }
        gl.viewport(0, 0, bw, bh);
        gl.uniform2f(U.uC, cx * dpr, (H - cy) * dpr);
        gl.uniform1f(U.uRad, rad * dpr);
        gl.uniform1f(U.uSpin, spinA + finalTurn);
        gl.uniform1f(U.uBuild, lin(0.45, 1.75, t));
        gl.uniform1f(U.uBody, sm(0.9, 1.85, t));
        gl.uniform1f(U.uRon, sm(1.25, 1.9, t));
        gl.uniform1f(U.uRScale, 0.86 + 0.14 * easeOutBack(lin(1.25, 2.05, t)));
        gl.uniform1f(U.uRYaw, 0.12 * Math.sin(t * 0.9) * sm(1.6, 2.6, t));
        gl.uniform1f(U.uOrbit, sm(1.15, 2.15, t));
        gl.uniform1f(U.uOrbPh, t * 1.7);
        gl.uniform1f(U.uGlow, glow);
        gl.uniform1f(U.uFlare, 0.85 * sm(0.15, 0.9, t) * (1 - 0.82 * sm(1.0, 1.9, t)));
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      if (!gl) {
        ctx.fillStyle = '#050507'; ctx.fillRect(0, 0, W, H);
        if (fbImg && fbImg.complete && fbImg.naturalWidth) {
          var sz = Math.min(W, H) * 0.82; ctx.globalAlpha = sm(0.1, 0.8, t);
          ctx.drawImage(fbImg, cx - sz / 2, cy - sz / 2, sz, sz); ctx.globalAlpha = 1;
        }
      }
      ctx.globalCompositeOperation = 'lighter';
      for (var i = 0; i < dots.length; i++) {
        var p = dots[i]; var a = p.a * sm(p.t0, p.t0 + 0.8, t) * (0.65 + 0.35 * Math.sin(t * 1.6 + p.ph));
        if (a <= 0.01) continue;
        var dx = ((p.x + p.d * t) % 1 + 1) % 1;
        ctx.fillStyle = 'rgba(110,240,90,' + a.toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(dx * W, p.y * H, p.r, 0, 6.2832); ctx.fill();
      }

      if (t >= T_ARROW) {
        var path = buildPath(cx, cy, rad, W, H);
        var ap = easeIn(lin(T_ARROW, T_WIPE, t));
        var s = ap * path.total, tail = Math.max(0, s - path.total * (0.22 + 0.45 * ap));
        var steps = 46;
        ctx.lineCap = 'round';
        ctx.shadowColor = 'rgba(78,226,60,0.9)';
        for (var pass = 0; pass < 2; pass++) {
          ctx.shadowBlur = pass ? 0 : 18;
          for (var j = 0; j < steps; j++) {
            var sa = tail + (s - tail) * j / steps, sb = tail + (s - tail) * (j + 1) / steps;
            var A = at(path, sa), B = at(path, sb), k = (j + 1) / steps;
            ctx.strokeStyle = pass ? 'rgba(225,255,205,' + (0.85 * k * k).toFixed(3) + ')' : 'rgba(78,226,60,' + (0.95 * k).toFixed(3) + ')';
            ctx.lineWidth = pass ? 1.2 + 1.4 * k : 2 + 4.5 * k * (1 + ap);
            ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke();
          }
        }
        if (s < path.total) {
          var hd = at(path, s), tx = hd[2], ty = hd[3], tl = Math.sqrt(tx * tx + ty * ty) || 1; tx /= tl; ty /= tl;
          var arm = 15 + 10 * ap, ang = 2.45;
          ctx.shadowBlur = 16; ctx.strokeStyle = 'rgba(205,255,180,0.98)'; ctx.lineWidth = 3.2;
          ctx.beginPath();
          ctx.moveTo(hd[0] + (tx * Math.cos(ang) - ty * Math.sin(ang)) * arm, hd[1] + (tx * Math.sin(ang) + ty * Math.cos(ang)) * arm);
          ctx.lineTo(hd[0], hd[1]);
          ctx.lineTo(hd[0] + (tx * Math.cos(-ang) - ty * Math.sin(-ang)) * arm, hd[1] + (tx * Math.sin(-ang) + ty * Math.cos(-ang)) * arm);
          ctx.stroke();
          ctx.fillStyle = 'rgba(235,255,225,0.95)'; ctx.beginPath(); ctx.arc(hd[0], hd[1], 2.6, 0, 6.2832); ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      if (t >= T_WIPE) {
        var wp = lin(T_WIPE, T_END - 0.1, t); wp = wp < 0.5 ? 4 * wp * wp * wp : 1 - Math.pow(-2 * wp + 2, 3) / 2;
        var S = wp * (W + H) * Math.SQRT1_2;
        wrap.style.clipPath = clipPoly(W, H, S);
        wrap.style.webkitClipPath = wrap.style.clipPath;
        var ox = S * Math.SQRT1_2, oy = H - S * Math.SQRT1_2, ext = W + H;
        ctx.shadowColor = 'rgba(78,226,60,0.95)'; ctx.shadowBlur = 26; ctx.lineCap = 'butt';
        ctx.strokeStyle = 'rgba(78,226,60,0.95)'; ctx.lineWidth = 5;
        ctx.beginPath(); ctx.moveTo(ox - ext * Math.SQRT1_2 + 3, oy - ext * Math.SQRT1_2 - 3); ctx.lineTo(ox + ext * Math.SQRT1_2 + 3, oy + ext * Math.SQRT1_2 - 3); ctx.stroke();
        ctx.shadowBlur = 0; ctx.strokeStyle = 'rgba(230,255,215,0.9)'; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(ox - ext * Math.SQRT1_2 + 2, oy - ext * Math.SQRT1_2 - 2); ctx.lineTo(ox + ext * Math.SQRT1_2 + 2, oy + ext * Math.SQRT1_2 - 2); ctx.stroke();
      }
      ctx.globalCompositeOperation = 'source-over';
    }
    raf = requestAnimationFrame(frame);

    return {
      skip: function () {
        var t = (performance.now() - t0) / 1000 + offset;
        if (t < T_ARROW + 0.75) offset += (T_ARROW + 0.75) - t;
      },
      stop: stop
    };
  }

  window.RGIntro = function (btn, cb) {
    cb = cb || {};
    var wrap = btn.querySelector('.rg-intro-wrap'), glc = btn.querySelector('.rg-intro-gl'), cv = btn.querySelector('.rg-intro-2d');
    var ctl = RGIntroEngine(wrap, glc, cv, {
      fallbackSrc: 'assets/brand-globe.jpg',
      late: function () { btn.classList.add('is-late'); },
      reveal: function () { try { cb.reveal && cb.reveal(); } catch (e) {} },
      done: function () { try { cb.done && cb.done(); } catch (e) {} }
    });
    btn.addEventListener('click', function () { ctl.skip(); });
    return ctl;
  };
})();
