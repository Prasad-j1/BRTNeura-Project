
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/LoginPage';
import CreateIdea from './Pages/CreateIdea';
import DashBoard from './Pages/DashBoard';
import SignUp from './Pages/SignUp';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Sign-Up' element={<SignUp />} />
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='/create-idea' element={<CreateIdea />} />
        </Routes>
      </Router>
    </>
  )
}

export default App



