import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Image,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { BsMoonStars, BsSunFill } from "react-icons/bs";
import { useRouter } from "next/router";
import ProfileDropDown from "./ProfileDropDown";

import Cookies from "universal-cookie";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { usersListState } from "@/atoms/userListAtom";
import { adminUserState } from "@/atoms/adminAtom";

const cookies = new Cookies();

const token = cookies.get("x-auth-token");
const Links2: LinkType[] = [
  { title: "Home" },
];

// returns route if there is a valid token set in the cookie
const Links: LinkType[] = [
  { title: "Home" },
  { title: "Maps" },
];

export type LinkType = {
  title: string;
};

const NavBar: React.FC = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(Links[0].title);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState("");
  const { toggleColorMode, colorMode } = useColorMode();

  const fetchUserList = async () => {
    try {
      const configuration = {
        method: "get",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/Files`,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "x-auth-token": token!,
        },
      };

      const result = await axios(configuration);
      const data = await result.data;
      setAdminState(data.admin_id);
      setUserListState(data.user_id);
      setUserListLoaded(true); // Mark userListState as loaded
    } catch (error) {
      setError("Error: " + error);
    }
  };

  const NavLink = ({ children }: { children: LinkType }) => (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.300", "gray.800"),
      }}
      bg={
        selectedTab === children.title
          ? useColorModeValue("gray.200", "gray.700")
          : "none"
      }
      onClick={() => {
        setSelectedTab(children.title);
        router.push(`/Files/${children.title}`);
      }}
    >
      {children.title}
    </Link>
  );

  const setAdminState = useSetRecoilState(adminUserState);
  const setUserListState = useSetRecoilState(usersListState);
  const [userListLoaded, setUserListLoaded] = useState(false);

  useEffect(() => {
    if (token) {
      fetchUserList();
    }
    // Fetch user list only if token is available
  }, []);

  return (
    <>
      <Box
        borderRadius={"0px 0px 4px 4px"}
        width="100%"
        pos={"fixed"}
        zIndex={1}
        boxShadow="dark-lg"
        position="fixed"
        bg={useColorModeValue("brand.700", "brand.900")}
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack align={"center"} spacing={3}>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <Box
              onClick={() => {
                setSelectedTab(Links[0].title);
                router.push("/");
              }}
            >
              <Image
                height={{ base: "14" }}
                src="/301px-Emblem_of_India.png"
                filter="auto"
                cursor="pointer"
                invert={colorMode === "light" ? 0 : 1}
              />
            </Box>
          </HStack>
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              fontWeight={700}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {/* Only render Links if userListState is loaded */}
              {userListLoaded &&
                Links.map((link) => <NavLink key={link.title}>{link}</NavLink>)}
              {!userListLoaded &&
                Links2.map((link) => (
                  <NavLink key={link.title}>{link}</NavLink>
                ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button variant={"solid"} colorScheme={"teal"} size={"sm"} mr={4}>
              <Icon
                as={colorMode === "light" ? BsMoonStars : BsSunFill}
                onClick={toggleColorMode}
              />
            </Button>
            <ProfileDropDown />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box fontWeight={700} pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.title}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default NavBar;
