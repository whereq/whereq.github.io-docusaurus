---
sidebar_position: 1
title: "WhereQ-DOSBox — release history"
description: "Every release of WhereQ-DOSBox, the Android port of DOSBox, with the APK that was published, its SHA-256, and what changed in it."
---

# WhereQ-DOSBox — release history

**WhereQ-DOSBox** is the Android port of DOSBox. It carries the DOSBox emulator
core (upstream **r4305**, the SDL2 branch), so it is **GPLv2** work, and it is
published under the package name `com.whereq.dosbox`. It runs on **Android 6.0
or newer** since 1.0.0.19 — and since that release the app's own promise and
the native library it ships agree, which they did not before — and every
release APK carries the native library for the three ABIs the project builds:
`arm64-v8a`, `armeabi-v7a` and `x86_64`.

This page is the ledger of what has shipped: every release, the APK that people
actually download, its SHA-256, and the release note that goes with it.

- **Releases page:** <https://github.com/whereq/whereq-dosbox/releases>
- **Repository:** <https://github.com/whereq/whereq-dosbox>

## Where the APKs live

From **1.0.0.9** on, every release is published on the releases page, with the
APK and a `.sha256` sidecar next to it:

```
https://github.com/whereq/whereq-dosbox/releases/download/v<version>/whereq-dosbox-<version>.apk
https://github.com/whereq/whereq-dosbox/releases/download/v<version>/whereq-dosbox-<version>.apk.sha256
```

The releases before that were never published on the releases page. Their APK
lives in the repository, at its own tag:

```
https://raw.githubusercontent.com/whereq/whereq-dosbox/v<version>/downloads/whereq-dosbox-<version>.apk
```

**1.0.0.1** and **1.0.0.2** are tags only — no APK was published for either, and
there is no release note for either.

## The releases at a glance

