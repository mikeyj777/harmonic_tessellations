// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HarmonicTessellations from './components/HarmonicTessellations';
// import TestHarmonicTessellations from './components/TestHarmonicTessellations';
// import HooksTester from './components/HooksTester';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {console.log("App.js")}
        <Route path="/" element={<HarmonicTessellations />} />
        {/* <Route path="/test" element={<TestHarmonicTessellations />} /> */}
        {/* <Route path="/hooks-tester" element={<HooksTester />} /> */}
        

      </Routes>
    </Router>
  );
}

export default App;