const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

app.set('port', (process.env.PORT || 5000));

// View engine setup
app.engine('handlebars', exphbs({
    defaultLayout: "main"
  })
);
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.googlemail.com', // Gmail Host
    port: 465, // Port
    secure: true, // this is true as port is 465
    auth: {
        user: process.env.USER_NAME, //Gmail username
        pass: process.env.ACCT_PASS // Gmail password
    }

  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '${req.body.email}', // sender address
    to: process.env.USER_SENT, // list of receivers
    subject: 'Node Contact Request', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
  res.redirect('/#thankyou');
});

app.get('/', function(request, response) {
  var result = 'App is running'
  response.send(result);

}).listen(app.get('port'), function() {
  console.log('App is running, server is listening on port http://localhost:%s/ ', app.get('port'));
});