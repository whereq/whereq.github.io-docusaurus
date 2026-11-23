/**
 * The DOS Games — one collection of the WhereQ Atlas.
 *
 * Every page here is a game that runs on WhereQ-DOSBox, the DOS emulator in
 * the WhereQ Universe. Each page carries four things:
 *
 *   · the bundle to download, with its checksum
 *   · the setup the game needs — some launch straight, some do not
 *   · how to actually play it, keys and screens included
 *   · the licence notice, on every page, without exception
 *
 * The setup and the controls were worked out on an Android emulator running
 * WhereQ-DOSBox, not written from memory. Where a step is a guess, it is not
 * on the page; where a step was tested, it is.
 *
 * This file holds content, not layout. The layout lives in
 * `src/components/Atlas/`.
 */

import {AtlasEntry, AtlasGroup, AtlasSection} from './atlas-types';

export const DOS_GAMES_GROUPS: AtlasGroup[] = [
  {
    id: 'strategy',
    title: 'Strategy & Role-Playing',
    blurb:
      'Campaigns, officers and maps — the games where the war is won long before the first arrow is fired.',
  },
  {
    id: 'fighting',
    title: 'Action & Fighting',
    blurb:
      'One-on-one fighters and the arcade ports that found their way onto the PC.',
  },
];

/** The introduction to the DOS games shelf. */
export const DOS_GAMES_INTRO: AtlasSection[] = [
  {
    title: 'What this shelf is',
    blocks: [
      {
        kind: 'paragraph',
        text: 'A shelf of DOS games, each one documented the way a person who has just installed it would want it read: here is the bundle, here is exactly what you have to do to start it, and here is what every key does.',
      },
      {
        kind: 'paragraph',
        text: 'These are the games that run on WhereQ-DOSBox — the DOS emulator built natively for Android, one page away in the Universe. They were tested on an emulator running the app, and the steps on each page are the steps that actually worked, including the ones that turned out to be wrong on the first attempt.',
      },
      {
        kind: 'paragraph',
        text: 'Not every DOS game in the archive has a page yet. This shelf starts with two — one that needs more setup than it looks, and one that launches straight but hides the key you need. The shape of every page stays the same as the shelf grows.',
      },
    ],
  },
  {
    title: 'How to read a game page',
    blocks: [
      {
        kind: 'paragraph',
        text: 'Each page runs in the same order: what the game is, the download with its checksum, the setup in WhereQ-DOSBox, how to play it, what is inside the bundle, and where every fact came from. The download comes first on purpose — the page is worth little if the reader has to hunt for the file.',
      },
      {
        kind: 'paragraph',
        text: 'Every page also carries a notice about the download, and every page carries a comment thread. If a step does not work on your device, or you know a shorter way in, say so in the comments — that is what the thread is for.',
      },
    ],
  },
  {
    title: 'About the downloads',
    blocks: [
      {
        kind: 'paragraph',
        text: 'The archives on these pages are published for study, communication and preservation only. They are the work of their authors and publishers, who hold the rights in them; publishing one here claims none of those rights and waives none of them.',
      },
      {
        kind: 'paragraph',
        text: 'If you believe a download here breaks a licence, a copyright or any other right, tell us and we will take it down. The same goes for a bundle that is missing something — say so in the comments and it will be replaced.',
      },
    ],
  },
];