| Version | Date | APK size (bytes) | APK SHA-256 | Published |
|---|---|---|---|---|
| [1.0.0.19](https://github.com/whereq/whereq-dosbox/releases/download/v1.0.0.19/whereq-dosbox-1.0.0.19.apk) | 2026-11-25 | 16 725 927 | `39a6c53f9951247c706f08185e54cf7558ae137250866a1d41f27d6ba1ccb568` | releases page |
| [1.0.0.18](https://github.com/whereq/whereq-dosbox/releases/download/v1.0.0.18/whereq-dosbox-1.0.0.18.apk) | 2026-11-24 | 16 511 577 | `80cc3cdfa54a3dff7296d298eef72fffa771c57a992c30bab1793c6f9a97d4d0` | releases page |
| [1.0.0.17](https://github.com/whereq/whereq-dosbox/releases/download/v1.0.0.17/whereq-dosbox-1.0.0.17.apk) | 2026-11-20 | 16 510 522 | `796203db84f31e994c45a3965fe3919b5e7a030a5ad8e45e4a9eabbed3f4ac0a` | releases page |
| [1.0.0.16](https://github.com/whereq/whereq-dosbox/releases/download/v1.0.0.16/whereq-dosbox-1.0.0.16.apk) | 2026-11-20 | 16 510 058 | `183f16ee3fd219a878b56b6a08758a184370b834a0fef63b63a7aea7f4faa773` | releases page |
| [1.0.0.15](https://github.com/whereq/whereq-dosbox/releases/download/v1.0.0.15/whereq-dosbox-1.0.0.15.apk) | 2026-11-20 | 16 500 506 | `dbf776abe6b69541194fa5bded5d2c807a94add4733a74ea2620b03227263f42` | releases page |
| [1.0.0.14](https://github.com/whereq/whereq-dosbox/releases/download/v1.0.0.14/whereq-dosbox-1.0.0.14.apk) | 2026-11-19 | 16 482 965 | `2bf4d58b8e59413fa1795f7a2baa65b13f642daa76d9696a062d70893ad2d628` | releases page |
| [1.0.0.13](https://github.com/whereq/whereq-dosbox/releases/download/v1.0.0.13/whereq-dosbox-1.0.0.13.apk) | 2026-11-18 | 16 482 792 | `98243e5577276d31f89adc1ac776bfc4242fdc0ff43f877bc36797c138cffa94` | releases page |
| [1.0.0.12](https://github.com/whereq/whereq-dosbox/releases/download/v1.0.0.12/whereq-dosbox-1.0.0.12.apk) | 2026-11-18 | 16 536 964 | `67577d59e078cd2953c24ea24753068aae2a01c2cf27a9788644787e999f2fd9` | releases page |
| [1.0.0.11](https://github.com/whereq/whereq-dosbox/releases/download/v1.0.0.11/whereq-dosbox-1.0.0.11.apk) | 2026-11-17 | 16 465 213 | `5dd04af8dbb0ef739eed57de3bf8a61eb070dcf6f63c0fe003cf69bcecd54854` | releases page |
| [1.0.0.10](https://github.com/whereq/whereq-dosbox/releases/download/v1.0.0.10/whereq-dosbox-1.0.0.10.apk) | 2026-11-17 | 16 447 797 | `8394c0d6c1f23146dbeef5ac19967a7b696580ac850294e62626a3bb9c552192` | releases page |
| [1.0.0.9](https://github.com/whereq/whereq-dosbox/releases/download/v1.0.0.9/whereq-dosbox-1.0.0.9.apk) | 2026-11-16 | 16 424 571 | `aed24faa8b5558fea6ae9603c24e46c76c7c2fc0936afbcb32360c28e9f9ab7c` | releases page |
| [1.0.0.8](https://raw.githubusercontent.com/whereq/whereq-dosbox/v1.0.0.8/downloads/whereq-dosbox-1.0.0.8.apk) | 2026-11-16 | 16 408 155 | `ed17f39bddeb9e871485df390f772f19c5a43abdbf3b5845c7abd4afbb602ca3` | repository tag |
| [1.0.0.7](https://raw.githubusercontent.com/whereq/whereq-dosbox/v1.0.0.7/downloads/whereq-dosbox-1.0.0.7.apk) | 2026-11-13 | 16 306 123 | `2e97f12f3901acbdc23f62395316df25aa51f4a081d941a950b2d7dfa36910a1` | repository tag |
| [1.0.0.6](https://raw.githubusercontent.com/whereq/whereq-dosbox/v1.0.0.6/downloads/whereq-dosbox-1.0.0.6.apk) | 2026-11-13 | 16 306 125 | `a41d76eeb2c79eccf5afb4f77dcff8d7525d8c9c55c2fad982707520feed369a` | repository tag |
| [1.0.0.5](https://raw.githubusercontent.com/whereq/whereq-dosbox/v1.0.0.5/downloads/whereq-dosbox-1.0.0.5.apk) | 2026-11-13 | 16 305 964 | `562598cdf2ca9214f50af94604843acba8af90c292eeb7e06320532b313e4ac4` | repository tag |
| [1.0.0.4](https://raw.githubusercontent.com/whereq/whereq-dosbox/v1.0.0.4/downloads/whereq-dosbox-1.0.0.4.apk) | 2026-11-13 | 5 273 712 | `d2f8a1e6a54f6ea6abd25c4273f19f1cbdd77e311f7427e73c8c9c7d77bada46` | repository tag |
| [1.0.0.3](https://raw.githubusercontent.com/whereq/whereq-dosbox/v1.0.0.3/downloads/whereq-dosbox-1.0.0.3.apk) | 2026-11-13 | 5 273 712 | `e4af359c0bda5d945f781324dc5f8f4743ef40d0c45ae02c66d8e7b2f4aa7702` | repository tag |
| 1.0.0.2 | — | — | — | tags only, no APK |
| 1.0.0.1 | — | — | — | tags only, no APK |

## One key, so a new version installs over the old one

Every release is signed with the same release key of the project, so a later
version replaces an earlier one in place — nothing has to be uninstalled
first, and nothing is lost. The signing certificate (SHA-256) is identical for
every release:

```
b16b480d5a1ff6d35baff0b15fa3fc4b0ee815e500861fbff1b062c9bf7d3933
```

Verify a download against the checksum above before you install it:

```sh
curl -LO https://github.com/whereq/whereq-dosbox/releases/download/v1.0.0.19/whereq-dosbox-1.0.0.19.apk
sha256sum whereq-dosbox-1.0.0.19.apk
# 39a6c53f9951247c706f08185e54cf7558ae137250866a1d41f27d6ba1ccb568
```

From 1.0.0.9 on, the same checksum is also published next to the APK as a
`.sha256` sidecar, so it can be fetched and checked on its own.

## The licence travels with the app

The app is GPLv2, so the licence and the copyright notices have to travel with
the program. The full **GPL v2** text and the **NOTICE** are inside the APK, as
`assets/COPYING` and `assets/NOTICE`, and the launcher's footer opens them
next to the link to the complete source.

## Save states across the releases

A release whose save-state format grew refuses the older states rather than
misreading them, so a save is never loaded as if it were something else.

| Release | What happened to the save-state format |
|---|---|
| 1.0.0.10 | grew a version — states written by 1.0.0.9 are refused rather than misread |
| 1.0.0.11 | grew a version — states written by 1.0.0.10 are refused rather than misread |
| 1.0.0.12 | grew a version — states written by 1.0.0.11, and by the earlier 1.0.0.12 cuts, are refused rather than misread |
| 1.0.0.13 | unchanged — the file layout is the same version 10 as before |
| 1.0.0.14 | unchanged |
| 1.0.0.15 | unchanged |
| 1.0.0.16 | not mentioned in this release's notes |
| 1.0.0.17 | unchanged |
| 1.0.0.18 | unchanged |
| 1.0.0.19 | unchanged |

## The release notes

### 1.0.0.19 — 25 November 2026

A **maintenance** release: the whole build toolchain moves to the current
stable line, and the app finally says the truth about the Android versions it
runs on.

- **The app runs on Android 6.0 or newer.** It always said so, and it did not:
  the manifest claimed API 21 while the native library was built for API 24, so
  the app really only started on Android 7.0 and the claim was a promise the
  binary could not keep. The library is now built for **API 23** and the
  manifest says 23 — the promise and the shipped binary agree for the first
  time, and the floor is one step lower than it has ever been. It is also the
  floor every dependency in the app asks for, so nothing in the app layer had
  to be bent to reach it.
- **The build toolchain is the current stable line.** AGP **9.5.3**, Gradle
  **9.9.2**, Kotlin **2.4.21**, the current AndroidX releases, NDK **r30**,
  CMake **3.31.6**, build-tools **37.0.0** and the API **37** platform. AGP 9
  compiles the Kotlin sources itself, so the `kotlin-android` plugin is gone
  from the build, and the DSL is the new one — properties instead of method
  calls. Nothing of this reaches the phone: it is the tools that make the APK,
  not the APK.
- **SDL2 2.32.10.** The Java shell is upstream 2.32.10 with exactly two
  deliberate deviations, both of them there to keep the app the way it is. The
  six `java.util.stream` calls in the audio-device code are written as plain
  loops, because `java.util.stream` only exists from API 24. And the activity
  keeps `SCREEN_ORIENTATION_FULL_SENSOR` instead of upstream's new `FULL_USER`,
  because this app is a landscape-first DOS machine and `FULL_USER` would
  freeze a game in portrait on a phone with auto-rotate switched off. The SDL2
  tarball itself is still the pristine upstream release.

Nothing else moves. The emulator core, the bundle launcher, the on-screen
keyboard, **Game Mode** and the save states are exactly what they were, and
the APK is still signed with the same key, so it installs over 1.0.0.18 without
uninstalling it first: **every save state written by the earlier releases
loads normally**.

The **user guide** follows the floor and now asks for Android 6.0 or newer.

### 1.0.0.18 — 24 November 2026

A release with a **feature** and four **fixes**: a hardware keyboard finally
reaches the emulator, the app can start DOSBox again instead of dying, the tone
that rode on the music is gone, and **Game Mode** comes back the way you left
it.

- **A Bluetooth keyboard works.** The vendored SDL2 had no path for Android key
  events, so the Java layer fed only the IME and the native side never saw a
  single key: a key pressed on a Bluetooth keyboard — or injected with
  `adb shell input keyevent` — never reached the emulator, and the on-screen
  keyboard was the only input there was. The app now maps an Android key code to
  a DOSBox key name and resolves it through the same native table the on-screen
  keyboard uses, so both end in exactly the same scancode. **Shift**, **Ctrl**
  and **Alt** are carried along, so DOS sees the capital letters it should. Only
  the first press of a held key is forwarded — DOSBox does its own auto-repeat
  in the BIOS timer, and every extra event would be one more scancode in the
  BIOS buffer. A keystroke aimed at the launch-script editor still never
  reaches the game. Checked on a **real phone**: the letters and **Enter** pass
  the copy protection of *Mortal Kombat*, **F1** starts the game, **F10** opens
  its own options menu, and the arrow keys move the menu cursor and are
  accepted as the game's movement keys.
- **DOSBox can start again in the same app run.** The device table is a static
  array of ten slots, and the devices of a run were never removed from it, so a
  second start in the same process — the app keeps its process alive between two
  starts — ran out of slots and died with *DOS:Too many devices added*. Leaving
  the app with the Back button and opening it again was enough to hit it. The
  devices of the DOS section are now removed when it shuts down.
- **The tone that rode on the music is gone.** A steady beat tone sat on top of
  the in-game music on a real phone, and only while the music played — the
  digital sound effects, being transient, stayed clean. DOSBox keeps its audio
  buffer centred by continuously re-tuning the emulator's effective output
  sample rate, and under the steady, heavy load of OPL/FM synthesis on a phone
  that control loop hunts; because a held FM note is a sustained carrier, the
  hunting frequency-modulates it into an audible warble. The shipped
  `dosbox.conf` now runs the mixer the way a phone wants it: at the device's
  native **48 kHz**, in blocks of **2048**, with a **50 ms** prebuffer. This
  changes audio buffering only — never game speed or logic — and costs about
  50 ms of latency, which is inaudible in a DOS game. The whole analysis, with
  the three diagrams of the pipeline, the control loop and the modulation, is in
  `docs/AUDIO-FM-BEEP.md`.
- **Game Mode comes back the way you left it.** The profile, the D-pad mode and
  the remaps are restored in one pass, before the gamepad is built. The D-pad
  has to be in place before the bar is built, or the chip that names the mode
  would name the previous one — the separate setters had to be called in an
  order the caller could get wrong, and one layout pass cannot.
- **The TURBO auto-fire cannot get stuck.** While the FIRE button is held, the
  TURBO chip fires it again and again. The loop lived in the button's own touch
  listener, and a rebuild — a rotation, or the other thumb cycling a chip —
  detached that view mid-hold without an `ACTION_UP`, so the listener never
  stopped and the key fired forever. The loop now lives with the game pad, and
  every path that releases the keys cancels it.

The **user guide** grew with it: the keyboard's **columns layout** — the one key
column per side that the app falls back to when the black bar beside the 4:3
picture drops below 116 dp — is now pictured, and so is the narrow-screen
keyboard, squeezed to about 24 dp letters in an 18:9 frame. The new **Game
Mode** screenshots were re-taken from the 1.0.0.17 release build, so the frames
in the guide, in the repository and in the capture set are the same ones.

**The whole of this release — the hardware keyboard, the tone on the music, the
second start in the same app run, and Game Mode coming back the way it was left
— was checked on a real phone, not only in the emulator.**

The save states, the bundle launcher, the on-screen keyboard and the emulator
core are unchanged: **every save state written by the earlier releases loads
normally**.

### 1.0.0.17 — 20 November 2026

A **maintenance** release: two things in **Game Mode** that were wrong in a way
only the screen could show, and the **privacy policy**, which now lives in the
repository next to the code and the licences.

- **The remap mode marks the FIRE button too — and you can see it.** While the
  remap mode is on, the buttons that can be remapped get an outline. The FIRE
  button is filled with the same gold as the outline, so the outline was
  invisible and the button looked like any other one. The outline now follows
  the chip it marks: gold on the dark buttons, dark brown on the gold FIRE
  button. The rule is chosen by the luminance of the chip, so an outline is
  never the colour of the button it is drawn on.
- **The D-pad button names the mode you actually have.** The button in the
  bottom row of the left pad cycles the D-pad output between **ARROWS**,
  **NUMPAD** and **WASD**, and it carries the name of the current mode. When the
  app remembered a different mode for that game, the button kept the name of
  the mode the bar had been built with, so it could say *ARROWS* while the D-pad
  was sending *WASD*. The bar is rebuilt when the mode changes, and the
  remembered mode is restored before the gamepad is built.
- **The privacy policy is in the repository.** The app collects no data and does
  not ask for the `INTERNET` permission, so it cannot send anything anywhere
  even if it wanted to. The policy says so, in full, and now it lives in the
  repository as `docs/PRIVACY.md` — next to `COPYING` and `NOTICE`, where the
  whole history of it is public. The README links to it, and the launcher's
  footer opens it next to the link to the licence screen.
- **A comment that had drifted.** The note on the Konami detector said the exit
  code ends in *N/Y*; the buttons are **X** and **Y**, and the sequence says so.

The save states, the bundle launcher, the keyboard and the emulator core are
unchanged: **every save state written by the earlier releases loads normally**.

### 1.0.0.16 — 20 November 2026

A **maintenance** release: the phone's **Back button works again**, the app runs
on the devices that need **16 KB memory pages**, and the **licence travels with
the app**.

- **The Back button works again.** From Android 13 on, the system stopped
  sending the back key to the activity, and SDL's surface swallowed what did
  arrive — so the button did nothing at all. The app now handles the back
  gesture itself, the way Android expects it to.
- **The presses walk out in order.** Back closes the launcher, then leaves
  **Game Mode**, then folds the keyboard panel, and only then leaves the app.
- **16 KB memory pages.** Every loadable segment of `libdosbox.so` is aligned
  for the 64-bit devices that require them (Android 15 and newer). CI checks it
  on every build now.
- **The DRAG lock no longer holds the mouse.** Leaving Game Mode while the
  **DRAG** button was locked used to leave the left mouse button *down* inside
  DOSBox — a game saw a click that never ended.
- **The licence travels with the app.** The app is GPLv2, so the licence and
  the copyright notices have to travel with the program: the full **GPL v2**
  text and the **NOTICE** are in the APK, and the launcher's footer links to
  them, next to the link to the complete source.

### 1.0.0.15 — 20 November 2026

A release with a **feature**: **Game Mode**, a console-style gamepad for the
action games that want one.

- **Game Mode.** With the keyboard pads showing, switch **Caps Lock** on
  (double-tap **Shift**) and type the Konami code — **↑ ↑ ↓ ↓ ← → ← → B A** —
  and the pads flip into a gamepad: an eight-way D-pad, a trackball, and Y, X,
  CTRL, ALT, SPACE and ENT. The same code on the D-pad (then **X, Y**) takes
  you back, and the phone's Back button does it too.
- **The B and A must be capital.** The code is matched on the case the letters
  are actually typed in, so a lowercase *"ba"* just types *"ba"* into the DOS
  prompt.
- **Every button can be remapped.** Long-press the gold profile button and pick
  **Remap buttons…**. The remap belongs to that one game and is remembered.
- **The gamepad is a keyboard.** The gamepad sends the same SDL events the
  on-screen keyboard sends, so the guest cannot tell the two apart. The
  trackball sends the relative mouse events the SDL layer now accepts.
- **Leaving the app is clean.** A shutdown that failed used to abort the process
  with SIGABRT while it was only shutting down; the error is caught now.
- **The save-state format did not change.** The Game Mode is a new way to press
  the same keys, so every save state written by the earlier releases loads
  normally.

### 1.0.0.14 — 19 November 2026

A **patch** release with three save-state repairs: the requests no longer answer
each other, a duplicated handle survives a restore, and a restore no longer
leaks a file descriptor.

- **A save that times out no longer answers the next request.** A save or a
  restore that overran its time limit used to hand its late result to the
  *next* request — the new request was answered with an old answer, and the
  file on disk could be the file the old request wrote. Every request now
  carries a generation, and a completion that arrives after its request gave up
  is dropped.
- **A duplicated handle survives a restore.** A handle duplicated with
  INT 21h/45h is two names for one file, and the restore keeps that sharing:
  the reference count goes back as it was saved, so closing one of the two
  names no longer takes the other down with it — which used to end in
  *"invalid handle"*.
- **A restore no longer leaks a file descriptor.** The machine a restore
  replaces is closed properly now, whatever its reference count. Before, a
  state in which a handle was shared left one host file descriptor open per
  restore, for the rest of the session.
- **The save-state format did not change.** All three fixes are in the
  snapshot's plumbing, not in the file, so every save state written by the
  earlier releases loads normally.

### 1.0.0.13 — 18 November 2026

A **patch** release: the name and the mark of the project are on the app again,
and a restored save keeps the time it was made.

- **The app is called WhereQ-DOSBox.** The launcher name, the notification and
  the launcher icons all carry the name and the mark of the project, the way
  they did before. The package is `com.whereq.dosbox` and the download is
  `whereq-dosbox-1.0.0.13.apk`, so the app installs under its own id and can be
  updated in place from the earlier releases.
- **A restored save keeps the time it was made.** Loading a save state rewrites
  the local file, and the launcher read the time off that file — so every
  restored slot claimed to be *"just now"*. The original save time is now
  carried over, and a slot that was made five hours ago still says *five hours
  ago* after it has been restored.
- **The save-state format did not change.** The fix is in the launcher, not in
  the snapshot, so every save state written by the earlier releases loads
  normally — the file layout is the same version 10 as before.

The saves-folder feature from 1.0.0.12 is unchanged: pick a folder on the
phone (**Config → Saves folder**, or the offer that appears after the first
save) and every slot is mirrored there, gzipped, next to the game itself. Two
archives with the same file name are told apart by name — *game* and *game (2)* —
so their saves never end up in the same place.

### 1.0.0.12 — 18 November 2026

A **patch** release on the `android-migration-complete` milestone: the mouse
work that closed the Android migration phase — the **RMB** key on the left pad
next to **Tab**, the second-finger right click, and the INT 33h mouse state in
the save file — is what 1.0.0.11 shipped, and this release repairs the
packaging around it and moves the saves out of the app's own storage.

- **Your saves survive a reinstall.** The save-state slots lived in the app's
  private storage, and Android deletes that when the app is uninstalled — so
  reinstalling used to mean losing every save. Pick a folder on the phone
  (**Config → Saves folder**, or the offer that appears after the first save)
  and every slot is mirrored there, gzipped, next to the game itself. A
  reinstall, a new phone or a deleted app therefore all come back: the games
  are offered for restore by name, with their save states already there. Two
  archives with the same file name are told apart by name — *game* and *game
  (2)* — so their saves never end up in the same place.
- **The save state keeps the mouse driver's configuration and none of its
  run-time state.** 1.0.0.11 put the *whole* INT 33h driver into the snapshot,
  including the event queue, the click counters and the interrupt re-entrancy
  flags. Restoring that wedged mouse-driven games: the stale queue and flags
  fed garbage into the INT 74 handler and into the game's own callback, and a
  game could hang on load. The snapshot now carries only the configuration the
  guest cannot rebuild itself — the event-callback registration, the cursor
  range and position, the cursor shape and hotspot, the granularity and the
  sensitivity — and the volatile state is left clean, so a restored game starts
  from an idle driver. The cursor shape matters too: without it the visible
  cursor reverts to the default block and no longer lines up with the real
  click point, so the taps land beside the target instead of on it.
- **The native library knows its own version.** The version was a literal
  `1.0.0.1` in the Android config template, so the emulator reported
  *WhereQ-DOSBox version 1.0.0.1* in the DOS startup banner and in the window
  title no matter which release was installed, the BIOS machine string said
  1.0.0.1, and the mapper file was always `mapper-1.0.0.1.map`. The native
  build now reads the same `VERSION` file that the release script writes and
  the Gradle build reads, so the version in the banner and the version on the
  downloads page can no longer disagree.
- **A local build ships all three ABIs.** `android/build-android.sh` and
  `android/build-sdl2.sh` defaulted to two of them, so an APK built from a
  plain `./bin/build.sh apk` did not carry the same ABI set as the published
  one. Both now build `arm64-v8a`, `armeabi-v7a` and `x86_64` by default — the
  same set CI builds and the same set this release carries.

**Save states written by 1.0.0.11 and by the earlier 1.0.0.12 cuts cannot be
loaded by this build.** The state file grew a version when the mouse block
changed, and an older state is refused rather than misread — the launcher says
*"That save file is damaged"*. Save states written by this build load normally.

One consequence of the volatile half staying out: the button state is not
captured, so a restored game starts with the mouse released and a click that
was held down across the save has to be pressed again.

**This release was re-cut.** The tag still reads `v1.0.0.12`, but the file
behind the download link is a different build than the one first published
under that name, so its checksum is a different one. The checksum in the table
above is the current one, and the `.sha256` sidecar next to the APK carries the
checksum of the file as it is now.

One thing to know: the mapper file is named after the version, so it is
`mapper-1.0.0.12.map` now. A hand-made `mapper-1.0.0.1.map` is not picked up
any more — rename it if you had one.

### 1.0.0.11 — 17 November 2026

- **The mouse has a right button.** A DOS mouse has two buttons and a
  touchscreen has one, so there was no way to send a right click — and in most
  DOS games the right button is *cancel* or *back*. The on-screen keyboard now
  has an **RMB** key on the left pad, next to **Tab**, and a **second finger**
  on the picture does the same at that finger's own position.
- **A click is a held button, not a tap.** The first finger holds the **left**
  button for as long as it is down, so a drag still drags, and the right button
  is held the same way. This is what a game that reads the mouse *live* needs:
  the button state at INT 33h AX=3. A click that was over in a millisecond
  could fall between two polls and be missed altogether.
- **The mouse survives a save state.** The INT 33h driver keeps its state
  outside the guest's memory — the game's event-callback registration, the
  cursor range and the button state. It was not in the snapshot, so after a
  restore the cursor still moved but the game's clicks stopped reaching it: a
  dialog's *confirm* button did nothing. The driver is now part of the state.

**Save states written by 1.0.0.10 cannot be loaded by this build.** The state
file grew a version when the mouse driver joined the snapshot, and an older
state is refused rather than misread.

This release carried the **milestone tag** for the end of the Android migration
phase — `milestone/android-migration-complete`.

The rest of the emulator core is unchanged — this release is the app layer and
the mouse driver.

### 1.0.0.10 — 17 November 2026

- **The sound survives a save state.** The FM chip is now snapshotted
  *exactly* — the envelope, the wave phase and the LFO counter all come back
  with the state. In 1.0.0.9 the chip was not in the snapshot at all: the music
  kept playing while the rest of the machine was rewound, and it was gone
  entirely when a state was restored into a fresh process. Now the sound comes
  back with the machine, in the middle of the note rather than at the beginning
  of it. The PC speaker comes back silent instead of droning on its own.
- **A key no longer sticks.** Rotating the phone while a key was held left that
  key pressed in DOSBox for ever. Every key that is down is now released when
  the layout is rebuilt, and a modifier that is shown in two places (the pad
  and the fold-up panel) counts its fingers instead of assuming there is only
  one.
- **The launcher fits on the screen.** The **Files** panel measures the space
  it has and caps the game list to it, so a third game no longer pushes its
  buttons off the bottom edge where nothing could bring them back.
- **The desktop build links again.** The save-state code was missing from the
  autotools build and the two archives had a circular dependency — the desktop
  baseline compiles and links again.
- **A technical reference.** `docs/TECHNICAL-REFERENCE.md` in the repository
  describes the whole implementation with the diagrams: the native build, the
  save-state machine, the exact FM snapshot, the bundle launcher, the on-screen
  keyboard, the throughput benchmark, what is still open and the screenshot
  gallery.

**Save states written by 1.0.0.9 cannot be loaded by this build.** The state
file grew a version when the sound chips became part of the snapshot, and an
older state is refused rather than misread.

This release carried the **milestone tag** for the end of the Android migration
phase — `milestone/android-migration-complete`.

### 1.0.0.9 — 16 November 2026

- **The keyboard is a console now.** In landscape the keys sit in the two
  black bars beside the picture, the way a handheld console is built: the
  picture in the middle, one hand on each side, nothing on top of the picture.
  The **left pad** holds the arrow keys as a D-pad (up on top, left and right
  side by side, down below) and the left half of a split QWERTY, with **File**,
  **Esc** and **Tab** along the top. The **right pad** holds the action keys —
  **Alt**, **Ctrl**, **Shift**, **Space**, **Enter** — and the right half of the
  QWERTY, with **#+=**, **Fn** and Backspace along the top.
- **Three layers, one key each.** **#+=** swaps both halves for the
  punctuation, **Fn** for F1–F12, Ins/Del, Home/End, PgUp/PgDn, Caps, PrtSc and
  Pause. The switched key lights up while its layer is on. The letter layer of
  the right half already carries `: . / \`, so a DOS path needs no layer switch
  at all.
- **Modifiers work both ways.** *Tap* Ctrl, Alt or Shift and it stays armed for
  the next key — Ctrl, then C. *Hold* it and it behaves like a real key for as
  long as the finger is down, which is what a game expects from its fire and
  strafe keys while the other thumb steers.
- **The layout follows the screen.** A letterbox bar of at least 116 dp gets the
  full pads; a narrower one gets a single key column per side and the fold-up
  QWERTY; portrait gets a slim strip along the bottom. The letter keys come to
  about 33 dp wide on a 20:9 screen and about 24 dp on an 18:9 one — tight on
  the narrowest phones, where the D-pad and the action keys keep their full
  size.

The emulator core is the one from 1.0.0.8, unchanged — the whole change is in
the app layer.

### 1.0.0.8 — 16 November 2026

- **Save states.** Every game gets three slots. **States** in the Files panel
  opens them; **Save** freezes the whole running machine — the CPU, the DOS
  memory, the video memory, the open DOS file handles, the hardware timers —
  and **Load** jumps back to that exact moment. A slot is a file on the phone,
  so it survives quitting the app and rebooting the phone.
- **Resume resumes.** The **Resume** button used to start the last game from
  the beginning. It now restores its newest save state, so the player
  continues where they left off. With no save state the game starts from the
  beginning, as before.
- **The arrows are an inverted T.** In landscape the four arrow keys sit in the
  right-hand column the way they do on a real keyboard — up on top, left and
  right side by side, down below.
- **The game keeps running.** While a game is running, a small ongoing
  notification holds the emulator process, so switching to another app no
  longer loses the game. Tap the notification to come back to the same frame.

Some old DOS programs do not survive a restore — the extender of Ultima VIII
still aborts on it. That is a limitation of the DOS internals the snapshot does
not capture yet, not of the app.

### 1.0.0.7 — 13 November 2026

- **The CPU core can be changed in the app.** The **Config** button in the
  Files panel offers the five cores DOSBox knows: `auto` (the default),
  `normal`, `dynamic`, `simple` and `prefetch`. In 1.0.0.6 the fallback to
  `core=normal` was only documented — the configuration file is regenerated on
  every boot, so it could not be edited on the phone.
- The keyboard of that release is two columns in the letterbox bars (the
  modifiers on the left, **File**, **Ent**, **Space** and the arrows on the
  right).

### 1.0.0.6 — 13 November 2026

The CPU core is now `core=auto`. A program that stays in real mode runs on the
interpreter, exactly as before; a program that switches into protected mode
hands over to the recompiling (JIT) core, which is compiled into the native
library for all three ABIs. Both paths were verified on the emulator — STARFALL
in real mode, Ultima VIII in protected mode.

If the JIT code cache cannot be allocated, `core=normal` is the fallback — from
1.0.0.7 on it can be picked in the app.

### 1.0.0.5 — 13 November 2026

The biggest change to the app since the port started. Four things are in it.

- **The app layer is Kotlin now, not Java.** The same eight classes, rewritten.
  Gradle is the canonical build, because the no-Gradle packager drives `javac`
  and cannot compile Kotlin; `android/build-apk.sh` stays as a legacy,
  Java-only helper (`bin/build.sh apk --legacy-apk`). The APK grows to about
  15.5 MB: the native libraries are stored uncompressed so they can be mapped
  straight out of the APK, and the Kotlin runtime plus AndroidX add about
  4.5 MB of dex.
- **The emulator core gained a JIT.** The portable recompiler (C_DYNREC) is
  built in for all three Android ABIs — aarch64 (`risc_armv8le`), armv7
  (`risc_armv4le`) and the x86_64 emulator (`risc_x64`); the earlier claim that
  it needed a GCC plugin was wrong. Android forbids making a malloc'd heap
  executable, so the code cache is an anonymous RWX mmap instead of `malloc` +
  `mprotect`. Release builds also compile at `-O3` with ThinLTO, which the
  interpreter cores — large switch dispatchers — profit from.
- **The launcher can now start a game the way DOS needs it.** A bundle gets a
  `RUN.BAT` that changes to the game folder and runs the entry point; the new
  **Launch...** editor shows that script and lets the user change it, one DOS
  command per line, which is how the Chinese DOS games that need a resident
  driver TSR (GRPDRV and friends) get started. The launcher also detects those
  drivers by itself and loads them before the entry.
- **The launcher grew, too.** **Exit to prompt** drops back to the DOS prompt
  with a clean C: drive, and the on-screen keyboard now sits on both sides of
  the picture so the thumbs reach it in landscape.

The version goes to 1.0.0.5 (`versionCode` 1000005), so the APK in
`downloads/` can be installed over 1.0.0.4. Verified on the emulator: the
release-signed APK installs over 1.0.0.4, a bundle is installed through the
launcher, and STARFALL starts from it with the keyboard working.

### 1.0.0.4 — 13 November 2026

The button in the on-screen keyboard was called **Games**, but the launcher does
not open games. It opens a bundle, and a bundle is a `.zip` archive with any DOS
program in it — a game, a utility, a text mode application. The name was wrong
for everything that is not a game, and the launcher panel talked about games the
same way.

So the button is now **File**, the old DOS way, and the panel is **Files**: the
on-screen keyboard button reads "File", the launcher panel is titled "Files",
the install action reads "Install a bundle (.zip)" and the empty state reads
"No bundles installed yet." The Java API follows the same naming
(`OnFilesRequestedListener`, `onFilesRequested()`, `showFiles()`), while the
class names stay as they are — they are the internal model. The comments, the
README, the porting notes and the example bundle README follow the wording, so
that the documentation describes bundles and not games.

The version goes to 1.0.0.4 (`versionCode` 1000004), so the APK in
`downloads/` can be installed over 1.0.0.3. Verified on the emulator: the
button reads "File", the panel reads "Files", and a bundle was installed
through the renamed launcher and started with **Play** — STARFALL runs from it.

### 1.0.0.3 — 13 November 2026

The example game bundle: **STARFALL**, a tiny arcade game in 16-bit DOS
assembly that exercises graphics, the keyboard and the PC speaker. It lives in
`examples/game-bundle` and its bundle zip is committed, so it can be installed
on a phone without building anything. The release APK is in `downloads/`, for
people who want to try the app directly.

The version goes to 1.0.0.3 (`versionCode` 1000003), so the APK in `downloads/`
can be installed over 1.0.0.2.

### 1.0.0.2 — tags only

No APK was published for this release, and there is no release note for it. The
tag's message is *"Bump the version to 1.0.0.2"*.

### 1.0.0.1 — tags only

No APK was published for this release, and there is no release note for it. The
tag's message is *"Initial commit: WhereQ-DOSBox — a native Android port of
DOSBox r4305"*.

## See also

- [Releases page](https://github.com/whereq/whereq-dosbox/releases) — every
  published release, with its `.sha256` sidecar
- [Repository](https://github.com/whereq/whereq-dosbox) — the source, under
  GPLv2
- [WhereQ-DOSBox: a DOS machine in your pocket](/blog/WhereQ-DOSBox) — what the
  app is
- [WhereQ-DOSBox user guide](/blog/WhereQ-DOSBox-User-Guide) — putting a DOS
  game on the phone
- [WhereQ-DOSBox 1.0.0.18: the keyboard you already own](/blog/WhereQ-DOSBox-1.0.0.18)
  — the release that brought the hardware keyboard, in full
