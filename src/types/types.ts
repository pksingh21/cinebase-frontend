export interface credentials {
  username: string;
  password: string;
  confirmPassword: string;
  emailId: string;
  signInOrLogin: string;
}
export interface error {
  isError: boolean;
  errorType: string;
  errorMessage: string;
}
