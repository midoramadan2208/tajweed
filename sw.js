const C="tajweed-v2";
const FILES=["./","index.html","manifest.json","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
if(r.mode==="navigate"){e.respondWith(fetch(r,{cache:"no-cache"}).then(n=>{if(n.ok){const cl=n.clone();caches.open(C).then(c=>c.put(r,cl))}return n}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))));return}
e.respondWith(caches.open(C).then(c=>c.match(r).then(m=>{const f=fetch(r).then(n=>{if(n.ok)c.put(r,n.clone());return n}).catch(()=>m);return m||f})))});
