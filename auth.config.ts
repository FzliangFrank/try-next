import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';
 
export const authConfig = {
  pages: {
    signIn: '/login', // redirect user into CUSTOM page rather than next's page
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log('Evaluate auth config callback!');
      console.log(`Evaluated at ${nextUrl.pathname}`);
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // Redirect logged-in users away from login page to dashboard
        if (nextUrl.pathname.startsWith('/login')) {
          return NextResponse.redirect(new URL('/dashboard', nextUrl));
        }
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig; // type validation