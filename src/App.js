import './App.css';
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { SnackbarProvider } from "notistack";
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Home from './components/dashboard/home';
import ProtectedRoute from './components/auth/protectedRoutes';
import GroupMessages from './components/messages/groupMessages';

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Routes>
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/signup' element={<Signup />} />
        <Route 
          path='/home' 
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/group/:groupId"
          element={
            <ProtectedRoute user={user}>
              <GroupMessages />
            </ProtectedRoute>
          }
        />
      </Routes>
    </SnackbarProvider>
  );
}

export default App;