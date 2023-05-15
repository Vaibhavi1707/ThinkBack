import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../styles/Register.css";
import {Link} from "react-router-dom";

const StudReg = () => {  
  return (
    <div className="Register">
      <Form>

      <Form.Group size="lg" controlId="email">
          <Form.Label>Student Roll Number</Form.Label>
          <Form.Control autoFocus type="string"/>
        </Form.Group>

        <br/>

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

        <Form.Group size="lg" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" />
        </Form.Group>

        <br/>
        <center>
        <Link to = "/search">
        <div className = 'button'>
            <Button className='register__button' block size="lg" type="submit">
                Register
            </Button>
        </div>
        </Link>
        </center>
      </Form>
    </div>
  );
}

export default StudReg;