import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ModelDashboard from './views/model-dashboard';
import configureStore from './configureStore';
import './App.css';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      <Route path="/" component={ModelDashboard} />
      <Route path="/component/:id" component={ModelDashboard} />
    </div>
  </Router>
</Provider>
  );
}

export default App;
