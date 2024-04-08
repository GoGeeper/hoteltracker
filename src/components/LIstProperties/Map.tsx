import { Box, Flex, Icon } from "@chakra-ui/react";
import HeadingComponent from "../HeadingComponent";

import { ButtonWrapper } from "../ButtonWrapper";
import colors from "../../Utils/colors";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";

export default function Map() {
  const navigate = useNavigate();
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
          Pin the location of your property
        </HeadingComponent>

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
              handleClicked={() => navigate("/list-property/name")}
            >
              Continue
            </ButtonWrapper>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
