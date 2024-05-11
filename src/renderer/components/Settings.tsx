import * as React from "react";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  FormControl,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface SettingsProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  setMinYear: (val: number) => void;
  setMaxYear: (val: number) => void;
  minYear: number;
  maxYear: number;
}

const Settings: React.FC<SettingsProps> = ({
  open,
  setOpen,
  setMinYear,
  setMaxYear,
  minYear,
  maxYear
}) => {
  const [cleared, setCleared] = useState<String>("(click to clear)");

  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const years: number[] = [];
    for (let i = 2000; i <= 2050; i++) {
      years.push(i);
    }
    console.log({ years });
    setYears(years);
  }, []);

  const clearReport = () => {
    setCleared("cleared!");
    window.api.clearReport();
  };

  const handleClose = () => {
    setOpen(false);
    setCleared("(click to clear)");
  };

  const handleMinYearChange = (event: SelectChangeEvent) => {
    setMinYear(event.target.value as unknown as number);
  };

  const handleMaxYearChange = (event: SelectChangeEvent) => {
    setMaxYear(event.target.value as unknown as number);
  };

  return (
    <React.Fragment>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Settings
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItemButton onClick={clearReport}>
            <ListItemText primary="Clear Report Data" secondary={cleared} />
          </ListItemButton>
          <Divider />
          <ListItem style={{ padding: "30px 10px" }}>
            <FormControl style={{ width: "200px", padding: "0px 50px 0px 0px" }}>
              <InputLabel id="demo-simple-select-label">Minimum Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={minYear as unknown as string}
                label="Minimum Year"
                onChange={handleMinYearChange}
              >
                {years.map((year) => (
                  <MenuItem value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl style={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">Maximum Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={maxYear as unknown as string}
                label="Maximum Year"
                onChange={handleMaxYearChange}
              >
                {years
                  .filter((year) => year > minYear)
                  .map((year) => (
                    <MenuItem value={year}>{year}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </ListItem>
          <Divider />
        </List>
      </Dialog>
    </React.Fragment>
  );
};

export default Settings;
