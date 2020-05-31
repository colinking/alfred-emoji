# alfred-emoji ![CI](https://github.com/colinking/alfred-emoji/workflows/CI/badge.svg)

An [Alfred workflow][alfred] that makes it easy to search for emoji and copy
them to the clipboard 🤘.

This is a temporary fork of [`jsumners/alfred-emoji`](https://github.com/jsumners/alfred-emoji) that adds support for Unicode 12.0 emojis. It should become unnecessary when [v3.0.0 of `muan/emojilib`](https://github.com/muan/emojilib/pull/178) ships with the upstream unicode updates from [`muan/unicode-emoji-json`](https://github.com/muan/unicode-emoji-json).

![screenshot](images/screenshot.png)

## Installing the Workflow

[Download the provided Alfred workflow][releases].

Notice: This workflow relies on JXA (JavaScript for Automation) that is built
into macOS.

## Usage

```
emoji [query]
```

Press <kbd>return</kbd> (↵): **Copy the symbol** of the selected emoji (e.g. 🤣) to
your clipboard.

Press <kbd>alt</kbd>+<kbd>return</kbd> (⌥↵): **Copy the code** of the selected emoji)
(e.g. `:rofl:`) to your clipboard.

Press <kbd>shift</kbd>+<kbd>return</kbd> (⇧↵): **Copy the default symbol** of the selected emoji)
(e.g. 🤣) to your clipboard without skin tone modifier.

Press <kbd>cmd</kbd>+<kbd>return</kbd> (⌘↵): **Paste the symbol** of the selected
emoji (e.g. 🤣) directly to your frontmost application.

### Set skin tone

To change the emoji skin tone for supported emoji set the `skin_tone` environment variable in Alfred:

![screenshot skin tone settings](images/screenshot-skin-tone-setting.png)

Options:
- No value => 👍
- `0` => 👍🏻
- `1` => 👍🏼
- `2` => 👍🏽
- `3` => 👍🏾
- `4` => 👍🏿

After setting skin tone you can still quickly copy the default emoji with the <kbd>shift</kbd> modifier.

## Automatic Updates

This workflow will automatically check for updates at most once per day. If a
new release is found, it automatically downloads and installs the latest
version of the workflow. All downloads come directly from official [GitHub
releases][releases].

## Optional Hotkey and Snippet Triggers

Trigger the workflow with either a custom hotkey or a custom snippet.

## Building the Workflow

1. Clone this repository
2. `yarn install`
3. `yarn run build`

## Loading the Workflow into Alfred

1. `yarn run load`

## Inspiration

This is based on the original work by [Carlos Galdino][carlos]. His project
seems to be unmaintained (some emoji don't copy and some newer are missing).
Whereas his project is based on the Ruby language, this one is based on
JavaScript.

## Other

* [Associated Alfred Forum Post][alfredforum]
* [Emoji Keyword Library][emojilib]

## License

[MIT License](http://jsumners.mit-license.org/)

[alfred]: https://alfredapp.com/
[carlos]: https://github.com/carlosgaldino/alfred-emoji-workflow/
[releases]: https://github.com/jsumners/alfred-emoji/releases
[alfredforum]: https://www.alfredforum.com/topic/11126-alfred-emoji-search-emojis-by-name-or-keyword/
[emojilib]: https://github.com/muan/emojilib
