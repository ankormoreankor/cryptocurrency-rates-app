import { useEffect } from "react";
import { useNavigate } from "react-router";

export const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
    console.warn("This app does not exist");
  }, [navigate]);

  return null;
};
