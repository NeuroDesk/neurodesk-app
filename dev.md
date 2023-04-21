# Developer Documentation

## Build dependencies

- nodejs

  You can install from https://nodejs.org/en/download/

- yarn

  Install using

  ```bash
  npm install --global yarn
  ```

## Local development

JupyterLab Desktop bundles JupyterLab front-end and a conda environment as JupyterLab Desktop Server as its backend into an Electron application.

`<platform>`: mac, linux or win

- Get the project source code

  ```bash
  git clone https://github.com/NeuroDesk/neurodesk-desktop
  ```

- Install dependencies and build JupyterLab Desktop

  ```bash
  yarn
  yarn build
  ```

- Now you can launch the JupyterLab Desktop locally using:

  ```bash
  yarn start
  ```

## Building for distribution

- Build the application

  ```bash
  yarn run clean && yarn build
  ```

- Create JupyterLab Desktop installer which will also bundle JupyterLab Desktop Server installer.

  ```bash
  yarn dist:<platform>
  ```

  Application Installer will be created in `dist/Neurodesktop.dmg` (macOS), `dist/JupyterLab.deb` (Debian, Ubuntu), `dist/Neurodesktop.rpm` (Red Hat, Fedora) and `dist/Neurodesktop-Setup.exe` (Windows) based on the platform

## Release Instructions

For instructions on updating bundled JupyterLab packages and cutting a new release, please follow [Release.md](Release.md) document.

## Neurodesk

The client pull Jupyter Neurodesk image with `jupyter_neurodesk_version` tag in neurodesktop.toml.

Image tag is updated on schedule by Github Action with PR.

Update Release version by changing `neurodesk_desktop_release` in neurodesktop.toml.
