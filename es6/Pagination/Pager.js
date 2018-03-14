var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { default as Component } from '../Common/plugs/index.js';

// type State = {
//   internalCurrentPage: number,
//   internalPageSize: number,

//   quickprevIconClass: string,
//   quicknextIconClass: string,
//   showPrevMore: boolean,
//   showNextMore: boolean
// };

var Pager = function (_Component) {
  _inherits(Pager, _Component);

  // state: State;

  function Pager(props, context) {
    _classCallCheck(this, Pager);

    var _this = _possibleConstructorReturn(this, (Pager.__proto__ || Object.getPrototypeOf(Pager)).call(this, props, context));

    _this.state = {
      internalCurrentPage: 1,
      internalPageSize: 0,

      quickprevIconClass: 'ishow-icon-more',
      quicknextIconClass: 'ishow-icon-more',
      showPrevMore: false,
      showNextMore: false
    };
    return _this;
  }

  _createClass(Pager, [{
    key: 'onPagerClick',
    value: function onPagerClick(e) {
      var target = e.target;
      if (target instanceof HTMLElement) {
        if (target.tagName === 'UL') {
          return;
        }
        var newPage = Number(target.textContent);
        var pageCount = this.props.pageCount;
        var currentPage = this.props.currentPage;

        if (target.className.indexOf('more') !== -1) {
          if (target.className.indexOf('quickprev') !== -1) {
            newPage = currentPage - 5;
          } else if (target.className.indexOf('quicknext') !== -1) {
            newPage = currentPage + 5;
          }
        }
        /* istanbul ignore if */
        if (!isNaN(newPage)) {
          if (newPage < 1) {
            newPage = 1;
          }
          if (newPage > pageCount) {
            newPage = pageCount;
          }
        }

        if (newPage !== currentPage) {
          this.props.onChange(newPage);
        }
      }
    }
  }, {
    key: 'getPages',
    value: function getPages() {
      var pagerCount = 7;
      var currentPage = Number(this.props.currentPage);
      var pageCount = Number(this.props.pageCount);

      var showPrevMore = false;
      var showNextMore = false;

      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - 2) {
          showPrevMore = true;
        }
        if (currentPage < pageCount - 2) {
          showNextMore = true;
        }
      }

      var array = [];

      if (showPrevMore && !showNextMore) {
        var startPage = pageCount - (pagerCount - 2);
        for (var i = startPage; i < pageCount; i++) {
          array.push(i);
        }
      } else if (!showPrevMore && showNextMore) {
        for (var _i = 2; _i < pagerCount; _i++) {
          array.push(_i);
        }
      } else if (showPrevMore && showNextMore) {
        var offset = Math.floor(pagerCount / 2) - 1;
        for (var _i2 = currentPage - offset; _i2 <= currentPage + offset; _i2++) {
          array.push(_i2);
        }
      } else {
        for (var _i3 = 2; _i3 < pageCount; _i3++) {
          array.push(_i3);
        }
      }
      // this.setState({
      //   showNextMore:showNextMore,
      //   showPrevMore:showPrevMore,
      //   quickprevIconClass:showPrevMore?this.state.quicknextIconClass:'ishow-icon-more',
      //   quicknextIconClass:showNextMore?this.state.quicknextIconClass:'ishow-icon-mpre'
      // });

      this.state.showPrevMore = showPrevMore;
      this.state.showNextMore = showNextMore;
      this.state.quickprevIconClass = showPrevMore ? this.state.quickprevIconClass : 'ishow-icon-more';
      this.state.quicknextIconClass = showNextMore ? this.state.quicknextIconClass : 'ishow-icon-more';

      return array;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var pagers = this.getPages();
      var _props = this.props,
          currentPage = _props.currentPage,
          pageCount = _props.pageCount;
      var _state = this.state,
          quickprevIconClass = _state.quickprevIconClass,
          quicknextIconClass = _state.quicknextIconClass;


      return React.createElement(
        'ul',
        { onClick: this.onPagerClick.bind(this), className: 'ishow-pager' },
        pageCount > 0 && React.createElement(
          'li',
          {
            className: this.classNames('number', { active: currentPage === 1 })
          },
          '1'
        ),
        this.state.showPrevMore && React.createElement('li', {
          className: this.classNames('ishow-icon more btn-quickprev', quickprevIconClass),
          onMouseEnter: function onMouseEnter() {
            _this2.setState({ quickprevIconClass: 'ishow-icon-d-arrow-left' });
          },
          onMouseLeave: function onMouseLeave() {
            _this2.setState({ quickprevIconClass: 'ishow-icon-more' });
          }
        }),
        pagers.map(function (pager, idx) {
          return React.createElement(
            'li',
            {
              key: idx,
              className: _this2.classNames('number', {
                active: currentPage === pager
              })
            },
            pager
          );
        }),
        this.state.showNextMore && React.createElement('li', {
          className: this.classNames('ishow-icon more btn-quicknext', quicknextIconClass),
          onMouseEnter: function onMouseEnter() {
            _this2.setState({ quicknextIconClass: 'ishow-icon-d-arrow-right' });
          },
          onMouseLeave: function onMouseLeave() {
            _this2.setState({ quicknextIconClass: 'ishow-icon-more' });
          }
        }),
        pageCount > 1 && React.createElement(
          'li',
          {
            className: this.classNames('number', {
              active: currentPage === pageCount
            })
          },
          pageCount
        )
      );
    }
  }]);

  return Pager;
}(Component);

export default Pager;


Pager.propTypes = {
  currentPage: PropTypes.number,
  pageCount: PropTypes.number
};