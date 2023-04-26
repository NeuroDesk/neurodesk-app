// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import * as ejs from 'ejs';
import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
const semver = require('semver');
import { ThemedWindow } from '../dialog/themedwindow';
import {
  CtrlWBehavior,
  // FrontEndMode,
  KeyValueMap,
  LogLevel,
  // serverLaunchArgsDefault,
  // serverLaunchArgsFixed,
  StartupMode,
  ThemeType
} from '../config/settings';
import { getBundledPythonPath } from '../utils';
import { IRegistry } from '../registry';

export class SettingsDialog {
  constructor(options: SettingsDialog.IOptions, registry: IRegistry) {
    this._window = new ThemedWindow({
      isDarkTheme: options.isDarkTheme,
      title: 'Settings',
      width: 700,
      height: 400,
      preload: path.join(__dirname, './preload.js')
    });

    const {
      startupMode,
      theme,
      // syncJupyterLabTheme,
      // showNewsFeed,
      // frontEndMode,
      checkForUpdatesAutomatically,
      defaultWorkingDirectory,
      logLevel,
      serverArgs,
      // overrideDefaultServerArgs,
      serverEnvVars,
      ctrlWBehavior
    } = options;
    const installUpdatesAutomaticallyEnabled = process.platform === 'darwin';
    const installUpdatesAutomatically =
      installUpdatesAutomaticallyEnabled && options.installUpdatesAutomatically;
    // let defaultPythonPath = options.defaultPythonPath;
    const bundledPythonPath = getBundledPythonPath();

    // if (defaultPythonPath === '') {
    //   defaultPythonPath = bundledPythonPath;
    // }
    let bundledEnvInstallationExists = false;
    try {
      bundledEnvInstallationExists = fs.existsSync(bundledPythonPath);
    } catch (error) {
      console.error('Failed to check for bundled Python path', error);
    }

    // const selectBundledPythonPath =
    //   (defaultPythonPath === '' || defaultPythonPath === bundledPythonPath) &&
    //   bundledEnvInstallationExists;

    let bundledEnvInstallationLatest = true;

    if (bundledEnvInstallationExists) {
      try {
        const bundledEnv = registry.getEnvironmentByPath(bundledPythonPath);
        const jlabVersion = bundledEnv.versions['jupyterlab'];
        const appVersion = app.getVersion();
        const diff = semver.diff(appVersion, jlabVersion);
        if (diff !== 'prerelease') {
          bundledEnvInstallationLatest = false;
        }
      } catch (error) {
        console.error('Failed to check bundled environment update', error);
      }
    }

    let strServerEnvVars = '';
    if (Object.keys(serverEnvVars).length > 0) {
      for (const key in serverEnvVars) {
        strServerEnvVars += `${key}= "${serverEnvVars[key]}"\n`;
      }
    }

    const ctrlWLabel = process.platform === 'darwin' ? 'Cmd + W' : 'Ctrl + W';

    const template = `
      <style>
      #container {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      #content-area {
        display: flex;
        flex-direction: row;
        column-gap: 20px;
        flex-grow: 1;
        overflow-y: auto;
      }
      #categories {
        width: 200px;
      }
      #category-content-container {
        flex-grow: 1;
      }
      .category-content {
        display: flex;
        flex-direction: column;
      }
      #footer {
        text-align: right;
      }
      #category-jupyterlab jp-divider {
        margin: 15px 0;
      }
      #server-config-section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      jp-tab-panel #tab-updates {
        display: flex;
        align-items: flex-start;
      }
      #category-tabs {
        width: 100%;
      }
      #bundled-env-warning {
        display: none;
        align-items: center;
      }
      #bundled-env-warning.warning {
        color: orange;
      }
      #install-bundled-env {
        display: none;
      }
      #update-bundled-env {
        display: none;
      }
      .row {
        display: flex;
        align-items: center;
      }
      .footer-row {
        height: 50px;
        overflow-y: hidden;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
      }
      .progress-message {
        margin-right: 5px; line-height: 24px; visibility: hidden;
      }
      .progress-animation {
        margin-right: 5px; visibility: hidden;
      }
      #news-feed-settings {
        display: flex;
        flex-direction: column;
        margin: 10px 0;
      }
      #clear-history {
        display: flex;
        flex-direction: column;
      }
      #clear-history-progress {
        visibility: hidden;
      }
      .setting-section {
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        align-items: baseline;
      }
      #additional-server-args,
      #server-launch-command-preview,
      #additional-server-env-vars {
        width: 100%;
      }
      #additional-server-args::part(control) {
        height: 40px;
      }
      #tab-panel-server {
        padding-bottom: 20px;
      }
      #additional-server-env-vars.invalid::part(control) {
        border-color: red;
      }
      </style>
      <div id="container">
        <div id="content-area">
          <jp-tabs id="category-tabs" false="" orientation="vertical">
            <jp-tab id="tab-general">General</jp-tab>
            <jp-tab id="tab-server">Server</jp-tab>
            <jp-tab id="tab-privacy">Privacy</jp-tab>
            <jp-tab id="tab-advanced">Advanced</jp-tab>

            <jp-tab-panel id="tab-panel-general">
              <jp-radio-group orientation="horizontal">
                <label slot="label">On startup</label>
                <jp-radio name="startup-mode" value="welcome-page" <%= startupMode === 'welcome-page' ? 'checked' : '' %>>Show welcome page</jp-radio>
              </jp-radio-group>
              
              <jp-radio-group orientation="horizontal">
                <label slot="label">Theme</label>
                <jp-radio name="theme" value="light" <%= theme === 'light' ? 'checked' : '' %>>Light</jp-radio>
                <jp-radio name="theme" value="dark" <%= theme === 'dark' ? 'checked' : '' %>>Dark</jp-radio>
                <jp-radio name="theme" value="system" <%= theme === 'system' ? 'checked' : '' %>>System</jp-radio>
              </jp-radio-group>

            </jp-tab-panel>





            <jp-tab-panel id="tab-panel-server">
              <div class="row" style="line-height: 30px;">
                <label>Default working directory</label>
              </div>
              <div class="row">
                <div style="flex-grow: 1;">
                  <jp-text-field type="text" id="working-directory" value="<%= defaultWorkingDirectory %>" style="width: 100%;" spellcheck="false" placeholder="/working/directory (leave empty for user home)"></jp-text-field>
                </div>
                <div>
                  <jp-button id='select-working-directory' onclick='handleSelectWorkingDirectory(this);'>Change</jp-button>
                </div>
              </div>
            </jp-tab-panel>

            <jp-tab-panel id="tab-panel-privacy">
              <div id="clear-history">
                <div class="row" style="line-height: 30px;">
                  <label>Clear History</label>
                </div>
                <jp-checkbox id='checkbox-clear-session-data' type='checkbox' checked="true">Browser session cache & data</jp-checkbox>
                <jp-checkbox id='checkbox-clear-recent-remote-urls' type='checkbox'>Recent remote URLs</jp-checkbox>
                <jp-checkbox id='checkbox-clear-recent-sessions' type='checkbox'>Recent sessions</jp-checkbox>
              

                <div class="row" style="height: 60px">
                <jp-button onclick='handleClearHistory(this);'>Clear selected</jp-button><jp-progress-ring id="clear-history-progress"></jp-progress-ring>
                </div>
              </div>
              <script>
                const clearSessionDataCheckbox = document.getElementById('checkbox-clear-session-data');
                const clearRecentRemoteURLs = document.getElementById('checkbox-clear-recent-remote-urls');
                const clearRecentSessions = document.getElementById('checkbox-clear-recent-sessions');
                const clearUserSetPythonEnvs = document.getElementById('checkbox-clear-user-set-python-envs');
                const clearHistoryProgress = document.getElementById('clear-history-progress');

                function handleClearHistory(el) {
                  clearHistoryProgress.style.visibility = 'visible';
                  window.electronAPI.clearHistory({
                    sessionData: clearSessionDataCheckbox.checked,
                    recentRemoteURLs: clearRecentRemoteURLs.checked,
                    recentSessions: clearRecentSessions.checked
                  }).then(() => {
                    clearHistoryProgress.style.visibility = 'hidden';
                  });
                }
              </script>
            </jp-tab-panel>

            <jp-tab-panel id="tab-panel-advanced">
              <div class="row setting-section">
                <jp-radio-group orientation="horizontal">
                  <label slot="label">${ctrlWLabel} behavior</label>
                  <jp-radio name="ctrl-w-behavior" value="close" <%= ctrlWBehavior === 'close' ? 'checked' : '' %>>Close session</jp-radio>
                  <jp-radio name="ctrl-w-behavior" value="warn" <%= ctrlWBehavior === 'warn' ? 'checked' : '' %>>Warn before close</jp-radio>
                  <jp-radio name="ctrl-w-behavior" value="do-not-close" <%= ctrlWBehavior === 'do-not-close' ? 'checked' : '' %>>Do not close</jp-radio>
                </jp-radio-group>
              </div>

              <div class="row setting-section">
                <div class="row">
                  <label for="log-level">Log level</label>
                </div>

                <div class="row">
                  <jp-select id="log-level" name="log-level" value="<%= logLevel %>" position="below" onchange="onLogLevelChanged(this)">
                    <jp-option value="error">Error</jp-option>
                    <jp-option value="warn">Warn</jp-option>
                    <jp-option value="info">Info</jp-option>
                    <jp-option value="verbose">Verbose</jp-option>
                    <jp-option value="debug">Debug</jp-option>
                  </jp-select>
                </div>
              </div>

              <div class="row setting-section">
                <div class="row">
                  <jp-checkbox id='checkbox-update-check' type='checkbox' <%= checkForUpdatesAutomatically ? 'checked' : '' %> onchange='handleAutoCheckForUpdates(this);'>Check for updates automatically</jp-checkbox>
                </div>
                <div class="row">
                  <jp-checkbox id='checkbox-update-install' type='checkbox' <%= installUpdatesAutomatically ? 'checked' : '' %> <%= installUpdatesAutomaticallyEnabled ? '' : 'disabled' %>>Download and install updates automatically</jp-checkbox>
                </div>
                <div class="row">
                  <jp-button onclick='handleCheckForUpdates(this);'>Check for updates now</jp-button>
                </div>
              </div>

              <script>
                const autoUpdateCheckCheckbox = document.getElementById('checkbox-update-check');
                const autoInstallCheckbox = document.getElementById('checkbox-update-install');

                function handleAutoCheckForUpdates(el) {
                  updateAutoInstallCheckboxState();
                }

                function updateAutoInstallCheckboxState() {
                  if (<%= installUpdatesAutomaticallyEnabled ? 'true' : 'false' %> /* installUpdatesAutomaticallyEnabled */ &&
                    autoUpdateCheckCheckbox.checked) {
                    autoInstallCheckbox.removeAttribute('disabled');
                  } else {
                    autoInstallCheckbox.setAttribute('disabled', 'disabled');
                  }
                }

                function handleCheckForUpdates(el) {
                  window.electronAPI.checkForUpdates();
                }

                function onLogLevelChanged(el) {
                  window.electronAPI.setLogLevel(el.value);
                }

                document.addEventListener("DOMContentLoaded", () => {
                  updateAutoInstallCheckboxState();
                });
              </script>
            </jp-tab-panel>
          </jp-tabs>
        </div>
        <div id="footer" class="footer-row">
          <div id="progress-message" class="progress-message"></div>
          <div id="progress-animation" class="progress-animation"><jp-progress-ring></jp-progress-ring></div>
          <jp-button id="apply" appearance="accent" onclick='handleApply(this);'>Apply & restart</jp-button>
        </div>
      </div>
      <script>
        const applyButton = document.getElementById('apply');
        const progressMessage = document.getElementById('progress-message');
        const progressAnimation = document.getElementById('progress-animation');
        let defaultPythonEnvChanged = false;

        function showProgress(message, animate) {
          progressMessage.innerText = message;
          progressMessage.style.visibility = message !== '' ? 'visible' : 'hidden';
          progressAnimation.style.visibility = animate ? 'visible' : 'hidden';
        }

        function handleApply() {
          const startupMode = document.querySelector('jp-radio[name="startup-mode"].checked').value;
          window.electronAPI.setStartupMode(startupMode);
          const theme = document.querySelector('jp-radio[name="theme"].checked').value;
          window.electronAPI.setTheme(theme);


          window.electronAPI.setCheckForUpdatesAutomatically(autoUpdateCheckCheckbox.checked);
          window.electronAPI.setInstallUpdatesAutomatically(autoInstallCheckbox.checked);




          const ctrlWBehavior = document.querySelector('jp-radio[name="ctrl-w-behavior"].checked').value;
          window.electronAPI.setCtrlWBehavior(ctrlWBehavior);


          window.electronAPI.restartApp();
        }

        ${
          options.activateTab
            ? `
          document.addEventListener("DOMContentLoaded", () => {
            document.getElementById('tab-${options.activateTab}').click();
          });
        `
            : ''
        }
        
      </script>
    `;
    this._pageBody = ejs.render(template, {
      startupMode,
      theme,
      // syncJupyterLabTheme,
      // showNewsFeed,
      checkForUpdatesAutomatically,
      installUpdatesAutomaticallyEnabled,
      installUpdatesAutomatically,
      // frontEndMode,
      defaultWorkingDirectory,
      // defaultPythonPath,
      // selectBundledPythonPath,
      // bundledEnvInstallationExists,
      bundledEnvInstallationLatest,
      logLevel,
      serverArgs,
      // overrideDefaultServerArgs,
      serverEnvVars: strServerEnvVars,
      ctrlWBehavior
    });
  }

  get window(): BrowserWindow {
    return this._window.window;
  }

  load() {
    this._window.loadDialogContent(this._pageBody);
  }

  private _window: ThemedWindow;
  private _pageBody: string;
}

export namespace SettingsDialog {
  export enum Tab {
    General = 'general',
    Server = 'server',
    Updates = 'updates'
  }

  export interface IOptions {
    isDarkTheme: boolean;
    startupMode: StartupMode;
    theme: ThemeType;
    // syncJupyterLabTheme: boolean;
    // showNewsFeed: boolean;
    // frontEndMode: FrontEndMode;
    checkForUpdatesAutomatically: boolean;
    installUpdatesAutomatically: boolean;
    defaultWorkingDirectory: string;
    // defaultPythonPath: string;
    activateTab?: Tab;
    logLevel: LogLevel;
    serverArgs: string;
    // overrideDefaultServerArgs: boolean;
    serverEnvVars: KeyValueMap;
    ctrlWBehavior: CtrlWBehavior;
  }
}
