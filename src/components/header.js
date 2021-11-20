import logo from './logoblack.png';
import "./login.css";
const Header = () => {
    return ( 
    <div className="titlename">
      <img src={logo} alt="logo" />
      <h1>NITC Library Management System</h1>
    </div>
     );
}
 
export default Header;