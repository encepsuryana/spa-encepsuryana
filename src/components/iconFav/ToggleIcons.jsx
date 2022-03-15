import { Flex, Link, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

export const ToggleIcons = props => {
  const [isFav, setIsFav] = useState(false);
  const SwitchIcon = (AiOutlineHeart, AiFillHeart);

  //function add to favorite list in localStorage
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

  //function set icon to red when data has been added to favorite list
  const setIcon = post => {
    //get condition if favorite list is empty
    const isEmpty = localStorage.getItem('favorite') === null;
    //get favorite list from localStorage
    const favorite = isEmpty
      ? []
      : JSON.parse(localStorage.getItem('favorite'));
    //check if post is already in favorite list
    const isExist = favorite.some(item => item.id === post.id);
    //if post is in favorite list, set icon to red
    if (isExist) {
      setIsFav(true);
    }
  };

  //function set icon to gray when data has been removed from favorite list
  const setGrayIcon = post => {
    //get condition if favorite list is empty
    const isEmpty = localStorage.getItem('favorite') === null;
    //get favorite list from localStorage
    const favorite = isEmpty
      ? []
      : JSON.parse(localStorage.getItem('favorite'));
    //check if post is already in favorite list
    const isExist = favorite.some(item => item.id === post.id);
    //if post is not in favorite list, set icon to gray
    if (!isExist) {
      setIsFav(false);
    }
  };

  //toggle icon when data is added or removed from favorite list
  const toggleIcon = post => {
    if (isFav) {
      removeFromFavorite(post);
      setGrayIcon(post);
    } else {
      addToFavorite(post);
      setIcon(post);
    }
  };

  // on load set icon to red or gray in infite loop
  React.useEffect(() => {
    setIcon(props.post);
  }, []);

  //removeFromFavorite
  React.useEffect(() => {
    setGrayIcon(props.post);
  }, [props.removeFromFavorite]);

  return (
    <Flex>
      <SwitchIcon
        style={{
          cursor: 'pointer',
          color: isFav ? 'red' : 'black',
          fontSize: '1.5rem',
        }}
        onClick={() => {
          setIsFav(!isFav);
          toggleIcon(props.post);
        }}
      />
    </Flex>
  );
};
