# Connecting to a remote Neurodesk Server

Neurodesk App creates new Neurodesk sessions by launching a locally running Neurodesk server and connecting to it. It can also connect to an existing Neurodesk server instance that is running remotely. In order to connect to a server, click the `Connect to remote Neurodesk server..` button in the Start section of the Welcome Page.

<img src="media/start-session-connect.png" alt="Connect to server" width=250 />

This will launch a dialog that automatically lists the remote Neurodesk server instances.

<img src="media/connect-to-server.png" alt="Connect to server list" width=700 />

Select a server from the list or enter the URL of the Neurodesk application server. If the server requires a token for authentication, make sure to include it as a query parameter of the URL as well (`/lab?token=<token-value>`). After entering a URL hit `Enter` key to connect.

If the `Persist session data` option is checked, then the session information is stored and Neurodesk App will re-use this data on the next launch. If this option is not checked, the session data is automatically deleted at the next launch and servers requiring authentication will prompt for re-login.

You can delete the stored session data manually at any time by using the `Clear History` option in the Privacy tab of Settings dialog.

<img src="media/settings-privacy.png" alt="Clear History" width=800 />

# Configuration and data files

Neurodesk App stores data in ~/neurodesktop-storage as default.

# Uninstalling Neurodesk App

## Debian, Ubuntu Linux

```bash
sudo apt-get purge neurodeskapp # remove application
sudo rm /usr/bin/neurodeskapp # remove command symlink

# to remove application cache
rm -rf ~/.config/neurodeskapp
```

## Red Hat, Fedora, SUSE Linux

```bash
sudo rpm -e neurodeskapp # remove application
sudo rm /usr/bin/neurodeskapp # remove command symlink

# to remove application cache
rm -rf ~/.config/neurodeskapp
```

## Arch-based distributions

```bash
sudo pacman -Rs neurodeskapp-bin
```

## macOS

Find the application installation `NeurodeskApp.app` in Finder (in /Applications or ~/Applications) and move to Trash by using `CMD + Delete`. Clean other application generated files using:

```bash
rm -rf ~/Library/neurodeskapp # to remove application cache
rm -rf ~/Library/Application\ Support/neurodeskapp # to remove user data
```

## Windows

On Windows, go to `Windows Apps & Features` dialog using `Start Menu` -> `Settings` -> `Apps` and uninstall Neurodesk App application as shown below.

In order to remove application cache, delete `C:\Users\<username>\AppData\Roaming\neurodeskapp` directory.

# Clean Tinyrange build cache

If you want to clean the Tinyrange build cache, you can use the following command:

## Linux and macOS

```bash
rm -rf ~/neurodesktop-storage/build
```

## Windows

Delete the `C:\neurodesktop-storage\build` directory.
