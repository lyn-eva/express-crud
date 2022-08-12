import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './components/Signup';
import Nav from './components/Nav';
import LogIn from './components/LogIn';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='flex h-screen flex-col bg-blue-300 px-[5vw]'>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/signup' element={<Signin />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/' element={<App />} />
        </Routes>
      </BrowserRouter>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
