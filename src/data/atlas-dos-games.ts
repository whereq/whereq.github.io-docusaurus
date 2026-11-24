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
        text: 'This shelf holds the games that have been played through on an emulator. Every other game in the archive has a page too, in the catalogue at /dos-games/ — the facts read out of the bundle itself, with a download and the setup its shape implies. Those pages say plainly that nobody has played them yet. The shape of every page stays the same as the shelf grows.',
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
    title: 'The whole archive',
    blocks: [
      {
        kind: 'paragraph',
        text: 'The shelf above holds the games that have been played through on an emulator. The catalogue behind it holds every game in the archive — one page each, with the facts read out of the bundle itself, the download, and the setup the bundle\'s own shape implies. Those pages say plainly that nobody has played them yet, and each one carries a comment thread for whoever gets there first.',
      },
      {
        kind: 'paragraph',
        text: 'The catalogue sorts the games into categories — action, role-playing, simulation, strategy and the rest — read off the manifest of the project the bundles were mirrored from and the descriptions that project publishes. A game can be in more than one category, and where it is, it is listed under both.',
      },
      {
        kind: 'links',
        items: [
          {
            label: 'Open the catalogue — every DOS game in the archive',
            href: '/dos-games/',
            external: false,
          },
        ],
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

/**
 * The groups of the shelf — the first letter of each game's name.
 *
 * The shelf holds the games that have been played through on an emulator.
 * The other 1 896 games in the archive have their own pages in the catalogue
 * at /dos-games/, which sits outside the Atlas so that its rail does not
 * carry a thousand entries on every page of the site.
 */
export const DOS_GAMES_GROUPS: AtlasGroup[] = [
  {
    id: 'm',
    title: 'M — names that start with “M”',
    blurb: 'The games on this shelf whose name begins with M.',
  },
  {
    id: 's',
    title: 'S — names that start with “S”',
    blurb: 'The games on this shelf whose name begins with S.',
  },
  {
    id: 'y',
    title: 'Y — names that start with “Y”',
    blurb: 'The games on this shelf whose name begins with Y.',
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
    group: 's',
    related: ['whereq-dosbox'],
    summary:
      'The 1995 KOEI strategy RPG in its Traditional Chinese DOS release. You play Liu Bei, gathering officers and holding the line against Dong Zhuo and the Cao Wei campaign that follows. It is the one game on this shelf that refuses to start when you press Play — it needs a different launcher, and the page says which one.',
    status: '1995',
    url: 'https://dos-bin.zczc.cz/%E4%B8%89%E5%9B%BD%E5%BF%97%E8%8B%B1%E6%9D%B0%E4%BC%A0.zip',
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
              ['Source', 'dos-bin.zczc.cz — the archive this page was generated from'],
            ],
          },
          {
            kind: 'links',
            items: [
              {
                label: 'Download 三国志英杰传.zip (3.4 MB)',
                href: 'https://dos-bin.zczc.cz/%E4%B8%89%E5%9B%BD%E5%BF%97%E8%8B%B1%E6%9D%B0%E4%BC%A0.zip',
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
    group: 'm',
    related: ['whereq-dosbox'],
    summary:
      'The 1993 DOS conversion of Midway\'s arcade fighter, published by Acclaim and converted by Probe. It imports, Play starts it, and then it sits there looking dead — because the copy-protection screen wants a word and the title screen wants F1. Both are written down.',
    status: '1993',
    url: 'https://dos-bin.zczc.cz/%E7%9C%9F%E4%BA%BA%E5%BF%AB%E6%89%93.zip',
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
              ['Source', 'dos-bin.zczc.cz — the archive this page was generated from'],
            ],
          },
          {
            kind: 'links',
            items: [
              {
                label: 'Download 真人快打.zip (3.0 MB)',
                href: 'https://dos-bin.zczc.cz/%E7%9C%9F%E4%BA%BA%E5%BF%AB%E6%89%93.zip',
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
  {
    id: 'sha-qiu-mo-bao',
    collection: 'dos-games',
    name: '沙丘魔堡',
    role: 'The Real-Time Strategy',
    tagline:
      'Dune II in its Chinese release — it starts on its own, and then asks you to click a house.',
    logo: '/img/dos-games/sha-qiu-mo-bao.svg',
    accent: '#B87B3C',
    group: 's',
    related: ['whereq-dosbox'],
    summary:
      'The 1992 Cryo and Virgin Games real-time strategy game, in the Chinese release published by 第三波. Import the zip, press Play, and the batch file runs the intro and the game for you. The one thing the page has to explain is the house-selection screen: it is mouse-driven, and a quick tap moves the cursor without clicking.',
    status: '1992',
    url: 'https://dos-bin.zczc.cz/%E6%B2%99%E4%B8%98%E9%AD%94%E5%A0%A1.zip',
    facts: [
      {label: 'Developer', value: 'Cryo Interactive — with Virgin Games'},
      {label: 'Publisher', value: 'Virgin Games; the Chinese release by 第三波 (Soft-World)'},
      {label: 'Published', value: '1992'},
      {label: 'Platform', value: 'MS-DOS'},
      {label: 'Genre', value: 'Real-time strategy'},
      {label: 'Language', value: 'Traditional Chinese (Big5)'},
      {label: 'Entry point', value: 'DUNE.BAT — picked automatically'},
      {label: 'Bundle', value: '136 files · 1,743,136 bytes'},
    ],
    capabilities: [
      'A real-time strategy game on Arrakis: you build on the map, the enemy house builds back, and the spice is what you are both fighting over.',
      'Two houses — Atreides and Harkonnen — with their own units, buildings and commanders.',
      'A mission map you can open at any time, with the troop positions of every house on it.',
      'Hot-seat for two players on one screen: the panel at the bottom of the screen carries the number of each house.',
    ],
    notice: {
      title: 'About this download',
      text: 'The archive on this page is published for study, communication and preservation only. 沙丘魔堡 is the work of Cryo Interactive and Virgin Games and of the people who made the Chinese release; publishing it here claims none of their rights and waives none of them. If you believe this download breaks a licence, a copyright or any other right, tell us and we will take it down.',
    },
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: '沙丘魔堡 is the Chinese release of Dune II — the 1992 real-time strategy game from Cryo Interactive and Virgin Games. The Chinese title is 第三波\'s own: the intro screen reads VIRGIN GAMES under a Chinese line that says 第三波文化事業 1992 強強滾推出, and the whole game is in Traditional Chinese.',
          },
          {
            kind: 'paragraph',
            text: 'The archive carries the original installer, and it names the authors: INSTALL.EXE holds the line "(c) 1992 Cryo & Virgin Games". That is the game as it shipped — on floppies, with the first disk called out in the installer\'s own text, "INSERT DUNE DISK 1 IN DRIVE A:".',
          },
          {
            kind: 'paragraph',
            text: 'The Chinese release is a translation of the whole thing, not just the interface: the introduction is narrated in Chinese ("在未來的世界裡 人類已發現了無數的星系…"), the map is called 沙丘地圖, and the build panel speaks in the language of the 1990s Chinese localisation.',
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
              ['File', 'sha-qiu-mo-bao.zip'],
              ['Size', '1,743,136 bytes'],
              ['SHA-256', '982268c362a646be6454e8fce29c036a8ce1a1a38710f09c260806c621d5d641'],
              ['Contents', '136 files — the game, its data and its original installer'],
              ['Source', 'dos-bin.zczc.cz — the archive this page was generated from'],
            ],
          },
          {
            kind: 'links',
            items: [
              {
                label: 'Download 沙丘魔堡.zip (1.7 MB)',
                href: 'https://dos-bin.zczc.cz/%E6%B2%99%E4%B8%98%E9%AD%94%E5%A0%A1.zip',
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
            text: 'This one needs no setup at all. The bundle has exactly one batch file, DUNE.BAT, and the app picks it on its own — so import the zip and press Play.',
          },
          {
            kind: 'list',
            items: [
              'Import the zip into WhereQ-DOSBox — open it from the Files app on your phone and choose WhereQ-DOSBox, or use the app\'s own import.',
              'Open the game\'s row and tap Play. The app starts DUNE.BAT.',
              'DUNE.BAT turns the sound off, plays the intro logo and starts the game with the switches the release was made for.',
            ],
          },
          {
            kind: 'paragraph',
            text: 'The whole of DUNE.BAT is three lines: @echo off, logo, and then duneprg CHIVGA SDB22227 EMS 386. The first runs LOGO.EXE, which is the Virgin and 第三波 title card. The second starts DUNEPRG.EXE with the language and display switches for the Chinese text on VGA, a Sound Blaster setting, and expanded memory on a 386.',
          },
          {
            kind: 'paragraph',
            text: 'Do not run INSTALL.EXE. It is the 1992 floppy installer: it wants DUNE DISK 1 in drive A:, asks for 2 500 KB of free space, and copies the game to C:\\DUNE. The archive is already the installed layout — the installer would only put the game in the wrong place.',
          },
        ],
      },
      {
        title: 'How to play',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The intro plays first: the Virgin Games logo, then the Chinese line naming 第三波, and then a narrated introduction over a desert scene. Press Space on the on-screen keyboard to step through the narration — one press, one line.',
          },
          {
            kind: 'paragraph',
            text: 'Then the house-selection screen comes up: a throne room, the name of a house on the panel at the bottom, and the mouse cursor. This is the one screen where the mouse matters, and the app needs a little care with it.',
          },
          {
            kind: 'list',
            items: [
              'Give DOSBox the mouse first: press RMB on the on-screen keyboard (or the right mouse button on a Bluetooth keyboard) to switch mouse capture on.',
              'Move the cursor with the arrow keys on the on-screen keyboard. The cursor is the arrow on the picture; the arrow keys move it.',
              'A quick tap only moves the cursor — it does not click. Hold the press for about half a second before letting go, and the click lands.',
              'Click the house crest at the top-left or the top-right of the screen to take that house.',
              'Click the player number in the panel at the bottom — 1 or 2 — to confirm, and the world map comes up.',
            ],
          },
          {
            kind: 'paragraph',
            text: 'The world map is 沙丘地圖, and the panel below it reads 結束地圖模式 — that is the hint for the control pad on the right, and pressing it takes you back out of the map. The panel carries the numbers of the houses in play, so a second player can take the other house on the same screen.',
          },
          {
            kind: 'paragraph',
            text: 'Verified on the emulator: the intro plays, the house is taken, and the world map opens with the base on it and the map panel showing the troop count. The build phase was not played through — that is the next thing to work out, and the comments on this page are where it should go.',
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
              ['DUNE.BAT', 'The launcher the app starts. Plays the logo, then the game.'],
              ['DUNEPRG.EXE', 'The game itself.'],
              ['LOGO.EXE', 'The Virgin Games and 第三波 title card, played by the batch file.'],
              ['INSTALL.EXE', 'The 1992 floppy installer. Do not run it — the archive is already installed.'],
              ['*.HSQ', 'The game\'s data: the map, the units, the buildings, the dialogue, the manual.'],
              ['*.AGD, *.M32', 'The same data in other formats — the game\'s own compression and its 32-bit build.'],
              ['FONT16.16P', 'The bitmap font the game draws its text with.'],
              ['TABLAT.BIN, VERBIN.BIN', 'The building table and the version block.'],
              ['DUNE23S0.SAV, DUNE23S3.SAV, DUNE23S4.SAV', 'Saved games that came with the release.'],
              ['WOR16.FON, WOR16.ASC', 'The word font — this is what puts the Chinese text on the screen.'],
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
              'The game itself — the intro card, the narrated introduction, the house-selection screen and the world map, all read on the emulator.',
              'DUNE.BAT, read out of the archive: @echo off, logo, duneprg CHIVGA SDB22227 EMS 386.',
              'INSTALL.EXE\'s own strings: "(c) 1992 Cryo & Virgin Games", "INSERT DUNE DISK 1 IN DRIVE A:", "Free disk space= 2500 Kb", and the files it writes.',
              'The archive listing and checksum of the upstream file.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'yan-long-qi-shi-tuan-ii-huang-jin-cheng-zhi-mi',
    collection: 'dos-games',
    name: '炎龙骑士团II‧黄金城之谜',
    role: 'The Fantasy Strategy',
    tagline:
      "Dynasty's fantasy strategy game — it starts on its own, and the first chapter plays as a film.",
    logo: '/img/dos-games/yan-long-qi-shi-tuan-ii-huang-jin-cheng-zhi-mi.svg',
    accent: '#9B1B30',
    group: 'y',
    related: ['whereq-dosbox'],
    summary:
      'The 1995 sequel to 炎龙骑士团, in its Traditional Chinese DOS release. Import the zip and press Play: the app picks FD2.EXE and the game runs, intro animation and all. The page writes down the route in — which key skips the film, how the story dialogue advances, how you move on the field map, and how a battle is fought down to the damage and the experience points.',
    status: '1995',
    url: 'https://dos-bin.zczc.cz/%E7%82%8E%E9%BE%99%E9%AA%91%E5%A3%AB%E5%9B%A22%E9%BB%84%E9%87%91%E5%9F%8E%E4%B9%8B%E8%B0%9C.zip',
    facts: [
      {label: 'Developer', value: '漢堂國際資訊 — Dynasty International Information Co., Ltd'},
      {label: 'Published', value: '1995 — the newest date inside the bundle is 18 January 1995'},
      {label: 'Platform', value: 'MS-DOS — 32-bit protected mode (DOS/4GW)'},
      {label: 'Genre', value: 'Strategy RPG (戰棋) with tactical battles'},
      {label: 'Language', value: 'Traditional Chinese (Big5)'},
      {label: 'Entry point', value: 'FD2.EXE — picked automatically'},
      {label: 'Sound', value: 'Miles Design Audio Interface Library V3.02, of 18 January 1995'},
      {label: 'Bundle', value: '47 files · 8,155,666 bytes'},
    ],
    capabilities: [
      'An opening chapter that plays as a film: a castle under the moon, the two kings on their thrones, and Saul before his father.',
      'A field map you walk around a tile at a time, with characters who talk when you walk into them.',
      'A tactical layer under the story: a command ring of four icons around the selected character — physical attack, spell attack, items, rest — that ends in a real battle. Move a character next to an enemy, take the attack from the ring, and the screen darkens into a night scene with a sword coming down: the pirate loses HP and the game hands out 31 experience points.',
      'A full sound system in the bundle — the Miles Design library, with drivers for the Ad Lib, the Roland, the Sound Blaster, the Tandy and the Yamaha, and SETSOUND.EXE to pick one.',
      'The game data in plain files: the animations in ANI.DAT, the character shapes in FDSHAP.DAT, the fields in FDFIELD.DAT, the text in FDTXT.DAT and the icons in FDICON.B24.',
    ],
    notice: {
      title: 'About this download',
      text: 'The archive on this page is published for study, communication and preservation only. 炎龙骑士团II‧黄金城之谜 is the work of 漢堂國際資訊股份有限公司 (Dynasty International Information Co., Ltd) and of the people who made it; publishing it here claims none of their rights and waives none of them. If you believe this download breaks a licence, a copyright or any other right, tell us and we will take it down.',
    },
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: '炎龙骑士团II‧黄金城之谜 — Fantasy War 2, in its Traditional Chinese DOS release. The title screen names the company that made it: 漢堂, under the English line DYNASTY INTERNATIONAL INFORMATION CO., LTD.',
          },
          {
            kind: 'paragraph',
            text: 'It is a 32-bit program. FD2.EXE is a DOS/4GW executable — Rational Systems\' protected-mode run-time, copyright 1987 to 1993 — carrying a WATCOM C/C++ 32-bit run-time of its own. The bundle\'s own newest date is the audio library, Miles Design Audio Interface Library V3.02 of 18 January 1995, which is where the 1995 comes from.',
          },
          {
            kind: 'paragraph',
            text: 'The sound is set up already. DIG.INI and MDI.INI both point at a Creative Labs Sound Blaster 16 on port 220h — SB16.DIG and SBPRO2.MDI — so the game has sound without any setup of your own.',
          },
        ],
      },
      {
        title: 'Download the bundle',
        blocks: [
          {
            kind: 'paragraph',
            text: 'This is the original copy from the archive the page was generated from. The checksum below is what you should get.',
          },
          {
            kind: 'table',
            head: ['Field', 'Value'],
            rows: [
              ['File', '炎龙骑士团II‧黄金城之谜.zip'],
              ['Size', '8,155,666 bytes'],
              ['SHA-256', 'bd241b639ad5e122faf6996e4dd000fdd3b2a5d7bd55709df17db517e9962ed1'],
              ['Contents', '47 files — the game, its data and its sound drivers'],
              ['Source', 'dos-bin.zczc.cz — the archive this page was generated from'],
            ],
          },
          {
            kind: 'links',
            items: [
              {
                label: 'Download 炎龙骑士团II‧黄金城之谜.zip (7.8 MB)',
                href: 'https://dos-bin.zczc.cz/%E7%82%8E%E9%BE%99%E9%AA%91%E5%A3%AB%E5%9B%A22%E9%BB%84%E9%87%91%E5%9F%8E%E4%B9%8B%E8%B0%9C.zip',
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
            text: 'There is nothing to set up. The bundle has one executable that matters, FD2.EXE, and the app finds it on its own — so import the zip and press Play.',
          },
          {
            kind: 'list',
            items: [
              'Import the zip into WhereQ-DOSBox — open it from the Files app on your phone and choose WhereQ-DOSBox, or use the app\'s own import.',
              'Open the game\'s row and tap Play. The app writes a RUN.BAT in the game folder and runs FD2 from it.',
              'Wait. The first thing on the screen is the DOSBox banner, and then the game\'s own title animation.',
            ],
          },
          {
            kind: 'paragraph',
            text: 'Do not run SETSOUND.EXE unless the sound is wrong. It is the Miles configuration tool, and it writes DIG.INI and MDI.INI — which are already in the archive, already pointing at a Sound Blaster 16 on port 220h. The game reads them as they are.',
          },
        ],
      },
      {
        title: 'How to play',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The opening is a film, and it is a long one: a castle under the moon, a face made of red brush strokes, the 漢堂 card, and the silver 2 over the red wordmark. Press Space on the on-screen keyboard to skip through it.',
          },
          {
            kind: 'paragraph',
            text: 'After the film comes the title menu: START, LOAD and CONTINUE, in English, on a blue screen with a red banner. Space starts a new game — the mouse does not work on this screen, so use the keyboard.',
          },
          {
            kind: 'paragraph',
            text: 'Then the story plays as a dialogue, with a portrait on the right and the text on the left. The first line is 『兒臣索爾，晉見父王陛下』 — Saul before his father the king — and in the throne room a little later: 『到這裡來，讓义王好好看看你。這一陣子國務繁忙，我們父子兩個也很久沒聚聚了』. Space, Enter and Escape all move the dialogue along.',
          },
          {
            kind: 'paragraph',
            text: 'After the story you are on the field: a map of grass and paths, with your character standing on it and other people around. The arrow keys move. Walk into someone and the game starts talking to them — the first character you meet says 『……唉！』 and the game goes on from there.',
          },
          {
            kind: 'paragraph',
            text: 'Verified on the emulator: the game starts from Play with nothing else to do, the title menu comes up, the intro and the story play, the Chinese text is all there, the character walks on the map and the conversations start. The field map and the battle interface were then taken apart as well — the next section writes down what is on the screen, what each key does, and how a battle is fought from the first move to the experience points.',
          },
        ],
      },
      {
        title: 'The field map, the command ring and a landed attack',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The field map is a tile grid that the camera follows. The arrow keys move the cursor one tile at a time, and the little panel in the bottom-right corner always describes the tile the cursor is standing on: a picture of the ground plus the attack and defence modifiers that the terrain gives. Plain ground reads A+05 D+00, and a forest reads A-05 D+10 — the forest\'s pair is exactly what the game\'s own rules give for 森林 (−5% AP, +10% DP).',
          },
          {
            kind: 'paragraph',
            text: 'Stand the cursor on one of your own people and press Space or Enter, and the game opens that character\'s window: name, class, level, HP, MP, DX, MV, HIT, AP, EV, DP, and the equipment with the AP and DP it adds. 悠妮 is a 人類 法師 at LV.01 with EX·00, HP 028/028, MP 008/008, DX·001, MV·04, HIT·086, AP·011, EV·001 and DP·007; 亞雷斯 is a 人類 騎士 at LV.01 with EX·00, HP 048/048, MP 000/000, DX·002, MV·07, HIT·092, AP·026, EV·002 and DP·006, carrying a 刺矛 (+AP 020) and 布衣 (+DP 002); 蓋亞 is a 機械 機兵 at LV.01 with HP 050/050, MP 000/000, DX·002, MV·04, HIT·092, AP·022, EV·002 and DP·014, carrying a 威力手臂 (+AP 015) and a 戰鬥裝甲 (+DP 008).',
          },
          {
            kind: 'paragraph',
            text: 'Around the selected character the game draws a ring of four command icons, and the layout is the one the game\'s own player notes describe: 上 physical attack, 左 spell attack, 右 items, 下 rest. The attack icons are drawn on a red plate and the other two on a blue one — the red plate is the command that is usable at that moment, and Space, Enter and Ins confirm it. The spell icon animates with sparks around it. Press Space on the character and the ring opens; press it again on a mage and the spell list comes up — 悠妮 knows one spell, 火炎術, priced at MP 02. Stand on empty ground, press Space, and a different ring opens instead: the field menu with 系統選單, 行軍, 設定 and 結束本回合, and Enter on it opens the system menu, which reads MAP·01 TURN·001, lists the victory condition 敵全滅 and the failure condition 索爾死亡, and counts the field as ENEMY·07 FRIEND·04 NPC·00 with ¥00000000 in the treasury.',
          },
          {
            kind: 'paragraph',
            text: 'F1 opens the global map — the whole field at a glance, with our side in blue and the enemy in red. The enemy on this map is a group of masked pirates, red headband over a dark visor, and their numbers are readable: put the cursor on one and the panel shows its HP (028) as it shows a character\'s.',
          },
          {
            kind: 'paragraph',
            text: 'Moving a character is two steps. Put the cursor on one of your own people and press Space: the game enters 進行移動, the character\'s stats appear in the panel at the top left, and the arrow keys now walk the cursor around while the tile panel follows it. Press Space again and the character walks to the tile the cursor was standing on. We moved 亞雷斯 three tiles west and two tiles south, from the path in the north to the grass next to a pirate.',
          },
          {
            kind: 'paragraph',
            text: 'Standing next to the enemy brings the command ring up around 亞雷斯, and now 物理攻擊 is the one on the red plate — the others turn blue. Space picks the target: the cursor jumps onto the pirate and its HP shows in the panel. One more Space lands the hit. The screen darkens into a night scene with a crescent moon and a sword comes slashing down, with 亞雷斯 LV·01 HP 048 MP 000 on one side and 盜賊 LV·02 on the other. The pirate went from 028 HP to 007 HP, and the game paid for the hit: 得到經驗31點！ — 31 experience points, shown on a panel with the character\'s portrait. Press Space on the enemy itself and the game opens its whole sheet: 盜賊, 人類 盜賊, LV·02, HP 007/028, EX 007/028, DX·002, MV·04, HIT·097, AP·024, EV·002, DP·004, carrying a 短劍 (+AP 010) and a 布衣 (+DP 002).',
          },
          {
            kind: 'paragraph',
            text: 'What is still open: the enemy turn. The 結束本回合 entry of the field menu is reachable — Ins on it pops 要結束本回合的行動嗎？ with YES and NO and 悠妮\'s portrait — but the answer could not be given from the app, so the enemies have not been seen to move or to strike back. The ring also only ever confirms its red entry: the direction keys moved the map cursor but never changed which icon the ring had picked, and neither did long key holds, Android key events, the numeric keypad scancodes, or taps and drags on the icons themselves. That is what the comments on this page are for.',
          },
          {
            kind: 'paragraph',
            text: 'The control scheme above is the game\'s own, not ours: the four commands around a character and the four entries of the field menu are laid out exactly as the game\'s player notes and the Chinese walkthroughs describe them — 人物處按確定：上面：物理攻擊，左面：法術攻擊，下面：休息，右面：物品裝備, and 空白處按確定：上=系統選單，左=行軍，右=設定，下=結束本回合.',
          },
          {
            kind: 'links',
            items: [
              {
                label: '炎龍騎士團2 新手提示 — the game\'s own player notes (chiuinan.github.io)',
                href: 'http://chiuinan.github.io/game/game/intro/ch/c31/fd2/fd2/notes.htm',
                external: true,
              },
              {
                label: '《炎龙骑士团2黄金城之谜》最全游戏攻略 — the command layout (bilibili)',
                href: 'https://www.bilibili.com/read/cv21183751/',
                external: true,
              },
            ],
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
              ['FD2.EXE', 'The game. This is what Play starts.'],
              ['ANI.DAT', 'The animations — the intro, the portraits, the map figures.'],
              ['FDSHAP.DAT, FDFIELD.DAT, FDOTHER.DAT', 'The character shapes, the fields and everything else the game draws with.'],
              ['FDTXT.DAT, TITLE.DAT', 'The text, and the title-screen data.'],
              ['FDICON.B24', 'The icons.'],
              ['FDMUS.DAT, TAI.DAT', 'The music.'],
              ['FD2.SAV, FD2.TMP', 'The save file and its working copy.'],
              ['DIG.INI, MDI.INI', 'The Miles sound configuration, already set for a Sound Blaster 16 on 220h.'],
              ['SETSOUND.EXE', 'The Miles configuration tool. You do not need it.'],
              ['SB16.DIG, SBPRO2.MDI, ADLIB.MDI, ROLAND.MDI, TANDY.MDI, YAMAHA.MDI, …', 'The sound drivers — one for each kind of card the library knows.'],
              ['SAMPLE.AD, SAMPLE.OPL, SAMPLE.BNK', 'The instruments and the sound banks.'],
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
              'The game itself — the DOSBox banner, the title animation, the 漢堂 card, the opening dialogue, the field map, the command ring, the character windows, the global map, the system menu and a whole battle: the move, the target, the night attack scene, the damage and the experience award, all read on the emulator.',
              'The game\'s own player notes for the control scheme — 新手提示 (操作): 方向鍵 = 移動游標, Space/Enter/Ins+己方人員：進行移動，移動後 上=攻擊，左=施法，右=物品，下=休息, Space/Enter/Ins+空地：上=系統選單，左=行軍，右=設定，下=結束本回合, and the terrain table that gives 一般 +5% AP / −5% DP and 森林 −5% AP / +10% DP.',
              'The Chinese walkthrough for the ring layout — 人物處按確定：上面：物理攻擊，左面：法術攻擊，下面：休息，右面：物品裝備 — and 空白處按確定：上=系統選單，左=行軍，右=設定，下=結束本回合.',
              'The title screen\'s own line: DYNASTY INTERNATIONAL INFORMATION CO., LTD.',
              'FD2.EXE\'s own strings: "DOS/4G Copyright (C) Rational Systems, Inc. 1987 - 1993" and the WATCOM C/C++ 32-bit run-time.',
              'DIG.INI and MDI.INI out of the archive: "Miles Design Audio Interface Library V3.02 of 18-Jan-95", SB16.DIG and SBPRO2.MDI at 220h.',
              'The archive listing and checksum of the upstream file.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'san-guo-zhi-iii',
    collection: 'dos-games',
    name: '三国志III',
    role: 'The Grand Strategy',
    tagline:
      "KOEI's 1993 war of the Three Kingdoms — and it will not start unless you change the command the app runs.",
    logo: '/img/dos-games/san-guo-zhi-iii.svg',
    accent: '#B32A17',
    group: 's',
    related: ['whereq-dosbox'],
    summary:
      'The third of KOEI\'s Three Kingdoms games, in its Simplified Chinese DOS release. Import the zip, then change one line: the app starts MAIN.EXE on its own and the game exits at once — the launcher is KOEI.COM. Once that is set, the whole game opens: the opening cards with their poems, the dragon and the tiger, six scenarios from 189 to 235, and a map of China you run a war from.',
    status: '1993',
    url: 'https://dos-bin.zczc.cz/%E4%B8%89%E5%9B%BD%E5%BF%973.zip',
    facts: [
      {label: 'Developer', value: 'KOEI CO., LTD. (光荣) — named in the bundle\'s own FM sound driver'},
      {label: 'Published', value: '1993 — 23 of the bundle\'s 35 files carry that year'},
      {label: 'Platform', value: 'MS-DOS — 16-bit real mode'},
      {label: 'Genre', value: 'Grand strategy — territories, cities, officers and battles'},
      {label: 'Language', value: 'Simplified Chinese'},
      {label: 'Entry point', value: 'KOEI.COM — you have to set this by hand'},
      {label: 'Bundle', value: '35 files · 2,260,444 bytes'},
    ],
    capabilities: [
      'Six scenarios, from 靈帝沒落 董卓進京 in 189 to 臥龍歸天 姜維繼志 in 235 — each one starts on a different date, in a different situation.',
      'A map of the whole of China, with cities in the colour of their lord, roads, rivers and mountains, and the armies drawn as flags on it.',
      'A full command set at the top of the screen — 休養, 軍事, 人事, 外交, 情報, 開發, 謀略, 商人, 特別 and 功能 — and a market panel quoting the price of rice, bows and horses.',
      'A roster of every officer with his 武力, and a conscription that takes men away from the city and puts them under a general.',
      'An opening of cards: a dithered picture — a warrior\'s head, a city gate — with a poem written down it in vertical columns.',
    ],
    notice: {
      title: 'About this download',
      text: 'The archive on this page is published for study, communication and preservation only. 三国志III is the work of KOEI CO., LTD. and of the people who made it; publishing it here claims none of their rights and waives none of them. If you believe this download breaks a licence, a copyright or any other right, tell us and we will take it down.',
    },
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: '三国志III — Romance of the Three Kingdoms III, in its Simplified Chinese DOS release. It is a grand strategy game: a map of the whole of China, the cities on it, the officers who hold them, and the markets they trade in. The archive calls it 三国志III, and this copy is the Chinese one — every word on the screen is 简体.',
          },
          {
            kind: 'paragraph',
            text: 'The bundle names its own maker. FMDRV.COM — the FM sound driver the launcher loads — carries the line "Copyright (C) 1991 KOEI CO.,LTD. JAPAN", and the game\'s own DOS shell is KOEI.COM. That shell is written into the bundle\'s SHELL.SYS, the file DOS reads at boot to decide what the command prompt is.',
          },
          {
            kind: 'paragraph',
            text: 'The copy is dated 1993: 23 of its 35 files carry that year, and the game\'s own program, MAIN.EXE, is dated 3 January 1994. The Chinese text is all there — the menus, the scenario list, the officers\' names and the orders you give them are in 简体, not in a Japanese or English release.',
          },
          {
            kind: 'paragraph',
            text: 'The whole game is one directory of plain files: three executables, two COM loaders, the Chinese 16-dot fonts, six scenario files and a stack of .DAT data files. Nothing is compressed and nothing needs installing.',
          },
        ],
      },
      {
        title: 'Download the bundle',
        blocks: [
          {
            kind: 'paragraph',
            text: 'This is the original copy from the archive the page was generated from. The checksum below is what you should get.',
          },
          {
            kind: 'table',
            head: ['Field', 'Value'],
            rows: [
              ['File', '三国志3.zip'],
              ['Size', '2,260,444 bytes'],
              ['SHA-256', '515ec3ed07caf4948a92923388350ade12df279807c2510b0fdb51bf39f95216'],
              ['Contents', '35 files — the game, its data and its DOS shell'],
              ['Source', 'dos-bin.zczc.cz — the archive this page was generated from'],
            ],
          },
          {
            kind: 'links',
            items: [
              {
                label: 'Download 三国志3.zip (2.2 MB)',
                href: 'https://dos-bin.zczc.cz/%E4%B8%89%E5%9B%BD%E5%BF%973.zip',
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
            text: 'There is one thing to change, and the app will not do it for you. Import the zip, open the game\'s row and tap Launch… — the command the app would run by itself is MAIN.EXE, and MAIN.EXE on its own exits immediately and drops you back at the DOS prompt. The launcher is KOEI.COM.',
          },
          {
            kind: 'list',
            items: [
              'Import the zip into WhereQ-DOSBox — open it from the Files app on your phone and choose WhereQ-DOSBox, or use the app\'s own import.',
              'Open the game\'s row and tap Launch….',
              'Tap Clear, then tap the KOEI.COM chip. The script line reads KOEI, and that is right — DOS adds the .COM itself.',
              'Tap Play. The app writes a RUN.BAT in the game folder and runs KOEI from it.',
            ],
          },
          {
            kind: 'paragraph',
            text: 'What KOEI.COM does, in order: it loads FMDRV.COM as the resident sound driver, then runs OPEN.EXE, then MAIN.EXE, and END.EXE when the game ends. The names are all in the launcher\'s own strings, in that order.',
          },
          {
            kind: 'paragraph',
            text: 'There is no installer to run and nothing to configure. Do not run OPEN.EXE or END.EXE yourself — KOEI.COM runs them for you, in the right order.',
          },
        ],
      },
      {
        title: 'How to play',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The opening is a run of cards. Each one is a dithered picture — a warrior\'s head in blue, a city gate — with a poem written down it in vertical columns. The first is 滾滾長江東逝水，浪花淘盡英雄, the poem that opens the Romance; the later ones tell the Yellow Turban rising — 十常侍弄權柄，陷害忠良亂朝廷。中平元年關癘氣，大賢良師他自稱。張角舉事造黃旗. Space moves the cards along.',
          },
          {
            kind: 'paragraph',
            text: 'The cards are followed by the password screen, and then the dragon and the tiger, and a card that says 「使用滑鼠時，請按滑鼠鍵. 使用鍵盤時，請接著鍵入.」 — use the mouse, or press a key to type. Press Enter and the title menu comes up: 1. 開始新遊戲, 2. 從進度檔案載入進度, 3. 登錄新武將.',
          },
          {
            kind: 'paragraph',
            text: 'Every menu in this game is a numbered one. Type the number and press Enter. A new game asks, in order: how many people are playing (0 to 8), which of the six scenarios, which lord you are, how hard (初級 or 高級), whether you want to watch the other countries\' wars first, and whether it is 史實型 (history happens) or 假想型 (history does not). It then shows the whole setup back to you and asks 全部都可以了嗎(Y/N)?.',
          },
          {
            kind: 'paragraph',
            text: 'The main screen is a map of China. Across the top is the command row — 0.休養 1.軍事 2.人事 3.外交 4.情報 5.開發 6.謀略 7.商人 8.特別 9.功能 — and the bottom line asks you what you want to do: 『劉備，請向23.新野下命令(0-9)?』. The panel on the right is the city you are standing in: its population, its gold, its grain, its soldiers, its officers and its mood, with the market prices beside it and your ruler\'s portrait below.',
          },
          {
            kind: 'paragraph',
            text: 'Under 軍事 there are nine more: 移動, 輸送, 戰爭準備, 戰爭, 徵兵, 募兵, 訓練, 再編成 and 造船. Taking 徵兵 asks 派誰徵兵(0-13)? and opens a roster of your officers with their 武力; type the number of the officer you want, press Enter, and the game asks 徵兵幾百人(1-38)?. The men are taken, the city\'s soldiers go up, and the leftover is offered to another general.',
          },
          {
            kind: 'paragraph',
            text: 'One wrinkle worth knowing: when a roster of names is on screen, typing the number does not select the officer straight away — it moves the marker to that entry and marks it with a star. Press Enter as well, and the game takes it.',
          },
          {
            kind: 'paragraph',
            text: 'Verified on the emulator: the game starts from the KOEI.COM launcher, the opening cards and the dragon and tiger play, the title menu opens, a new game is set up from scratch, the map of China comes up, the 軍事 menu opens, and 徵兵 was carried through to the end — 100 soldiers recruited and the city\'s numbers changed. A battle was not fought, and the password screen was passed with the word "abc" rather than the one the game shows.',
          },
        ],
      },
      {
        title: 'The password screen',
        blocks: [
          {
            kind: 'paragraph',
            text: 'After the opening cards, before the dragon and the tiger, the game asks 密碼: and, under it, 請輸入正確密碼 with the answer in red brackets — [孫李李]. That is the copy-protection screen, and in this release it does not check: the word "abc" was typed, Enter pressed, and the game carried on as if it had been right.',
          },
          {
            kind: 'paragraph',
            text: 'So you do not have to type 孫李李 — and you cannot easily, since the on-screen keyboard has no Chinese characters on it. Type anything and press Enter.',
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
              ['KOEI.COM', 'The launcher — 694 bytes, and the file named in SHELL.SYS. It chains FMDRV.COM → OPEN.EXE → MAIN.EXE → END.EXE.'],
              ['FMDRV.COM', 'The resident FM sound driver. Carries "Copyright (C) 1991 KOEI CO.,LTD. JAPAN".'],
              ['OPEN.EXE, MAIN.EXE, END.EXE', 'The three programs the launcher runs, in that order. MAIN.EXE is dated 3 January 1994, and on its own it exits at once — the chain is not optional.'],
              ['SHELL.SYS', 'Ten bytes: KOEI.COM. It is what DOS boots into.'],
              ['SANGOKU3.SAV', 'The save file.'],
              ['HAN.16P, NAME.16P', 'The fonts the game draws its Chinese text with — .16P is a 16-pixel dot font.'],
              ['SNDATA1–6.CIM, SNDATA1–6B.CIM', 'The six scenarios, and a second set beside each of them.'],
              ['MAPDATA.DAT, GRPDATA.DAT, KAODATA.DAT, PACKDATA.DAT, …', 'The map, the graphics, the officer data and the rest of the game\'s data.'],
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
              'The game itself — the opening cards, the password screen, the dragon and the tiger, the title menu, the scenario list, the map of China, the 軍事 menu and the 徵兵 that was carried through, all read on the emulator.',
              'FMDRV.COM\'s own string: "Copyright (C) 1991 KOEI CO.,LTD. JAPAN".',
              'KOEI.COM\'s own strings: the four programs it chains, and its error messages — "DISK ERROR  HIT ENTER to RETRY", "Not enough memory.", "$ : cannot execute.", "$ : file access failure.", "$ : password error occurred."',
              'SHELL.SYS out of the archive: KOEI.COM.',
              'The archive listing and checksum of the upstream file.',
            ],
          },
        ],
      },
    ],
  },
];
