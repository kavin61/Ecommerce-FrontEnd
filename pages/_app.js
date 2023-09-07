import "@/styles/globals.css";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "@/app/store";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const excludeHeaderPaths = ["/"];
  const shouldRenderHeader = !excludeHeaderPaths.includes(router.pathname);
  const publicRoutes = ["/"];
  const isPublicRoute = publicRoutes.includes(router.pathname);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = () => {
      const token = localStorage.getItem("token");
      return !!token;
    };

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
        {authenticated ? <Component {...pageProps} /> : null}
      </Provider>
    </>
  );
}
