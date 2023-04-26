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

Neurodesk App bundles Neurodesk front-end and Docker as its backend into an Electron application.

`<platform>`: mac, linux or win

- Get the project source code

  ```bash
  git clone https://github.com/NeuroDesk/neurodesk-app
  ```

- Install dependencies and build Neurodesk App

  ```bash
  yarn
  yarn build
  ```

- Now you can launch the Neurodesk App locally using:

  ```bash
  yarn start
  ```

  If Neurodesk App does not find Docker running, it will show error with link for installation on your computer at first launch.

## Building for distribution

- Build the application

  ```bash
  yarn run clean && yarn build
  ```

- Create Neurodesk App installer which will also bundle Neurodesk App Server installer.

  ```bash
  yarn dist:<platform>
  ```

  Application Installer will be created in `dist/NeurodeskApp.dmg` (macOS), `dist/NeurodeskApp.deb` (Debian, Ubuntu), `dist/NeurodeskApp.rpm` (Red Hat, Fedora) and `dist/NeurodeskApp-Setup.exe` (Windows) based on the platform

## Release Instructions

For instructions on updating bundled Neurodesk packages and cutting a new release, please follow [Release.md](Release.md) document.

## Neurodesk

The client pull Jupyter Neurodesk image with `jupyter_neurodesk_version` tag in neurodesktop.toml.

Image tag is updated on schedule by Github Action with PR.

Update Release version by changing `neurodesk_desktop_release` in neurodesktop.toml.
