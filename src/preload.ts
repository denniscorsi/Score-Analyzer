import { ipcRenderer, contextBridge } from 'electron';

const api = {
  loadFile: async () => {
    const fileName = await ipcRenderer.invoke('load-file');
    return fileName;
  },
  runAnalysis: () => {},
};

contextBridge.exposeInMainWorld('api', api);
