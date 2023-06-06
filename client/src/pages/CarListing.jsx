import React from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData";
import { useState,useEffect } from "react";
import axios from "axios";

const CarListing = () => {
  const[carData,setCarData]=useState([]);

  useEffect(() => {
   const fetchData = async () => {
     
       
     try {
       const result = await axios.get(process.env.REACT_APP_API_URL+`/cars/getall`);
       setCarData(result.data)
     } catch(err) {
       console.log("Error!");
     }
     
   }
   fetchData();
 
 },[])
  return (
    <Helmet title="Cars">
      <CommonSection title="Nos Voitures" />

      <section>
        <Container>
          <Row>

            {carData.map((item) => (
              <CarItem item={item} key={item._id} />
            ))}
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

export default CarListing;
