# Installing Arch

`#` will represent the install disk prompt, `(gdisk)` will represent the `gdisk` prompt `(gdisk prompt)` will represent a prompt for information within `gdisk`, `(parted)` will present the `parted` prompt, and `[arch]` will represent the arch-chroot prompt.

### Pre-install

###### Update the system clock
```
# timedatectl set-ntp true
```

###### Partition disk and make filesystems
```
# parted /dev/sda mklabel gpt
# gdisk /dev/sda
(gdisk) n
(gdisk prompt) 1
(gdisk prompt) 1M
(gdisk prompt) +1M
(gdisk prompt) ef02
(gdisk) w
# parted /dev/sda
(parted) mkpart ESP fat32 2MiB 514MiB
(parted) set 2 boot on
(parted) mkpart primary ext4 514MiB 100%
(parted) quit
# mkfs.fat -F32 /dev/sda2
# mkfs.ext4 /dev/sda3
```

###### Mount the partitions
```
# mount /dev/sda3 /mnt
# mkdir -p /mnt/boot
# mount /dev/sda2 /mnt/boot
```

### Installation

###### Selecting mirrors
Edit `/etc/pacman.d/mirrorlist`, moving better mirrors to the top.

###### Install the 'base' group
```
# pacstrap /mnt base
```

### Post-installation

###### Generate an fstab file
```
# genfstab -U /mnt >> /mnt/etc/fstab
```

###### Chroot into your installed arch
```
# arch-chroot /mnt /bin/bash
```

###### Generate locale
```
[arch] nano /etc/locale.gen
```
Uncomment the line with `en_US.UTF-8 UTF-8 `, then save and quit. Then do:
```
[arch] locale-gen
[arch] echo "LANG=en_US.UTF-8" > /etc/locale.conf
```

###### Select a time zone
```
[arch] ln -s /usr/share/zoneinfo/$(tzselect) /etc/localtime
```
Follow the instructions in the `tzselect` prompt to pick your timezone. Then, adjust the time skew:
```
[arch] hwclock --systohc --utc
```

###### Install grub (bootloader)
```
[arch] pacman -S intel-ucode grub
[arch] grub-install /dev/sda
[arch] grub-mkconfig -o /boot/grub/grub.cfg
```

###### Set a hostname
Where `HOSTNAME` is your desired hostname, type
```
[arch] echo "HOSTNAME" > /etc/hostname
```

###### Enable dhcpcd (for a wired connection)
For wired connection, enable dhcpcd:
```
[arch] systemctl enable dhcpcd
```

###### Set a root password
```
[arch] passwd
```
You will be prompted for a password.

###### Update your packages
Some of your packages may be outdated. Update with
```
[arch] pacman -Syu
```

### General recommendations

###### Install the base-devel package
Base-devel contains some useful packages that you might need. Install with
```
[arch] pacman -S base-devel
```
Also install `bash-completion` if you use `bash`:
```
[arch] pacman -S bash-completion
```

###### Create a new user
Replace `USERNAME` with your desired username.
```
[arch] useradd -m -G wheel -s /bin/bash USERNAME
[arch] passwd USERNAME
```

###### Give users with the root password permission to run sudo
```
[arch] EDITOR=nano visudo
```
Uncomment the desired lines, save, and quit.

###### Boot into your OS
```
[arch] exit
# umount -R /mnt
# reboot
```
Now, boot into your newly installed OS and log into the account you created.

###### Install pacaur (AUR helper)
```
curl http://thepiercingarrow.github.io/scripts/install_pacaur.sh | bash
```
