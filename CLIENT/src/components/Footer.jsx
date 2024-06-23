import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <>
      <footer id='dev-info'>
            <p>Designed and Devloped by Biswojit</p>
            <NavLink className="nav-list" to="/contact">Contact Us</NavLink>
      </footer>
    </>
  )
}

export default Footer
