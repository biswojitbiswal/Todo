import React, { useState } from 'react'
import { useAuth } from '../Store/Auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function PassChange() {
    const [changePass, setChangePass] = useState({})


    const {setUser, authoriztionToken} = useAuth()
    const navigate = useNavigate()

    const handlePass = (e) => {
        setChangePass({...changePass, 
            [e.target.name] : e.target.value
        })
    }

    const passwordReset = async(e) => {
        e.preventDefault();

        try {
          const response = await fetch(`todo-server-liard-omega.vercel.app/api/todo/users/passChange`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: authoriztionToken
            },
            body: JSON.stringify(changePass)
          })

          const data = await response.json()
          console.log(data.upadatedUser)

          if(response.ok){
            toast.success("Password reset successfully")
            setUser(data.upadatedUser)
            setChangePass("")
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
        <h1>Reset Password</h1>
        <form onSubmit={passwordReset} className="registration-form">

          <div className='input-fields'>
            <label htmlFor="opassword">Old Password : </label>
            <input type="password" className="input-field" name="opassword" onChange={handlePass} value={changePass.opassword}  placeholder='Your Old Password'
              id='opassword' required autoComplete='off' />
          </div>

          <div className='input-fields'>
            <label htmlFor="cpassword">New Password : </label>
            <input type="password" className="input-field" name="cpassword" onChange={handlePass} value={changePass.cpassword} placeholder='Your New Password'
              id='cpassword' required autoComplete='off' />
          </div>

          <button type='submit' className='btn submit-btn'>Reset</button>
        </form>
      </section>
    </>
  )
}

export default PassChange
