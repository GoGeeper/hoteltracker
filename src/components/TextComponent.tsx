import { Text, TextProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function TextComponent({
  children,
  rest,
}: {
  children: ReactNode;
  rest?: TextProps;
}) {
  return (
    <Text p="0" m="0" {...rest}>
      {children}
    </Text>
  );
}
