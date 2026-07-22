import { describe, expect, it } from 'vitest';
import legalConfig from '../config/legal.config';

describe('legalConfig', () => {
  it('renders only confirmed legal values', () => {
    expect(legalConfig.lastUpdated).toBe('21 de julio de 2026');
    expect(legalConfig.tradeName).toBe('Bazalto');
    expect(legalConfig.brandPresentation).toBe('BAZALTO — Software y soluciones digitales');
    expect(legalConfig.facebook).toEqual({
      enabled: true,
      label: 'Página oficial de Bazalto en Facebook',
      url: 'https://www.facebook.com/bazaltosoftware',
    });
    expect({
      effectiveDate: legalConfig.effectiveDate,
      legalName: legalConfig.legalName,
      taxId: legalConfig.taxId,
      address: legalConfig.address,
      email: legalConfig.email,
      phone: legalConfig.phone,
      siteUrl: legalConfig.siteUrl,
      municipality: legalConfig.jurisdiction.municipality,
      businessHours: legalConfig.businessHours,
    }).toEqual({
      effectiveDate: '',
      legalName: '',
      taxId: '',
      address: '',
      email: '',
      phone: '',
      siteUrl: '',
      municipality: '',
      businessHours: '',
    });
  });
});
