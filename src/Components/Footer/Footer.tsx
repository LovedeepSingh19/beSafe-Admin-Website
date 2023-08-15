import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import React from "react";

const Footer: React.FC = () => {
  const { colorMode } = useColorMode();
  const isDesktop = useBreakpointValue({ base: false, md: true });


  return (
    <Container pl={isDesktop? "100pt": "80pt"} mt="5" maxW="100%" zIndex={2}>
      <Divider />
      <Stack
        spacing="8"
        direction={{ base: "column", md: "row" }}
        justify="center"
        align={"center"}
        py={{ base: "12", md: "16" }}
      >
        <Stack
          direction={{ base: "column-reverse", md: "column", lg: "row" }}
          spacing={{ base: "12", md: "8" }}
        >
          <Stack direction="row" spacing="12">
            <Image
              src="/301px-Emblem_of_India.png"
              height="150px"
              filter="auto"
              invert={colorMode === "light" ? 0 : 1}
            />
            <Stack spacing="4" minW="36" flex="1">
              <Text fontSize="md" fontWeight="semibold" color="subtle">
                Police Women Safety Wing
              </Text>
              <Stack spacing="3" shouldWrapChildren p="0px 8px 0px 8px">
                <Stack direction="row" spacing={4} align="center">
                  <Icon fontSize={20} as={MdLocationOn} />
                  <Text
                    flexWrap="wrap"
                    fontWeight={"normal"}
                    fontSize={14}
                    variant="link"
                  >
                    Plot-21, Jasola Institutional Area, New Delhi - 110025
                  </Text>
                </Stack>
                <Stack direction="row" spacing={4} align="center">
                  <Icon as={BsFillTelephoneFill} />
                  <Text
                    flexWrap="wrap"
                    fontWeight={"normal"}
                    fontSize={14}
                    variant="link"
                  >
                    011 - 26942369, 26944740, 26944754, 26944805
                  </Text>
                </Stack>
                <Stack direction="row" spacing={4} align="center">
                  <Icon as={FaWhatsapp} />
                  <Text fontWeight={"normal"} fontSize={14} variant="link">
                    9416267893
                  </Text>
                </Stack>
              </Stack>
            </Stack>
            <Stack spacing="4" minW="36" flex="1">
              <Text fontSize="md" fontWeight="semibold" color="subtle">
                Get Help
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                <Text fontSize={'sm'} cursor="pointer" _hover={{textDecoration: "underline"}} flexWrap={'wrap'}>Get Help by Issue</Text>
                <Text fontSize={'sm'} cursor="pointer" _hover={{textDecoration: "underline"}} flexWrap={'wrap'}>Get Help by Location</Text>
                <Text fontSize={'sm'} cursor="pointer" _hover={{textDecoration: "underline"}} flexWrap={'wrap'}>Contact Us</Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Divider />
      <Stack
        pt="8"
        pb="12"
        justify="space-between"
        direction={{ base: "column-reverse", md: "row" }}
        align="center"
      >
        <Text fontSize="sm" color="subtle">
          All rights reserved &copy; 2021 - {new Date().getFullYear()} | Central
          Police – Women Safety Wing.
        </Text>
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="#"
            aria-label="Youtube"
            icon={<FaYoutube fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="Instagram"
            icon={<FaInstagram fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="Facebook"
            icon={<FaFacebook fontSize="1.25rem" />}
          />
        </ButtonGroup>
      </Stack>
    </Container>
  );
};

export default Footer;
