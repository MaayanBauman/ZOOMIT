import React from 'react';
import ReactDOM from 'react-dom'; 
import { Provider } from 'react-redux';
import heLocale from 'date-fns/locale/he';
import DateFnsUtils from '@date-io/date-fns';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { StylesProvider, MuiThemeProvider } from '@material-ui/core/styles';

import App from 'components/App';
import './assets/styles/fonts.css';
import theme from './assets/styles/theme';
import {store, persistor} from 'redux/store';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={heLocale}>
          <StylesProvider>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
            </PersistGate>
          </StylesProvider>
        </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  </Provider>
  ,
  document.getElementById('root')
);
