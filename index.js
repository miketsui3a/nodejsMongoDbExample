var express = require("express");
var app = express();

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://xxxx:xxxx@cluster0-vmlbv.mongodb.net/test?retryWrites=true&w=majority";

const bodyParser = require('body-parser');

app.use(bodyParser.json());

MongoClient.connect(url, (err, client) => {
    if (err) return console.log(err)
    db = client.db('web')
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
})


app.get('/',(req,res)=>{
	res.send("Welcom");
})


app.post('/event',(req,res)=>{
	console.log(req.body)
	db.collection('events').save(req.body,function(err,res){
		if (err) throw err;
		console.log("added")
	})
})

app.get('/event',(req,res)=>{
	db.collection('events').find({}).toArray((err,result)=>{
		if(err) return console.log(err);
		res.send(result)
	})
})

app.get('/event/:name',(req,res)=>{
	db.collection('events').find({name:req.params.name}).toArray((err,result)=>{
		if(err) return console.log(err);
		res.send(result)
	})
})
