# Installation tutorial

## Recommended installation requirements: 

- PC OS: ubuntu Xenial 16.04 LTS
- good USB cable that will not be connected to HUB
- Ubports installer: snap, deb, CPT, MDT or ubuntu-device-flash, see below
- Core devices N5, OPO, FP2
- battery device is fully charged

All commands written in the form:
`xyz command` should be run from Terminal.

## Install adb, fastboot and phablet tools
`sudo apt-get install android-tools-fastboot android-tools-adb phablet-tools`

## Developer Mode
- Android phone in developer mode
- Activate usb debugging
- Connect phone to pc
- Allow connection via message on your phone

## Unlock bootloader
Check to see if device is UNLOCKED on bootloader screen

### N5
- Press buttons (Volume down + Power on) to open fastboot mode screen bootloader on the device or use the command `adb reboot bootloader`
- check last line on the device: should say: LOCK STATE - unlocked
- if not, `fastboot oem unlock`  (--this will completely wipe your device--)

### OPO
[TODO]

### FP2
[TODO]

## Check cache is not full
check out your cache on the device is not full

- Put your device into recovery mode. (Volume up + Power on) or `adb reboot recovery`
- Connect it by USB to your computer
- Run command: `adb shell "df -h"`
  
  My output in the last line was following:
  ```
  /dev/block/platform/mtk-msdc.0/by-name/system
  3.8G 3.7G 52.4M 99% /cache
  ```
  So there was no space left on the cache partition.
- just a test:
  ```
  $ adb shell "ls /cache"
  ls: /cache/lost+found: No such file or directory
  ```
- creat a new filesystem on the cache partition: `adb shell "make_ext4fs /dev/block/platform/mtk-msdc.0/by-name/system"`
- reboot the device: `adb reboot recovery`
- After device is up in recovery mode again, enter the command again:
  ```
  $ adb shell "df -h"
  /dev/block/platform/mtk-msdc.0/by-name/system
  3.8G 8.1M 3.8G 0% /cache
  ```
  Now the space on the `/cache` partition is available.
- Just another test:
  ```
  $ adb shell "ls /cache/"
  lost+found recovery
  ```

## Install Image
- Reboot the device: `adb reboot bootloader`
- Use the UBports installer to flash Ubuntu Touch to your Linux device choosing one of this methods:

### UBports installer as Snap
`sudo snap install ubports-installer --devmode`

### UBports installer as .deb
https://github.com/ubports/ubports-installer/releases/download/0.1.9-beta/ubports-installer_0.1.9-beta_amd64.deb

### CPT
https://ubports.com/r/downloads-cpt-linux

### MDT (soon deprecated)
https://github.com/MariusQuabeck/magic-device-tool

### ubuntu-device-flash
`sudo ubuntu-device-flash --server=http://system-image.ubports.com touch --channel=15.04/stable --bootstrap`

Check for correct syntax (double dashes).
`--bootstrap` installs UBports Recovery
Removing `--bootstrap` will update UT similar to OTA update while in UT.

To see the possible channels, check out [system-image.ubports.com](http://system-image.ubports.com/ubports-touch/)



## Troubleshooting

- Adb vendor keys not set
Try Revoke USB DEBUGGING Authorization.
    Enable USB debugging again
disconnect and reconnect the phone

- adb devices not working
try adb kill-server

- Ubuntu 17.xx
sudo add-apt-repository ppa:phablet-team/tools
sudo apt-get update
sudo apt-get install phablet-tools

