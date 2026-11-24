/* RED Mobiliario Escolar — estructura compartida del sitio:
   header, megamenú, menú móvil, footer, panel «Mi cotización», tarjetas de producto y animaciones. */
(function () {
  'use strict';
  var D = window.RED_DATA;
  var root = document.documentElement;
  root.classList.add('js');
  var page = document.body.getAttribute('data-page') || '';

  /* ---------- utilidades ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function ico(id, extra) { return '<svg class="i"' + (extra ? ' ' + extra : '') + ' aria-hidden="true"><use href="#i-' + id + '"/></svg>'; }
  function prodBy(code) { for (var i = 0; i < D.productos.length; i++) if (D.productos[i].code === code) return D.productos[i]; return null; }
  function catBy(slug) { for (var i = 0; i < D.categorias.length; i++) if (D.categorias[i].slug === slug) return D.categorias[i]; return null; }
  function prodUrl(p) { return 'producto.html#' + p.code.toLowerCase(); }
  function store(k, v) { try { if (v === undefined) return JSON.parse(localStorage.getItem(k)); localStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; } }

  /* ---------- íconos (línea fina) ---------- */
  var SPRITE = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
    '<symbol id="i-arr" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>' +
    '<symbol id="i-chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></symbol>' +
    '<symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>' +
    '<symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></symbol>' +
    '<symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></symbol>' +
    '<symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></symbol>' +
    '<symbol id="i-phone" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z"/></symbol>' +
    '<symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/></symbol>' +
    '<symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0113 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></symbol>' +
    '<symbol id="i-truck" viewBox="0 0 24 24"><path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/></symbol>' +
    '<symbol id="i-bank" viewBox="0 0 24 24"><path d="M3 9.5L12 4l9 5.5M4.5 10v8M9 10v8M15 10v8M19.5 10v8M3 20.5h18"/></symbol>' +
    '<symbol id="i-list" viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12h6M9 16h4"/></symbol>' +
    '<symbol id="i-grid" viewBox="0 0 24 24"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></symbol>' +
    '<symbol id="i-sliders" viewBox="0 0 24 24"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></symbol>' +
    '<symbol id="i-send" viewBox="0 0 24 24"><path d="M20.5 3.5L3.5 10.5l7 2.5 2.5 7z"/><path d="M10.5 13l4-4"/></symbol>' +
    '<symbol id="i-inbox" viewBox="0 0 24 24"><path d="M3.5 13.5l2.5-8h12l2.5 8v5h-17z"/><path d="M3.5 13.5h5l1 2h5l1-2h5"/></symbol>' +
    '<symbol id="i-school" viewBox="0 0 24 24"><path d="M3 9l9-5 9 5-9 5z"/><path d="M7 11.5V16c0 1.5 2.5 3 5 3s5-1.5 5-3v-4.5"/></symbol>' +
    '<symbol id="i-building" viewBox="0 0 24 24"><rect x="5" y="3.5" width="14" height="17" rx="1.5"/><path d="M9 8h1.5M13.5 8H15M9 12h1.5M13.5 12H15M10.5 20.5v-4h3v4"/></symbol>' +
    '<symbol id="i-home" viewBox="0 0 24 24"><path d="M4 10.5L12 4l8 6.5V20H4z"/><path d="M10 20v-5h4v5"/></symbol>' +
    '<symbol id="i-wa" viewBox="0 0 24 24"><path d="M4 20l1.2-3.6A8 8 0 1112 20a8 8 0 01-3.9-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2L9 9.5z"/></symbol>' +
    '<symbol id="i-doc" viewBox="0 0 24 24"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M12.5 10.5v6M10 14l2.5 2.5L15 14"/></symbol>' +
    '<symbol id="i-trash" viewBox="0 0 24 24"><path d="M5 7h14M10 7V4.5h4V7M7 7l1 13h8l1-13M10.5 11v5.5M13.5 11v5.5"/></symbol>' +
    '<symbol id="i-alert" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5.5M12 16.2v.3"/></symbol>' +
    '<symbol id="i-ig" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.8" cy="7.2" r=".6"/></symbol>' +
    '<symbol id="i-fb" viewBox="0 0 24 24"><path d="M14 8.5h2.5V5H14a3.5 3.5 0 00-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V9a.5.5 0 01.5-.5z"/></symbol>' +
    '<symbol id="i-tt" viewBox="0 0 24 24"><path d="M14 4v10.5a3.5 3.5 0 11-3.5-3.5"/><path d="M14 4c.5 2.5 2.3 4 5 4.2"/></symbol>' +
    /* íconos isométricos 2:1 de la marca (generados) */
    '<symbol id="iso-colegio" viewBox="-43.0 -40.5 101.0 83.5"><polygon points="0.00,-7.50 55.00,20.00 15.00,40.00 -40.00,12.50" fill="none" stroke="#83A08C" stroke-width="1.6" stroke-dasharray="3 3"/><polygon points="-5.00,2.50 0.00,5.00 0.00,-25.00 -5.00,-27.50" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="5.00,2.50 0.00,5.00 0.00,-25.00 5.00,-27.50" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="0.00,-30.00 5.00,-27.50 0.00,-25.00 -5.00,-27.50" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="30.00,20.00 35.00,22.50 35.00,-7.50 30.00,-10.00" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="40.00,20.00 35.00,22.50 35.00,-7.50 40.00,-10.00" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="35.00,-12.50 40.00,-10.00 35.00,-7.50 30.00,-10.00" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-25.00,12.50 -20.00,15.00 -20.00,-15.00 -25.00,-17.50" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-15.00,12.50 -20.00,15.00 -20.00,-15.00 -15.00,-17.50" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-20.00,-20.00 -15.00,-17.50 -20.00,-15.00 -25.00,-17.50" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="10.00,30.00 15.00,32.50 15.00,2.50 10.00,0.00" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="20.00,30.00 15.00,32.50 15.00,2.50 20.00,0.00" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="15.00,-2.50 20.00,0.00 15.00,2.50 10.00,0.00" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-29.00,-17.50 15.00,4.50 15.00,-1.00 -29.00,-23.00" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="44.00,-10.00 15.00,4.50 15.00,-1.00 44.00,-15.50" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="0.00,-37.50 44.00,-15.50 15.00,-1.00 -29.00,-23.00" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="1.50,-29.25 27.50,-16.25 13.50,-9.25 -12.50,-22.25" fill="#E8A34A" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/></symbol><symbol id="iso-empresa" viewBox="-40.0 -55.5 95.0 97.0"><polygon points="0.00,-6.00 52.00,20.00 15.00,38.50 -37.00,12.50" fill="none" stroke="#83A08C" stroke-width="1.6" stroke-dasharray="3 3"/><polygon points="-25.00,12.50 0.00,25.00 0.00,-27.50 -25.00,-40.00" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="25.00,12.50 0.00,25.00 0.00,-27.50 25.00,-40.00" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="0.00,-52.50 25.00,-40.00 0.00,-27.50 -25.00,-40.00" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="21.00,-0.50 14.50,2.75 14.50,-3.25 21.00,-6.50" fill="#E8A34A" stroke="none"/><polygon points="10.50,4.75 4.00,8.00 4.00,2.00 10.50,-1.25" fill="#E8A34A" stroke="none"/><polygon points="21.00,-12.50 14.50,-9.25 14.50,-15.25 21.00,-18.50" fill="#E8A34A" stroke="none"/><polygon points="10.50,-7.25 4.00,-4.00 4.00,-10.00 10.50,-13.25" fill="#E8A34A" stroke="none"/><polygon points="21.00,-24.50 14.50,-21.25 14.50,-27.25 21.00,-30.50" fill="#E8A34A" stroke="none"/><polygon points="10.50,-19.25 4.00,-16.00 4.00,-22.00 10.50,-25.25" fill="#E8A34A" stroke="none"/><polygon points="0.00,25.00 17.00,33.50 17.00,13.50 0.00,5.00" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="39.00,22.50 17.00,33.50 17.00,13.50 39.00,2.50" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="22.00,-6.00 39.00,2.50 17.00,13.50 0.00,5.00" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="22.00,-2.00 31.00,2.50 17.00,9.50 8.00,5.00" fill="#E8A34A" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/></symbol><symbol id="iso-publico" viewBox="-45.0 -40.5 110.0 89.5"><polygon points="0.00,-6.00 62.00,25.00 20.00,46.00 -42.00,15.00" fill="none" stroke="#83A08C" stroke-width="1.6" stroke-dasharray="3 3"/><polygon points="-30.00,15.00 20.00,40.00 20.00,35.00 -30.00,10.00" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="50.00,25.00 20.00,40.00 20.00,35.00 50.00,20.00" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="0.00,-5.00 50.00,20.00 20.00,35.00 -30.00,10.00" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-17.00,6.50 27.00,28.50 27.00,3.50 -17.00,-18.50" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="44.00,20.00 27.00,28.50 27.00,3.50 44.00,-5.00" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="0.00,-27.00 44.00,-5.00 27.00,3.50 -17.00,-18.50" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-22.00,10.00 -17.50,12.25 -17.50,-12.75 -22.00,-15.00" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-13.00,10.00 -17.50,12.25 -17.50,-12.75 -13.00,-15.00" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-17.50,-17.25 -13.00,-15.00 -17.50,-12.75 -22.00,-15.00" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-9.50,16.25 -5.00,18.50 -5.00,-6.50 -9.50,-8.75" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-0.50,16.25 -5.00,18.50 -5.00,-6.50 -0.50,-8.75" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-5.00,-11.00 -0.50,-8.75 -5.00,-6.50 -9.50,-8.75" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="3.00,22.50 7.50,24.75 7.50,-0.25 3.00,-2.50" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="12.00,22.50 7.50,24.75 7.50,-0.25 12.00,-2.50" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="7.50,-4.75 12.00,-2.50 7.50,-0.25 3.00,-2.50" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="15.50,28.75 20.00,31.00 20.00,6.00 15.50,3.75" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="24.50,28.75 20.00,31.00 20.00,6.00 24.50,3.75" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="20.00,1.50 24.50,3.75 20.00,6.00 15.50,3.75" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-33.00,-15.00 20.00,11.50 20.00,5.50 -33.00,-21.00" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="53.00,-5.00 20.00,11.50 20.00,5.50 53.00,-11.00" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="0.00,-37.50 53.00,-11.00 20.00,5.50 -33.00,-21.00" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="0.00,-30.00 38.00,-11.00 20.00,-2.00 -18.00,-21.00" fill="#E8A34A" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/></symbol><symbol id="iso-particular" viewBox="-37.0 -47.0 74.0 78.0"><polygon points="0.00,-6.00 34.00,11.00 0.00,28.00 -34.00,11.00" fill="none" stroke="#83A08C" stroke-width="1.6" stroke-dasharray="3 3"/><polygon points="-3.00,1.50 0.00,3.00 0.00,-17.00 -3.00,-18.50" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="3.00,1.50 0.00,3.00 0.00,-17.00 3.00,-18.50" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="0.00,-20.00 3.00,-18.50 0.00,-17.00 -3.00,-18.50" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="16.00,11.00 19.00,12.50 19.00,-7.50 16.00,-9.00" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="22.00,11.00 19.00,12.50 19.00,-7.50 22.00,-9.00" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="19.00,-10.50 22.00,-9.00 19.00,-7.50 16.00,-9.00" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-22.00,11.00 -19.00,12.50 -19.00,-7.50 -22.00,-9.00" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-16.00,11.00 -19.00,12.50 -19.00,-7.50 -16.00,-9.00" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-19.00,-10.50 -16.00,-9.00 -19.00,-7.50 -22.00,-9.00" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-22.00,-12.00 -18.50,-10.25 -18.50,-31.25 -22.00,-33.00" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="3.50,-21.25 -18.50,-10.25 -18.50,-31.25 3.50,-42.25" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="0.00,-44.00 3.50,-42.25 -18.50,-31.25 -22.00,-33.00" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-3.00,20.50 0.00,22.00 0.00,2.00 -3.00,0.50" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="3.00,20.50 0.00,22.00 0.00,2.00 3.00,0.50" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="0.00,-1.00 3.00,0.50 0.00,2.00 -3.00,0.50" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-22.00,-9.00 0.00,2.00 0.00,-1.00 -22.00,-12.00" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="22.00,-9.00 0.00,2.00 0.00,-1.00 22.00,-12.00" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="0.00,-23.00 22.00,-12.00 0.00,-1.00 -22.00,-12.00" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="1.50,-18.25 14.50,-11.75 0.50,-4.75 -12.50,-11.25" fill="#E8A34A" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/></symbol><symbol id="iso-estado" viewBox="-43.0 -21.8 100.0 64.3"><polygon points="1.00,-7.50 54.00,19.00 13.00,39.50 -40.00,13.00" fill="none" stroke="#83A08C" stroke-width="1.6" stroke-dasharray="3 3"/><polygon points="-27.00,13.50 11.00,32.50 11.00,28.50 -27.00,9.50" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="38.00,19.00 11.00,32.50 11.00,28.50 38.00,15.00" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="0.00,-4.00 38.00,15.00 11.00,28.50 -27.00,9.50" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-22.50,9.75 15.50,28.75 15.50,24.75 -22.50,5.75" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="42.50,15.25 15.50,28.75 15.50,24.75 42.50,11.25" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="4.50,-7.75 42.50,11.25 15.50,24.75 -22.50,5.75" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-18.00,6.00 20.00,25.00 20.00,21.00 -18.00,2.00" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="47.00,11.50 20.00,25.00 20.00,21.00 47.00,7.50" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="9.00,-11.50 47.00,7.50 20.00,21.00 -18.00,2.00" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="6.00,-6.00 24.00,3.00 7.00,11.50 -11.00,2.50" fill="#E8A34A" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="25.00,7.50 34.00,12.00 34.00,6.50 25.00,2.00" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="43.00,7.50 34.00,12.00 34.00,6.50 43.00,2.00" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="34.00,-2.50 43.00,2.00 34.00,6.50 25.00,2.00" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="29.50,2.00 34.00,4.25 34.00,-8.75 29.50,-11.00" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="38.50,2.00 34.00,4.25 34.00,-8.75 38.50,-11.00" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="34.00,-13.25 38.50,-11.00 34.00,-8.75 29.50,-11.00" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="26.50,-11.00 34.00,-7.25 34.00,-11.25 26.50,-15.00" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="41.50,-11.00 34.00,-7.25 34.00,-11.25 41.50,-15.00" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="34.00,-18.75 41.50,-15.00 34.00,-11.25 26.50,-15.00" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/></symbol><symbol id="iso-despacho" viewBox="-36.0 -33.5 106.0 80.5"><polygon points="0.00,-6.00 67.00,27.50 34.00,44.00 -33.00,10.50" fill="none" stroke="#83A08C" stroke-width="1.6" stroke-dasharray="3 3"/><polygon points="-21.00,5.00 17.00,24.00 17.00,-1.00 -21.00,-20.00" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="38.00,13.50 17.00,24.00 17.00,-1.00 38.00,-11.50" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="0.00,-30.50 38.00,-11.50 17.00,-1.00 -21.00,-20.00" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-17.00,-0.50 13.00,14.50 13.00,9.00 -17.00,-6.00" fill="#E8A34A" stroke="none"/><polygon points="17.00,24.00 33.00,32.00 33.00,15.00 17.00,7.00" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="52.00,22.50 33.00,32.00 33.00,15.00 52.00,5.50" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="36.00,-2.50 52.00,5.50 33.00,15.00 17.00,7.00" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-4.25,13.38 -4.69,10.96 -5.93,8.47 -7.80,6.29 -10.00,4.75 -12.20,4.09 -14.07,4.40 -15.31,5.64 -15.75,7.62 -15.31,10.04 -14.07,12.53 -12.20,14.71 -10.00,16.25 -7.80,16.91 -5.93,16.60 -4.69,15.36" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-7.75,11.63 -8.05,10.35 -8.88,9.11 -10.00,8.25 -11.12,7.99 -11.95,8.40 -12.25,9.38 -11.95,10.65 -11.13,11.89 -10.00,12.75 -8.88,13.01 -8.05,12.60" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="29.25,30.13 28.81,27.71 27.57,25.22 25.70,23.04 23.50,21.50 21.30,20.84 19.43,21.15 18.19,22.39 17.75,24.38 18.19,26.79 19.43,29.28 21.30,31.46 23.50,33.00 25.70,33.66 27.57,33.35 28.81,32.11" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="25.75,28.38 25.45,27.10 24.63,25.86 23.50,25.00 22.38,24.74 21.55,25.15 21.25,26.13 21.55,27.40 22.38,28.64 23.50,29.50 24.63,29.76 25.45,29.35" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/></symbol>' +
    '<symbol id="iso-compra" viewBox="-44.0 -31.5 125.0 84.5"><polygon points="5.00,-9.50 78.00,27.00 32.00,50.00 -41.00,13.50" fill="none" stroke="#83A08C" stroke-width="1.6" stroke-dasharray="3 3"/><polygon points="-25.00,12.50 10.00,30.00 10.00,26.00 -25.00,8.50" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="35.00,17.50 10.00,30.00 10.00,26.00 35.00,13.50" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="0.00,-4.00 35.00,13.50 10.00,26.00 -25.00,8.50" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-19.50,8.75 -15.00,11.00 -15.00,-7.00 -19.50,-9.25" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-10.50,8.75 -15.00,11.00 -15.00,-7.00 -10.50,-9.25" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-15.00,-11.50 -10.50,-9.25 -15.00,-7.00 -19.50,-9.25" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-7.25,14.88 -2.75,17.13 -2.75,-0.88 -7.25,-3.13" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="1.75,14.88 -2.75,17.13 -2.75,-0.88 1.75,-3.13" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-2.75,-5.38 1.75,-3.13 -2.75,-0.88 -7.25,-3.13" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="5.00,21.00 9.50,23.25 9.50,5.25 5.00,3.00" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="14.00,21.00 9.50,23.25 9.50,5.25 14.00,3.00" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="9.50,0.75 14.00,3.00 9.50,5.25 5.00,3.00" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-15.50,5.75 15.50,21.25 15.50,3.25 -15.50,-12.25" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="31.00,13.50 15.50,21.25 15.50,3.25 31.00,-4.50" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="0.00,-20.00 31.00,-4.50 15.50,3.25 -15.50,-12.25" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="-28.00,-9.50 10.00,9.50 10.00,4.50 -28.00,-14.50" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="38.00,-4.50 10.00,9.50 10.00,4.50 38.00,-9.50" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="0.00,-28.50 38.00,-9.50 10.00,4.50 -28.00,-14.50" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="0.00,-22.50 26.00,-9.50 10.00,-1.50 -16.00,-14.50" fill="#E8A34A" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="30.00,37.00 32.50,38.25 32.50,-0.75 30.00,-2.00" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="60.50,24.25 32.50,38.25 32.50,-0.75 60.50,-14.75" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="58.00,-16.00 60.50,-14.75 32.50,-0.75 30.00,-2.00" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="38.50,-5.25 42.00,-3.50 42.00,-7.50 38.50,-9.25" fill="#E2E0D9" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="52.00,-8.50 42.00,-3.50 42.00,-7.50 52.00,-12.50" fill="#F4F3EF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="48.50,-14.25 52.00,-12.50 42.00,-7.50 38.50,-9.25" fill="#E8A34A" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="40.00,5.50 35.25,7.88 35.25,3.13 40.00,0.75" fill="#E8A34A" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polyline points="39.00,3.50 37.75,5.63 35.25,3.13" fill="none" stroke="#1B4E2F" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><polygon points="57.00,-4.50 42.50,2.75 42.50,0.85 57.00,-6.40" fill="#83A08C" stroke="none"/><polygon points="40.00,14.00 35.25,16.38 35.25,11.63 40.00,9.25" fill="#E8A34A" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polyline points="39.00,12.00 37.75,14.13 35.25,11.63" fill="none" stroke="#1B4E2F" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><polygon points="57.00,4.00 42.50,11.25 42.50,9.35 57.00,2.10" fill="#83A08C" stroke="none"/><polygon points="40.00,22.50 35.25,24.88 35.25,20.13 40.00,17.75" fill="#FFFFFF" stroke="#1B4E2F" stroke-width="1.6" stroke-linejoin="round"/><polygon points="57.00,12.50 42.50,19.75 42.50,17.85 57.00,10.60" fill="#83A08C" stroke="none"/></symbol>' +
    '</defs></svg>';

  /* ---------- header ---------- */
  function header() {
    var c = D.contacto;
    var cats = D.categorias.map(function (k) {
      return '<a href="catalogo.html#' + k.slug + '"' + (page === 'catalogo' && location.hash.slice(1) === k.slug ? ' aria-current="page"' : '') + '>' + esc(k.corto) + '</a>';
    }).join('');
    return '' +
      '<header class="hdr" id="top">' +
      '<div class="hdr-top"><div class="wrap"><span>' + ico('truck') + 'Despachos a todo Chile</span><span>' + ico('bank') + 'Proveedor habilitado en Mercado Público</span><span class="sp"></span>' +
      '<a href="contacto.html">' + ico('phone') + esc(c.telefono.replace(' · por confirmar', '')) + '</a><a href="contacto.html">' + ico('wa') + esc(c.whatsapp.replace(' · por confirmar', '')) + '</a><a href="contacto.html">' + ico('mail') + esc(c.correo.replace(' · por confirmar', '')) + '</a></div></div>' +
      '<div class="hdr-r1"><div class="wrap">' +
      '<a class="logo" href="index.html" aria-label="RED Mobiliario Escolar, inicio"><img class="lh" src="assets/logo/red-h-positivo.svg" alt="RED Mobiliario Escolar" width="103" height="51"><img class="ls" src="assets/logo/red-s-positivo.svg" alt="RED" width="46" height="46"></a>' +
      '<form class="search" role="search" data-search><label class="sr" for="q-top">Buscar en el catálogo</label>' + ico('search') + '<input id="q-top" name="q" type="search" placeholder="Busca sillas, mesas, lockers o un código" autocomplete="off"><button class="go" type="submit">BUSCAR</button></form>' +
      '<nav class="links" aria-label="Sitio"><a href="empresa.html"' + (page === 'empresa' ? ' aria-current="page"' : '') + '>Empresa</a><a href="como-cotizar.html"' + (page === 'como-cotizar' ? ' aria-current="page"' : '') + '>Cómo cotizar y despachos</a><a href="contacto.html"' + (page === 'contacto' ? ' aria-current="page"' : '') + '>Contacto</a></nav>' +
      '<div style="display:flex;gap:8px;align-items:center;justify-self:end"><button class="qbtn" type="button" data-open-q aria-label="Abrir Mi cotización"><span class="t">MI COTIZACIÓN</span><span class="cnt" data-count>0</span></button>' +
      '<button class="burger" type="button" aria-label="Abrir menú" aria-expanded="false"><span></span><span></span></button></div>' +
      '</div></div>' +
      // «Todo el catálogo» lleva a la portada del catálogo (6 categorías con sus subcategorías); no abre menú
      '<div class="hdr-r2"><nav class="wrap" aria-label="Categorías"><a class="megabtn" href="catalogo.html"' + (page === 'catalogo' && !location.hash.slice(1) ? ' aria-current="page"' : '') + '>Todo el catálogo</a>' + cats +
      '<span class="sp"></span><a class="pub" href="instituciones.html"' + (page === 'instituciones' ? ' aria-current="page"' : '') + '>' + ico('bank', 'style="width:16px;height:16px"') + 'Instituciones públicas</a></nav></div>' +
      '</header>' +
      '<div class="mmenu" aria-label="Menú"><form data-search role="search">' + ico('search') + '<label class="sr" for="q-m">Buscar</label><input id="q-m" name="q" type="search" placeholder="Busca un modelo o código"></form>' +
      '<a href="catalogo.html" style="transition-delay:.04s">Todo el catálogo</a>' +
      D.categorias.map(function (k, i) { return '<a href="catalogo.html#' + k.slug + '" style="transition-delay:' + (0.08 + i * 0.04).toFixed(2) + 's">' + esc(k.corto) + '</a>'; }).join('') +
      '<a href="instituciones.html" style="transition-delay:.36s;color:var(--naranja)">Instituciones públicas</a>' +
      '<div class="mc"><span>' + esc(c.telefono) + '</span><span>' + esc(c.whatsapp) + '</span><span>' + esc(c.correo) + '</span></div></div>';
  }

  /* ---------- footer, panel, toast ---------- */
  function footer() {
    var c = D.contacto;
    return '<footer class="site" id="contacto"><div class="wrap"><div class="fg">' +
      '<div><img src="assets/logo/red-h-negativo.svg" alt="RED Mobiliario Escolar" width="154" height="76"><p style="margin-top:20px;max-width:34ch">Mobiliario escolar e institucional para todo Chile. Proveedor habilitado en Mercado Público.</p>' +
      '<div class="soc"><a href="#contacto" aria-label="Instagram">' + ico('ig') + '</a><a href="#contacto" aria-label="Facebook">' + ico('fb') + '</a><a href="#contacto" aria-label="TikTok">' + ico('tt') + '</a></div></div>' +
      '<div><h4>Catálogo</h4><ul>' + D.categorias.map(function (k) { return '<li><a href="catalogo.html#' + k.slug + '">' + esc(k.nombre) + '</a></li>'; }).join('') + '</ul></div>' +
      '<div><h4>Sitio</h4><ul><li><a href="cotizacion.html">Mi cotización</a></li><li><a href="como-cotizar.html">Cómo cotizar y despachos</a></li><li><a href="instituciones.html">Cotizaciones para instituciones públicas</a></li><li><a href="empresa.html">Empresa</a></li><li><a href="contacto.html">Contacto</a></li></ul></div>' +
      '<div><h4>Contacto</h4><ul><li class="ph">' + esc(c.direccion) + '</li><li class="ph">' + esc(c.telefono) + '</li><li class="ph">' + esc(c.whatsapp) + '</li><li class="ph">' + esc(c.correo) + '</li></ul></div>' +
      '</div><div class="fb"><span>© 2026 RED Mobiliario Escolar · Todos los derechos reservados · Desarrollado por Delta Digital</span><span>Imágenes de ambiente referenciales</span></div></div></footer>' +
      '<div class="wa"><a href="#contacto" aria-label="WhatsApp ' + esc(c.whatsapp) + '">' + ico('wa') + '</a></div>' +
      '<div class="ov" data-close-q></div>' +
      '<aside class="drawer" id="drawer" aria-label="Mi cotización" aria-hidden="true" inert><div class="dcore">' +
      '<div class="dh"><div class="dh-top"><h2 class="d">Mi<br>cotización</h2><button class="xbtn" type="button" data-close-q aria-label="Cerrar">' + ico('x') + '</button></div><div class="sub"><span><b>Paso 1 de 3</b> · Tu lista</span><span>Datos → Enviar</span></div></div>' +
      '<div class="dl" id="dl"></div>' +
      '<div class="empty"><h3 class="d">Lista vacía</h3><p>Agrega modelos desde el catálogo eligiendo talla, color y cantidad.</p><a class="pill g sm" href="catalogo.html">Ver catálogo<span class="ic">' + ico('arr') + '</span></a></div>' +
      '<div class="df"><div class="tot"><div><b data-lines>0</b>Líneas</div><div><b data-units>0</b>Unidades</div></div>' +
      '<a class="pill o full" href="cotizacion.html">Continuar con mis datos<span class="ic">' + ico('arr') + '</span></a>' +
      '<small>Sin precios en el sitio: la cotización llega a tu correo con plazo y costo de despacho a tu comuna.</small></div>' +
      '</div></aside>' +
      '<div class="toast" id="toast" role="status" aria-live="polite"><div><span id="toast-t">Agregado</span><button type="button" data-open-q>VER LISTA</button></div></div>';
  }

  /* ---------- tarjeta de producto ---------- */
  function card(p) {
    var cat = catBy(p.cat);
    var ph = p.img
      ? '<span class="ph"><span class="bg" style="background-image:url(' + p.img + ')"></span><span class="tagc">' + esc(cat.corto) + '</span></span>'
      : '<span class="ph pend"><span class="tagc">' + esc(cat.corto) + '</span><span class="pend-l">Foto de producto pendiente</span></span>';
    var sw = '<span class="sw" aria-label="' + p.colores.length + ' colores">' + p.colores.map(function (c) { return '<i style="background:' + D.colores[c].hex + '" title="' + esc(D.colores[c].nombre) + '"></i>'; }).join('') + '</span>';
    return '<div class="shell lift"><a class="core prod" href="' + prodUrl(p) + '">' + ph +
      '<span class="bd"><span class="code">CÓDIGO ' + p.code + '</span><h3 class="d">' + esc(p.nombre) + '</h3>' +
      '<span class="meta">' + p.chips.map(function (c) { return '<span class="chip">' + esc(c) + '</span>'; }).join('') + sw + '</span>' +
      '<span class="act"><span>Ver ficha y cotizar' + ico('arr') + '</span></span></span></a></div>';
  }

  /* ---------- carrito / cotización ---------- */
  var KEY = 'red-cotizacion-v1';
  var lines = store(KEY) || [];
  var listeners = [];
  function save() { store(KEY, lines); if (page === 'cotizacion' || !root.classList.contains('q-open')) renderDrawer(-1); listeners.forEach(function (fn) { fn(lines); }); }
  function units() { return lines.reduce(function (a, l) { return a + l.q; }, 0); }
  /* cada línea guarda sus opciones como atributos [{l: etiqueta, v: valor, hex?}] (talla, colores, medidas…) */
  function attrsOf(l) {
    if (l.attrs) return l.attrs;
    var c = D.colores[l.color];  // líneas guardadas con el formato anterior (opt + color)
    return [{ l: 'Opción', v: l.opt }, { l: 'Color', v: c ? c.nombre : l.color, hex: c ? c.hex : '' }];
  }
  function attrsText(l) { return attrsOf(l).map(function (a) { return a.v; }).join(' · '); }
  function defaultAttrs(p) {
    return p.campos.map(function (f) {
      if (f.col) { var c = D.colores[f.col[0]]; return { l: f.l, v: c.nombre, hex: c.hex }; }
      return { l: f.l, v: f.v[0] + (f.sub && !f.tallas ? ' ' + f.sub : '') };
    });
  }
  lines = lines.map(function (l) { return l.attrs ? l : { code: l.code, attrs: attrsOf(l), q: l.q }; });
  function lineKey(l) { return l.code + '|' + attrsOf(l).map(function (a) { return a.l + ':' + a.v; }).join('|'); }
  function addLines(items) {
    var firstNew = -1;
    items.forEach(function (it) {
      var k = lineKey(it), found = -1;
      for (var i = 0; i < lines.length; i++) if (lineKey(lines[i]) === k) found = i;
      if (found > -1) lines[found].q += it.q;
      else { lines.unshift({ code: it.code, attrs: attrsOf(it), q: it.q }); firstNew = 0; }
    });
    save(); renderDrawer(firstNew); bump();
  }
  function lineHTML(l, i, cls) {
    var p = prodBy(l.code); if (!p) return '';
    return '<div class="line' + (cls || '') + '" data-i="' + i + '"><span class="th' + (p.img ? '' : ' pend') + '"' + (p.img ? ' style="background-image:url(' + p.img + ')"' : '') + '></span>' +
      '<div><b>' + esc(p.nombre) + '</b><div class="v">' + p.code + ' · ' + esc(attrsText(l)) + '</div><button class="rm" type="button">Quitar</button></div>' +
      '<div class="stp"><button type="button" data-d="-1" aria-label="Restar una unidad">−</button><output>' + l.q + '</output><button type="button" data-d="1" aria-label="Sumar una unidad">+</button></div></div>';
  }
  var drawer, dl;
  function totals() {
    document.querySelectorAll('[data-lines]').forEach(function (e) { e.textContent = lines.length; });
    document.querySelectorAll('[data-units]').forEach(function (e) { e.textContent = units(); });
    document.querySelectorAll('[data-count]').forEach(function (e) { e.textContent = lines.length; });
    if (drawer) drawer.classList.toggle('is-empty', !lines.length);
  }
  function renderDrawer(n) {
    if (!dl) return;
    dl.innerHTML = lines.map(function (l, i) { return lineHTML(l, i, i === n ? ' in' : ''); }).join('');
    totals();
  }
  function bump() { document.querySelectorAll('[data-count]').forEach(function (c) { c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); }); }
  function stepperClick(e, container, rerender) {
    var b = e.target.closest('button'); if (!b) return;
    var el = b.closest('[data-i]'); if (!el) return; var i = +el.getAttribute('data-i');
    if (b.hasAttribute('data-d')) { lines[i].q = Math.max(1, lines[i].q + (+b.getAttribute('data-d'))); el.querySelector('output').textContent = lines[i].q; save(); totals(); }
    else if (b.classList.contains('rm')) { el.classList.add('out'); setTimeout(function () { lines.splice(i, 1); save(); rerender(); bump(); }, 380); }
  }
  function openQ() { root.classList.add('q-open'); drawer.setAttribute('aria-hidden', 'false'); drawer.inert = false; root.classList.remove('menu-open'); hideT(); }
  function closeQ() { root.classList.remove('q-open'); drawer.setAttribute('aria-hidden', 'true'); drawer.inert = true; }

  /* ---------- toast ---------- */
  var toast, tt;
  function showT(t) { document.getElementById('toast-t').textContent = t; toast.classList.add('on'); clearTimeout(tt); tt = setTimeout(hideT, 3400); }
  function hideT() { if (toast) toast.classList.remove('on'); }

  /* ---------- reveal ---------- */
  function reveal(scope) {
    var els = [].slice.call((scope || document).querySelectorAll('.rv:not(.seen)'));
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var t = e.target, sib = [].slice.call(t.parentNode.children).filter(function (c) { return c.classList.contains('rv'); });
        t.style.transitionDelay = (Math.max(0, sib.indexOf(t)) % 4) * 90 + 'ms';
        t.classList.remove('pre'); io.unobserve(t);
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { el.classList.add('seen'); if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add('pre'); io.observe(el); } });
  }

  /* ---------- montaje ---------- */
  document.body.insertAdjacentHTML('afterbegin', SPRITE + header());
  document.body.insertAdjacentHTML('beforeend', footer());
  drawer = document.getElementById('drawer'); dl = document.getElementById('dl'); toast = document.getElementById('toast');
  renderDrawer(-1);
  dl.addEventListener('click', function (e) { stepperClick(e, dl, function () { renderDrawer(-1); }); });
  // enlaces a una subcategoría (portada del catálogo): se recuerda cuál abrir
  document.addEventListener('click', function (e) { var a = e.target.closest('a[data-sub]'); if (a) try { sessionStorage.setItem('red-sub', a.getAttribute('data-sub')); } catch (x) {} }, true);

  var burger = document.querySelector('.burger');
  burger.addEventListener('click', function () { var o = root.classList.toggle('menu-open'); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Cerrar menú' : 'Abrir menú'); });
  document.querySelectorAll('.mmenu a').forEach(function (a) { a.addEventListener('click', function () { root.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); }); });

  document.querySelectorAll('[data-search]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = f.querySelector('input').value.trim();
      try { sessionStorage.setItem('red-q', q); } catch (x) {}
      if (page === 'catalogo' && window.RED_onSearch) { window.RED_onSearch(q); root.classList.remove('menu-open'); }
      else location.href = 'catalogo.html#buscar';
    });
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-open-q]')) { e.preventDefault(); openQ(); return; }
    if (e.target.closest('[data-close-q]')) closeQ();
    var a = e.target.closest('[data-add]');
    if (a) {
      var p = prodBy(a.getAttribute('data-add'));
      if (p) { addLines([{ code: p.code, attrs: defaultAttrs(p), q: 1 }]); showT('Agregado: ' + p.nombre); }
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeQ(); root.classList.remove('menu-open');
  });

  // header: la franja de contacto se oculta al bajar
  var hdr = document.querySelector('.hdr');
  var sent = document.createElement('div'); sent.style.cssText = 'position:absolute;top:0;left:0;height:40px;width:1px;pointer-events:none';
  document.body.prepend(sent);
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { hdr.classList.toggle('scrolled', !es[0].isIntersecting); }).observe(sent);

  // parallax de los fondos a ancho completo: rAF solo mientras el banner está en pantalla (sin listener de scroll)
  (function parallax() {
    if (!('IntersectionObserver' in window) || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    var items = [].slice.call(document.querySelectorAll('.banner')).map(function (b) { return { el: b, bg: b.querySelector('.bg'), on: false }; }).filter(function (i) { return i.bg; });
    if (!items.length) return;
    var running = false, AMP = 0.12;
    function frame() {
      var vh = window.innerHeight, any = false;
      items.forEach(function (i) {
        if (!i.on) return; any = true;
        var r = i.el.getBoundingClientRect();
        var p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1 (arriba) .. 1 (abajo)
        p = Math.max(-1, Math.min(1, p));
        i.bg.style.setProperty('--py', (-p * r.height * AMP).toFixed(1) + 'px');
      });
      if (any) requestAnimationFrame(frame); else running = false;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { items.forEach(function (i) { if (i.el === e.target) i.on = e.isIntersecting; }); });
      if (!running && items.some(function (i) { return i.on; })) { running = true; requestAnimationFrame(frame); }
    });
    items.forEach(function (i) { io.observe(i.el); });
  })();

  // sincroniza la cotización entre pestañas
  window.addEventListener('storage', function (e) { if (e.key === KEY) { lines = (store(KEY) || []).map(function (l) { return l.attrs ? l : { code: l.code, attrs: attrsOf(l), q: l.q }; }); renderDrawer(-1); listeners.forEach(function (fn) { fn(lines); }); } });

  /* ---------- API para las páginas ---------- */
  window.RED = {
    data: D, esc: esc, ico: ico, prodBy: prodBy, catBy: catBy, prodUrl: prodUrl, card: card,
    lines: function () { return lines; }, addLines: addLines, save: save, units: units, lineHTML: lineHTML,
    stepperClick: stepperClick, onChange: function (fn) { listeners.push(fn); }, clear: function () { lines = []; save(); renderDrawer(-1); },
    openQ: openQ, showT: showT, reveal: reveal, totals: totals, rerenderDrawer: function () { renderDrawer(-1); },
    attrsOf: attrsOf, attrsText: attrsText, defaultAttrs: defaultAttrs
  };
  document.dispatchEvent(new Event('red:ready'));
  requestAnimationFrame(function () { reveal(); });
})();
