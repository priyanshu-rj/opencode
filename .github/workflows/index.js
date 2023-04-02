const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/priyanshuraj',{useNewUrlParser: true});

var login =new mongoose.Schema({
    name:String,
    pass:String,
    person:String,
    number:String,
});

const loginup =new mongoose.model('document', login);  // main hai ye dbs ka 

app.post('/signup.html',(req,res)=>{
    var temp =new loginup({
        name: req.body.mail,
        pass: req.body.pass,
        person: req.body.namo,
        number: req.body.number,
    });
    const name = req.body.mail;
     const pass = req.body.pass;
      const person = req.body.namo;
      const rep = req.body.repeat;
      const num1 = req.body.number;
    if(name=="" || pass=="" || person=="" || num1==""){
        res.send("please fill this information");
    }

    else if(pass!=rep){
         res.send("password does not  match");
    }

    else{
    temp.save();
    console.log(temp);
    }

    function generateOTP() {
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 4; i++ ) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }

    var tempotp =  generateOTP() ;


// yha se start hai mail box



const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'ra0001j@gmail.com',
        pass: 'lztneumdqnfhiwaf'
    } 
});
    const name2 = req.body.mail;
    var mailOptions = {
      from: 'ra0001j@gmail.com',
      to: name2,
      subject: 'thanks for registration',
      text: 'Welcome to priyanshu website your otp is ' + tempotp
    };



    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

//end
    res.sendfile('sucessSign.html');})

app.post('/login.html',async (req,res)=>{
  const nam =  req.body.maill;
  const pas = req.body.passs;
 const username =  await loginup.findOne({name:nam});
 const t = username.pass;
 const k = username.person;
 const l = username.name;
 const number1 = username.number;
 console.log(k);
if(t===pas){
    let names = k;
    res.render('profile',{
      userName: names,
      usermail: l,
      number: number1
    });
}
else{
    res.send("password or username wrong plz check them");
}

})


//home backund

app.use(express.static(__dirname +"/" ))

app.get('/',(req,res)=>{
    res.sendfile(__dirname + "/main.html");
})



app.get('/login.html',(req,res)=>{
    res.sendfile('login.html');
})

app.get('/signup.html',(req,res)=>{
    res.sendfile('signup.html');
})

var PORT = 9000;

app.listen(PORT,(req,res)=>{
    console.log(`server starting at ${PORT}`);
})


var nodemailer = require('nodemailer');


//ejs
const ejs = require('ejs');
app.set('view engine', 'ejs');



