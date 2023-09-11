import "@/styles/globals.css";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import ProgressLoader from "@/components/ProgressLoader";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const excludeHeaderPaths = ["/", "/shipping"];
  const excludeFooterPaths = ["/"];
  const shouldRenderHeader = !excludeHeaderPaths.includes(router.pathname);
  const shouldRenderFooter = !excludeFooterPaths.includes(router.pathname);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = () => {
      const token = localStorage.getItem("token");
      return !!token;
    };
    if (isAuthenticated) {
      router.push(router.pathname);
    }
    if (router.pathname !== "/" && !isAuthenticated()) {
      router.push("/");
    } else {
      setAuthenticated(true);
    }
  }, [router.pathname]);

  return (
    <>
      <Provider store={store}>
        {shouldRenderHeader && authenticated && <Header />}
        {authenticated ? (
          <>
            <ProgressLoader />
            <Component {...pageProps} />
          </>
        ) : null}
        {/* {shouldRenderFooter && <Footer />} */}
      </Provider>
    </>
  );
}
