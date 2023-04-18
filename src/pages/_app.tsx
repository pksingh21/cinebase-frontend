import "@/styles/globals.css";
import { StyledEngineProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <StyledEngineProvider injectFirst>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </StyledEngineProvider>
    </SessionProvider>
  );
}
