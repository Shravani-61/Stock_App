import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    console.log("Token:", token); // debug

    if (token) {
      localStorage.setItem("token", token);

      // small delay ensures React state updates
      setTimeout(() => {
        navigate("/portfolio");
      }, 100);
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return <div>Logging you in...</div>;
}