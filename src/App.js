import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import AdminDashboard from './containers/admin';




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

