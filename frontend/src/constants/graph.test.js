import { ZOOM_THRESHOLDS, DIMENSIONS, COLORS } from './graph';

describe('graph constants', () => {
  it('has correct zoom thresholds', () => {
    expect(ZOOM_THRESHOLDS).toEqual({
      FAR: 0.5,
      MID: 1.5,
      MAX: 4,
    });
  });

  it('has correct dimensions', () => {
    expect(DIMENSIONS).toEqual({
      width: 700,
      height: 500,
    });
  });

  it('has all required colors', () => {
    expect(COLORS).toHaveProperty('background');
    expect(COLORS.node).toHaveProperty('default');
    expect(COLORS.node).toHaveProperty('dimmed');
    expect(COLORS.node).toHaveProperty('highlight');
    expect(COLORS.link).toHaveProperty('default');
    expect(COLORS.link).toHaveProperty('highlight');
    expect(COLORS).toHaveProperty('text');
  });
});
