import { Container, Flex, Stack, Image, Box } from "@chakra-ui/react";
import colors from "../../Utils/colors";
import TextComponent from "../TextComponent";
import { trendingDestination } from "../../Utils/data";

export default function TrendingDestination() {
  return (
    <Stack>
      <Container maxW={"1200px"} paddingTop={"100px"}>
        <TextComponent rest={{ fontSize: "25px", fontWeight: "bold" }}>
          Trending destinations
        </TextComponent>
        <TextComponent
          rest={{ color: colors["chakraColorsGray800"], mb: "20px" }}
        >
          Most popular choices for travelers from the United Kingdom
        </TextComponent>
        <Flex gap="20px" mb={"20px"}>
          {trendingDestination?.slice(0, 2)?.map((item, index) => {
            return (
              <Box
                key={index}
                flex={1}
                position={"relative"}
                overflow={"hidden"}
                height={"280px"}
                borderRadius={"10px"}
              >
                <Image
                  src={item?.image}
                  sx={{
                    "&": {
                      // objectFit: "cover",
                      // width: "100%",
                      // height: "100%",
                      transition: "all .3s",
                      transform: "scale(1)",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    },
                  }}
                />
                ;
                <Box
                  sx={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    zIndex: 1,
                    width: "100%",
                    padding: "20px",
                    transition: "all .3s",
                  }}
                  _hover={{
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(180deg, rgba(0, 27, 65, .65) 0, rgba(0, 27, 65, 0))",
                    },
                  }}
                >
                  {" "}
                  <TextComponent
                    rest={{
                      color: colors["white"],
                      fontSize: "28px",
                      fontWeight: "bold",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {item?.location}
                  </TextComponent>
                </Box>
              </Box>
            );
          })}
        </Flex>
        <Flex gap="20px">
          {trendingDestination?.slice(2)?.map((item, index) => {
            return (
              <Box
                key={index}
                flex={1}
                position={"relative"}
                overflow={"hidden"}
                height={"280px"}
                borderRadius={"10px"}
              >
                <Image
                  src={item?.image}
                  sx={{
                    "&": {
                      // objectFit: "cover",
                      // width: "100%",
                      // height: "100%",
                      transition: "all .3s",
                      transform: "scale(1)",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    },
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    zIndex: 1,
                    width: "100%",
                    padding: "20px",
                    transition: "all .3s",
                  }}
                  _hover={{
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(180deg, rgba(0, 27, 65, .65) 0, rgba(0, 27, 65, 0))",
                    },
                  }}
                >
                  {" "}
                  <TextComponent
                    rest={{
                      color: colors["white"],
                      fontSize: "28px",
                      fontWeight: "bold",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {item?.location}
                  </TextComponent>
                </Box>
              </Box>
            );
          })}
        </Flex>
      </Container>
    </Stack>
  );
}
