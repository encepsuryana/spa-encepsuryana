import { Text, Flex, Box, Heading, Spacer, HStack } from '@chakra-ui/react';
import React from 'react';

//Import react-icons
import { BiDotsVertical } from 'react-icons/bi';
import { AiFillHeart, AiOutlineMenu } from 'react-icons/ai';

import styles from '../style/styles.module.css';

function Header() {
  return (
    <Flex className={styles.header}>
      <Box>
        <Heading as="h1" size="lg">
          <HStack spacing="12px">
            <AiOutlineMenu
              style={{
                opacity: '0.5',
              }}
            />
            <Text fontSize="md" fontWeight="600">
              Homepage
            </Text>
          </HStack>
        </Heading>
      </Box>
      <Spacer />
      <Box>
        <Heading as="h3" size="lg">
          <HStack spacing="2px">
            <AiFillHeart />
            <BiDotsVertical />
          </HStack>
        </Heading>
      </Box>
    </Flex>
  );
}

export default Header;
