import { useState, useEffect } from "react"
import React from 'react'
import { useAuth } from "../Store/Auth"
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

function Contact() {
  const [contact, setContact] = useState({
    email: "",
    message: "",
  })
  const [userData, setUserData] = useState(true)
  const navigate = useNavigate();

  const {user, authoriztionToken, isLoggedIn} = useAuth();

  useEffect(() => {
    // Redirect to login page if user is not logged in
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if(userData && user) {
    setContact({
      email: user.email,
      message: "",
    })

    setUserData(false);
  }

  const handleInput = (e) => {
    setContact({...contact,
      [e.target.name]: e.target.value
    })
  }

  const handleContact = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/todo/contact/form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authoriztionToken, 
        },
        body: JSON.stringify(contact)
      })

      const data = await response.json();
      console.log(data)
      if(response.ok){
        toast.success("Message delivered");
        setContact({
          message: "",
        })
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message)
      }
    } catch (error) {
      // toast.error("Mesage not delivered")
      console.log(error)
    }
  }

  return (
    <>
      <section id="todo-form">
        <h1>Contact Form</h1>
        <form onSubmit={handleContact} className="registration-form">

          <div className='input-fields'>
            <label htmlFor="email">Email</label>
            <input type="text" className="input-field" onChange={handleInput} value={contact.email} name="email" placeholder='Your Email'
              id='email' required autoComplete='off' />
          </div>

            <div className='input-fields'>
              <label htmlFor="message">Message</label>
              <textarea name="message" onChange={handleInput} value={contact.message} id="message" placeholder='Your Message' required autoComplete='off' cols="30" rows="10"></textarea>
            </div>

          <button type='submit' className='btn submit-btn'>Send</button>
        </form>
      </section>
    </>
  )
}

export default Contact
