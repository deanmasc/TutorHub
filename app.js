const express = require('express')

var path = require('path')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.listen(3000)

app.use(express.json());
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'views/enquiry.html')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended:true}))



app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/home.html')
})

app.get("/aboutus", (req, res) => {
    res.sendFile(__dirname + '/views/about_us.html')
})

app.get("/enquiry", (req, res) => {
    res.sendFile(__dirname + '/views/enquiry.html')
})

app.get("/services", (req, res) => {
    res.sendFile(__dirname + '/views/services.html')
})

app.post('/send_email', (req, res) => {
    // Get form data
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const subject = req.body.subject;

    // Send email
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 465,
        secure: true, // Use SSL
        auth: {
            user: 'tutorhub321@gmail.com',
            pass: 'nnsoyyjojlhsblhv'
        }
    });

    const mailOptions = { 
        from: 'tutorhub321@gmail.com',
        to: 'tutorhub321@gmail.com',
        subject: 'New Enquiry',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject/s: ${subject}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error(error);
        }
        console.log('Email sent:', info.response);
    });
});