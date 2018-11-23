import React from 'react';
import { Link } from '@reach/router';
import styled, { keyframes } from 'react-emotion';
import colors from './colors';

const Spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg)
  }
`;

const SpyGlass = styled('span')`
  display: inline-block;
  animation: 1s ${Spin} linear infinite;
`;

const Container = styled('header')`
  background-color: ${colors.dark};
  position: sticky;
  top: 0;
  z-index: 10;
`;

function Navbar() {
  return (
    <Container>
      <Link to="/">Adopt Me!</Link>
      <Link to="/search-params">
        <SpyGlass aria-label="search" role="img">
          🔍
        </SpyGlass>
      </Link>
    </Container>
  );
}

export default Navbar;
