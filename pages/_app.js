import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";

import LoadingScreen from "@@/components/Layouts/LoadingScreen";
import { MainContextProvider } from "@@/context/MainContext";
import theme from "@@/utils/theme";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://kaori-menu.vercel.app";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  React.useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));
    router.events.on("routeChangeError", () => setLoading(false));

    return () => {
      router.events.off("routeChangeStart", () => setLoading(true));
      router.events.off("routeChangeComplete", () => setLoading(false));
      router.events.off("routeChangeError", () => setLoading(false));
    };
  });

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

          {loading ? <LoadingScreen /> : <Component {...pageProps} />}
        </ThemeProvider>
      </MainContextProvider>
    </React.Fragment>
  );
}
