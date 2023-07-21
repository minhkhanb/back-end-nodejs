import React from 'react';
import type { HeadFC } from 'gatsby';
import Login from '@src/sections/Login';

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;

export const Head: HeadFC = () => <title>Login Page</title>;
