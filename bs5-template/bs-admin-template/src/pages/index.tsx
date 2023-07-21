import * as React from 'react';
import type { HeadFC } from 'gatsby';
import Dashboard from '@src/sections/Dashboard';

const IndexPage: React.FC = () => {
  return <Dashboard />;
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
