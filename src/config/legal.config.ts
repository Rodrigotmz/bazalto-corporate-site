import siteConfig from './site.config';

export const legalConfig = {
  lastUpdated: '21 de julio de 2026',
  effectiveDate: '',
  legalName: '',
  tradeName: 'Bazalto',
  brandPresentation: 'BAZALTO — Software y soluciones digitales',
  taxId: '',
  address: '',
  email: '',
  phone: '',
  siteUrl: '',
  facebook: {
    enabled: siteConfig.facebook.enabled,
    label: 'Página oficial de Bazalto en Facebook',
    url: siteConfig.facebook.url,
  },
  jurisdiction: {
    municipality: '',
    state: 'Hidalgo',
    country: 'México',
  },
  businessHours: '',
} as const;

export default legalConfig;
