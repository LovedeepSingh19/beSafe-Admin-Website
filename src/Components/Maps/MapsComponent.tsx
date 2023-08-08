import { adminUserState } from "@/atoms/adminAtom";
import { UsersList, usersListState } from "@/atoms/userListAtom";
import Maphooks from "@/hooks/Maphooks";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import {
  CircleF,
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import io from "socket.io-client";
import Cookies from "universal-cookie";

const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);

type MapsComponentProps = {
  infoWindow: boolean;
  setInfoWindow: React.Dispatch<React.SetStateAction<boolean>>;
  Coord: any;
  setCoord: React.Dispatch<any>;
};

const MapsComponent: React.FC<MapsComponentProps> = ({
  infoWindow,
  setInfoWindow,
  Coord,
  setCoord,
}) => {
  const libraries = useMemo(() => ["places"], []);

  const cookies = new Cookies();

  const token = cookies.get("x-auth-token");

  const CorrdsList = useRecoilValue(usersListState);
  const setcorrdsList = useSetRecoilState(usersListState);
  const admins = useRecoilValue(adminUserState);

  // const finalizeLocation = async () => {
  //   // const response = axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Files/Update-Location`)
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Files/Update-Location`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         user_id: CorrdsList
  //       }),
  //     });

  //     console.log(response.status)

  //   } catch (error) {
  //     console.log("error: ", error)
  //   }

  // }

  const removeUser = async (email: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Files/remove-User`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: email,
          admin_email: admins,
        }),
      });
    } catch (error) {
      console.log("dialog box error: ", error);
    }
  };

  useEffect(() => {
    socket.connect();
    console.log("socket connected");

    // const interval = setInterval(finalizeLocation, 10000);

    return () => {
      console.log("Socket disconnected");
      // clearInterval(interval);
      // finalizeLocation();
      socket.disconnect();
    };
  }, []);

  socket.on("dataChange", async (data) => {
    console.log(data);
    setcorrdsList(updateUser(data.documentKey._id, data));

    console.log("Static Data:  ", CorrdsList);
    const userWithId = CorrdsList.find(
      (user) => user._id === data.documentKey._id
    );

    // if(user doesnt exist){
    if (!userWithId) {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Files/add-User`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: data.documentKey._id,
        }),
      });
    }
  });

  const { error, circleTime, mapCenter, calculateDistance } = Maphooks();

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  const updateUser = (id: string, data: any) => {
    const updatedUserList = CorrdsList.map((user: UsersList) => {
      if (user._id === id) {
        const updatedUser = {
          ...user,
          location: data.updateDescription.updatedFields,
        };
        return updatedUser;
      }
      return user;
    });

    return updatedUserList;
  };

  return (
    <>
      {isLoaded ? (
        <Flex align={"center"} justify={"center"} direction={"column"}>
          <Flex>
            <Text pb={5} fontWeight={700}>
              Map
            </Text>
          </Flex>
          <GoogleMap
            options={mapOptions}
            zoom={12}
            center={mapCenter}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerStyle={{ width: "800px", height: "400px" }}
            onLoad={() => console.log("Map Component Loaded ... ")}
          >
            {circleTime && (
              <CircleF
                options={{ fillColor: "brown", strokeColor: "transparent" }}
                center={mapCenter}
                radius={8000}
                // radius in meters
              />
            )}
            <>
              <MarkerF
                icon={{
                  url: "/icons8-location-50.png",
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
                position={mapCenter}
              />
              {CorrdsList &&
                CorrdsList.map((coords) => {
                  //radius in KM
                  if (
                    coords.location.latitude &&
                    calculateDistance(
                      mapCenter.lat,
                      mapCenter.lng,
                      coords.location.latitude,
                      coords.location.longitude
                    ) <= 8 &&
                    coords.danger
                  ) {
                    return (
                      <MarkerF
                        key={coords._id}
                        position={{
                          lat: coords.location.latitude,
                          lng: coords.location.longitude,
                        }}
                        onClick={() => {
                          setInfoWindow(true);
                          setCoord({
                            lat: coords.location.latitude,
                            lng: coords.location.longitude,
                            name: coords.name,
                            email: coords.email,
                            phone: coords?.phone,
                          });
                        }}
                      />
                    );
                  }
                })}
              {infoWindow && (
                <InfoWindowF
                  position={{ lat: Coord.lat, lng: Coord.lng }}
                  onCloseClick={() => {
                    setInfoWindow(false);
                    setCoord({});
                  }}
                >
                  <Flex
                    borderRadius={10}
                    color={"white"}
                    align={"center"}
                    p={2}
                    bg={"blackAlpha.900"}
                    direction={"column"}
                  >
                    <Flex fontWeight={800}>{Coord.name}</Flex>
                    {Coord.phone && <Flex>{Coord.phone}</Flex>}
                    {Coord.email}
                    <Button
                      colorScheme="green"
                      borderRadius={20}
                      width={1}
                      m={2}
                      onClick={() => removeUser(Coord.email)}
                    >
                      <SmallCloseIcon />
                    </Button>
                  </Flex>
                </InfoWindowF>
              )}
            </>
          </GoogleMap>
        </Flex>
      ) : (
        <Flex p={20}>Loading ....</Flex>
      )}
    </>
  );
};
export default MapsComponent;
