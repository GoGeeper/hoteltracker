import { useParams, useLocation } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {
  Badge,
  Box,
  Card,
  Container,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Icon,
  Link,
  Input,
} from "@chakra-ui/react";
import TextComponent from "../components/TextComponent";
import HeadingComponent from "../components/HeadingComponent";
import colors from "../Utils/colors";
import { IoIosArrowForward } from "react-icons/io";
import useProperty from "../contextApi/useProperty";
import { ButtonWrapper } from "../components/ButtonWrapper";
import { useState } from "react";
import { allProperties } from "../contextApi/PropertyProvider";

export default function ChainDetails() {
  const { state } = useProperty();
  const { type } = useParams();
  const location = useLocation();
  const categoried = state?.allProperties?.filter(
    (x) => x.category?.toLocaleLowerCase() === type?.toLocaleLowerCase()
  );

  // filter
  const [search, setSearch] = useState("");
  const [sorted, setSorted] = useState<allProperties[] | []>(categoried);

  const handleFilter = () => {
    if (!state || !state.allProperties) return; // Check if state and allProperties exist
    // Filter the properties based on the search term
    const filteredProperties = categoried.filter(
      (property) =>
        property.country.toLowerCase().includes(search?.toLowerCase()) ||
        property.city.toLowerCase().includes(search?.toLowerCase()) ||
        property.str_name.toLowerCase().includes(search?.toLowerCase()) ||
        property.property_name.toLowerCase().includes(search?.toLowerCase())
    );
    setSorted(filteredProperties);
  };

  return (
    <MainLayout isDesc={false}>
      <Container maxW="1240px">
        <Flex maxW={"800px"} my="20px" gap="10px">
          {" "}
          {/* <Select
            placeholder="Select option"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setStar(event?.target.value);
            }}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select> */}
          <Input
            placeholder="search name of  property or location"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(event?.target.value);
            }}
          />
          <ButtonWrapper
            handleClicked={handleFilter}
            rest={{
              bg: colors["primary"],
            }}
          >
            Search
          </ButtonWrapper>
        </Flex>
        <Flex
          m="20px 0px 40px 0"
          alignItems={"center"}
          gap="10px"
          sx={{
            "& > *": {
              fontSize: "12px",
            },
          }}
        >
          <Link href="/" color={colors["primary"]}>
            Home
          </Link>
          <Icon as={IoIosArrowForward} />
          <Link href={`${location?.pathname}`} color={colors["primary"]}>
            {type}
          </Link>
          <Icon as={IoIosArrowForward} />
          <TextComponent>All {type}</TextComponent>
        </Flex>
        <Stack>
          <HeadingComponent>Last-minute {type} near you</HeadingComponent>
          <TextComponent>
            Find a great deal on a {type} for tonight or an upcoming trip
          </TextComponent>
        </Stack>
        <SimpleGrid minChildWidth={"500px"} spacing={6} py="40px">
          {sorted?.map((property, index) => (
            <Link href={`/${property?.category}/${property?.id}`} key={index}>
              <Card h="150px">
                <Flex h="100%" justifyContent={"space-between"}>
                  <Flex h="100%">
                    <Box width={"150px"}>
                      <Image
                        src={property?.photos[0]?.secure_url}
                        width={"100%"}
                        h="100%"
                        objectFit={"cover"}
                      />
                    </Box>

                    <Box m="0 10px">
                      <TextComponent
                        rest={{
                          whiteSpace: "nowrap",
                          overflow: "hidden" /* Hide any overflowed content */,
                          textOverflow: "ellipsis",
                          maxWidth: "260px",
                        }}
                      >
                        {property?.property_name}
                      </TextComponent>
                      <TextComponent>{property?.country}</TextComponent>
                    </Box>
                  </Flex>

                  <Stack alignItems={"flex-end"}>
                    <Badge
                      bg={colors["primary"]}
                      color={colors["white"]}
                      px="10px"
                    >
                      {property?.star_rating}
                    </Badge>
                    {/* <TextComponent>From</TextComponent>
                    <HeadingComponent rest={{ whiteSpace: "nowrap" }}>
                      NGN 361,031.44
                    </HeadingComponent> */}
                  </Stack>
                </Flex>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      </Container>
    </MainLayout>
  );
}
