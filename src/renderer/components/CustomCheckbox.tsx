import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

interface CustomCheckboxComponent {
  label: string;
  isEnabled: boolean;
  dispatch: any;
  action: string;
}

const CustomCheckbox: React.FC<CustomCheckboxComponent> = ({
  label,
  isEnabled,
  dispatch,
  action,
}) => {
  const handleChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    dispatch({ type: action, checked });
  };

  return (
    <FormControlLabel
      control={<Checkbox onChange={handleChange} />}
      label={label}
      style={{ display: 'block' }}
      disabled={!isEnabled}
    />
  );
};

export default CustomCheckbox;
