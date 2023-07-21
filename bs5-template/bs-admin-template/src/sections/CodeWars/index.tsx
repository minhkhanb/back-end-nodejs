import React from 'react';
import Layout from '@src/components/Layout';
import { Router } from '@gatsbyjs/reach-router';
import Javascript from '@src/sections/CodeWars/Javascript';
import Typescript from '@src/sections/CodeWars/Typescript';
import Kata from '@src/sections/CodeWars/Javascript/Kata/Kata';

const CodeWars: React.FunctionComponent = () => {
  return (
    <Layout>
      <Router>
        <Javascript path="javascript" />
        <Kata path="javascript/:id" />
        <Typescript path="typescript" />
      </Router>
    </Layout>
  );
};

export default CodeWars;
