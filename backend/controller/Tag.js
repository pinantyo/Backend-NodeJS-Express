const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

async function loadTagsCollection(){
	const { MongoClient } = require('mongodb');
	//const uri = "mongodb+srv://steven:steven2001@cluster0.gh4nv.mongodb.net/Cluster0?retryWrites=true&w=majority";
	try{
		//MongoDB connect
		const client = await mongodb.MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
		return client.db('Cluster0').collection('tags');
	} catch (err) {
		console.log(err.message);
	}
}

//Get Post
router.get('/', async (req, res) => {
	let posts = await loadTagsCollection();
	res.send(await posts.find({}).toArray());
});

//Search
router.get('/search', async (req, res) => {
	const posts = await loadTagsCollection();
	res.send(await posts.find({'text': new RegExp(req.body.text, 'i')}).toArray());
	res.status(200).send();
});

//Add Post
router.post('/', async(req, res)=>{
	const posts = await loadTagsCollection();
	await posts.insertOne({
		title: req.body.title,
		text: req.body.text,
		createdAt: new Date()
	}, (err, result) => {
		if (err) throw err;
	});
	res.status(201).send();	
});

//Delete Post
router.delete('/:id', async (req, res)=>{
	const posts = await loadTagsCollection();
	await posts.deleteOne({
		_id: new mongodb.ObjectId(req.params.id) 
	}, (err, res) => {
		if (err) throw err;
	});
	res.status(200).send();
});

//Update Post
router.put('/:id', async(req, res)=>{
	const posts = await loadTagsCollection();
	await posts.updateOne(
		{_id: new mongodb.ObjectId(req.params.id) },
		{$set:{
			title:req.body.title,
			text:req.body.text} },
		{upsert: true}
	, (err, res)=>{
		if (err) throw err;
	});
	res.status(200).send();
});

module.exports = Tag;