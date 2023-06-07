import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/contact.css";

const socialLinks = [
  {
    url: "https://www.facebook.com/AlWifakRentCar",
    icon: "ri-facebook-line",
  },
  {
    url: "https://www.instagram.com/alwifak_rent_a_car/",
    icon: "ri-instagram-line",
  },
  {
    url: "#",
    icon: "ri-linkedin-line",
  },
  {
    url: "#",
    icon: "ri-twitter-line",
  },
];

const Contact = () => {
  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Contactez-nous</h6>

              <Form>
                <FormGroup className="contact__form">
                  <Input placeholder="Nom et Prénom" type="text" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input placeholder="E-mail" type="email" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                    rows="5"
                    placeholder="Message"
                    className="textarea"
                  ></textarea>
                </FormGroup>

                <button className=" contact__btn" type="submit">
                  Soumettre
                </button>
              </Form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold"> Nos Coordonnées</h6>
                <p className="section__description mb-0">
                18, 1001 Rue Fares El Khouri, Tunis
                </p>
                <div className=" d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className="section__description mb-0">+216 25 214 025 / +216 29 060 530 <i class="ri-whatsapp-line"></i></p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">contact@alwifakrentacar.com</p>
                </div>

                <h6 className="fw-bold mt-4">Suivez-nous</h6>

                <div className=" d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                      <a href={item.url} key={index}
                      className="social__link-icon">
                      <i class={item.icon}></i>
                      </a>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div class="curved-div">
      <svg viewBox="0 0 1440 319">
      <path fill="#093F57" fill-opacity="1" d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
 </svg>
</div>
    </Helmet>
  );
};

export default Contact;
