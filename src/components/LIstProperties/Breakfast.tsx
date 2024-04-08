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
  BreakfastProps,
  PropertyContext,
} from "../../contextApi/PropertyProvider";
import { useContext } from "react";

export default function Breakfast() {
  const { state, dispatch } = useContext(PropertyContext);
  const schema = yup.object().shape({
    breakfast_details: yup.string().required(),
  });

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<BreakfastProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      breakfast_details: "" || state?.breakfast?.breakfast_details,
    },
  });

  const onSubmit = (data: BreakfastProps) => {
    dispatch({ type: "ADD_BREAKFAST", payload: data });
    navigate("/list-property/parking");
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
          Breakfast details
        </HeadingComponent>
        <ChakraProvider>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card p="20px" minH={"500px"}>
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
                  {errors.breakfast_details && errors.breakfast_details.message}
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
