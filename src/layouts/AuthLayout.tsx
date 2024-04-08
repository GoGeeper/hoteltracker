import { Container, Flex, Icon, Link } from "@chakra-ui/react";
import colors from "../Utils/colors";
import TextComponent from "../components/TextComponent";
import { GrCircleQuestion } from "react-icons/gr";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <Flex bg={colors["primary"]} p="30px">
        <Container maxW={"1200px"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Link
              href="/"
              sx={{
                "&:link": {
                  textDecoration: "none",
                },
              }}
            >
              <TextComponent
                rest={{
                  color: colors["white"],
                  fontWeight: 900,
                  fontSize: "20px",
                }}
              >
                HotelTracker.com
              </TextComponent>
            </Link>

            <Icon as={GrCircleQuestion} color={colors["white"]} boxSize={8} />
          </Flex>
        </Container>
      </Flex>
      {children}
    </>
  );
}
