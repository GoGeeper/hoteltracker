import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HeadingComponent from "../components/HeadingComponent";
import { useEffect, useState } from "react";
import { chainProps } from "../components/LIstProperties/Property";
import {
  Alert,
  AlertIcon,
  Box,
  Card,
  Checkbox,
  CheckboxGroup,
  Container,
  Divider,
  Flex,
  Icon,
  Input,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import colors from "../Utils/colors";
import TextComponent from "../components/TextComponent";
import {
  ChakraProvider,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { countries } from "../Utils/data";
import { CloudinaryAsset, allProperties } from "../contextApi/PropertyProvider";
import useProperty from "../contextApi/useProperty";
import { FaStar } from "react-icons/fa6";
import { faclities } from "../Utils/data";
import Photos from "../components/LIstProperties/Photos";
import { ButtonWrapper } from "../components/ButtonWrapper";
import { MdArrowBackIos } from "react-icons/md";
import useAuth from "../contextApi/useAuth";

export default function EditProperty() {
  const [success, setSuccess] = useState("");
  const { state, dispatch } = useProperty();
  const { auth } = useAuth();

  const { id } = useParams();
  const chains: chainProps[] = [
    {
      name: "hotel",
      description:
        "Accommodations for travelers often with restaurants, meeting rooms and other guest services",
    },
    {
      name: "guesthouse",
      description:
        "Private home with separate living facilities for host and guest",
    },
    {
      name: "homestay",
      description:
        "A shared home where the guest has a private room and the host lives and is on site. Some facilities are shared between hosts and guests.",
    },
    {
      name: "hostel",
      description:
        "Budget accommodations with mostly dorm-style beds and social atmosphere.",
    },
    {
      name: "condo hotel",
      description:
        "Independent apartments with some hotel facilities like a front desk",
    },
  ];
  const selectedProperty = state?.allProperties?.find(
    (property) => property?.id === id
  );
  const [updatedPhoto, setUpdatedPhoto] = useState<CloudinaryAsset[] | []>(
    selectedProperty?.photos || []
  );
  const [selectedChain, setSelectedChain] = useState("");
  const [chain, setChain] = useState<chainProps[]>(chains);

  const schema = yup.object().shape({
    country: yup.string().required(),
    str_name: yup.string().required(),
    zip_code: yup.string().required(),
    city: yup.string().required(),
    property_name: yup.string().required(),
    star_rating: yup.string().required(),
    property_management: yup.string().required(),
    facilities: yup.array().required(),
    breakfast_details: yup.string().required(),
    parking_details: yup.string().required(),
  });

  // Define the keys you want to omit
  type KeysToOmit = "id" | "user_id" | "category" | "photos";
  // Create a mapped type that picks all keys except the ones to omit
  type NewType = Pick<allProperties, Exclude<keyof allProperties, KeysToOmit>>;

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<NewType>({
    resolver: yupResolver(schema),
    defaultValues: {
      country: "" || selectedProperty?.country,
      str_name: "" || selectedProperty?.str_name,
      zip_code: "" || selectedProperty?.zip_code,
      city: "" || selectedProperty?.city,
      property_name: "" || selectedProperty?.property_name,
      star_rating: "" || selectedProperty?.star_rating,
      property_management: "" || selectedProperty?.property_management,
      facilities: [] || selectedProperty?.facilities,
      breakfast_details: "" || selectedProperty?.breakfast_details,
      parking_details: "" || selectedProperty?.parking_details,
    },
  });

  const onSubmit = (data: NewType) => {
    setSuccess("");
    if (id) {
      const allData = {
        ...data,
        id,
        user_id: auth?.user?.email,
        photos: updatedPhoto,
        category: selectedChain,
      };
      dispatch({ type: "UPDATE_PROPERTY", payload: allData });
      setSuccess("property updated successfully");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // handle the chain or category
  useEffect(() => {
    if (selectedChain) {
      setChain(
        chains?.map((chain) => {
          return chain?.name === selectedChain
            ? { ...chain, isSelected: true }
            : { ...chain, isSelected: false };
        })
      );
    }
  }, [selectedChain]);
  // update the selectedChain in the state
  useEffect(() => {
    if (selectedProperty?.category) {
      setSelectedChain(selectedProperty?.category);
    }
  }, [selectedProperty?.category]);

  return (
    <MainLayout isDesc={false}>
      <Container maxW="800px">
        {success && (
          <Alert status="success" mb="10px">
            <AlertIcon />
            {success}
          </Alert>
        )}
        <ChakraProvider>
          <form onSubmit={handleSubmit(onSubmit)}>
            <HeadingComponent
              rest={{ fontSize: "32px", fontWeight: 700, lineHeight: "40px" }}
            >
              From the list below, which property category is the best fit for
              your place?
            </HeadingComponent>
            <SimpleGrid minChildWidth={"300px"} spacing={4} mt="30px">
              {chain.map(({ name, description, isSelected = false }, index) => (
                <Card
                  p="30px"
                  // borderWidth={"1px"}
                  key={index}
                  border={isSelected ? `1px solid ${colors["primary"]}` : ""}
                  cursor={"pointer"}
                  _hover={{
                    border: `1px solid ${colors["primary"]}`,
                  }}
                  onClick={() => setSelectedChain(name)}
                >
                  <Stack>
                    <TextComponent rest={{ fontSize: "20px" }}>
                      {name}
                    </TextComponent>
                    <TextComponent rest={{ fontSize: "14px" }}>
                      {description}
                    </TextComponent>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
            <Divider py="40px" />
            {/* address */}
            <Box mt="40px">
              <HeadingComponent
                rest={{
                  fontSize: "32px",
                  fontWeight: 700,
                  lineHeight: "40px",
                  mb: "20px",
                }}
              >
                Where is the property you're listing?
              </HeadingComponent>
              <Stack
                sx={{
                  "& > *:not(:last-child)": {
                    marginBottom: "10px",
                  },
                }}
              >
                <FormControl isInvalid={!!errors?.country}>
                  <FormLabel mb="10px" fontSize={"16px"}>
                    {" "}
                    Country
                  </FormLabel>
                  {/*  */}
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <Select placeholder="Select country" {...field}>
                        {countries.map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </Select>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.country && errors.country.message}
                  </FormErrorMessage>
                </FormControl>
                {/* str_name */}
                <FormControl isInvalid={!!errors?.str_name}>
                  <FormLabel mb="10px" fontSize={"16px"}>
                    Street name and house number*
                  </FormLabel>
                  <Controller
                    name="str_name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="Start typing your address"
                        type="text"
                        variant="filled"
                        m="0"
                        {...field}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.str_name && errors.str_name.message}
                  </FormErrorMessage>
                </FormControl>
                {/* zip_code... */}

                <FormControl isInvalid={!!errors?.zip_code}>
                  <FormLabel mb="10px" fontSize={"16px"}>
                    Zip code *
                  </FormLabel>
                  <Controller
                    name="zip_code"
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="91020"
                        type="text"
                        variant="filled"
                        m="0"
                        {...field}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.zip_code && errors.zip_code.message}
                  </FormErrorMessage>
                </FormControl>
                {/*  */}

                <FormControl isInvalid={!!errors?.city}>
                  <FormLabel mb="10px" fontSize={"16px"}>
                    City *
                  </FormLabel>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="91020"
                        type="text"
                        variant="filled"
                        m="0"
                        {...field}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.city && errors.city.message}
                  </FormErrorMessage>
                </FormControl>

                {/*  */}
              </Stack>
            </Box>

            {/* Name */}
            <Divider my="40px" />
            <Box>
              <HeadingComponent
                rest={{
                  fontSize: "32px",
                  fontWeight: 700,
                  lineHeight: "40px",
                  mb: "20px",
                }}
              >
                Tell us about your hotel
              </HeadingComponent>
              <Card p="20px">
                <HeadingComponent rest={{ mb: "10px" }}>
                  What's the name of your hotel?
                </HeadingComponent>
                <FormControl isInvalid={!!errors?.property_name}>
                  <FormLabel mb="10px" fontSize={"16px"}>
                    {" "}
                    Property Name
                  </FormLabel>
                  <Controller
                    name="property_name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="Guests will see this name when searching for a place to stay."
                        type="text"
                        variant="filled"
                        m="0"
                        {...field}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.property_name && errors.property_name.message}
                  </FormErrorMessage>
                </FormControl>

                <Divider my="30px" color={colors["chakraColorsGray300"]} />
                <FormControl isInvalid={!!errors?.star_rating}>
                  <FormLabel mb="10px" fontSize={"16px"}>
                    {" "}
                    What is the star rating of your hotel?
                  </FormLabel>
                  <Controller
                    name="star_rating"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup defaultValue="0" {...field}>
                        <Stack>
                          <Radio value="0">N/A</Radio>
                          <Radio value="1">
                            <Flex alignItems={"center"} gap="10px">
                              {" "}
                              1 star{" "}
                              <Flex>
                                {Array(1)
                                  .fill("")
                                  .map((_, index) => (
                                    <Icon
                                      as={FaStar}
                                      key={index}
                                      color={"orange"}
                                    />
                                  ))}
                              </Flex>
                            </Flex>
                          </Radio>
                          <Radio value="2" display={"flex"}>
                            <Flex alignItems={"center"} gap="10px">
                              2 stars{" "}
                              <Flex>
                                {Array(2)
                                  .fill("")
                                  .map((_, index) => (
                                    <Icon
                                      as={FaStar}
                                      key={index}
                                      color={"orange"}
                                    />
                                  ))}
                              </Flex>
                            </Flex>
                          </Radio>
                          <Radio value="3">
                            <Flex alignItems={"center"} gap="10px">
                              3 stars{" "}
                              <Flex>
                                {Array(3)
                                  .fill("")
                                  .map((_, index) => (
                                    <Icon
                                      as={FaStar}
                                      key={index}
                                      color="orange"
                                    />
                                  ))}
                              </Flex>
                            </Flex>
                          </Radio>
                          <Radio value="4">
                            <Flex alignItems={"center"} gap="10px">
                              4 stars{" "}
                              <Flex>
                                {Array(4)
                                  .fill("")
                                  .map((_, index) => (
                                    <Icon
                                      as={FaStar}
                                      key={index}
                                      color={"orange"}
                                    />
                                  ))}
                              </Flex>
                            </Flex>
                          </Radio>
                          <Radio value="5">
                            <Flex alignItems={"center"} gap="10px">
                              5 stars{" "}
                              <Flex>
                                {Array(5)
                                  .fill("")
                                  .map((_, index) => (
                                    <Icon
                                      as={FaStar}
                                      key={index}
                                      color={"orange"}
                                    />
                                  ))}
                              </Flex>
                            </Flex>
                          </Radio>
                        </Stack>
                      </RadioGroup>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.star_rating && errors.star_rating.message}
                  </FormErrorMessage>
                </FormControl>

                <Divider my="30px" color={colors["chakraColorsGray300"]} />
                <FormControl isInvalid={!!errors?.property_management}>
                  <FormLabel mb="10px" fontSize={"16px"}>
                    {" "}
                    Are you a property management company or part of a group or
                    chain?
                  </FormLabel>
                  <Controller
                    name="property_management"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup defaultValue="No" {...field}>
                        <Stack spacing={4} direction="row">
                          <Radio value="Yes">Yes</Radio>
                          <Radio value="No">No</Radio>
                        </Stack>
                      </RadioGroup>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.property_management &&
                      errors.property_management.message}
                  </FormErrorMessage>
                </FormControl>
              </Card>
            </Box>
            {/* facilities */}
            <Divider my="40px" />
            <Box>
              <HeadingComponent
                rest={{
                  fontSize: "32px",
                  fontWeight: 700,
                  lineHeight: "40px",
                  mb: "20px",
                }}
              >
                What can guests use at your hotel?
              </HeadingComponent>
              <Card p="20px">
                <FormControl isInvalid={!!errors?.facilities}>
                  <FormLabel mb="10px" fontSize={"16px"}>
                    {" "}
                  </FormLabel>
                  <Controller
                    name="facilities"
                    control={control}
                    render={({ field: { ref, ...rest } }) => (
                      <CheckboxGroup
                        {...rest}
                        colorScheme="blue"
                        defaultValue={[...state?.facility.facilities]}
                      >
                        <Stack>
                          {faclities.map((facility, index) => {
                            return (
                              <Checkbox key={index} value={facility}>
                                {facility}
                              </Checkbox>
                            );
                          })}
                        </Stack>
                      </CheckboxGroup>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.facilities && errors.facilities.message}
                  </FormErrorMessage>
                </FormControl>
                {/* <Stack>
            {faclities.map((facility, index) => {
              return (
                <Checkbox key={index} colorScheme="blue">
                  {facility}
                </Checkbox>
              );
            })}
          </Stack> */}
              </Card>
            </Box>
            {/* breakfast */}
            <Divider my="40px" />

            <Box>
              <HeadingComponent
                rest={{
                  fontSize: "32px",
                  fontWeight: 700,
                  lineHeight: "40px",
                  mb: "20px",
                }}
              >
                Breakfast details
              </HeadingComponent>
              <Card p="20px">
                <HeadingComponent rest={{ mb: "10px" }}>
                  Do you serve guests breakfast?
                </HeadingComponent>
                <FormControl isInvalid={!!errors?.breakfast_details}>
                  <FormLabel mb="10px" fontSize={"16px"}>
                    {" "}
                  </FormLabel>
                  <Controller
                    name="breakfast_details"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup defaultValue="No" {...field}>
                        <Stack spacing={4} direction="row">
                          <Radio value="Yes">Yes</Radio>
                          <Radio value="No">No</Radio>
                        </Stack>
                      </RadioGroup>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.breakfast_details &&
                      errors.breakfast_details.message}
                  </FormErrorMessage>
                </FormControl>
              </Card>
            </Box>
            <Divider my="40px" />
            {/* parking */}
            <Box>
              <HeadingComponent
                rest={{
                  fontSize: "32px",
                  fontWeight: 700,
                  lineHeight: "40px",
                  mb: "20px",
                }}
              >
                Tell us about the parking situation at your hotel
              </HeadingComponent>
              <Card p="20px 20px 20px 20px">
                <HeadingComponent rest={{ mb: "10px" }}>
                  Is parking available to guests?
                </HeadingComponent>
                <FormControl isInvalid={!!errors?.parking_details}>
                  <FormLabel mb="10px" fontSize={"16px"}>
                    {" "}
                  </FormLabel>
                  <Controller
                    name="parking_details"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup defaultValue="No" {...field}>
                        <Stack spacing={4}>
                          <Radio value="Yes-free">Yes, free</Radio>
                          <Radio value="Yes-paid">Yes, paid</Radio>
                          <Radio value="No">No</Radio>
                        </Stack>
                      </RadioGroup>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.parking_details && errors.parking_details.message}
                  </FormErrorMessage>
                </FormControl>
              </Card>
            </Box>
            <Divider my="40px" />
            {/* photo */}
            <Photos
              setUpdatedPhoto={(data) => setUpdatedPhoto(data)}
              maxW="800px"
              photo={selectedProperty?.photos || []}
            />
            <Flex gap="10px" mt="30px">
              <Box flex="30%">
                <ButtonWrapper
                  rest={{
                    w: "full",
                    bg: colors["white"],
                    border: `1px solid ${colors["primary"]}`,
                  }}
                  handleClicked={() => window.history.back()}
                >
                  <Icon as={MdArrowBackIos} color={colors["primary"]} />
                </ButtonWrapper>
              </Box>
              <Box flex="70%">
                <ButtonWrapper
                  rest={{ bg: colors["primary"], w: "full" }}
                  isDisabled={updatedPhoto?.length < 6}
                  type="submit"
                >
                  Continue
                </ButtonWrapper>
              </Box>
            </Flex>
          </form>
        </ChakraProvider>
      </Container>
    </MainLayout>
  );
}
