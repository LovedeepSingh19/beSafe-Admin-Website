import { authModalState } from "@/atoms/authModalAtom";
import {
  Menu,
  MenuButton,
  Text,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  useColorModeValue,
  Flex,
  Icon,
  MenuDivider,
} from "@chakra-ui/react";
import React from "react";
import { BiLogIn, BiLogOutCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSetRecoilState } from "recoil";
import AuthModal from "../Modal/AuthModal";

type ProfileDropDownProps = {};

const ProfileDropDown: React.FC<ProfileDropDownProps> = () => {
  const setModalState = useSetRecoilState(authModalState);
  return (
    <Menu>
      <AuthModal />
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar size={"sm"} src={""} />
      </MenuButton>
      <MenuList>
        <MenuItem
          _hover={{
            bg: useColorModeValue("brand.700", "brand.900"),
            borderRadius: "4px",
          }}
          onClick={() => {}}
        >
          <Flex align="center" justify={"center"}>
            <Icon fontSize={20} as={CgProfile} ml={5} mr={2} />
            <Text fontWeight={600}>Profile</Text>
          </Flex>
        </MenuItem>
        <MenuItem
          _hover={{
            bg: useColorModeValue("brand.700", "brand.900"),
            borderRadius: "4px",
          }}
          onClick={() => setModalState({ open: true })}
        >
          <Flex align="center" justify={"center"}>
            <Icon fontSize={22} as={BiLogIn} ml={4} mr={2} />
            <Text fontWeight={600}>Log In</Text>
          </Flex>
        </MenuItem>
        <MenuDivider />
        <MenuItem
          _hover={{
            bg: useColorModeValue("brand.400", "brand.900"),
            borderRadius: "4px",
          }}
          onClick={() => {}}
        >
          <Flex align="center" justify={"center"} onClick={() => {}}>
            <Icon fontSize={20} as={BiLogOutCircle} ml={4} mr={2} />
            <Text fontWeight={600}>Log Out</Text>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default ProfileDropDown;
