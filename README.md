# Neurodesk Desktop

Neurodesk Desktop is the cross-platform desktop application for [Neurodesk](https://github.com/neurodesk/neurodesk-desktop). It is the quickest and easiest way to get started with Neurodesk on your personal computer, with the flexibility for advanced use cases.

![Neurodesk Desktop](media/neurodesk-desktop.png)

## Installing Docker

Neurodesk Desktop requires Docker to be installed on your computer. If you already have Docker installed, you can skip this step.

- [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/)
- [Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/)
- [Docker Engine for Linux](https://docs.docker.com/engine/install/)

After installation, open a terminal (Linux/macOS) or command prompt (Windows) and run the following command to verify that Docker is working correctly:
`docker --version`

## Installing Neurodesk Desktop

If you have an existing Neurodesk Desktop installation, please uninstall it first by following the [uninstall instructions](user-guide.md#uninstalling-neurodesk-desktop).

- [Debian, Ubuntu Linux Installer](https://github.com/NeuroDesk/neurodesk-desktop/releases/latest/download/Neurodesk-Setup-Debian.deb)
- [Red Hat, Fedora, SUSE Linux Installer](https://github.com/NeuroDesk/neurodesk-desktop/releases/latest/download/Neurodesk-Setup-Fedora.rpm)
- [macOS Intel Installer](https://github.com/NeuroDesk/neurodesk-desktop/releases/latest/download/Neurodesk-Setup-macOS-x64.dmg), [macOS Apple silicon Installer](https://github.com/neurodesk/neurodesk-desktop/releases/latest/download/Neurodesk-Setup-macOS-arm64.dmg)
- [Windows Installer](https://github.com/NeuroDesk/neurodesk-desktop/releases/latest/download/Neurodesk-Setup-Windows.exe)

Additionally, Neurodesk Desktop can be installed on Windows via winget: `winget install neurodesktop`.

## Launching Neurodesk Desktop

Neurodesk Desktop can be launched from the GUI of your operating system by clicking the application's icon or by using `neurodesktop` command from the command line.

Neurodesk Desktop sets File Browser's root directory based on the launch method.

- If launched from the application icon on GUI or by using `neurodesktop` command without any arguments, then the default working directory is set as the root directory. The default working directory is user home directory but it can be customized from the Settings dialog.

- If `neurodesktop` command is used with a directory path as the argument or with the `--working-dir` argument the directory in the argument is set as the root directory.

## Sessions and Projects

Sessions represent local project launches and connections to existing Neurodesk servers. Each Neurodesk UI window in the app is associated with a separate session and sessions can be restored with the same configuration later on.

Each launch of Neurodesk in a different working directory is a separate project and projects can have their own configuration such as Python environment and UI layout.

### Session start options

You can start a new session by using the links at the Start section of the Welcome Page.

<img src="media/start-session.svg" alt="Start session" width=220 />

- `Open Local Neurodesk..` creates a new session in the default working directory.
- `Connect...` creates a session by connecting to a remote Neurodesk server.

Previously opened sessions are stored as part of application data and they are listed on Welcome Page. Clicking an item in the `Recent sessions` list restores the selected session.

<img src="media/recent-sessions.svg" alt="Start session" width=300 />

### neurodesktop command-line launch examples

- Open directories using relative or absolute path
  - `neurodesktop .` launch in current directory
  - `neurodesktop /Users/username/dir` launch with absolute path

For additional CLI options run `neurodesktop --help` in command line.

### See [user guide](user-guide.md) for configuration options

### For contributing, see [developer documentation](dev.md)
