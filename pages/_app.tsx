import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import "../styles/index.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={{ main: "green" }}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
