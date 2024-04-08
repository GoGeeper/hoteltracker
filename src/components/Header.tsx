import {
  Container,
  Flex,
  Stack,
  ListItem,
  List,
  Box,
  Icon,
  Image,
} from "@chakra-ui/react";
import colors from "../Utils/colors";
import { ButtonWrapper } from "./ButtonWrapper";
import TextComponent from "./TextComponent";
import { navigation } from "../Utils/data";
import genuis from "../assets/genuis.png";
import { Link, useNavigate } from "react-router-dom";
import Account from "./Account";
import useAuth from "../contextApi/useAuth";

export default function Header({ isDesc = true }: { isDesc?: boolean }) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  return (
    <Stack bg={colors["primary"]} p="30px">
      <Container maxW={"1200px"}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Link to="/">
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

          <Stack flexDirection={"row"}>
            <Box display={{ base: "none", md: "inline-block" }}>
              <ButtonWrapper
                variant="ghost"
                hoverStyles={{
                  bg: colors["lightBg"],
                }}
                handleClicked={() => navigate("/list-property/category")}
              >
                List your property
              </ButtonWrapper>
            </Box>

            {auth?.isAuthenticated ? (
              <>
                <Account />
              </>
            ) : (
              <>
                {" "}
                <ButtonWrapper
                  rest={{ bg: "white", color: colors["primary"] }}
                  type="button"
                  handleClicked={() => navigate("/register")}
                >
                  Register
                </ButtonWrapper>
                <ButtonWrapper
                  rest={{ bg: "white", color: colors["primary"] }}
                  type="button"
                  handleClicked={() => navigate("/login")}
                >
                  Sign in
                </ButtonWrapper>
              </>
            )}
          </Stack>
        </Flex>
        {/* navigation */}
        <List
          display={"flex"}
          gap="30px"
          mt="30px"
          overflowX={"scroll"}
          sx={{
            "&::-webkit-scrollbar": {
              display: "none", // Hide the scrollbar track for WebKit browsers
            },
            "&": {
              msOverflowStyle: "none", // Hide scrollbar for IE/Edge
              scrollbarWidth: "none", // Hide scrollbar for Firefox
            },
          }}
        >
          {navigation.map((item) => (
            <ListItem
              key={item.id}
              color={colors["white"]}
              cursor={"pointer"}
              p="10px 15px"
              borderRadius="30px"
              whiteSpace={"nowrap"}
              _hover={{
                bg: colors["lightBg"],
              }}
              display={"flex"}
              alignItems={"center"}
              gap="10px"
              bg={item?.id === 1 ? colors["lightBg"] : ""}
            >
              <>
                <Icon as={item?.icon} />
                {item.title}
              </>
            </ListItem>
          ))}
        </List>
        {isDesc && (
          <Flex display={{ md: "flex" }} justifyContent={"space-between"}>
            <Box mt="80px" maxW={"600px"}>
              <TextComponent
                rest={{
                  fontSize: "48px",
                  color: colors["white"],
                  fontWeight: "bold",
                }}
              >
                Sign in, save money
              </TextComponent>
              <TextComponent
                rest={{
                  fontSize: "24px",
                  color: colors["white"],
                  lineHeight: "32px",
                  mb: "40px",
                }}
              >
                Save 10% or more at participating properties – just look for the
                blue Genius label.
              </TextComponent>
              <ButtonWrapper rest={{ bg: colors["primaryLigher"] }}>
                Sign in or register
              </ButtonWrapper>
            </Box>
            <Image
              src={genuis}
              display={{ md: "inline-block", base: "none" }}
            />
          </Flex>
        )}
      </Container>
    </Stack>
  );
}
