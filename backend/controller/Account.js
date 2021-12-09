
// const getAccount = (req, res, next) => {
//     let posts = await loadAccountCollection();
// 	res.send(await posts.find({}).toArray());
// };

// const createAccount = (req, res, next) => {
// 	const posts = await loadAccountCollection();
// 	await posts.insertOne({
// 		title: req.body.title,
// 		text: req.body.text,
// 		createdAt: new Date()
// 	}, (err, result) => {
// 		if (err) throw err;
// 	});
// 	res.status(201).send();	
// };

// const findAccount = (req, res, next) => {
// 	res.json({message: "get one Account"});
// 	const posts = await loadAccountCollection();
// 	res.send(await posts.find({'text': new RegExp(req.body.text, 'i')}).toArray());
// 	res.status(200).send();
// };

// const destroyAccount = (req, res, next) => {
// 	res.json({message: "destroy Account"});
// 	const posts = await loadAccountCollection();
// 	await posts.deleteOne({
// 		_id: new mongodb.ObjectId(req.params.id) 
// 	}, (err, res) => {
// 		if (err) throw err;
// 	});
// 	res.status(200).send();
// };

// const updateAccount = (req, res, next) => {
// 	res.json({message: "update Account"});
// 	const posts = await loadAccountCollection();
// 	await posts.updateOne(
// 		{_id: new mongodb.ObjectId(req.params.id) },
// 		{$set:{
// 			title:req.body.title,
// 			text:req.body.text} },
// 		{upsert: true}
// 	, (err, res)=>{
// 		if (err) throw err;
// 	});
// 	res.status(200).send();
// };

// module.exports = {
// 	getAccount,
// 	createAccount,
// 	findAccount,
// 	destroyAccount,
// 	updateAccount,
// };