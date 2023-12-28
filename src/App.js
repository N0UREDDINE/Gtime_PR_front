import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Sidebar from './Sidebar';
import TimePage from './TimePage'; 
import LoginPage from './LoginPage';
import Consulter from './Consulter';
import ParJour from './ParJour';

function App() {
  return (
    <div className="App">
      <div className="Layout">
        
    
          <Routes>  
            <Route path="/time" element={<TimePage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Sidebar" element={<Sidebar />} />
            <Route path="/Consulter" element={<Consulter />} />
            <Route path="/ParJour" element={<ParJour />} />
            
          </Routes>
        </div>
      </div>

  );
}

export default App;
