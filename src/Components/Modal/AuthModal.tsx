import { authModalState } from "@/atoms/authModalAtom";
import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Flex,
  Stack,
} from "@chakra-ui/react";

import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { usersListState } from "@/atoms/userListAtom";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const router = useRouter();

  const [modalState, setModalState] = useRecoilState(authModalState);

  const initialRef = React.useRef(null);

  const [error, setError] = useState("");

  const setUserListState = useSetRecoilState(usersListState);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cookies = new Cookies();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/Files/Admin-login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          admin_id: loginForm.email,
          password: loginForm.password,
        }),
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      setUserListState(data.user_id);

      cookies.set("x-auth-token", data.token, {
        path: "/Files",
      });
      console.log(data.token);

      handleOnClose();
      router.push("/")
      window.location.reload();
    } else {
      setError("Error: " + data);
    }
  };

  const handleOnClose = () => {
    setModalState({ open: false });
  };

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
            <form onSubmit={onSubmit}>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                ref={initialRef}
                placeholder="Email"
                onChange={onChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                onChange={onChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Flex align={"center"} justify={"space-around"}>
              <Text fontSize={12} mr={1}>
                New Here?{" "}
              </Text>
              <Text
                mr={20}
                decoration={"underline"}
                cursor={"pointer"}
                onClick={() => {
                  handleOnClose();
                  router.push("/Files/Signup");
                }}
                color="brand.700"
                fontWeight={600}
                fontSize={14}
              >
                SignUp
              </Text>
              <Flex>
                <Button type="submit" colorScheme="teal" mr={3}>
                  Submit
                </Button>
                <Button onClick={handleOnClose}>Cancel</Button>
              </Flex>
            </Flex>
          </ModalFooter>
              </form>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
