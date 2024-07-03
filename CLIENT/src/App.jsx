import './App.css'
import { BrowserRouter as Router, Routes, RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Todos from './components/Todos'
import Layout from './components/Layout'
import Register from './components/Register'
import Login from './components/Login'
import Contact from './components/Contact'
import User from './components/User'
import Error from './components/Error'
import Logout from './components/Logout'
import PassChange from './components/PassChange'
import DeleteLink from './components/DeleteLink'
import UpdateImage from './components/UpdateImage'

function App() {
    //  const router = createBrowserRouter(
    //    createRoutesFromElements(
    //      <Route path='' element={<Layout />}>
    //        <Route path='/' element={<Todos />} />
    //        <Route path='/login' element={<Login />} />
    //        <Route path='/register' element={<Register />} /> 
    //        <Route path='/contact' element={<Contact />} />
    //        <Route path="/user" element={<User />} />
    //          <Route path="/user/passreset" element={<PassChange />} />
    //          <Route path="/user/deleteuser/:id" element={<DeleteLink />} />
    //          <Route path='/user/updateimage/:id' element={<UpdateImage />} />
    //        <Route path='/logout' element={<Logout />} />
    //        <Route path='*' element={<Error />} />
    //      </Route>
      
    //    )
    //  )
  return (
    <>
      <Router>
        <Routes>
          <Route path='' element={<Layout />}>
           <Route path='/' element={<Todos />} />
           <Route path='/login' element={<Login />} />
           <Route path='/register' element={<Register />} /> 
           <Route path='/contact' element={<Contact />} />
           <Route path="/user" element={<User />} />
             <Route path="/user/passreset" element={<PassChange />} />
             <Route path="/user/deleteuser/:id" element={<DeleteLink />} />
             <Route path='/user/updateimage/:id' element={<UpdateImage />} />
           <Route path='/logout' element={<Logout />} />
           <Route path='*' element={<Error />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
