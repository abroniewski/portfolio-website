# Interactive Portfolio Website

An interactive portfolio website featuring a force-directed graph for content exploration. Built with React and D3.js frontend and Django backend, this project provides an engaging way to discover and navigate through various types of content including blog posts, videos, GitHub projects, and more.

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
  - Travel content

- **Smart Navigation**
  - Global search functionality
  - Two-column content view with related content mini-graph
  - Mobile-friendly touch interactions

## Tech Stack

- React + D3.js (Frontend)
- Django (Backend)
- PostgreSQL (Database)
- Poetry (Python dependency management)

## Getting Started

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/adambroniewski/portfolio-site.git
cd portfolio-site
```

2. Install Python dependencies using Poetry:
```bash
# Install Poetry if you haven't already
curl -sSL https://install.python-poetry.org | python3 -

# Install dependencies
poetry install --no-root

# Activate the virtual environment
poetry shell
```

3. Set up the Django backend:
```bash
# Apply migrations
python manage.py migrate

# Start the Django development server
python manage.py runserver
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Development Commands

### Frontend
- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm run test` - Run frontend tests
- `npm run lint` - Run frontend linting

### Backend
- `poetry run python manage.py runserver` - Start Django development server
- `poetry run python manage.py test` - Run backend tests
- `poetry run python manage.py migrate` - Apply database migrations

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 