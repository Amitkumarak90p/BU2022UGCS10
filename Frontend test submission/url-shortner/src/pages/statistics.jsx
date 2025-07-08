import React from "react";
import { urlDatabase } from "../data";
import { Box } from "@mui/material";

export default function Statistics() {
  return (
    <Box sx={{ m: 3 }}>
      <h2>Statistics</h2>
      {urlDatabase.map((entry) => (
        <Box key={entry.shortcode} sx={{ mb: 3 }}>
          <div><strong>Short URL:</strong> {entry.shortcode}</div>
          <div><strong>Clicks:</strong> {entry.clicks.length}</div>
          <div><strong>Created:</strong> {entry.createdAt.toLocaleString()}</div>
          <div><strong>Expires:</strong> {entry.expiresAt.toLocaleString()}</div>
          <div><strong>Click Logs:</strong></div>
          <ul>
            {entry.clicks.map((click, idx) => (
              <li key={idx}>Time: {click.time.toLocaleString()}, Source: {click.source || "N/A"}, Location: {click.location}</li>
            ))}
          </ul>
        </Box>
      ))}
    </Box>
  );
}