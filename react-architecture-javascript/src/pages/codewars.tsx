import React from 'react';
import CodeWars from '@src/sections/CodeWars';
import { Router } from '@gatsbyjs/reach-router';

const CodeWarsPage = () => {
  return (
    <Router>
      <CodeWars path="/codewars/*" />
    </Router>
  );
};

export default CodeWarsPage;
