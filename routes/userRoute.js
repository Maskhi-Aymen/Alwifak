import express from 'express'
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import moment from 'moment';
import Cars from '../models/carsModel.js';
import Rent from '../models/rentModel.js';


const userRouter = express.Router();

//for login user
userRouter.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  //if user exists
  if (user) {
    if (user.admin) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          username: user.username,
          admin: user.admin
        });
        return;
      }
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          username: user.username,
        });
        return;
      }

    }
  }
  res.status(401).send({ message: "Invalid Email or Password" });
});

//for register user
userRouter.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password),
  });
  const user = await newUser.save();
  res.send({
    _id: user._id,
    username: user.username
  })
});


userRouter.post("/contact", async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const content = req.body.content;
  // create reusable transporter object using the default SMTP transport
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
    to: email, // contact@alwifakrentacar.com
    subject: "Contact ", // Subject line
    html: `<div>${content}</div><h4>envoyee par:${name} avec le mail :${email}</h4>`, // html body
  });

  console.log("Message sent: %s", msg.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(msg));
  res.send('Email sent!')
});


userRouter.post("/prerent", async (req, res) => {
  const { name, lastname, email, numtel, lieuprise, dateprise, timeprise, lieureprise, datereprise, timereprise, nombrepers, nombrebag, payment, autre, carName, brand, prix, id } = req.body;
  // create reusable transporter object using the default SMTP transport
  const date1 = moment(new Date(dateprise));
  const date2 = moment(new Date(datereprise));
  const Days = date2.diff(date1, 'days');
  var montant = Days * prix;

  const d1 = moment(`${dateprise} ${timeprise}`).format('YYYY-MM-DD HH:mm');
  const d2 = moment(`${datereprise} ${timereprise}`).format('YYYY-MM-DD HH:mm');

  var cotion=0;
  var bebe='Non'
  if(nombrebag=='true'){
    cotion=5*Days;
    bebe='Oui'; 
  }
  montant=montant+cotion;
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
  const info = `    <div  style="border:2px black solid">
  <div>
    <center><h2>Al Wifak Rent A Car - DEMANDE DE CONFIRMATION</h2></center>
</div>
<hr/>
<br/>
Vous venez de recevoir une demende de réservation de voiture auprés du
Alwifak Rent A Car. Détail de la demende référence : ${newRent._id}
<table>
<thead>
  <tr>
    <th colspan="3">Information du client</th>
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
        <td>Siège bébé: </td>
        <td></td>
        <td>${bebe}</td>
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
          <h3>
    Merci de cliquer ici puis sur <a href="https://54.37.11.213:3000/api/rent/rentacar/${newRent._id}">J'accepte ici la demende </a>ou
    bien<a href="https://54.37.11.213:3000/api/api/rent/cancelrent/${newRent._id}"> Je refuse la demande</a> pour que le systeme envoie un
    mail de confirmation et de demande de paiement en ligne
  </h3>
  <center><h4>Conditions générales d’utilisation du service de réservation</h4> </center>
  <hr/>
  <div>
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
                  <hr/>
        <div>
          <center><h4>Al Wifak Rent A Car</h4></center>
          <center><h5>Mobile: +216 25 214 025 - WhatApp: +216 29 060 530</h5></center>
        </div>
        </div>

  `


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
    cc: process.env.SECOND_EMAIL,
    subject: "Demande de Réservation " + car.carName + " " + car.matricule, // Subject line
    html: info, // html body
  });



    const msgClient = `    <div  style="border:2px black solid">
    <div>
      <center><h2>Al Wifak Rent A Car</h2></center>
  </div>
  <hr/>
  <br/>
  <h3>Nous avons bien reçu votre demande et nous vous remercions de l’intérêt que vous portez à notre service.
   Un membre de notre équipe entrera en contact avec vous dans les plus brefs délais.
  </h3>
  <br/>Détail de la demende référence : ${newRent._id}
  <table>
  <thead>
    <tr>
      <th colspan="3">Information du client</th>
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
          <td>Siège bébé: </td>
          <td></td>
          <td>${bebe}</td>
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
    <center><h4>Conditions générales d’utilisation du service de réservation</h4> </center>
    <hr/>
    <div>
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
                    <hr/>
          <div>
            <center><h4>Al Wifak Rent A Car</h4></center>
            <center><h5>Mobile: +216 25 214 025 - WhatApp: +216 29 060 530</h5></center>
          </div>
          </div>
  
    `

    const msgclient = await transporter.sendMail({
        from: 'alwifak.rentacar@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Demande de Réservation "+car.carName, // Subject line
        html: msgClient, // html body
    });


  res.send('Email sent!')
});

export default userRouter;


