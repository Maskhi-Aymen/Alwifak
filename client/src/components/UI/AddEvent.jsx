import React ,{useState} from "react";
import { Button, Container, Row, Col, Input, Modal, ModalHeader, ModalBody, ModalFooter ,Label,FormGroup,Form} from "reactstrap";
import { Link ,useParams} from "react-router-dom";
import "../../styles/car-item.css";
import axios from "axios";
import dayjs from "dayjs";

const AddEvent = ({ modelopen, handleModel, date}) => {
  const { slug } = useParams();
  const userId = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo"))._id : null;

  const [start, setstart] = useState(date);
  const [end, setendstr] = useState("");
  const [timestart, settimestart] = useState("");
  const [timeEnd, settimeEndstr] = useState("");
  const [title, settitle] = useState("");
  const [tel, settel] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    if (start&&end&&title&&tel) {
      try {
        const { data } = await axios.post(`/api/cars/rent/${userId}/${slug}`, {start:dayjs(start).format("YYYY-MM-DD")+" "+timestart+":00",end:dayjs(end).format("YYYY-MM-DD")+" "+timeEnd+":00",
        title,tel}, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "
          }
        });
        window.location.reload(true);
       
      } catch (error) {
        
      }
    }
    else {

    }
  }

  return (
      <Modal isOpen={modelopen} toggle={()=>handleModel()} >
        <ModalHeader toggle={handleModel}>Réservation</ModalHeader>
        <ModalBody>
        <Form>
  <Row>
    <Col md={6}>
      <FormGroup>
        <Label for="exampleEmail">
          Date de prise
        </Label>
        <Input
          id="exampleEmail"
          name="prise"
          defaultValue={start}
          onChange={(e) => setstart(e.target.value)}
          type="date"
        />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="examplePassword">
          Heure de prise
        </Label>
        <Input
          id="example"
          defaultValue={timestart}
          onChange={(e) => {settimestart(e.target.value)}}
          type="time"
        />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="exampleEmail">
        Date de restitution
        </Label>
        <Input
          id="exampleEmail"
          name="prise"
          defaultValue={end}
          onChange={(e) => setendstr(e.target.value)}
          type="date"
        />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="examplePassword">
        Heure de restitution
        </Label>
        <Input
          id="example"
          defaultValue={timeEnd}
          onChange={(e) => {settimeEndstr(e.target.value)}}
          type="time"
        />
      </FormGroup>
    </Col>
    
  </Row>
  <FormGroup>
    <Label for="exampleAddress">
      Nom et Prenom
    </Label>
    <Input
      id="exampleAddress"
      name="address"
      onChange={(e) => settitle(e.target.value)}
      defaultValue={title}
    />
  </FormGroup>
  <FormGroup>
    <Label for="exampleAddress2">
      Tel
    </Label>
    <Input
      id="exampleAddress2"
      name="address2"
      onChange={(e) => settel(e.target.value)}
      defaultValue={tel}
    />
  </FormGroup>
</Form>
        </ModalBody>
        <ModalFooter>
        <button onClick={(e) => submitHandler(e)} className=" w-50 car__item-btn car__btn-rent">
                  Enregistrer
                </button>{' '}
          <Button color="secondary" toggle={handleModel} >
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
  );
};

export default AddEvent;
        //  <button className=" w-50 car__item-btn car__btn-details">
        // <Link to={`/cars/${carName}`}>Details</Link>
        //  </button>