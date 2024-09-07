import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://hvsxkfabvucbrlavaicx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2c3hrZmFidnVjYnJsYXZhaWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2NzU2NzYsImV4cCI6MjA0MTI1MTY3Nn0.UmhfJWXyZ9rZGZpL0Yhj6l4rBBLZue-umsePITZI3U8"
);
