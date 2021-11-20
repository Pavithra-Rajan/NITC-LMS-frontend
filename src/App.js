import React from "react";
import "./styles.css";
import Login from "./components/login";
import Header from "./components/header";

export default function App() {
  return (
    <div className="App">
      <Header/>
      <Login />
     
    </div>
  );
}
