import { Flex, Text } from "@chakra-ui/react";
import React from "react";

type AboutProps = {};

const About: React.FC<AboutProps> = () => {
  return (
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
  );
};
export default About;
