import React from "react";
import "./styles.css";
import Login from "./components/login";
import Navbar from "./components/Navbar";


import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
export default function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route path='/login'>

            <Login/>

        </Route>

        <Route path='/profile'>
          <Navbar/>
        </Route>
        <Route path='/profile/request'>
          <div>
          <Navbar/>
          
          </div>
          
        </Route>

      </Switch>
    </div>
    </Router>
  );
}
