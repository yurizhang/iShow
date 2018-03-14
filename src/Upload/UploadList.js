/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import {default as Component,View} from '../Common/plugs/index.js'; //提供style, classname方法
import Transition from '../Message/transition';
import Progress from '../Progress/Progress';

export default class UploadList extends Component {

  render(){
    const { onPreview, onRemove } = this.context;
    const { listType, fileList } = this.props;
    const isFinished = status => status === 'success';
    return (
      <Transition
        name="list"
      >
        <ul
          className={this.classNames({
            'ishow-upload-list': true,
            [`ishow-upload-list--${listType}`]: true
          })}
        >
          {fileList.map(file => (
            <li
              className={this.classNames({
                'ishow-upload-list__item': true,
                [`is-${file.status}`]: true
              })}
              key={file.uid}
            >
              {['picture-card', 'picture'].includes(listType) &&
              isFinished(file.status) &&
              <img
                className="ishow-upload-list__item-thumbnail"
                src={file.url}
                alt=""
              />}

              <a
                className="ishow-upload-list__item-name"
                onClick={() => onPreview(file)}
              >
                <i className="ishow-icon-document" />{file.name}
              </a>
              <label
                className="ishow-upload-list__item-status-label"
              >
                <i
                  className={this.classNames({
                    'ishow-icon-upload-success': true,
                    'ishow-icon-circle-check': listType === 'text',
                    'ishow-icon-check': ['picture-card', 'picture'].includes(
                      listType
                    )
                  })}
                />

              </label>
              <i className="ishow-icon-close" onClick={() => onRemove(file)} />
              <View
                className="ishow-upload-list__item-actions"
                show={listType === 'picture-card' && isFinished(file.status)}
              >
                <span>
                  <span
                    onClick={() => onPreview(file)}
                    className="ishow-upload-list__item-preview"
                  >
                    <i className="ishow-icon-view" />
                  </span>
                  <span
                    className="ishow-upload-list__item-delete"
                    onClick={() => onRemove(file)}
                  >
                    <i className="ishow-icon-delete2" />
                  </span>
                </span>
              </View>
              {file.status === 'uploading' &&
              <Progress
                strokeWidth={listType === 'picture-card' ? 6 : 2}
                type={listType === 'picture-card' ? 'circle' : 'line'}
                percentage={parseInt(file.percentage, 10)}
                status={
                  isFinished(file.status) && file.showProgress ? 'success' : ''
                }
              />}
            </li>
          ))}
        </ul>
      </Transition>
    );
  }
}

UploadList.contextTypes = {
  onPreview: PropTypes.func,
  onRemove: PropTypes.func
};

UploadList.propTypes = {
  listType: PropTypes.string,
  fileList: PropTypes.array
};
