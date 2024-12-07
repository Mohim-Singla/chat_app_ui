import { Button, TextField, Typography, Link, Box, Container } from "@mui/material";
import { useState } from "react";
import { serviceConfig } from "../../config/config";

function Login({ setToken }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginCodeMessage, setLoginCodeMessage] = useState();

  const loginUser = async (creds) => {
    const fetchResponse = await fetch(`${serviceConfig.AUTH_SERVER.HOST}${serviceConfig.AUTH_SERVER.ENDPOINTS.LOGIN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: creds.loginEmail,
        password: creds.loginPassword,
      }),
    });

    return fetchResponse.json();
  };

  const handleLogin = async (e) => {
    try {
      setLoginCodeMessage();
      e.preventDefault();
      const fetchResponse = await loginUser({
        loginEmail,
        loginPassword
      });
      if (fetchResponse) {
        if (fetchResponse.statusCode === 200) {
          setToken(fetchResponse.response.token);
        } else {
          throw new Error(fetchResponse.message ?? 'Something went wrong!');
        }
      } else {
        throw new Error('Login Failed.');
      }
    } catch (error) {
      setLoginCodeMessage(error.message);
    }
  };

  return (
    <Container 
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full height of the window
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          maxHeight: "80vh",
          height: "auto",
          gap: 2,
          boxShadow: 3,
          padding: 4,
          borderRadius: 2,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Chat App Login
        </Typography>

        <TextField
          id="email"
          label="Email Address"
          variant="outlined"
          fullWidth
          value={loginEmail}
          onChange={(event) => setLoginEmail(event.target.value)}
        />

        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={loginPassword}
          onChange={(event) => setLoginPassword(event.target.value)}
        />

        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          fullWidth 
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <p style={{ color: "red" }}>{loginCodeMessage}</p>

        <Typography variant="body2" color="text.secondary">
          Forgot Password?{" "}
          <Link href="/reset-password" underline="hover">
            Reset it here
          </Link>
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          New to Chat App?{" "}
          <Link href="/signup" underline="hover">
            Sign up
          </Link>
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Continue as{" "}
          <Link href="/guest-login" underline="hover">
            Guest
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;