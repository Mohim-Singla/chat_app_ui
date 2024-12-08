import { Button, TextField, Typography, Link, Box, Container } from "@mui/material";
import { useState } from "react";
import { serviceConfig } from "../../config/config";

function Signup() {
  const [name, setName] = useState("");
  const [signupEmail, setsignupEmail] = useState("");
  const [signupPassword, setsignupPassword] = useState("");
  const [signupCodeMessage, setSignupCodeMessage] = useState();

  const signupUser = async (data) => {
    const fetchResponse = await fetch(`${serviceConfig.AUTH_SERVER.HOST}${serviceConfig.AUTH_SERVER.ENDPOINTS.SIGNUP}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.signupEmail,
        password: data.signupPassword,
      }),
    });

    return fetchResponse.json();
  };

  const handleSignup = async (e) => {
    try {
      setSignupCodeMessage();
      e.preventDefault();
      const fetchResponse = await signupUser({
        name,
        signupEmail,
        signupPassword
      });
      if (fetchResponse) {
        if (fetchResponse.statusCode === 201) {

        } else {
          throw new Error(fetchResponse.message ?? 'Something went wrong!');
        }
      } else {
        throw new Error('User signup Failed.');
      }
    } catch (error) {
      setSignupCodeMessage(error.message);
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
          Chat App signup
        </Typography>

        <TextField
          id="name"
          label="User's Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <TextField
          id="email"
          label="Email Address"
          variant="outlined"
          fullWidth
          value={signupEmail}
          onChange={(event) => setsignupEmail(event.target.value)}
        />

        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={signupPassword}
          onChange={(event) => setsignupPassword(event.target.value)}
        />

        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          fullWidth 
          sx={{ mt: 2 }}
          onClick={handleSignup}
        >
          sign up
        </Button>

        <p style={{ color: "red" }}>{signupCodeMessage}</p>

        <Typography variant="body2" color="text.secondary">
          Forgot Password?{" "}
          <Link href="/reset-password" underline="hover">
            Reset it here
          </Link>
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          Already have an account?{" "}
          <Link href="/login" underline="hover">
            Login
          </Link>
          {" "}Instead
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Continue as{" "}
          <Link href="/guest-signup" underline="hover">
            Guest
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Signup;