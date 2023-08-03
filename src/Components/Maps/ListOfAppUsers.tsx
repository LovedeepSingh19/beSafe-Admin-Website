import { UsersList, usersListState } from "@/atoms/userListAtom";
import Maphooks from "@/hooks/Maphooks";
import { CloseIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  Text,
  List,
  ListItem,
  useColorMode,
  Icon,
  Stack,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

type ListOfAppUsersProps = {
  users: UsersList[];
  setInfoWindow: React.Dispatch<React.SetStateAction<boolean>>;
  setCoord: React.Dispatch<any>;
};

const ListOfAppUsers: React.FC<ListOfAppUsersProps> = ({
  users,
  setInfoWindow,
  setCoord,
}) => {
  // const [users, setUsers] = useRecoilState(usersListState);

  const { mapCenter, calculateDistance } = Maphooks();

  const appUsers = async () => {
    console.log(users);
    // setUsers(userVals as UsersList[]);
  };

  const { colorMode } = useColorMode();
  useEffect(() => {
    appUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.danger ||
      calculateDistance(
        mapCenter.lat,
        mapCenter.lng,
        user.location.latitude,
        user.location.longitude
      ) <= 8
  );

  return (
    <Flex align={"center"} justify={"center"} direction={"column"}>
      <Flex>
        <Text pb={5} mr={10} fontWeight={700}>
          List of Users
        </Text>
      </Flex>
      <Flex
        mr={10}
        align={"center"}
        justify={"center"}
        border={"1px solid red"}
        borderRadius={10}
      >
        {filteredUsers.length ?
        <List p={8}>
          {filteredUsers.map(
            (user) => (
              console.log(user),
              (
                <Stack direction={"column"}>
                  <ListItem
                    m={2}
                    key={user._id}
                    cursor={"pointer"}
                    onClick={() => {
                      setInfoWindow(true);
                      setCoord({
                        lat: user.location.latitude,
                        lng: user.location.longitude,
                        name: user.name,
                        email: user.email,
                        phone: user?.phone,
                      });
                    }}
                    p={2}
                    // border={"1px solid"}
                    borderRadius={4}
                    // _hover={{ bg: "brand.400" }}
                    // onClickCapture={() => {}}
                  >
                    <Button>
                      {user.name}
                      {/* <SmallCloseIcon /> */}
                    </Button>
                  </ListItem>
                </Stack>
              )
            )
          )}
        </List> :
        <Flex>
          <Text p={4}>No One is in danger atleast in 8km radius from you</Text>
        </Flex>
        }
      </Flex>
    </Flex>
  );
};
export default ListOfAppUsers;
