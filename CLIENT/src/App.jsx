import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todos from './components/Todos';
import Layout from './components/Layout';
import Register from './components/Register';
import Login from './components/Login';
import Contact from './components/Contact';
import User from './components/User';
import Error from './components/Error';
import Logout from './components/Logout';
import PassChange from './components/PassChange';
import DeleteLink from './components/DeleteLink';
import UpdateImage from './components/UpdateImage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Todos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user" element={<User />}>
            <Route path="passreset" element={<PassChange />} />
            <Route path="deleteuser/:id" element={<DeleteLink />} />
            <Route path="updateimage/:id" element={<UpdateImage />} />
          </Route>
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
