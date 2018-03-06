import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { Form } from './components/Form';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Actions from './actions';
import Reducers from './reducers';


let store = createStore(Reducers);

const App = () => (
  <MuiThemeProvider>
    <Form compiler="TypeScript" framework="React" name="Andrew" />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('example')
);