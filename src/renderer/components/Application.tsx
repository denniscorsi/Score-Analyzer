import React, { useState, useReducer } from "react";
import { Typography, Button, TextField, Box, LinearProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import CustomSlider from "./CustomSlider";
import CustomCheckbox from "./CustomCheckbox";
import { Parameters } from "../../../types";
import reducer from "../reducer";
import Settings from "./Settings";
import CustomToggle from "./CustomToggle";

const defaultParameters: Parameters = {
  years: [2020, 2026],
  baseline: [0, 1600],
  sectionBaseline: [0, 800],
  minTutoringHours: 0,
  minTests: 1,
  minBestScore: 0,
  excludeWithoutBaseline: false,
  excludeIncomplete: false,
  name: null,
  remove: true
};

const Application = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [hasName, setHasName] = useState(false);
  const [fileName, setFileName] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultParameters);
  const [reportReady, setReportReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [minYear, setMinYear] = useState(2020);
  const [maxYear, setMaxYear] = useState(2026);

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
      id="outer-container"
      style={{
        display: "flex",
        height: "97vh",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        id="border"
        style={{
          display: "flex",
          border: "15px solid #00843A",
          width: "97%",
          height: "85%",
          padding: "20px 10px"
        }}
      >
        <div
          id="left"
          style={{
            padding: "10px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div>
            <Typography variant="h3">Score Analyzer</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={loadFile}
              style={{
                margin: "15px 0px"
              }}
            >
              Load File
            </Button>
            <Typography>{fileName}</Typography>
          </div>
          <Box marginBottom={10}>
            <Button
              id="runButton"
              variant="contained"
              color="secondary"
              style={{ display: "block", margin: "20px 0px" }}
              disabled={!hasName}
              onClick={sendParameters}
            >
              Run analysis
            </Button>
            {loading && (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            )}
            <Button
              id="openReportButton"
              variant="contained"
              style={{ display: "block" }}
              disabled={!reportReady}
              onClick={window.api.openReport}
            >
              Open Report
            </Button>
            <Button
              sx={{ marginTop: "20px" }}
              id="openStudentButton"
              variant="contained"
              style={{ display: "block" }}
              disabled={!reportReady}
              onClick={window.api.openStudents}
            >
              Open Student Slice
            </Button>
          </Box>
        </div>
        <div id="right" style={{ flexGrow: 1, padding: "20px 50px" }}>
          <CustomSlider
            title={"Grad Years"}
            startingValues={[minYear, maxYear]}
            min={minYear}
            max={maxYear}
            step={1}
            allowRange={true}
            isEnabled={isEnabled}
            dispatch={dispatch}
            action="set_years"
          />
          <CustomSlider
            title={"Baseline"}
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
            title={"Section Baseline"}
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
            title={"Minimum Best Score"}
            startingValues={[0]}
            min={0}
            max={1600}
            step={10}
            allowRange={false}
            isEnabled={isEnabled}
            dispatch={dispatch}
            action="set_min_best_score"
          />
          <CustomSlider
            title={"Minimum Tutoring Hours"}
            startingValues={[0]}
            min={0}
            max={200}
            step={5}
            allowRange={false}
            isEnabled={isEnabled}
            dispatch={dispatch}
            action="set_min_tutoring_hours"
          />
          <CustomSlider
            title={"Minimum Tests After Baseline"}
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
            label={"Exclude students without a baseline"}
            isEnabled={isEnabled}
            dispatch={dispatch}
            action="set_exclude_without_baseline"
          />
          <CustomCheckbox
            label={"Exclude students marked incomplete"}
            isEnabled={isEnabled}
            dispatch={dispatch}
            action="set_exclude_incomplete"
          />
          <CustomToggle isEnabled={isEnabled} dispatch={dispatch} />

          <TextField
            disabled={!isEnabled}
            variant="outlined"
            label="Name of analysis"
            sx={{
              width: "400px",
              marginRight: "20px",
              marginTop: "15px"
            }}
            onChange={(event) => {
              dispatch({ type: "set_name", payload: event.target.value });
              if (event.target.value) setHasName(true);
              else setHasName(false);
            }}
          />
        </div>
        <div
          id="logo"
          style={{
            position: "absolute",
            bottom: "60px",
            right: "35px"
          }}
        >
          {/* <img
            src="src/renderer/assetts/pinnacle-prep-logo.gif"
            style={{
              width: '150px',
            }}
          /> */}
          <Button onClick={() => setOpen(true)}>Settings</Button>
        </div>
      </div>
      <Settings
        open={open}
        setOpen={setOpen}
        setMinYear={setMinYear}
        setMaxYear={setMaxYear}
        minYear={minYear}
        maxYear={maxYear}
      />
    </div>
  );
};

export default Application;
