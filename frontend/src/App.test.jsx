import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Test for main container
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    
    // Test for heading
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Interactive Portfolio');
  });
}); 