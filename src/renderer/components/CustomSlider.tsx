import React, { useState } from 'react';
import { Typography, Box, Slider } from '@mui/material';

interface SliderComponent {
  startingValues: number[];
  min: number;
  max: number;
  step: number;
  title: string;
  allowRange: boolean;
}

const CustomSlider: React.FC<SliderComponent> = ({
  startingValues,
  min,
  max,
  step,
  title,
  allowRange,
}) => {
  let range: number[] = [];
  if (allowRange) range = [startingValues[0], startingValues[1]];
  else range = [startingValues[0]];

  const [value, setValue] = useState<number[]>(range);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const marks = [
    {
      value: min,
      label: min,
    },
    {
      value: max,
      label: max,
    },
  ];

  return (
    <Box>
      <Typography>{title}</Typography>
      <Slider
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        marks={marks}
        valueLabelDisplay="on"
      />
    </Box>
  );
};

export default CustomSlider;
