import { useEffect } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import the CSS file for nprogress

NProgress.configure({ showSpinner: false, color: "red" });

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => {
  NProgress.done();
});

const ProgressLoader = () => {
  useEffect(() => {
    return () => {
      NProgress.remove();
    };
  }, []);

  return null;
};

export default ProgressLoader;
