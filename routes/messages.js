import express from 'express';
import { getMessages, setMessages, editMessage, removeMessage } from '../controllers/MessagesController.js';
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



router.get('/', (req, res, next) => {
  res.json('Connection with the chat messages database has been made');
});

router.get('/chat/:id', getMessages);

router.post('/chat/:id', setMessages);

router.put('/chat/:id', editMessage);

// router.delete('/appointments/:id', removeAppointment);

export default router;
