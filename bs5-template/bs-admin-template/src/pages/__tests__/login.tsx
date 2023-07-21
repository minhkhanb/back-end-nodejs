/**
 * @jest-environment jsdom
 */
import * as React from 'react';
import { render } from '@testing-library/react';

import LoginPage from '@src/pages/login';

describe('Login page', () => {
  it('has login title', () => {
    const { getByText } = render(<LoginPage />);

    getByText('Login to account');
  });
});
