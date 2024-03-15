import * as React from 'react';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

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
}

const Settings: React.FC<SettingsProps> = ({ open, setOpen }) => {
  const [cleared, setCleared] = useState<String>('(click to clear)');

  const clearReport = () => {
    setCleared('cleared!');
    window.api.clearReport();
  };

  const handleClose = () => {
    setOpen(false);
    setCleared('(click to clear)');
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
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
        </List>
      </Dialog>
    </React.Fragment>
  );
};

export default Settings;
