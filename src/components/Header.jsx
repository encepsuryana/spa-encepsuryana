import {
  Text,
  Flex,
  Box,
  Heading,
  Spacer,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//Import react-icons
import { BiDotsVertical } from 'react-icons/bi';
import { AiFillHeart, AiOutlineMenu } from 'react-icons/ai';

import styles from '../style/styles.module.css';

//import Login function

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //function login with userId and email jsonplaceholder
  const login = () => {
    const userId = document.getElementById('userId').value;
    const email = document.getElementById('email').value;
    const data = {
      userId,
      email,
    };

    //validate userId and email
    if (userId === '' || email === '') {
      alert('Please fill in all fields');
    }
    //validate login userId and email with jsonplaceholder
    else {
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.userId === userId && data.email === email) {
            alert('Login Success');
            onClose();
            //save to localStorage
            localStorage.setItem('userId', userId);
            localStorage.setItem('email', email);
          } else {
            alert('Login Failed');
          }
        });
    }
  };

  //function logout
  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    alert('Logout Success');

    //close modal
    onClose();
  };

  return (
    <Flex color="white" p={2} className={styles.header}>
      <Box>
        <Heading as="h1" size="lg">
          <HStack spacing="12px">
            <AiOutlineMenu
              style={{
                opacity: '0.5',
                cursor: 'pointer',
              }}
            />
            <Text fontSize="md" fontWeight="600">
              <Link to="/">Homepages</Link>
            </Text>
          </HStack>
        </Heading>
      </Box>
      <Spacer />
      <Box>
        <Heading as="h3" size="lg">
          <HStack spacing="2px">
            {/* Navigate to Favorite page */}
            <Link to="liked-post">
              <AiFillHeart
                style={{
                  cursor: 'pointer',
                }}
              />
            </Link>

            {/* Navigate to Login page */}
            <Link to="/login">
              <BiDotsVertical style={{ cursor: 'pointer' }} onClick={onOpen} />

              {/* Login Modal */}
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>
                    {/* change text when user is logged in */}
                    {localStorage.getItem('userId') ? (
                      <Text>Logout</Text>
                    ) : (
                      <Text>Login</Text>
                    )}
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    {/* Login form with userId and email validation*/}
                    {/* Validate when userId and email in localStorage */}
                    {localStorage.getItem('userId') &&
                    localStorage.getItem('email') ? (
                      <Text>Welcome back, {localStorage.getItem('email')}</Text>
                    ) : (
                      <FormControl isRequired>
                        <FormLabel htmlFor="userId">User Id</FormLabel>
                        <Input id="userId" placeholder="User Id" type="text" />

                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                          id="email"
                          placeholder="Email"
                          type="email"
                          required
                        />
                      </FormControl>
                    )}
                  </ModalBody>

                  <ModalFooter>
                    {/* Validate when userId and email in localStorage */}
                    {localStorage.getItem('userId') &&
                    localStorage.getItem('email') ? (
                      <Button variantColor="green" onClick={logout}>
                        Logout
                      </Button>
                    ) : (
                      <>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                          Cancel
                        </Button>

                        <Button colorScheme="blue" onClick={login}>
                          Login
                        </Button>
                      </>
                    )}
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Link>
          </HStack>
        </Heading>
      </Box>
    </Flex>
  );
}

export default Header;
