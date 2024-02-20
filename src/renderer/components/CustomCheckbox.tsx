import React, { useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

interface CustomCheckboxComponent {
  label: string;
  isEnabled: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxComponent> = ({
  label,
  isEnabled,
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
