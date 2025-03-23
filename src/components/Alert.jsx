import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

const CustomAlert = ({ type = 'success', message = 'This is an alert message!' }) => {
  return (
    <Alert severity={type}>
      <AlertTitle>{type.charAt(0).toUpperCase() + type.slice(1)}</AlertTitle>
      {message}
    </Alert>
  );
};

export default CustomAlert;
