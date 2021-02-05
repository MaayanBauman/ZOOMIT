import React from 'react';
import ReactDOM from 'react-dom'; 
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'
import { StylesProvider, MuiThemeProvider } from '@material-ui/core/styles';

import App from 'components/App';
import theme from './assets/styles/theme';
import './assets/styles/fonts.css';
import {store, persistor} from 'redux/store';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
        <StylesProvider>
          <PersistGate loading={null} persistor={persistor}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
          </PersistGate>
        </StylesProvider>
    </MuiThemeProvider>
  </Provider>
  ,
  document.getElementById('root')
);
