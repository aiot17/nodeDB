var express = require("express");
var app = express();
var useDB = require('./projectModel');
var bodyParser = require("body-parser");
const { render } = require("ejs");
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/delete',(req,res) => {
    // delete is working
    var remov = req.query.remove;
    var msg = "";
    useDB.remove({ID:remov},(err,re) => {
        if(err || !re){
            msg = "interal error";
            res.render("main",{msg:msg});
        }else{
            msg = "remove completed";
            res.render("main",{msg:msg});
        }
    });
})

app.post('/update',(req,res)=>{
    // update is working
    var id = req.body.update;
    var newTitle = req.body.title;
    var msg = "";

    useDB.find({ID:id},(err,doc) => {
    if(err || !doc){
        msg = "not found";
        res.render('main',{msg:msg});
    }else{
        doc.forEach((d) => {
            var data = new useDB(d);
            var oldTitle = data.title; 
            useDB.update({ID:id,title:oldTitle},{ID:id,title:newTitle},(err,up)=> {
                if (err) throw err;
                msg = "update done!";
                res.render("main",{msg:msg});
                });   
        })
    }
    });
})

app.post('/addOne',(req,res)=>{
    // add one is working
    var id = req.body.insert;
    var title = req.body.title;
    var insert = new useDB({ID:id,title:title});
    insert.save((err,useDB)=>{
    if(err) throw err;
    var msg = "save completed!"
    res.render('main',{msg:msg});
    });
});
app.get('/find_all',(req,res)=>{
    // find all is working
    var msg = "";
    useDB.find({},(err,list)=>{
        check = true;
        if(err || !list){
            msg = "empty";
            res.render('main',{msg:msg})
        }else{
            doc = {};
            res.render('showAll',{doc:list});
        }
    });
});

app.get('/find_One',(req,res)=>{
    // find one is working
    var id = req.query.findOne;
    var msg = "";
    useDB.find({ID:id},(err,doc) => {
        if(err || !doc){
            msg = "not found";
            res.render('main',{msg:msg});
        }else{
            doc.forEach((d) => {
                var data = new useDB(d);
                msg = data.ID + " : " + data.title;
                res.render('main',{msg:msg});
            })
        }
        });
})

app.get('/',(req,res)=>{
    // main no request
    var msg = "";
    res.render("main",{msg:msg});
})

app.listen(5000,(req,res)=>{
    console.log("port 5000 connecting...");
});