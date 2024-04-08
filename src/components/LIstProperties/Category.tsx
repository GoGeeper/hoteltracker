import { Box, Card, Image, Stack } from "@chakra-ui/react";
import HeadingComponent from "../HeadingComponent";
import TextComponent from "../TextComponent";

import { ButtonWrapper } from "../ButtonWrapper";
import colors from "../../Utils/colors";
import catImage from "../../assets/accomm_hotels_main_v2@2x.png";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const navigate = useNavigate();
  return (
    <Box>
      <HeadingComponent
        rest={{ fontSize: "32px", fontWeight: 700, lineHeight: "40px" }}
      >
        List your property on HotelTracker and start welcoming guests in no
        time!
      </HeadingComponent>
      <TextComponent rest={{ fontSize: "20px", marginTop: "10px" }}>
        To get started, select the list property button to list your hotel on
        HotelTracker
      </TextComponent>
      <Card maxWidth="300px" p={"30px"} mt="50px">
        <Stack alignItems={"center"}>
          <Box width="80px" mb="20px">
            <Image src={catImage} width={"100%"} objectFit={"cover"} />
          </Box>

          <TextComponent rest={{ fontSize: "14px", textAlign: "center" }}>
            Properties like hotels, B&Bs, guest houses, hostels, condo hotels,
            etc
          </TextComponent>
          <ButtonWrapper
            rest={{
              bg: colors["primary"],
              mt: "50px",
              alignSelf: "stretch",
            }}
            handleClicked={() => navigate("/list-property/property")}
          >
            List property
          </ButtonWrapper>
        </Stack>
      </Card>
    </Box>
  );
}
