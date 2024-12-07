import './App.css';
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from './components/auth/login';
import Signup from './components/auth/signup';

function App() {
  const [token, setToken] = useState();
  useEffect(() => {
    if (token) {
      console.log("Token: ", token);
    }
  }, [token]);
  return (
    <div className=''>
      <Routes>
        <Route path='/login' element={<Login setToken={setToken}/>} />
      </Routes>
    </div>
  );
}

export default App;
