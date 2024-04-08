import { Heading, HeadingProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function HeadingComponent({
  children,
  rest,
}: {
  children: ReactNode;
  rest?: HeadingProps;
}) {
  return (
    <Heading p="0" m="0" fontSize={"20px"} {...rest}>
      {children}
    </Heading>
  );
}
