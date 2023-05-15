import React from 'react'
import Record from "../../media/record.svg";
import "../../styles/Recording.css";

const Recording = () => {
  return (
    <div className="recording__image">
        <center>
    <img src = {Record} alt="" />
    <br />
    <span>Recording in Progress</span>
    </center>
</div>
  )
}

export default Recording