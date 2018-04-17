var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { default as Component } from '../Common/plugs/index.js';
import Button from "../../ishow/Button/index";
import TransferPanel from './TransferPanel';

import i18n from '../Common/locale/index.js';
import '../Common/css/Transfer.css';

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


      return React.createElement(
        'div',
        { className: 'ishow-transfer' },
        React.createElement(
          TransferPanel,
          {
            propsAlias: propsAlias,
            data: this.sourceData,
            title: titles[0] || i18n.t('ishow.transfer.titles.0'),
            checked: leftChecked,
            filterable: filterable,
            filterMethod: filterMethod,
            footerFormat: footerFormat,
            renderContent: renderContent,
            placeholder: filterPlaceholder || i18n.t('ishow.transfer.filterPlaceholder'),
            onChange: this.onSourceCheckedChange
          },
          leftFooter
        ),
        React.createElement(
          'div',
          { className: 'ishow-transfer__buttons' },
          React.createElement(
            Button,
            {
              type: 'primary',
              size: 'small',
              onClick: this.addToLeft,
              disabled: rightChecked.length === 0
            },
            React.createElement('i', { className: 'ishow-icon-arrow-left' }),
            buttonTexts[0] !== undefined && React.createElement(
              'span',
              null,
              buttonTexts[0]
            )
          ),
          React.createElement(
            Button,
            {
              type: 'primary',
              size: 'small',
              onClick: this.addToRight,
              disabled: leftChecked.length === 0
            },
            buttonTexts[1] !== undefined && React.createElement(
              'span',
              null,
              buttonTexts[1]
            ),
            React.createElement('i', { className: 'ishow-icon-arrow-right' })
          )
        ),
        React.createElement(
          TransferPanel,
          {
            propsAlias: propsAlias,
            data: this.targetData,
            title: titles[1] || i18n.t('ishow.transfer.titles.1'),
            checked: rightChecked,
            filterable: filterable,
            filterMethod: filterMethod,
            footerFormat: footerFormat,
            renderContent: renderContent,
            placeholder: filterPlaceholder || i18n.t('ishow.transfer.filterPlaceholder'),
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
}(Component);

export default Transfer;


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
  data: PropTypes.array,
  titles: PropTypes.array,
  buttonTexts: PropTypes.array,
  filterPlaceholder: PropTypes.string,
  filterMethod: PropTypes.func,
  leftDefaultChecked: PropTypes.array,
  rightDefaultChecked: PropTypes.array,
  renderContent: PropTypes.func,
  value: PropTypes.array,
  footerFormat: PropTypes.object,
  filterable: PropTypes.bool,
  propsAlias: PropTypes.object,
  onChange: PropTypes.func,
  leftFooter: PropTypes.node,
  rightFooter: PropTypes.node
};