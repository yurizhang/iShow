'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../Common/plugs/index.js');

var _index2 = _interopRequireDefault(_index);

var _UploadList = require('./UploadList');

var _UploadList2 = _interopRequireDefault(_UploadList);

var _iFrameUpload = require('./iFrameUpload');

var _iFrameUpload2 = _interopRequireDefault(_iFrameUpload);

var _AjaxUpload = require('./AjaxUpload');

var _AjaxUpload2 = _interopRequireDefault(_AjaxUpload);

require('../Common/css/Upload.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //提供style, classname方法


var Upload = function (_Component) {
  _inherits(Upload, _Component);

  function Upload(props) {
    _classCallCheck(this, Upload);

    var _this = _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this, props));

    _this.state = {
      fileList: [],
      tempIndex: 1
    };
    return _this;
  }

  _createClass(Upload, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.init(this.props);
    }
  }, {
    key: 'init',
    value: function init(props) {
      var tempIndex = this.state.tempIndex;
      var fileList = props.fileList;

      var uploadFiles = fileList.map(function (file) {
        file.uid = file.uid || Date.now() + tempIndex++;
        file.status = 'success';
        return file;
      });
      this.setState({ fileList: uploadFiles });
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        onPreview: this.handlePreview.bind(this),
        onRemove: this.handleRemove.bind(this)
      };
    }
  }, {
    key: 'getFile',
    value: function getFile(file) {
      if (file) {
        return this.state.fileList.find(function (item) {
          return item.uid === file.uid;
        });
      }

      return null;
    }
  }, {
    key: 'handleStart',
    value: function handleStart(file) {
      var _state = this.state,
          tempIndex = _state.tempIndex,
          fileList = _state.fileList;


      file.uid = Date.now() + tempIndex++;

      var _file = {
        status: 'ready',
        name: file.name,
        size: file.size,
        percentage: 0,
        uid: file.uid,
        raw: file
      };

      try {
        _file.url = URL.createObjectURL(file);
      } catch (err) {
        return;
      }

      fileList.push(_file);
      this.setState({
        fileList: fileList,
        tempIndex: tempIndex
      });
    }
  }, {
    key: 'handleProgress',
    value: function handleProgress(e, file) {
      var fileList = this.state.fileList;

      var _file = this.getFile(file);
      if (_file) {
        _file.percentage = e.percent || 0;
        _file.status = 'uploading';
        this.props.onProgress(e, _file, fileList);
        this.setState({ fileList: fileList });
      }
    }
  }, {
    key: 'handleSuccess',
    value: function handleSuccess(res, file) {
      var _this2 = this;

      var fileList = this.state.fileList;

      var _file = this.getFile(file);
      if (_file) {
        _file.status = 'success';
        _file.response = res;

        setTimeout(function () {
          _this2.setState({ fileList: fileList }, function () {
            _this2.props.onSuccess(res, _file, fileList);
            _this2.props.onChange(_file, fileList);
          });
        }, 1000);
      }
    }
  }, {
    key: 'handleError',
    value: function handleError(err, file) {
      var _this3 = this;

      var fileList = this.state.fileList;

      var _file = this.getFile(file);
      if (_file) {
        _file.status = 'fail';
        fileList.splice(fileList.indexOf(_file), 1);
        this.setState({ fileList: fileList }, function () {
          _this3.props.onError(err, _file, fileList);
          _this3.props.onChange(_file, fileList);
        });
      }
    }
  }, {
    key: 'handleRemove',
    value: function handleRemove(file) {
      var _this4 = this;

      var fileList = this.state.fileList;

      var _file = this.getFile(file);
      if (_file) {
        fileList.splice(fileList.indexOf(_file), 1);
        this.setState({ fileList: fileList }, function () {
          return _this4.props.onRemove(file, fileList);
        });
      }
    }
  }, {
    key: 'handlePreview',
    value: function handlePreview(file) {
      if (file.status === 'success') {
        this.props.onPreview(file);
      }
    }
  }, {
    key: 'clearFiles',
    value: function clearFiles() {
      this.setState({
        fileList: []
      });
    }
  }, {
    key: 'submit',
    value: function submit() {
      var _this5 = this;

      this.state.fileList.filter(function (file) {
        return file.status === 'ready';
      }).forEach(function (file) {
        _this5.refs['upload-inner'].upload(file.raw, file);
      });
    }
  }, {
    key: 'showCover',
    value: function showCover() {
      var fileList = this.state.fileList;

      var file = fileList[fileList.length - 1];
      return file && file.status !== 'fail';
    }
  }, {
    key: 'render',
    value: function render() {
      var fileList = this.state.fileList;
      var _props = this.props,
          showFileList = _props.showFileList,
          autoUpload = _props.autoUpload,
          drag = _props.drag,
          tip = _props.tip,
          action = _props.action,
          multiple = _props.multiple,
          beforeUpload = _props.beforeUpload,
          withCredentials = _props.withCredentials,
          headers = _props.headers,
          name = _props.name,
          data = _props.data,
          accept = _props.accept,
          listType = _props.listType,
          className = _props.className;

      var uploadList = void 0;
      if (showFileList && fileList.length) {
        uploadList = _react2.default.createElement(_UploadList2.default, { listType: listType, fileList: fileList });
      }
      var restProps = {
        autoUpload: autoUpload,
        drag: drag,
        action: action,
        multiple: multiple,
        beforeUpload: beforeUpload,
        withCredentials: withCredentials,
        headers: headers,
        name: name,
        data: data,
        accept: accept,
        listType: listType,
        onStart: this.handleStart.bind(this),
        onProgress: this.handleProgress.bind(this),
        onSuccess: this.handleSuccess.bind(this),
        onError: this.handleError.bind(this),
        onPreview: this.handlePreview.bind(this),
        onRemove: this.handleRemove.bind(this),
        showCover: this.showCover(),
        ref: 'upload-inner'
      };
      var trigger = this.props.trigger || this.props.children;
      var uploadComponent = typeof FormData !== 'undefined' ? _react2.default.createElement(
        _AjaxUpload2.default,
        _extends({ key: 'AjaxUpload' }, restProps),
        trigger
      ) : _react2.default.createElement(
        'iFrameUpload',
        _extends({ key: 'iFrameUpload' }, restProps),
        trigger
      );
      return _react2.default.createElement(
        'div',
        { className: className },
        listType === 'picture-card' ? uploadList : '',
        this.props.trigger ? [uploadComponent, this.props.children] : uploadComponent,
        tip,
        listType !== 'picture-card' ? uploadList : ''
      );
    }
  }]);

  return Upload;
}(_index2.default);

exports.default = Upload;


Upload.childContextTypes = {
  onPreview: _propTypes2.default.func,
  onRemove: _propTypes2.default.func
};

Upload.propTypes = {
  action: _propTypes2.default.string.isRequired,
  headers: _propTypes2.default.object,
  data: _propTypes2.default.object,
  multiple: _propTypes2.default.bool,
  name: _propTypes2.default.string,
  withCredentials: _propTypes2.default.bool,
  showFileList: _propTypes2.default.bool,
  fileList: _propTypes2.default.array,
  autoUpload: _propTypes2.default.bool,
  accept: _propTypes2.default.string,
  drag: _propTypes2.default.bool,
  listType: _propTypes2.default.oneOf(['text', 'picture', 'picture-card']),
  tip: _propTypes2.default.node,
  trigger: _propTypes2.default.node,
  beforeUpload: _propTypes2.default.func,
  onRemove: _propTypes2.default.func,
  onPreview: _propTypes2.default.func,
  onProgress: _propTypes2.default.func,
  onSuccess: _propTypes2.default.func,
  onError: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  className: _propTypes2.default.string
};

Upload.defaultProps = {
  headers: {},
  name: 'file',
  type: 'select',
  listType: 'text',
  fileList: [],
  showFileList: true,
  autoUpload: true,
  onRemove: function onRemove() {},
  onPreview: function onPreview() {},
  onProgress: function onProgress() {},
  onSuccess: function onSuccess() {},
  onError: function onError() {},
  onChange: function onChange() {}
};