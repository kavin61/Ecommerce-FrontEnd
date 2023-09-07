import React, { useEffect } from "react";
// Assuming you're using React Router for navigation
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { getCart } from "@/features/cart/cartSlice";

function HomePage() {
  const display = useDispatch();
  useEffect(() => {
    display(getCart());
  }, []);
  return (
    <center style={{ padding: "20px", backgroundColor: "#f4f4f4" }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Our Bookstore
      </Typography>
      <Typography variant="subtitle1" paragraph>
        Explore a wide range of books on various topics and genres.
      </Typography>

      <Grid container spacing={2} justify="center">
        <Grid item xs={12} sm={6} md={4}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTQWHs1e9x4D2b7yInsIKRhnsTUCJUWA3WFw&usqp=CAU"
            alt="Book 1"
            style={{ maxWidth: "100%", height: "50%" }}
          />
          <Typography variant="h6" gutterBottom>
            Bestsellers
          </Typography>
          <Typography variant="body2" paragraph>
            Discover the latest bestsellers in fiction and non-fiction.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            // component={Link}
            // to="/books/bestsellers"
          >
            Explore
          </Button>
        </Grid>

        <Grid item md={4}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0bq-YcLFu_E-KOQapTxnbiUIwaYF_WQwZaQ&usqp=CAU"
            alt="Book 2"
            style={{ maxWidth: "100%", height: "50%" }}
          />
          <Typography variant="h6" gutterBottom>
            New Arrivals
          </Typography>
          <Typography variant="body2" paragraph>
            Be the first to read the latest arrivals from your favorite authors.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            // component={Link}
            // to="/books/new-arrivals"
          >
            Explore
          </Button>
        </Grid>

        <Grid item md={4}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe9FhiTAzZPbN3ISC8G9nDrIMu0zol1GjUpw&usqp=CAU"
            alt="Book 3"
            style={{ maxWidth: "100%", height: "53%" }}
          />
          <Typography variant="h6" gutterBottom>
            Categories
          </Typography>
          <Typography variant="body2" paragraph>
            Browse books by categories such as mystery, more
          </Typography>
          <Button variant="contained" color="primary">
            Explore
          </Button>
        </Grid>
      </Grid>
    </center>
  );
}

export default HomePage;
