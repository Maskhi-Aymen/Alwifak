import React, { useEffect ,useState} from "react";
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import { Container,Button, Row, Col ,Input,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import 'animate.css';

const NewCar= () => {

  const userId=JSON.parse(localStorage.getItem("userInfo"))._id;

  const [isvalid, setisvalid] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const[automatic,setautomatic]= useState("Automatique");
  const[carName,setcarName]= useState("");
  const [model,setModel]= useState("");
  const [brand,setbrand]= useState("");
  const[image,setImg]= useState();
  const [payPerDay,setpayPerDay]= useState("");
  const [speed,setspeed]= useState("");
  const [capacity,setcapacity]= useState("");
  const [description,setDescp]= useState("");


  const submitHandler = async (e) => {
    e.preventDefault();
    if(carName && automatic &&model &&image && payPerDay &&brand && speed && capacity && description)
    {
    setisvalid(true)  
    let formData= new FormData();
    formData.append("img",image);
    formData.append("image",process.env.BACKEND_IMAGE+"/uploads/"+image.name);
    formData.append("carName",carName);
    formData.append("automatic",automatic);
    formData.append("model",model);
    formData.append("brand",brand);
    formData.append("payPerDay",payPerDay);
    formData.append("speed",speed);
    formData.append("capacity",capacity);
    formData.append("description",description);
    try {

      const  data  = await axios.post(`/api/cars/add/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer "
        }
      });toggle();

    } catch (error) {
      setisvalid(false);
      toggle();
    }}
    else{
      setisvalid(false);
      toggle()}
}
const imgHandler =  (e) => {
  setImg(e.target.files[0])
}
const navigate= useNavigate();
useEffect(() => {
 
 if(!localStorage.getItem("userInfo")) {
   navigate('/');
     }
   if(localStorage.getItem("userInfo")) {
   if(!JSON.parse(localStorage.getItem("userInfo")).admin){
     navigate('/');
   }}
},[navigate]) 

  useEffect(() => {
   
    window.scrollTo(0, 0);
  }, []);

  return (
    <Helmet title="Nouvelle Voiture">
      <section>
        <Container>
          <Row>
            <Col lg="6">
            <i class="ri-roadster-fill" style={{fontSize:"255px",color:"#EB9929",marginLeft:"100px"}}></i>
              <Input type="file" onChange={(e)=>imgHandler(e)} accept ="image/*"  id="file"/>
            </Col>

            <Col lg="6">
              <div className="car__info">
              <UncontrolledDropdown nav inNavbar style={{listStyleType:"none"}} ><h6 className="rent__price fw-bold ">Boite vitesse</h6>
                    <DropdownToggle nav caret className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    style={{ fontSize: "17px", fontFamily: "Montserrat" ,color:"#EB9929"}}>
                      {automatic}
                    </DropdownToggle>
                    <DropdownMenu right >
                      <DropdownItem id="dropitem"> <h2 onClick={()=>setautomatic("Automatique")}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    style={{ fontSize: "17px", fontFamily: "Montserrat" }} key="6">Automatique</h2></DropdownItem>
                     <DropdownItem id="dropitem"><h2 onClick={()=>setautomatic("Manuelle")}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    style={{ fontSize: "17px", fontFamily: "Montserrat" }} key="6">Manuelle</h2></DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>



                <h2 className="section__title">Nom de voiture :<Input defaultValue={carName} onChange={(e)=>setcarName(e.target.value)} /> </h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                  Marque:<Input defaultValue={brand} onChange={(e)=>setbrand(e.target.value)} /> 
                  </h6>

                  <h6 className=" rent__price fw-bold fs-4">
                  Modele:<Input defaultValue={model} onChange={(e)=>setModel(e.target.value)} /> 
                  </h6>
                </div>

                <p className="section__description">Description :
                <Input defaultValue={description} onChange={(e)=>setDescp(e.target.value)} type='textarea' Row={45}/> 
                </p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                  <i class="ri-timer-flash-fill" style={{ color: "#EB9929" }}></i>{" "}
                   Vitesse:<Input defaultValue={speed} onChange={(e)=>setspeed(e.target.value)} />
                  </span>
                  <span className=" d-flex align-items-center gap-1 section__description">
                  <i class="ri-group-fill"
                      style={{ color: "#EB9929" }}
                    ></i>{" "}
                   Place:  <Input defaultValue={capacity} onChange={(e)=>setcapacity(e.target.value)} />
                 
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
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <button  onClick={(e)=>submitHandler(e) }  className=" w-50 car__item-btn car__btn-rent" style={{color:'white'}}>
            enregistrer
          </button>
              </div>
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <img src="" style={{width:"140px"}} alt="offre special" class="animate__animated animate__heartBeat animate__infinite"/>
                <h5 className="mb-4 fw-bold ">Prix :<Input defaultValue={payPerDay} onChange={(e)=>setpayPerDay(e.target.value)} />  Dt/Jour</h5>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Ajouter une voiture</ModalHeader>
          <ModalBody>{isvalid ? <> <h2>Succés</h2>
          La Voiture a été enregistrée avec succès
          </>
            :
            <>Les données que vous avez saisi(e) n’est pas complet.S'il vous plaît, essayez de les compléter !</>}

          </ModalBody>
          <ModalFooter>
          {isvalid ? <Button style={{backgroundColor:'#EB9929'}} onClick={()=>{toggle();window.location.reload(true)}}>
              Fermer
            </Button>:<Button style={{backgroundColor:'#EB9929'}} onClick={()=>{toggle()}}>
              Fermer
            </Button>}
          </ModalFooter>
        </Modal>
    </Helmet>
  );
};

export default NewCar;
