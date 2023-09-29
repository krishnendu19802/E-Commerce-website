import React, { useState } from 'react'
import { cart_icon } from '../assets/Icons'
import { Link, Navigate, useParams } from 'react-router-dom'
import ModalSignUp from './ModalSignUp'
import ModalLogIn from './ModalLogIn'
import { useAuth0 } from '@auth0/auth0-react'
  
export default function Navbar() {
  const [cat, setCat] = useState('Categories')
   
  const {user, isAuthenticated, isLoading, loginWithRedirect,logout } = useAuth0();
  const login=()=>{
    // alert("clicked")
    loginWithRedirect()
  }
  const logo=()=>{
    logout({ logoutParams: { returnTo: window.location.origin } })
  }
  // console.log(user)
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">MyShop</Link>
          <div className="dropdown me-auto">
            <button className="btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
          <div className="nav-items d-flex">
            {/* <ModalSignUp/> */}
            {/* <ModalLogIn/> */}
            {isAuthenticated && 
               <div className='text-success my-2 '>{user.name}</div>
            }
            {!isAuthenticated && <button className="btn btn-primary mx-2" onClick={()=>{login()}}>Log In</button> }
            
            {isAuthenticated && <button className="btn btn-primary mx-2" onClick={()=>{logo()}}>Log Out</button> }
            
            
            {/* <button className="btn btn-success">Sign Search</button> */}
            <Link to='/cartpage' style={{ textDecoration: 'none' }}>
              <button className="btn btn-primary mx-2 text-light">
                {cart_icon}
              </button>
            </Link>

          </div>

        </div>
      </nav>
    </div>
  )
}
