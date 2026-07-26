document.addEventListener('DOMContentLoaded', function(){
  // Facade de vídeo: só carrega o iframe do YouTube quando o usuário clica
  function ativarVideo(el){
    var id = el.getAttribute('data-yt');
    if (!id || el.classList.contains('tocando')) return;
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&playsinline=1';
    iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('title', 'Vídeo Vigor Naturale');
    el.appendChild(iframe);
    el.classList.add('tocando');
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event:'video_play', video_id:id});
  }
  document.querySelectorAll('.video-facade, .depo-video').forEach(function(el){
    el.addEventListener('click', function(){ ativarVideo(el); });
    el.addEventListener('keypress', function(e){ if(e.key === 'Enter') ativarVideo(el); });
  });

  document.querySelectorAll('[data-evento]').forEach(function(el){
    el.addEventListener('click', function(){
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'select_item',
        item_click_id: el.getAttribute('data-evento'),
        page_location: window.location.href
      });
      if (typeof fbq === 'function'){ fbq('track', 'InitiateCheckout'); }
    });
  });
  var whats = document.getElementById('whats-flutuante');
  if (whats){
    whats.addEventListener('click', function(){
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({event:'contato_whatsapp'});
    });
  }
});
