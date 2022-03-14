import React, { useCallback, useRef, useState } from 'react';

//import icons
import { AiOutlineHeart } from 'react-icons/ai';
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
              <Box>
                <AiOutlineHeart
                  style={{
                    color: '#ff0000',
                    fontSize: '20px',
                    cursor: 'pointer',
                  }}
                />
              </Box>
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
