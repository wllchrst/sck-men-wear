import React, { useState } from "react";
import { Box, IconButton, Text, useBreakpointValue } from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import { Promotion } from "../../interfaces/promotion-interface";
import { DeleteIcon } from "@chakra-ui/icons";
import FirebaseHelper from "../../services/firebase-helper";
import { promotionCollection } from "../../settings/firebase-config";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

interface I {
  slide: Promotion[];
  isAdmin: boolean;
}

export default function Carousel({ slide, isAdmin }: I) {
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const [id, setId] = useState("");
  const helper = new FirebaseHelper<Promotion>();
  function deleteCarousel(promotion: Promotion) {
    helper.deleteById(promotionCollection, promotion.id);
  }

  if (slide.length <= 0) return <></>;

  return (
    <Box position={"relative"} width={"full"} overflow={"hidden"}>
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {slide.map((slide, index) => (
          <div key={index}>
            <Box
              key={index}
              height={{ base: "210px", md: "400px", lg: "800px" }}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundImage={`url(${slide.pictureLink})`}
            />
            {isAdmin && (
              <div className="flex justify-center mt-2">
                <div className="flex gap-2 items-center">
                  <Text>Delete Promotion</Text>
                  <IconButton
                    bg={"transparent"}
                    aria-label="right-arrow"
                    onClick={() => deleteCarousel(slide)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            )}
          </div>
        ))}
      </Slider>

      <div className="flex justify-between px-3 py-2">
        <IconButton
          bg={"transparent"}
          aria-label="left-arrow"
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt color="black" />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          bg={"transparent"}
          aria-label="right-arrow"
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt color="black" />
        </IconButton>
      </div>
    </Box>
  );
}
