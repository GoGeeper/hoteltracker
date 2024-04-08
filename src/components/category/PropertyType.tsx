import { Container, Flex, Stack, Image, Box, Link } from "@chakra-ui/react";
import TextComponent from "../TextComponent";
import { propertyType } from "../../Utils/properrtyType";

export default function PropertyType() {
  return (
    <Stack>
      <Container maxW={"1200px"} paddingTop={"100px"}>
        <TextComponent rest={{ fontSize: "25px", fontWeight: "bold" }}>
          Trending destinations
        </TextComponent>
        <Flex gap="20px" mb={"20px"} overflowX={"scroll"}>
          {propertyType?.map((item, index) => {
            return (
              <Link href={`/chain/${item?.location}`}>
                <Stack flexDirection={"column"} key={index} w="300px">
                  <Box
                    position={"relative"}
                    overflow={"hidden"}
                    height={"240px"}
                    borderRadius={"10px"}
                  >
                    <Image
                      src={item?.image}
                      objectFit={"cover"}
                      h={"100%"}
                      w="100%"
                    />
                  </Box>
                  <TextComponent
                    rest={{
                      fontSize: "18px",
                      fontWeight: "bold",

                      zIndex: 2,
                    }}
                  >
                    {item?.location}
                  </TextComponent>
                </Stack>
              </Link>
            );
          })}
        </Flex>
      </Container>
    </Stack>
  );
}
