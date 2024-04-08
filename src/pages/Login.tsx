import {
  Alert,
  AlertIcon,
  Container,
  Divider,
  Input,
  Stack,
} from "@chakra-ui/react";
import HeadingComponent from "../components/HeadingComponent";
import TextComponent from "../components/TextComponent";
import AuthLayout from "../layouts/AuthLayout";
import { ButtonWrapper } from "../components/ButtonWrapper";
import colors from "../Utils/colors";
import { useContext, useEffect, useState } from "react";
import { RegisterContext } from "../contextApi/RegisterContext";
import { AuthContext } from "../contextApi/AuthProvider";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../contextApi/useAuth";

interface LoginFormData {
  email: string;
  password: string;
}
export default function Login() {
  const { auth } = useAuth();
  const [sucess, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { registered } = useContext(RegisterContext);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = handleSubmit((data) => {
    setErrorMessage("");
    setSuccess("");
    const existingUser = registered?.find(
      (item) => item.email === data.email && item.password === data.password
    );
    if (existingUser && Object.entries(existingUser)?.length > 0) {
      setAuth({
        isAuthenticated: true,
        message: "successfully logged in",
        user: existingUser,
      });
      if (location?.state) {
        navigate(location?.state.from.pathname, { replace: true });
      } else {
        setSuccess(
          "successfully logged in and will be redirected to the dashboard shortly......"
        );
        setTimeout(() => {
          const redirect = location?.state
            ? location?.state.from.pathname
            : "/";
          navigate(redirect, { replace: true });
        }, 3000);
      }
    } else {
      setErrorMessage("invalid email or password");
    }
  });
  useEffect(() => {
    if (auth?.isAuthenticated) {
      navigate("/");
    }
  }, [auth]);
  return (
    <AuthLayout>
      <Container maxW={"450px"} mt={"60px"}>
        <HeadingComponent rest={{ fontSize: "20px" }}>
          Create your partner account
        </HeadingComponent>
        <TextComponent rest={{ fontSize: "14px", color: "gray.500" }}>
          Create an account to manage your property with ease
        </TextComponent>

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
        <form onSubmit={onSubmit}>
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
          <Stack>
            <TextComponent rest={{ fontSize: "16px" }}>password</TextComponent>
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
          <ButtonWrapper
            rest={{
              bg: colors["primaryLigher"],
              w: "full",
              py: "25px",
              mt: "20px",
            }}
            type="submit"
          >
            Continue
          </ButtonWrapper>
        </form>

        {/* divider */}
        <Divider my="20px" />

        <TextComponent rest={{ fontSize: "14px" }}>
          Questions about your property or the Extranet? Check out Partner Help
          or ask another partner in the Partner Community.
        </TextComponent>
        <ButtonWrapper
          variant="outline"
          rest={{
            mt: "20px",
            borderColor: colors["primaryLigher"],
            color: colors["primaryLigher"],
            w: "full",
            py: "25px",
          }}
        >
          Sign in{" "}
        </ButtonWrapper>
        <Divider my="20px" />
        <TextComponent rest={{ fontSize: "14px", textAlign: "center" }}>
          By signing in or creating an account, you agree with our Terms &
          Conditions and Privacy Statement
        </TextComponent>
      </Container>
    </AuthLayout>
  );
}
