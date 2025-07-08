import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { logger } from "../utils/loggingMiddleware";

export default function Redirect() {
  const { code } = useParams(); // URL param
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("shortUrls");
    const urlList = stored ? JSON.parse(stored) : [];

    const entry = urlList.find((e) => e.shortcode === code);

    if (entry) {
      const now = new Date();
      const expiry = new Date(entry.expiresAt);

      if (expiry > now) {
        logger("Redirecting", "info", "url-shortener-ui", `Redirecting to ${entry.longUrl}`);
        window.location.href = entry.longUrl;
      } else {
        logger("Expired", "warn", "url-shortener-ui", `Expired shortcode: ${code}`);
        alert("This URL has expired.");
        navigate("/");
      }
    } else {
      logger("Invalid", "error", "url-shortener-ui", `Invalid shortcode: ${code}`);
      alert("Invalid or expired URL");
      navigate("/");
    }
  }, [code, navigate]);

  return <div>Redirecting...</div>;
}
