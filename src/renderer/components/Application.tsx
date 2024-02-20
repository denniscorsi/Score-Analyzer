import React from 'react';
import { Typography, Button, Box, Slider } from '@mui/material';

import CustomSlider from './CustomSlider';

const Application = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div id="left" style={{ padding: '10px 20px' }}>
        <Typography variant="h3">Score Analyzer</Typography>
        <Button variant="contained">Load File</Button>
      </div>
      <div id="right" style={{ flexGrow: 1, padding: '10px 30px' }}>
        <CustomSlider />
      </div>
    </div>
  );
};

export default Application;
