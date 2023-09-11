import React from "react";
import Lottie from "lottie-react";
import animationData from "../../lotties/PaymentSuccess.json";
import { Box, Typography } from "@mui/material";
const index = () => {
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Box
          sx={{
            height: "600px",
            width: "600px",
          }}
        >
          <Lottie animationData={animationData} loop={false} autoplay={true} />
          <Typography variant="h3" textAlign={"center"}>Payment success</Typography>
        </Box>
      </Box>
    </>
  );
};

export default index;
