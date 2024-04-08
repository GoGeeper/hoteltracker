import { Container, Flex, Icon } from "@chakra-ui/react";
import colors from "../../Utils/colors";
import TextComponent from "../TextComponent";
import { GrCircleQuestion } from "react-icons/gr";

export default function Auth() {
  return (
    <>
      <Flex bg={colors["primary"]} p="30px">
        <Container maxW={"1200px"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <TextComponent
              rest={{
                color: colors["white"],
                fontWeight: 900,
                fontSize: "20px",
              }}
            >
              HotelTracker.com
            </TextComponent>
            <Icon as={GrCircleQuestion} color={colors["white"]} boxSize={8} />
          </Flex>
        </Container>
      </Flex>
    </>
  );
}
