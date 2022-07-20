import { createClient } from '@supabase/supabase-js';
import { DATABASE_URL, SUPABASE_SERVICE_API_KEY } from 'src/utils/env-mock';

export const supabaseClient = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);
