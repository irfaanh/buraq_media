// src/actions/auth.ts
'use server';

import { actionClient } from '../lib/safeAction';
import { auth } from '../lib/auth';
import { returnValidationErrors } from 'next-safe-action';
// import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { loginSchema } from '../schemas/user-schema';

export const loginAction = actionClient
  .inputSchema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      // Use better-auth to sign in
      const signInResult = await auth.api.signInEmail({
        body: {
          email,
          password,
        },
      });      

      if (!signInResult.user) {
        return returnValidationErrors(loginSchema, {
          _errors: ['Invalid email or password'],
        });
      }

      // The nextCookies plugin will automatically handle setting the session cookies
      return {
        success: true,
        message: 'Login successful',
        redirectTo: '/admin/dashboard',
      };
    } catch (error) {
      console.error('Login error:', error);
      return returnValidationErrors(loginSchema, {
        _errors: ['Invalid email or password'],
      });
    }
  });

// Logout action
export const logoutAction = actionClient.action(async () => {
  // Clear all auth-related cookies
  const cookieStore = await cookies();

  // Clear potential better-auth session cookies
  cookieStore.delete('better-auth.session_token');
  cookieStore.delete('session_token');
  cookieStore.delete('auth.session-token');

  // Redirect to login page
  // redirect('/login');
});
