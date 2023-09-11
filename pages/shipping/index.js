import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { countries } from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "@/features/cart/cartSlice";
import { useRouter } from "next/router";
const index = () => {
  const [personName, setPersonName] = React.useState("");
  const countryList = Object.values(countries);
  const dispatch = useDispatch();
  const router = useRouter();
  const [shipping, setShipping] = useState({
    Address: "",
    City: "",
    PhoneNo: "",
    PostalCode: "",
    Country: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setShipping((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(shipping);
    dispatch(saveShippingInfo(shipping));
    router.push("/confirmation");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ height: "100vh" }}
        >
          <Card sx={{ width: 400, padding: "20px", boxShadow: 3 }}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="h4" sx={{ padding: "2px" }}>
                Shipping Info
              </Typography>
              <TextField
                label="Address"
                name="Address"
                type="text"
                id="outlined-required"
                margin="normal"
                sx={{ width: 350 }}
                onChange={handleChange}
              />
              <TextField
                label="City"
                name="City"
                type="text"
                id="outlined-required"
                margin="normal"
                sx={{ width: 350 }}
                onChange={handleChange}
              />
              <TextField
                label="Phone No"
                name="PhoneNo"
                type="number"
                id="outlined-required"
                margin="normal"
                sx={{ width: 350 }}
                onChange={handleChange}
              />

              <TextField
                label="Postal Code"
                name="PostalCode"
                type="number"
                id="outlined-required"
                margin="normal"
                sx={{ width: 350 }}
                onChange={handleChange}
              />
              <FormControl sx={{ width: 350 }} margin="normal">
                <InputLabel id="demo-multiple-name-label">Country</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="Country"
                  value={shipping.Country}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                >
                  {countryList.map((country, i) => (
                    <MenuItem key={i} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  mt: 3,
                  backgroundColor: "darkorange",
                  "&:hover": {
                    backgroundColor: "darkorange",
                  },
                  width: "350px",
                }}
                size="medium"
              >
                Continue
              </Button>
            </Box>
          </Card>
        </Box>
      </form>
    </>
  );
};

export default index;
