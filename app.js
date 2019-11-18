var app = require('express')();
var bodyParser =  require("body-parser");
var http = require('http').Server(app);
var io = require('socket.io')(http);

const mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.sendFile(__dirname+'/course.html');
});

var client = 0;
var LDR = '';      // var เป็นให้ทุกอย่าง เช่น string , int , bool
var PIR = '';
var Statee = '';
var LDR_int = 0 ;
var Timee_sleep = '';
var LDR_Analog = '';
var Realtimes = '';
console.log("gggggg")

app.post('/addName',function(req,res){            // addnamr = path 
    LDR = req.body.LDR_sensor  ;
    PIR = req.body.PIR ;
    Statee = req.body.State ;
    Timee_sleep = req.body.Time;
    LDR_Analog = req.body.LDR_Analog;
    Realtimes = req.body.TimeNTP;



    console.log(req.body);
    LDR_int = parseInt(LDR);                   // convert string for int 
    
    io.sockets.emit('broadcast',{ message: "LDR_Sensor : " +LDR + " PIR sensor "+ PIR +"Status_LED :"+Statee +"Time_sleep : "+Timee_sleep});
    io.sockets.emit('ldr Sensor',LDR_int)
    io.sockets.emit('LDR_Analog',LDR_Analog)
    io.sockets.emit('leep_Time',Timee_sleep)
    io.sockets.emit('Realtime',Realtimes)
    io.sockets.emit('State_LED',Statee)

    console.log(Statee);
 

/* 


    mongo.connect(url,function(err,db){
        if (err) throw err ;
        var read_json = {LDR:LDR,PIR:PIR,Status_LED:State};
        var database = db.db("tunk");
    


        database.collection("sensor").insertOne(read_json,function(err,response){
            if (err) throw err ;
             console.log("complete  collection");
               db.close();  
        })
        

});
*/

    res.end("yes");

});


io.on('connect',function(socket){
    client++;
    io.sockets.emit('broadcast',{ message: "LDR_Sensor : " +LDR + " PIR sensor "+ PIR +"Status_LED :"+Statee +"Time_sleep : "+Timee_sleep});

    socket.on('disconnect',function(){
        client--;
        io.sockets.emit('broadcast',{ message: "LDR_Sensor : " +LDR + " PIR sensor "+ PIR +"Status_LED :"+Statee +"Time_sleep : "+Timee_sleep});
    });

});

http.listen(3000,function(req,res){
    console.log('start server at 3000');

});