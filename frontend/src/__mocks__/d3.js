// Create chainable mock objects for each force type
const createMockForceLink = () => ({
  id: jest.fn().mockReturnThis(),
  distance: jest.fn().mockReturnThis(),
  strength: jest.fn().mockReturnThis(),
  links: jest.fn().mockReturnThis(),
});

const mockForceManyBodyObj = {
  strength: jest.fn().mockReturnThis(),
  distanceMin: jest.fn().mockReturnThis(),
  distanceMax: jest.fn().mockReturnThis(),
  theta: jest.fn().mockReturnThis(),
};

const mockForceCenterObj = {
  x: jest.fn().mockReturnThis(),
  y: jest.fn().mockReturnThis(),
  strength: jest.fn().mockReturnThis(),
};

// X and Y forces need x() and y() methods respectively
const mockForceXObj = {
  x: jest.fn().mockReturnThis(),
  strength: jest.fn().mockReturnThis(),
};

const mockForceYObj = {
  y: jest.fn().mockReturnThis(),
  strength: jest.fn().mockReturnThis(),
};

const mockForceCollideObj = {
  radius: jest.fn().mockReturnThis(),
};

// Create a map of force types to their mock implementations
const forces = {
  link: createMockForceLink(),
  charge: mockForceManyBodyObj,
  center: mockForceCenterObj,
  x: mockForceXObj,
  y: mockForceYObj,
  collision: mockForceCollideObj,
};

// Create the simulation object that's returned by forceSimulation()
const mockSimulation = {
  force: jest.fn().mockImplementation((type, force) => {
    if (force) {
      // When setting a force, store it and return simulation for chaining
      forces[type] = force;
      return mockSimulation;
    }
    // When getting a force, return the stored force object
    return forces[type];
  }),
  stop: jest.fn(),
  alpha: jest.fn().mockReturnThis(),
  alphaMin: jest.fn().mockReturnThis(),
  alphaDecay: jest.fn().mockReturnThis(),
  velocityDecay: jest.fn().mockReturnThis(),
  nodes: jest.fn().mockReturnThis(),
  restart: jest.fn().mockReturnThis(),
};

// Export the mock D3 module
module.exports = {
  forceSimulation: jest.fn(() => mockSimulation),
  forceLink: jest.fn(() => createMockForceLink()),
  forceManyBody: jest.fn(() => mockForceManyBodyObj),
  forceCenter: jest.fn(() => mockForceCenterObj),
  forceX: jest.fn(() => mockForceXObj),
  forceY: jest.fn(() => mockForceYObj),
  forceCollide: jest.fn(() => mockForceCollideObj),
};
