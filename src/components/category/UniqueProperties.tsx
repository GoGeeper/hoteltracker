import {
  Container,
  Flex,
  Stack,
  Image,
  Box,
  Link,
  Card,
  Badge,
} from "@chakra-ui/react";
import TextComponent from "../TextComponent";
import useProperty from "../../contextApi/useProperty";
import HeadingComponent from "../HeadingComponent";
import colors from "../../Utils/colors";

export default function UniqueProperty() {
  const { state } = useProperty();
  console.log(
    state?.allProperties.filter((x) => x.country && x.country?.length >= 0)
  );
  return (
    <Stack>
      <Container maxW={"1200px"} paddingTop={"100px"}>
        <HeadingComponent rest={{ fontSize: "25px", fontWeight: "bold" }}>
          Stay at our top unique properties
        </HeadingComponent>
        <TextComponent rest={{ fontSize: "16px", mb: "30px" }}>
          Stay at our top unique properties
        </TextComponent>
        <Flex gap="20px" overflowX={"scroll"}>
          {state?.allProperties
            ?.filter((x) => x.country && x.country?.length >= 0)
            .map((item, index) => {
              return (
                <Link
                  href={`/${item?.category}/${item?.id}`}
                  w="300px"
                  sx={{
                    "&:hover": {
                      textDecoration: "none",
                    },
                  }}
                >
                  <Card>
                    <Stack flexDirection={"column"} key={index}>
                      <Box
                        position={"relative"}
                        overflow={"hidden"}
                        height={"240px"}
                      >
                        <Image
                          src={item?.photos[0]["secure_url"]}
                          objectFit={"cover"}
                          h={"100%"}
                          w="100%"
                        />
                      </Box>
                      <Stack p="10px" flexDirection={"column"}>
                        <HeadingComponent
                          rest={{
                            fontSize: "18px",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                          }}
                        >
                          {item?.property_name}
                        </HeadingComponent>
                        <TextComponent
                          rest={{
                            fontSize: "12px",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                          }}
                        >{`${item?.country}, ${item?.str_name}`}</TextComponent>
                        <Flex alignItems={"center"} gap="10px">
                          <Badge
                            bg={colors["primary"]}
                            color={colors["white"]}
                            px="10px"
                          >
                            {item?.star_rating}
                          </Badge>
                          <TextComponent rest={{ fontSize: "10px" }}>
                            Excellent
                          </TextComponent>
                        </Flex>
                      </Stack>
                    </Stack>
                  </Card>
                </Link>
              );
            })}
        </Flex>
      </Container>
    </Stack>
  );
}
