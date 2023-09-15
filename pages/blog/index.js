import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { addCartItem } from "@/features/cart/cartSlice";
import getCartDataById from "../../components/Header";
const index = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [originalAmount, setOriginalAmount] = useState();
  const router = useRouter();
  const count = useSelector((state) => state.addCartItem);
  const dispatch = useDispatch();
  const { id } = router.query;
  async function getProductById(productId) {
    setLoading(true);
    let userId = localStorage.getItem("userId");
    try {
      const res = await fetch(
        `http://localhost:3001/api/v1/book/product/${productId}/${userId}`
      );
      const jsonData = await res.json();

      setProduct(jsonData);
      discountedPrice(jsonData.actualPrice, jsonData.discountedPercent);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  function discountedPrice(amt, per) {
    let discount = (per / 100) * amt;
    let res = discount + amt;
    return setOriginalAmount(res);
  }

  useEffect(() => {
    getProductById(id);
  }, []);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const addCart = async (id) => {
    dispatch(addCartItem(product));
    setOpen(true);
    let userId = localStorage.getItem("userId");
    // let user = {
    //   productId: product.id,
    // };
    try {
      const response = await fetch(`http://localhost:3001/cart/add/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      <Box style={{ height: "100%" }}>
        <Grid container spacing={4} sx={{ mt: 1 }}>
          <Grid item xs={3}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={product.picture}
                style={{ height: "400px", width: "250px" }}
              />
            </div>
          </Grid>
          <Grid item xs={5}>
            <div>
              <h1 style={{ textTransform: "uppercase" }}>{product.title}</h1>
              <h3 style={{ marginTop: "23px" }}>
                AUTHOR :<span style={{ color: "red" }}> {product.author}</span>
              </h3>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <h4 style={{ marginTop: "10px" }}>
                  Availability:{" "}
                  <span style={{ color: "red" }}>
                    {product.stock ? "In Stock" : "Out Of Stock"}
                  </span>
                </h4>
              </div>
              <Typography style={{ lineHeight: "2", marginTop: "20px" }}>
                {product.description}
              </Typography>
            </div>
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Card sx={{ minWidth: 275 }}>
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    backgroundColor: "lightgrey",
                  }}
                >
                  <Typography>Buy</Typography>
                  <Typography>
                    RS.{" "}
                    {product.actualPrice -
                      (product.actualPrice * product.discountedPercent) / 100}
                    <span
                      style={{ textDecoration: "line-through", color: "red" }}
                    >
                      (RS.{product.actualPrice})
                    </span>
                  </Typography>
                </CardActions>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    disabled={!product.stock}
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={() => {
                      addCart(product.id);
                    }}
                  >
                    Add Cart
                  </Button>
                </CardActions>
              </Card>
            </div>
            <Snackbar
              open={open}
              autoHideDuration={1000}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Product Added To Cart
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default index;
