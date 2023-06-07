import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import FindCarForm from "../components/UI/FindCarForm";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import CarItem from "../components/UI/CarItem";
import logo from '../assets/all-images/Alwifak-blanc.png'


const Home = () => {

  const[carData,setCarData]=useState([]);

  useEffect(() => {
   const fetchData = async () => {
     
       
     try {
       const result = await axios.get(`https://54.37.11.213:3000/api/cars/getall`);
       if(typeof(result.data)!='string'){
       setCarData(result.data)}
     } catch(err) {
       console.log("Error!");
     }
     
   }
   fetchData();
 
 },[])
  return (
    <Helmet title="Home">
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />
        <div className="hero__form">
          <Container>
            <Row className="form__row">
              <Col lg="4" md="4">
                <div className="find__cars-left" style={{borderRadius:"5%",height:"100%"}}>
                  <center><img src={logo} style={{width:'335px'}}/>
                  <h3 style={{color:'white'}}>Réservez dès maintenant chez Al Wifak Rent Car</h3></center>
                </div>
              </Col>

              <Col lg="8" md="8" sm="12" >
                <FindCarForm />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/* =========== about section ================ */}
      <AboutSection />
      {/* ========== services section ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center" >
              <h6 className="section__subtitle">On Vous Offre</h6>
              <h2 className="section__title">Des Services</h2>
            </Col>

            <ServicesList />
          </Row>
        </Container>
      </section>
      {/* =========== car offer section ============= */}
      <div class="curved-div">
 

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">DES PRIX</h6>
              <h2 className="section__title">IMBATTABLES !</h2>
            </Col>

            {carData.slice(0, 6).map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section> 
      <svg viewBox="0 0 1440 319">
   <path fill="#093F57" fill-opacity="1" d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
 </svg>
</div>
      {/* =========== testimonial section ===========
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Nos clients disent</h6>
              <h2 className="section__title">Témoignages</h2>
            </Col>
<Testimonial/>
           
          </Row>
        </Container>
      </section>
      */}
    </Helmet>
  );
};

export default Home;
