import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const index = () => {
  const { cartItems, user } = useSelector((state) => state.counter);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  function getProduct() {
    let productItems = cartItems.map((item) => item.product);
    let totalPrice = productItems.reduce(
      (acc, curr) => acc + curr.actualPrice,
      0
    );
    setTotalPrice(totalPrice);
  }
  useEffect(() => {
    getProduct();
  }, [cartItems]);

  const handlePay = async () => {
    const payData = {
      user: user,
      cartItems: cartItems,
    };
    try {
      const response = await fetch("http://localhost:3001/payment/intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log("Response data:", data.clientSecret.url);

      if (data.clientSecret.url) {
        window.location.href = data.clientSecret.url;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "500px",
            }}
          >
            <Card
              sx={{
                height: "400px",
                width: "320px",
                boxShadow: 3,
                borderRadius: "10px",
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  display={"center"}
                  justifyContent="center"
                  sx={{ mt: 3 }}
                >
                  Order Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid
                    xs={6}
                    sx={{
                      marginTop: "20px",
                      height: "260px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        marginTop: "60px",
                      }}
                    >
                      <Typography>Subtotal</Typography>
                      <Typography sx={{ mt: 2 }}>Shipping</Typography>
                      <Typography sx={{ mt: 2 }}>Tax</Typography>
                      <Typography sx={{ mt: 2 }} variant="h5">
                        Total
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid xs={6} sx={{ marginTop: "20px", height: "260px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        marginTop: "60px",
                      }}
                    >
                      <Typography>${totalPrice}</Typography>
                      <Typography sx={{ mt: 2 }}>$0</Typography>
                      <Typography sx={{ mt: 2 }}>$0</Typography>
                      <Typography sx={{ mt: 2 }} variant="h5">
                        ${totalPrice}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "darkorange",
                      borderRadius: "20px",
                      "&:hover": {
                        backgroundColor: "darkorange",
                      },
                    }}
                    onClick={handlePay}
                  >
                    Proceed to Payment
                  </Button>
                </div>
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default index;
