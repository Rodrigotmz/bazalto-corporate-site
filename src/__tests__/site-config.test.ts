import { describe, expect, it } from 'vitest';
import siteConfig, { getWhatsAppUrl } from '../config/site.config';

describe('siteConfig', () => {
  it('owns the public Bazalto identity and navigation', () => {
    expect(siteConfig.name).toBe('BAZALTO');
    expect(siteConfig.descriptor).toBe('Software y soluciones digitales');
    expect(siteConfig.navigation).toEqual([
      { label: 'Inicio', href: '/' },
      { label: 'Servicios', href: '/servicios' },
      { label: 'Proyectos', href: '/proyectos' },
      { label: 'Nosotros', href: '/nosotros' },
      { label: 'Contacto', href: '/contacto' },
    ]);
  });

  it('keeps Facebook active and unconfigured channels disabled', () => {
    expect(siteConfig.facebook).toEqual({
      enabled: true,
      url: 'https://www.facebook.com/bazaltosoftware',
    });
    expect(siteConfig.whatsapp).toEqual({ enabled: false, phone: '', message: '' });
    expect(siteConfig.email).toEqual({ enabled: false, address: '' });
    expect(getWhatsAppUrl()).toBeNull();
  });

  it('does not build an invalid WhatsApp link', () => {
    expect(getWhatsAppUrl({ enabled: false, phone: '521234567890' })).toBeNull();
    expect(getWhatsAppUrl({ enabled: true, phone: '' })).toBeNull();
  });

  it('normalizes a future number and encodes its message', () => {
    expect(
      getWhatsAppUrl({ enabled: true, phone: '+52 123 456 7890', message: 'Hola Bazalto' })
    ).toBe('https://wa.me/521234567890?text=Hola%20Bazalto');
  });
});
