import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <>
    <h2>Page not found</h2>

    <Link to="/">Go home</Link>
  </>
);

export default NotFound;
