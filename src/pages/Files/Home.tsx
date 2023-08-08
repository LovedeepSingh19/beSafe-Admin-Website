import { Flex, HStack, Stack, Text } from '@chakra-ui/react';
import React from 'react';

type HomePageProps = {
    
};

const HomePage:React.FC<HomePageProps> = () => {
    
    return (
        <Flex>
        <Text mt={16} fontWeight={700} fontSize={40}>
          Home Page
        </Text>
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
          <Flex p={20}>
        <Text>ABOUT WOMEN SAFETY WING </Text> The Women Safety Wing is a department of the
      Telangana State Police working to ensure the safety, dignity and
      empowerment of women in the state. The Wing has been designed to handle
      the investigation into crimes against women that specifically include
      prevention of trafficking, sexual offences, domestic violence, juvenile
      delinquency, NRI issues & cyber crimes Providing a safe environment to
      women & children while coming up with issue-specific solutions is a task
      that TSWSW addresses with all its earnestness. The Women Safety Wing (WSW)
      was carved out from the Women Protection Cell, CID. It is a fully equipped
      and functional department working at independent premises. The WSW has its
      own cadre strength and a very specific mandate.
    </Flex>
        </Flex>
      </Stack>
    </>
      </Flex>
    )
}
export default HomePage;