import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config({ path: '.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export async function getMessagesFromSupabase(id) {
  console.log('Adapter: Fetching data from chat', id)
  // return all data from the supabase appointments table
  const { data, error } = await supabase.from('chat_messages').select('*').eq('chat_id', id)
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

export async function editMessageData(mess, message) {
  console.log('editing message');
  const { data, error } = await supabase.from('chat_messages').update([
    {
      message: message.message,
      chat_id: message.chat_id,
      owner_id: message.owner_id
    },
  ]).eq('id', mess);
  if (error) console.log('query error', error);
  else return data;
}

export async function removeMessageData() {
  console.log('removing message');
}