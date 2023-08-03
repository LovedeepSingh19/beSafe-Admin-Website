import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
  const router = useRouter();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    name: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");


  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (signupForm.confirm_password === signupForm.password) {
      event.preventDefault();
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Files/Admin-signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          admin_id: signupForm.email,
          password: signupForm.password,
          name: signupForm.name,
        }),
      });
      const data = await response.json();
      console.log(data.user_id);
      if (response.status === 200) {

        router.push("/Files/Home");
        
      } else {
        setError("Error: " + data);
      }
    } else {
      console.log("");
      setError("Error: Passwords don't match");
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Admin SignUp
        </Heading>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            name="name"
            placeholder="UserName"
            _placeholder={{ color: "gray.500" }}
            onChange={onChange}
            type="text"
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            name="email"
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            onChange={onChange}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            placeholder="password"
            _placeholder={{ color: "gray.500" }}
            type="password"
            onChange={onChange}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            name="confirm_password"
            placeholder="Confirm password"
            _placeholder={{ color: "gray.500" }}
            type="password"
            onChange={onChange}
          />
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            colorScheme="red"
            onClick={() => {
              router.back();
            }}
            w="full"
          >
            Cancel
          </Button>
          <Button colorScheme="teal" w="full" onClick={onSubmit}>
            Submit
          </Button>
        </Stack>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
      </Stack>
    </Flex>
  );
};
export default Signup;
