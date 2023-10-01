import React, { useEffect, useState } from 'react'
import { cart_icon } from '../assets/Icons'
import { Link, Navigate, useParams } from 'react-router-dom'
import ModalSignUp from './ModalSignUp'
import ModalLogIn from './ModalLogIn'
import { useAuth0 } from '@auth0/auth0-react'

export default function Navbar() {
  const [cat, setCat] = useState('Categories')

  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
  const login = () => {
    // alert("clicked")
    loginWithRedirect()
  }
  const logo = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }
  // console.log(user)
  // Initialize a state variable to store the window width and height
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
//  console.log(windowSize.width)
  return (
    <div className='d-flex'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top mb-2">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">KShop</Link>
          {isAuthenticated && windowSize.width <= 992 &&
            <div className='text-success my-2 m-auto '>{user.name}</div>
          }
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${windowSize.width<992?'my-2':''} `} id="navbarSupportedContent">
            <div className={`d-flex ms-auto `} style={{width:'90%'}}>
            <div className="dropdown me-auto">
              <button className="btn  dropdown-toggle me-auto" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {/* {props.category===""?"Categories":params} */}
                {cat}
              </button>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/electronics">Electronics</Link></li><hr />
                <li><Link className="dropdown-item" to="/jewelery">Jewelery</Link></li><hr />
                <li><Link className="dropdown-item" to="/mensclothing">Men's clothing</Link></li><hr />
                <li><Link className="dropdown-item" to="/womensclothing">Women's clothing</Link></li>


              </ul>
            </div>
            <div className="nav-items d-flex ms-auto">
              {/* <ModalSignUp/> */}
              {/* <ModalLogIn/> */}
              {isAuthenticated && windowSize.width > 992 &&
                <div className='text-success my-2 ms-auto '>{user.name}</div>
              }
              {!isAuthenticated && <button className="btn btn-primary mx-2" onClick={() => { login() }}>Log In</button>}

              {isAuthenticated && <button className="btn btn-primary mx-2" onClick={() => { logo() }}>Log Out</button>}


              {/* <button className="btn btn-success">Sign Search</button> */}
              <Link to='/cartpage' style={{ textDecoration: 'none' }}>
                <button className="btn btn-primary mx-2 text-light">
                  {cart_icon}
                </button>
              </Link>

            </div>
            </div>
          </div>

        </div>
      </nav>
    </div>
  )
}
