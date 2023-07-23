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
import Cartpage from './Components/Cartpage'
// import Electronics from './Components/Electronics'


function App() {
  

  return (
    <>
    <BrowserRouter>
      <div>
        <Navbar/>
        <Routes>
             <Route exact path="/" element={<Productlist category={''}/>}></Route>
             <Route exact path="/product/:productId" element={<Indvproduct/>}></Route>
             <Route exact path="/cartpage" element={<Cartpage/>}></Route>
             <Route exact path="/electronics" element={<Productlist category={'electronics'}/>}></Route>
             <Route exact path="/jewelery" element={<Productlist category={'jewelery'}/>}></Route>
             <Route exact path="/mensclothing" element={<Productlist category={ "men's clothing"}/>}></Route>
             <Route exact path="/womensclothing" element={<Productlist category={ "women's clothing"}/>}></Route>



             
        </Routes>
        {/* [
            "electronics",
            "jewelery",
            "men's clothing",
            "women's clothing"
            ]
         */}
      </div>
      </BrowserRouter>
    </>
  )
}

export default App
