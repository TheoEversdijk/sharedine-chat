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
    const getMessagesData = await getMessagesFromSupabase(req.params.id);
    res.json(getMessagesData)
}

// Function that posts message to chat_messages database with chat_id and owner_id
// TODO: ONLY DO IF USER IS PART OF CHAT
export async function setMessages(req, res, next) {
    console.log('Controller: Set message')
    const message = {};
    if (req.query.message && req.query.owner_id) {
        message.message = req.query.message;
        message.chat_id = req.params.id;
        message.owner_id = req.query.owner_id; // TODO: DON'T DO OWNER_ID VIA QUERY
        await writeMessagesToSupabase(message)
        const rows = await getMessagesFromSupabase();
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
    if (req.query.message && req.query.owner_id) {
        message.message = req.query.message;
        message.chat_id = req.params.id;
        message.owner_id = req.query.owner_id; // TODO: DON'T DO OWNER_ID VIA QUERY
        await editMessageData(req.query.mess, message)
        res.json({
            title: 'Message Edited',
            message: `Message "${message.message}" has been added to chat ${message.chat_id} by user ${message.owner_id}`,
        });

    }
}

export async function removeMessage(req, res, next) {
    console.log('Remove message')

}