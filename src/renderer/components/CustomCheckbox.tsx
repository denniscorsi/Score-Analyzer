import React, { useState } from 'react';
import { Typography, Box, Checkbox, FormControlLabel } from '@mui/material';

const CustomCheckbox = ({ label }) => {
  return (
    <FormControlLabel
      control={<Checkbox />}
      label={label}
      style={{ display: 'block' }}
    />
  );
};

export default CustomCheckbox;
