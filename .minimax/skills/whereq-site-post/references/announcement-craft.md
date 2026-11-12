# Announcement craft — how a WhereQ post should read

## What an announcement is

The News page says it plainly: an announcement is **a curated article written
in this project**, not a release tag and not a changelog. The ledger behind it
holds the release history; the announcement holds the story.

So the post answers "why does this matter?" and the app's repo answers "how
did they build it?". Sending the reader to the repo for detail is a feature,
not a dodge — but only if the post itself is worth reading.

## The shape that works

1. **Open with the human thing.** The memory, the problem, the moment that
   made it worth building. Not "We are pleased to announce".
2. **One turn of the story.** The world before, the world now, why the gap
   matters.
3. **The product, concretely.** What it is, what it does, what it feels like
   to use. The screenshot goes here, right after the reader has been given a
   reason to care.
4. **The honest technical note.** Two or three real facts — the size, the
   platforms, the licence — and a link to the repo. State plainly that the
   post is not the documentation.
5. **Why it was put into the world.** The reason beyond the feature.
6. **Credits.** Anyone the work rests on, named, with links. This is the
   section readers remember, and it is the one that gets skipped. Don't.

## Voice

- First person, plain sentences. "I built this because…", not "this project
  aims to address…".
- Concrete nouns over adjectives. A beige tower, a blinking cursor, a disk
  that read badly — not "nostalgic computing experiences".
- The reader is smart and busy. Respect that with short paragraphs.
- Earn the emotion, don't perform it. One specific memory lands harder than
  three paragraphs of sentiment.

## Bilingual pairing

The Chinese post is a **rewrite for a Chinese reader**, not a translation
ticket. Keep product names, commands and identifiers verbatim (`DOSBox`,
`C:\>`, `libdosbox.so`, `GPL-2.0`). Translate the *framing*, the *transitions*
and the *emotional register* so the Chinese text reads as though it was
written in Chinese — because it was.

Watch for these leaks:

- English function words mid-sentence ("现在说来都算 classic") — either
  translate the word or accept the English as a loanword in a place a
  Chinese reader would naturally use one.
- Traditional characters slipping into a simplified-Chinese post.
- Headings that read as translated headings. Chinese headings are often
  shorter and more concrete than their English originals.

Both posts carry the same section structure so a reader can follow one and
then the other, and so a future editor can diff them.

## Images

- One hero image at the top: the logo, themed for light and dark via
  `ThemedImage` (see `site-structure.md` for why `<picture>` is wrong here).
- The screenshot next to the paragraph that earns it.
- The screenshot needs a caption that says what the reader is looking at.

## Credits

Name every project the work rests on, with a link, and say what each one
contributed. If the work is a derivative, say so and honour the upstream's
licence and trademark notice in the same breath. An announcement that takes
credit silently is the fastest way to make an open-source project look
hostile.

## Length

Eight minutes of reading time is a reasonable ceiling for an announcement.
If the draft runs long, the middle is where the tech detail crept in — cut
that first, not the ending.
