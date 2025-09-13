
/* ======================= theme.js (toggle + persistenza) ======================= */
(function(){
  const root = document.documentElement;
  const KEY = 'site-theme';
  const btn = document.getElementById('themeToggle');

  function setIconFor(mode){
    if(!btn) return;
    if(mode === 'dark'){
      btn.textContent = '☀️';     // in dark mostro sole (clic = vai a light)
      btn.title = 'Passa al tema chiaro';
      btn.setAttribute('aria-label','Passa al tema chiaro');
    }else{
      btn.textContent = '🌙';     // in light mostro luna (clic = vai a dark)
      btn.title = 'Passa al tema scuro';
      btn.setAttribute('aria-label','Passa al tema scuro');
    }
  }

  function systemPrefersDark(){
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function apply(theme){ // 'light' | 'dark' | null (segui sistema)
    if(theme === 'light' || theme === 'dark'){
      root.setAttribute('data-theme', theme);
      setIconFor(theme);
    }else{
      root.removeAttribute('data-theme'); // segui sistema
      setIconFor(systemPrefersDark() ? 'dark' : 'light');
    }
  }

  function read(){ try{return localStorage.getItem(KEY);}catch(e){return null;} }
  function write(v){ try{localStorage.setItem(KEY, v);}catch(e){} }

  // Inizializza
  apply(read());

  // Se l'utente non ha scelto, segui i cambi del sistema
  if(!read() && window.matchMedia){
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => apply(null));
  }

  // Toggle diretto sul bottone (robusto)
  if(btn){
    btn.addEventListener('click', function(){
      // stato attuale
      const current = root.getAttribute('data-theme') || (systemPrefersDark() ? 'dark' : 'light');
      const next = current === 'dark' ? 'light' : 'dark';
      apply(next);
      write(next);
    });
  }
})();
