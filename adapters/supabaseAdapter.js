import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config({ path: '.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export async function getSingleMessageFromSupabase(id) {
    console.log('Fetching data from supabase')
    const { data, error } = await supabase.from('chat_messages').select('*').eq('id', id);
    if(error) console.error('query error', error);
    else return data;
}

export async function getMessagesFromSupabase() {
    console.log('Fetching data from supabase')
    // return all data from the supabase Messages table
    const { data, error } = await supabase.from('chat_messages').select('*')
    if(error) console.error('query error', error);
    else return data;
}

export async function writeMessagesToSupabase(message) {
    console.log('Message:', message.name);
  const { data, error } = await supabase.from('chat_messages').insert([
    {
      name: message.name,
      date: message.date,
      time: message.time,
    },
  ]);
  if (error) console.log('query error', error);
  else return data;
}

export async function editMessageData(id, message) {
  console.log('Message:', message.name);
  const { data, error } = await supabase.from('chat_messages').update([
    {
      name: message.name,
      date: message.date,
      time: message.time,
    },
  ]).eq('id', id);
  if (error) console.log('query error', error);
  else return data;
}

export async function removeMessageData(id) {
    console.log('removing id:', id);
    const { data, error } = await supabase.from('chat_messages').delete().eq('id', id);
    if (error) console.log('query error', error);
    else return data;
  }