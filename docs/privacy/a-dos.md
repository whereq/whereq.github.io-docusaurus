---
sidebar_position: 2
title: "Privacy Policy — A-DOS"
description: "The privacy policy of A-DOS, the Android port of DOSBox. The app collects nothing and transmits nothing."
---

# Privacy Policy — A-DOS

**Effective date:** 26 November 2026
**Applies to:** A-DOS for Android, package `com.whereq.ados`, and every build
published under that package name.
**Developer:** WhereQ — <googol.zhang@gmail.com>
**Source code:** [A-DOS — source code and licences](/docs/legal/a-dos-source)

This is the privacy policy for **A-DOS**, the Android port of DOSBox. The app
links to this page from the footer of its launcher, and the Google Play
listing for the app points at this page.

## The short version

A-DOS **does not collect, transmit, share or sell any data**. It has no
network access at all: the app does not request the `INTERNET` permission, so
it cannot send anything anywhere even if it wanted to. Everything the app
writes stays on your device, in the place you chose for it.

## What the app stores, and where

A-DOS writes only to your device's own storage:

| What | Where | Why |
|---|---|---|
| Installed game bundles | the app's private storage | the launcher unpacks a `.zip` bundle you picked and keeps the game there |
| Save-state slots | the app's private storage | the snapshot of a running DOS machine |
| A mirror of the save states | **the folder you picked** (Config → Saves folder) | so your saves survive a reinstall, a new phone or an uninstall |
| The emulator configuration | the app's private storage | the DOSBox configuration and the mapper settings |

The **durable saves folder** is the one place the app writes outside its own
private storage. It is a folder *you* chose on your phone, through the
system's own folder picker. A-DOS only writes save files into it, and it
never reads, uploads or otherwise touches anything else in it. If you delete
the app, the folder and everything in it stays exactly where it was — that is
the point of it.

## What the app does not do

- It does not collect personal or sensitive user data.
- It does not transmit anything off the device. There is no network
  permission, no analytics, no crash reporting, no advertising SDK and no
  third-party service of any kind in the build.
- It does not share data with anyone, and it does not sell anything.
- It does not show ads.
- It does not read your contacts, messages, location, photos, media library
  or device identifiers.
- It does not require an account, and there is no account to delete.

## The permissions the app asks for

| Permission | Why |
|---|---|
| `VIBRATE` | the virtual keyboard gives haptic feedback when a key is pressed |

`VIBRATE` is the only permission the app declares. It runs no service, asks
for no notification permission, and keeps nothing alive in the background:
leaving the app ends the emulator process, and the save states you made are
what bring the game back.

No permission is used to read data about you. The app is granted access to
folders only through the system's own file picker, and only to the folder you
select there.

## Children

A-DOS is not directed at children and is not part of a children's app
category. It collects no data from anyone, children included.

## Third parties

The app bundles no third-party SDK that collects data. Its only runtime
dependencies are the Kotlin standard library and AndroidX support libraries,
which do not collect or transmit anything.

## Data retention and deletion

Because no data is collected, there is nothing for us to retain, back up or
delete on our side.

On your side:

- **Uninstalling A-DOS** removes everything in the app's private storage —
  the installed bundles and the local save slots.
- **The durable saves folder is yours.** A-DOS never deletes it. Delete the
  folder, or the files in it, whenever you want; the app only writes new
  save files into it.
- **To remove an individual game**, use *Remove* in the launcher.

## Security

Everything stays on your device, so there is no data in transit to protect
and no server to attack. The app is signed with a release key held by the
project; the published APK and App Bundle are checksummed next to the
download links so you can verify that what you install is the file that was
published.

## Changes to this policy

If this policy changes, the new text is committed to the project's source
tree together with the change that caused it, and the effective date at the
top is updated. This page is the copy that is live.

## Contact

Questions about this policy:

- **Email:** <googol.zhang@gmail.com>
- **Source code and licences:** [A-DOS — source code and licences](/docs/legal/a-dos-source)
