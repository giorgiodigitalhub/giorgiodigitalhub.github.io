
(function(){
  const root = document.documentElement;
  const KEY = 'site-theme';
  // Initialize theme from localStorage or system
  function applyTheme(theme){
    if(theme === 'light'){
      root.setAttribute('data-theme','light');
      setIcon('light');
    }else if(theme === 'dark'){
      root.setAttribute('data-theme','dark');
      setIcon('dark');
    }else{
      // follow system
      root.removeAttribute('data-theme');
      setIcon(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
  }
  function getSavedTheme(){
    try { return localStorage.getItem(KEY); } catch(e){ return null; }
  }
  function saveTheme(theme){
    try { localStorage.setItem(KEY, theme); } catch(e){}
  }
  function setIcon(mode){
    const btn = document.getElementById('themeToggle');
    if(!btn) return;
    btn.textContent = mode === 'dark' ? '☀️' : '🌙';
    btn.title = mode === 'dark' ? 'Passa al tema chiaro' : 'Passa al tema scuro';
  }
  // Setup initial
  applyTheme(getSavedTheme());
  // Respond to system changes only if user hasn't chosen explicitly
  if(!getSavedTheme() && window.matchMedia){
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      applyTheme(null);
    });
  }
  // Toggle button
  document.addEventListener('click', function(e){
    if(e.target && e.target.id === 'themeToggle'){
      const current = root.getAttribute('data-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      saveTheme(next);
    }
  });
})();
