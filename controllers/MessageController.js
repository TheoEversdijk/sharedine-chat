import { getMessagesFromSupabase, 
    getSingleMessageFromSupabase, 
    writeMessagesToSupabase, 
    editMessageData,
    removeMessageData } from '../adapters/supabaseAdapter.js'

// Function that gets a single Message from the database
export async function getSingleMessage(req, res, next) {
    console.log('Attempting to get a single Message')
    const singleMessageData = await getSingleMessageFromSupabase(req.params.id);
    res.json(singleMessageData)
}

// Function that returns all the entries from the Messages table
export async function getMessages(req, res, next) {
    console.log('Get Message')
    const getMessagesData = await getMessagesFromSupabase();
    res.json(getMessagesData)
}

export async function setMessages(req, res, next) {
    const message = {};
    const before = await getMessagesFromSupabase();
    if (req.query.name && req.query.date && req.query.time) {
      message.message = req.query.message;
      message.date = req.query.date;
      message.time = req.query.time;
      await writeMessagesToSupabase(message)
      const rows = await getMessagesFromSupabase();
      if (rows.length >= before.length) {
        res.json({
          title: 'Message added',
          message: `Message ${message.name} has been added`,
        });
      } else {
        res.status(500);
        res.json({
          title: 'cannot add message',
          message: `Unknown causes`,
        });
      }
    } else {
      res.status(422);
      res.json({
        title: 'cannot add message',
        message: `You need to give the name, date and time`,
      });
    }
    
}

export async function editMessage(req, res, next) {
    const message = {};
    if (req.query.name && req.query.date && req.query.time) {
      message.name = req.query.name;
      message.date = req.query.date;
      message.time = req.query.time;
      await editMessageData(req.params.id, message)
      res.json({
        title: 'Message editted',
        message: `Message ${message.name} has been added`,
      });
    }
  }
  
  export async function removeMessage(req, res, next) {
    const id = req.params.id
    const before = await getMessagesFromSupabase();
    await removeMessageData(req.params.id);
    const after = await getMessagesFromSupabase();
    if (before.length > after.length) {
      res.json({ message: `Removed ${id}` });
    } else {
      res.status(500).json({ message: 'Cannot remove Message' });
    }
  }
