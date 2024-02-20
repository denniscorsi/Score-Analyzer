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
        <CustomSlider
          title={'Grad Years'}
          startingValues={[2022, 2023]}
          min={2020}
          max={2025}
          step={1}
          allowRange={true}
        />
        <CustomSlider
          title={'Baseline'}
          startingValues={[0, 1600]}
          min={0}
          max={1600}
          step={10}
          allowRange={true}
        />
        <CustomSlider
          title={'Section Baseline'}
          startingValues={[0, 800]}
          min={0}
          max={800}
          step={10}
          allowRange={true}
        />
        <CustomSlider
          title={'Minimum Tutoring Hours'}
          startingValues={[0]}
          min={0}
          max={300}
          step={5}
          allowRange={false}
        />
        <CustomSlider
          title={'Minimum Tests After Baseline'}
          startingValues={[1]}
          min={1}
          max={6}
          step={1}
          allowRange={false}
        />
      </div>
    </div>
  );
};

export default Application;
