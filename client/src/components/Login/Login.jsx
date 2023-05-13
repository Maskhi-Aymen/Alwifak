import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, FormGroup, Card } from "reactstrap";
import { Container, Row, Col } from "reactstrap";

const Login = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();


    try {

      const { data } = await axios.post("/api/users/login", {
        username,
        password
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "
        }
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success('Login Successfull!');
      navigate('/');

    } catch (error) {
      console.log(error);
      toast.error('Invalid password or username!');
    }
  }

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      localStorage.getItem("userInfo");
      navigate('/');
    }
  })

  return (
    <Container className="d-flex min-vh-100">
      <Row className="m-auto align-self-center">
        <Col lg="15" className="mb-5 text-center">
          <Card>
          <Form className="form" onSubmit={submitHandler} >
              <h3 className='form-title'>Connectez-vous</h3>
              <FormGroup className="contact__form" >
                <div><label htmlFor="username">E-mail</label></div>
                <input type="text" onChange={(e) => setUsername(e.target.value)} className='input' id='username' required />
              </FormGroup>
              <FormGroup className="contact__form">
               <div><label htmlFor="password">Mot de passe</label></div> 
                <input type="password" onChange={(e) => setPassword(e.target.value)} className='input' id='password' required />
              </FormGroup>
              <FormGroup className="contact__form">
                <button className=" btn comment__btn mt-3" >Connecter</button>
              </FormGroup>
              <FormGroup >
                <p>Vous n’avez pas de compte? <a href="/register" className='form-link'>s’inscrire</a></p>
              </FormGroup>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login