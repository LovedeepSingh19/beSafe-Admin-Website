// pages/profile.js
import { adminUserState } from '@/atoms/adminAtom';
import { Box, Text, Flex, Avatar, Button, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';

const UserProfile = () => {
  const router = useRouter();
  const admins = useRecoilValue(adminUserState);
  
  console.log(admins);
  const admin = admins as unknown as string

  return (
    <Flex direction={'column'} pt={100} align={'center'} justify={'center'}>
    <Box alignContent={'center'} justifyContent={'center'} border={"1px solid red"} p={5} >
      <Flex direction={"column"} alignItems="center" mb={4}>
        <Avatar size="lg" src={""} mr={4} />
        <Box pt={4}>
            <Stack align={'center'} justify={'center'} direction={'row'}>
          <Text fontSize="lg">Name: </Text>
          <Text fontSize="xl">{admin.split('@')[0]}</Text>

            </Stack>
            <Stack align={'center'} justify={'center'} direction={"row"}>
          <Text fontSize="lg">id: </Text>
          <Text fontSize='xl'>{admin}</Text>

            </Stack>
        </Box>
      </Flex>
    </Box>
      <Text pt={10} fontWeight={700} fontSize={20} color={'red.500'}>The Page is under Development</Text>
    </Flex>
  );
};

export default UserProfile;
