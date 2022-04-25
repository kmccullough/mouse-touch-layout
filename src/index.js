export class UsingTouchLayout {

  isTouchActive = !!navigator?.maxTouchPoints;

  nonTouchActiveClass = 'l-using-touch--non-touch';
  touchActiveClass = 'l-using-touch--touch';

  cleanUps = [];

  classElement;
  isDestroyed = false;

  constructor({
      classElement = document?.body,
      eventElement = document,
      onTouchActive = () => {},
      onNonTouchActive = () => {},
      onChange = () => {},
      nonTouchActiveClass,
      touchActiveClass,
    } = {}
  ) {
    this.classElement = classElement;
    this.setClasses(nonTouchActiveClass, touchActiveClass)
      || this.onTouchActiveChange();
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
    let { isTouchActive, nonTouchActiveClass: add, touchActiveClass: remove } = this;
    if (isTouchActive) {
      [ add, remove ] = [ remove, add ];
    }
    const { classList } = this.classElement;
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
    const { classList } = this.classElement;
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
