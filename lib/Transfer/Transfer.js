'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../Common/plugs/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../ishow/Button/index');

var _index4 = _interopRequireDefault(_index3);

var _TransferPanel = require('./TransferPanel');

var _TransferPanel2 = _interopRequireDefault(_TransferPanel);

var _index5 = require('../Common/locale/index.js');

var _index6 = _interopRequireDefault(_index5);

require('../Common/css/Transfer.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Transfer = function (_Component) {
  _inherits(Transfer, _Component);

  function Transfer(props) {
    _classCallCheck(this, Transfer);

    var _this = _possibleConstructorReturn(this, (Transfer.__proto__ || Object.getPrototypeOf(Transfer)).call(this, props));

    _this.onSourceCheckedChange = function (val) {
      _this.setState({ leftChecked: val });
    };

    _this.onTargetCheckedChange = function (val) {
      _this.setState({ rightChecked: val });
    };

    _this.addToLeft = function () {
      var value = _this.props.value;
      var rightChecked = _this.state.rightChecked;

      var currentValue = value.slice();
      rightChecked.forEach(function (item) {
        var index = currentValue.indexOf(item);
        if (index > -1) {
          currentValue.splice(index, 1);
        }
      });
      _this.setState({ rightChecked: [] }, function () {
        return _this.props.onChange(currentValue, 'left', rightChecked);
      });
    };

    _this.addToRight = function () {
      var value = _this.props.value;
      var leftChecked = _this.state.leftChecked;

      var currentValue = value.slice();
      leftChecked.forEach(function (item) {
        if (!value.includes(item)) {
          currentValue = currentValue.concat(item);
        }
      });
      _this.setState({ leftChecked: [] }, function () {
        return _this.props.onChange(currentValue, 'right', leftChecked);
      });
    };

    _this.state = {
      leftChecked: [],
      rightChecked: []
    };
    return _this;
  }

  _createClass(Transfer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          leftDefaultChecked = _props.leftDefaultChecked,
          rightDefaultChecked = _props.rightDefaultChecked;

      if (leftDefaultChecked.length) {
        this.setState({ leftChecked: leftDefaultChecked });
      }
      if (rightDefaultChecked.length) {
        this.setState({ rightChecked: rightDefaultChecked });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          filterPlaceholder = _props2.filterPlaceholder,
          titles = _props2.titles,
          buttonTexts = _props2.buttonTexts,
          propsAlias = _props2.propsAlias,
          filterable = _props2.filterable,
          filterMethod = _props2.filterMethod,
          footerFormat = _props2.footerFormat,
          leftFooter = _props2.leftFooter,
          rightFooter = _props2.rightFooter,
          renderContent = _props2.renderContent;
      var _state = this.state,
          leftChecked = _state.leftChecked,
          rightChecked = _state.rightChecked;


      return _react2.default.createElement(
        'div',
        { className: 'ishow-transfer' },
        _react2.default.createElement(
          _TransferPanel2.default,
          {
            propsAlias: propsAlias,
            data: this.sourceData,
            title: titles[0] || _index6.default.t('ishow.transfer.titles.0'),
            checked: leftChecked,
            filterable: filterable,
            filterMethod: filterMethod,
            footerFormat: footerFormat,
            renderContent: renderContent,
            placeholder: filterPlaceholder || _index6.default.t('ishow.transfer.filterPlaceholder'),
            onChange: this.onSourceCheckedChange
          },
          leftFooter
        ),
        _react2.default.createElement(
          'div',
          { className: 'ishow-transfer__buttons' },
          _react2.default.createElement(
            _index4.default,
            {
              type: 'primary',
              size: 'small',
              onClick: this.addToLeft,
              disabled: rightChecked.length === 0
            },
            _react2.default.createElement('i', { className: 'ishow-icon-arrow-left' }),
            buttonTexts[0] !== undefined && _react2.default.createElement(
              'span',
              null,
              buttonTexts[0]
            )
          ),
          _react2.default.createElement(
            _index4.default,
            {
              type: 'primary',
              size: 'small',
              onClick: this.addToRight,
              disabled: leftChecked.length === 0
            },
            buttonTexts[1] !== undefined && _react2.default.createElement(
              'span',
              null,
              buttonTexts[1]
            ),
            _react2.default.createElement('i', { className: 'ishow-icon-arrow-right' })
          )
        ),
        _react2.default.createElement(
          _TransferPanel2.default,
          {
            propsAlias: propsAlias,
            data: this.targetData,
            title: titles[1] || _index6.default.t('ishow.transfer.titles.1'),
            checked: rightChecked,
            filterable: filterable,
            filterMethod: filterMethod,
            footerFormat: footerFormat,
            renderContent: renderContent,
            placeholder: filterPlaceholder || _index6.default.t('ishow.transfer.filterPlaceholder'),
            onChange: this.onTargetCheckedChange
          },
          rightFooter
        )
      );
    }
  }, {
    key: 'sourceData',
    get: function get() {
      var _props3 = this.props,
          data = _props3.data,
          value = _props3.value,
          propsAlias = _props3.propsAlias;

      return data.filter(function (item) {
        return !value.includes(item[propsAlias.key]);
      });
    }
  }, {
    key: 'targetData',
    get: function get() {
      var _props4 = this.props,
          data = _props4.data,
          value = _props4.value,
          propsAlias = _props4.propsAlias;

      return data.filter(function (item) {
        return value.includes(item[propsAlias.key]);
      });
    }
  }]);

  return Transfer;
}(_index2.default);

exports.default = Transfer;


Transfer.defaultProps = {
  data: [],
  titles: [],
  buttonTexts: [],
  filterPlaceholder: '',
  leftDefaultChecked: [],
  rightDefaultChecked: [],
  value: [],
  footerFormat: {},
  propsAlias: {
    label: 'label',
    key: 'key',
    disabled: 'disabled'
  },
  onChange: function onChange() {}
};

Transfer.propTypes = {
  data: _propTypes2.default.array,
  titles: _propTypes2.default.array,
  buttonTexts: _propTypes2.default.array,
  filterPlaceholder: _propTypes2.default.string,
  filterMethod: _propTypes2.default.func,
  leftDefaultChecked: _propTypes2.default.array,
  rightDefaultChecked: _propTypes2.default.array,
  renderContent: _propTypes2.default.func,
  value: _propTypes2.default.array,
  footerFormat: _propTypes2.default.object,
  filterable: _propTypes2.default.bool,
  propsAlias: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  leftFooter: _propTypes2.default.node,
  rightFooter: _propTypes2.default.node
};