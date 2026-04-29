const SUPABASE_URL = "ISI_URL_KAMU";
const SUPABASE_KEY = "ISI_ANON_KEY_KAMU";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);