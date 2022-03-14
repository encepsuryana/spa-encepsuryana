import React, { useCallback, useRef, useState } from 'react';

import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Spacer,
  VStack,
  Text,
} from '@chakra-ui/react';

//import Hooks
import usePosts from '../Hook/usePosts';

export default function Posts() {
  const [query, setQuery] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const { posts, loading, error, hasMore } = usePosts(query, pageNum);

  const observer = useRef();
  const lastPostRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum(prevPageNum => prevPageNum + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  //function add to favorite list in localStorage whitout refresh page
  const addToFavorite = post => {
    //get condition if favorite list is empty
    const isEmpty = localStorage.getItem('favorite') === null;
    //get favorite list from localStorage
    const favorite = isEmpty
      ? []
      : JSON.parse(localStorage.getItem('favorite'));
    //check if post is already in favorite list
    const isExist = favorite.some(item => item.id === post.id);
    //if post is not in favorite list, add it
    if (!isExist) {
      favorite.push(post);
      localStorage.setItem('favorite', JSON.stringify(favorite));
    }
  };

  //function remove from favorite list in localStorage
  const removeFromFavorite = post => {
    //get condition if favorite list is empty
    const isEmpty = localStorage.getItem('favorite') === null;
    //get favorite list from localStorage
    const favorite = isEmpty
      ? []
      : JSON.parse(localStorage.getItem('favorite'));
    //check if post is already in favorite list
    const isExist = favorite.some(item => item.id === post.id);
    //if post is in favorite list, remove it
    if (isExist) {
      const newFavorite = favorite.filter(item => item.id !== post.id);
      localStorage.setItem('favorite', JSON.stringify(newFavorite));
    }
  };

  // Render button favorite

  return (
    <Container p={2}>
      {/* Render Data */}
      {posts.map(post => (
        <VStack
          key={post.id}
          ref={lastPostRef}
          p="4"
          borderWidth="1px"
          borderColor="gray.200"
          mb="4"
        >
          <HStack>
            <Box>
              <Heading as="h3" size="18px">
                {post.title}
              </Heading>
              <Text size="12px">{post.body}</Text>
            </Box>

            <Spacer />

            {/* Like Button */}
            <Flex justify="flex-end">
              <Box>{/* render icon heart */}</Box>
            </Flex>
          </HStack>
        </VStack>
      ))}

      {/* Render Loading */}
      {loading && <Text>Loading...</Text>}

      {/* Render Error */}
      {error && <Text>Error...</Text>}
    </Container>
  );
}
