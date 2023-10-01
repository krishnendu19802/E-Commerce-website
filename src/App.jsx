import { useState,useEffect } from 'react'
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
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
  const login = () => {
    // alert("clicked")
    loginWithRedirect()
  }
  const logo = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Create a function to update the window size in the state
  const updateWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  // Add an event listener to the 'resize' event when the component mounts
  useEffect(() => {
    window.addEventListener('resize', updateWindowSize);

    // Remove the event listener when the component unmounts to prevent memory leaks
    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);
  document.body.style.backgroundImage='linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
  return (
    <>
      <BrowserRouter>
        <div>
          
          <Navbar />
          <div className="container " style={{ width: '100%',marginTop:'80px' }}>
            <Routes>
              <Route exact path="/" element={<Productlist category={''} />}></Route>
              <Route exact path="/product/:productId" element={<Indvproduct size={windowSize} />}></Route>
              <Route exact path="/cartpage" element={<Cartpage size={windowSize} />}></Route>
              <Route exact path="/electronics" element={<Productlist category={'electronics'} />}></Route>
              <Route exact path="/jewelery" element={<Productlist category={'jewelery'} />}></Route>
              <Route exact path="/mensclothing" element={<Productlist category={"men's clothing"} />}></Route>
              <Route exact path="/womensclothing" element={<Productlist category={"women's clothing"} />}></Route>


              

            </Routes>
          {!isAuthenticated && windowSize.width<=992 && <button className="btn btn-success fixed-bottom ms-auto mb-3 me-2" style={{width:'100px'}} onClick={()=>{login()}}>Log In</button>}
          {isAuthenticated && windowSize.width<=992 && <button className="btn btn-danger fixed-bottom ms-auto mb-3 me-2" style={{width:'100px'}} onClick={()=>{logo()}}>Log Out</button>}
          </div>
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
