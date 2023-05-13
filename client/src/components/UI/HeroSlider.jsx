import React from "react";

import Slider from "react-slick";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

import "../../styles/hero-slider.css";

const HeroSlider = () => {
  const settings = {
    fade: true,
    speed: 2000,
    autoplaySpeed: 3000,
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
            <h4 className="text-light mb-3">À partir de 70 DT/jour </h4>
            <h1 className="text-light mb-4">Réservez votre voiture chez Al Wifak Rent Car pour location longue ou courte durée.</h1>
          </div></center>
        </Container>
      </div>

      <div className="slider__item slider__item-02 mt0">
        <Container><center>
          <div className="slider__content ">
            <h4 className="text-light mb-3">Ai Wifek vous propose des prix plus que promotionnels</h4>
            <h1 className="text-light mb-4">Réservez votre voiture chez Al Wifak Rent Car pour location longue ou courte durée.</h1>
          </div></center>
        </Container>
      </div>

      <div className="slider__item slider__item-03 mt0">
        <Container><center>
          <div className="slider__content ">
                   <h4 className="text-light mb-3">Reservation simple & rapide</h4>     
            <h1 className="text-light mb-4">Meilleur Voiture à bas prix</h1>
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