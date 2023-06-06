import React ,{useState} from "react";
import { Button, Container, Row, Col, Input, Modal, ModalHeader, ModalBody, ModalFooter ,Label,FormGroup,Form} from "reactstrap";
import { Link ,useParams} from "react-router-dom";
import "../../styles/car-item.css";
import dayjs from "dayjs";
import axios from "axios";

const InfoEvent = ({ modelopen, handleModel, date,event}) => {
  const { slug } = useParams();
  const userId = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo"))._id : null;
  const id =event["extendedProps"] ? event["extendedProps"]._id : null;
  const deleteHandler = async (e) => {
    
    e.preventDefault();
    
      try {
       const { data } = await axios.delete(`/api/cars/rent/${userId}/${slug}/${id}`);
        console.log(data)
        window.location.reload(true);
       
      } catch (error) {
        
      }
  
  }
const ev =event["extendedProps"] ? event["extendedProps"].tel : null;
  return (
      <Modal isOpen={modelopen} toggle={()=>handleModel()} >
        <ModalHeader toggle={handleModel}>Réservation</ModalHeader>
        <ModalBody>
        <Form>
  <Row>
    <Col md={4}>
      <FormGroup>
      <i class="ri-user-3-fill" style={{fontSize:"143px",padding:'10px'}}></i>
      </FormGroup>
    </Col>
    <Col md={8}>
      <FormGroup>
        <h2 >{event['title']} </h2>
        </FormGroup>
        <FormGroup>
      <Label >
        Date de prise en charge: &nbsp;
      </Label>
      {dayjs(event['start']).format("DD/MM/YYYY")}
      </FormGroup>
      <FormGroup>
      <Label >
        Heure de prise en charge: &nbsp;
      </Label>
      {dayjs(event['start']).format("HH:MM")}
      </FormGroup>
      <FormGroup>
      <Label >
        Date de restitution: &nbsp;
      </Label>
      {dayjs(event['end']).format("DD/MM/YYYY")}
      </FormGroup>
      <FormGroup>
      <Label >
        Heure de restitution: &nbsp;
      </Label>
      {dayjs(event['end']).format("HH:MM")}
      </FormGroup>
      <FormGroup>
      <Label >
        Numéro de Télephone: &nbsp;
      </Label>
      {ev}
      </FormGroup>
    </Col>
  </Row>
</Form>
        </ModalBody>
        <ModalFooter>
        <button onClick={(e) => deleteHandler(e)} className=" w-50 car__item-btn car__btn-rent">
                  Supprimer
                </button>{' '}
          <Button color="secondary" toggle={handleModel} >
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
  );
};

export default InfoEvent;
        //  <button className=" w-50 car__item-btn car__btn-details">
        // <Link to={`/cars/${carName}`}>Details</Link>
        //  </button>