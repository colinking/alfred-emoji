'use strict'

// const emojiNames = emojilib.ordered
// const modifiers = emojilib.fitzpatrick_scale_modifiers

const emojiMetadata = require('unicode-emoji-json/data-by-emoji.json')
const ordering = require('unicode-emoji-json/data-ordered-emoji.json')
const allModifiers = require('unicode-emoji-json/data-emoji-components.json')
const keywords = require('./emoji-keywords.json')
// Hair modifiers are already applied to the emoji list. We have to generate
// skin-tone modified emojis ourselves.
const skinToneModifiers = [
  allModifiers.light_skin_tone,
  allModifiers.medium_light_skin_tone,
  allModifiers.medium_skin_tone,
  allModifiers.medium_dark_skin_tone,
  allModifiers.dark_skin_tone
]

const withOptionalModifier = (metadata, emoji, opts) => {
  if (metadata.fitzpatrick_scale && opts.skinTone && opts.skinTone >= 0 && opts.skinTone < 5) {
    return {
      emoji: emoji + skinToneModifiers[opts.skinTone],
      name: `${metadata.name}_${opts.skinTone}`
    }
  }

  return {
    emoji,
    name: metadata.name
  }
}

const toAlfredItems = (emojis, opts) => {
  const items = []

  for (const emoji of emojis) {
    const metadata = emojiMetadata[emoji]
    const name = metadata.name
    const { emoji: modifiedEmoji, name: modifiedName } = withOptionalModifier(metadata, emoji, opts)

    items.push({
      uid: name,
      title: name,
      subtitle: `${opts.verb} "${modifiedEmoji}" (${name}) ${opts.preposition}`,
      arg: modifiedEmoji,
      autocomplete: name,
      icon: { path: `./icons/${modifiedName}.png` },
      mods: {
        alt: {
          // Alt pastes the code instead of the emoji:
          subtitle: `${opts.verb} ":${name}:" (${modifiedEmoji}) ${opts.preposition}`,
          arg: `:${name}:`
        },
        shift: {
          // Shift should remove modifiers:
          subtitle: `${opts.verb} "${emoji}" (${name}) ${opts.preposition}`,
          arg: emoji,
          icon: { path: `./icons/${name}.png` }
        }
      }
    })
  }

  return { items }
}

const matchEmojis = (query) => {
  // :thumbs up: => ['thumbs', 'up']
  const terms = query.replace(/[:]/g, '').split(/\s+/)

  return ordering.filter((emoji) => {
    return terms.every((term) => {
      return emoji.includes(term) || keywords[emoji].some((keyword) => keyword.includes(term))
    })
  })
}

module.exports = function (query, skinTone, pasteByDefault = false) {
  const results = matchEmojis(query)

  return toAlfredItems(results, {
    verb: pasteByDefault ? 'Paste' : 'Copy',
    preposition: pasteByDefault ? 'as snippet' : 'to clipboard',
    skinTone
  })
}
