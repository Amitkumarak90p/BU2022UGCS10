import React from "react";
import { Box, Typography, Link } from "@mui/material";

export default function URLList({ data }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Shortened URLs:</Typography>
      {data.map((entry) => (
        <Box key={entry.shortcode} sx={{ mt: 2 }}>
          <Typography>
            <strong>Short:</strong>{" "}
            <Link href={`/${entry.shortcode}`} target="_blank" underline="hover">
              http://localhost:3000/{entry.shortcode}
            </Link>
          </Typography>
          <Typography>
            <strong>Original:</strong> {entry.longUrl}
          </Typography>
          <Typography>
            <strong>Expires at:</strong> {entry.expiresAt.toLocaleString()}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}