import React, { useState } from 'react'
import { useAuth } from '../Store/Auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function DeleteLink() {
    const [delPass, setDelPass] = useState("")

    const {user, authoriztionToken, logoutUser} = useAuth()
    const navigate = useNavigate()

    const handleDeleteAc = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch(`https://todo-api-livid.vercel.app/api/todo/users/deleteUser/${user._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authoriztionToken,
                },
                body: JSON.stringify({password : delPass})
            })

            const data = await response.json()
            console.log(data)

            if(response.ok){
                logoutUser()
                toast.error("Account deleted")
                setDelPass("")
                navigate("/register")
            } else {
                toast.error(data.extraDetails ? data.extraDetails : data.message)
            }
        } catch (error) {
            console.log("error")
        }
    }
  return (
    <>
      <section id="todo-form">
        <h1>Delete Your Account</h1>
        <form onSubmit={handleDeleteAc} className="registration-form">

          <div className='input-fields'>
            <label htmlFor="password">Password : </label>
            <input type="password" onChange={(e) => setDelPass(e.target.value)} className="input-field" name="password" value={delPass} placeholder='Your Password'
              id='password' required autoComplete='off' />
          </div>

          <button type='submit' className='btn submit-btn'>Delete</button>
        </form>
      </section>
    </>
  )
}

export default DeleteLink
