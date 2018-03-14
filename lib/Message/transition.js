'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

require('../Common/css/Base.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Transition = function (_Component) {
  _inherits(Transition, _Component);

  function Transition(props) {
    _classCallCheck(this, Transition);

    var _this = _possibleConstructorReturn(this, (Transition.__proto__ || Object.getPrototypeOf(Transition)).call(this, props));

    var children = props.children;


    _this.state = {
      children: children && _this.enhanceChildren(children)
    };

    _this.didEnter = _this.didEnter.bind(_this);
    _this.didLeave = _this.didLeave.bind(_this);
    return _this;
  }

  _createClass(Transition, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var children = _react2.default.isValidElement(this.props.children) && _react2.default.Children.only(this.props.children);
      var nextChildren = _react2.default.isValidElement(nextProps.children) && _react2.default.Children.only(nextProps.children);

      if (!nextProps.name) {
        this.setState({
          children: nextChildren
        });
        return;
      }

      if (this.isViewComponent(nextChildren)) {
        this.setState({
          children: this.enhanceChildren(nextChildren, { show: children ? children.props.show : true })
        });
      } else {
        if (nextChildren) {
          this.setState({
            children: this.enhanceChildren(nextChildren)
          });
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(preProps) {
      if (!this.props.name) return;

      var children = _react2.default.isValidElement(this.props.children) && _react2.default.Children.only(this.props.children);
      var preChildren = _react2.default.isValidElement(preProps.children) && _react2.default.Children.only(preProps.children);

      if (this.isViewComponent(children)) {
        if ((!preChildren || !preChildren.props.show) && children.props.show) {
          this.toggleVisible();
        } else if (preChildren && preChildren.props.show && !children.props.show) {
          this.toggleHidden();
        }
      } else {
        if (!preChildren && children) {
          this.toggleVisible();
        } else if (preChildren && !children) {
          this.toggleHidden();
        }
      }
    }
  }, {
    key: 'enhanceChildren',
    value: function enhanceChildren(children, props) {
      var _this2 = this;

      return _react2.default.cloneElement(children, Object.assign({ ref: function ref(el) {
          _this2.el = el;
        } }, props));
    }
  }, {
    key: 'isViewComponent',
    value: function isViewComponent(element) {
      return element && element.type._typeName === 'View';
    }

    /* css animation fix when animation applyied to .{action} instanceof .{action}-active */

  }, {
    key: 'animateElement',
    value: function animateElement(element, action, active, fn) {
      element.classList.add(active);

      var styles = getComputedStyle(element);
      var duration = parseFloat(styles['animationDuration']) || parseFloat(styles['transitionDuration']);

      element.classList.add(action);

      if (duration === 0) {
        var _styles = getComputedStyle(element);
        var _duration = parseFloat(_styles['animationDuration']) || parseFloat(_styles['transitionDuration']);

        clearTimeout(this.timeout);

        this.timeout = setTimeout(function () {
          fn();
        }, _duration * 1000);
      }

      element.classList.remove(action, active);
    }
  }, {
    key: 'didEnter',
    value: function didEnter(e) {
      var childDOM = _reactDom2.default.findDOMNode(this.el);

      if (!e || e.target !== childDOM) return;

      var onAfterEnter = this.props.onAfterEnter;
      var _transitionClass = this.transitionClass,
          enterActive = _transitionClass.enterActive,
          enterTo = _transitionClass.enterTo;


      childDOM.classList.remove(enterActive, enterTo);

      childDOM.removeEventListener('transitionend', this.didEnter);
      childDOM.removeEventListener('animationend', this.didEnter);

      onAfterEnter && onAfterEnter();
    }
  }, {
    key: 'didLeave',
    value: function didLeave(e) {
      var _this3 = this;

      var childDOM = _reactDom2.default.findDOMNode(this.el);
      if (!e || e.target !== childDOM) return;

      var _props = this.props,
          onAfterLeave = _props.onAfterLeave,
          children = _props.children;
      var _transitionClass2 = this.transitionClass,
          leaveActive = _transitionClass2.leaveActive,
          leaveTo = _transitionClass2.leaveTo;


      new Promise(function (resolve) {
        if (_this3.isViewComponent(children)) {
          childDOM.removeEventListener('transitionend', _this3.didLeave);
          childDOM.removeEventListener('animationend', _this3.didLeave);

          (0, _raf2.default)(function () {
            childDOM.style.display = 'none';
            childDOM.classList.remove(leaveActive, leaveTo);

            (0, _raf2.default)(resolve);
          });
        } else {
          _this3.setState({ children: null }, resolve);
        }
      }).then(function () {
        onAfterLeave && onAfterLeave();
      });
    }
  }, {
    key: 'toggleVisible',
    value: function toggleVisible() {
      var _this4 = this;

      var onEnter = this.props.onEnter;
      var _transitionClass3 = this.transitionClass,
          enter = _transitionClass3.enter,
          enterActive = _transitionClass3.enterActive,
          enterTo = _transitionClass3.enterTo,
          leaveActive = _transitionClass3.leaveActive,
          leaveTo = _transitionClass3.leaveTo;

      var childDOM = _reactDom2.default.findDOMNode(this.el);

      childDOM.addEventListener('transitionend', this.didEnter);
      childDOM.addEventListener('animationend', this.didEnter);

      // this.animateElement(childDOM, enter, enterActive, this.didEnter);

      (0, _raf2.default)(function () {
        // when hidden transition not end
        if (childDOM.classList.contains(leaveActive)) {
          childDOM.classList.remove(leaveActive, leaveTo);

          childDOM.removeEventListener('transitionend', _this4.didLeave);
          childDOM.removeEventListener('animationend', _this4.didLeave);
        }

        childDOM.style.display = '';
        childDOM.classList.add(enter, enterActive);

        onEnter && onEnter();

        (0, _raf2.default)(function () {
          childDOM.classList.remove(enter);
          childDOM.classList.add(enterTo);
        });
      });
    }
  }, {
    key: 'toggleHidden',
    value: function toggleHidden() {
      var _this5 = this;

      var onLeave = this.props.onLeave;
      var _transitionClass4 = this.transitionClass,
          leave = _transitionClass4.leave,
          leaveActive = _transitionClass4.leaveActive,
          leaveTo = _transitionClass4.leaveTo,
          enterActive = _transitionClass4.enterActive,
          enterTo = _transitionClass4.enterTo;

      var childDOM = _reactDom2.default.findDOMNode(this.el);

      childDOM.addEventListener('transitionend', this.didLeave);
      childDOM.addEventListener('animationend', this.didLeave);

      // this.animateElement(childDOM, leave, leaveActive, this.didLeave);

      (0, _raf2.default)(function () {
        // when enter transition not end
        if (childDOM.classList.contains(enterActive)) {
          childDOM.classList.remove(enterActive, enterTo);

          childDOM.removeEventListener('transitionend', _this5.didEnter);
          childDOM.removeEventListener('animationend', _this5.didEnter);
        }

        childDOM.classList.add(leave, leaveActive);

        onLeave && onLeave();

        (0, _raf2.default)(function () {
          childDOM.classList.remove(leave);
          childDOM.classList.add(leaveTo);
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return this.state.children || null;
    }
  }, {
    key: 'transitionClass',
    get: function get() {
      var name = this.props.name;


      return {
        enter: name + '-enter',
        enterActive: name + '-enter-active',
        enterTo: name + '-enter-to',
        leave: name + '-leave',
        leaveActive: name + '-leave-active',
        leaveTo: name + '-leave-to'
      };
    }
  }]);

  return Transition;
}(_react.Component);

exports.default = Transition;


Transition.propTypes = {
  name: _propTypes2.default.string,
  onEnter: _propTypes2.default.func, // triggered when enter transition start
  onAfterEnter: _propTypes2.default.func, // triggered when enter transition end
  onLeave: _propTypes2.default.func, // triggered when leave transition start
  onAfterLeave: _propTypes2.default.func // tiggered when leave transition end
};