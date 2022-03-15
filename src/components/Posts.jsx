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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';

//import Hooks
import usePosts from '../Hook/usePosts';
import { ToggleIcons } from './iconFav/ToggleIcons';

export default function Posts() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  //get data title and body by id
  const getPost = id => {
    onOpen();
    const post = posts.find(post => post.id === id);
    return post;
  };

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
          // background color striped odd and even
          backgroundColor={post.id % 2 === 0 ? '#eee' : '#fff'}
          mb="4"
          onClick={getPost}
          style={{ cursor: 'pointer' }}
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
            <ToggleIcons post={post} />
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
