import * as React from "react";
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Box from "@mui/material/Box";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../css/swiper.css";

// install Virtual module
SwiperCore.use([Virtual, Navigation, Pagination]);

export default function StatusSwiper() {
  const stories: { name: string; image: string }[] = [
    {
      name: "romeus",
      image:
        "https://static8.depositphotos.com/1008303/880/i/450/depositphotos_8803246-Asian-college-student.jpg",
    },
    {
      name: "marshall",
      image:
        "https://www.academialeb.com/wp-content/uploads/2014/06/photodune-430148-college-or-university-students-m.jpg",
    },
    {
      name: "slim",
      image:
        "https://media.istockphoto.com/id/1365601848/photo/portrait-of-a-young-woman-carrying-her-schoolbooks-outside-at-college.jpg?s=612x612&w=0&k=20&c=EVxLUZsL0ueYFF1Nixit6hg-DkiV52ddGw_orw9BSJA=",
    },
    {
      name: "Roosevelt",
      image:
        "https://d2jyir0m79gs60.cloudfront.net/news/images/successful-college-student-lg.png",
    },
    {
      name: "obama",
      image:
        "https://i.pinimg.com/736x/ee/75/c1/ee75c137caff28298ee9f80e1a6774bd.jpg",
    },
    {
      name: "Romero",
      image:
        "https://www.reuters.com/resizer/N0ZGgG_NQYKc0ZOhcaeuHy4lFUs=/480x0/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/MY4F2ACIVZIIBACBYLPSVQNI6Y.jpg",
    },
  ];

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={5}
        navigation
        pagination={{ el: ".swiper_pagination", clickable: true }}
        onSlideChange={({ slidePrev }) => console.log(slidePrev)}
      >
        {stories.map((v, ind) => {
          return (
            <SwiperSlide key={ind}>
              {({ isActive, isPrev, isNext }) => {
                return (
                  <Box
                    sx={{
                      alignItems: "center",
                      height: 200,
                    }}
                  >
                    <Box>
                      <img
                        alt=""
                        src={v.image}
                        width="110"
                        height="180"
                        style={{
                          objectFit: "cover",
                          borderRadius: "15px",
                        }}
                      />
                    </Box>
                  </Box>
                );
              }}
            </SwiperSlide>
          );
        })}

        <div
          className="swiper_pagination"
          style={{ textAlign: "center" }}
        ></div>
      </Swiper>
    </>
  );
}
