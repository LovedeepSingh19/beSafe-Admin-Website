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
import React, { useEffect } from "react";
import { BiLogIn, BiLogOutCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useRecoilState, useSetRecoilState } from "recoil";
import AuthModal from "../Modal/AuthModal";
import { usersListState } from "@/atoms/userListAtom";
import { adminUserState } from "@/atoms/adminAtom";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
const cookies = new Cookies();

type ProfileDropDownProps = {
  userListLoaded: boolean;
};

const ProfileDropDown: React.FC<ProfileDropDownProps> = ({
  userListLoaded,
}) => {
  const setModalState = useSetRecoilState(authModalState);
  const router = useRouter();

  return (
    <Menu>
      <AuthModal />
      {/* <Button variant={"solid"} colorScheme={"teal"} size={"sm"} mr={4}> */}
      {userListLoaded ? (
        <MenuButton
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
        >
          <Avatar size={"sm"} src={""} />
        </MenuButton>
      ) : (
        <Button
          as={Button}
          variant={"solid"}
          onClick={() => setModalState({ open: true })}
          colorScheme={"teal"}
          size={"sm"}
          mr={4}
          // rounded={"full"}
          cursor={"pointer"}
          minW={0}
        >
          <Text>Login/Signup</Text>
        </Button>
      )}
      <MenuList>
        <MenuItem
          _hover={{
            bg: useColorModeValue("brand.700", "brand.900"),
            borderRadius: "4px",
          }}
          onClick={() => {router.push("/Files/Profile")}}
        >
          <Flex align="center" justify={"center"}>
            <Icon fontSize={20} as={CgProfile} ml={5} mr={2} />
            <Text fontWeight={600}>Profile</Text>
          </Flex>
        </MenuItem>
        <MenuDivider />
        <MenuItem
          _hover={{
            bg: useColorModeValue("brand.400", "brand.900"),
            borderRadius: "4px",
          }}
          onClick={() => {cookies.remove("x-auth-token", { path: "/Files" });
          window.location.reload();
        }}
        >
          <Flex
            align="center"
            justify={"center"}
          >
            <Icon fontSize={20} as={BiLogOutCircle} ml={4} mr={2} />
            <Text fontWeight={600}>Log Out</Text>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default ProfileDropDown;
