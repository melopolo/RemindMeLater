
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://qexxjrsmnnpcudmbfvgj.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFleHhqcnNtbm5wY3VkbWJmdmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MTUzMDIsImV4cCI6MjA1OTk5MTMwMn0.XNrXVa9qsTJtMPapAXcHdga2oWTDOAjrh9tUt6YWMYE";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
