import {  credentials, error } from "@/types/types";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import CrendentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { errorAtom } from "@/atoms/atom";
async function loginSignUpHandler(params: {
  username: string;
  password: string;
  confirmPassword: string;
  emailId: string;
  signInOrLogin: string;
}): Promise<any> {
  // return a promise of user
  if (params.signInOrLogin === "login") {
    const result = axios.post("http://localhost:8000/api/auth/login/", {
      username: params.username,
      email: params.emailId,
      password: params.password,
    });
    return result;
  } else {
    //console.log("in signup range");
    const result = axios.post("http://localhost:8000/api/auth/registration/", {
      username: params.username,
      email: params.emailId,
      password1: params.password,
      password2: params.confirmPassword,
    });
    const ans = await result;
    //console.log(ans, "ans post request");
    return result;
  }
}
const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  providers: [
    CrendentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credential, req) {
        // const setErrorAtomState = useSetRecoilState(errorAtom);
        const { username, password, confirmPassword, emailId, signInOrLogin } =
          credential as credentials;
        const result = await loginSignUpHandler({
          username,
          password,
          confirmPassword,
          emailId,
          signInOrLogin,
        });
        //console.log(result.status, "finally after login or signup");
        const resultStatus = result.status as number;
        //console.log(resultStatus, "result status");
        if (
          resultStatus === 200 ||
          resultStatus === 201 ||
          resultStatus === 202 ||
          resultStatus === 203 ||
          resultStatus === 204
        ) {
          // we are good
          return {
            id: "1",
            name: username,
            email: emailId,
          };
        } else {
          // we are not good
          //console.log(result.data, "result data");
          throw new Error("internal server error try again!");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
};
export default NextAuth(authOptions);
