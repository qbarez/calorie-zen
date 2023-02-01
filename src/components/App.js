import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Diary from './Diary';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route path="/" element={<Diary />} />
    </BrowserRouter>
  );
}

export default App;