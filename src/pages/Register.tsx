import {
  Box,
  Container,
  Divider,
  Flex,
  Input,
  Stack,
  Alert,
  AlertIcon,
  Highlight,
} from "@chakra-ui/react";
import HeadingComponent from "../components/HeadingComponent";
import TextComponent from "../components/TextComponent";
import AuthLayout from "../layouts/AuthLayout";
import { ButtonWrapper } from "../components/ButtonWrapper";
import colors from "../Utils/colors";
import { useForm } from "react-hook-form";
import { RegisterContext } from "../contextApi/RegisterContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../contextApi/useAuth";

interface RegisterFormData {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}
export default function Register() {
  const { auth } = useAuth();
  const [sucess, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { registered, setRegister } = useContext(RegisterContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>();
  const onSubmit = handleSubmit((data) => {
    setErrorMessage("");
    setSuccess("");
    const existingUser = registered?.find(
      (item) => item.email === data.email || item.username === data.username
    );
    if (existingUser && Object.entries(existingUser)?.length > 0) {
      setErrorMessage("User already exists");
    } else {
      setRegister([
        ...registered,
        { ...data, id: new Date().getTime().toString() },
      ]);
      setSuccess(
        "User registered successfully and will be redirected to the login page shortly......"
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  });
  // prevent user from accessing register page after authentication
  useEffect(() => {
    if (auth?.isAuthenticated) {
      navigate("/");
    }
  }, [auth]);
  return (
    <AuthLayout>
      <form onSubmit={onSubmit}>
        <Container maxW={"450px"} mt={"60px"} pb="80px">
          <HeadingComponent rest={{ fontSize: "20px", mb: "20px" }}>
            Sign in to manage your property
          </HeadingComponent>

          {sucess && (
            <Alert status="success" mb="10px">
              <AlertIcon />
              {sucess}
            </Alert>
          )}
          {errorMessage && (
            <Alert status="error" mb="10px">
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}
          <Box
            sx={{
              "& > *": {
                marginBottom: "20px",
              },
            }}
          >
            <Stack>
              <TextComponent rest={{ fontSize: "16px" }}>
                Username
              </TextComponent>
              <Input
                placeholder="Also know as 'Login name' and 'Login ID'"
                type="text"
                variant="filled"
                m="0"
                {...register("username", { required: "username is required" })}
              />
              {errors?.username && (
                <span style={{ color: "red", padding: "0" }}>
                  {errors.username?.message}
                </span>
              )}
            </Stack>
            <Flex
              gap="10px"
              sx={{
                "& > *": {
                  flex: 1,
                },
              }}
            >
              <Stack>
                <TextComponent rest={{ fontSize: "16px" }}>
                  first name
                </TextComponent>
                <Input
                  placeholder="Enter first name"
                  type="text"
                  variant="filled"
                  m="0"
                  {...register("first_name", {
                    required: "first name is required",
                  })}
                />
                {errors?.first_name && (
                  <span style={{ color: "red", padding: "0" }}>
                    {errors.first_name?.message}
                  </span>
                )}
              </Stack>
              <Stack>
                <TextComponent rest={{ fontSize: "16px" }}>
                  Last name
                </TextComponent>
                <Input
                  placeholder="Enter last name"
                  type="text"
                  variant="filled"
                  m="0"
                  {...register("last_name", {
                    required: "Last name is required",
                  })}
                />
                {errors?.last_name && (
                  <span style={{ color: "red", padding: "0" }}>
                    {errors.last_name?.message}
                  </span>
                )}
              </Stack>
            </Flex>

            <Stack>
              <TextComponent rest={{ fontSize: "16px" }}>Email </TextComponent>
              <Input
                placeholder="johndoe@gmail.com"
                type="text"
                variant="filled"
                m="0"
                {...register("email", { required: "email is required" })}
              />
              {errors?.email && (
                <span style={{ color: "red", padding: "0" }}>
                  {errors.email?.message}
                </span>
              )}
            </Stack>
            <Flex
              gap="10px"
              sx={{
                "& > *": {
                  flex: 1,
                },
              }}
            >
              <Stack>
                <TextComponent rest={{ fontSize: "16px" }}>
                  password
                </TextComponent>
                <Input
                  placeholder="Enter password'"
                  type="password"
                  variant="filled"
                  m="0"
                  {...register("password", {
                    required: "password is required",
                    minLength: {
                      value: 6,
                      message: "password must be at least 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[!@#$%^&*()_+}{:;'?/.,\[\]\-])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$/,
                      message:
                        "Password must contain at least one special character, one number, one uppercase letter, and one lowercase letter",
                    },
                  })}
                />
                {errors?.password && (
                  <span style={{ color: "red", padding: "0" }}>
                    {errors.password?.message}
                  </span>
                )}
              </Stack>
              <Stack>
                <TextComponent rest={{ fontSize: "16px" }}>
                  confirm password
                </TextComponent>
                <Input
                  placeholder="Enter password"
                  type="password"
                  variant="filled"
                  m="0"
                  {...register("confirm_password", {
                    validate: (val) => {
                      if (!val) {
                        return "this field is required";
                      } else if (watch("password") !== val) {
                        return "Your passwords do not match";
                      }
                    },
                  })}
                />
                {errors?.confirm_password && (
                  <span style={{ color: "red", padding: "0" }}>
                    {errors.confirm_password?.message}
                  </span>
                )}
              </Stack>
            </Flex>
          </Box>

          <ButtonWrapper
            rest={{ bg: colors["primaryLigher"], py: "25px", w: "full" }}
            type="submit"
          >
            Next
          </ButtonWrapper>

          {/* divider */}
          <Divider my="20px" />

          <TextComponent rest={{ fontSize: "14px" }}>
            Questions about your property or the Extranet? Check out Partner
            Help or ask another partner in the Partner Community.
          </TextComponent>
          <ButtonWrapper
            variant="outline"
            rest={{
              mt: "20px",
              borderColor: colors["primaryLigher"],
              color: colors["primaryLigher"],
              py: "25px",
              w: "full",
            }}
          >
            create your partner account{" "}
          </ButtonWrapper>
          <Divider my="20px" />
          <TextComponent rest={{ fontSize: "14px", textAlign: "center" }}>
            <Highlight
              query={["Terms", "Conditions", "Privacy Statement"]}
              styles={{
                color: colors["primary"],
              }}
            >
              By signing in or creating an account, you agree with our Terms &
              Conditions and Privacy Statement
            </Highlight>
          </TextComponent>
        </Container>
      </form>
    </AuthLayout>
  );
}
