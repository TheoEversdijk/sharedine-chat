import {
    getChatsFromSupabase,
    writeChatToSupabase,
    editChatData,
    removeChatData,
    joinChat
} from '../adapters/supabaseAdapter.js'

// Function that shows chats from chat_messages database
export async function getChats(req, res, next) {
    console.log('Controller: Get Chats')
    const getChatsData = await getChatsFromSupabase();
    res.json(getChatsData)
}

// Function that shows chats from chat_messages database
export async function joinChatByAppointment(req, res, next) {
    console.log('Controller: Get Chats with appointment_id')
    const chat = {
        appointment_id: req.body.appointment_id,
        members: req.body.member
    };
    const getChatsData = await joinChat(chat);
    res.json(getChatsData)
}

// Function that makes chat in chat_messages database
export async function setChat(req, res, next) {
    console.log('Controller: Set Chat')
    const message = {};
    if (req.body.owner_id && req.body.appointment_id && req.body.meal) {
        message.owner_id = req.body.owner_id;
        message.appointment_id = req.body.appointment_id;
        message.meal = req.body.meal;
        await writeChatToSupabase(message)
        res.json({
            title: 'Chat added',
            message: `Chat by ${message.owner_id} has been added with ${message.members}`,
        });
    } else {
        res.status(422);
        res.json({
            title: 'cannot add chat',
            message: `You need to input a owner_id`,
        });
    }
}

// Function that edits chat in chat_messages database
export async function editChat(req, res) {
    console.log('Controller: Edit chat')
    const message = {};
    if (req.body.chat_id && req.body.meal) {
        // message.owner_id = req.body.owner_id;
        message.chat_id = req.body.chat_id;
        // message.createdat = req.body.createdat;
        message.meal = req.body.meal;
        await editChatData(message)
        res.json({
            title: 'Chat Edited',
            message: `Chat ${message.chat_id} by ${message.owner_id} edited`,
        });
    } else {
        res.status(422);
        res.json({
            title: 'cannot edit chat',
            message: `You need to input a owner_id and members`,
        });
    }
}

// Function that removes chat in chat_messages database
// TODO: ONLY DO IF USER IS OWNER
export async function removeChat(req, res, next) {
    console.log('Controller: Remove chat')
    const message = {};
    if (req.body.chat_id) {
        message.chat_id = req.body.chat_id
        await removeChatData(message);
        res.json({ message: `Removed ${req.body.chat_id}` });
    } else {
        res.status(422);
        res.json({
            title: 'cannot register',
            message: `You need to input a chat_id`,
        });
    }
}

// export async function registerChat(req, res, next) {
//     console.log('Controller: Register chat')
//     const message = {};
//     if (req.body.members && req.params.id) {
//         message.members = req.body.members
//         message.chat_id = req.params.id
//         await registerChatData(message);
//         res.json({ message: `Registered for ${req.params.id}` });
//     } else {
//         res.status(422);
//         res.json({
//             title: 'cannot remove chat',
//             message: `You need to input a chat_id`,
//         });
//     }
// }