import { MongoClient } from "mongodb";
import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import EXAMPLEROUTER from "./routes/users.js";
dotenv.config()

const domainsFromEnv = process.env.CORS_DOMAINS || ""
const port = process.env.PORT || 5000

const whitelist = domainsFromEnv.split(",").map(item => item.trim())

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}

const app = express();


app.use(cors(corsOptions))

app.get('/', (req, res) => res.status(200).send())

app.use("/users", EXAMPLEROUTER)

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})

