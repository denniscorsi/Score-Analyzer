import React, { useState } from 'react';
import { Typography, Box, Slider } from '@mui/material';
import { Parameters } from '../../../types';

interface SliderComponent {
  startingValues: number[];
  min: number;
  max: number;
  step: number;
  title: string;
  allowRange: boolean;
  isEnabled: boolean;
  state: Parameters;
  dispatch: any;
  action: string;
}

const CustomSlider: React.FC<SliderComponent> = ({
  startingValues,
  min,
  max,
  step,
  title,
  allowRange,
  isEnabled,
  state,
  dispatch,
  action,
}) => {
  let range: number[] = [];
  if (allowRange) range = [startingValues[0], startingValues[1]];
  else range = [startingValues[0]];

  const [value, setValue] = useState<number[]>(range);

  const handleChange = (_: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') setValue([newValue]);
    else setValue(newValue);
    dispatch({ type: action, payload: newValue });
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
        disabled={!isEnabled}
      />
    </Box>
  );
};

export default CustomSlider;
