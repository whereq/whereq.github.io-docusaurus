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
| Source commit | `d9f4d70` |
| Licence | GNU General Public License, version 2 |
| Archive | [`a-dos-1.0.0.0-source.tar.gz`](/downloads/a-dos-1.0.0.0-source.tar.gz) |
| SHA-256 | `aee38d7ce67949046406f74799bc1c43a932757a47246115887d99d21432f76f` |

Verify it before you build it:

```sh
curl -LO https://whereq.github.io/downloads/a-dos-1.0.0.0-source.tar.gz
sha256sum a-dos-1.0.0.0-source.tar.gz
# aee38d7ce67949046406f74799bc1c43a932757a47246115887d99d21432f76f
```

The archive is the tree of the release commit plus a `SOURCE-RELEASE.md`
that names the version, the commit and the build. It holds the DOSBox core
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
