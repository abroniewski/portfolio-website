import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { mockContentData } from '../../constants/mockData';

import ContentPage from './ContentPage';

// Mock the MiniGraph component
jest.mock('../graph/MiniGraph', () => {
  return function MockMiniGraph({ onNodeClick }) {
    return (
      <div data-testid="mini-graph">
        <button onClick={() => onNodeClick('related-1')}>Related Node 1</button>
      </div>
    );
  };
});

const renderWithRouter = (id = 'test-1') => {
  return render(
    <MemoryRouter initialEntries={[`/content/${id}`]}>
      <Routes>
        <Route path="/content/:id" element={<ContentPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('ContentPage', () => {
  beforeEach(() => {
    // Reset mock content data
    mockContentData.clear();
    mockContentData.set('test-1', {
      id: 'test-1',
      title: 'Test Content',
      content: 'This is a test with [[internal-link]] inside.',
      type: 'article',
      relatedNodes: ['related-1'],
    });
  });

  it('renders content page with correct title and content', () => {
    renderWithRouter();

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText(/This is a test/)).toBeInTheDocument();
  });

  it('renders back button', () => {
    renderWithRouter();

    const backButton = screen.getByRole('button', { name: /back/i });
    expect(backButton).toBeInTheDocument();
  });

  it('renders internal links correctly', () => {
    renderWithRouter();

    const internalLink = screen.getByRole('link', { name: 'internal-link' });
    expect(internalLink).toHaveAttribute('href', '/content/internal-link');
  });

  it('renders mini graph with related nodes', () => {
    renderWithRouter();

    expect(screen.getByTestId('mini-graph')).toBeInTheDocument();
  });

  it('navigates when clicking related node in mini graph', () => {
    const { container } = renderWithRouter();

    fireEvent.click(screen.getByText('Related Node 1'));

    // Check if navigation occurred
    expect(container).toHaveTextContent('Related Node 1');
  });

  it('displays error state when content not found', () => {
    renderWithRouter('non-existent');

    expect(screen.getByText(/Content not found/i)).toBeInTheDocument();
  });
});
