export const ZOOM_THRESHOLDS = {
  FAR: 0.5, // Below this: minimal view
  MID: 1.5, // Above this: detailed view
  MAX: 4, // Maximum zoom level
};

export const DIMENSIONS = {
  width: window.innerWidth - 40, // Almost full window width
  height: (window.innerHeight / 2) - 40, // Half window height minus padding
};

export const COLORS = {
  background: '#1a1a1a',
  node: {
    default: '#69b3a2',
    dimmed: '#2a4542',
    highlight: '#ff7f50',
  },
  link: {
    default: '#999',
    highlight: '#ff7f50',
  },
  text: '#f5f5f5',
};
