import React from 'react'
import Search from "../../media/search.svg";
import "../../styles/Recording.css";
import Header from "../header";
import {Link} from "react-router-dom";

const FileSearch = () => {
  return (

    <div className="filesearch__image">
                <Header />
        <center>
        <img src = {Search} alt="" />
        <br />
    <span>Search for transcripts</span>
        </center>
    </div>
  )
}

export default FileSearch