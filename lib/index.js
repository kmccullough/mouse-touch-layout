function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export var UsingTouchLayout = /*#__PURE__*/function () {
  function UsingTouchLayout() {
    var _document,
        _navigator,
        _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$classElement = _ref.classElement,
        classElement = _ref$classElement === void 0 ? (_document = document) === null || _document === void 0 ? void 0 : _document.body : _ref$classElement,
        _ref$eventElement = _ref.eventElement,
        eventElement = _ref$eventElement === void 0 ? document : _ref$eventElement,
        _ref$onTouchActive = _ref.onTouchActive,
        onTouchActive = _ref$onTouchActive === void 0 ? function () {} : _ref$onTouchActive,
        _ref$onNonTouchActive = _ref.onNonTouchActive,
        onNonTouchActive = _ref$onNonTouchActive === void 0 ? function () {} : _ref$onNonTouchActive,
        _ref$onChange = _ref.onChange,
        onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
        nonTouchActiveClass = _ref.nonTouchActiveClass,
        touchActiveClass = _ref.touchActiveClass;

    _classCallCheck(this, UsingTouchLayout);

    _defineProperty(this, "isTouchActive", !!((_navigator = navigator) !== null && _navigator !== void 0 && _navigator.maxTouchPoints));

    _defineProperty(this, "nonTouchActiveClass", 'l-using-touch--non-touch');

    _defineProperty(this, "touchActiveClass", 'l-using-touch--touch');

    _defineProperty(this, "cleanUps", []);

    _defineProperty(this, "classElement", void 0);

    _defineProperty(this, "isDestroyed", false);

    this.classElement = classElement;
    this.setClasses(nonTouchActiveClass, touchActiveClass) || this.onTouchActiveChange();
    var pointerEvent = 'pointerdown';

    var onPointerDown = function onPointerDown(e) {
      if (e.pointerType === 'touch') {
        if (!_this.isTouchActive) {
          _this.isTouchActive = true;

          _this.onTouchActiveChange();

          onTouchActive();
          onChange(true);
        }
      } else if (_this.isTouchActive) {
        _this.isTouchActive = false;

        _this.onTouchActiveChange();

        onNonTouchActive();
        onChange(false);
      }
    };

    eventElement.addEventListener(pointerEvent, onPointerDown);
    this.cleanUps.push(function () {
      return eventElement.removeEventListener(pointerEvent, onPointerDown);
    });
  }

  _createClass(UsingTouchLayout, [{
    key: "onTouchActiveChange",
    value: function onTouchActiveChange() {
      if (this.isDestroyed) {
        return;
      }

      var isTouchActive = this.isTouchActive,
          add = this.nonTouchActiveClass,
          remove = this.touchActiveClass;

      if (isTouchActive) {
        var _ref2 = [remove, add];
        add = _ref2[0];
        remove = _ref2[1];
      }

      var classList = this.classElement.classList;
      classList.remove(remove);
      classList.add(add);
    }
  }, {
    key: "setClasses",
    value: function setClasses() {
      var nonTouchActiveClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.nonTouchActiveClass;
      var touchActiveClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.touchActiveClass;

      if (this.isDestroyed) {
        return false;
      }

      var hasNonTouchActiveClass = nonTouchActiveClass !== this.nonTouchActiveClass;
      var hasTouchActiveClass = touchActiveClass !== this.touchActiveClass;

      if (!(hasNonTouchActiveClass || hasTouchActiveClass)) {
        return false;
      }

      var classList = this.classElement.classList;

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
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.isDestroyed) {
        return;
      }

      this.cleanUps.forEach(function (c) {
        return c();
      });
      this.isDestroyed = true;
    }
  }]);

  return UsingTouchLayout;
}();
//# sourceMappingURL=index.js.map