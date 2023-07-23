import React, { useState } from 'react'
import { cart_icon } from '../assets/Icons'
import { Link, Navigate, useParams } from 'react-router-dom'

export default function Navbar() {
  const [cat,setCat]=useState('Categories')
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" onClick={()=>{moveto("")}}>MyShop</Link>
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
          <div className="nav-items">
            <button className="btn btn-success mx-2">Sign In</button>
            <button className="btn btn-success">Sign Search</button>
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
