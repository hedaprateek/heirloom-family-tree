/* Installable website enhancement. The normal page and file:// copy still work. */
(() => {
  let prompt = null, registration = null, reloadForUpdate = false;
  const installed = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const state = {supported:'serviceWorker' in navigator && window.isSecureContext && location.protocol !== 'file:',
    ready:false, error:false, update:false, installed:installed(), canInstall:false};
  function change(){
    state.installed = installed(); state.canInstall = !!prompt;
    window.dispatchEvent(new CustomEvent('heirloom-offline-change'));
  }
  window.HeirloomOffline = {
    state,
    async install(){
      if(!prompt) return false;
      const current = prompt; prompt = null; change();
      await current.prompt();
      const {outcome} = await current.userChoice;
      change(); return outcome === 'accepted';
    },
    applyUpdate(){
      if(!registration?.waiting) return;
      reloadForUpdate = true;
      registration.waiting.postMessage({type:'ACTIVATE_UPDATE'});
    }
  };
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault(); prompt = event; change();
  });
  window.addEventListener('appinstalled', () => {prompt=null;state.installed=true;change();});
  window.addEventListener('online', change);
  window.addEventListener('offline', change);
  if(!state.supported) return;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if(reloadForUpdate) location.reload();
  });
  // An existing offline worker can be ready even if checking the network for an update fails.
  navigator.serviceWorker.ready.then(() => {state.ready=true;state.error=false;change();});
  navigator.serviceWorker.register('./sw.js', {scope:'./', updateViaCache:'none'}).then(async reg => {
    registration = reg;
    if(reg.waiting){state.update=true;change();}
    reg.addEventListener('updatefound', () => {
      const worker = reg.installing;
      worker?.addEventListener('statechange', () => {
        if(worker.state === 'installed' && navigator.serviceWorker.controller){state.update=true;change();}
      });
    });
  }).catch(async () => {
    registration = await navigator.serviceWorker.getRegistration();
    state.ready = !!registration?.active;
    state.error = !state.ready;
    change();
  });
})();