export const DOS_GAMES_ENTRIES: AtlasEntry[] = [
  {
    id: 'sanguo-yingjie-zhuan',
    collection: 'dos-games',
    name: '三国志英杰传',
    role: 'The Strategy RPG',
    tagline: "KOEI's 1995 war-and-campaign classic — and the one that will not start unless you tell it how.",
    logo: '/img/dos-games/sanguo-yingjie-zhuan.svg',
    accent: '#A31621',
    group: 'strategy',
    related: ['whereq-dosbox'],
    summary:
      'The 1995 KOEI strategy RPG in its Traditional Chinese DOS release. You play Liu Bei, gathering officers and holding the line against Dong Zhuo and the Cao Wei campaign that follows. It is the one game on this shelf that refuses to start when you press Play — it needs a different launcher, and the page says which one.',
    status: '1995',
    url: '/downloads/dos-games/sanguo-yingjie-zhuan.zip',
    facts: [
      {label: 'Developer', value: 'KOEI CO., LTD'},
      {label: 'Publisher', value: 'KOEI CO., LTD — Taiwan release by 第三波 (Soft-World)'},
      {label: 'Published', value: '1995'},
      {label: 'Platform', value: 'MS-DOS'},
      {label: 'Genre', value: 'Strategy RPG (S-RPG)'},
      {label: 'Language', value: 'Traditional Chinese (Big5)'},
      {label: 'Entry point', value: 'REKO3.COM — not MAIN.EXE'},
      {label: 'Bundle', value: '60 files · 3,461,749 bytes'},
    ],
    capabilities: [
      'A campaign map: you move Liu Bei and the officers who have joined you between cities, and each move leads to a battle.',
      'Officers who join you, level up, and carry the treasure and horses you give them — the treasure in particular changes how a battle ends.',
      'A story that follows the Romance of the Three Kingdoms from the coalition against Dong Zhuo through to the campaign against Wei.',
      'A story prologue that plays before the first battle, and an ending sequence of its own after the last.',
    ],
    notice: {
      title: 'About this download',
      text: 'The archive on this page is published for study, communication and preservation only. 三国志英杰传 is the work of KOEI CO., LTD (© 1995 KOEI CO.,LTD) and of the people who made it; publishing it here claims none of their rights and waives none of them. If you believe this download breaks a licence, a copyright or any other right, tell us and we will take it down.',
    },
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: '三国志英杰传 — Romance of the Three Kingdoms: Heroic Legend — is KOEI\'s 1995 strategy role-playing game. You take the role of Liu Bei, and the campaign runs from the coalition that marches on Dong Zhuo through the long fight against Cao Wei. Officers join you as the story goes on, they level up, and what you equip them with decides how a battle ends.',
          },
          {
            kind: 'paragraph',
            text: 'This bundle is the Traditional Chinese DOS release, not the Japanese original: the text inside it is Big5, and the publisher of the Chinese release was 第三波 (Soft-World). The screen is VGA text mode with an animated status bar, and the game speaks in the voice of the 1990s Chinese translation — 開始新遊戲 for a new game, 讀取存檔 to load one, 功能設定 for the options, 觀看劇情簡介 to watch the story prologue.',
          },
          {
            kind: 'paragraph',
            text: 'The copyright line on the title screen reads © 1995 KOEI CO.,LTD, and the graphics credit inside the executable reads "TF-SSC … Programmed by T.FUJINUMA (TF-928) 1994,1995". The archive\'s installer string dates the release to 17 February 1995.',
          },
        ],
      },
      {
        title: 'Download the bundle',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The archive is the upstream file, byte for byte. The checksum below is what you should get.',
          },
          {
            kind: 'table',
            head: ['Field', 'Value'],
            rows: [
              ['File', 'sanguo-yingjie-zhuan.zip'],
              ['Size', '3,461,749 bytes'],
              ['SHA-256', '07bad92d786dbcd90bf27eed6e8473e09374608e21767c68d11cf293b3982999'],
              ['Contents', '60 files — the game, its drivers and its data'],
              ['Source', 'dos-bin.zczc.cz archive, mirrored unchanged'],
            ],
          },
          {
            kind: 'links',
            items: [
              {
                label: 'Download 三国志英杰传.zip (3.4 MB)',
                href: '/downloads/dos-games/sanguo-yingjie-zhuan.zip',
                external: false,
              },
            ],
          },
        ],
      },
      {
        title: 'Set it up in WhereQ-DOSBox',
        blocks: [
          {
            kind: 'paragraph',
            text: 'This is the part that catches people out. Pressing Play on this bundle does not start the game — it drops you at a DOS prompt and nothing else happens. The game is not broken; it is waiting for the right launcher.',
          },
          {
            kind: 'list',
            items: [
              'Import the zip into WhereQ-DOSBox — open it from the Files app on your phone and choose WhereQ-DOSBox, or use the app\'s own import.',
              'Open the game\'s row and tap Launch… to open the launch script.',
              'Tap Clear to empty the script field.',
              'Tap the REKO3.COM chip to put REKO3 in the script field.',
              'Tap Play.',
            ],
          },
          {
            kind: 'paragraph',
            text: 'REKO3.COM is the game\'s own launcher, and it is the only thing that starts the game correctly. It loads the sound driver (SBOPL2.COM), the graphics driver (GRPDRV.EXE) and the font driver (TFDED.COM), and then runs OPEN.EXE for the intro, MAIN.EXE for the game itself and END.EXE for the ending.',
          },
          {
            kind: 'paragraph',
            text: 'It also needs the game on two drives. WhereQ-DOSBox already mounts A: and B: to the game folder, which is what REKO3 expects — the game reads A:BAKDATA.R3 and B:IPPAN0.R3 — so there is nothing to mount by hand.',
          },
          {
            kind: 'paragraph',
            text: 'Why Play on its own fails: the app picks the biggest executable that is not an installer or a driver, and in this bundle that is MAIN.EXE. MAIN.EXE is the game without its drivers and without the launcher, so it starts, cannot draw, and falls back to the DOS prompt. Run INSTALL.EXE and you make it worse — the archive is already the installed layout.',
          },
        ],
      },
      {
        title: 'How to play',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The first thing you see is a password prompt: 密碼, with the line 請輸入正確密碼 [木土日] underneath. Type anything at all and press Enter — the gate takes whatever you type and lets you through into the menu. It is a copy-protection gate, not a secret; the 木土日 hint belongs to something else inside the game.',
          },
          {
            kind: 'paragraph',
            text: 'The menu has four items: 開始新遊戲 (new game), 讀取存檔 (load a save), 功能設定 (options) and 觀看劇情簡介 (watch the story prologue). They are mouse-driven — the keyboard will not move that cursor.',
          },
          {
            kind: 'list',
            items: [
              'Give DOSBox the mouse: press RMB on the on-screen keyboard (or the right mouse button on a Bluetooth keyboard) to switch mouse capture on, then tap the screen to click.',
              'Tap 開始新遊戲 to start a new campaign.',
              'Press Enter on the KOEI logo screen to move into the story prologue, then keep pressing Enter to step through it.',
              'From there the campaign proper begins: the map, the officers, the battles.',
            ],
          },
          {
            kind: 'paragraph',
            text: 'Two things worth knowing before you start. The campaign is decided in the planning stages — which officers you bring, which treasure and which horse each of them carries, and how you spend your turns — so the map matters more than the fighting does. And if you want to see how far Liu Bei can go, the strategy guides for this game describe a way to raise him straight to level 99: in a non-battle state, move the arrow onto Liu Bei\'s portrait and hold the left mouse button, then answer 是 when the question comes up, and do the same with the bead at the top left.',
          },
        ],
      },
      {
        title: 'What is in the bundle',
        blocks: [
          {
            kind: 'table',
            head: ['File', 'What it is'],
            rows: [
              ['REKO3.COM', 'The launcher. Run this one — it chains the drivers, the intro, the game and the ending together.'],
              ['MAIN.EXE', 'The game itself, and the file the app picks on its own. Runs without its drivers.'],
              ['OPEN.EXE / END.EXE', 'The story prologue and the ending sequence.'],
              ['GRPDRV.EXE', 'The graphics driver.'],
              ['SBOPL2.COM', 'The sound driver.'],
              ['TFDED.COM', 'The font driver — this is what puts the Chinese text on the screen.'],
              ['BAKDATA.R3, IPPAN0.R3', 'Save and campaign data. BAKDATA.R3 is read from A:, IPPAN0.R3 from B:.'],
              ['INSTALL.EXE', 'The 1995 installer. You do not need it — the archive is already installed.'],
            ],
          },
        ],
      },
      {
        title: 'Where the facts come from',
        blocks: [
          {
            kind: 'list',
            items: [
              'The game itself — the title screen, the menu, the prompt and the in-game credits, read on the emulator.',
              'The executable\'s own strings: "© 1995 KOEI CO.,LTD", "TF-SSC … Programmed by T.FUJINUMA(TF-928) 1994,1995", and the installer string "KOEI Install Program Ver 2.4 / 1995/ 2/17".',
              'The archive listing and checksum of the upstream file.',
              'Wikipedia, for the release date and the Taiwanese publisher.',
              'The Chinese strategy guides (par.com.tw and the 巴哈姆特 board), for the campaign structure and the level-99 trick.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'mortal-kombat',
    collection: 'dos-games',
    name: '真人快打',
    role: 'The Fighting Game',
    tagline: "Mortal Kombat for DOS — launches straight, then hides the key that starts it.",
    logo: '/img/dos-games/mortal-kombat.svg',
    accent: '#A67C00',
    group: 'fighting',
    related: ['whereq-dosbox'],
    summary:
      'The 1993 DOS conversion of Midway\'s arcade fighter, published by Acclaim and converted by Probe. It imports, Play starts it, and then it sits there looking dead — because the copy-protection screen wants a word and the title screen wants F1. Both are written down.',
    status: '1993',
    url: '/downloads/dos-games/mortal-kombat.zip',
    facts: [
      {label: 'Developer', value: 'Probe Software — the DOS conversion team'},
      {label: 'Published', value: 'Acclaim Entertainment, 1993'},
      {label: 'Platform', value: 'MS-DOS (DOS/4GW, 386)'},
      {label: 'Genre', value: 'Fighting game'},
      {label: 'Fighters', value: 'Kano, Johnny Cage, Rayden, Liu Kang, Scorpion, Sub-Zero, Sonya, Goro, Shang Tsung'},
      {label: 'Entry point', value: 'MK.EXE — picked automatically'},
      {label: 'Bundle', value: '67 files · 3,128,439 bytes'},
    ],
    capabilities: [
      'Nine fighters — Kano, Johnny Cage, Rayden, Liu Kang, Scorpion, Sub-Zero, Sonya, Goro and Shang Tsung — each with its own strengths and finishing move.',
      'Story mode with a biography screen for every fighter, from the Black Dragon clan\'s own recruitment pitch to Shang Tsung\'s island fortress.',
      'MIRROR MATCH, and three levels of ENDURANCE for the tournament.',
      'Sound through the AdLib, Roland and Sound Blaster drivers, all of which are in the bundle and all of which can be chosen in the game\'s own setup.',
      'The game\'s own setup screen, on F10, where every control can be re-assigned to the key of your choosing.',
    ],
    notice: {
      title: 'About this download',
      text: 'The archive on this page is published for study, communication and preservation only. 真人快打 (Mortal Kombat) is the work of Midway Games and Acclaim Entertainment and of the people who made the DOS conversion, and those rights are theirs; publishing it here claims none of them and waives none of them. If you believe this download breaks a licence, a copyright or any other right, tell us and we will take it down.',
    },
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: '真人快打 is the DOS version of Mortal Kombat — the Midway arcade fighter that arrived on the PC in 1993 as a DOS/4GW program. The credit inside MK.EXE reads "THE PROBE CONVERSION TEAM:", so Probe Software did the conversion, and Acclaim published it. The strings and the graphics files inside the archive name both: ACCLAIM.GRA and PROBE.GRA.',
          },
          {
            kind: 'paragraph',
            text: 'The dates in the archive agree with that. The data files run from May 1993 to December 1993, and the game itself carries the line "ALLOW 4-6 WEEKS FOR DELIVERY — OFFER EXPIRES NOVEMBER 1, 1993".',
          },
          {
            kind: 'paragraph',
            text: 'The roster is the arcade one, with two extra: Kano, Johnny Cage, Rayden, Liu Kang, Scorpion, Sub-Zero and Sonya, plus Goro and Shang Tsung. The fight modes are MIRROR MATCH and three levels of ENDURANCE.',
          },
        ],
      },
      {
        title: 'Download the bundle',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The archive is the upstream file, byte for byte. The checksum below is what you should get.',
          },
          {
            kind: 'table',
            head: ['Field', 'Value'],
            rows: [
              ['File', 'mortal-kombat.zip'],
              ['Size', '3,128,439 bytes'],
              ['SHA-256', '79d860d2acf89533be69bfe93f298b58309dedae14c721f2b24b12d4ab50aa75'],
              ['Contents', '67 files — the game, its graphics and its sound drivers'],
              ['Source', 'dos-bin.zczc.cz archive, mirrored unchanged'],
            ],
          },
          {
            kind: 'links',
            items: [
              {
                label: 'Download 真人快打.zip (3.0 MB)',
                href: '/downloads/dos-games/mortal-kombat.zip',
                external: false,
              },
            ],
          },
        ],
      },
      {
        title: 'Set it up in WhereQ-DOSBox',
        blocks: [
          {
            kind: 'paragraph',
            text: 'This one is the easy case: import the zip, and the app finds MK.EXE on its own and Play starts the game. There is no launcher to set, no driver to load first.',
          },
          {
            kind: 'list',
            items: [
              'Import the zip into WhereQ-DOSBox — open it from the Files app on your phone and choose WhereQ-DOSBox, or use the app\'s own import.',
              'Tap Play. The game starts.',
            ],
          },
          {
            kind: 'paragraph',
            text: 'One thing to leave alone: the bundle contains CRACK.COM, and you should not run it. It prints "File Was NOT Successfully Patched!" and changes nothing — the MK.EXE in this archive is already the finished WOLVERINE crack, so there is nothing left to patch. Running it only wastes a DOS prompt.',
          },
          {
            kind: 'paragraph',
            text: 'The bundle also ships the four sound drivers of the period — ADLIB.DRV, ROLAND.DRV, SBLASTER.DRV and BEEP.DRV. Which one the game picks is up to the sound card DOSBox presents, so if the music is thin, that is the setting to change rather than anything in the archive.',
          },
        ],
      },
      {
        title: 'How to play',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Here is the part that is not written down anywhere. The game starts, and it looks stuck.',
          },
          {
            kind: 'list',
            items: [
              'First screen: a copy-protection prompt that asks for a word. Type any word and press Enter — it takes anything.',
              'Then the title screen and the attract cycle. Press F1 to start the game.',
              'F1 only works while the start screen is up. If a demonstration match is playing, keep pressing F1 — pressing it during a match starts story mode instead.',
              'On the on-screen keyboard, F1 lives in the Fn layer. On a Bluetooth or USB keyboard, press F1 directly: WhereQ-DOSBox forwards hardware keys into DOSBox.',
            ],
          },
          {
            kind: 'paragraph',
            text: 'From F1 you get CHOOSE YOUR FIGHTER. The arrows move the cursor and a punch key — S by default — confirms the fighter you are pointing at. In the match itself the arrows move, the same keys punch and kick, and F10 opens the game\'s own setup.',
          },
          {
            kind: 'paragraph',
            text: 'That setup screen is worth knowing. CONTROL 1: KEYBOARD is where every action is bound: the game asks you to press the key for UP, for DOWN, for LEFT, for RIGHT, then HIGH PUNCH, LOW PUNCH, BLOCK, HIGH KICK and LOW KICK, and whatever you press is what it uses. Because WhereQ-DOSBox forwards a hardware keyboard into DOSBox, you can bind any key you like. The same screen sets the difficulty (VERY EASY to VERY HARD), the speed (LOW (386) or HIGH (486)), the sound card (NO SOUND, SPEAKER, ADLIB, ROLAND, SOUND BLASTER, or ROLAND & SBLASTER) and the control device.',
          },
          {
            kind: 'paragraph',
            text: 'Verified on the emulator: Sonya against Raiden and Sub-Zero against Kano both start, the fighter moves when the arrow is pressed, and the opponent\'s health bar goes down.',
          },
        ],
      },
      {
        title: 'What is in the bundle',
        blocks: [
          {
            kind: 'table',
            head: ['File', 'What it is'],
            rows: [
              ['MK.EXE', 'The game. This is what Play starts.'],
              ['DOS4GW.EXE', 'The 32-bit DOS extender the game runs under.'],
              ['CRACK.COM', 'A patcher for the shareware release. Nothing to patch here — leave it alone.'],
              ['ACCLAIM.GRA, PROBE.GRA', 'The publisher\'s and the developer\'s title graphics.'],
              ['KANO.GRA, NINJA.GRA, RAIDEN.GRA, EMP.GRA, …', 'The graphics of the fighters, one file each.'],
              ['KATT.GRA, SCATT.GRA, SZATT.GRA, …', 'The fighters\' stance and attacking poses.'],
              ['S1HDRS.GRA, FU1HDRS.GRA, MPHDRS.GRA, …', 'The header files the game reads each fighter with.'],
              ['SAMPLES.DAT', 'The sound samples.'],
              ['ADLIB.DRV, ROLAND.DRV, SBLASTER.DRV, BEEP.DRV', 'The sound drivers.'],
            ],
          },
        ],
      },
      {
        title: 'Where the facts come from',
        blocks: [
          {
            kind: 'list',
            items: [
              'The game itself — the copy-protection screen, the title cycle, the fighter select and a live match, all read on the emulator.',
              'MK.EXE\'s own strings: "THE PROBE CONVERSION TEAM:", "OFFER EXPIRES NOVEMBER 1, 1993", and the filenames it opens.',
              'The dates on the files inside the archive, May to December 1993.',
              'The archive listing and checksum of the upstream file.',
            ],
          },
        ],
      },
    ],
  },
];
