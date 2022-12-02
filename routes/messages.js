import express from 'express';
import { getMessages, setMessages, getSingleMessage, editMessage, removeMessage } from '../controllers/MessageController.js';
const router = express.Router();

/**
 * all Messages routes
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



router.get('/', (req, res, next) => {
  res.json('Connection with the Message database has been made');
});

router.get('/Messages/:id', getSingleMessage);

router.get('/Messages', getMessages);

router.post('/Messages', setMessages);

router.put('/Messages/:id', editMessage);

router.delete('/Messages/:id', removeMessage);

export default router;