import React from "react";
import { urlDatabase } from "../data";
import { Box, Typography } from "@mui/material";

export default function StatsPage() {
  return (
    <Box sx={{ m: 3 }}>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>
      {urlDatabase.map((entry) => (
        <Box key={entry.shortcode} sx={{ mb: 4 }}>
          <Typography><strong>Short URL:</strong> http://localhost:3000/{entry.shortcode}</Typography>
          <Typography><strong>Original URL:</strong> {entry.longUrl}</Typography>
          <Typography><strong>Created:</strong> {entry.createdAt.toLocaleString()}</Typography>
          <Typography><strong>Expires:</strong> {entry.expiresAt.toLocaleString()}</Typography>
          <Typography><strong>Total Clicks:</strong> {entry.clicks.length}</Typography>
          <Typography><strong>Click Logs:</strong></Typography>
          <ul>
            {entry.clicks.map((click, i) => (
              <li key={i}>
                Time: {click.time.toLocaleString()} | Source: {click.source || "N/A"} | Location: {click.location}
              </li>
            ))}
          </ul>
        </Box>
      ))}
    </Box>
  );
}