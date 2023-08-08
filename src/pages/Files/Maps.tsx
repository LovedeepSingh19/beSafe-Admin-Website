import React, { useEffect, useState } from "react";
import MapsComponent from "@/Components/Maps/MapsComponent";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
import ListOfAppUsers from "@/Components/Maps/ListOfAppUsers";
import { useRecoilState } from "recoil";
import { usersListState } from "@/atoms/userListAtom";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

const token = cookies.get("x-auth-token");

type MapsProps = {};

const Maps: React.FC<MapsProps> = () => {
  const [users, setUsers] = useRecoilState(usersListState);
  const [infoWindow, setInfoWindow] = useState(false);

  const [Coord, setCoord] = useState(Object);

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
      setUsers(data.user_id);
    } catch (error) {
      console.log("Error Maps component: " + error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserList();
    }

    const interval = setInterval(fetchUserList, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const isDesktop = useBreakpointValue({ base: false, md: true });
  return (
    <Flex p={20} align={"center"} justifyContent={"center"}>
      {isDesktop && (
        <ListOfAppUsers
          users={users}
          setInfoWindow={setInfoWindow}
          setCoord={setCoord}
        />
      )}
      <MapsComponent
        infoWindow={infoWindow}
        setInfoWindow={setInfoWindow}
        Coord={Coord}
        setCoord={setCoord}
      />
    </Flex>
  );
};
export default Maps;
