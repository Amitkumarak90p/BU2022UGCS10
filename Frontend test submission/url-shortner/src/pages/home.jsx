import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import URLList from "../components/urlList"; 
import { logger } from "../utils/loggingMiddleware";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [validity, setValidity] = useState("");
  const [urlList, setUrlList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!longUrl) {
      logger(
        "Empty URL input",
        "warn",
        "url-shortener-ui",
        "User submitted an empty URL field."
      );
      return;
    }

    const minutes = validity ? parseInt(validity) : 30;
    const expiresAt = new Date(Date.now() + minutes * 60000);

    const newEntry = {
      longUrl,
      shortcode: shortcode || Math.random().toString(36).slice(2, 8),
      expiresAt,
    };

    setUrlList((prev) => [...prev, newEntry]);

    logger(
      "URL shortened",
      "info",
      "url-shortener-ui",
      `Shortened ${longUrl} to ${newEntry.shortcode}, expires at ${expiresAt.toLocaleString()}`
    );

    setLongUrl("");
    setShortcode("");
    setValidity("");
  };

  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Enter Long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Custom Shortcode (Optional)"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
          sx={{ mb: 2 }}
        />
        
        <Button variant="contained" type="submit">
          SHORTEN
        </Button>
      </form>

      {urlList.length > 0 && <URLList data={urlList} />}
    </Box>
  );
}
