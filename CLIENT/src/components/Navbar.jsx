import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../Store/Auth'


function Navbar() {

  const {isLoggedIn, user} = useAuth()
  // console.log(user)
   
  return (
    <>
      <header id="navbar">
        <div className="user-menu">
          <div className="nav-btn">
              <NavLink className="user-icon" to="/user">{isLoggedIn ? <img src={user.avatar} alt="" /> :<FaUser />}</NavLink>
          </div>
          <NavLink className="nav-list" to="/">{user && user.username ? user.username.toUpperCase() : "User"}</NavLink>
        </div>
        <div className="nav-link">
            <ul>
              { isLoggedIn ? (<li>
                    <NavLink className="nav-list" to="/logout">Logout</NavLink>
                </li>
                ) : (
                  <>
                    <li>
                      <NavLink className="nav-list" to="/register">Register</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-list" to="/login">Login</NavLink>
                    </li>
                </>
                ) }
                
                
            </ul>
            
        </div>
      </header>
    </>
  )
}

export default Navbar
