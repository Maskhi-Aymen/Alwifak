import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Button, Container, Row, Col, Input, Modal, ModalHeader, ModalBody, ModalFooter ,Label,FormGroup,Form} from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams, useNavigate } from "react-router-dom";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" ;// needed for dayClick
import AddEvent from "../components/UI/AddEvent";
import InfoEvent from "../components/UI/InfoEvent";


const CarAdmin = () => {
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

  const userId = JSON.parse(localStorage.getItem("userInfo"))._id;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (carName && automatic && model && image && payPerDay && brand && speed && capacity && description) {
      let formData = new FormData();
      setisvalid(true)
      formData.append("img", image);
      if (image) { formData.append("image", "http://localhost:3000/uploads/" + image.name); }
      else { formData.append("image", singleCarItem.image) }
      formData.append("carName", carName);
      formData.append("automatic", automatic);
      formData.append("model", model);
      formData.append("brand", brand);
      formData.append("payPerDay", payPerDay);
      formData.append("speed", speed);
      formData.append("capacity", capacity);
      formData.append("description", description);

      try {
        const { data } = await axios.put(`/api/cars/car/${userId}/${singleCarItem._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer "
          }
        });
        toggle();
      } catch (error) {
        toggle();
      }
    }
    else {
      setisvalid(false);
      toggle();
    }
  }
  const imgHandler = (e) => {
    setImg(e.target.files[0])
  }

  const navigate = useNavigate();
  useEffect(() => {

    if (!localStorage.getItem("userInfo")) {
      navigate('/');
    }
    if (localStorage.getItem("userInfo")) {
      if (!JSON.parse(localStorage.getItem("userInfo")).admin) {
        navigate('/');
      }
    }
  }, [navigate])
  useEffect(() => {


    const fetchData = async () => {

      try {
        const result = await axios.get(`/api/cars/car/${slug}`);
        setSingle(result.data)
        setcarName(result.data.carName);
        setbrand(result.data.brand);
        setModel(result.data.model);
        setDescp(result.data.description);
        setcapacity(result.data.capacity);
        setpayPerDay(result.data.payPerDay);
        setspeed(result.data.speed);
        setautomatic(result.data.automatic);
        setRents(result.data.rents);
        setevents(result.data.rents);
        setImg(result.data.image);

      } catch (err) {
        console.log("Error!");
      }
    }
    fetchData();
    window.scrollTo(0, 0);
  }, [slug])



  const handleDateClick = (arg) => {
    setevent(arg.event); 
    handleInfo();
    console.log(arg.event)
  }


  const [event, setevent] = useState([]);
  const [events, setevents] = useState([])
  const calendarRef = useRef(null);
  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi()
    calendarApi.refetchEvents()
  }
  async function handleDatesSet(data) {

  }
  const [datePlan, setdatePlan] = useState("");
  const dateClick = (arg) => {
    setdatePlan(arg.dateStr)
    handleModel();
  }

  const[modelopen,setmodelopen]=useState(false)
  const handleModel = () => setmodelopen(!modelopen);
  const[infoopen,setInfoopen]=useState(false)
  const handleInfo = () => setInfoopen(!infoopen);
  return (
    <Helmet title={singleCarItem.carName}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={singleCarItem.image} alt="" className="w-100" />
              <Input type="file" onChange={(e) => imgHandler(e)} accept="image/*" id="file" />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">Nom :<Input defaultValue={carName} onChange={(e) => setcarName(e.target.value)} /> </h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    Marque:<Input defaultValue={brand} onChange={(e) => setbrand(e.target.value)} />
                  </h6>

                  <h6 className=" rent__price fw-bold fs-4">
                    Modele :<Input defaultValue={model} onChange={(e) => setModel(e.target.value)} />
                  </h6>
                </div>

                <p className="section__description">Description :
                  <Input defaultValue={description} onChange={(e) => setDescp(e.target.value)} type='textarea' Row={45} />
                </p>


                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-timer-flash-fill" style={{ color: "#EB9929" }}></i>{" "}
                    Vitesse:<Input defaultValue={speed} onChange={(e) => setspeed(e.target.value)} />
                  </span>
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-group-fill"
                      style={{ color: "#EB9929" }}
                    ></i>{" "}
                    Place:  <Input defaultValue={capacity} onChange={(e) => setcapacity(e.target.value)} />

                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >


                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-charging-pile-fill"
                      style={{ color: "#EB9929" }}
                    ></i>{" "}
                    Gazoal
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-compass-3-fill"
                      style={{ color: "#EB9929" }}
                    ></i>{" "}
                    GPS Navigation
                  </span>
                </div>
              </div>
              <div className="payment__info mt-5">
                <img src="" alt="offre special" style={{ width: "140px" }} class="animate__animated animate__heartBeat animate__infinite" />
                <h5 className="mb-4 fw-bold ">Prix :<Input defaultValue={payPerDay} onChange={(e) => setpayPerDay(e.target.value)} />  Dt/Jour</h5>
              </div>
              <div className="booking-info mt-5">
                <button onClick={(e) => submitHandler(e)} className=" w-50 car__item-btn car__btn-rent">
                  enregistrer
                </button>
              </div>
            </Col>
            <Col lg="12" className="mt-5" >

              {/**calandar */}
              <FullCalendar
                ref={calendarRef}
                headerToolbar= {{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth'
                }}
                events={events}
                plugins={[dayGridPlugin,interactionPlugin]}
                initialView='dayGridMonth'
                dateClick={dateClick}
                datesSet={(date) => handleDatesSet(date)}
                eventClick={(arg) => handleDateClick(arg)}
              />

            </Col>
          </Row>
        </Container>
      </section>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modifier la formation</ModalHeader>
        <ModalBody>{isvalid ? <> <h2>Succés</h2>
          La formation a été modifiée avec succès
        </>
          :
          <>Les données que vous avez saisi(e) n’est pas complet.S'il vous plaît, essayez de les compléter !</>}

        </ModalBody>
        <ModalFooter>
          <Button style={{ backgroundColor: '#E2001A' }} onClick={() => { toggle(); window.location.reload(true) }}>
            Fermer
          </Button>
        </ModalFooter>
      </Modal>

       <AddEvent date={datePlan} modelopen={modelopen} handleModel={()=>handleModel()}  />
       <InfoEvent date={datePlan} modelopen={infoopen} handleModel={()=>handleInfo()} event={event}  />
    </Helmet>
  );
};

export default CarAdmin;





