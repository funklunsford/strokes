import{a as e,r as t}from"./index-BE6Vodx1.js";import{t as n}from"./maze-Dw4RQL0p.js";var r={length:3.2,handoff:1.7},i=3,a=2.4,o=.97;function s(s,{small:c,sources:l}){let u=n(83),d={h:0,s:0,l:0},f=e=>(e.getHSL(d,s.SRGBColorSpace),e.setHSL(d.h,Math.max(d.s,.6),Math.min(.64,Math.max(d.l,.55)),s.SRGBColorSpace)),p=[`#ffc21a`,`#ff5e8a`,`#ffffff`,`#4fc3ff`].map(e=>new s.Color(e)),m=l.length?l:[{x:0,y:0,color:[.9,.6,.2]}],h=()=>m[Math.floor(u()*m.length)],g=m.map(e=>e.x),_=m.map(e=>e.y),v={x:(Math.min(...g)+Math.max(...g))/2,y:(Math.min(..._)+Math.max(..._))/2},y=Math.max(.12,(Math.max(...g)-Math.min(...g))/2),b=c?150:240,x=Array.from({length:b},(e,t)=>{let n=h(),r=t<b*.7,i=u()<.85?Math.PI/2+(u()-.5)*2.9:u()*6.28,a=r?2.6+2.8*u():1.4+1.6*u(),o=u()*2-1,c=1+.35*o,[l,d,m]=[u()-.5,u()-.5,u()-.5],g=Math.hypot(l,d,m)||1,_=u()<.18,v=_?.018+.01*u():.026+.026*u();return{x:n.x,y:n.y,z:o,near:c,born:r?.06*u():.12+.3*u(),vx:Math.cos(i)*a*c,vy:Math.sin(i)*a*c,axis:new s.Vector3(l/g,d/g,m/g),spin:5+9*u(),phase:u()*6.28,sway:.03+.06*u(),swayRate:4+4*u(),w:v,h:_?v:v*(.4+.3*u()),dot:_,color:u()<.72?f(new s.Color().setRGB(...n.color,s.SRGBColorSpace)):p[Math.floor(u()*p.length)].clone()}}),S=new s.PlaneGeometry(1,1);S.setAttribute(`aDot`,new s.InstancedBufferAttribute(new Float32Array(x.map(e=>+!!e.dot)),1));let C=new s.InstancedMesh(S,new s.ShaderMaterial({vertexShader:`
        attribute float aDot;
        varying vec2 vUv;
        varying vec3 vColor;
        varying float vLight;
        varying float vGlint;
        varying float vBack;
        varying float vDot;
        void main() {
          vUv = position.xy;
          vColor = instanceColor;
          vDot = aDot;
          vec3 n = normalize(mat3(instanceMatrix) * vec3(0.0, 0.0, 1.0));
          float d = dot(n, normalize(vec3(-0.35, 0.6, 0.72)));
          vLight = 0.62 + 0.38 * abs(d);
          vGlint = pow(abs(d), 30.0);
          vBack = step(d, 0.0);
          gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        }`,fragmentShader:`
        varying vec2 vUv;
        varying vec3 vColor;
        varying float vLight;
        varying float vGlint;
        varying float vBack;
        varying float vDot;
        void main() {
          if (vDot > 0.5 && length(vUv) > 0.5) discard;
          vec3 color = vColor * vLight * (1.0 - 0.18 * vBack) + vec3(0.7 * vGlint);
          gl_FragColor = vec4(color, 1.0);
          #include <colorspace_fragment>
        }`,side:s.DoubleSide}),b);x.forEach((e,t)=>C.setColorAt(t,e.color)),C.instanceMatrix.setUsage(s.DynamicDrawUsage);let w=new s.Mesh(new s.PlaneGeometry(2,2),new s.ShaderMaterial({uniforms:{uLife:{value:0}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = position.xy;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,fragmentShader:`
        uniform float uLife;
        varying vec2 vUv;
        void main() {
          float r = length(vUv);
          float width = mix(0.22, 0.04, uLife);
          float band = 1.0 - smoothstep(0.0, width, abs(r - (1.0 - width)));
          float glow = (1.0 - smoothstep(0.0, 0.9, r)) * 0.35 * (1.0 - uLife);
          gl_FragColor = vec4(vec3(1.0, 0.8, 0.3), clamp(band + glow, 0.0, 1.0) * (1.0 - uLife));
          #include <colorspace_fragment>
        }`,transparent:!0,depthTest:!1,depthWrite:!1})),T=c?18:30,E=Array.from({length:T},()=>{let e=h(),t=u()*6.28,n=.05+.3*u();return{x:e.x+Math.cos(t)*n,y:e.y+Math.sin(t)*n+.2*u(),at:.05+2.2*u(),life:.35+.4*u(),size:.03+.04*u(),turn:u()*6.28,color:new s.Color(u()<.5?`#fff6dc`:`#ffd36a`)}}),D=new s.InstancedMesh(new s.PlaneGeometry(2,2),new s.ShaderMaterial({vertexShader:`
        varying vec2 vUv;
        varying vec3 vColor;
        void main() {
          vUv = position.xy;
          vColor = instanceColor;
          gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        }`,fragmentShader:`
        varying vec2 vUv;
        varying vec3 vColor;
        void main() {
          float r = length(vUv);
          float rays = max(0.0, 1.0 - abs(vUv.x * vUv.y) * 22.0) * max(0.0, 1.0 - r);
          float glow = exp(-r * r * 14.0);
          gl_FragColor = vec4(vColor, clamp(rays * rays + glow, 0.0, 1.0));
          #include <colorspace_fragment>
        }`,transparent:!0,depthTest:!1,depthWrite:!1}),T);E.forEach((e,t)=>D.setColorAt(t,e.color)),D.instanceMatrix.setUsage(s.DynamicDrawUsage);let O=[C,w,D];O.forEach((e,t)=>{e.frustumCulled=!1,e.renderOrder=t});let k=new s.Matrix4,A=new s.Quaternion,j=new s.Vector3(0,0,1),M=new s.Vector3,N=new s.Vector3,P=new s.Matrix4().makeScale(0,0,0),F=(n,s)=>{let c=s*o,l=e=>c*Math.tanh(e/c),u=Math.max(1,1.6*Math.min(1,s)),d=1-e(r.length-.6,r.length,n);x.forEach((e,r)=>{let o=n-e.born;if(o<=0||d<=0){C.setMatrixAt(r,P);return}let s=(1-Math.exp(-3*o))/i,c=a/i*e.near,f=l(e.x+u*(e.vx*s+e.sway*Math.sin(e.swayRate*o+e.phase)*t(o/.5))),p=e.y+u*((e.vy+c)*s-c*o);A.setFromAxisAngle(e.axis,e.phase+e.spin*o+5*s*i);let m=Math.min(1.15,1-Math.exp(-14*o)*Math.cos(16*o))*d,h=u*e.near*m;C.setMatrixAt(r,k.compose(M.set(f,p,e.z),A,N.set(e.w*h,e.h*h,1)))});let f=n/.4;w.visible=f>0&&f<1;let p=1-(1-t(f))**3;w.position.set(v.x,v.y,2),w.scale.set(.05+(y*1.35+.08)*p,.05+(y*.55+.12)*p,1),w.material.uniforms.uLife.value=t(f),E.forEach((e,t)=>{let r=(n-e.at)/e.life;if(r<=0||r>=1){D.setMatrixAt(t,P);return}let i=u*e.size*Math.sin(Math.PI*r);A.setFromAxisAngle(j,e.turn+r),D.setMatrixAt(t,k.compose(M.set(l(e.x),e.y,3),A,N.set(i,i,1)))}),C.instanceMatrix.needsUpdate=!0,D.instanceMatrix.needsUpdate=!0};F(0,1);for(let e of[C,D])e.instanceColor&&(e.instanceColor.needsUpdate=!0);return{objects:O,update:F,dispose:()=>{for(let e of O)e.geometry.dispose(),e.material.dispose()}}}export{r as CONFETTI,s as confettiScene};