import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';

import './App.css'
import Notes from './pages/Notes';

function App() {
  const [count, setCount] = useState(0)

  return (
        <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/notes' element={<Notes />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

