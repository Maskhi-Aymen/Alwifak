import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import '../styles/CarDetails.css';
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import { FormGroup } from "reactstrap";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from '@fullcalendar/core/locales/fr';

const CarDetails = () => {
  const { slug } = useParams();
  const [isvalid, setisvalid] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [singleCarItem, setSingle] = useState([]);

  const [automatic, setautomatic] = useState("Automatique");
  const [carName, setcarName] = useState("");
  const [model, setModel] = useState("");
  const [brand, setbrand] = useState("");
  const [image, setImg] = useState();
  const [payPerDay, setpayPerDay] = useState("");
  const [speed, setspeed] = useState("");
  const [capacity, setcapacity] = useState("");
  const [description, setDescp] = useState("");
  const [rents, setRents] = useState([]);
  const [events, setevents] = useState([]);
  const [id, setId] = useState("");


  const userId = JSON.parse(localStorage.getItem("userInfo")) ? JSON.parse(localStorage.getItem("userInfo"))._id : null;

  const calendarRef = useRef(null);
  useEffect(() => {


    const fetchData = async () => {

      try {
        const result = await axios.get(`/api/cars/car/${slug}`);
        setSingle(result.data)
        setcarName(result.data.carName);
        setId(result.data._id);
        setbrand(result.data.brand);
        setModel(result.data.model);
        setDescp(result.data.description);
        setcapacity(result.data.capacity);
        setpayPerDay(result.data.payPerDay);
        setspeed(result.data.speed);
        setautomatic(result.data.automatic);
        setRents(result.data.rents);

        setImg(result.data.image);

        let lis = [];

        for (let i = 0; i < result.data.rents.length; i++) {
          let tt = {}
          tt["title"] = "Réserver!";
          tt["start"] = result.data.rents[i].start
          tt["end"] = result.data.rents[i].end
          tt["color"] = "#0A4660"
          tt["overlap"] = false
          lis.push(tt)
        }
        setevents(lis)

      } catch (err) {
        console.log("Error!");
      }
    }
    fetchData();
    window.scrollTo(0, 0);
  }, [slug])


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleCarItem]);

  return (
    <Helmet title={singleCarItem.carName}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={image} alt="" className="w-100" />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{carName}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    {payPerDay}.00 DT/ Jour
                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    ({5} ratings)
                  </span>
                </div>
                <p className="section__description">
                  {description}
                </p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {model}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-settings-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {automatic}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-timer-flash-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {speed}
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
                    gps
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-flashlight-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    +80 CH
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-building-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {brand}
                  </span>
                </div>
              </div>
            </Col>
            <Col lg="6" className="mt-5" >
              <div className="custom-calendar">
                <FullCalendar
                  ref={calendarRef}
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth'
                  }}
                  events={events}
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView='dayGridMonth'
                  locale={frLocale}

                />
                <br /><br />
                <FormGroup>
                  <h5>Conditions générales d’utilisation du service de réservation :</h5>
                  <div
                    className="textarea"
                    style={{ overflowY:'scroll',maxHeight:"540px" }}
                  >
                    1-Une caution est requise pour toute location de véhicule.<br />
                    2-Le montant de la caution sera déterminé en fonction du type de véhicule loué et de la durée de location (à partir 2500dt).<br />
                    3-Le montant de la caution sera clairement indiqué dans le contrat de location et doit être payé avant la prise en charge du véhicule.<br />
                    4-La caution peut être payée par carte de crédit ou par tout autre moyen de paiement accepté par l'agence de location.<br />
                    5-La caution sera remboursée dans les meilleurs délais après la restitution du véhicule, sous réserve de l'absence de dommages, de retards ou de frais supplémentaires.<br />
                    6-En cas de dommages au véhicule, de retard dans la restitution ou de frais supplémentaires, l'agence de location se réserve le droit de retenir tout ou partie de la caution pour couvrir les coûts.<br />
                    7-Le remboursement de la caution peut prendre plusieurs jours ou semaines en fonction du mode de paiement et des procédures de l'agence de location.<br />
                    8-L'agence de location se réserve le droit de refuser la location du véhicule si le client ne fournit pas une caution valide ou si les conditions de location ne sont pas respectées.<br />
                    9-En cas de dommages au véhicule pendant la location, le montant des réparations nécessaires sera déduit de la caution du client. Si les frais de réparation dépassent le montant de la caution, le client sera tenu responsable du paiement du montant restant.<br />
                    10-Le client est tenu de respecter les conditions de location spécifiées, telles que les limitations de kilométrage, les restrictions d'utilisation, les règles de conduite, etc. Tout manquement à ces conditions peut entraîner la perte partielle ou totale de la caution.<br />
                    11-Le client a la possibilité de changer la date de réservation ou d'annuler la location avant 48 heures. Aucun frais ne sera facturé dans ce cas, et la caution sera entièrement remboursée.<br />
                    12-Toutefois, si le client souhaite changer la date de réservation ou annuler la location après 48 heures, il sera tenu de payer 30% du montant total de la location en tant que frais d'annulation.<br />
                    13-Le siège bébé est disponible moyennant des frais supplémentaires de 5DT par jour. Le client peut demander la location d'un siège bébé lors de la réservation du véhicule.
                  </div>
                </FormGroup>
              </div>
            </Col>
            <Col lg="6">
              <BookingForm carName={carName} brand={brand} prix={payPerDay} id={id} />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
