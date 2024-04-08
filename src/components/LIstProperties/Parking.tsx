import {
  Box,
  Card,
  Flex,
  Icon,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import HeadingComponent from "../HeadingComponent";
import { ButtonWrapper } from "../ButtonWrapper";
import colors from "../../Utils/colors";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import {
  ChakraProvider,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  ParkingProps,
  PropertyContext,
} from "../../contextApi/PropertyProvider";
import { useContext } from "react";

export default function Parking() {
  const { state, dispatch } = useContext(PropertyContext);
  const schema = yup.object().shape({
    parking_details: yup.string().required(),
  });

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ParkingProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      parking_details: "" || state?.parking?.parking_details,
    },
  });

  const onSubmit = (data: ParkingProps) => {
    dispatch({ type: "ADD_PARKING", payload: data });
    navigate("/list-property/photos");
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
          Tell us about the parking situation at your hotel
        </HeadingComponent>
        <ChakraProvider>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card p="20px 20px 120px 20px">
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
