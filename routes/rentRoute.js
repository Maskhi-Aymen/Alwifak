import express from 'express';
import Cars from '../models/carsModel.js';
import Rent from '../models/rentModel.js';
import nodemailer from 'nodemailer';
import moment from 'moment';

const rentRouter = express.Router();

rentRouter.post('/rentcar', async (req, res) => {
    try {

        const newRent = new Rent(req.body);
        await newRent.save();

        const car = await Cars.findById({ _id: req.body.car });
        car.bookedTimeSlots.push(req.body.bookedTimeSlots);
        await car.save();

        res.send('Your Rent is Successfull!')

    } catch (error) {
        return res.status(400).json(error);
    }
});
rentRouter.get("/rentacar/:idRent", async (req, res) => {


    const rent = await Rent.findById({ _id: req.params.idRent });
    const car = await Cars.findById({ _id: rent.car });
    const newrent = ({
        start: rent.start,
        end: rent.end,
        title: rent.name + ' ' + rent.lastname,
        tel: rent.tel,
    });
    car.rents.push(newrent);
    await car.save();

    res.redirect(process.env.HOME)
});
rentRouter.get("/cancelrent/:idRent", async (req, res) => {
    const rent = await Rent.deleteOne({ _id: req.params.idRent });
    res.redirect(process.env.HOME)
});



