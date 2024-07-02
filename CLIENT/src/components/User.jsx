import React, { useState, useEffect } from 'react'
import { useAuth } from '../Store/Auth'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function User() {
  const [editUser, setEditUser] = useState(false);
  const [changeUsername, setChangeUsername] = useState("")
  const navigate = useNavigate();

  const { user, authoriztionToken, setUser, isLoggedIn } = useAuth()

  useEffect(() => {
    // Redirect to login page if user is not logged in
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const editUsername = async(id) => {
    if(!editUser){
      setEditUser(true)
      setChangeUsername(user.username)
    } else {
      try {
        const response = await fetch(`https://todo-server-liard-omega.vercel.app/api/todo/users/editUserName/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authoriztionToken
          },
          body: JSON.stringify({username : changeUsername})
        })

        const data = await response.json()
        console.log(data)
        if(response.ok) {
          toast.success("Username changed")
          setUser(data.updateUser);
          setEditUser(false)
        } else {
          toast.error(data.extraDetails ? data.extraDetails : data.message)
        }
      } catch (error) {
        console.log(error)
      }

    }
  }
 
  return (
    <>
      <div className="details">
        <div className="user-avatar">
          <Link to={`/user/updateimage/${user._id}`}><img src={user.avatar} alt="Profile" /></Link>
        </div>
        <div className="edit-details">
          <div className="edit-username">
            <input type="text" className={editUser ? "show-input" : "editUsername"} name="username" onChange={(e) => setChangeUsername(e.target.value)} value={ editUser ? changeUsername : user.username} readOnly={!editUser} />

            <button onClick={() => editUsername(user._id)}>{editUser ? "📁" : "✏️"}</button>
          </div>

          <div className="change-pass">
            <Link className='pass-link' to={`/user/passreset`}>Password Change</Link>
          </div>

        <div className="dlt-user">
          <Link to={`/user/deleteuser/${user._id}`} className='dlt-link'>Delete Account</Link>
        </div>
        </div>
          
      </div>

    </>
  )
}

export default User
