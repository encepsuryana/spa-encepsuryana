//function login with userId and email jsonplaceholder

import { useDisclosure } from '@chakra-ui/react';

export const login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
export const logout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  localStorage.removeItem('userId');
  localStorage.removeItem('email');
  alert('Logout Success');

  //close modal
  onClose();
};
