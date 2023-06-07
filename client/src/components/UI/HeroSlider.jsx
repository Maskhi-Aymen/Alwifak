import React from "react";

import Slider from "react-slick";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

import "../../styles/hero-slider.css";

const HeroSlider = () => {
  const settings = {
    fade: true,
    speed: 2000,
    autoplaySpeed: 4000,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };
  return (
    <Slider {...settings} className="hero__slider">
      <div className="slider__item slider__item-01 mt0">
        <Container><center>
          <div className="slider__content ">
            <h1 className="text-light mb-3" style={{fontSize:"120px",fontFamily:"pala, sans-serif"}}>Al Wifak </h1>
            <h3 className="text-light mb-4" style={{fontFamily:"Lato, Helvetica, sans-serif"}}>Réservez dès maintenant chez <b style={{fontFamily:"pala, sans-serif"}}>Al Wifak</b> Rent a Car et bénéficiez d'une expérience de location de voiture exceptionnelle avec des options adaptées à toutes les occasions.</h3>
          </div></center>
        </Container>
      </div>

      <div className="slider__item slider__item-02 mt0">
        <Container><center>
          <div className="slider__content ">
            <h1 className="text-light mb-3" style={{fontSize:"120px",fontFamily:"pala, sans-serif"}}>Al Wifak</h1>
            <h3 className="text-light mb-4" style={{fontFamily:"Lato, Helvetica, sans-serif"}}>Découvrez notre sélection de véhicules et réservez dès maintenant chez <b style={{fontFamily:"pala, sans-serif"}}>Al Wifak</b> Rent a  Car pour une location longue ou courte durée</h3>
          </div></center>
        </Container>
      </div>

      <div className="slider__item slider__item-03 mt0">
        <Container><center>
          <div className="slider__content ">
                   <h1 className="text-light mb-3" style={{fontSize:"120px",fontFamily:"pala, sans-serif"}}>Al Wifak</h1>     
            <h3 className="text-light mb-4" style={{fontFamily:"Lato, Helvetica, sans-serif"}}>Voyagez avec style et confort en louant votre voiture chez <b style={{fontFamily:"pala, sans-serif"}}>Al Wifak</b> Rent a Car <br/> votre partenaire de confiance pour des locations flexibles et abordables</h3>
          </div></center>
        </Container>
      </div>
    </Slider>
  );
};

export default HeroSlider;

{/**
            <button className="btn reserve__btn mt-4">
              <Link to="/cars">Réservez votre voiture</Link>
            </button>
*/}