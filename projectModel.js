// var MongoClient = require('mongodb').MongoClient;
// MongoClient.connect("http://localhost:27017/project",function (err,data) {
//     if(err) throw err;
//     console.log("MongoDb is connected...");
//     db.close();
// });
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/nodeDb');
var schema = new mongoose.Schema({
    ID: {type:String},
    title:{type:String}
});
schema.methods.show = () => {
    var msg = 'ID: '+this['ID']+" , "+
        'title: '+this['title'];
    console.log(msg);
}
var useDB = mongoose.model('edgeSensor',schema);


// inser is working
// var insert = new useDB({ID:'a001',title:'Mary'});
// insert.save(function(err,useDB){
//     if(err) throw err;
//     console.log('save completed!');
// });

// update is working
// useDB.update({ID:'a004',title:'Tim'},{ID:'a004',title:'Tommy'},function(err,up){
//     if(err || !up){
//         console.log("file not found");
//     }else{
//         console.log("done");
//         // console.log(up);
//     }
// });

// remove is working
// useDB.remove({ID:'a11'},function (err,re) {
//     if(err || !re){
//         console.log("remove fail");
//     }else{
//         console.log(re);
//         console.log("remove completed");
//     }
// });

// find all is working
// useDB.find({},function (err,list) {
//     if(err || !list){
//         console.log("empty");
//     }else{
//         find 必須要搭配forEach迴圈,才能適當展示訊息
//         list.forEach(function (l) {
//             var data = new useDB(l);
//             data.show(); // display using function show()
//             // console.log(l.ID+" : "+l.title); // display method 1
//         });
//     }
// });

// find one is working
// useDB.find({ID:'a002'},function (err,doc) {
//     if(err || !doc){
//         console.log("error!");
//     }else{
//         doc.forEach(function (d) {
//             var data = new useDB(d);
//             // data.show();
//             console.log(data.ID+" : "+data.title);
//         })
//     }
// });

module.exports = useDB;