import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  addCartItem,
  getCart,
  removeItem,
  totalAmount,
} from "@/features/cart/cartSlice";
import { useRouter } from "next/router";

export const index = () => {
  const { cartItems } = useSelector((state) => state.counter);
  const [productPrice, setProductPrice] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, []);

  const itemRemove = async (id) => {
    dispatch(removeItem(id));
    try {
      let res = await fetch(`http://localhost:3001/cart/add/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("failed to delete cart item");
      }

      console.log("cart item removed");
    } catch (error) {}
  };

  const [totalCost, setTotalCost] = useState(0);

  const calculateTotalCost = () => {
    let total = 0;
    cartItems.forEach((item) => {
      let res =
        item.actualPrice - (item.actualPrice * item.discountedPercent) / 100;
      total += res;
    });
    dispatch(totalAmount(total));
    return total;
  };

  useEffect(() => {
    setTotalCost(calculateTotalCost());
  }, [cartItems]);

  function getPriceOfProduct(actualPrice, discountedPercent) {
    let res = actualPrice - (actualPrice * discountedPercent) / 100;
    // setProductPrice(res);
    return res;
  }

  return (
    <>
      {cartItems.length > 0 ? (
        <center>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Product</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems?.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <img
                        src={item?.picture}
                        height={"50px"}
                        alt={item?.title}
                      />
                    </TableCell>
                    <TableCell>{item?.title}</TableCell>
                    <TableCell>
                      {" "}
                      {getPriceOfProduct(
                        item.actualPrice,
                        item.discountedPercent
                      )}
                    </TableCell>
                    <TableCell>
                      <ButtonGroup
                        variant="outlined"
                        aria-label="outlined button group"
                      >
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => itemRemove(item.id)}
                        >
                          Remove
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}{" "}
                <TableRow>
                  <TableCell
                    colSpan={2}
                    style={{ color: "darkred", fontWeight: "bold" }}
                  >
                    Total Cost:
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    style={{ color: "darkred", fontWeight: "bold" }}
                  >
                    {totalCost}
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "darkorange",
                        borderRadius: "20px",
                      }}
                      onClick={() => {
                        router.push("/confirmation");
                      }}
                    >
                      Checkout
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </center>
      ) : (
        <>
          <Typography
            variant="h4"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            Your cart is empty
          </Typography>
        </>
      )}
    </>
  );
};
export default index;
