import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import { getCart } from "@/features/cart/cartSlice";
import { useDispatch } from "react-redux";

export default function ImgMediaCard() {
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch( );
  const router = useRouter();
  useEffect(() => {
    getProduct();
  }, []);
  async function getProduct() {
    let res = await fetch("http://localhost:3001/api/v1/book/product");
    let jsonData = await res.json();
    setProduct(jsonData);
  }
  useEffect(() => {
    dispatch(getCart());
  }, []);

  return (
    <center>
      <Grid
        container
        spacing={0.2}
        style={{
          backgroundColor: "#f4f4f4",
        }}
      >
        {product.length > 0
          ? product.map((item, i) => {
              return (
                <Grid item md={4} sx={{ p: 4 }}>
                  <Card
                    sx={{ maxWidth: 300, maxHeight: 400, cursor: "pointer" }}
                    key={item.id}
                    style={{
                      backgroundColor: "white",
                      marginTop: "10px",
                    }}
                    onClick={() => {
                      router.push({
                        pathname: "/blog",
                        query: {
                          id: item.id,
                        },
                      });
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={item.picture}
                        style={{
                          objectFit: "cover",
                          marginTop: "10px",
                          height: "200px",
                          width: "150px",
                        }}
                      />
                    </div>

                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {item.author}
                      </Typography>
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="h5">
                          $ {item.actualPrice}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.discountedPercent}% OFF
                        </Typography>
                      </Box>
                    </CardContent>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px",
                      }}
                    >
                      <Stack spacing={0.5}>
                        <Rating
                          name="half-rating-read"
                          defaultValue={item.rating}
                          precision={item.rating}
                          readOnly
                        />
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        {item.TotalPages}pages
                      </Typography>
                    </Box>

                    {/* <CardActions>
                      <Button size="small">Add Cart</Button>
                    </CardActions> */}
                  </Card>
                </Grid>
              );
            })
          : null}
      </Grid>
    </center>
  );
}
