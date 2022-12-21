import express from 'express';
import bodyParser from 'body-parser';
import { getMessages, setMessages, editMessage, removeMessage } from '../controllers/MessagesController.js';
import { getChats, setChat, editChat, removeChat, joinChatByAppointment } from '../controllers/ChatsController.js';
const router = express.Router();

/**
 * all appointments routes
 */
 router.options('/', (req, res, next) => {
  //set header before response
  res.header({
    allow: 'GET, POST, OPTIONS',
    'Content-type': 'application/json',
    Data: Date.now(),
    'Content-length': 0,
  });
  //response
  res.sendStatus(200);
});

const jsonParser = bodyParser.json()

router.get('/', jsonParser, getChats);

router.post('/', jsonParser, setChat);

router.put('/', jsonParser, editChat);

router.delete('/', jsonParser, removeChat);

router.put('/register', jsonParser, joinChatByAppointment);

router.get('/:id', jsonParser, getMessages);

router.post('/:id', jsonParser, setMessages);

router.put('/:id', jsonParser, editMessage);

router.delete('/:id', jsonParser, removeMessage);

export default router;
