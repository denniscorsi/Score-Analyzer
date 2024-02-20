import React, { useState, useReducer } from 'react';
import { Typography, Button, TextField, FormControlLabel } from '@mui/material';

import CustomSlider from './CustomSlider';
import CustomCheckbox from './CustomCheckbox';
import { Parameters } from '../../../types';
import reducer from '../reducer';

const defaultParameters: Parameters = {
  years: [2022, 2024],
  baseline: [1200, 1500],
  sectionBaseline: [500, 700],
  minTutoringHours: 20,
  minTests: 1,
  excludeWithoutBaseline: true,
  excludeIncomplete: true,
};

const Application = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [fileName, setFileName] = useState('');
  // const [parameters, setParameters] = useState<Parameters>(defaultParameters);
  const [state, dispatch] = useReducer(reducer, defaultParameters);

  const loadFile = async () => {
    const loadedFileName = await window.api.loadFile();
    if (loadedFileName) {
      setFileName(loadedFileName);
      setIsEnabled(true);
    }
  };

  const sendParameters = () => {
    window.api.runAnalysis(state);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div id="left" style={{ padding: '10px 20px' }}>
        <Typography variant="h3">Score Analyzer</Typography>
        <Button variant="contained" onClick={loadFile}>
          Load File
        </Button>
        <Typography>{fileName}</Typography>
      </div>
      <div id="right" style={{ flexGrow: 1, padding: '10px 30px' }}>
        <CustomSlider
          title={'Grad Years'}
          startingValues={[2022, 2023]}
          min={2020}
          max={2025}
          step={1}
          allowRange={true}
          isEnabled={isEnabled}
          state={state}
          dispatch={dispatch}
          action="set_years"
        />
        <CustomSlider
          title={'Baseline'}
          startingValues={[0, 1600]}
          min={0}
          max={1600}
          step={10}
          allowRange={true}
          isEnabled={isEnabled}
          state={state}
          dispatch={dispatch}
          action="baseline"
        />
        <CustomSlider
          title={'Section Baseline'}
          startingValues={[0, 800]}
          min={0}
          max={800}
          step={10}
          allowRange={true}
          isEnabled={isEnabled}
          state={state}
          dispatch={dispatch}
          action="sectionBaseline"
        />
        <CustomSlider
          title={'Minimum Tutoring Hours'}
          startingValues={[0]}
          min={0}
          max={300}
          step={5}
          allowRange={false}
          isEnabled={isEnabled}
          state={state}
          dispatch={dispatch}
          action="minTutoringHours"
        />
        <CustomSlider
          title={'Minimum Tests After Baseline'}
          startingValues={[1]}
          min={1}
          max={6}
          step={1}
          allowRange={false}
          isEnabled={isEnabled}
          state={state}
          dispatch={dispatch}
          action="minTests"
        />
        <CustomCheckbox
          label={'Exclude students without a baseline'}
          isEnabled={isEnabled}
          state={state}
          dispatch={dispatch}
          action="excludeWithoutBaseline"
        />
        <CustomCheckbox
          label={'Exclude students marked incomplete'}
          isEnabled={isEnabled}
          state={state}
          dispatch={dispatch}
          action="excludeIncomplete"
        />
        <FormControlLabel
          control={<TextField variant="outlined" />}
          label={'Name of analysis'}
          style={{ display: 'block' }}
          disabled={!isEnabled}
        />
        <Button
          variant="contained"
          style={{ display: 'block' }}
          disabled={!isEnabled}
          onClick={sendParameters}
        >
          Run analysis
        </Button>
      </div>
    </div>
  );
};

export default Application;
