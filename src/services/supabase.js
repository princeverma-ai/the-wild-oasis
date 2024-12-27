import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://gzoeslnyfpacnjgxihyf.supabase.co";

const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6b2VzbG55ZnBhY25qZ3hpaHlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0MzA5MjAsImV4cCI6MjA1MDAwNjkyMH0.qv6N7c6QBf7TpizkqJE28erOKrHPhGGpnCbi1uulJzo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
