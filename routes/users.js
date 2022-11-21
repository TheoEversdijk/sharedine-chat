import { MongoClient } from "mongodb";
import bodyParser from 'body-parser';
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const jsonParser = bodyParser.json()
const EXAMPLEROUTER = express.Router()

const DBUser = process.env.DB_USER || "";
const DBPassword = process.env.DB_PASSWORD || "";
const url = `mongodb+srv://${DBUser}:${DBPassword}@tjourney.sbi37ec.mongodb.net/?retryWrites=true&w=majority`;

EXAMPLEROUTER.get("/", async (req, res, next) => {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {
        const data = await client.db("<DB>").collection("<COLLECTION>").find()
        const dataArray = await data.toArray()
        client.close();

        res.status(200).send(dataArray)
    } catch (err) {
        res.status(500).send(err);
    }
})

export default EXAMPLEROUTER