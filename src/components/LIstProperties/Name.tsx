import {
  Box,
  Card,
  Divider,
  Flex,
  Icon,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import HeadingComponent from "../HeadingComponent";
import { ButtonWrapper } from "../ButtonWrapper";
import colors from "../../Utils/colors";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { useContext } from "react";

import {
  ChakraProvider,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NameProps, PropertyContext } from "../../contextApi/PropertyProvider";

export default function Name() {
  const { state, dispatch } = useContext(PropertyContext);
  const schema = yup.object().shape({
    property_name: yup.string().required(),
    star_rating: yup.string().required(),
    property_management: yup.string().required(),
  });

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<NameProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      property_name: "" || state.name.property_name,
      star_rating: "" || state.name.star_rating,
      property_management: "" || state.name.property_management,
    },
  });

  const onSubmit = (data: NameProps) => {
    console.log(data);
    dispatch({ type: "ADD_NAME", payload: data });
    navigate("/list-property/facilities");
  };

  return (
    <>
      <Box maxW={"600px"}>
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
        <ChakraProvider>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  isDisabled={!isValid}
                  type="submit"
                >
                  Continue
                </ButtonWrapper>
              </Box>
            </Flex>
          </form>
        </ChakraProvider>
      </Box>
    </>
  );
}
