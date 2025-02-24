export const mockGraphData = {
  nodes: [
    // First group (3 nodes)
    { id: '1', title: 'Introduction to AI', type: 'article' },
    { id: '2', title: 'Machine Learning Basics', type: 'video' },
    { id: '3', title: 'Neural Networks', type: 'presentation' },
    // Second group (5 nodes)
    { id: '4', title: 'Data Visualization', type: 'github' },
    { id: '5', title: 'React Components', type: 'github' },
    { id: '6', title: 'Portfolio Design', type: 'article' },
    { id: '7', title: 'D3.js Tutorial', type: 'video' },
    { id: '8', title: 'Graph Theory', type: 'presentation' },
  ],
  links: [
    // First group connections
    { source: '1', target: '2' },
    { source: '2', target: '3' },
    // Second group connections
    { source: '4', target: '5' },
    { source: '4', target: '6' },
    { source: '4', target: '7' },
    { source: '7', target: '8' },
  ],
};

export const mockContentData = {
  1: {
    title: 'Introduction to AI',
    description: 'An overview of artificial intelligence and its impact on modern technology.',
    type: 'article',
    content: 'Artificial Intelligence is transforming how we interact with technology...',
  },
  2: {
    title: 'Machine Learning Basics',
    description: 'Learn the fundamentals of machine learning algorithms and applications.',
    type: 'video',
    content: 'In this video, we explore the basic concepts of machine learning...',
  },
  3: {
    title: 'Neural Networks',
    description: 'Deep dive into neural networks and their applications.',
    type: 'presentation',
    content: 'Neural networks are the backbone of modern deep learning...',
  },
  4: {
    title: 'Data Visualization',
    description: 'Explore techniques for effective data visualization.',
    type: 'github',
    content: 'This repository contains examples of data visualization using D3.js...',
  },
  5: {
    title: 'React Components',
    description: 'A collection of reusable React components.',
    type: 'github',
    content: 'Building modular and maintainable React applications...',
  },
  6: {
    title: 'Portfolio Design',
    description: 'Best practices for creating an effective portfolio.',
    type: 'article',
    content: 'Your portfolio is more than just a collection of work...',
  },
  7: {
    title: 'D3.js Tutorial',
    description: 'Learn how to create interactive visualizations with D3.js',
    type: 'video',
    content: 'D3.js is a powerful library for creating data-driven documents...',
  },
  8: {
    title: 'Graph Theory',
    description: 'Understanding the mathematics behind network visualization.',
    type: 'presentation',
    content: 'Graph theory provides the foundation for network analysis...',
  },
};
