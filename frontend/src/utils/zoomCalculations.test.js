import {
  calculateNodeRadius,
  calculateLinkDistance,
  calculateChargeStrength,
  calculateCollisionRadius,
} from './zoomCalculations';

describe('zoomCalculations', () => {
  describe('calculateNodeRadius', () => {
    it('calculates correct radius based on zoom level', () => {
      expect(calculateNodeRadius(1)).toBe(10); // Default case
      expect(calculateNodeRadius(2)).toBe(20); // Scaled up
      expect(calculateNodeRadius(0.2)).toBe(5); // Min radius
    });
  });

  describe('calculateLinkDistance', () => {
    it('calculates correct distance based on zoom level', () => {
      expect(calculateLinkDistance(1)).toBe(80); // Default case
      expect(calculateLinkDistance(2)).toBe(160); // Scaled up
      expect(calculateLinkDistance(0.2)).toBe(50); // Min distance
    });
  });

  describe('calculateChargeStrength', () => {
    it('calculates correct charge strength based on zoom level', () => {
      expect(calculateChargeStrength(1)).toBe(-30); // Default case
      expect(calculateChargeStrength(2)).toBe(-60); // Scaled up
      expect(calculateChargeStrength(0.5)).toBe(-15); // Scaled down
    });
  });

  describe('calculateCollisionRadius', () => {
    it('calculates correct collision radius based on zoom level', () => {
      expect(calculateCollisionRadius(1)).toBe(60); // Default case
      expect(calculateCollisionRadius(2)).toBe(120); // Scaled up
      expect(calculateCollisionRadius(0.2)).toBe(40); // Min radius
    });
  });
});
