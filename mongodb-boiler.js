// const client = await MongoClient.connect(url, { useNewUrlParser: true })
//     .catch(err => { console.log(err); });

// if (!client) {
//     return;
// }

// try {
//     const data = await client.db("tjourney").collection("users").findOne()
//     client.close();

//     res.status(200).send(data)
// } catch (err) {
//     res.status(500).send(err);
// }
