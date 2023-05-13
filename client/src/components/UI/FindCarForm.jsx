import React from "react";
import "../../styles/find-car-form.css";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";
import { Link} from "react-router-dom";

const FindCarForm = () => {
  return (
    <Form className="form"  style={{borderRadius:"5%"}}>
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
          <input type="text" placeholder="Lieu de prise en charge" required />
        </FormGroup>
        <FormGroup className="form__group">
          <input type="date" placeholder="Date de prise en charge" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input
            className="journey__time1"
            type="time"
            placeholder="Heure de prise en charge"
            required
          />
        </FormGroup>
        <FormGroup className="form__group">
          <input type="text" placeholder="Lieu de restitution" required />
        </FormGroup>
        <FormGroup className="form__group">
          <input type="date" placeholder="Date de restitution" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input
            className="journey__time"
            type="time"
            placeholder="Heure de restitution"
            required
          />
        </FormGroup>
        <FormGroup className="select__group">
          <select>
            <option value="ac">Transmission Automatique</option>
            <option value="non-ac">Transmission Manuel</option>
          </select>
        </FormGroup>

        <FormGroup className="form__group">
        <Link to="/cars">
          <button className="btn find__car-btn">RECHECHER UNE VOITURE</button></Link>
        </FormGroup>
      </div> 
    </Form>
  );
};

export default FindCarForm;
