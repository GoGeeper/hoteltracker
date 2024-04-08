import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HeadingComponent from "../components/HeadingComponent";
import TextComponent from "../components/TextComponent";
import useProperty from "../contextApi/useProperty";
import {
  Box,
  Card,
  Container,
  Flex,
  Image,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";

export default function PropertyDetails() {
  const { id } = useParams();
  const { state } = useProperty();
  const property = state?.allProperties.find((item) => item.id === id);

  return (
    <MainLayout isDesc={false}>
      <Container maxW={"1000px"} mt="40px">
        <HeadingComponent>{property?.property_name}</HeadingComponent>
        <TextComponent>
          {property?.str_name}, {property?.zip_code} {property?.city},{" "}
          {property?.country} – Excellent location – show map
        </TextComponent>
        <Box mt="10px">
          <Flex mb="10px" h="350px" gap="10px" overflow={"hidden"}>
            <Stack flex="37.5%" gap="10px">
              <Box h="50%" overflow={"hidden"}>
                <Image
                  src={property?.photos[0]?.secure_url}
                  h="100%"
                  objectFit={"cover"}
                  w="100%"
                  sx={{
                    "&": {
                      transform: "scale(1)",
                      transition: "transform 1s",
                      "&:hover": {
                        transform: "scale(1.3)",
                      },
                    },
                  }}
                />
              </Box>
              <Box h="50%" overflow={"hidden"}>
                <Image
                  src={property?.photos[1]?.secure_url}
                  h="100%"
                  objectFit={"cover"}
                  w="100%"
                  sx={{
                    "&": {
                      transform: "scale(1)",
                      transition: "transform 1s",
                      "&:hover": {
                        transform: "scale(1.3)",
                      },
                    },
                  }}
                />
              </Box>
            </Stack>
            <Box flex="62.5%" overflow={"hidden"}>
              <Image
                src={property?.photos[2]?.secure_url}
                objectFit={"cover"}
                h="100%"
                w="100%"
                sx={{
                  "&": {
                    transform: "scale(1)",
                    transition: "transform 1s",
                    "&:hover": {
                      transform: "scale(1.3)",
                    },
                  },
                }}
              />
            </Box>
          </Flex>
          <Flex overflowX={"scroll"} gap="10px">
            {property?.photos.slice(3).map((photo) => (
              <Image
                key={photo?.asset_id}
                src={photo?.secure_url}
                width={"200px"}
                objectFit={"cover"}
              />
            ))}
          </Flex>
        </Box>
        <SimpleGrid minChildWidth={"300px"} gap="20px" mt="30px">
          {property?.facilities?.map((facility, index) => (
            <Card key={index} p="10px" textAlign={"center"}>
              {facility}
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </MainLayout>
  );
}
