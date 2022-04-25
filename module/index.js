function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export class UsingTouchLayout {
  constructor({
    classElement = (() => {
      var _document;

      return (_document = document) === null || _document === void 0 ? void 0 : _document.body;
    })(),
    eventElement = document,
    onTouchActive = () => {},
    onNonTouchActive = () => {},
    onChange = () => {},
    nonTouchActiveClass,
    touchActiveClass
  } = {}) {
    var _navigator;

    _defineProperty(this, "isTouchActive", !!((_navigator = navigator) !== null && _navigator !== void 0 && _navigator.maxTouchPoints));

    _defineProperty(this, "nonTouchActiveClass", 'l-using-touch--non-touch');

    _defineProperty(this, "touchActiveClass", 'l-using-touch--touch');

    _defineProperty(this, "cleanUps", []);

    _defineProperty(this, "classElement", void 0);

    _defineProperty(this, "isDestroyed", false);

    this.classElement = classElement;
    this.setClasses(nonTouchActiveClass, touchActiveClass) || this.onTouchActiveChange();
    const pointerEvent = 'pointerdown';

    const onPointerDown = e => {
      if (e.pointerType === 'touch') {
        if (!this.isTouchActive) {
          this.isTouchActive = true;
          this.onTouchActiveChange();
          onTouchActive();
          onChange(true);
        }
      } else if (this.isTouchActive) {
        this.isTouchActive = false;
        this.onTouchActiveChange();
        onNonTouchActive();
        onChange(false);
      }
    };

    eventElement.addEventListener(pointerEvent, onPointerDown);
    this.cleanUps.push(() => eventElement.removeEventListener(pointerEvent, onPointerDown));
  }

  onTouchActiveChange() {
    if (this.isDestroyed) {
      return;
    }

    let {
      isTouchActive,
      nonTouchActiveClass: add,
      touchActiveClass: remove
    } = this;

    if (isTouchActive) {
      [add, remove] = [remove, add];
    }

    const {
      classList
    } = this.classElement;
    classList.remove(remove);
    classList.add(add);
  }

  setClasses(nonTouchActiveClass = this.nonTouchActiveClass, touchActiveClass = this.touchActiveClass) {
    if (this.isDestroyed) {
      return false;
    }

    const hasNonTouchActiveClass = nonTouchActiveClass !== this.nonTouchActiveClass;
    const hasTouchActiveClass = touchActiveClass !== this.touchActiveClass;

    if (!(hasNonTouchActiveClass || hasTouchActiveClass)) {
      return false;
    }

    const {
      classList
    } = this.classElement;

    if (hasNonTouchActiveClass) {
      classList.remove(this.nonTouchActiveClass);
      this.nonTouchActiveClass = nonTouchActiveClass;
    }

    if (hasTouchActiveClass) {
      classList.remove(this.touchActiveClass);
      this.touchActiveClass = touchActiveClass;
    }

    this.onTouchActiveChange();
    return true;
  }

  destroy() {
    if (this.isDestroyed) {
      return;
    }

    this.cleanUps.forEach(c => c());
    this.isDestroyed = true;
  }

}
//# sourceMappingURL=index.js.map