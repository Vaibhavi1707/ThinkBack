import React from "react";
import Logo from "../../media/think.png";
import '../../styles/Header.css'

const HeaderLogin = () => {
  return (
  <div className="header">
    <div className="header__logo">
        <img src = {Logo} alt="" />
        <span>ThinkBack</span>
    </div>
  </div>
  );
}

export default HeaderLogin