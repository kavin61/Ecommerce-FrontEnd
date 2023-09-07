import { useRouter } from "next/router";
import { useEffect } from "react";

function isAuthenticated() {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("token");
  }
  return false; // Return false if not on the client side
}

export default function PrivateRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, []);

  return isAuthenticated() ? children : null;
}
