import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { logger } from "../utils/loggingMiddleware";
import { urlDatabase } from "../data";
import { nanoid } from "nanoid";

export default function ShortenerForm() {
  const [longUrl, setLongUrl] = useState("");
  const [validity, setValidity] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [shortened, setShortened] = useState([]);

  const handleSubmit = () => {
    if (!longUrl.startsWith("http")) {
      alert("Please enter a valid URL.");
      return;
    }

    let code = shortcode.trim() || nanoid(6);
    let expiry = validity ? parseInt(validity) : 30;

    const alreadyUsed = urlDatabase.some((item) => item.shortcode === code);
    if (alreadyUsed) {
      alert("Shortcode already used. Try a different one.");
      return;
    }

    const newEntry = {
      longUrl,
      shortcode: code,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + expiry * 60000),
      clicks: [],
    };

    urlDatabase.push(newEntry);
    setShortened([...shortened, newEntry]);
    logger(`Created short URL for ${longUrl} with shortcode ${code}`);
  };

  return (
    <Box sx={{ m: 3 }}>
      <TextField fullWidth label="Enter Long URL" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Custom Shortcode (Optional)" value={shortcode} onChange={(e) => setShortcode(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Validity (minutes, Optional)" type="number" value={validity} onChange={(e) => setValidity(e.target.value)} sx={{ mb: 2 }} />
      <Button variant="contained" onClick={handleSubmit}>Shorten</Button>

      <Box sx={{ mt: 3 }}>
        {shortened.map((s) => (
          <div key={s.shortcode}>
            <strong>{s.shortcode}:</strong> http://localhost:3000/{s.shortcode} (Expires: {s.expiresAt.toLocaleTimeString()})
          </div>
        ))}
      </Box>
    </Box>
  );
}
