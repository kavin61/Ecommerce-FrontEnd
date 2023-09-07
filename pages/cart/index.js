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
import { addCartItem, getCart, removeItem } from "@/features/cart/cartSlice";

export const index = () => {
  const { cartItems } = useSelector((state) => state.counter);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, []);

  const itemRemove = async (id) => {
    dispatch(removeItem(id));
    try {
      let res = await fetch(`http://localhost:3001/cart/${id}`, {
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
      total += item?.product?.actualPrice;
    });
    return total;
  };

  useEffect(() => {
    setTotalCost(calculateTotalCost());
  }, [cartItems]);

  return (
    <>
      {cartItems.length > 0 ? (
        <center>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems?.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <img
                        src={item?.product?.picture}
                        height={"50px"}
                        alt={item?.product?.title}
                      />
                    </TableCell>
                    <TableCell>{item?.product?.title}</TableCell>
                    <TableCell>{item?.product?.actualPrice}</TableCell>
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
                    <TableCell>{/* Calculate total for this item */}</TableCell>
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
                    colSpan={2}
                    style={{ color: "darkred", fontWeight: "bold" }}
                  >
                    {totalCost}
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
