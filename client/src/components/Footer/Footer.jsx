import React from "react";
import { BiEnvelope,BiAlarm,BiMap,BiMobile } from "react-icons/bi";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import logo from '../../assets/all-images/Alwifak-blanc.png';
import { Link } from "react-router-dom";
import "../../styles/footer.css";

const quickLinks = [
  {
    path: "/about",
    display: "Nos Services",
  },

  {
    path: "#",
    display: "Mentions Légales",
  },

  {
    path: "/cars",
    display: "Voitures",
  },
  {
    path: "/contact",
    display: "Contactez-nous",
  },
];

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" md="4" sm="12">
            <div className="logo footer__logo">
              <h1>
                <Link to="/home" className=" d-flex align-items-center gap-2">
                  <img src={logo} alt='Logo' style={{width:'300px'}} />
                </Link>
              </h1>
            </div>
            <p className="footer__logo-content">
            Le plus grand parc de locations de voitures en Tunisie
            </p>
          </Col>

          <Col lg="2" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title">Acceuil</h5>
              <ListGroup>
                {quickLinks.map((item, index) => (
                  <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title mb-4">Siège social</h5>
              <p className="office__info"><BiMap/>18, 1001 Rue Fares El Khouri, Tunis</p>
              <p className="office__info"><BiMobile/> +216 25 214 025 / +216 29 060 530 <i class="ri-whatsapp-line"></i></p>

              <p className="office__info"><BiEnvelope/> contact@alwifakrentacar.com</p>

              <p className="office__info"><BiAlarm/> 5am - 8pm</p>
            </div>
          </Col>

          <Col lg="3" md="4" sm="12">
            <div className="mb-4">
              <h5 className="footer__link-title">Newsletter</h5>
              <p className="section__description">Subscribe our newsletter</p>
              <div className="newsletter">
                <input type="email" placeholder="Email" />
                <span>
                  <i class="ri-send-plane-line"></i>
                </span>
              </div>
            </div>
          </Col>

          <Col lg="12">
            <div className="footer__bottom">
              <p className="section__description d-flex align-items-center justify-content-center gap-1 pt-4">
                <i class="ri-copyright-line"></i>Copyright {year} :: Al wifak-rent a car :: www.alwifakrentacar.com
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
