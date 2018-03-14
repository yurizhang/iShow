var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { default as Component } from '../Common/plugs/index.js'; //提供style, classname方法
import UploadList from './UploadList';
import iFrameUpload from './iFrameUpload';
import AjaxUpload from './AjaxUpload';
import '../Common/css/Upload.css';

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
        uploadList = React.createElement(UploadList, { listType: listType, fileList: fileList });
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
      var uploadComponent = typeof FormData !== 'undefined' ? React.createElement(
        AjaxUpload,
        Object.assign({ key: 'AjaxUpload' }, restProps),
        trigger
      ) : React.createElement(
        'iFrameUpload',
        Object.assign({ key: 'iFrameUpload' }, restProps),
        trigger
      );
      return React.createElement(
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
}(Component);

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
export default Upload;


Upload.childContextTypes = {
  onPreview: PropTypes.func,
  onRemove: PropTypes.func
};

Upload.propTypes = {
  action: PropTypes.string.isRequired,
  headers: PropTypes.object,
  data: PropTypes.object,
  multiple: PropTypes.bool,
  name: PropTypes.string,
  withCredentials: PropTypes.bool,
  showFileList: PropTypes.bool,
  fileList: PropTypes.array,
  autoUpload: PropTypes.bool,
  accept: PropTypes.string,
  drag: PropTypes.bool,
  listType: PropTypes.oneOf(['text', 'picture', 'picture-card']),
  tip: PropTypes.node,
  trigger: PropTypes.node,
  beforeUpload: PropTypes.func,
  onRemove: PropTypes.func,
  onPreview: PropTypes.func,
  onProgress: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onChange: PropTypes.func,
  className: PropTypes.string
};