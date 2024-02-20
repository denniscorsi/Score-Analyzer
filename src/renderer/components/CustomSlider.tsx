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
  parameters: Parameters;
  setParameters: (parameters: Parameters) => void;
  parameterKey: keyof Parameters;
}

const CustomSlider: React.FC<SliderComponent> = ({
  startingValues,
  min,
  max,
  step,
  title,
  allowRange,
  isEnabled,
  parameters,
  setParameters,
  parameterKey,
}) => {
  let range: number[] = [];
  if (allowRange) range = [startingValues[0], startingValues[1]];
  else range = [startingValues[0]];

  const [value, setValue] = useState<number[]>(range);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    const updatedParameters: Parameters = {
      ...parameters,
      years: [...parameters.years],
      baseline: [...parameters.baseline],
      sectionBaseline: [...parameters.sectionBaseline],
    };
    // console.log(
    //   'Value of:',
    //   parameterKey,
    //   parameters[parameterKey as keyof Parameters]
    // );
    updatedParameters[parameterKey] = [2]; // TODO: Figure out this issue
    setParameters(updatedParameters);
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
