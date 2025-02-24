import { calculateBoundedPosition, calculateNodePosition } from './graphHelpers';

describe('graphHelpers', () => {
  describe('calculateBoundedPosition', () => {
    it('constrains value within bounds', () => {
      expect(calculateBoundedPosition(5, 0, 10)).toBe(5); // Within bounds
      expect(calculateBoundedPosition(-5, 0, 10)).toBe(0); // Below min
      expect(calculateBoundedPosition(15, 0, 10)).toBe(10); // Above max
    });
  });

  describe('calculateNodePosition', () => {
    it('calculates node position with padding', () => {
      const width = 100;
      const padding = 10;

      expect(calculateNodePosition(50, width, padding)).toBe(50); // Within bounds
      expect(calculateNodePosition(0, width, padding)).toBe(10); // Left edge
      expect(calculateNodePosition(100, width, padding)).toBe(90); // Right edge
    });
  });
});
