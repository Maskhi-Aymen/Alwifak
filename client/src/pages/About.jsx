import React from "react";

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import AboutSection from "../components/UI/AboutSection";
import { Container, Row, Col } from "reactstrap";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";

import driveImg from "../assets/all-images/drive.jpg";
import OurMembers from "../components/UI/OurMembers";
import "../styles/about.css";

const About = () => {
  return (
    <Helmet title="About">
      <CommonSection title="Nos Services" />
      <AboutSection aboutClass="aboutPage" />

      <section className="about__page-section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div className="about__page-img">
                <img src={driveImg} alt="" className="w-100 rounded-3" />
              </div>
            </Col>

            <Col lg="6" md="6" sm="12">
              <div className="about__page-content">
                <h2 className="section__title">
                Nous nous engageons à fournir des solutions de conduite sûres
                </h2>

                <p className="section__description">
                C'est très agréable de disposer d'une voiture pour faire des excursions en Tunisie. RENTAL RIDE est une des possibilités dont on peut profiter.
                Effectivement RENTAL RIDE vous permet de faire ces excursions en se déplaçant vers les plus beaux sites de la Tunisie, visiter les musées ou les sites ou les monuments historiques et autres, RENTAL RIDE vous offre cette opportunité.
                Etre libre et se déplacer à sa guise n'importe quand et n'importe où, est une offre qui vous est dotée par RENTAL RIDE où vous pourrez disposer d'une voiture adéquate pour ces déplacements à plein temps.
                Mais en ce qui concerne les prix, RENTAL RIDE vous propose des prix plus que promotionnels.
                </p>

                <p className="section__description">
                Oui, c'est une excellente initiative ! Le fait de décider de disposer 
                d'une voiture de location en Tunisie chez RENTAL RIDE vous permet de réaliser, 
                vous assure un gain de dépenses très important. Cette formule de location de voiture en tunisie 
                vous aide à faire des économies. Certes c'est une faculté dont vous devez en profiter auprès de RENTAL RIDE qui vous attend.

                </p>

                <div className=" d-flex align-items-center gap-3 mt-4">
                  <span className="fs-4">
                    <i class="ri-phone-line"></i>
                  </span>

                  <div>
                    <h6 className="section__subtitle">Besoin d’aide?</h6>
                    <h4>+216 25 214 025</h4>
                  </div>
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

export default About;
