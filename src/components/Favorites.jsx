import {
  Box,
  Container,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { ToggleIcons } from './iconFav/ToggleIcons';

function Favorites() {
  //Render data from localStorage
  const renderData = () => {
    //get condition if favorite list is empty
    const isEmpty = localStorage.getItem('favorite') === null;
    //get favorite list from localStorage
    const favorite = isEmpty
      ? []
      : JSON.parse(localStorage.getItem('favorite'));
    //check if favorite list is empty
    if (favorite.length === 0) {
      return (
        <VStack
          align="center"
          justify="center"
          w="100%"
          h="100%"
          p={4}
          textAlign="center"
        >
          <Heading as="h1" size="lg">
            No Favorite List
          </Heading>
          <Text>Please add data to favorite list in order to see it here.</Text>
        </VStack>
      );
    }
    //if favorite list is not empty, render data
    return favorite.map(post => {
      return (
        <Box key={post.id}>
          <VStack
            p="4"
            borderWidth="1px"
            borderColor="gray.200"
            mb="4"
            backgroundColor={post.id % 2 === 0 ? '#eee' : '#fff'}
          >
            <HStack>
              <Box>
                <Heading as="h3" size="18px">
                  {post.title}
                </Heading>
                <Text size="12px">{post.body}</Text>
              </Box>

              <Spacer />

              {/* Like Button on click refresh component */}
              <ToggleIcons post={post} />
            </HStack>
          </VStack>
        </Box>
      );
    });
  };

  //refresh component when data has been add or remove from favorite list
  const refresh = () => {
    window.location.reload();
  };

  return (
    <div>
      {/*Render data */}
      <Container>
        <VStack>
          <Heading as="h1" size="lg">
            Favorite List
          </Heading>
          {/*Render data */}
          {renderData()}
        </VStack>
      </Container>
    </div>
  );
}

export default Favorites;
