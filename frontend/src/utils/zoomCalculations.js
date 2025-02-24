export const calculateNodeRadius = (zoomLevel, minRadius = 5, baseRadius = 10) => {
  return Math.max(minRadius, baseRadius * zoomLevel);
};

export const calculateLinkDistance = (zoomLevel, minDistance = 50, baseDistance = 80) => {
  return Math.max(minDistance, baseDistance * zoomLevel);
};

export const calculateFontSize = (zoomLevel, minSize = 8, baseSize = 12) => {
  return Math.max(minSize, baseSize * zoomLevel);
};

export const calculateChargeStrength = (zoomLevel, baseStrength = -30) => {
  return baseStrength * zoomLevel;
};

export const calculateCollisionRadius = (zoomLevel, minRadius = 40, baseRadius = 60) => {
  return Math.max(minRadius, baseRadius * zoomLevel);
};
