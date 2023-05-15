// const instiName = req.body.instiName;
// const instiPassword = req.body.instiPassword;
// const confPassword = req.body.confPassword;
// const instiStudentsCSV = req.body.studentsCSV;
// const currClassroom = req.body.currClassroom;
// const timetableCSV = req.body.timetableCSV;

import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../styles/Register.css";
//import UploadFileIcon from '../../../node_modules/@material-ui/icons/UploadFile';
import CloudUploadIcon from '../../../node_modules/@material-ui/icons/CloudUpload';
import { Link } from 'react-router-dom';
import HeaderLogin from '../header_login/HeaderLogin';

const Register = () => {  
  return (
    <div className="Register">
      <HeaderLogin />
    <div className='afterLog'>
      <Form>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Institute Name</Form.Label>
          <Form.Control autoFocus type="string"/>
        </Form.Group>

        <br/>

        {/* <Form.Group size="lg" controlId="password">
          <Form.Label>Upload <CloudUploadIcon /> </Form.Label>
          <Form.Control type="password" />
        </Form.Group>

        <br /> */}


        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" />
        </Form.Group>

        <br />

        <Form.Group size="lg" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" />
        </Form.Group>

        <br/>

        <center>
        <div className = 'button'>
            <Button className='upload_students__button' block size="lg" type="submit">
                <span>Upload List of Students  <CloudUploadIcon /></span>
            </Button>
        </div>
        </center>
        <br/>

        <Form.Group size="lg" controlId="email">
          <Form.Label>Classroom Name</Form.Label>
          <Form.Control autoFocus type="string"/>
        </Form.Group>

        <br/>
        <center>
        <div className = 'button'>
            <Button className='upload_students__button' block size="lg" type="submit">
                <span>Upload Time-Table <CloudUploadIcon/></span>
            </Button>
        </div>
        </center>
        <br/>
        <center>
        <div className = 'button'>
        <Link to = "/recording">
            <Button className='register__button' block size="lg" type="submit">
                Register
            </Button>
        </Link>
        </div>
        </center>
      </Form>
      </div>
    </div>
  );
}

export default Register;