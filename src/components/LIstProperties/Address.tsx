import { Box, Flex, Icon, Input, Select, Stack } from "@chakra-ui/react";
import HeadingComponent from "../HeadingComponent";

import { ButtonWrapper } from "../ButtonWrapper";
import colors from "../../Utils/colors";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { countries } from "../../Utils/data";
import { PropertyContext } from "../../contextApi/PropertyProvider";
import { useContext } from "react";

import { AddressProps } from "../../contextApi/PropertyProvider";
import {
  ChakraProvider,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function Address() {
  const { state, dispatch } = useContext(PropertyContext);
  const schema = yup.object().shape({
    country: yup.string().required(),
    str_name: yup.string().required(),
    zip_code: yup.string().required(),
    city: yup.string().required(),
  });

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<AddressProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      country: "" || state.address.country,
      str_name: "" || state.address.str_name,
      zip_code: "" || state.address.zip_code,
      city: "" || state.address.city,
    },
  });

  const onSubmit = (data: AddressProps) => {
    dispatch({ type: "ADD_ADDRESS", payload: data });
    navigate("/list-property/map");
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
          Where is the property you're listing?
        </HeadingComponent>
        <ChakraProvider>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  type="submit"
                  isDisabled={!isValid}
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
