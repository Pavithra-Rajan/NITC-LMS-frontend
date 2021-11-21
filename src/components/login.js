import React from "react";
import logo from './logoblack.png';
import "./login.css";

export default function Login() {
  const toggleForm = () => {
    const container = document.querySelector(".container");
    container.classList.toggle("active");
  };

  return (
    
    <section>
      <div className="titlename">
      <img src={logo} alt="logo" />
      <h1>NITC Library Management System</h1>
    </div>
      <div className="container">
        <div className="user signinBx">
          <div className="imgBx">
            <img
              src="https://images.pexels.com/photos/1926988/pexels-photo-1926988.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
            />
          </div>
          <div className="formBx">
            <form action="">
              <h2>Log In</h2>
              <input type="text" minLength="9" maxLength="9" name="" placeholder="Roll Number/Employee ID" />
              <input type="password" name="" placeholder="Password" />
              <input type="submit" name="" value="Login" />
              <p className="signup">
                Don't have an account? 
                <a href="#" onClick={toggleForm}>
                  Register.
                </a>
              </p>
            </form>
          </div>
        </div>
        <div className="user signupBx">
          <div className="formBx">
            <form action="">
              <h2>Register as a member</h2>
              <input type="text" name="" placeholder="Username" />
              <input type="text" minLength="9" maxLength="9" name="" placeholder="Roll Number/Employee ID" />
              <input type="email" name="" placeholder="Email Address" />
              <input type="password" name="" placeholder="Password" />
              <input type="tel" minLength="10" maxLength="10" name="" placeholder="Phone" />
              <input type="" placeholder="Department" list="dept" />
                  <datalist id="dept">
                    <option>Department of Architecture</option>
                    <option>Department of Chemical Engineering</option>
                    <option>Department of Chemistry</option>
                    <option>Department of Civil Engineering</option>
                    <option>Department of Computer Science and Engineering</option>
                    <option>Department of Electrical Engineering</option>
                    <option>Department of Electronics and Communication Engineering</option>
                    <option>Department of Mathematics</option>
                    <option>Department of Mechanical Engineering</option>
                    <option>Department of Physics</option>
                    <option>School of Bio-technology</option>
                    <option>School of Management Studies</option>
                    <option>School of Nano Science and Technology</option>
                  </datalist>
              <input type="submit" name="" value="Register" />
              <p className="signup">
                Already have an account ?
                <a href="#" onClick={toggleForm}>
                  Log In.
                </a>
              </p>
            </form>
          </div>
          <div className="imgBx">
            <img
              src="https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
