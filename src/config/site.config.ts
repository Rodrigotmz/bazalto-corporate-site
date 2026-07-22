const navigation = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Contacto', href: '/contacto' },
] as const;

export const siteConfig = {
  name: 'BAZALTO',
  descriptor: 'Software y soluciones digitales',
  description: 'Sitios web, sistemas a medida y soluciones digitales para negocios.',
  siteUrl: import.meta.env.PUBLIC_SITE_URL?.replace(/\/$/, '') ?? '',
  navigation,
  footerNavigation: navigation,
  services: [
    {
      title: 'Sitios web',
      summary:
        'Presencia profesional para explicar con claridad qué hace tu negocio y cómo contactarlo.',
      detail:
        'Diseñamos sitios informativos y comerciales con una estructura clara, buen desempeño y contenido fácil de recorrer desde cualquier dispositivo.',
    },
    {
      title: 'Sistemas a medida',
      summary: 'Herramientas ajustadas a operaciones que no encajan bien en soluciones genéricas.',
      detail:
        'Analizamos el flujo real del negocio y desarrollamos las funciones necesarias para organizar información, tareas y decisiones sin sumar complejidad innecesaria.',
    },
    {
      title: 'Tiendas y catálogos en línea',
      summary: 'Productos organizados para consultarse, compararse y solicitarse con facilidad.',
      detail:
        'Creamos catálogos o tiendas según el alcance de cada negocio. La gestión de pedidos y los pagos se definen solo cuando el proyecto realmente los necesita.',
    },
    {
      title: 'Aplicaciones web',
      summary:
        'Herramientas accesibles desde el navegador para interacciones y flujos estructurados.',
      detail:
        'Desarrollamos aplicaciones responsivas para registrar, consultar y administrar procesos con una experiencia consistente en escritorio y dispositivos móviles.',
    },
    {
      title: 'Digitalización de procesos',
      summary: 'Menos tareas manuales, repetidas o dispersas entre archivos y conversaciones.',
      detail:
        'Convertimos procesos fragmentados en flujos digitales más claros, conservando la flexibilidad que necesita la operación cotidiana.',
    },
    {
      title: 'Mantenimiento y evolución',
      summary: 'Correcciones y mejoras para soluciones que deben seguir siendo útiles.',
      detail:
        'Revisamos sistemas existentes, resolvemos problemas y añadimos mejoras con atención a la estabilidad, el desempeño y el mantenimiento futuro.',
    },
  ],
  facebook: {
    enabled: true,
    url: 'https://www.facebook.com/bazaltosoftware',
  },
  whatsapp: {
    enabled: false,
    phone: '',
    message: '',
  },
  email: {
    enabled: false,
    address: '',
  },
  seo: {
    title: 'BAZALTO — Software y soluciones digitales',
    description: 'Sitios web, sistemas a medida y soluciones digitales para negocios.',
    locale: 'es_MX',
  },
  socialPreview: {
    enabled: false,
    image: '',
  },
  projectLabels: {
    featured: 'Proyecto destacado',
    future: 'Más proyectos se incorporarán próximamente.',
  },
};

export function getWhatsAppUrl(
  whatsapp: { enabled: boolean; phone: string; message?: string } = siteConfig.whatsapp
): string | null {
  if (!whatsapp.enabled) return null;
  const phone = whatsapp.phone.replace(/\D/g, '');
  if (!phone) return null;
  const message = whatsapp.message?.trim();
  return `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

export default siteConfig;
