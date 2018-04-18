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

var _index3 = require('../Input/index');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('../Checkbox/index');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('../Common/locale/index.js');

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TransferPanel = function (_Component) {
  _inherits(TransferPanel, _Component);

  function TransferPanel(props) {
    _classCallCheck(this, TransferPanel);

    var _this = _possibleConstructorReturn(this, (TransferPanel.__proto__ || Object.getPrototypeOf(TransferPanel)).call(this, props));

    _this.handleMouseEnter = function () {
      return _this.setState({ inputHover: true });
    };

    _this.handleMouseLeave = function () {
      return _this.setState({ inputHover: false });
    };

    _this.clearQuery = function () {
      if (_this.inputIcon === 'circle-close') {
        _this.setState({ query: '' });
      }
    };

    _this.handleAllCheckedChange = function (ischecked) {
      var checked = ischecked ? _this.checkableData.map(function (item) {
        return item[_this.keyProp];
      }) : [];
      _this.props.onChange(checked);
    };

    _this.handleCheckedChange = function (value) {
      _this.props.onChange(value);
    };

    _this.handleInputChange = function (value) {
      _this.setState({ query: value });
    };

    _this.state = {
      query: '',
      inputHover: false
    };
    return _this;
  }

  _createClass(TransferPanel, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          filterable = _props.filterable,
          title = _props.title,
          data = _props.data,
          renderContent = _props.renderContent,
          checked = _props.checked,
          placeholder = _props.placeholder;
      var query = this.state.query;

      return _react2.default.createElement(
        'div',
        { className: 'ishow-transfer-panel' },
        _react2.default.createElement(
          'p',
          { className: 'ishow-transfer-panel__header' },
          title
        ),
        _react2.default.createElement(
          'div',
          { className: 'ishow-transfer-panel__body' },
          filterable && _react2.default.createElement(_index4.default, {
            className: 'ishow-transfer-panel__filter',
            value: query,
            size: 'small',
            placeholder: placeholder,
            icon: this.inputIcon,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
            onIconClick: this.clearQuery,
            onChange: this.handleInputChange
          }),
          _react2.default.createElement(
            _index.View,
            { show: !this.hasNoMatch && data.length > 0 },
            _react2.default.createElement(
              _index6.default.Group,
              {
                value: checked,
                'v-show': '',
                className: this.classNames({
                  'is-filterable': filterable,
                  'ishow-transfer-panel__list': true
                }),
                onChange: this.handleCheckedChange
              },
              this.filteredData.map(function (item, index) {
                return _react2.default.createElement(
                  _index6.default,
                  {
                    className: 'ishow-transfer-panel__item',
                    label: item[_this2.labelProp],
                    disabled: item[_this2.disabledProp],
                    value: item[_this2.keyProp],
                    key: index
                  },
                  _react2.default.createElement(OptionContent, {
                    option: item,
                    renderContent: renderContent,
                    labelProp: _this2.labelProp,
                    keyProp: _this2.keyProp
                  })
                );
              })
            )
          ),
          _react2.default.createElement(
            _index.View,
            { show: this.hasNoMatch },
            _react2.default.createElement(
              'p',
              { className: 'ishow-transfer-panel__empty' },
              _index8.default.t('ishow.transfer.noMatch')
            )
          ),
          _react2.default.createElement(
            _index.View,
            { show: data.length === 0 && !this.hasNoMatch },
            _react2.default.createElement(
              'p',
              { className: 'ishow-transfer-panel__empty' },
              _index8.default.t('ishow.transfer.noData')
            )
          )
        ),
        _react2.default.createElement(
          'p',
          { className: 'ishow-transfer-panel__footer' },
          _react2.default.createElement(
            _index6.default,
            {
              checked: this.allChecked,
              onChange: this.handleAllCheckedChange,
              indeterminate: this.isIndeterminate
            },
            this.checkedSummary
          ),
          this.props.children
        )
      );
    }
  }, {
    key: 'allChecked',
    get: function get() {
      var _this3 = this;

      var checkableDataKeys = this.checkableData.map(function (item) {
        return item[_this3.keyProp];
      });
      return checkableDataKeys.length > 0 && checkableDataKeys.every(function (item) {
        return _this3.props.checked.includes(item);
      });
    }
  }, {
    key: 'filteredData',
    get: function get() {
      var _this4 = this;

      return this.props.data.filter(function (item) {
        if (typeof _this4.props.filterMethod === 'function') {
          return _this4.props.filterMethod(_this4.state.query, item);
        } else {
          var label = item[_this4.labelProp] || item[_this4.keyProp].toString();
          return label.toLowerCase().includes(_this4.state.query.toLowerCase());
        }
      });
    }
  }, {
    key: 'checkableData',
    get: function get() {
      var _this5 = this;

      return this.filteredData.filter(function (item) {
        return !item[_this5.disabledProp];
      });
    }
  }, {
    key: 'checkedSummary',
    get: function get() {
      var checkedLength = this.props.checked.length;
      var dataLength = this.props.data.length;
      var _props$footerFormat = this.props.footerFormat,
          noChecked = _props$footerFormat.noChecked,
          hasChecked = _props$footerFormat.hasChecked;

      if (noChecked && hasChecked) {
        return checkedLength > 0 ? hasChecked.replace(/\${checked}/g, checkedLength).replace(/\${total}/g, dataLength) : noChecked.replace(/\${total}/g, dataLength);
      } else {
        return checkedLength > 0 ? _index8.default.t('ishow.transfer.hasCheckedFormat', {
          total: dataLength,
          checked: checkedLength
        }) : _index8.default.t('ishow.transfer.noCheckedFormat', { total: dataLength });
      }
    }
  }, {
    key: 'isIndeterminate',
    get: function get() {
      var checkedLength = this.props.checked.length;
      return checkedLength > 0 && checkedLength < this.checkableData.length;
    }
  }, {
    key: 'hasNoMatch',
    get: function get() {
      var query = this.state.query;

      return query.length > 0 && this.filteredData.length === 0;
    }
  }, {
    key: 'inputIcon',
    get: function get() {
      var _state = this.state,
          query = _state.query,
          inputHover = _state.inputHover;

      return query.length > 0 && inputHover ? 'circle-close' : 'search';
    }
  }, {
    key: 'labelProp',
    get: function get() {
      return this.props.propsAlias.label;
    }
  }, {
    key: 'keyProp',
    get: function get() {
      return this.props.propsAlias.key;
    }
  }, {
    key: 'disabledProp',
    get: function get() {
      return this.props.propsAlias.disabled;
    }
  }]);

  return TransferPanel;
}(_index2.default);

exports.default = TransferPanel;


var OptionContent = function OptionContent(_ref) {
  var option = _ref.option,
      renderContent = _ref.renderContent,
      labelProp = _ref.labelProp,
      keyProp = _ref.keyProp;

  return renderContent ? renderContent(option) : _react2.default.createElement(
    'span',
    null,
    option[labelProp] || option[keyProp]
  );
};

TransferPanel.defaultProps = {
  data: [],
  footerFormat: {},
  propsAlias: {},
  onChange: function onChange() {}
};

TransferPanel.propTypes = {
  data: _propTypes2.default.array,
  renderContent: _propTypes2.default.func,
  placeholder: _propTypes2.default.string,
  title: _propTypes2.default.string,
  filterable: _propTypes2.default.bool,
  footerFormat: _propTypes2.default.object,
  filterMethod: _propTypes2.default.func,
  propsAlias: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  checked: _propTypes2.default.array
};