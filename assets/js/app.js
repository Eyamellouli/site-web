(function(){
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('nav a[data-page]').forEach(a=>{
    if(a.getAttribute('data-page')===path){a.classList.add('active');}
  });
})();
