import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { Form, FormGroup, Card } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
 
const Register = () => {

  const navigate = useNavigate();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfrimPassword] = useState();

    const submitHandler = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            toast.error('Passwords doesn`t match!');
            return;
        }

        try {

          await axios.post("/users/register", {
              username,
              password,
          },{
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer "
            }
          });
          toast.success('Registration Successfull!');
          navigate('/login');


      } catch(error) {
        console.log(error);
        toast.error('Error, Try again!');
      }
    }

    useEffect(() => {
      if(localStorage.getItem("userInfo")) {
        localStorage.getItem("userInfo");
        navigate('/');
      }
    })

  return (
    <Container className="d-flex min-vh-100">
    <Row className="m-auto align-self-center">
      <Col lg="15" className="mb-5 text-center">
        <Card>
          <Form className="form" onSubmit={submitHandler}>
            <h3 className='form-title'>Registre</h3>
            <FormGroup className="contact__form">
              <div><label htmlFor="username">E-mail</label></div>
              <input type="text" onChange={(e) => setUsername(e.target.value)} className='input' id='username' required />
            </FormGroup>
            <FormGroup className="contact__form">
              <div><label htmlFor="password">Mot de passe</label></div>
              <input type="password" onChange={(e) => setPassword(e.target.value)} className='input' id='password' required />
            </FormGroup>
            <FormGroup className="contact__form">
              <div><label htmlFor="rpassword">Retaper Mot de passe</label></div>
              <input type="password" onChange={(e) => setConfrimPassword(e.target.value)} className='input' id='rpassword' required />
            </FormGroup>
            <FormGroup className="contact__form">
            <button className=" btn comment__btn mt-3" style={{ color: 'white' }}>Registre</button>
            </FormGroup>
            <FormGroup className="contact__form">
              <p>Vous avez un compte? <a href="/login" className='form-link'>connecter</a></p>
            </FormGroup>
          </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Register