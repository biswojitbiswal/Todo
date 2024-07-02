import React from 'react'
import google from '../Images/Google.png'
import {GoogleAuthProvider, signInWithPopup, getAuth} from '@firebase/auth'
import {app} from '../Firebase'
import { useAuth } from '../Store/Auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Google() {
    const {storeTokenInCookie, setUser } = useAuth()
    const navigate = useNavigate()

    const handleGoogleClick = async() => {
        try {
            const provider = new GoogleAuthProvider();           
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider);
            // console.log(result)
            // console.log(result.user.displayName)
            const { displayName, email, photoURL } = result.user;
            const formData = new FormData();
            formData.append('username', displayName);
            formData.append('email', email);
            formData.append('avatar', photoURL);

            const res = await fetch(`https://todo-server-liard-omega.vercel.app/api/todo/users/google`, {
                method: "POST",
                body: formData,
            })
            const data = await res.json()
            // console.log(data)
            if(res.ok){
                toast.success("User registered Succesfully")
                storeTokenInCookie(data.token);
                setUser(data.user)
                navigate("/")
              } else {
                toast.error(data.extraDetails ? data.extraDetails : data.message)
              }
          
        } catch (error) {
            console.log(error);
            toast.error('An error occurred. Please try again later.');
        }
        
    }
  return (
    <>
        <button onClick={handleGoogleClick} type='button' className='btn submit-btn google-btn'>
            <img src={google} alt="google" />
            <span>CONTINUE WITH GOOGLE</span>
        </button>
    </>
  )
}

export default Google
