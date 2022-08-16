import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './UI_Admin/Main/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>

  );
}

export default App;
