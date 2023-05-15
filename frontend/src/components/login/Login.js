import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../styles/Login.css";
import HeaderLogin from '../header_login/HeaderLogin';
import {Link} from "react-router-dom";


const Login = () => {  
  return (    
    <div className="Login">
    <div className='headerlog'>
      <HeaderLogin />
    </div>

    <div className='afterLog'>
      <Form>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Roll Number</Form.Label>
          <Form.Control autoFocus type="string"/>
        </Form.Group>
        
        <br />

        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" />
        </Form.Group>

        <br />

        <center>
        <div className = 'button'>
            <Link to = "/search">
              <Button className='login__button' block size="lg" type="submit">
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

export default Login;