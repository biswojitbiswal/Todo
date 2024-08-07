import './App.css'
import { BrowserRouter, Routes, RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Todos from './components/Todos'
// import Layout from './components/Layout'
import Register from './components/Register'
import Login from './components/Login'
import Contact from './components/Contact'
import User from './components/User'
import Error from './components/Error'
import Logout from './components/Logout'
import PassChange from './components/PassChange'
import DeleteLink from './components/DeleteLink'
import UpdateImage from './components/UpdateImage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

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
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path='/' element={<Todos />} /> {/* Nested route for Todos */}
          <Route path="/login" element={<Login />} /> {/* Nested routes for other components */}
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/passreset" element={<PassChange />} />
          <Route path="/user/deleteuser/:id" element={<DeleteLink />} />
          <Route path="/user/updateimage/:id" element={<UpdateImage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
