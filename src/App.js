import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Inbox from './components/Inbox';
import Login from './components/Login'
import Signup from './context/signup';
import NoteState from './context/NoteState';
import {
  BrowserRouter as Router,
  Routes,
  Route

} from "react-router-dom";
function App() {
  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
      <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/inbox' element={<Inbox />}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signin' element={<Signup/>}></Route>
      </Routes>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
