import { ipcRenderer, contextBridge } from 'electron';
import { Parameters } from '../types';

const api = {
  loadFile: async () => {
    const fileName = await ipcRenderer.invoke('load-file');
    return fileName;
  },
  runAnalysis: async (parameters: Parameters) => {
    return ipcRenderer.invoke('run-analysis', parameters);
  },
  openReport: () => {
    ipcRenderer.send('open-report');
  },
  openStudents: () => {
    ipcRenderer.send('open-students');
  },
  clearReport: () => {
    ipcRenderer.send('clear-report');
  },
};

contextBridge.exposeInMainWorld('api', api);
