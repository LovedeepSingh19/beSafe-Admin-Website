import React, { useState } from "react";
import MapsComponent from "@/Components/Maps/MapsComponent";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
import ListOfAppUsers from "@/Components/Maps/ListOfAppUsers";
import { useRecoilState } from "recoil";
import { usersListState } from "@/atoms/userListAtom";

type MapsProps = {};

const Maps: React.FC<MapsProps> = () => {
  const [users, setUsers] = useRecoilState(usersListState);
  const [infoWindow, setInfoWindow] = useState(false);

  const [Coord, setCoord] = useState(Object);

  const isDesktop = useBreakpointValue({ base: false, md: true });
  return (
    <Flex p={20} align={"center"} justifyContent={"center"}>
      {isDesktop && <ListOfAppUsers users={users} setInfoWindow={setInfoWindow} setCoord={setCoord} />}
      <MapsComponent infoWindow={infoWindow} setInfoWindow={setInfoWindow} Coord={Coord} setCoord={setCoord} />
    </Flex>
  );
};
export default Maps;
