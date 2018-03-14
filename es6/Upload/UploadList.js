var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { default as Component, View } from '../Common/plugs/index.js'; //提供style, classname方法
import Transition from '../Message/transition';
import Progress from '../Progress/Progress';

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
      return React.createElement(
        Transition,
        {
          name: 'list'
        },
        React.createElement(
          'ul',
          {
            className: this.classNames(_defineProperty({
              'ishow-upload-list': true
            }, 'ishow-upload-list--' + listType, true))
          },
          fileList.map(function (file) {
            return React.createElement(
              'li',
              {
                className: _this2.classNames(_defineProperty({
                  'ishow-upload-list__item': true
                }, 'is-' + file.status, true)),
                key: file.uid
              },
              ['picture-card', 'picture'].includes(listType) && isFinished(file.status) && React.createElement('img', {
                className: 'ishow-upload-list__item-thumbnail',
                src: file.url,
                alt: ''
              }),
              React.createElement(
                'a',
                {
                  className: 'ishow-upload-list__item-name',
                  onClick: function onClick() {
                    return onPreview(file);
                  }
                },
                React.createElement('i', { className: 'ishow-icon-document' }),
                file.name
              ),
              React.createElement(
                'label',
                {
                  className: 'ishow-upload-list__item-status-label'
                },
                React.createElement('i', {
                  className: _this2.classNames({
                    'ishow-icon-upload-success': true,
                    'ishow-icon-circle-check': listType === 'text',
                    'ishow-icon-check': ['picture-card', 'picture'].includes(listType)
                  })
                })
              ),
              React.createElement('i', { className: 'ishow-icon-close', onClick: function onClick() {
                  return onRemove(file);
                } }),
              React.createElement(
                View,
                {
                  className: 'ishow-upload-list__item-actions',
                  show: listType === 'picture-card' && isFinished(file.status)
                },
                React.createElement(
                  'span',
                  null,
                  React.createElement(
                    'span',
                    {
                      onClick: function onClick() {
                        return onPreview(file);
                      },
                      className: 'ishow-upload-list__item-preview'
                    },
                    React.createElement('i', { className: 'ishow-icon-view' })
                  ),
                  React.createElement(
                    'span',
                    {
                      className: 'ishow-upload-list__item-delete',
                      onClick: function onClick() {
                        return onRemove(file);
                      }
                    },
                    React.createElement('i', { className: 'ishow-icon-delete2' })
                  )
                )
              ),
              file.status === 'uploading' && React.createElement(Progress, {
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
}(Component);

export default UploadList;


UploadList.contextTypes = {
  onPreview: PropTypes.func,
  onRemove: PropTypes.func
};

UploadList.propTypes = {
  listType: PropTypes.string,
  fileList: PropTypes.array
};