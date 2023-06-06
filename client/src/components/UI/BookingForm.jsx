import React from "react";
import axios from 'axios';
import "../../styles/booking-form.css";
import { Col, Form, FormGroup } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useState } from "react";
import masterCard from "../../assets/all-images/master-card.jpg";
import paypal from "../../assets/all-images/paypal.jpg";
import "../../styles/payment-method.css";

const BookingForm = ({ carName,brand,prix ,id}) => {

  const [name, setname] = useState();
  const [lastname, setlastname] = useState();
  const [email, setemail] = useState();
  const [dateprise, setdateprise] = useState();
  const [datereprise, setdatereprise] = useState();
  const [numtel, setnumtel] = useState();
  const [lieuprise, setlieuprise] = useState("Agence Alwifak Tunis");
  const [lieureprise, setlieureprise] = useState("Agence Alwifak Tunis");
  const [timeprise, settimeprise] = useState();
  const [timereprise, settimereprise] = useState();
  const [nombrepers, setnombrepers] = useState("1 person");
  const [nombrebag, setnombrebag] = useState("1 Bagage");
  const [autre, setautre] = useState("");
  const [payment, setpayment] = useState();

  const [isvalid, setisvalid] = useState(true);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const submitHandler = async(event) => {
    event.preventDefault();
    const data = { name, lastname, dateprise, timeprise, autre, payment, nombrebag, nombrepers };
    if (name && lastname && email && dateprise && datereprise && numtel && lieuprise && lieureprise && timeprise && timereprise && payment) {
      try {
        setisvalid(true);
        toggle();
        await axios.get("/api/rent/prerent", {
          name,lastname,email,numtel,lieuprise,dateprise,timeprise,lieureprise,datereprise,timereprise,
          nombrepers,nombrebag,payment,autre,carName,brand,prix,id
        },{
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "
          }
        });

    } catch(error) {
      console.log(error);
    }
    } else {
      setisvalid(false);
      toggle();
    }

  };
  return (
    <>
      <Form onSubmit={submitHandler}>
        <Col lg="12" className="mt-5 ml-5">
          <div className="booking-info mt-5">
            <h5 className="mb-4 fw-bold ">Informations de Réservation</h5>
            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <label>Nom :</label>
              <input type="text" onChange={(e) => setname(e.target.value)} placeholder="taper votre nom" required />
            </FormGroup>
            <FormGroup className="booking__form d-inline-block ms-1 mb-4">
            <label>Prénom :</label>
              <input type="text" onChange={(e) => setlastname(e.target.value)} placeholder=" taper votre prénom" required />
            </FormGroup>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <label>E-mail :</label>
              <input type="email" onChange={(e) => setemail(e.target.value)} placeholder="taper votre adresse E-mail" required />
            </FormGroup>
            <FormGroup className="booking__form d-inline-block ms-1 mb-4">
            <label>Numéro de téléphone :</label>
              <input type="number" onChange={(e) => setnumtel(e.target.value)} placeholder="taper votre Numéro de téléphone" required />
            </FormGroup>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <label>Lieu de prise en charge :</label>
              <select onChange={(e) => setlieuprise(e.target.value)} name="" id=""required>
                <option value="Agence Alwifak Tunis" selected>Agence Alwifak Tunis</option>
                <option value="Tunis-Cartage Airport">Tunis-Cartage Airport</option>
              </select>
            </FormGroup>
            <FormGroup className="booking__form d-inline-block ms-1 mb-4">
              <label>Lieu de restitution :</label>
              <select onChange={(e) => setlieureprise(e.target.value)} name="" id=""required>
              <option value="Agence Alwifak Tunis" selected>Agence Alwifak Tunis</option>
              <option value="Tunis-Cartage Airport">Tunis-Cartage Airport</option>
              </select>
            </FormGroup>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <label>Nombre de personne :</label>
              <select onChange={(e) => setnombrepers(e.target.value)} name="" id="">
                <option value="1 person" selected>1 Person</option>
                <option value="2 person">2 Person</option>
                <option value="3 person">3 Person</option>
                <option value="4 person">4 Person</option>
                <option value="5+ person">5 Person</option>
              </select>
            </FormGroup>
            <FormGroup className="booking__form d-inline-block ms-1 mb-4">
            <label>Nombre de bagage :</label>
              <select onChange={(e) => setnombrebag(e.target.value)} name="" id="">
                <option value="1 Bagage" selected>1 Bagage</option>
                <option value="2 Bagage">2 Bagage</option>
                <option value="3 Bagage">3 Bagage</option>
                <option value="4 Bagage">4 Bagage</option>
                <option value="5+ Bagage">5+ Bagage</option>
              </select>
            </FormGroup>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <label>Date de prise en charge :</label>
              <input type="date" onChange={(e) => setdateprise(e.target.value)} placeholder="Journey Date" required />
            </FormGroup>
            <FormGroup className="booking__form d-inline-block ms-1 mb-4">
              <input
                type="time"
                onChange={(e) => settimeprise(e.target.value)}
                placeholder="Journey Time" required
                className="time__picker"
              />
            </FormGroup>
            <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <label>Date de restitution :</label>
              <input type="date" onChange={(e) => setdatereprise(e.target.value)} placeholder="Journey Date" required />
            </FormGroup>
            <FormGroup className="booking__form d-inline-block ms-1 mb-4">
              <input
                type="time"
                onChange={(e) => settimereprise(e.target.value)}
                placeholder="Journey Time"
                className="time__picker2" required
              />
            </FormGroup>

            <FormGroup>
            <label>Autre information :</label>
              <textarea
                rows={5}
                type="textarea"
                onChange={(e) => setautre(e.target.value)}
                className="textarea"
                placeholder="..."
              ></textarea>
            </FormGroup>
          </div>
        </Col>


        <Col lg="12" className="mt-5" style={{ flex: 'display' }}>
          <div className="payment__info mt-5">
            <h5 className="mb-4 fw-bold ">Information de Payment </h5>
            <div className="payment">
              <label htmlFor="" className="d-flex align-items-center gap-2">
                <input type="radio" onChange={(e) => setpayment("Virment")} name="fav_payment" /> Virement bancaire direct
              </label>
            </div>

            <div className="payment mt-3">
              <label htmlFor="" className="d-flex align-items-center gap-2">
                <input type="radio" onChange={(e) => setpayment("Chéque")} name="fav_payment" /> Paiement par chèque
              </label>
            </div>

            <div className="payment mt-3 d-flex align-items-center justify-content-between">
              <label htmlFor="" className="d-flex align-items-center gap-2">
                <input type="radio" onChange={(e) => setpayment("Master Card")} name="fav_payment" /> Master Card
              </label>

              <img src={masterCard} alt="" />
            </div>

            <div className="payment mt-3 d-flex align-items-center justify-content-between">
              <label htmlFor="" className="d-flex align-items-center gap-2">
                <input type="radio" onChange={(e) => setpayment("PayPal")} name="fav_payment" /> Paypal
              </label>

              <img src={paypal} alt="" />
            </div>
            <div className="payment text-end mt-5">
              <button onClick={submitHandler}>Réservez Maintenant</button>
            </div>
          </div>
        </Col>
      </Form>
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Reserervation</ModalHeader>
          <ModalBody>{isvalid ? <> <h2>Bonjour {lastname} {name}</h2>
            Nous avons bien reçu votre demande et nous vous remercions de l’intérêt que vous portez à notre service.
            Un membre de notre équipe entrera en contact avec vous dans les plus brefs délais
          </>
            :
            <>Les corrdonnées que vous avez saisi(e) n’est pas complet.S'il vous plaît ,essayez de les compléter avant de confirmer votre Reserervation</>}

          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Fermer
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default BookingForm;
