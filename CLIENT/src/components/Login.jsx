import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Store/Auth';
import {toast} from 'react-toastify'
import Google from './Google';

function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()
  const {storeTokenInCookie, setUser} = useAuth()

  const handleLoginInput = (e) => {
    setLogin({...login,
      [e.target.name] : e.target.value
    });
  }

  const handleLoginData = async(e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://todo-api-livid.vercel.app/api/todo/users/login`, {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(login)
      })

      const data = await response.json()
      // console.log("data from server", data);

      if(response.ok){
        toast.success("User logged in")
        storeTokenInCookie(data.token)
        // console.log(data.user)
        setUser(data.user);
        setLogin({email: "", password: ""})
        navigate("/")
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <>
      <section id="todo-form">
        <h1>Login Form</h1>
        <form onSubmit={handleLoginData} className="registration-form">

          <div className='input-fields'>
            <label htmlFor="email">Email</label>
            <input type="text" className="input-field" name="email" onChange={handleLoginInput} value={login.email} placeholder='Your Email'
              id='email' required autoComplete='off' />
          </div>

          <div className='input-fields'>
            <label htmlFor="password">Password</label>
            <input type="text" className="input-field" name="password" onChange={handleLoginInput} value={login.password} placeholder='Your Password'
              id='password' required autoComplete='off' />
          </div>

          <button type='submit' className='btn submit-btn register-btn'>Login</button>
          <Google />
        </form>
      </section>
    </>
  )
}

export default Login
