import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Store/Auth';
import { toast } from 'react-toastify';
import Google from './Google';

function Register() {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    avatar: null,
    password: ""
  })

  const navigate = useNavigate();
  const {storeTokenInCookie, setUser} = useAuth()

  const handleInput = (e) => {
    setRegisterData({...registerData,
      [e.target.name]: e.target.value
    });
  }

  const handleFile = (e) => {
    const file = e.target.files[0];
    setRegisterData({ ...registerData, avatar: file });
  }

  // console.log(registerData)

  const handleRegisterData = async (e) => {
    e.preventDefault();

    if (!registerData.username || !registerData.email || !registerData.password || !registerData.avatar) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('username', registerData.username);
      formData.append('email', registerData.email);
      formData.append('password', registerData.password);
      formData.append('avatar', registerData.avatar);

      const response = await fetch(`todo-server-liard-omega.vercel.app/api/todo/users/register`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json()
      // console.log("data from server", data);

      if(response.ok){
        toast.success("User registered Succesfully")
        storeTokenInCookie(data.token);
        setUser(data.user)
        setRegisterData({username: "", email: "", avatar: "", password: ""})
        navigate("/")
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message)
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
};

  return (
    <>
      <section id="todo-form">
        <h1>Register Form</h1>
        <form onSubmit={handleRegisterData} className="registration-form">
          <div className='input-fields'>
            <label htmlFor="username">Username :</label>
            <input type="text" className="input-field" name="username" onChange={handleInput} value={registerData.username} placeholder='Your Username'
              id='username' required autoComplete='off' />
          </div>

          <div className='input-fields'>
            <label htmlFor="email">Email :</label>
            <input type="text" className="input-field" name="email" onChange={handleInput} value={registerData.email} placeholder='Your Email'
              id='email' required autoComplete='off' />
          </div>

          <div className='input-fields'>
            <label htmlFor="password">Password :</label>
            <input type="text" className="input-field" name="password" onChange={handleInput} value={registerData.password} placeholder='Your Password'
              id='password' required autoComplete='off' />
          </div>

          <div className='input-fields'>
            <label htmlFor="avatar">Avatar :</label>
            <input type="file" className="input-field" name="avatar" onChange={handleFile} placeholder='Your Photo'
              id='avatar' required autoComplete='off' />
          </div>


          <button type='submit' className='btn submit-btn register-btn'>Register</button>
          <Google />
        </form>
      </section>
    </>
  )
}

export default Register
