/* RED Mobiliario Escolar — utilidades de formularios (validación, RUT, número de solicitud). */
window.REDForms = (function () {
  function mark(el, ok, msg) {
    var f = el.closest('.field'); if (!f) return ok;
    f.classList.toggle('err', !ok);
    el.setAttribute('aria-invalid', ok ? 'false' : 'true');
    var m = f.querySelector('.msg'); if (m) m.remove();
    if (!ok && msg) f.insertAdjacentHTML('beforeend', '<span class="msg">' + msg + '</span>');
    return ok;
  }
  // validador acumulativo: marca cada campo y enfoca el primero con error
  function validator(silencioso) {
    var ok = true, first = null;
    return {
      chk: function (el, cond, msg) { var r = mark(el, cond, msg); if (!r && !first) first = el; ok = ok && r; return r; },
      done: function () { if (first && !silencioso) { first.focus(); first.scrollIntoView({ behavior: 'smooth', block: 'center' }); } return ok; }
    };
  }
  // RUT chileno con dígito verificador (módulo 11)
  function rutValido(v) {
    var s = String(v).replace(/[.\s-]/g, '').toUpperCase();
    if (!/^\d{7,8}[\dK]$/.test(s)) return false;
    var cuerpo = s.slice(0, -1), dv = s.slice(-1), suma = 0, m = 2;
    for (var i = cuerpo.length - 1; i >= 0; i--) { suma += +cuerpo[i] * m; m = m === 7 ? 2 : m + 1; }
    var r = 11 - (suma % 11), esperado = r === 11 ? '0' : r === 10 ? 'K' : String(r);
    return dv === esperado;
  }
  function correoValido(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim()); }
  function numero() { var d = new Date(); return 'RED-' + String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0') + '-' + Math.floor(1000 + Math.random() * 9000); }
  return { mark: mark, validator: validator, rutValido: rutValido, correoValido: correoValido, numero: numero };
})();
