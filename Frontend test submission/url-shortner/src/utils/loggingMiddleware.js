export async function logger(stack, level, packageName, message) {
  const logData = {
    timestamp: new Date().toISOString(),  // Some servers expect this
    level: level,
    package: packageName,
    message: message,
    stack: stack
  };

  try {
    const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbWl0a3VtYXJhazkwcEBnbWFpbC5jb20iLCJleHAiOjE3NTE5NjAwOTgsImlhdCI6MTc1MTk1OTE5OCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjEyYTczZjg0LTg2ODEtNDY1NS1hOTFjLWNkNWUyNTAwYmU5NyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFtaXQga3VtYXIiLCJzdWIiOiJjNjAwNDBhMC02ZGNhLTQ5NTEtYmU3ZS0yZTBkMzRiM2U0M2YifSwiZW1haWwiOiJhbWl0a3VtYXJhazkwcEBnbWFpbC5jb20iLCJuYW1lIjoiYW1pdCBrdW1hciIsInJvbGxObyI6ImJ1MjAyMnVnY3MxMCIsImFjY2Vzc0NvZGUiOiJDRlZhbUUiLCJjbGllbnRJRCI6ImM2MDA0MGEwLTZkY2EtNDk1MS1iZTdlLTJlMGQzNGIzZTQzZiIsImNsaWVudFNlY3JldCI6ImhFcXZ2cEpwbmh5aHRyZ2IifQ.RosuFYpLEbvYpwDTSPm5aqfsA6CRtPHY1S4F6igV-fY"
      },
      body: JSON.stringify(logData),
    });

    if (!response.ok) {
      console.warn(" Logger failed with status:", response.status, await response.text());
    } else {
      console.log(" Log sent successfully");
    }
  } catch (error) {
    console.warn(" Logger failed (network or CORS):", error.message);
  }
}
