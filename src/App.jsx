import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import Productlist from './Components/Productlist'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Indvproduct from './Components/Indvproduct'
// import '../src/App'
import './App.css'


function App() {
  

  return (
    <>
    <BrowserRouter>
      <div>
        <Navbar/>
        <Routes>
             <Route exact path="/" element={<Productlist/>}></Route>
             <Route exact path="/product/productId" element={<Indvproduct/>}></Route>
             
        </Routes>
        
        
      </div>
      </BrowserRouter>
    </>
  )
}

export default App
