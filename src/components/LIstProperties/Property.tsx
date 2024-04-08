import { Box, Card, Flex, Icon, SimpleGrid, Stack } from "@chakra-ui/react";
import HeadingComponent from "../HeadingComponent";
import TextComponent from "../TextComponent";
import { ButtonWrapper } from "../ButtonWrapper";
import colors from "../../Utils/colors";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { useEffect, useState, useContext } from "react";
import { PropertyContext } from "../../contextApi/PropertyProvider";

export interface chainProps {
  name: string;
  description: string;
  isSelected?: boolean;
}
export default function Property() {
  const { state, dispatch } = useContext(PropertyContext);
  const navigate = useNavigate();

  const chains: chainProps[] = [
    {
      name: "hotel",
      description:
        "Accommodations for travelers often with restaurants, meeting rooms and other guest services",
    },
    {
      name: "guesthouse",
      description:
        "Private home with separate living facilities for host and guest",
    },
    {
      name: "homestay",
      description:
        "A shared home where the guest has a private room and the host lives and is on site. Some facilities are shared between hosts and guests.",
    },
    {
      name: "hostel",
      description:
        "Budget accommodations with mostly dorm-style beds and social atmosphere.",
    },
    {
      name: "condo hotel",
      description:
        "Independent apartments with some hotel facilities like a front desk",
    },
  ];
  const [selectedChain, setSelectedChain] = useState("");
  const [chain, setChain] = useState<chainProps[]>(chains);

  useEffect(() => {
    if (selectedChain) {
      setChain(
        chains?.map((chain) => {
          return chain?.name === selectedChain
            ? { ...chain, isSelected: true }
            : { ...chain, isSelected: false };
        })
      );
    }
  }, [selectedChain]);
  // update the selectedChain in the state
  useEffect(() => {
    if (state?.chain?.category) {
      setSelectedChain(state?.chain?.category);
    }
  }, [state?.chain?.category]);
  return (
    <>
      <HeadingComponent
        rest={{ fontSize: "32px", fontWeight: 700, lineHeight: "40px" }}
      >
        From the list below, which property category is the best fit for your
        place?
      </HeadingComponent>
      <SimpleGrid minChildWidth={"300px"} spacing={4} mt="30px">
        {chain.map(({ name, description, isSelected = false }, index) => (
          <Card
            p="30px"
            // borderWidth={"1px"}
            key={index}
            border={isSelected ? `1px solid ${colors["primary"]}` : ""}
            cursor={"pointer"}
            _hover={{
              border: `1px solid ${colors["primary"]}`,
            }}
            onClick={() => setSelectedChain(name)}
          >
            <Stack>
              <TextComponent rest={{ fontSize: "20px" }}>{name}</TextComponent>
              <TextComponent rest={{ fontSize: "14px" }}>
                {description}
              </TextComponent>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

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
            handleClicked={() => {
              dispatch({
                payload: { category: selectedChain },
                type: "ADD_CHAIN",
              });
              navigate("/list-property/address");
            }}
            isDisabled={selectedChain?.length === 0}
          >
            Continue
          </ButtonWrapper>
        </Box>
      </Flex>
    </>
  );
}
