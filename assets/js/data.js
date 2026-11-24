/* RED Mobiliario Escolar — catálogo de demostración.
   Códigos, modelos y medidas son de ejemplo: reemplazar con los datos reales de RED.
   Los valores entre corchetes [ ] están por confirmar. */
window.RED_DATA = {
  contacto: {
    telefono: '[Teléfono · por confirmar]',
    whatsapp: '[WhatsApp · por confirmar]',
    correo: '[Correo · por confirmar]',
    direccion: '[Dirección · por confirmar]',
    horario: '[Horario · por confirmar]'
  },

  categorias: [
    { slug: 'escolar', n: '01', nombre: 'Mobiliario escolar', corto: 'Escolar', img: 'assets/img/cat-escolar.jpg', banner: 'assets/img/banner-escolar-home.jpg', bpos: 'right 0 bottom 0', foto: 'assets/img/cat-escolar-home.jpg',
      subs: ['Sillas escolares', 'Pupitres escolares', 'Sillas universitarias', 'Sillas de profesor', 'Mesas de profesor', 'Pizarras', 'Mesas escolares grupales', 'Otros productos escolares'] },
    { slug: 'casino', n: '02', nombre: 'Mobiliario de casino y comedores', corto: 'Casino y comedores', img: 'assets/img/cat-casino.jpg', foto: 'assets/img/cat-casino-naranja.jpg',
      subs: ['Mesas de casino y comedor', 'Sillas de casino y comedor'] },
    { slug: 'institucional', n: '03', nombre: 'Sillas institucionales y de espera', corto: 'Institucional y espera', img: 'assets/img/cat-institucional.jpg', banner: 'assets/img/banner-institucional.jpg', bpos: 'right 0 bottom 0', foto: 'assets/img/cat-institucional.jpg',
      subs: ['Sillas ISO', 'Banquetas de espera', 'Otros modelos institucionales'] },
    { slug: 'lockers', n: '04', nombre: 'Lockers metálicos', corto: 'Lockers', img: 'assets/img/cat-lockers.jpg', banner: 'assets/img/banner-lockers.jpg', foto: 'assets/img/cat-lockers-claro.jpg',
      subs: ['Lockers de 2 a 8 puertas'] },
    { slug: 'jardines', n: '05', nombre: 'Mobiliario para jardines infantiles', corto: 'Jardines infantiles', img: 'assets/img/cat-jardines.jpg', banner: 'assets/img/banner-jardines.jpg', bpos: 'right 0 bottom 0', foto: 'assets/img/cat-jardines-naranja.jpg',
      subs: ['Sillas infantiles', 'Mesas infantiles', 'Mobiliario infantil complementario'] },
    { slug: 'oficina', n: '06', nombre: 'Mobiliario de oficina e institucional', corto: 'Oficina', img: 'assets/img/cat-oficina.jpg', banner: 'assets/img/banner-oficina-home.jpg', bpos: 'right 0 bottom 0', foto: 'assets/img/cat-oficina-claro.jpg',
      subs: ['Escritorios', 'Sillas de oficina', 'Mesas de reuniones', 'Otros muebles institucionales'] }
  ],

  /* Tallas según curso (manual de marca, lámina 39). T1 y T2 por confirmar. */
  tallas: {
    T1: '[Curso por confirmar]',
    T2: '[Curso por confirmar]',
    T3: '1º a 2º básico',
    T4: '3º a 5º básico',
    T5: '6º básico a 2º medio',
    T6: '3º a 4º medio'
  },

  colores: {
    verde:   { nombre: 'Verde RED', hex: '#1B4E2F' },
    grafito: { nombre: 'Grafito',   hex: '#1D211E' },
    naranja: { nombre: 'Naranja',   hex: '#E8A34A' },
    roble:   { nombre: 'Roble',     hex: '#C9A06A' },
    blanco:  { nombre: 'Blanco',    hex: '#F4F3EF' },
    haya:    { nombre: 'Haya',      hex: '#D4B483' },
    gris:    { nombre: 'Gris',      hex: '#9B9D99' },
    negro:   { nombre: 'Negro',     hex: '#1D211E' },
    azul:    { nombre: 'Azul',      hex: '#2F4A7A' },
    oliva:   { nombre: 'Verde',     hex: '#4A6B4F' }
  },

  productos: [
    { code: 'SE-101', nombre: 'Silla escolar estándar', cat: 'escolar', sub: 'Sillas escolares', destacado: true,
      img: 'assets/img/prod-se-101.jpg',
      galeria: ['assets/img/prod-se-101.jpg', 'assets/img/prod-se-101-detalle.jpg', 'assets/img/prod-se-101-naranja.jpg', 'assets/img/prod-se-101-sala.jpg'],
      desc: 'Silla escolar estándar para salas de clases, con asiento y respaldo de formalita y estructura de tubo de acero con pintura electrostática. Disponible en tallas T1 a T6 según nivel educativo y en varios colores de formalita y estructura.',
      familia: 'sillas',
      campos: [
        { k: 'talla', l: 'Talla', lc: 'Tallas y nivel recomendado', v: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'], tallas: true },
        { k: 'formalita', l: 'Color formalita', col: ['haya', 'gris', 'blanco'] },
        { k: 'estructura', l: 'Color estructura', col: ['verde', 'negro', 'naranja'] }
      ],
      carac: ['@talla', '@formalita', '@estructura', ['Dimensiones', ['Según talla: ver ficha técnica PDF']], ['Materiales', ['Asiento y respaldo de formalita 9 mm', 'Estructura de tubo de acero 20 × 20 mm']]],
      chips: ['6 tallas', '3 colores', 'Apilable'] },
    { code: 'PU-101', nombre: 'Pupitre escolar unipersonal', cat: 'escolar', sub: 'Pupitres escolares',
      img: 'assets/img/prod-pu-101.jpg',
      desc: 'Pupitre de cubierta de roble con estructura de acero, por talla según curso.',
      opcion: { label: 'Talla', valores: ['T3', 'T4', 'T5', 'T6'], tallas: true }, colores: ['verde', 'grafito'],
      specs: [['Cubierta', '[por confirmar]'], ['Estructura', 'Tubo de acero'], ['Medidas', '[por confirmar]']], chips: ['4 tallas', '2 colores'] },
    { code: 'SU-101', nombre: 'Silla universitaria con paleta', cat: 'escolar', sub: 'Sillas universitarias',
      img: 'assets/img/prod-su-101.jpg',
      desc: 'Silla con paleta abatible para salas de clases de enseñanza media y educación superior.',
      opcion: { label: 'Paleta', valores: ['Derecha', 'Izquierda'] }, colores: ['verde', 'grafito'],
      specs: [['Paleta', 'Derecha o izquierda'], ['Medidas', '[por confirmar]']], chips: ['Paleta der./izq.', '2 colores'] },
    { code: 'MP-101', nombre: 'Mesa de profesor', cat: 'escolar', sub: 'Mesas de profesor',
      img: 'assets/img/prod-mp-101.jpg',
      desc: 'Mesa de profesor con cubierta de roble y estructura de acero.',
      opcion: { label: 'Medida', valores: ['120 × 60 cm', '140 × 70 cm'] }, colores: ['verde', 'grafito'],
      specs: [['Medidas', '120 × 60 cm o 140 × 70 cm [por confirmar]']], chips: ['2 medidas', '2 colores'] },

    { code: 'MC-101', nombre: 'Mesa de casino rectangular', cat: 'casino', sub: 'Mesas de casino y comedor', destacado: true,
      img: 'assets/img/prod-mc-101.jpg', galeria: ['assets/img/prod-mc-101.jpg', 'assets/img/prod-mc-101-detalle.jpg'],
      desc: 'Mesa de casino rectangular para casinos escolares y comedores institucionales, con cubierta de melamina lavable y estructura metálica con pintura electrostática. Disponible en medidas estándar o especiales y en distintos colores de cubierta y estructura.',
      familia: 'mesas',
      campos: [
        { k: 'forma', l: 'Forma', v: ['Rectangular', 'Cuadrada'] },
        { k: 'medidas', l: 'Medidas', v: ['Estándar', 'Especial'], especial: 'Especial' },
        { k: 'cubierta', l: 'Color cubierta', col: ['blanco', 'haya', 'gris'] },
        { k: 'estructura', l: 'Color estructura', col: ['negro', 'gris'] }
      ],
      carac: ['@forma', ['Medidas estándar', ['Rectangular: 180 × 80 × 76 cm', 'Cuadrada: 80 × 80 × 76 cm', 'Medidas especiales a pedido']], '@cubierta', '@estructura', ['Materiales', ['Cubierta de melamina 25 mm con canto PVC', 'Estructura de acero con pintura electrostática']]],
      chips: ['2 formas', 'Medidas especiales'] },
    { code: 'SC-101', nombre: 'Silla de casino apilable', cat: 'casino', sub: 'Sillas de casino y comedor',
      img: 'assets/img/prod-sc-101.jpg',
      desc: 'Silla apilable para casinos y comedores, fácil de ordenar y limpiar.',
      opcion: { label: 'Altura', valores: ['Adulto', 'Escolar'] }, colores: ['verde', 'grafito', 'naranja'],
      specs: [['Apilable', '[por confirmar]'], ['Medidas', '[por confirmar]']], chips: ['2 alturas', '3 colores'] },

    { code: 'SI-101', nombre: 'Silla ISO', cat: 'institucional', sub: 'Sillas ISO',
      img: 'assets/img/prod-si-101.jpg',
      desc: 'Silla institucional apilable para salas de reuniones, auditorios y espacios de uso común.',
      opcion: { label: 'Versión', valores: ['Sin brazos', 'Con brazos'] }, colores: ['grafito', 'verde'],
      specs: [['Versiones', 'Con o sin brazos'], ['Medidas', '[por confirmar]']], chips: ['2 versiones', '2 colores'] },
    { code: 'BE-103', nombre: 'Banqueta de espera 3 cuerpos', cat: 'institucional', sub: 'Banquetas de espera',
      img: 'assets/img/prod-be-103.jpg',
      desc: 'Banqueta para salas de espera y halls institucionales.',
      opcion: { label: 'Cuerpos', valores: ['2 cuerpos', '3 cuerpos', '4 cuerpos'] }, colores: ['grafito', 'verde'],
      specs: [['Cuerpos', '2, 3 o 4'], ['Medidas', '[por confirmar]']], chips: ['2 a 4 cuerpos'] },

    { code: 'LK-104', nombre: 'Locker metálico 4 puertas', cat: 'lockers', sub: 'Lockers de 2 a 8 puertas', destacado: true,
      img: 'assets/img/prod-lk-104.jpg', galeria: ['assets/img/prod-lk-104.jpg', 'assets/img/cat-lockers.jpg'],
      desc: 'Locker metálico 4 puertas de plancha de acero con pintura electrostática, ventilación en cada puerta y cierre para candado. Para colegios, camarines, gimnasios y empresas.',
      familia: 'lockers',
      campos: [
        { k: 'puertas', l: 'Puertas', lc: 'Cantidad de puertas', v: ['2', '4', '6', '8'], sub: 'puertas' },
        { k: 'color', l: 'Color', col: ['gris', 'azul', 'oliva'] }
      ],
      carac: [['Dimensiones', ['180 × 90 × 45 cm (alto × ancho × fondo)']], '@puertas', '@color', ['Características técnicas', ['Plancha de acero 0,6 mm', 'Ventilación en cada puerta', 'Porta candado y repisa interior']]],
      chips: ['2 a 8 puertas', '3 colores'] },

    { code: 'SJ-101', nombre: 'Silla infantil', cat: 'jardines', sub: 'Sillas infantiles', destacado: true,
      img: 'assets/img/prod-sj-101.jpg', galeria: ['assets/img/prod-sj-101.jpg', 'assets/img/cat-jardines.jpg'],
      desc: 'Silla para jardines infantiles y salas cuna, liviana y a la medida de los más pequeños, con asiento y respaldo de formalita y estructura de tubo de acero.',
      familia: 'sillas',
      campos: [
        { k: 'talla', l: 'Talla', lc: 'Tallas y nivel recomendado', v: ['T1', 'T2'], tallas: true },
        { k: 'formalita', l: 'Color formalita', col: ['haya', 'blanco'] },
        { k: 'estructura', l: 'Color estructura', col: ['naranja', 'verde', 'negro'] }
      ],
      carac: ['@talla', '@formalita', '@estructura', ['Dimensiones', ['Según talla: ver ficha técnica PDF']], ['Materiales', ['Asiento y respaldo de formalita 9 mm', 'Estructura de tubo de acero']]],
      chips: ['2 tallas', '3 colores'] },
    { code: 'MJ-101', nombre: 'Mesa infantil rectangular', cat: 'jardines', sub: 'Mesas infantiles',
      img: 'assets/img/prod-mj-101.jpg',
      desc: 'Mesa baja para salas de actividades en jardines infantiles.',
      opcion: { label: 'Medida', valores: ['120 × 60 cm', '160 × 80 cm'] }, colores: ['verde', 'naranja'],
      specs: [['Medidas', '[por confirmar]']], chips: ['2 medidas', '2 colores'] },

    { code: 'ES-101', nombre: 'Escritorio institucional', cat: 'oficina', sub: 'Escritorios',
      img: 'assets/img/prod-es-101.jpg',
      desc: 'Escritorio de cubierta de roble y estructura de acero para oficinas y direcciones.',
      opcion: { label: 'Medida', valores: ['120 × 60 cm', '140 × 70 cm', '160 × 80 cm'] }, colores: ['verde', 'grafito'],
      specs: [['Medidas', '[por confirmar]']], chips: ['3 medidas', '2 colores'] },
    { code: 'MR-101', nombre: 'Mesa de reuniones', cat: 'oficina', sub: 'Mesas de reuniones',
      img: 'assets/img/prod-mr-101.jpg',
      desc: 'Mesa de reuniones para salas de profesores, consejos y directorios.',
      opcion: { label: 'Capacidad', valores: ['6 personas', '8 personas', '10 personas'] }, colores: ['verde', 'grafito'],
      specs: [['Capacidad', '6 a 10 personas'], ['Medidas', '[por confirmar]']], chips: ['6 a 10 personas'] }
  ],

  regiones: ['Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo', 'Valparaíso', 'Metropolitana de Santiago', "Libertador General Bernardo O'Higgins", 'Maule', 'Ñuble', 'Biobío', 'La Araucanía', 'Los Ríos', 'Los Lagos', 'Aysén del General Carlos Ibáñez del Campo', 'Magallanes y de la Antártica Chilena'],

  tiposCliente: ['Colegio', 'Jardín infantil o sala cuna', 'Empresa', 'Institución', 'Organismo público', 'Particular']
};

/* Bloque genérico: los productos sin campos propios (las opciones que luego se definen en el administrador)
   se arman con una variante + color. También se calcula la lista de colores que muestran las tarjetas. */
(function (D) {
  D.productos.forEach(function (p) {
    if (!p.campos) {
      p.familia = 'generico';
      p.campos = [
        { k: 'variante', l: p.opcion.label, lc: 'Opciones', v: p.opcion.valores, tallas: !!p.opcion.tallas },
        { k: 'color', l: 'Color', col: p.colores }
      ];
      p.carac = ['@variante', '@color'].concat(p.specs.map(function (s) { return [s[0], [s[1]]]; }));
    }
    // las tarjetas muestran los colores del último campo de color (estructura en sillas y mesas)
    var c = p.campos.filter(function (f) { return f.col; });
    p.colores = c.length ? c[c.length - 1].col : [];
  });
})(window.RED_DATA);
