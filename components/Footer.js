import { Typography } from "@mui/material";

export default function Footer() {
  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
        backgroundColor: "lightgray",
        padding: "10px",
        marginTop: "auto",
      }}
    >
      <Typography variant="h6">@Kavin-2023, All Rights Reserved</Typography>
    </footer>
  );
}
