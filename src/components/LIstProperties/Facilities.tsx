import {
  Box,
  Card,
  Checkbox,
  CheckboxGroup,
  Flex,
  Icon,
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
  FacilitiesProps,
  PropertyContext,
} from "../../contextApi/PropertyProvider";
import { faclities } from "../../Utils/data";
import { useContext } from "react";

export default function Facilities() {
  const { state, dispatch } = useContext(PropertyContext);
  const schema = yup.object().shape({
    facilities: yup.array().required(),
  });

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<FacilitiesProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      facilities: state?.facility.facilities || [],
    },
  });

  const onSubmit = (data: FacilitiesProps) => {
    dispatch({ type: "ADD_FACILITY", payload: data });
    navigate("/list-property/breakfast");
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
          What can guests use at your hotel?
        </HeadingComponent>
        <ChakraProvider>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                      defaultValue={state?.facility.facilities || []}
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
                  isDisabled={watch("facilities").length === 0}
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
