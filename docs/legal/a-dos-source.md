---
sidebar_position: 3
title: "A-DOS — source code and licences"
description: "The complete source of the A-DOS build, published as GPLv2 requires, with the licence of every part it is made of."
---

# A-DOS — source code and licences

**A-DOS** is the Android port of DOSBox. It embeds the DOSBox emulator
core, which is **GPLv2**, so A-DOS is a GPLv2 work as well.

GPLv2 puts two obligations on every copy of the program, and this page is
where both of them are answered:

- **§2** — the licence and the copyright notices have to travel with the
  program. The app carries them: open the game launcher and tap
  **Licences** in its footer to see the full GNU General Public License
  version 2 and the attribution notices.
- **§3** — everyone who receives the program has to receive its source as
  well. The complete source of each build is published below.

## The source of the current release

| | |
|---|---|
| Version | 1.0.0.0 (`versionCode` 1000000) |
| Source commit | `7865e40` |
| Licence | GNU General Public License, version 2 |
| Archive | [`a-dos-1.0.0.0-source.tar.gz`](/downloads/a-dos-1.0.0.0-source.tar.gz) |
| SHA-256 | `10bf68e800ca69799dc5b72aa1ae0b06461fd888ae39e1b9ef88764906d13fa0` |

Verify it before you build it:

```sh
curl -LO https://whereq.github.io/downloads/a-dos-1.0.0.0-source.tar.gz
sha256sum a-dos-1.0.0.0-source.tar.gz
# 10bf68e800ca69799dc5b72aa1ae0b06461fd888ae39e1b9ef88764906d13fa0
```

The archive is the tree of the release commit plus a `SOURCE-RELEASE.md`
that names the version, the commit and the build. The shipped build was
made from `649880c`; the only difference is the fix of the regression test
in `examples/`, which is not part of the app. It holds the DOSBox core
with its per-file copyright and licence headers intact, the Android
application, the NDK/CMake build of the native library, the desktop Linux
baseline, the benchmark, the dev toolchain and the build scripts.

## Building it

```sh
./bin/build.sh bootstrap            # fetch SDL2 and build the toolchain
./bin/build.sh android --abis "arm64-v8a armeabi-v7a x86_64"
./bin/build.sh apk --release        # the signed APK
```

`BUILDING.md` and `bin/build.sh doctor` say what is missing.

**SDL2 is not in the archive.** `third_party/fetch-sdl2.sh` downloads the
exact release the build uses — SDL2 **2.30.0** — from

```
https://github.com/libsdl-org/SDL/releases/download/release-2.30.0/SDL2-2.30.0.tar.gz
```

`./bin/build.sh bootstrap` runs that fetch for you.

## Try it — the example bundle

The archive carries an example bundle: **STARFALL**, a tiny DOS game written
for this project. It is published on its own as well, so that the bundle
launcher can be seen working without building anything:

| | |
|---|---|
| Archive | [`a-dos-demo-bundle.zip`](/downloads/a-dos-demo-bundle.zip) |
| SHA-256 | `fa53db56ac78ecf4dead745a247c1d970950ae0442d2763b0730e6689bf20a36` |
| Contents | `STARFALL.COM`, `PLAY.BAT`, `README.TXT` |

To install it in the app:

1. Download `a-dos-demo-bundle.zip` to the phone.
2. Open A-DOS and tap the **File** key on the on-screen keyboard (top left) to
   open the bundle launcher.
3. Tap **Install a bundle (.zip)** and pick the downloaded file.
4. It appears in the list. Tap **Play** and the emulator reboots into
   STARFALL.

The app itself ships no games — this bundle is an example, published with the
source code, and the user brings their own software.

## The licence of every part

| Part | Licence | What it means |
|---|---|---|
| DOSBox core (`src/`, `include/`, `scripts/`, `visualc_net/`) | **GPLv2** | the emulator itself, © the DOSBox Team and its contributors, imported with its headers, `AUTHORS`, `ChangeLog` and `COPYING` intact |
| The WhereQ porting work (`android/`, `native/`, `bench/`, `toolchain/`, `bin/`) | **GPLv2** | a derivative of the core, so it cannot be relicensed under MIT or anything more permissive |
| SDL2 (statically linked into `libdosbox.so`) | **zlib** | the notice has to travel with the binary and is in `NOTICE`; its source does not have to be published |
| Kotlin standard library, AndroidX | Apache-2.0 | runtime dependencies; neither collects nor transmits anything |

The full text of the licence is in `COPYING`, the attribution notices are in
`NOTICE`, and both are in the archive and in the app itself.

## Earlier work

The native port this app grew out of is public as
[`whereq/whereq-dosbox`](https://github.com/whereq/whereq-dosbox) — the
DOSBox core, the JNI glue and the build scripts under GPLv2. A-DOS has
diverged from it (17 core files and the whole application layer), which is
why the snapshot above is published separately.

## Trademarks

"DOSBox" is a trademark of the DOSBox project. A-DOS is not affiliated with,
sponsored or endorsed by the DOSBox team.

## See also

- [Privacy Policy — A-DOS](/docs/privacy/a-dos)
