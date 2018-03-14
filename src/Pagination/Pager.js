/* @flow */

import React from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {default as Component} from '../Common/plugs/index.js'; 

// type State = {
//   internalCurrentPage: number,
//   internalPageSize: number,

//   quickprevIconClass: string,
//   quicknextIconClass: string,
//   showPrevMore: boolean,
//   showNextMore: boolean
// };

export default class Pager extends Component {
  // state: State;

  constructor(props, context) {
    super(props, context);

    this.state = {
      internalCurrentPage: 1,
      internalPageSize: 0,

      quickprevIconClass: 'ishow-icon-more',
      quicknextIconClass: 'ishow-icon-more',
      showPrevMore: false,
      showNextMore: false
    };
  }

  onPagerClick(e) {
    const target = e.target;
    if (target instanceof HTMLElement) {
      if (target.tagName === 'UL') {
        return;
      }
      let newPage = Number(target.textContent);
      const pageCount = this.props.pageCount;
      const currentPage = this.props.currentPage;

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

  getPages() {
    const pagerCount = 7;
    const currentPage = Number(this.props.currentPage);
    const pageCount = Number(this.props.pageCount);

    let showPrevMore = false;
    let showNextMore = false;

    if (pageCount > pagerCount) {
      if (currentPage > pagerCount - 2) {
        showPrevMore = true;
      }
      if (currentPage < pageCount - 2) {
        showNextMore = true;
      }
    }

    const array = [];

    if (showPrevMore && !showNextMore) {
      const startPage = pageCount - (pagerCount - 2);
      for (let i = startPage; i < pageCount; i++) {
        array.push(i);
      }
    } else if (!showPrevMore && showNextMore) {
      for (let i = 2; i < pagerCount; i++) {
        array.push(i);
      }
    } else if (showPrevMore && showNextMore) {
      const offset = Math.floor(pagerCount / 2) - 1;
      for (let i = currentPage - offset; i <= currentPage + offset; i++) {
        array.push(i);
      }
    } else {
      for (let i = 2; i < pageCount; i++) {
        array.push(i);
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
    this.state.quickprevIconClass = showPrevMore
      ? this.state.quickprevIconClass
      : 'ishow-icon-more';
    this.state.quicknextIconClass = showNextMore
      ? this.state.quicknextIconClass
      : 'ishow-icon-more';

    return array;
  }

  render(){
    const pagers = this.getPages();
    const { currentPage, pageCount } = this.props;
    const { quickprevIconClass, quicknextIconClass } = this.state;

    return (
      <ul onClick={this.onPagerClick.bind(this)} className="ishow-pager">
        {pageCount > 0 &&
          <li
            className={this.classNames('number', { active: currentPage === 1 })}
          >
            1
          </li>}

        {this.state.showPrevMore &&
          <li
            className={this.classNames(
              'ishow-icon more btn-quickprev',
              quickprevIconClass
            )}
            onMouseEnter={() => {
              this.setState({ quickprevIconClass: 'ishow-icon-d-arrow-left' });
            }}
            onMouseLeave={() => {
              this.setState({ quickprevIconClass: 'ishow-icon-more' });
            }}
          />}

        {pagers.map((pager, idx) => {
          return (
            <li
              key={idx}
              className={this.classNames('number', {
                active: currentPage === pager
              })}
            >
              {pager}
            </li>
          );
        })}

        {this.state.showNextMore &&
          <li
            className={this.classNames(
              'ishow-icon more btn-quicknext',
              quicknextIconClass
            )}
            onMouseEnter={() => {
              this.setState({ quicknextIconClass: 'ishow-icon-d-arrow-right' });
            }}
            onMouseLeave={() => {
              this.setState({ quicknextIconClass: 'ishow-icon-more' });
            }}
          />}

        {pageCount > 1 &&
          <li
            className={this.classNames('number', {
              active: currentPage === pageCount
            })}
          >
            {pageCount}
          </li>}
      </ul>
    );
  }
}

Pager.propTypes = {
  currentPage: PropTypes.number,
  pageCount: PropTypes.number
};
