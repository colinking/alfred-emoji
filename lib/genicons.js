'use-strict'

// Based on https://stackoverflow.com/a/43808972/7979

const fs = require('fs')
const fontkit = require('fontkit')

const emojiMetadata = require('unicode-emoji-json/data-by-emoji.json')
const ordering = require('unicode-emoji-json/data-ordered-emoji.json')
const allModifiers = require('unicode-emoji-json/data-emoji-components.json')
// Hair modifiers are already applied to the emoji list. We have to generate
// skin-tone modified emojis ourselves.
const skinToneModifiers = [
  allModifiers.light_skin_tone,
  allModifiers.medium_light_skin_tone,
  allModifiers.medium_skin_tone,
  allModifiers.medium_dark_skin_tone,
  allModifiers.dark_skin_tone
]

// The following emojis do not have a corresponding emoji in Apple's emojiset.
const unsupportedEmojis = new Set(['♀️', '♂️', '⚕️'])

const font = fontkit.openSync('/System/Library/Fonts/Apple Color Emoji.ttc').fonts[0]

const saveIcon = (layout, name) => {
  const glyph = layout.glyphs[0].getImageForSize(64)
  fs.writeFileSync(`${process.env['PWD']}/${name}.png`, glyph.data)
}

let exitCode = 0
for (const emoji of ordering) {
  if (unsupportedEmojis.has(emoji)) {
    continue
  }

  try {
    const metadata = emojiMetadata[emoji]
    const name = metadata.name
    const layout = font.layout(emoji)

    saveIcon(layout, name)

    if (metadata.fitzpatrick_scale) {
      skinToneModifiers.forEach((modifier, index) => {
        const layout = font.layout(emoji + modifier)
        saveIcon(layout, `${name}_${index}`)
      })
    }
  } catch (e) {
    console.error('Could not generate icon for "%s": %s', emoji, e.message)
    exitCode = -1
  }
}

process.exit(exitCode)
