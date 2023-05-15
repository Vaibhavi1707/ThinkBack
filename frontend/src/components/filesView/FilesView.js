import React from 'react'
import '../../styles/FilesView.css'
import FileCard from './FileCard'
import Header from "../header";

const FilesView = () => {
  return (
    <div className='filesView'>
       <Header />
        <div className='filesView__row1'>
            {/*Cards row*/}
            <FileCard name = {"Sub 1"}/>
            <FileCard name = {"Sub 2"}/>
            <FileCard name = {"Sub 3"}/>
            </div>
        
        <div className='filesView__row2'>
            <FileCard name = {"Sub 4"}/>
            <FileCard name = {"Sub 5"}/>
            <FileCard name = {"Sub 6"}/>
        </div>
    </div>
  )
}

export default FilesView;