import { useState, useEffect } from 'react';
import axios from 'axios';

function usePosts(query, pageNum) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPosts([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const CancelToken = axios.CancelToken;
    let cancel;

    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${pageNum}`,
        {
          cancelToken: new CancelToken(c => {
            cancel = c;
          }),
        }
      )
      .then(res => {
        setPosts(prevPosts => {
          return [...new Set([...prevPosts, ...res.data])];
        });
        setLoading(false);
        setHasMore(res.data.length > 0);
      })
      .catch(err => {
        if (!axios.isCancel(err)) {
          setError(true);
        }
      });

    return () => cancel();
  }, [pageNum]);

  return { posts, loading, error, hasMore };
}

export default usePosts;
