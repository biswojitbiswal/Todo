import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Store/Auth';
import {toast} from 'react-toastify'

function Logout() {
    const {logoutUser} = useAuth()

    useEffect(() => {
        logoutUser();
    }, [logoutUser]);

    if(logoutUser){
      toast.error("You are Logged Out")
    }


  return <Navigate to="/login" />;
}

export default Logout
