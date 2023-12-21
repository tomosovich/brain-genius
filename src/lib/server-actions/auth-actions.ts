'use server';

import { z } from 'zod';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { FormSchema } from '../types';
import { cookies } from 'next/headers';

// Authentication actions
export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
    // store a cookie with the user's session
  const supabase = createRouteHandlerClient({ cookies });
  // authenticate the user with email and password via Supabase
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return response;
}

// Registration actions
export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
    // Create a new user in Supabase
  const supabase = createRouteHandlerClient({ cookies });
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email);
// If the user already exists, return an error
  if (data?.length) return { error: { message: 'User already exists', data } };
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
    },
  });
  return response;
}

