import {
    getMessagesFromSupabase,
    writeMessagesToSupabase,
    editMessageData,
    removeMessageData
} from '../adapters/supabaseAdapter.js'

// Function that returns all the entries from the messages table with certain chat_id
// TODO: ONLY DO IF USER IS PART OF CHAT
export async function getMessages(req, res, next) {
    console.log('Controller: Get messages')
    const message = {};
    if (req.params.id) {
        message.chat_id = req.params.id
        const getMessagesData = await getMessagesFromSupabase(message);
        res.json(getMessagesData)
    } else {
        res.status(422);
        res.json({
            title: 'cannot find messages',
            message: `You need to input a chat id`,
        });
    }
}

// Function that posts message to chat_messages database with chat_id and owner_id
// TODO: ONLY DO IF USER IS PART OF CHAT
export async function setMessages(req, res, next) {
    console.log('Controller: Set message')
    const message = {};
    if (req.body.message && req.body.owner_id && req.params.id) {
        message.message = req.body.message;
        message.chat_id = req.params.id;
        message.owner_id = req.body.owner_id; // TODO: DON'T DO OWNER_ID VIA QUERY
        await writeMessagesToSupabase(message)
        res.json({
            title: 'Message added',
            message: `Message "${message.message}" has been added to chat ${message.chat_id} by user ${message.owner_id}`,
        });
    } else {
        res.status(422);
        res.json({
            title: 'cannot add message',
            message: `You need to input a message`,
        });
    }
}

// Function that posts message to chat_messages database with chat_id and owner_id
// TODO: ONLY DO IF USER IS PART OF CHAT AND OWNER OF MESSAGE
// TODO?: ADD 'EDITED' PARAMETER
export async function editMessage(req, res, next) {
    console.log('Controller: Edit message')
    const message = {};
    if (req.query.message && req.query.owner_id && req.params.id && req.query.mess_id) {
        message.message = req.query.message;
        message.chat_id = req.params.id;
        message.owner_id = req.query.owner_id; // TODO: DON'T DO OWNER_ID VIA QUERY
        message.mess_id = req.query.mess_id
        await editMessageData(message)
        res.json({
            title: 'Message Edited',
            message: `Message "${message.message}" has been added to chat ${message.chat_id} by user ${message.owner_id}`,
        });
    } else {
        res.status(422);
        res.json({
            title: 'cannot edit message',
            message: `You need to input a message, chat_id, owner_id and mess_id`,
        });
    }
}

// Function that removes message from chat_messages database
// TODO: ONLY DO IF USER IS PART OF CHAT AND OWNER OF MESSAGE
export async function removeMessage(req, res, next) {
    console.log('Controller: Remove message')
    const message = {};
    if (req.query.mess_id) {
        message.mess_id = req.query.mess_id
        await removeMessageData(message);
        res.json({ message: `Removed ${req.query.mess_id}` });
    } {
        res.status(422);
        res.json({
            title: 'cannot remove message',
            message: `You need to input a mess_id`,
        });
    }
}