import React, { useState } from 'react';
import { Typography, Box, Slider } from '@mui/material';

const CustomSlider = ({ startingValues, min, max, step, title }) => {
  const [value, setValue] = useState<number[]>([2022, 2023]);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const marks = [
    {
      value: 2020,
      label: '2020',
    },
    {
      value: 2026,
      label: '2026',
    },
  ];

  return (
    <Box>
      <Typography>Grad Years</Typography>
      <Slider
        value={value}
        onChange={handleChange}
        min={2020}
        max={2026}
        step={1}
        marks={marks}
        valueLabelDisplay="on"
      />
    </Box>
  );
};

export default CustomSlider;
