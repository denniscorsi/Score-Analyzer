import React, { useState, useReducer } from 'react';
import {
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Box,
  LinearProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

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
  excludeWithoutBaseline: false,
  excludeIncomplete: false,
  name: null,
};

const Application = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [fileName, setFileName] = useState('');
  const [state, dispatch] = useReducer(reducer, defaultParameters);
  const [reportReady, setReportReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useTheme();

  console.log({ state });

  const loadFile = async () => {
    const loadedFileName = await window.api.loadFile();
    if (loadedFileName) {
      setFileName(loadedFileName);
      setIsEnabled(true);
    }
  };

  const sendParameters = () => {
    setLoading(true);
    window.api.runAnalysis(state);
    setTimeout(() => {
      setReportReady(true);
      setLoading(false);
    }, 4000);
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '97vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          border: '15px solid #00843A',
          width: '97%',
          height: '85%',
          padding: '20px 10px',
        }}
      >
        <div
          id="left"
          style={{
            padding: '10px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Typography variant="h3">Score Analyzer</Typography>
            <Button variant="contained" color="secondary" onClick={loadFile}>
              Load File
            </Button>
            <Typography>{fileName}</Typography>
          </div>
          <div>
            <Button
              id="runButton"
              variant="contained"
              color="secondary"
              style={{ display: 'block' }}
              disabled={!isEnabled}
              onClick={sendParameters}
            >
              Run analysis
            </Button>
            {loading && (
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
            )}
            <Button
              id="openReportButton"
              variant="contained"
              style={{ display: 'block' }}
              disabled={!reportReady}
              onClick={window.api.openReport}
            >
              Open Report
            </Button>
          </div>
        </div>
        <div id="right" style={{ flexGrow: 1, padding: '20px 50px' }}>
          <CustomSlider
            title={'Grad Years'}
            startingValues={[2022, 2023]}
            min={2020}
            max={2025}
            step={1}
            allowRange={true}
            isEnabled={isEnabled}
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
            dispatch={dispatch}
            action="set_baseline"
          />
          <CustomSlider
            title={'Section Baseline'}
            startingValues={[0, 800]}
            min={0}
            max={800}
            step={10}
            allowRange={true}
            isEnabled={isEnabled}
            dispatch={dispatch}
            action="set_section_baseline"
          />
          <CustomSlider
            title={'Minimum Tutoring Hours'}
            startingValues={[0]}
            min={0}
            max={300}
            step={5}
            allowRange={false}
            isEnabled={isEnabled}
            dispatch={dispatch}
            action="set_min_tutoring_hours"
          />
          <CustomSlider
            title={'Minimum Tests After Baseline'}
            startingValues={[1]}
            min={1}
            max={6}
            step={1}
            allowRange={false}
            isEnabled={isEnabled}
            dispatch={dispatch}
            action="set_min_tests"
          />
          <CustomCheckbox
            label={'Exclude students without a baseline'}
            isEnabled={isEnabled}
            dispatch={dispatch}
            action="set_exclude_without_baseline"
          />
          <CustomCheckbox
            label={'Exclude students marked incomplete'}
            isEnabled={isEnabled}
            dispatch={dispatch}
            action="set_exclude_incomplete"
          />
          <FormControlLabel
            control={
              <TextField
                variant="outlined"
                onChange={(event) =>
                  dispatch({ type: 'set_name', payload: event.target.value })
                }
              />
            }
            label={'Name of analysis'}
            style={{ display: 'block' }}
            disabled={!isEnabled}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '35px',
          }}
        >
          <img
            src="icons/pinnacle-prep-logo.gif"
            style={{
              width: '150px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Application;
