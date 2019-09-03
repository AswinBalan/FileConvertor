const request = require('request');
const AsyncPolling = require('async-polling');

const g = require('glob');
const multer = require('multer');
const express =  require('express');
const path = express('path');

const mw = require('./models/dbmware.js');
// const apicall = require('./models/zamzar.js');

var fs = require('fs'),
    apiKey = 'bd53590e2a1d4dcdac1a79118b18e522b598e640';
 



const storage = multer.diskStorage({
    destination:'./uploads/',
    filename: function(req, file, cb){

        cb(null, file.fieldname + Date.now() + file.originalname);
    }
})

const upload = multer({
    storage : storage
}).single('myimage');


const app = express();
app.use(express.json());
app.use(express.static('static'));
app.use(express.static('downloads'));



//Root
app.get('/', function(req, res){
res.send('Hello');
});

//Home Route
app.get('/home', function(req, res){
    res.sendFile(__dirname+ '/public/index.html');
})


//DashBoard Route
app.get('/dashboard', (req,res)=>{
    res.sendFile(__dirname+ '/public/dash.html');
})

global.jobID;

//Upload
app.post('/upload', function(req, res){
   
    // app.use(apicall());
    //console.log("Entered here");
   
    upload(req, res, (err)=>{
        if(err)
             throw err;
         else 
         global.extension = req.body.select;
            console.log(req.file);
          //res.send("Successfully Uploaded");
         
        //console.log("Entered here");
            formData = {
                target_format: 'png',
                source_file: fs.createReadStream('./uploads/'+ req.file.filename)
            };
            console.log("yes")
           
            request.post({url:'https://sandbox.zamzar.com/v1/jobs/', formData: formData}, function (err, response, body) {
            if (err) {
                console.error('Unable to start conversion job', err);
            } else {
                console.log('SUCCESS! Conversion job started:', JSON.parse(body));
                jobObj = (JSON.parse(body));
                global.jobID = jobObj.id;
                console.log("Uploaded Successfully");
                res.sendFile(__dirname+ '/public/dash.html')
               // res.send("Uploaded Successfully");
            }
            }).auth(apiKey, '', true);
     })
      
});

global.status;
app.get('/jobStatus', function(req,res){
    global.status="";
    console.log(jobID);
   
function statusRequest(jobIDnew) {

    request.get ('https://sandbox.zamzar.com/v1/jobs/'+jobIDnew, function (err, response, body) {
    if (err) {
        console.error('Unable to get job', err);
    } else {
        console.log('SUCCESS! Got job:', JSON.parse(body));
        var st = (JSON.parse(body));
        global.status = st.status;
        global.jobID = st.target_files[0].id;
        console.log(jobID,"targetfiles");
    }
}).auth(apiKey, '', true);

}

setTimeout(statusRequest,30000,global.jobID);

res.end();
     

});

// global.extension ='bm';

app.get('/download', function(req, res){

    var request = require('request'),
    fs = require('fs'),
    apiKey = 'bd53590e2a1d4dcdac1a79118b18e522b598e640';  
    console.log(global.jobID ,"In this download");
    //localFilename = '1564134049783downloaded.png'
    fileName = Date.now()+'downloaded.'+extension;
    localFilename = '/programs/FileConverter/downloads/' + fileName;
    // fileID = 553847346;
    fileID = global.jobID;

    request.get({url: 'https://sandbox.zamzar.com/v1/files/' + fileID + '/content', followRedirect: true}, function (err, response, body) {
        if (err) {
            console.error('Unable to download file:', err);
        } else 
        {
            console.log("Image sent Successfully");
            res.setHeader('Content-Type', 'text/html');
            res.send('http://192.168.43.36:5500/'+fileName);
        }

}).auth(apiKey,'',true).pipe(fs.createWriteStream(localFilename));
});


app.use(mw());

app.post('/post', function(req,res){
    
    console.log("got request from front end" );

});



app.listen(5500,'192.168.43.36');

//Write image from server to the client's directory - I M P O R T A N T

        // async function downloadImage () {  
        //     const url = 'http://192.168.43.36:5500/'+localFilename;
        //     const path = Path.resolve('D:/New Folder/', 'madeit.png')
        //     const writer = fs.createWriteStream(path)
          
        //     const response = await Axios({
        //       url,
        //       method: 'GET',
        //       responseType: 'stream'
        //     })
          
        //     response.data.pipe(writer)
          
        //     return new Promise((resolve, reject) => {
        //       writer.on('finish', resolve)
        //       writer.on('error', reject)
        //     })
        //   }
          
        //   downloadImage()
