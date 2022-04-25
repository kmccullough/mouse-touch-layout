# using-touch-layout

Adds one of two classes to body to indicate whether touch input is currently in use

## Installation

```bash
$ npm install @kmccullough/using-touch-layout
```

## Usage

```js
window.usingTouchLayout = new UsingTouchLayout({
  classElement: undefined,        // Defaults to `document.body` 
  eventElement: undefined,        // Defaults to `document`
  onTouchActive: () => {},        // Called when touch active
  onNonTouchActive: () => {},     // Called when non-touch active
  onChange: isTouchActive => {},  // Called when non-touch/touch become active
  nonTouchActiveClass: undefined, // Defaults to `l-using-touch--non-touch`
  touchActiveClass: undefined,    // Defaults to `l-using-touch--touch`
});
```

## License

[MIT](./LICENSE.txt)
