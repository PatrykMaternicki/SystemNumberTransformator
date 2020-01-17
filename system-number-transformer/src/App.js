import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SystemNumberTransformerForm from './components/SystemNumberTransformerForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SystemNumberTransformerForm 
          className="componentForm"
        />
      </header>
    </div>
  );
}

export default App;
