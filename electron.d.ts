/// <reference types="vite/client">
/// <reference types="electron">

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

declare interface Window {
  api: {
    loadFile: () => string | null;
    runAnalysis: (parameters: Parameters) => void;
  };
}

