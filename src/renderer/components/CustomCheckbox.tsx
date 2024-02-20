import React, { useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

interface CustomCheckboxComponent {
  label: string;
  isEnabled: boolean;
  parameters: any;
  setParameters: any;
  parameterKey: string;
}

const CustomCheckbox: React.FC<CustomCheckboxComponent> = ({
  label,
  isEnabled,
  parameters,
  setParameters,
  parameterKey
}) => {
  return (
    <FormControlLabel
      control={<Checkbox />}
      label={label}
      style={{ display: 'block' }}
      disabled={!isEnabled}
    />
  );
};

export default CustomCheckbox;
