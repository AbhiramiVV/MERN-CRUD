import React, { useState } from "react";
import "../UserLogin/userlogin.css";
import login from "../../images/login.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

function UserRegister() {
  const [name, setName] = useState("");
  const [proffession, setProffession] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage]=useState(null)
  const dispatch = useDispatch()
  function validationErr() {
    if (
      email.replaceAll(" ", "") === "" ||
      password.replaceAll(" ", "") === "" ||
      proffession.replaceAll(" ", "") === "" ||
      name.replaceAll(" ", "") === ""
    ) {
      return true;
    }
    return false;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validationErr()) {
      let {data}=await axios.post("/register", {
        name, email, password,proffession
      });
      if(!data.error){
        dispatch({type:"refresh"})
      }else{
        setErrMessage(data.message)
      }
    }
  }
  return (
    <section className="vh-100 login">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card">
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-flex align-items-center justify-content-center">
                  <img src={login} alt="login form" className="img-fluid" />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      {/* <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3"  ></i>
                    <span className="h1 fw-bold mb-0">Logo</span>
                  </div> */}

                      <h3 className="fw-normal mb-3 pb-3">
                        Create a new account
                      </h3>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example17">
                          Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control form-control-lg"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example17">
                          Email address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control form-control-lg"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example17">
                          Proffession
                        </label>
                        <input
                          type="text"
                          value={proffession}
                          onChange={(e) => setProffession(e.target.value)}
                          className="form-control form-control-lg"
                        />
                      </div>


                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example27">
                          Password
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control form-control-lg"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label text-danger" htmlFor="form2Example27">
                          {errMessage && errMessage}
                        </label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                          disabled={validationErr()}
                        >
                          Register
                        </button>
                      </div>

                      {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
                      <p className="mb-5 pb-lg-2">
                        Already have an account?{" "}
                        <Link to="/login">Login here</Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserRegister;
