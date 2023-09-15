import React, { useEffect } from "react";
// Assuming you're using React Router for navigation
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { getCart } from "@/features/cart/cartSlice";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function HomePage() {
  const display = useDispatch();
  useEffect(() => {
    display(getCart());
  }, []);
  return (
    // <center style={{ padding: "20px", backgroundColor: "#f4f4f4" }}>
    //   <Typography variant="h3" gutterBottom>
    //     Welcome to Our Bookstore
    //   </Typography>
    //   <Typography variant="subtitle1" paragraph>
    //     Explore a wide range of books on various topics and genres.
    //   </Typography>

    //   <Grid container spacing={2} justify="center">
    //     <Grid item xs={12} sm={6} md={4}>
    //       <img
    //         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTQWHs1e9x4D2b7yInsIKRhnsTUCJUWA3WFw&usqp=CAU"
    //         alt="Book 1"
    //         style={{ maxWidth: "100%", height: "50%" }}
    //       />
    //       <Typography variant="h6" gutterBottom>
    //         Bestsellers
    //       </Typography>
    //       <Typography variant="body2" paragraph>
    //         Discover the latest bestsellers in fiction and non-fiction.
    //       </Typography>
    //       <Button
    //         variant="contained"
    //         color="primary"
    //         // component={Link}
    //         // to="/books/bestsellers"
    //       >
    //         Explore
    //       </Button>
    //     </Grid>

    //     <Grid item md={4}>
    //       <img
    //         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0bq-YcLFu_E-KOQapTxnbiUIwaYF_WQwZaQ&usqp=CAU"
    //         alt="Book 2"
    //         style={{ maxWidth: "100%", height: "50%" }}
    //       />
    //       <Typography variant="h6" gutterBottom>
    //         New Arrivals
    //       </Typography>
    //       <Typography variant="body2" paragraph>
    //         Be the first to read the latest arrivals from your favorite authors.
    //       </Typography>
    //       <Button
    //         variant="contained"
    //         color="primary"
    //         // component={Link}
    //         // to="/books/new-arrivals"
    //       >
    //         Explore
    //       </Button>
    //     </Grid>

    //     <Grid item md={4}>
    //       <img
    //         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe9FhiTAzZPbN3ISC8G9nDrIMu0zol1GjUpw&usqp=CAU"
    //         alt="Book 3"
    //         style={{ maxWidth: "100%", height: "53%" }}
    //       />
    //       <Typography variant="h6" gutterBottom>
    //         Categories
    //       </Typography>
    //       <Typography variant="body2" paragraph>
    //         Browse books by categories such as mystery, more
    //       </Typography>
    //       <Button variant="contained" color="primary">
    //         Explore
    //       </Button>
    //     </Grid>
    //   </Grid>
    // </center>
    <>
      <Typography variant="h3" gutterBottom textAlign={"center"} sx={{ mt: 4 }}>
        Welcome to Our Bookstore
      </Typography>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        autoplay={{
          delay: 1000, // Set the time interval between automatic slides (in milliseconds)
          // Allow user interactions (e.g., manual swiping) to not stop auto-play
        }}
      >
        <SwiperSlide>
          <img
            src="https://img.freepik.com/free-photo/open-book-with-white-background_23-2148882765.jpg?size=626&ext=jpg&ga=GA1.1.1414353234.1694776135&semt=sph"
            style={{ height: "400px", width: "600px" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ height: "400px", width: "600px" }}
            src="https://img.freepik.com/free-photo/front-view-composition-with-different-books_23-2148851051.jpg?size=626&ext=jpg&ga=GA1.1.1414353234.1694776135&semt=sph"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ height: "400px", width: "600px" }}
            src="https://img.freepik.com/free-photo/portrait-rich-woman-indoors-with-book_23-2149548501.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ height: "400px", width: "600px" }}
            src="https://img.freepik.com/free-photo/close-up-opened-book-library_23-2147845965.jpg?size=626&ext=jpg&ga=GA1.1.1414353234.1694776135&semt=sph"
          />
        </SwiperSlide>
        ...
      </Swiper>
    </>
  );
}

export default HomePage;
