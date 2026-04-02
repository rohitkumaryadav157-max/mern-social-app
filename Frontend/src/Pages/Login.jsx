import { useState } from "react";
import axios from "axios";
import "./login.css";
import {toast} from 'react-toastify'

import { useNavigate } from "react-router-dom";
function Login() {
  const [c, setC] = useState(true);
  const navigate = useNavigate();

  // LOGIN STATE
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // SIGNUP STATE
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // HANDLE LOGIN INPUT
  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  // HANDLE SIGNUP INPUT
  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });
  };

  // 🔐 LOGIN FUNCTION
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", loginData);

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success('Login Success🎉🎉');
        

        // redirect (optional)
        navigate("/feed");
      } else {
        alert(res.data.msg);
      }

    } catch (err) {
      console.log(err);
    }
  };

  // 📝 SIGNUP FUNCTION
  const handleSignup = async () => {
    if (signupData.password !== signupData.confirmPassword) {
      return toast.error("Passwords do not match ");
    }

    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", signupData);

      toast.success("Signup Success ");
      setC(true); // switch to login

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {c ? (
        // 🔐 LOGIN UI
        <div className="login-wrapper">
          <div className="login-box">
            <h1 className="logo">Login Page</h1>

            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input"
              onChange={handleLoginChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input"
              onChange={handleLoginChange}
            />

            <button className="login-btn" onClick={handleLogin}>
              Login
            </button>

            <p className="forgot">
              Login with <b>Social Page</b>
            </p>

            <div className="divider">
              <span><hr /></span>
            </div>

            <p className="fb-login">
              <i className="fa-brands fa-forumbee"></i> Social Page .COM
            </p>

            <p className="signup">
              Don't have an account?
              <button className="btn">
                <b onClick={() => setC(!c)}> Sign Up</b>
              </button>
            </p>
          </div>
        </div>

      ) : (
        // 📝 SIGNUP UI
        <div className="login-wrapper">
          <div className="login-box">
            <h1 className="logo">Create an Account</h1>

            <input
              className="input light"
              placeholder="Username"
              name="username"
              onChange={handleSignupChange}
            />

            <input
              className="input light"
              placeholder="Email Address"
              name="email"
              onChange={handleSignupChange}
            />

            <input
              className="input light"
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleSignupChange}
            />

            <input
              className="input light"
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              onChange={handleSignupChange}
            />

            <button className="login-btn" onClick={handleSignup}>
              Register
            </button>

            <p className="forgot">
              Sign Up with <b>Social Page</b>
            </p>

            <div className="divider">
              <span><hr /></span>
            </div>

            <p className="fb-login">
              <i className="fa-brands fa-forumbee"></i> Social Page .COM
            </p>

            <p className="signup">
              You have an account?
              <button className="btn">
                <b onClick={() => setC(!c)}> Sign In</b>
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;