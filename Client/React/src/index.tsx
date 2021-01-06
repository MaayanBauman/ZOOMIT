import React from 'react';
import ReactDOM from 'react-dom'; 
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { StylesProvider, MuiThemeProvider } from '@material-ui/core/styles';

import App from 'components/App';
import theme from './assets/styles/theme';
import './assets/styles/fonts.css';
import store from 'redux/store';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
        <StylesProvider>
          <BrowserRouter>
              <App />
            </BrowserRouter>
        </StylesProvider>
    </MuiThemeProvider>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
