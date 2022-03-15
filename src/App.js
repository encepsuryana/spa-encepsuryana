import React from 'react';
import { ChakraProvider, theme, Container } from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
} from 'react-router-dom';

import Favorites from './components/Favorites';
import Home from './components/Home';
import Header from './components/Header';
import Dashboard from './components/admin/Dashboard';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container size="960px">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="liked-post" element={<Favorites />} />
          <Route path="login" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </ChakraProvider>
  );
}

export default App;
