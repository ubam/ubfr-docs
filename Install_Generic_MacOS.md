# Necessary files

- [Admin on Mac](https://support.apple.com/en-us/HT204012)
- [Android Platform_tools](https://stackoverflow.com/questions/31374085/installing-adb-on-mac-os-x)
- [UBports_Installer.dmg](https://github.com/ubports/ubports-installer/releases)

# 1.0 Install necessary tools

- Android Platform_Tools
- UBports_Installer.dmg

Note 1.) phablet-tools and ubuntu-device-flash do not exist on MacOS.  The UBports-Installer replicates all the functions of ubuntu-device-flash (adb push/cache cleanup).
 
# 2.0 Setup Phone to accept Ubuntu Touch

- Put your Android phone in developer mode
- Activate usb debugging
- Connect phone to Mac
- Allow connection via message on your phone

# 3.0 Launch UBports_installer.dmg with sudo privileges.

- sudo /Applications/ubports-installer.app/Contents/MacOS/ubports-installer

For further information on running programs as [administrator](https://support.apple.com/en-us/HT204012).

# 4.0 Successful installation of UT on your core device.

If all goes well, Ubuntu Touch should now be installed on device.
