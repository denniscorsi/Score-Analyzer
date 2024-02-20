import { ipcRenderer, contextBridge } from 'electron';
import { Parameters } from '../types';

const api = {
  loadFile: async () => {
    const fileName = await ipcRenderer.invoke('load-file');
    return fileName;
  },
  runAnalysis: (parameters: Parameters) => {
    ipcRenderer.send('run-analysis', parameters);
  },
};

contextBridge.exposeInMainWorld('api', api);
