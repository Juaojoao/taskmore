import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema/user";

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      const existingUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, user.email!))
        .limit(1);

      if (!existingUser) {
        await db.insert(usersTable).values({
          id: crypto.randomUUID(),
          name: user.name!,
          email: user.email!,
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        // Depois do signIn, user é seu usuário do NextAuth (Google)
        // Busque o ID no banco e coloque no token

        const dbUser = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, user.email!))
          .limit(1);

        if (dbUser.length > 0) {
          token.sub = dbUser[0].id;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
