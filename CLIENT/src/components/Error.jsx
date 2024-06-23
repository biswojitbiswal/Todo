import React from 'react'
import {NavLink} from 'react-router-dom'

function Error() {
  return (
    <>
      <section id='error-page'>
            <h1 className='status-code'>404</h1>
            <h2 className='page-not'>Sorry! Page Not Found</h2>
            <p className='error-info'>Oops! It seems like the page you are trying to access doesn'texist. If you believe there is an issue, feel free to report it, and we'll look into it.</p>
            <div className="btns">
                <div>
                <NavLink to="/">
                    <button className='btn submit-btn'>Home</button>
                </NavLink>
                </div>

                <div>
                <NavLink to="/contact">
                    <button className='btn'>Report Problem</button>
                </NavLink>
                </div>
            </div>
      </section>
    </>
  )
}

export default Error
