import { Button, useColorModeValue, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import TextComponent from "./TextComponent";

interface ButtonWrapperProps {
  children: ReactNode;
  rest?: ButtonProps;
  handleClicked?: () => void;
  isLoading?: boolean;
  variant?: "outline" | "solid" | "ghost" | "link";
  type?: "submit" | "reset" | "button";
  hoverStyles?: Record<string, string>; // Define type for hover styles
  isDisabled?: boolean;
  w?: string;
}

export const ButtonWrapper = ({
  children,
  rest,
  isDisabled = false,
  handleClicked,
  isLoading = false,
  variant = "solid",
  hoverStyles = {}, // Default value for hover styles
  w = "auto",
  ...props
}: ButtonWrapperProps) => {
  return (
    <Button
      variant={variant}
      color={useColorModeValue(`#fff`, "#000")}
      onClick={handleClicked}
      fontSize="15px"
      w={w}
      sx={{
        "&:hover": hoverStyles, // Apply hover styles conditionally
      }}
      {...rest}
      // disabled={true}
      {...props} // Spread the remaining props
      isDisabled={isDisabled}
    >
      {isLoading ? <TextComponent>Loading....</TextComponent> : children}
    </Button>
  );
};
