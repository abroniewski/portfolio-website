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
    content: `Artificial Intelligence (AI) is transforming how we interact with technology across various industries. From healthcare and finance to entertainment and education, AI-powered systems are automating tasks, analyzing large datasets, and improving decision-making processes. 
    This article provides a broad introduction to AI, covering its historical development, core concepts, and real-world applications. We discuss key areas such as machine learning, natural language processing, and robotics, exploring how these technologies are shaping the future. 
    AI has led to breakthroughs in voice recognition (e.g., Siri and Alexa), recommendation systems (e.g., Netflix and Spotify), and autonomous vehicles. However, with its rapid growth come challenges such as ethical concerns, job displacement, and biases in AI models. 
    Understanding AI is essential in today’s digital world, and this guide will help you grasp its fundamental principles and potential implications.`,
  },
  2: {
    title: 'Machine Learning Basics',
    description: 'Learn the fundamentals of machine learning algorithms and applications.',
    type: 'video',
    content: `In this video, we explore the basic concepts of machine learning, a subfield of artificial intelligence that enables computers to learn from data without being explicitly programmed. 
    We begin with an overview of supervised and unsupervised learning, explaining how models are trained on labeled and unlabeled data. The video covers essential algorithms such as linear regression, decision trees, and neural networks, providing real-world examples of their applications.
    You'll also learn about the importance of feature engineering, model evaluation, and performance metrics like accuracy and precision. By the end, you'll have a foundational understanding of machine learning, preparing you to explore more advanced topics like deep learning and reinforcement learning.`,
  },
  3: {
    title: 'Neural Networks',
    description: 'Deep dive into neural networks and their applications.',
    type: 'presentation',
    content: `Neural networks are the backbone of modern deep learning and have revolutionized fields such as computer vision, speech recognition, and natural language processing.
    This presentation covers the architecture of neural networks, including input layers, hidden layers, and output layers. We discuss activation functions like ReLU and sigmoid, as well as backpropagation and gradient descent for optimizing models.
    The presentation also includes practical examples of how neural networks power applications like image classification, autonomous systems, and generative AI (e.g., ChatGPT and DALL·E). 
    By understanding the inner workings of neural networks, you can develop a deeper appreciation for their capabilities and limitations in artificial intelligence research and industry applications.`,
  },
  4: {
    title: 'Data Visualization',
    description: 'Explore techniques for effective data visualization.',
    type: 'github',
    content: `This repository contains examples of data visualization using D3.js, a powerful JavaScript library for creating interactive and dynamic visual representations of data.
    Inside, you'll find code snippets and tutorials on bar charts, scatter plots, heatmaps, and network graphs. We provide step-by-step guides on integrating D3.js with web applications and customizing visualizations to enhance user engagement.
    Good data visualization is crucial for making complex data more understandable and accessible. This repository serves as a hands-on resource for developers and data analysts looking to improve their visualization skills and communicate insights more effectively.`,
  },
  5: {
    title: 'React Components',
    description: 'A collection of reusable React components.',
    type: 'github',
    content: `Building modular and maintainable React applications starts with well-designed reusable components. 
    This repository provides a set of high-quality React components for buttons, modals, form inputs, and dynamic tables. Each component is documented with usage examples, props, and styling options.
    By leveraging reusable components, developers can improve code consistency, reduce redundancy, and speed up development. The repository also demonstrates best practices for state management, component lifecycle methods, and hooks, making it a valuable resource for React developers at any level.`,
  },
  6: {
    title: 'Portfolio Design',
    description: 'Best practices for creating an effective portfolio.',
    type: 'article',
    content: `Your portfolio is more than just a collection of work; it is a reflection of your skills, experience, and personal brand. 
    In this article, we discuss best practices for designing an impactful portfolio, whether you’re a developer, designer, or creative professional. Key topics include choosing the right projects to showcase, structuring your portfolio for clarity, and writing compelling case studies.
    We also explore modern web technologies and frameworks for building portfolios, such as Next.js and Gatsby, as well as UX principles that enhance user engagement. Whether you’re applying for jobs or attracting freelance clients, a well-crafted portfolio can set you apart from the competition.`,
  },
  7: {
    title: 'D3.js Tutorial',
    description: 'Learn how to create interactive visualizations with D3.js',
    type: 'video',
    content: `D3.js is a powerful library for creating data-driven documents and interactive visualizations. 
    In this tutorial video, we walk through the basics of D3.js, covering data binding, scales, axes, and transitions. We demonstrate how to create bar charts, line graphs, and interactive tooltips step by step.
    The video also covers advanced topics such as handling large datasets efficiently and integrating D3.js with React for seamless UI development. Whether you're new to D3.js or looking to refine your skills, this tutorial provides the guidance needed to build engaging and insightful visualizations.`,
  },
  8: {
    title: 'Graph Theory',
    description: 'Understanding the mathematics behind network visualization.',
    type: 'presentation',
    content: `Graph theory provides the foundation for network analysis and visualization, playing a crucial role in areas such as social network analysis, bioinformatics, and cybersecurity.
    This presentation introduces key concepts in graph theory, including nodes, edges, directed and undirected graphs, and adjacency matrices. We explore real-world applications such as shortest path algorithms (Dijkstra's algorithm), centrality measures, and clustering techniques.
    Additionally, we discuss visualization tools like Gephi and NetworkX that help analyze complex networks. By the end of this presentation, you'll have a solid understanding of how graph theory is applied in modern computational problems and data analysis.`,
  },
};
