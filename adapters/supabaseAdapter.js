import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config({ path: '.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

// CHAT MESSAGES
export async function getMessagesFromSupabase(message) {
  console.log('Adapter: Fetching data from chat', message.chat_id)
  const { data, error } = await supabase.from('chat_messages').select('*').eq('chat_id', message.chat_id)
  if (error) console.error('query error', error);
  else return data;
}

export async function writeMessagesToSupabase(message) {
  console.log('Adapter: writing message');
  const { data, error } = await supabase.from('chat_messages').insert([
    {
      message: message.message,
      chat_id: message.chat_id,
      owner_id: message.owner_id
    },
  ]);
  if (error) console.log('query error', error);
  else return data;
}

export async function editMessageData(message) {
  console.log('Adapter: editing message');
  const { data, error } = await supabase.from('chat_messages').update([
    {
      message: message.message,
      chat_id: message.chat_id,
      owner_id: message.owner_id
    },
  ]).eq('id', message.mess_id);
  if (error) console.log('query error', error);
  else return data;
}

export async function removeMessageData(message) {
  console.log('Adapter: removing message');
  const { data, error } = await supabase.from('chat_messages').delete().eq('id', message.mess_id);
  if (error) console.log('query error', error);
  else return data;
}

// CHATS
export async function getChatsFromSupabase() {
  console.log('Adapter: Fetching chats')
  const { data, error } = await supabase.from('chats').select('*')
  if (error) console.error('query error', error);
  else return data;
}

export async function joinChat(chat) {
  console.log('Trying to join chatroom')
  console.log(chat);
  const { data, error } = await supabase.from('chats').update([
    {
      members: [chat.members]
    },
  ]).eq('appointment_id', chat.appointment_id);
  if (error) console.error('query error', error);
  else return data;
}

export async function writeChatToSupabase(message) {
  console.log('Adapter: writing Chat');
  const { data, error } = await supabase.from('chats').insert([
    {
      owner_id: message.owner_id,
      appointment_id: message.appointment_id,
      name: message.meal
    },
  ]);
  if (error) console.log('query error', error);
  else return data;
}

export async function editChatData(message) {
  console.log('Adapter: editing chat');
  const { data, error } = await supabase.from('chats').update([
    {
      name: message.meal
    },
  ]).eq('id', message.chat_id);
  if (error) console.log('query error', error);
  else return data;
}

export async function removeChatData(message) {
  console.log('Adapter: removing chat');
  const { data2, error2 } = await supabase.from('chat_messages').delete().eq('chat_id', message.chat_id);
  if (error2) console.log('query error', error2);
  else {
  const { data, error } = await supabase.from('chats').delete().eq('id', message.chat_id);
  if (error) console.log('query error', error);
  else return data2, data;
}
}

// export async function registerChatData(message) {
//   console.log('Adapter: Register chat');
//   const { data, error } = await supabase.from('chats').update([
//     {
//       members: [message.members],
//     },
//   ]).eq('id', message.chat_id);
//   if (error) console.log('query error', error);
//   else return data;
// }