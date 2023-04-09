import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import signin from "../../images/signin.jpg";
import { Link, useNavigate } from 'react-router-dom'
import "./userlogin.css"

function UserLogin() {
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [errMessage, setErrMessage]=useState(null)
    const dispatch = useDispatch();
    function validationErr(){
        if(email.replaceAll(' ', "")==="" || password.replaceAll(' ',"")===""){
            return true
        }
        return false
    }
    async function handleSubmit(e){
      e.preventDefault();
    if (email.trim()&&password.trim()) {
      let {data}= await axios.post("/login", {
        email, password
      });
      if(!data.error){
        dispatch({type:"refresh"})
      }else{
        setErrMessage(data.message)
      }
    }
    }
  return (
    <section className="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" >
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img src={signin}
                alt="login form" className="img-fluid"  />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">

                <form onSubmit={handleSubmit}>

                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3"  ></i>
                    <span className="h1 fw-bold mb-0">User Login</span>
                    
                  </div>

                  <h5 className="fw-normal mb-3 pb-3"  >Sign into your account</h5>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example17">Email address</label>
                    <input type="email" id="form2Example17" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control form-control-lg" />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example27">Password</label>
                    <input type="password" id="form2Example27" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control form-control-lg" />
                  </div>
                  <div className="form-outline mb-4">
                        <label className="form-label text-danger" htmlFor="form2Example27">
                          {errMessage && errMessage}
                        </label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" type="submit" disabled={validationErr()}>Login</button>
                  </div>

                  {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
                  <p className="mb-5 pb-lg-2" >Don't have an account? <Link to="/register"
                     >Register here</Link></p>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default UserLogin