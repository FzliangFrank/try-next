
import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login', // redirect user into CUSTOM page rather than next's page
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        try {
          return Response.redirect(new URL('/dashboard', nextUrl));
        } catch (error) {
          console.log('Error is caught while redirecting to dashboard');
          console.log('nextUrl:', nextUrl);
          console.log('error:', error);
          throw error;
        }
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig; // type validation