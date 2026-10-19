/* Results.AG — globo global em WebGL (fundo de todas as páginas) */
(function () {
  'use strict';
  var LAND = '/A/A/A/A/At./A/A/A/A/At./A/A/A/A/At./A/A/A/A/At./A/A/A/A/At./A/A/A/A/At./A/ARI/A/A/AU./AjULBBBBCBW/A/A/AN./AbXBCDiBFBBCF/AGB/A7./AVHJJBBCx/ABBBCDBFDfE/AU./AVTBDIueCBBBDBG/AEH/AR./AEEEFCDCECKE0gBBBBEBC/APF/AM./BDDEBJDCBCCDFIBDuiEDBBB/AQD/AL.7CBBHBECCDCEDBBJJw/AXEgFBG/AE./ABKGCCCCECGWkBC/AOFbYXIBBh.6BHCOBIDcn/AMCbBBYBB/AE.4JIDCECFDCCHVfBE/ALDYaDDBFEDPDk.3QBDDGBCDKBETfBC/AMDNEEBDxLFi.AC2DDCBLFBCDDQBBQCBe/ANDMEBCCGBtDBCEBLd.VHCBlJHEDVOCBWBBDBuCBCBCkGB/AXU.RYGJBCEOFDCDEEDBBJOCCaqOcEEFB/AdBBDHC.ACM0BBEBBCGCCGCEIGPZrCBUGBIBBEBIBIB/An.AFL3BMBHCFECDIKDBRxZDBDZB/Ar.AJGBE/AKCCJMITwUCGDaC/At.ADBEE/AQBBBBLHCBMMPCBBBGbJDKF/A/AO.GCL/AKCEECDHOMSIZKDLC/A/AOD.ICJ/AHFCFBHCBENJWCaCBID/A/AfB.P/AJJCEBIDBBOIxLD/A/AQCMBBB.O/AJQGXGwME/A/AKDCCJH.PNBDCzRIYCqBGNEFB/A/ABHGBCJ.SIDBKtRIFB/AGFBHHCB/A6DDFDR.XDBBPBBqPKBE6CJDCGFBB/A2SDBBQ.XBBDQsPQ2FOFBBDBB/A1RGR.UCYBBsLQ4CLDCEE/A2SHR.RBBBaCBtJR3DKEBBH/A0UGS.PBiwCXxDBDKBGDB/A2TFT.vBCwDXuEDDH/A/AIPEU.wBCvDXuECGD/A/AKBBNDV.0/AIBBzED/A/AMBBNCW.0BB/AECBzBG/A/AMCCk.1CB5DCEC2BB/A/APBCk.4BB1BEGFw/A/ATCBl.47JBBBz/A/APDBl.47BBCB6hBEC/AlFBk.4/8OBQDCD/Akr.44CC/NCPEBE/AjGBl.42EB5DDJDECNL/AgGEj.41+MGBBDEJP/AaLBl.41+LLDEIEEG/AZy.4y/ACKHCFDBFBBBBB/AdBHLCm.4y/ACJCBFCGBDDE/AdCCCDMCm.5uBBuBTJQBECD/AdHDMCm.5v/AEIOCHCD/AdBBFDKCn.6u/AHBGKSCBCC/AWFDHFn.7t/AHBEMZ/AVGDEHo.7s/AHRa/AVGBEDBCr.+n/AITY/AXFBDEu./k/ABBHYGCM/AXKBw./CBh/AIaEGI/AYJBx./ABBCg/AIdB/Am7./ACCBSDBHC/AIqBPD/AH7./ADBBQNC/AH7D/AI6./ACDBOOD/AEvCNE/AF7./AECCMPC/ADwCOH/8./AFBCMQB/ACyCNJHB18./AFBDK/AUyCODDKzDB6./AHBCJ/ATzEUJxDB7./ALIOBBE+0DVKtFB7./AMHJBJCFB22CULCBOFQBC/AG./AMIHDKC71DTOOGODB/AG.YByJFEOD21ERPMJMDC/AG./ANJCBBDOG02DQQLKMDB/AH./AQN/AJ3DNSKMMNC6./ASL/AJ3EKUJMOMC6./AYJ/AE5CKWGSLLB7./AZJ/AD6CGZGSLLC6./AbG/AE7BEcFSLLBBC4./AeD/AE8KBVFSCCHNBBB3./AfCLBCB26HBZETBDGNBBC2./AfDHEBFCBw7BGZESBFELBCB5./AhCCBDEBKv/ACZDBBRBGBMBGB2./AhECSv/bBCBRCRBFD2./AkBCTu/eCRBYDHBt./AoTv8fCSCOCGC2./AnZrKFsuBEDME9./AoZsBNCBnwCDCLF9./Aoa9lyCCCKFHB2./Amc9k0CCCHHKBz./Amd8i3DBBFJKBz./Ald8i4EGJDDEBz./Alg5h6FEJJBCBBBv./AkgBD2h7DGHCDBBDBECu./Akm1f8FEHCDMBBFJBd./Alpyd+EICDBBBEBDBCLk./Akryb/ABDPBOJj./Akuvb/ACCNBOBDICBBCc./Altvb/AEDZBEJHBY./Altwa/AFGSBGJh./Amswa/ANGBCCBNDDCg./Anqxb/AQBEBWCBBd./Anqyb/AuBKBS./Aooza/AbBBBJBKBa./AonzbJB/ASGFBl.HB/Ahl0cIB/ARGGCk./AplzdHC/ANCBHGDj./AqkzdGD/ALMFEj./AsizcEG/AKPBBBEWBLB.eB/APgzaGF/AKSBFi./Ave0ZHF/AKYi./Ave1WJF/AJbg./Ave1WJFIB8fPBP.sB/ACd3VIF/AEiQBO./Avc4WHF/ADke./AvZ7VJE/ADld./AuY+UJD/ADnc./AuW/ABSMB/AFnb./AuW/ABS/ARob./AuX/S/ASoa./AuW/ACQ/AUna./AuV/AEO/AVmb./AtW/AEO/AVmb./AtU/AHM/AXlb./AuT/AHL/AYKISc./AtNBF/AIJ/AaILCBNd./AtOBD/AKB/AhDQBBOd./AsQ/A/A/AGMXBG./AsQ/A/A/AIKYBF./ArR/A/A/AIKZBE./ArQ/A/A/AMBBCcDC./AsL/A/A/AvDD./ArM/A/A/AwCD./ArJ/A/A/AVDYCBBE./ArK/A/A/AUDXDG./AsI/A/A/AWBXDH./AqBBI/A/A/AsDJ./AqI/A/A/AtEJ./AqI/A/A/AuCK./ArI/A/A/A5./ApJ/A/A/A6./ApI/A/ALB/Av./AqG/A/A/A8./ArFJC/A/A/Ax./ArF/A/A/A8./ArDCB/A/A/A7./AtGdB/A/A/Ab./A/A/A/A/At./A/A/A/A/At./A/A/A/A/At./A/A/A/A/At./A/A/A/A/At./A/A/A/A/At./A/A/A/A/At./A/A/A/A/At./A6C/A/A/Aw./A1BCBCB/A/A/Aw./A1C/A/AkB/AQ./AzC/AzHpBBHEEKCDIq./AwD/AxCBMW9k./AyCBB/ApdI/AKCCZ./AsDBH/AgCFdH/AUV./AuCBH/AGCCHKoD/AaBBR./ArMyDBHB/AGC/AlJ./ASDBBPCEECGx/A/A3L.1CZPECBBCBBLt/A/A6N.wBDBIBDCBCIBBnr/A/A3BCO.lBB/AOrBB/A/A4R.fBB/AGCGp/A/A/ADR.WHD/ALo/A/A/AJCDL.a/AHBGJBRGI/A/A/AON.QFI/AHBEECUHM/A/A/ADT.e/ALWIN/A/A/AFT.a/AZY/A/A/AOT.b/AbHJC/A/A/AWO.V/A/A/A/A/AQI.AIM/A/A/A/A/AZ.A/A/A/A/A/At.A/A/A/A/A/At.A/A/A/A/A/At.A/A/A/A/A/At.A/A/A/A/A/At';

  function RGGlobe(canvas, keys, fallbackImg) {
    var gl = null;
    try {
      gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, powerPreference: 'low-power' }) || canvas.getContext('experimental-webgl');
    } catch (e) { gl = null; }
    function fail() { if (fallbackImg) fallbackImg.hidden = false; canvas.style.display = 'none'; }
    if (!gl) { fail(); return; }

    var VS = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}';
    var FS = [
      '#ifdef GL_FRAGMENT_PRECISION_HIGH',
      'precision highp float;',
      '#else',
      'precision mediump float;',
      '#endif',
      'uniform vec2 uRes;uniform float uTime;uniform vec4 uG;uniform float uSpin;',
      'uniform sampler2D uLand;uniform vec3 uL;uniform vec3 uC;uniform float uRows;',
      'const float PI=3.14159265;',
      'float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
      'vec4 globe(vec2 frag,vec4 g,float spin){',
      '  vec2 p=(frag-g.xy)/g.z; float d=length(p);',
      '  if(d>1.6) return vec4(0.0);',
      '  float px=1.25/g.z;',
      '  vec3 col=vec3(0.0); float a=0.0;',
      '  float lit=clamp(dot(normalize(vec3(p,0.25)),uL)*0.6+0.45,0.0,1.0);',
      '  if(d>1.0){ float h=d-1.0; float glow=exp(-h*8.0)*0.42+exp(-h*30.0)*0.55; glow*=(0.25+0.75*lit); col=uC*glow; a=glow*0.9; }',
      '  if(d<=1.0+px){',
      '    float z=sqrt(max(0.0,1.0-d*d)); vec3 n=vec3(p,z);',
      '    float tl=0.36; vec3 q=vec3(n.x,n.y*cos(tl)-n.z*sin(tl),n.y*sin(tl)+n.z*cos(tl));',
      '    float cs=cos(spin),sn=sin(spin); q=vec3(q.x*cs+q.z*sn,q.y,-q.x*sn+q.z*cs);',
      '    float lat=asin(clamp(q.y,-1.0,1.0)); float lon=atan(q.x,q.z);',
      '    float rows=uRows; float rowF=(lat/PI+0.5)*rows; float ri=floor(rowF);',
      '    float latC=((ri+0.5)/rows-0.5)*PI; float cols=max(floor(rows*2.0*cos(latC)),1.0);',
      '    float colF=(lon/(2.0*PI)+0.5)*cols; float ci=floor(colF); float lonC=((ci+0.5)/cols-0.5)*2.0*PI;',
      '    vec2 f=vec2(fract(colF)-0.5,fract(rowF)-0.5); float dd=length(f);',
      '    float land=smoothstep(0.3,0.7,texture2D(uLand,vec2(lonC/(2.0*PI)+0.5,0.5-latC/PI)).r);',
      '    float landS=texture2D(uLand,vec2(lon/(2.0*PI)+0.5,0.5-lat/PI)).r;',
      '    float nl=dot(n,uL); float wrap=max((nl+0.22)/1.22,0.0); float day=smoothstep(-0.18,0.35,nl);',
      '    vec3 H=normalize(uL+vec3(0.0,0.0,1.0)); float nh=max(dot(n,H),0.0);',
      '    float spec=pow(nh,60.0)*(1.0-smoothstep(0.0,0.6,landS))*0.32; float sheen=pow(nh,10.0)*0.07;',
      '    float fres=pow(1.0-z,2.6);',
      '    vec3 ocean=mix(vec3(0.003,0.012,0.008),vec3(0.018,0.075,0.045),wrap);',
      '    vec3 s=ocean+uC*0.07*landS*wrap+vec3(0.02,0.045,0.03)*landS*day;',
      '    float cellPx=g.z*PI/rows; float aa=clamp(1.1/(cellPx*max(z,0.18)),0.03,0.5);',
      '    float dotm=1.0-smoothstep(0.3-aa,0.3+aa,dd);',
      '    float hsh=hash(vec2(ri,ci)); float tw=0.8+0.2*sin(uTime*1.2+hsh*6.283);',
      '    s+=uC*dotm*land*(0.1+0.95*wrap)*tw;',
      '    float city=step(0.9,hash(vec2(ri*1.7,ci*3.1)))*land*dotm*(1.0-day);',
      '    s+=vec3(0.75,1.0,0.6)*city*0.55*(0.7+0.3*sin(uTime*2.0+hsh*12.0));',
      '    float sea=(1.0-smoothstep(0.1-aa,0.1+aa,dd))*(1.0-land); s+=uC*sea*0.05*(0.3+wrap);',
      '    float g1=0.5-abs(fract(lat/(PI/12.0))-0.5); float g2=0.5-abs(fract(lon/(PI/12.0))-0.5);',
      '    float lw=clamp(1.2/(g.z*PI/12.0*max(z,0.2)),0.004,0.2);',
      '    float grid=max(1.0-smoothstep(0.0,lw,g1),1.0-smoothstep(0.0,lw,g2));',
      '    s+=uC*grid*0.045*(0.25+wrap);',
      '    s+=mix(vec3(0.8,1.0,0.85),uC,0.35)*spec*day+uC*sheen;',
      '    s+=uC*fres*(0.18+0.9*lit)*0.85;',
      '    s*=0.55+0.45*smoothstep(-0.5,0.5,nl);',
      '    float edge=1.0-smoothstep(1.0-px,1.0+px,d);',
      '    col=mix(col,s,edge); a=mix(a,1.0,edge);',
      '  }',
      '  float ro=-0.28; vec2 r=vec2(p.x*cos(ro)-p.y*sin(ro),p.x*sin(ro)+p.y*cos(ro));',
      '  vec2 E=vec2(1.34,0.3); float e=length(r/E); float th=atan(r.y/E.y,r.x/E.x);',
      '  float vis=(r.y<0.0||d>1.0)?1.0:0.0;',
      '  float ringd=abs(e-1.0)*0.3; float dash=step(0.45,fract(th*64.0/(2.0*PI)));',
      '  float ring=(1.0-smoothstep(0.0,px*1.4,ringd))*dash*0.4*vis;',
      '  col+=uC*ring; a=max(a,ring);',
      '  float sa=uTime*0.22+spin*3.0; vec2 sp=E*vec2(cos(sa),sin(sa));',
      '  vec2 spw=vec2(sp.x*cos(-ro)-sp.y*sin(-ro),sp.x*sin(-ro)+sp.y*cos(-ro));',
      '  float sv=(sin(sa)<0.0||length(spw)>1.0)?1.0:0.0;',
      '  float sd=length(p-spw); float sat=(1.0-smoothstep(0.012,0.012+px*1.5,sd))*sv; float sg=exp(-sd*38.0)*0.6*sv;',
      '  col+=vec3(1.0)*sat+uC*sg; a=max(a,max(sat,sg));',
      '  return vec4(col*g.w,a*g.w);',
      '}',
      'void main(){',
      '  vec2 fr=gl_FragCoord.xy; vec4 acc=globe(fr,uG,uSpin);',
      '  float dn=(hash(fr+uTime)-0.5)/255.0;',
      '  gl_FragColor=vec4(acc.rgb+dn*acc.a,acc.a);',
      '}'
    ].join('\n');

    function sh(type, src) {
      var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    }
    var vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) { fail(); return; }
    var pr = gl.createProgram(); gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { fail(); return; }
    gl.useProgram(pr);
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var aLoc = gl.getAttribLocation(pr, 'a'); gl.enableVertexAttribArray(aLoc); gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);
    var U = {};
    ['uRes', 'uTime', 'uG', 'uSpin', 'uLand', 'uL', 'uC', 'uRows'].forEach(function (n) { U[n] = gl.getUniformLocation(pr, n); });

    var W = 360, H = 180, A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var px = new Uint8Array(W * H), rows = LAND.split('.');
    for (var y = 0; y < H && y < rows.length; y++) {
      var x = 0, cur = 0, row = rows[y];
      for (var k = 0; k < row.length; k++) {
        var n = A.indexOf(row.charAt(k));
        if (n < 0) continue;
        if (cur) { for (var j = 0; j < n && x + j < W; j++) px[y * W + x + j] = 255; }
        x += n; cur ^= 1;
      }
    }
    var tex = gl.createTexture(); gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, W, H, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, px);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(U.uLand, 0);
    gl.uniform3f(U.uC, 78 / 255, 226 / 255, 60 / 255);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    var mq = function (q) { try { return window.matchMedia(q).matches; } catch (e) { return false; } };
    var reduce = mq('(prefers-reduced-motion: reduce)');
    var light = mq('(max-width: 700px)') || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    keys = (keys && keys.length) ? keys : [{ p: 0, x: 0.5, y: 0.55, r: 0.4, a: 1 }];
    var t0 = performance.now(), frame = 0, dirty = true, lastKey = '', raf = 0;
    function ss(t) { return t * t * (3 - 2 * t); }

    function draw(now) {
      raf = requestAnimationFrame(draw);
      frame++;
      if (light && (frame & 1)) return;
      var de = document.scrollingElement || document.documentElement;
      var vh = window.innerHeight || 1;
      var cw = canvas.clientWidth || 1, ch = canvas.clientHeight || 1;
      var dpr = Math.min(window.devicePixelRatio || 1, light ? 1.25 : 1.75);
      if (cw * ch * dpr * dpr > 3.6e6) dpr = Math.sqrt(3.6e6 / (cw * ch));
      var bw = Math.max(1, Math.round(cw * dpr)), bh = Math.max(1, Math.round(ch * dpr));
      if (canvas.width !== bw || canvas.height !== bh) { canvas.width = bw; canvas.height = bh; dirty = true; }
      var base = Math.min(Math.max(cw, 0.75 * ch), 1.25 * ch);
      var narrow = cw < 700;
      var t = reduce ? 0 : (now - t0) / 1000;
      var max = Math.max(1, de.scrollHeight - vh);
      var pr0 = Math.min(1, Math.max(0, (window.scrollY || de.scrollTop || 0) / max));
      var a = keys[0], b = keys[keys.length - 1];
      for (var m = 0; m < keys.length - 1; m++) { if (pr0 >= keys[m].p && pr0 <= keys[m + 1].p) { a = keys[m]; b = keys[m + 1]; break; } }
      var u = b.p > a.p ? ss((pr0 - a.p) / (b.p - a.p)) : 0;
      function L(f) { return a[f] + (b[f] - a[f]) * u; }
      var aym = a.ym != null ? a.ym : a.y, bym = b.ym != null ? b.ym : b.y;
      var kx = L('x'), ky = narrow ? aym + (bym - aym) * u : L('y'), kr = L('r'), ka = L('a');
      var cx = 0.5 + (kx - 0.5) * (narrow ? 1.35 : 1);
      var G = [cx * bw, bh - ky * ch * dpr, kr * base * dpr, ka];
      var key = G.join(',');
      if (reduce && !dirty && key === lastKey) return;
      lastKey = key; dirty = false;
      gl.viewport(0, 0, bw, bh);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(U.uRes, bw, bh);
      gl.uniform1f(U.uTime, t);
      gl.uniform4f(U.uG, G[0], G[1], G[2], G[3]);
      gl.uniform1f(U.uSpin, 2.2 + t * 0.035 + pr0 * 1.2);
      gl.uniform1f(U.uRows, light ? 84 : 110);
      var lt = reduce ? 0 : t;
      var lx = -0.55 + 0.12 * Math.sin(lt * 0.07), ly = 0.5 + 0.08 * Math.cos(lt * 0.05), lz = 0.68;
      var ln = Math.sqrt(lx * lx + ly * ly + lz * lz);
      gl.uniform3f(U.uL, lx / ln, ly / ln, lz / ln);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    function onScroll() { dirty = true; }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
      else if (!raf) { raf = requestAnimationFrame(draw); }
    });
    raf = requestAnimationFrame(draw);
  }

  function boot() {
    var c = document.getElementById('rg-globe');
    if (!c) return;
    var keys = null;
    try { keys = JSON.parse(c.getAttribute('data-keys') || 'null'); } catch (e) { keys = null; }
    var fb = c.parentNode ? c.parentNode.querySelector('.rg-globe-fallback') : null;
    RGGlobe(c, keys, fb);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
