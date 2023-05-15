import React from "react";
import Logo from "../../media/think.png";
import SearchIcon from '@material-ui/icons/Search';
import '../../styles/Header.css'
import {Link} from "react-router-dom"

const index = () => {
  return (
  <div className="header">
    <div className="header__logo">
        <img src = {Logo} alt="" />
        <span>ThinkBack</span>
    </div>

    <div className="header__searchContainer">
        <div className="header__searchBar">
            <input type="text" placeholder="Search" />  
            <Link to = "/course"><SearchIcon /></Link>
        </div>
    </div>

  </div>
  );
}

export default index