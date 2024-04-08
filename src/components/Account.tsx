import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Icon,
  Flex,
  Box,
} from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import TextComponent from "./TextComponent";
import colors from "../Utils/colors";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { FaWallet, FaRegHeart } from "react-icons/fa6";
import useAuth from "../contextApi/useAuth";
import { useNavigate } from "react-router-dom";
import { FaHotel } from "react-icons/fa";

export default function Account() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const handleLogout = () => {
    setAuth({
      isAuthenticated: false,
      message: "",
      user: {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
      },
    });
    navigate("/");
    // window.location.reload();
  };
  return (
    <Menu>
      <MenuButton as={Box}>
        <Flex
          alignItems={"center"}
          gap="10px"
          color={colors["white"]}
          padding={"5px 10px"}
          sx={{
            "&:hover": {
              background: "red",
            },
          }}
        >
          <Icon as={CgProfile} boxSize={8} />
          <TextComponent rest={{ fontSize: "14px" }}>
            Your account
          </TextComponent>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuGroup>
          <MenuItem
            gap="10px"
            p="10px"
            onClick={() => navigate("/manage-hotel")}
          >
            <Icon as={FaRegUser} boxSize={6} />
            Manage account
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuItem
            gap="10px"
            p="10px"
            onClick={() => navigate("/list-property/category")}
            alignItems={"center"}
            display={{ md: "none", base: "flex" }}
          >
            <Icon as={FaHotel} boxSize={6} />
            List your property
          </MenuItem>
          <MenuItem gap="10px" p="10px">
            <Icon as={FaWallet} boxSize={6} />
            Reward & Wallet
          </MenuItem>
          <MenuItem gap="10px" p="10px">
            <Icon as={FaRegHeart} boxSize={6} />
            Saved
          </MenuItem>
          <MenuItem gap="10px" p="10px" onClick={handleLogout}>
            <Icon as={RiLogoutCircleLine} boxSize={6} />
            Sign out
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
