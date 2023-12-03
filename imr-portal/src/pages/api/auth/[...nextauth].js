import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({

  providers: [
    CredentialsProvider({
      // The name display on the sign-in form
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign-in page.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        //checking credentials
        if (credentials.username === 'admin' && credentials.password === 'admin') {
          return { id: 1, name: 'Admin', email: 'admin@example.com', role: 'admin' };
        } else if (credentials.username === 'user' && credentials.password === 'user') {
          return { id: 2, name: 'User', email: 'user@example.com', role: 'user' };
        } else {
          return null;// if null or false its error
        }
      },
    }),
  ],
//sign in/out 
  pages: {
    signIn: '/auth/signin', // sign in and other pages 
  },
  callbacks: {
    async session({ session, token }) {
      // Add role to the user session
      if (token.role) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add role to the JWT token
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: "sait-key", //encryption key 
    encryption: true,
  },
  debug: false,
});
