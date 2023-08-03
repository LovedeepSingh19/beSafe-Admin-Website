import { Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { GoogleMap } from "@react-google-maps/api";
import React from "react";

type EmergencyProps = {};

const Emergency: React.FC<EmergencyProps> = () => {
  return (
    <>
      <Stack p={20}>
        <Flex direction={"column"} justify={"center"} align={"center"}>
          <Text color={"red.400"} fontWeight={700}>
            REACH OUT TO{" "}
          </Text>
          <Text fontSize={"30px"} fontWeight={700}>
            Women Safety Wing, Police
          </Text>
          <HStack>
            <Flex
              m={10}
              height={"200pt"}
              width={"600pt"}
              border={"1px solid red"}
            >
              {/* <GoogleMap /> */}
            </Flex>
            <Flex align={'center'} direction={'column'}>
              <Text m={2} fontWeight={700}>Women Safety Wing Headquarters</Text>
              <Flex direction={'column'} justify={"left"}>
              <Text>Women Safety Wing Telangana Police,</Text>
              <Text>Lakdikapool Hyderabad, 500004 </Text>
              <Text>+91 9440700906</Text>
              <Text>+91 40 27852246</Text>
              <Text>Womensafety-ts@tspolice.gov.in</Text>
              <Text>womensafety.ts@gmail.com</Text>
              <Text>tswomensafety@sp.gmail.com</Text>
              </Flex>
            </Flex>
          </HStack>
        </Flex>
      </Stack>
    </>
  );
};
export default Emergency;
