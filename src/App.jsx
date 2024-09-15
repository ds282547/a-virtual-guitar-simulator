import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GuitarApp from './components/Guitar/GuitarApp';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
      <h1>Virtual Guitar</h1>
      <GuitarApp />
      </div>
    </>
  )
}

export default App
