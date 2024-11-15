import { useState } from 'react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/navbar'
 

/* import './App.css' */

function App() {
 
  return (
    <>
 
      <Navbar/>
        <div className="mt-4">
          <Outlet/>
        </div>   
      
      
   
      
    </>
  )
}

export default App
