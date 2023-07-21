import React from 'react'
import { cart_icon } from '../assets/Icons'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">MyShop</a>
    <div className="nav-items">
        <button className="btn btn-success mx-2">Sign In</button>
        <button className="btn btn-success">Sign Search</button>
          <Link to='/cartpage' style={{textDecoration:'none'}}>
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
