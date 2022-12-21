// start.js setup from learnnode.com by Wes Bos
import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import cors from "cors";
import messagesrouter from './routes/messages.js';

const app = express();

// support json encoded and url-encoded bodies, mainly used for post and update
app.use(express.json());

app.use(cors("Access-Control-Allow-Origin: *"))

// app.get('/', (req, res) => res.status(200).send())
app.get('/', (req, res) => res.status(200).send("ShareDine UserAPI"))

app.use('/chat', cors(), messagesrouter)

app.set('port', process.env.PORT || 3004);
const server = app.listen(app.get('port'), () => {
  console.log(`🍿 Express running → PORT ${server.address().port}`);
});
