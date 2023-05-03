import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image?: string;
      apiKey: string;
    };
  }
  interface User {
    apiKey: string;
  }
  interface JWT {
    apiKey: string;
  }
  interface Account {
    apiKey: string;
  }
}
