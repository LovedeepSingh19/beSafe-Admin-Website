import {
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import React, { useMemo } from "react";

type HomePageProps = {};

const HomePage: React.FC<HomePageProps> = () => {
  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );
  const libraries = useMemo(() => ["places"], []);
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  return (
    <Flex>
      <>
        <Stack p={20}>
          <Flex direction={"column"} justify={"center"} align={"center"}>
            <Text color={"red.400"} fontWeight={700}>
              REACH OUT TO{" "}
            </Text>
            <Text fontSize={"30px"} fontWeight={700}>
              Women Safety Wing, Police
            </Text>
            <Stack direction={isDesktop ? "row" : "column"}>
              <Flex
                m={10}
                height={"200pt"}
                width={isDesktop ? "600pt" : "400pt"}
                border={"1px solid red"}
              >
                {isLoaded ? (
                  <GoogleMap
                    options={mapOptions}
                    zoom={12}
                    center={{ lat: 28.539793, lng: 77.291739 }}
                    mapTypeId={google.maps.MapTypeId.ROADMAP}
                    mapContainerStyle={
                      isDesktop
                        ? { width: "600pt", height: "198pt" }
                        : { width: "400pt", height: "198pt" }
                    }
                    onLoad={() => console.log("Map Component Loaded ... ")}
                  >
                    <MarkerF position={{ lat: 28.539793, lng: 77.291739 }} />
                  </GoogleMap>
                ) : (
                  <Flex p={20}>Loading ....</Flex>
                )}
              </Flex>
              <Flex
                pl={10}
                pr={10}
                pt={isDesktop ? 0 : 5}
                pb={isDesktop ? 0 : "35px"}
                align={"center"}
                justify={"center"}
                border={"1px solid red"}
                borderRadius={10}
                direction={"column"}
              >
                <Text m={2} color={"red.400"} fontWeight={700} pt={0} pb={5}>
                  Women Safety Wing Headquarters
                </Text>
                <Flex p={2} direction={"column"} justify={"left"}>
                  <Text>Women Safety Wing Police,</Text>
                  <Divider />
                  <Text p={1}>
                    PLOT NO 21, FC33, Institutional Area, Jasola, New Delhi,
                    Delhi 110025
                  </Text>
                  <Divider />
                  <Text p={1}> +91 9440700906</Text>
                  <Divider />
                  <Text p={1}> +91 01126944805</Text>
                  <Divider />
                  <Text p={1}> Womensafety-ts@tspolice.gov.in</Text>
                  <Divider />
                  <Text p={1}> womensafety.ts@gmail.com</Text>
                  <Divider />
                </Flex>
              </Flex>
            </Stack>
            <Flex
              pt={5}
              direction={"column"}
              justify={"center"}
              align={"center"}
              pl={isDesktop?120: 20} pr={isDesktop?100: 20}
            >
              <Text pb={6} pt={15} color={"red.400"} fontWeight={700}>
                ABOUT WOMEN SAFETY WEBSITE/APP
              </Text>
              <Text>
                The Women Safety Wing is a department of the Police working to
                ensure the safety, dignity and empowerment of women in the
                state. The Wing has been designed to handle the investigation
                into crimes against women that specifically include prevention
                of trafficking, sexual offences, domestic violence, juvenile
                delinquency, NRI issues & cyber crimes Providing a safe
                environment to women & children while coming up with
                issue-specific solutions is a task that TSWSW addresses with all
                its earnestness. The Women Safety Wing (WSW) was carved out from
                the Women Protection Cell, CID. It is a fully equipped and
                functional department working at independent premises. The WSW
                has its own cadre strength and a very specific mandate.
              </Text>
            </Flex>
          </Flex>
        </Stack>
      </>
    </Flex>
  );
};
export default HomePage;
