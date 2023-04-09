// import './App.css';
import UserHome from "./component/UserHome/UserHome";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserLogin from "./component/UserLogin/UserLogin";
import UserRegister from "./component/UserRegister/UserRegister";
import AdminLogin from "./component/AdminLogin/AdminLogin";
import AdminHome from "./component/AdminHome/AdminHome";
import CreateUser from "./component/CreateUser/CreateUser";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import EditUser from "./component/EditUser/EditUser";

function App() {
  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.withCredentials = true;

  const {user, admin, refresh} = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/check-auth");
      dispatch({ type: "user", payload: { login: data.loggedIn, details:data.user } })
      let { data:adminData } = await axios.get("/admin/check-auth");
      dispatch({ type: "admin", payload: { login: adminData.loggedIn } })
    })()
  }, [refresh])
  console.log(user)
  return (
    <Router>
      <div className="App">
        {
          user.login === false &&
          <Routes>
            <Route path="/login" element={<UserLogin />}></Route>
            <Route path="/register" element={<UserRegister />}></Route>
            <Route path="/" element={ <Navigate to="/login" replace={true} />}></Route>
          </Routes>
        }
        {
          user.login === true &&
          <Routes>
            <Route path="/" element={<UserHome />}></Route>
            <Route path="/login" element={ <Navigate to="/" replace={true} />}></Route>
            <Route path="/register" element={ <Navigate to="/" replace={true} />}></Route>
          </Routes>
        }
        {
          admin.login === true &&
          <Routes>
            <Route path="/admin/" element={<AdminHome />}></Route>
            <Route path="/admin/create-user" element={<CreateUser />}></Route>
            <Route path="/admin/edit-user/:id" element={<EditUser />}></Route>
            <Route path="/admin/*" element={ <Navigate to="/admin/" replace={true} />}></Route>
          </Routes>
        }
        {
          admin.login === false &&
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />}></Route>
            <Route path="/admin/*" element={ <Navigate to="/admin/login" replace={true} />}></Route>
          </Routes>
        }
      </div>
    </Router>
  );
}

export default App;
