/*
  Contagem anônima de visitas e de cliques nos botões principais. Sem cookie, sem identificar ninguém: o sistema do omvalic só soma
  "quantas vezes, em que página, de onde veio". Quem usa "não rastrear" no navegador não entra na conta.
*/
(function () {
  if (navigator.doNotTrack === '1') return;
  var ENDERECO = 'https://omvalic.omva.com.br/api/m';
  var pagina = location.pathname.replace(/index\.html$/, '') || '/';

  function origem() {
    var q = new URLSearchParams(location.search);
    var u = (q.get('utm_source') || q.get('origem') || '').toLowerCase();
    if (/^[a-z0-9][a-z0-9._-]{0,39}$/.test(u)) return u;
    try {
      var h = new URL(document.referrer).hostname.replace(/^www\./, '');
      if (h && h !== location.hostname) return h.slice(0, 40);
    } catch (e) { /* sem referência: veio direto */ }
    return 'direto';
  }
  var DE_ONDE = origem();

  function enviar(evento) {
    try {
      var corpo = JSON.stringify({ p: pagina, e: evento, o: DE_ONDE });
      if (navigator.sendBeacon) navigator.sendBeacon(ENDERECO, corpo);
      else fetch(ENDERECO, { method: 'POST', body: corpo, keepalive: true, mode: 'no-cors' });
    } catch (e) { /* contar visita nunca pode atrapalhar a página */ }
  }

  enviar('visita');

  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a[href]');
    if (!a) return;
    var h = a.getAttribute('href') || '';
    var evento = null;
    if (/omvalic\.omva\.com\.br\/cadastro/.test(h)) evento = 'cta:cadastro-omvalic';
    else if (/omvazap\.omva\.com\.br\/cadastro/.test(h)) evento = 'cta:cadastro-omvazap';
    else if (/wa\.me\//.test(h)) evento = 'cta:whatsapp';
    else if (/omvalic\.omva\.com\.br\/?$/.test(h)) evento = 'cta:entrar-omvalic';
    else if (/omvazap\.omva\.com\.br\/?$/.test(h)) evento = 'cta:entrar-omvazap';
    if (evento) enviar(evento);
  });
})();