rentRouter.post("/prerent", async (req, res) => {
    const { name, lastname, email, numtel, lieuprise, dateprise, timeprise, lieureprise, datereprise, timereprise, nombrepers, nombrebag, payment, autre, carName, brand, prix, id } = req.body;
    // create reusable transporter object using the default SMTP transport
    const date1 = moment(new Date(dateprise));
    const date2 = moment(new Date(datereprise));
    const Days = date2.diff(date1, 'days');
    const montant = Days * prix;

    const d1 = moment(`${dateprise} ${timeprise}`).format('YYYY-MM-DD HH:mm');
    const d2 = moment(`${datereprise} ${timereprise}`).format('YYYY-MM-DD HH:mm');

    const car = await Cars.findById({ _id: id });

    const newRent = new Rent({
        name: name,
        lastname: lastname,
        email: email,
        numtel: numtel,
        car: car,
        start: d1,
        end: d2,
        totalDays: Days,
        totalPay: montant,
        payment: payment,
    });
    await newRent.save();
    const info = `<div>
    Vous venez de recevoir une demende de réservation de voiture auprés du
    Alwifak Rent A Car. Détail de la demende référence : E12334233
    <table>
      <thead>
        <tr>
          <th colspan="3">Demande de confirmation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Nom: </td>
          <td></td>
          <td>${name}</td>
          </tr>
        <tr>
          <td>Prénom: </td>
          <td></td>
          <td>${lastname}</td>
          </tr>
        <tr>
          <td>E-mail: </td>
          <td></td>
          <td>${email}</td>
          </tr>
        <tr>
          <td>Tel: </td>
          <td></td>
          <td>${numtel}</td>
          </tr>
        <tr>
          <td><h3>Véhicule:</h3> </td>
          <td></td>
        </tr>      
        <tr>
          <td>Model: </td>
          <td></td>
          <td>${brand}</td>
          </tr>
        <tr>
          <td>Nom du voiture: </td>
          <td></td>
          <td>${carName}</td>
          </tr>
        <tr>
          <td>
            <h4>Agence de départ</h4>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <h4>Agence de retour</h4>
          </td>
        </tr>
        <tr>
          <td>Lieu : </td>
          <td></td>
          <td>${lieuprise}</td>
          <td></td>
          <td>Lieu : </td>
          <td></td>
          <td>${lieureprise}</td>
          </tr>
        <tr>
          <td>Date: </td>
          <td></td>
          <td>${dateprise}</td>
          <td></td>
          <td>Date: </td>
          <td></td>
          <td>${datereprise}</td>
          </tr>
        <tr>
          <td>Heure: </td>
          <td></td>
          <td>${timeprise}</td>
          <td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </td>
          <td>Heure: </td>
          <td></td>
          <td>${timereprise}</td>
          </tr>
        <tr>
          <td>
            <h5>Durée de location : </h5>
          </td>
          <td></td>
          <td>${Days} Jours</td>
        </tr>
        <tr>
          <td>
            <h5>Tarifs: </h5>
          </td>
          <td></td>
          <td>${montant} TND</td>
        </tr>
        <tr>
          <td>Nombre de personne: </td>
          <td></td>
          <td>${nombrepers}</td>
          </tr>
        <tr>
          <td>Nombre de Baggage: </td>
          <td></td>
          <td>${nombrebag}</td>
          </tr>
        <tr>
          <td>Autre: </td>
          <td></td>
          <td>${autre}</td>
          </tr>
        <tr>
          <td>Méthode de payment: </td>
          <td></td>
          <td>${payment}</td>
          </tr>
      </tbody>
    </table>
    <h5>
      Merci de cliquer ici puis sur <a href="http://localhost:3000/api/rent/rentacar/${newRent._id}">J'accepte ici la demende </a>ou
      bien<a href="http://localhost:3000/api/rent/cancelrent/${newRent._id}"> Je refuse la demande</a> pour que le systeme envoie un
      mail de confirmation et de demande de paiement en ligne
    </h5>
  </div>`


    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "alwifak.rentacar@gmail.com", // generated ethereal user
            pass: 'tbjskpnlilehclrr', // generated ethereal password
        },
    });

    // send mail with defined transport object
    const msg = await transporter.sendMail({
        from: 'alwifak.rentacar@gmail.com', // sender address
        to: process.env.EMAIL, // list of receivers
        cc:process.env.SECOND_EMAIL,
        subject: "Demande de Réservation "+car.carName+" "+car.matricule, // Subject line
        html: info, // html body
    });



    const msgClient = `
<center>
                <table>
                    <thead>
                        <tr>
                            <th colspan="3">Demande de Réservation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nom: </td>
                            <td></td>
                            <td>${name}</td>
                        </tr>
                                <tr>
                            <td>Prénom: </td>
                            <td></td>
                            <td>${lastname}</td>
                        </tr>
                                <tr>
                            <td>E-mail: </td>
                            <td></td>
                            <td>${email}</td>
                        </tr>
                                <tr>
                            <td>Tel: </td>
                            <td></td>
                            <td>${numtel}</td>
                        </tr>
                        <tr>
                        <td>Model: </td>
                        <td></td>
                        <td>${brand}</td>
                            </tr>
                            <tr>
                            <td>Nom du voiture: </td>
                            <td></td>
                            <td>${carName}</td>
                        </tr>
                                <tr>
                            <td>Lieu de prise en charge: </td>
                            <td></td>
                            <td>${lieuprise}</td>
                        </tr>    
                             <tr>
                            <td>Date de prise en charge: </td>
                            <td></td>
                            <td>${dateprise}</td>
                        </tr>   
                              <tr>
                            <td>Heure de prise en charge: </td>
                            <td></td>
                            <td>${timeprise}</td>
                        </tr>
                                <tr>
                            <td>Lieu de restitution: </td>
                            <td></td>
                            <td>${lieureprise}</td>
                        </tr>
  
                                <tr>
                            <td>Date de restitution: </td>
                            <td></td>
                            <td>${datereprise}</td>
                        </tr>
   
                                <tr>
                            <td>Heure de restitution: </td>
                            <td></td>
                            <td>${timereprise}</td>
                        </tr>
                                <tr>
                            <td>Nombre de personne: </td>
                            <td></td>
                            <td>${nombrepers}</td>
                        </tr>
                                        <tr>
                            <td>Nombre de Baggage: </td>
                            <td></td>
                            <td>${nombrebag}</td>
                        </tr>
                                        <tr>
                            <td>Autre: </td>
                            <td></td>
                            <td>${autre}</td>
                        </tr>                <tr>
                            <td>Payment: </td>
                            <td></td>
                            <td>${payment}</td>
                        </tr>
                    </tbody>
                </table></center>
                <h2>Nous avons bien reçu votre demande et nous vous remercions de l’intérêt que vous portez à notre service.
                 Un membre de notre équipe entrera en contact avec vous dans les plus brefs délais</h2>`

    const msgclient = await transporter.sendMail({
        from: 'alwifak.rentacar@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Demande de Réservation "+car.carName, // Subject line
        html: msgClient, // html body
    });


    res.send('Email sent!')
});
export default rentRouter;



/*

*/