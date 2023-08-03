import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

type HomePageProps = {
    
};

const HomePage:React.FC<HomePageProps> = () => {
    
    return (
        <Flex>
        <Text mt={16} fontWeight={700} fontSize={40}>
          Home Page
        </Text>
      </Flex>
    )
}
export default HomePage;