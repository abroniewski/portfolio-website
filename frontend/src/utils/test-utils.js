import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

const customRender = (ui, options = {}) => {
  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: options.wrapper,
      ...options,
    }),
  };
};

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };
