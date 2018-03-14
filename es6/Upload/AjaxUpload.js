var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { default as Component } from '../Common/plugs/index.js'; //提供style, classname方法
import ajax from './ajax';
import Cover from './Cover';
import '../Common/css/Upload.css';

var AjaxUpload = function (_Component) {
  _inherits(AjaxUpload, _Component);

  function AjaxUpload() {
    _classCallCheck(this, AjaxUpload);

    return _possibleConstructorReturn(this, (AjaxUpload.__proto__ || Object.getPrototypeOf(AjaxUpload)).apply(this, arguments));
  }

  _createClass(AjaxUpload, [{
    key: 'isImage',
    value: function isImage(str) {
      return str.indexOf('image') !== -1;
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      if (e.target instanceof HTMLInputElement) {
        var files = e.target.files;
        if (!files) {
          return;
        }
        this.uploadFiles(files);
        this.refs.input.value = null;
      }
    }
  }, {
    key: 'uploadFiles',
    value: function uploadFiles(files) {
      var _this2 = this;

      var multiple = this.props.multiple;

      var postFiles = Array.prototype.slice.call(files);
      if (postFiles.length === 0) {
        return;
      }
      if (!multiple) {
        postFiles = postFiles.slice(0, 1);
      }
      postFiles.forEach(function (file) {
        _this2.props.onStart(file);
        if (_this2.props.autoUpload) _this2.upload(file);
      });
    }
  }, {
    key: 'upload',
    value: function upload(rawFile, file) {
      var _this3 = this;

      var beforeUpload = this.props.beforeUpload;

      if (!beforeUpload) {
        return this.post(rawFile);
      }
      var before = beforeUpload(rawFile);
      if (before && before.then) {
        before.then(function (processedFile) {
          if (Object.prototype.toString.call(processedFile) === '[object File]') {
            _this3.post(processedFile);
          } else {
            _this3.post(rawFile);
          }
        }, function () {
          if (file && typeof _this3.props.onRemove === 'function') _this3.props.onRemove(file);
        });
      } else if (before !== false) {
        this.post(rawFile);
      } else {
        if (file && typeof this.props.onRemove === 'function') this.props.onRemove(file);
      }
    }
  }, {
    key: 'post',
    value: function post(file) {
      var _props = this.props,
          filename = _props.name,
          headers = _props.headers,
          withCredentials = _props.withCredentials,
          data = _props.data,
          action = _props.action,
          _onProgress = _props.onProgress,
          _onSuccess = _props.onSuccess,
          _onError = _props.onError;

      ajax({
        headers: headers,
        withCredentials: withCredentials,
        file: file,
        data: data,
        filename: filename,
        action: action,
        onProgress: function onProgress(e) {
          return _onProgress(e, file);
        },
        onSuccess: function onSuccess(res) {
          return _onSuccess(res, file);
        },
        onError: function onError(err) {
          return _onError(err, file);
        }
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.refs.input.click();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props2 = this.props,
          drag = _props2.drag,
          multiple = _props2.multiple,
          accept = _props2.accept,
          listType = _props2.listType;

      return React.createElement(
        'div',
        {
          className: this.classNames(_defineProperty({
            'ishow-upload': true
          }, 'ishow-upload--' + listType, true)),
          onClick: function onClick() {
            return _this4.handleClick();
          }
        },
        drag ? React.createElement(
          Cover,
          { onFile: function onFile(file) {
              return _this4.uploadFiles(file);
            } },
          this.props.children
        ) : this.props.children,
        React.createElement('input', {
          className: 'ishow-upload__input',
          type: 'file',
          ref: 'input',
          onChange: function onChange(e) {
            return _this4.handleChange(e);
          },
          multiple: multiple,
          accept: accept
        })
      );
    }
  }]);

  return AjaxUpload;
}(Component);

AjaxUpload.defaultProps = {
  name: 'file'
};
export default AjaxUpload;


AjaxUpload.propTypes = {
  drag: PropTypes.bool,
  data: PropTypes.object,
  action: PropTypes.string.isRequired,
  name: PropTypes.string,
  accept: PropTypes.string,
  headers: PropTypes.object,
  withCredentials: PropTypes.bool,
  multiple: PropTypes.bool,
  onStart: PropTypes.func,
  onProgress: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  beforeUpload: PropTypes.func,
  autoUpload: PropTypes.bool,
  listType: PropTypes.string,
  fileList: PropTypes.array
};