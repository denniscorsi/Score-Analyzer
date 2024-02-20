import React, { useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { Parameters } from '../../../types';

interface CustomCheckboxComponent {
  label: string;
  isEnabled: boolean;
  state: Parameters;
  dispatch: any;
  action: string;
}

const CustomCheckbox: React.FC<CustomCheckboxComponent> = ({
  label,
  isEnabled,
  state,
  dispatch,
  action,
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
