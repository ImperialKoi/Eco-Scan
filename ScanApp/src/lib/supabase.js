import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xubowovehsilviqvygsz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1Ym93b3ZlaHNpbHZpcXZ5Z3N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NjAyNjEsImV4cCI6MjA1OTQzNjI2MX0.4Sdgaa6u7wqAZ7NqwM6fY1t0ejici7eyiPDw4wZabT4';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);