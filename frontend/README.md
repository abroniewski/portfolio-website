# Interactive Portfolio Frontend

The frontend for an interactive portfolio website featuring a force-directed graph for content exploration. Built with React, D3.js, and Vite, this application provides an engaging way to discover and navigate through various types of content including blog posts, videos, GitHub projects, and more.

## Features

- **Interactive Force-Directed Graph**
  - Dynamic content exploration through an intuitive graph interface
  - Physics-based interactions with drag, zoom, and hover effects
  - Adaptive zoom levels showing different levels of detail

- **Content Integration**
  - YouTube videos
  - LinkedIn articles
  - GitHub projects
  - Photography and presentations

- **Smart Navigation**
  - Global search functionality
  - Two-column content view with related content mini-graph
  - Mobile-friendly touch interactions

## Tech Stack

- React 18
- D3.js for graph visualization
- React Router for navigation
- Jest + React Testing Library for testing
- Vite for build tooling

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/         # Page components
│   ├── services/      # API and other services
│   ├── assets/        # Static assets
│   ├── styles/        # Global styles
│   └── utils/         # Utility functions
├── __mocks__/         # Test mocks
├── public/            # Static files
└── tests/             # Test files
```

## Testing

The project uses Jest and React Testing Library for testing. Run tests with:

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
