const C='danyeo-v1';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||!/^https?:/.test(r.url))return;
  const u=new URL(r.url);
  if(u.hostname.endsWith('googleapis.com')&&!u.hostname.startsWith('fonts'))return; // Firestore/Auth API calls: never cache
  if(u.hostname==='identitytoolkit.googleapis.com'||u.hostname==='securetoken.googleapis.com'||u.hostname==='firestore.googleapis.com')return;
  e.respondWith(fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const c=res.clone();caches.open(C).then(ca=>ca.put(r,c)).catch(()=>{});}return res;}).catch(()=>caches.match(r).then(m=>m||(r.mode==='navigate'?caches.match('index.html'):undefined))));
});
