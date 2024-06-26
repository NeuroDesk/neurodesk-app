import { IRecentRemoteURL } from '../config/appdata';
import { EventTypeMain, EventTypeRenderer } from '../eventtypes';
const { contextBridge, ipcRenderer } = require('electron');

type RecentRemoteURLsUpdatedListener = (
  recentServers: IRecentRemoteURL[]
) => void;
type RunningServerListSetListener = (runningServers: string[]) => void;
type RunningStorageServerListSetListener = (runningServers: string[]) => void;

let onRecentRemoteURLsUpdatedListener: RecentRemoteURLsUpdatedListener;
let onRunningServerListSetListener: RunningServerListSetListener;
let onRunningStorageServerListSetListener: RunningStorageServerListSetListener;

contextBridge.exposeInMainWorld('electronAPI', {
  getAppConfig: () => {
    return {
      platform: process.platform
    };
  },
  isDarkTheme: () => {
    return ipcRenderer.invoke(EventTypeMain.IsDarkTheme);
  },
  setRemoteServerOptions: (url: string, persistSessionData: boolean) => {
    ipcRenderer.send(
      EventTypeMain.SetRemoteServerOptions,
      url,
      persistSessionData
    );
  },
  deleteRecentRemoteURL: (url: string) => {
    ipcRenderer.send(EventTypeMain.DeleteRecentRemoteURL, url);
  },
  onRecentRemoteURLsUpdated: (callback: RecentRemoteURLsUpdatedListener) => {
    onRecentRemoteURLsUpdatedListener = callback;
  },
  onRunningServerListSet: (callback: RunningServerListSetListener) => {
    onRunningServerListSetListener = callback;
  },
  onRunningStorageServerListSet: (
    callback: RunningStorageServerListSetListener
  ) => {
    onRunningStorageServerListSetListener = callback;
  }
});

ipcRenderer.on(
  EventTypeRenderer.UpdateRecentRemoteURLs,
  (event, recentServers: IRecentRemoteURL[]) => {
    if (onRecentRemoteURLsUpdatedListener) {
      onRecentRemoteURLsUpdatedListener(recentServers);
    }
  }
);

ipcRenderer.on(
  EventTypeRenderer.SetRunningServerList,
  (event, runningServers: string[]) => {
    if (onRunningServerListSetListener) {
      onRunningServerListSetListener(runningServers);
    }
  }
);

ipcRenderer.on(
  EventTypeRenderer.SetRunningStorageServerList,
  (event, runningServers: string[]) => {
    if (onRunningStorageServerListSetListener) {
      onRunningStorageServerListSetListener(runningServers);
    }
  }
);

export {};
