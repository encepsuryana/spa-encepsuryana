import React from 'react';
import { ChakraProvider, Grid, theme, Container } from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';

import styles from './style/styles.module.css';
import Header from './components/Header';
import Posts from './components/Posts';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container size="960px">
        <Grid minH="100vh">
          <Header />
          <Posts />
        </Grid>
      </Container>
    </ChakraProvider>
  );
}

export default App;
