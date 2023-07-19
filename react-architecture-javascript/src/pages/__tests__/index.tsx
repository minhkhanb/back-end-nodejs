/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render } from '@testing-library/react';
import * as Gatsby from 'gatsby';

import IndexPage from '../';

const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
const mockUseStaticQuery = {
  site: {
    siteMetadata: {
      title: 'Gatsby Default Starter',
    },
  },
  placeholderImage: {
    childImageSharp: {
      gatsbyImageData: {
        images: {
          fallback: {
            src: 'imagesrc.jpg',
            srcSet: 'imagesrcset.jpg 1x',
          },
        },
        layout: 'constrained',
        width: 1,
        height: 2,
      },
    },
  },
};

describe('Index Page', () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => mockUseStaticQuery);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('contains a gatsby image', () => {
    const { getByTestId } = render(<IndexPage />);
    const node = getByTestId('gatsby-logo');

    expect(node.querySelectorAll('img[alt="Gatsby Astronaut"]')).toHaveLength(
      1
    );
  });

  it('contains a greeting', () => {
    const { getByText } = render(<IndexPage />);

    getByText('Congratulations');
  });

  it('has an open button', () => {
    const { getByTestId } = render(<IndexPage />);

    const button = getByTestId('btn-open');

    expect(button.innerHTML).toContain('Open');
  });
});
