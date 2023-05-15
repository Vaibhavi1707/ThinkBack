import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../styles/Register.css";
import { Link } from 'react-router-dom';
import HeaderLogin from '../header_login/HeaderLogin';

const AdminLogin = () => {  
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

        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" />
        </Form.Group>

        <br />

        <Form.Group size="lg" controlId="email">
          <Form.Label>Class Name</Form.Label>
          <Form.Control autoFocus type="string"/>
        </Form.Group>

        <br/>        <center>
        <div className = 'button'>
            <Link to = "/recording">
            <Button className='register__button' block size="lg" type="submit">
                Login
            </Button>
            </Link>
        </div>
        </center>
      </Form>
      </div>
    </div>
  );
}

export default AdminLogin;