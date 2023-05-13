import React, { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../assets/all-images/Alwifak.png';
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";

const navLinks = [
  {
    path: "/home",
    display: "Acceuil",
  },
  {
    path: "/about",
    display: "Nos Services",
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

const Header = () => {

  const navigate = useNavigate();

  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : null;
  const admin = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")).admin : false;

  const logoutHandler = () => {
      localStorage.removeItem('userInfo');
      toast.success('You have successfully logged out!');
      navigate('/login');
  }
  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  return (
    <header className="header">

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                  <img src={logo} alt='Logo' style={{width:'140px'}} />
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-map-pin-2-fill"></i>
                </span>
                <div className="header__location-content">
                  <h4>Tunis</h4>
                  <h6>18, 1001 Rue Fares El Khouri</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-time-fill"></i>
                </span>
                <div className="header__location-content">
                  <h4>Du Lundi au Samdi </h4>
                  <h6>7am - 9pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i class="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink style={{textDecoration:"none"}}
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
                {!admin?<></>:
                  <NavLink style={{textDecoration:"none"}}
                    to={"/admin/cars"}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={3}
                  >
                    Adminstration
                  </NavLink>}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
              <span style={{color:'white'}}></span>
                {userInfo ? (
                    <span onClick={logoutHandler} style={{color:'white'}}>Déconnexion</span>
                ) : (<>
                      <Link to="/login" className=" d-flex align-items-center gap-1 mr-3">
                  <i class="ri-login-circle-line"></i> Connecter
                </Link>

                <Link to="/register" className=" d-flex align-items-center gap-1">
                  <i class="ri-user-line"></i> S'inscrire
                </Link></>
                )}
              
              </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
