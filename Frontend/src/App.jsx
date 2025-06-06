import { useState } from 'react'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";


import './App.css'

function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
    </>

  );
   
}

export default App
