const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

var mongoose = require('mongoose');
// set our port
const port = 3000;
// configuration ===========================================
var db = require('./config/db');
//var db = require('./config1/db');
  ;
// config files

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/views"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// app.use(body_parser());
app.use(express.static('public'));
console.log("connecting--",db);
mongoose.connect(db.url); //Mongoose connection created

// frontend routes =========================================================
app.get('/', (req, res,next) => {
     res.sendFile( path.join(__dirname ,'/public/index.html'), function(err){
        if (err) {
            next(err)
          } else {
            console.log('Sent:', 'index.html');

          }
     })
 
  
   })
const  getStudentsList = (res) => {
      Student.find(function(err, students) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err)
         res.send(err);
         console.log(students);
      res.json(students); // return all students in JSON format
    // res.send(JSON.stringify(students));
   });
}

//defining route
app.get('/tproute', function (req, res) {
   res.send('This is routing for the application developed using Node and Express...');
});

var Student = require('./app/models/student');
const { fstat } = require('fs');
app.get('/api/studentsList', function(req, res) {
   getStudentsList(res);
   // use mongoose to get all students in the database

});
app.post('/api/students/send', function (req, res) {
    var student = new Student(); // create a new instance of the student model
    console.log(req.body);
   // student.name = req.query.name; // set the student name (comes from the request)
     student.name = req.body.name; // set the student name (comes from the request)
    student.save(function(err) {
       if (err) res.send(err);
          res.json({ message: 'student created!' });
    });
  // res.json({ message: 'student created!' });
    //res.send('dsd');
 });
 app.delete('/api/students/:student_id', function (req, res) {
    Student.remove({
       _id: req.params.student_id
    }, function(err, bear) {
       if (err)
          res.send(err);
       res.json({ message: 'Successfully deleted' });
    });
 });
// startup our app at http://localhost:3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));







//app.get('/', (req, res,next) => {
   //  var options = {
   //      root: path.join(__dirname, '/'),
   //      dotfiles: 'deny',
   //      headers: {
   //        'x-timestamp': Date.now(),
   //        'x-sent': true
   //      }
   //  };
   //   res.sendFile('/index.html',options, function(err){
   //      if (err) {
   //          next(err)
   //        } else {
   //          console.log('Sent:', 'index.html')
   //        }
   //   })
   // res.render('index', function(err, html ){
   //    if (err) console.log(err);
   //      res.send(html);
   // fs.readFile(__dirname + "/index.html",  'utf8',function(err,data) {
   //    if (err) console.log("errrrrrrrrr" + err);
   //    console.log(data);
   //    console.log(typeof data);
      
   //     res.send(data);
   // })