import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Head from "next/head";
import React from "react";

import { MainContextProvider } from "@@/context/MainContext";
import theme from "@@/utils/theme";
import initAuth from "@@/utils/initAuth";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://kaori-menu.vercel.app";

initAuth();

export default function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Kaori Izakaya</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          content="Online menu for Kaori Izakaya. Izakaya = Japanese style bar! Come and enjoy the Sake and traditional Japanese tapas."
        />
        <meta
          property="og:title"
          content="Menu | Kaori Izakaya - Japanese style bar"
        />
        <meta
          property="og:description"
          content="Online menu for Kaori Izakaya. Izakaya = Japanese style bar! Come and enjoy the Sake and traditional Japanese tapas."
        />
        <meta property="og:image" content={`${url}/static/logo.png`} />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary" />
      </Head>

      <MainContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Component {...pageProps} />
        </ThemeProvider>
      </MainContextProvider>
    </React.Fragment>
  );
}
