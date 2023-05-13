import React, { useEffect,useState ,useRef} from "react";
import axios from "axios";
import carData from "../assets/data/carData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" ;

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
  const [events, setevents] = useState([])

  const userId = JSON.parse(localStorage.getItem("userInfo")) ? JSON.parse(localStorage.getItem("userInfo"))._id:null;

  const calendarRef = useRef(null);
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

        setImg(result.data.image);

      let lis=[];
        
      for (let i = 0; i < result.data.rents.length; i++) {
        let tt={}
         tt["title"]= "Réserer!"
         tt["start"]= result.data.rents[i].start
         tt["end"]=  result.data.rents[i].end
         tt["color"]="red"
         tt["classNames"]="test"
         tt["overlap"]=false
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
                      class="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    singleCarItem.seatType
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
              <Col lg="6" className="mt-5">
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

              /></Col>
              <Col lg="6">
                <BookingForm carName={carName} brand={brand}/></Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
