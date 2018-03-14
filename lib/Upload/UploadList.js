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

var _transition = require('../Message/transition');

var _transition2 = _interopRequireDefault(_transition);

var _Progress = require('../Progress/Progress');

var _Progress2 = _interopRequireDefault(_Progress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //提供style, classname方法


var UploadList = function (_Component) {
  _inherits(UploadList, _Component);

  function UploadList() {
    _classCallCheck(this, UploadList);

    return _possibleConstructorReturn(this, (UploadList.__proto__ || Object.getPrototypeOf(UploadList)).apply(this, arguments));
  }

  _createClass(UploadList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _context = this.context,
          onPreview = _context.onPreview,
          onRemove = _context.onRemove;
      var _props = this.props,
          listType = _props.listType,
          fileList = _props.fileList;

      var isFinished = function isFinished(status) {
        return status === 'success';
      };
      return _react2.default.createElement(
        _transition2.default,
        {
          name: 'list'
        },
        _react2.default.createElement(
          'ul',
          {
            className: this.classNames(_defineProperty({
              'ishow-upload-list': true
            }, 'ishow-upload-list--' + listType, true))
          },
          fileList.map(function (file) {
            return _react2.default.createElement(
              'li',
              {
                className: _this2.classNames(_defineProperty({
                  'ishow-upload-list__item': true
                }, 'is-' + file.status, true)),
                key: file.uid
              },
              ['picture-card', 'picture'].includes(listType) && isFinished(file.status) && _react2.default.createElement('img', {
                className: 'ishow-upload-list__item-thumbnail',
                src: file.url,
                alt: ''
              }),
              _react2.default.createElement(
                'a',
                {
                  className: 'ishow-upload-list__item-name',
                  onClick: function onClick() {
                    return onPreview(file);
                  }
                },
                _react2.default.createElement('i', { className: 'ishow-icon-document' }),
                file.name
              ),
              _react2.default.createElement(
                'label',
                {
                  className: 'ishow-upload-list__item-status-label'
                },
                _react2.default.createElement('i', {
                  className: _this2.classNames({
                    'ishow-icon-upload-success': true,
                    'ishow-icon-circle-check': listType === 'text',
                    'ishow-icon-check': ['picture-card', 'picture'].includes(listType)
                  })
                })
              ),
              _react2.default.createElement('i', { className: 'ishow-icon-close', onClick: function onClick() {
                  return onRemove(file);
                } }),
              _react2.default.createElement(
                _index.View,
                {
                  className: 'ishow-upload-list__item-actions',
                  show: listType === 'picture-card' && isFinished(file.status)
                },
                _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(
                    'span',
                    {
                      onClick: function onClick() {
                        return onPreview(file);
                      },
                      className: 'ishow-upload-list__item-preview'
                    },
                    _react2.default.createElement('i', { className: 'ishow-icon-view' })
                  ),
                  _react2.default.createElement(
                    'span',
                    {
                      className: 'ishow-upload-list__item-delete',
                      onClick: function onClick() {
                        return onRemove(file);
                      }
                    },
                    _react2.default.createElement('i', { className: 'ishow-icon-delete2' })
                  )
                )
              ),
              file.status === 'uploading' && _react2.default.createElement(_Progress2.default, {
                strokeWidth: listType === 'picture-card' ? 6 : 2,
                type: listType === 'picture-card' ? 'circle' : 'line',
                percentage: parseInt(file.percentage, 10),
                status: isFinished(file.status) && file.showProgress ? 'success' : ''
              })
            );
          })
        )
      );
    }
  }]);

  return UploadList;
}(_index2.default);

exports.default = UploadList;


UploadList.contextTypes = {
  onPreview: _propTypes2.default.func,
  onRemove: _propTypes2.default.func
};

UploadList.propTypes = {
  listType: _propTypes2.default.string,
  fileList: _propTypes2.default.array
};