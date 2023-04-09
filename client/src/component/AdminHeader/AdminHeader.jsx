import axios from 'axios';
import React from 'react'
import { FiSearch } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './AdminHeader.css'
function AdminHeader({search, setSearch}) {
  const dispatch=useDispatch();
  async function logout(){
    if(window.confirm("are you sure logout")){

      await axios.get("/admin/logout");
      dispatch({type:"refresh"})

    }
  }
  return (
    <div className="navBar">
      <div className="navContainer">
        
        <div className="nav-sec 1">
          <div className="searchBox">
            <input type="text" placeholder='search user' value={search} onChange={(e)=>setSearch(e.target.value)} />
            <FiSearch></FiSearch>
          </div>
          <Link to="/admin/create-user">
          <button className='btn btn-dark'>Create User</button>
          </Link>

        </div>
        <div className="nav-sec 2">
            <button className='btn btn-dark' onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default AdminHeader