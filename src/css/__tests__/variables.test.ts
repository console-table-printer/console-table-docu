import { ColorPrimary } from '../variables';

describe('CSS Variables', () => {
  it('exports ColorPrimary with correct value', () => {
    expect(ColorPrimary).toBe('rgb(50, 120, 230)');
  });

  it('is a valid RGB color', () => {
    expect(ColorPrimary).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/);
  });

  it('has values in valid RGB range', () => {
    const rgbMatch = ColorPrimary.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      const [, r, g, b] = rgbMatch;
      expect(Number(r)).toBeGreaterThanOrEqual(0);
      expect(Number(r)).toBeLessThanOrEqual(255);
      expect(Number(g)).toBeGreaterThanOrEqual(0);
      expect(Number(g)).toBeLessThanOrEqual(255);
      expect(Number(b)).toBeGreaterThanOrEqual(0);
      expect(Number(b)).toBeLessThanOrEqual(255);
    }
  });
}); 