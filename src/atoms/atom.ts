import { credentials, error } from "@/types/types";
import { atom } from "recoil";
export const credentialAtom = atom<credentials>({
  key: "credentialAtomState",
  default: {
    username: "",
    password: "",
    confirmPassword: "",
    emailId: "",
    signInOrLogin: "login",
  },
});
export const errorAtom = atom<error>({
  key: "errorAtomState",
  default: {
    isError: false,
    errorType: "",
    errorMessage: "",
  },
});
