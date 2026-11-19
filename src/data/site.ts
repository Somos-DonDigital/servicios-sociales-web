export const SITE = {
  name: 'Servicios Sociales de Ceuta',
  legalName: 'Consejería de Sanidad y Servicios Sociales · Ciudad Autónoma de Ceuta',
  url: 'https://www.servicios-sociales.es',
  description:
    'Servicios Sociales de la Ciudad Autónoma de Ceuta: ayudas, prestaciones, Centro del Mayor, familias, IMIS, subvenciones y trámites en la sede electrónica.',
  sede: 'https://sede.ceuta.es',
};

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const NAV: NavItem[] = [
  { label: 'Inicio', href: '/' },
  {
    label: 'Programas',
    href: '/sivo',
    children: [
      { label: 'SIVO', href: '/sivo' },
      { label: 'IMIS', href: '/imis' },
      { label: 'Alojamiento alternativo', href: '/alojamientoalternativo' },
      { label: 'Familias', href: '/familias' },
      { label: 'Inclusión social', href: '/inclusionsocial' },
      { label: 'Otros programas', href: '/otrosprogramas' },
    ],
  },
  {
    label: 'Servicios',
    href: '/familianumerosa',
    children: [
      { label: 'Familia numerosa', href: '/familianumerosa' },
      { label: 'Parejas de hecho', href: '/parejasdehecho' },
      { label: 'Tarjetas de discapacidad', href: '/tarjetasdiscapacidad' },
    ],
  },
  {
    label: 'Centro del Mayor',
    href: '/centrodelmayor',
    children: [
      { label: 'Centro del Mayor', href: '/centrodelmayor' },
      { label: 'Salón de actos', href: '/salondeactoscentrodelmayor' },
      { label: 'Ayuda a domicilio (SAD)', href: '/ayudaadomicilio' },
      { label: 'Teleasistencia', href: '/teleasistencia' },
      { label: 'Envejecimiento saludable', href: '/envejecimientosaludable' },
      { label: 'Residencias', href: '/residencias' },
      { label: 'Centro de día / noche', href: '/centrodedia' },
      { label: 'Ayudas técnicas y de apoyo', href: '/apoyo' },
    ],
  },
  { label: 'Subvenciones', href: '/subvenciones' },
  { label: 'Noticias', href: '/prensa' },
  { label: 'Enlaces de interés', href: '/solicitudes' },
];

export type Office = {
  name: string;
  address: string;
  area: string;
  phones: string[];
  hours: string;
  opens: string;
  closes: string;
  image: string;
  imageAlt: string;
  maps: string;
};

export const OFFICES: Office[] = [
  {
    name: 'UTS San José',
    address: 'Calle Santos Vilela, s/n',
    area: 'Altos del Mercado de San José, Hadú',
    phones: ['956 50 46 52', '956 50 46 53'],
    hours: 'Lunes a viernes, de 09:00 a 14:00 h',
    opens: '09:00',
    closes: '14:00',
    image: '6524357bc2b94b63a8e5878672eca5ba.jpg',
    imageAlt: 'Entrada de la UTS San José, Servicios Sociales Comunitarios',
    maps: 'https://www.google.com/maps/search/?api=1&query=Calle+Santos+Vilela+Ceuta',
  },
  {
    name: 'UTS Príncipe',
    address: 'Centro Polifuncional Mustafa Mizzian',
    area: 'Barriada Príncipe Alfonso',
    phones: ['856 20 53 60', '856 20 53 62', '856 20 53 63'],
    hours: 'Lunes a viernes, de 09:00 a 14:00 h',
    opens: '09:00',
    closes: '14:00',
    image: '3afdfb5aad174a088b7fb446222757cb.jpg',
    imageAlt: 'Fachada del Centro Polifuncional Mustafa Mizzian, en Príncipe Alfonso',
    maps: 'https://www.google.com/maps/search/?api=1&query=Centro+Polifuncional+Mustafa+Mizzian+Ceuta',
  },
  {
    name: 'UTS Centro',
    address: 'Calle General Aranda, 2',
    area: 'Centro',
    phones: ['856 20 53 65', '956 51 29 96', '956 51 10 64'],
    hours: 'Lunes a viernes, de 08:00 a 14:00 h',
    opens: '08:00',
    closes: '14:00',
    image: '225881b51a4e42d2ae02e4f1da2ead11.jpg',
    imageAlt: 'Entrada de la UTS Centro, Unidad de Trabajo Social',
    maps: 'https://www.google.com/maps/search/?api=1&query=Calle+General+Aranda+2+Ceuta',
  },
];

export const tel = (p: string) => 'tel:+34' + p.replace(/\D/g, '');

export const sede = (code: string) =>
  `https://sede.ceuta.es/controlador/controlador?cmd=tramite&modulo=tramites&tramite=${code}`;
