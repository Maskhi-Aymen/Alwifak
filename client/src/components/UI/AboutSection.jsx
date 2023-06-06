import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/all-images/cars-img/2.png";

const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about__section"
      style={
        aboutClass === "aboutPage"
          ? { marginTop: "0px" }
          : { marginTop: "280px" }
      }
    >
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__section-content">
              <h4 className="section__subtitle">Al Wifak</h4>
              <h2 className="section__title">Bienvenue au service de location de voiture</h2>
              <p className="section__description">
              Al Wifak vous propose une large gamme de services de location de véhicules.
              Nous voulons vous aider dans vos déplacements et vous donner accès aux véhicules
              correspondant à vos besoins pour tous vos déplacements. Retrouvez tous nos services,
              de la location en aller simple jusqu’à la réservation ainsi que
              les différentes options possibles et réservables .
              </p>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Location des voitures en Tunisie
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Des voitures à boite automatique
                </p>
              </div>

              <div className="about__section-item d-flex align-items-center" >
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i>Location voitures aux aéroports
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Des prix plus que promotionnels
                </p>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
