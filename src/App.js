import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Home from './components/home/Home';
import { Navigate } from 'react-router-dom';
import PrivateRoute from './routes/privateRoutes';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};


export default App;