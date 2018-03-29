// React
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

// MuiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { getMuiTheme } from 'material-ui/styles';

// App-specific JS
import App from './containers/App';
import * as Actions from './actions';
import reducer from './reducers';

// App-specific CSS

const middleware = [thunk, createLogger()];

let store = createStore(reducer, applyMiddleware(...middleware));

const MuiApp = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(
  <Provider store={store}>
    <MuiApp />
  </Provider>,
  document.getElementById('example')
);