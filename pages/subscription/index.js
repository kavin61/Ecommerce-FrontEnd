import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const index = () => {
  const [prices, setPrices] = useState([]);
  const [userPlan, setUserPlan] = useState("");
  const { user } = useSelector((state) => state.counter);
  async function getPriceList() {
    let res = await fetch("http://localhost:3001/payment/prices");
    let jsonData = await res.json();
    setPrices(jsonData.data);
  }

  async function getUserPlan() {
    let userId = localStorage.getItem("userId");
    let res = await fetch(`http://localhost:3001/payment/plan/${userId}`);
    let jsonData = await res.json();
    setUserPlan(jsonData.userPlan);
  }

  useEffect(() => {
    getPriceList();
    getUserPlan();
  }, []);

  const createSubscription = async (priceId) => {
    let payData = {
      email: user[0]?.email,
      priceId: priceId,
      userId: user[0]?.id,
    };

    try {
      let response = await fetch("http://localhost:3001/payment/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payData }),
      });

      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userPlan, "ooooooooooooooooooo");

  return (
    <>
      <Grid container spacing={2}>
        {prices.map((item, index) => (
          <Grid item xs={4}>
            <Box
              sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box>
                <Card
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{
                    height: "300px",
                    width: "300px",
                    boxShadow: 3,
                  }}
                >
                  <Typography
                    variant="h4"
                    textAlign={"center"}
                    sx={{ marginTop: "30px" }}
                  >
                    {item.nickname}
                  </Typography>
                  <Typography variant="h5" textAlign={"center"} sx={{ mt: 3 }}>
                    $ {item.unit_amount / 100}
                  </Typography>
                  <Button
                    variant="contained"
                    disabled={userPlan === item.nickname}
                    sx={{
                      borderRadius: "30px",
                      marginLeft: "90px",
                      marginTop: "50px",
                      backgroundColor: "darkorange",
                    }}
                    textAlign={"center"}
                    onClick={() => createSubscription(item.id)}
                  >
                    Buy Now
                  </Button>
                  {userPlan === item.nickname && (
                    <Typography
                      variant="h6"
                      textAlign={"center"}
                      sx={{ marginTop: "20px" }}
                    >
                      Active Plan
                    </Typography>
                  )}
                </Card>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default index;
