Recommended installation requirements: 

PC OS: ubuntu Xenial 16.04 LTS
good USB cable that will not be connected to HUB
Ubports installer: snap, deb, CPT or MDT, see bellow
Core devices N5, OPO, FP2
battery device is fully charged

FIRST STEP: 
check out the device on fastboot mode has the bootloader UNLOCKED

HOWTO:
ad N5/ press buttons "volume + - and power button" to open fastboot mode screen bootloader on the device
check last line on the device: should say: LOCK STATE - unlocked
if not, install ADB tools on your PC

ad OPO/

ad FP2/

HOWTO INSTALL ADB TOOLS:

SECOND STEP:
check out your cashe on the device is not full

HOWTO:
Put your device into recovery mode. (Volume up + Power on)

Connect it by USB to your computer

Open terminal on your computer and type:
adb shell "df -h"
My output in the last line was following:
/dev/block/platform/mtk-msdc.0/by-name/system
3.8G 3.7G 52.4M 99% /cache
So there was no space left on the cache partition.

just a test:
adb shell "ls /cache"
ls: /cache/lost+found: No such file or directory

Then I created a new filesystem on the cache partition by the command in terminal:
adb shell "make_ext4fs /dev/block/platform/mtk-msdc.0/by-name/system"

Now rebooting the device by the command:
adb reboot recovery

After device is up in recovery mode again, enter the command again:
adb shell "df -h"
/dev/block/platform/mtk-msdc.0/by-name/system
3.8G 8.1M 3.8G 0% /cache
Now the space on the /cache partition is available.

Just another test:
adb shell "ls /cache/"
Output was:
lost+found recovery

Now reboot the device:
adb reboot bootloader

Use the UBports installer to flash Ubuntu Touch to your Linux device
a) install using snap: sudo snap install ubports-installer --devmode
b) install using deb: https://github.com/ubports/ubports-installer/releases/download/0.1.9-beta/ubports-installer_0.1.9-beta_amd64.deb
c) install using CPT: https://ubports.com/r/downloads-cpt-linux
d) install using MDT: https://github.com/MariusQuabeck/magic-device-tool



