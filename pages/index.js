import Header from "@/components/Header";
import { Alert, Grid, Snackbar, TextField, Typography } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Password } from "@mui/icons-material";
import { useState } from "react";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { authUser } from "@/features/cart/cartSlice";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [wrongCreden, setWrongCreden] = useState(false);
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response) {
        const data = await response.json();
        let token = localStorage.setItem("token", data.result.token);
        let userId = localStorage.setItem("userId", data.result.user.id);
        let userName = localStorage.setItem("userName", data.result.user.name);
        dispatch(authUser(data.result.user));
        Router.push("/home");
        setWrongCreden(false);
        setOpen(true);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      setOpen(true);
      setWrongCreden(true);
      console.error(error);
    }
  };

  return (
    <Box>
      <Card
        sx={{
          boxShadow: "3px 2px 4px 4px rgba(0, 0, 0, 0.2)",
          borderRadius: "16px",
          maxWidth: "400px",
          margin: "0 auto",
          marginTop: "50px",
          height: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ padding: "30px" }}
            height={"100vh"}
          >
            <Typography variant="h4" sx={{ mb: 4 }}>
              {" "}
              Login
            </Typography>

            <TextField
              label="Username"
              name="userName"
              type="text"
              id="outlined-required" 
              margin="normal"
              onChange={handleChange}
            />
            <TextField
              id="outlined-required"
              label="Password"
              type="password"
              name="password"
              margin="normal"
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="success"
              type="submit"
              sx={{ mt: 2, borderRadius: "10px" }}
            >
              Login
            </Button>
          </Box>
          <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Alert
              onClose={handleClose}
              severity={wrongCreden ? "error" : "success"}
              sx={{ width: "100%" }}
            >
              {wrongCreden ? "wrong password" : "Successfully login"}
            </Alert>
          </Snackbar>
        </form>
      </Card>
    </Box>
  );
}
