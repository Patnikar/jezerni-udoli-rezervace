self.addEventListener('install',e=>e.waitUntil(self.skipWaiting()));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{let body='Změna rezervace';try{let d=e.data.json();if(['Nová rezervace','Změna rezervace','Smazaná rezervace'].includes(d.body))body=d.body;}catch(_){}e.waitUntil(self.registration.showNotification('Jezerní údolí',{body}));});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil((async()=>{let url=self.registration.scope;let clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});for(let c of clients){if(c.url.startsWith(url)){await c.focus();return;}}await self.clients.openWindow(url);})());});
