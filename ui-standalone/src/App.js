import React from 'react';
import { Router } from './router/router';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import './styles/styles.scss';

// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ config })

function App() {
  return (
    <React.Fragment>      
        <Provider store={store}>
          <ChakraProvider theme={theme}>
              <Router />
          </ChakraProvider>
        </Provider>
    </React.Fragment>
  );
}

export default App;
