const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')
const requireAuth = require('../middlewares/requireAuth');

const Email = mongoose.model('Email');

const router = express.Router();

router.use(requireAuth);

router.get('/emails', async (req, res) => {
  const emails = await Email.find({ userId: req.user._id });

  res.send(emails);
});



router.post('/emails', async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.dotster.com',
    port: 465,
    auth: {
        user: 'kyle@transplanet.net',
        pass: 'Brothers25'
    }
  });
  const { subject, message} = req.body;

  if (!message) {
    return res
      .status(422)
      .send({ error: 'You must provide a message' });
  }

  try {
    const email = new Email({ subject, message, userId: req.user._id, email: req.user.email });
    await email.save();
    let info = await transporter.sendMail({
      from: 'kyle@transplanet.net', // sender address
      to: email.email, // list of receivers
      subject: email.subject, // Subject line
      text: email.message, // plain text body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
    res.send(email);
  } catch (err) {
    res.status(422).send({ error: "second" });
  }


});

module.exports = router;
