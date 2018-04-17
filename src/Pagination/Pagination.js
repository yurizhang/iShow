/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import {default as Component} from '../Common/plugs/index.js'; 
import Pager from './Pager';
import Select from '../Select/Select';
import Option from '../Select/Option';
import locale from '../Common/locale';
import '../Common/css/Pagination.css';
Select.Option = Option;
const Pre = props => {
  const disabled = props.internalCurrentPage <= 1 ? 'disabled' : '';
  return (
    <button type="button" className={`btn-prev ${disabled}`} onClick={props.prev}>
      <i className="ishow-icon ishow-icon-arrow-left" />
    </button>
  );
};

const Next = props => {
  const disabled = props.internalCurrentPage === props.internalPageCount ||
    props.internalPageCount === 0
    ? 'disabled'
    : '';

  return (
    <button type="button" className={`btn-next ${disabled}`} onClick={props.next}>
      <i className="ishow-icon ishow-icon-arrow-right" />
    </button>
  );
};

class Sizes extends Component {
  render() {
    const { onSizeChange, internalPageSize } = this.props;

    return (
      <span className="ishow-pagination__sizes">
        <Select
          size="small"
          value={internalPageSize}
          onChange={onSizeChange}
          width={110}
        >
          {this.props.pageSizes.map((item, idx) => {
            return (
              <Select.Option
                key={idx}
                value={item}
                label={item + ' ' + locale.t('ishow.pagination.pagesize')}
              />
            );
          })}
        </Select>
      </span>
    );
  }
}

const Total = props => {
  return typeof props.total === 'number'
    ? <span className="ishow-pagination__total">
        {locale.t('ishow.pagination.total', { total: props.total })}
      </span>
    : <span />;
};

class Jumper extends Component {
  handleChange({ target }) {
    const { jumper } = this.props;
    jumper(target.value);
  }

  handleFocus() {}

  render() {
    return (
      <span className="ishow-pagination__jump">
        {locale.t('ishow.pagination.goto')}
        <input
          className="ishow-pagination__editor"
          type="number"
          min={1}
          max={this.props.internalPageCount}
          defaultValue={this.props.internalCurrentPage}
          onBlur={this.handleChange.bind(this)}
          onKeyUp={e => {
            if (e.keyCode === 13) {
              this.handleChange(e);
            }
          }}
          onFocus={this.handleFocus.bind(this)}
          style={{ width: '30px' }}
        />
        {locale.t('ishow.pagination.pageClassifier')}
      </span>
    );
  }
}

// type State = {
//   internalPageSize: number,
//   total: number,
//   pageCount: number,
//   internalCurrentPage: number
// }

export default class Pagination extends Component {
  //state: State;

  constructor(props, context) {
    super(props, context);

    const {
      currentPage,
      pageSizes,
      pageSize,
      total,
      pageCount,
      layout
    } = this.props;
    let internalPageSize = 0;
    if (layout.split(',').indexOf('sizes') > -1 && Array.isArray(pageSizes)) {
      internalPageSize = pageSizes.indexOf(pageSize) > -1
        ? pageSize
        : pageSizes[0];
    } else {
      internalPageSize = pageSize;
    }

    this.state = {
      internalPageSize,
      total,
      pageCount,
      internalCurrentPage: currentPage
        ? this.getValidCurrentPage(currentPage)
        : 1
    };
  }

  componentWillReceiveProps(nextProps) {
    const { currentPage, pageSizes, pageSize, total, pageCount } = this.props;

    if (
      nextProps.currentPage !== currentPage ||
      nextProps.pageSizes !== pageSizes ||
      nextProps.pageSize !== pageSize ||
      nextProps.total !== total ||
      nextProps.pageCount !== pageCount
    ) {
      let internalPageSize = this.state.internalPageSize;
      if (
        nextProps.layout.split(',').indexOf('sizes') > -1 &&
        Array.isArray(nextProps.pageSizes)
      ) {
        internalPageSize = nextProps.pageSizes.indexOf(nextProps.pageSize) > -1
          ? nextProps.pageSize
          : nextProps.pageSizes[0];
      }

      this.setState(
        {
          internalPageSize: internalPageSize,
          total: nextProps.total,
          pageCount: nextProps.pageCount
        },
        () => {
          this.setState({
            internalCurrentPage: nextProps.currentPage
              ? this.getValidCurrentPage(nextProps.currentPage)
              : 1
          });
        }
      );
    }
  }

  pre() {
    const oldPage = this.state.internalCurrentPage;
    const newVal = this.state.internalCurrentPage - 1;

    this.setState(
      {
        internalCurrentPage: this.getValidCurrentPage(newVal)
      },
      () => {
        if (this.state.internalCurrentPage !== oldPage) {
          const onCurrentChange = this.props.onCurrentChange;
          onCurrentChange && onCurrentChange(this.state.internalCurrentPage);
        }
      }
    );
  }

  next() {
    const oldPage = this.state.internalCurrentPage;
    const newVal = this.state.internalCurrentPage + 1;

    this.setState(
      {
        internalCurrentPage: this.getValidCurrentPage(newVal)
      },
      () => {
        if (this.state.internalCurrentPage !== oldPage) {
          const onCurrentChange = this.props.onCurrentChange;
          onCurrentChange && onCurrentChange(this.state.internalCurrentPage);
        }
      }
    );
  }

  getValidCurrentPage(value) {
    value = parseInt(value, 10);

    let internalPageCount = this.internalPageCount();

    let resetValue;
    if (!internalPageCount) {
      if (isNaN(value) || value < 1) resetValue = 1;
    } else {
      if (value < 1) {
        resetValue = 1;
      } else if (value > internalPageCount) {
        resetValue = internalPageCount;
      }
    }

    if (resetValue === undefined && isNaN(value)) {
      resetValue = 1;
    } else if (resetValue === 0) {
      resetValue = 1;
    }

    return resetValue === undefined ? value : resetValue;
  }

  internalPageCount() {
    if (this.state) {
      if (typeof this.state.total === 'number') {
        return Math.ceil(this.state.total / this.state.internalPageSize);
      } else if (typeof this.state.pageCount === 'number') {
        return this.state.pageCount;
      }
    }

    return null;
  }

  jumperToPage(page) {
    const oldPage = this.state.internalCurrentPage;
    this.setState(
      {
        internalCurrentPage: this.getValidCurrentPage(page)
      },
      () => {
        if (oldPage !== this.state.internalCurrentPage) {
          const onCurrentChange = this.props.onCurrentChange;
          onCurrentChange && onCurrentChange(this.state.internalCurrentPage);
        }
      }
    );

    //this.oldValue = null;
  }

  handleCurrentChange(val) {
    const oldPage = this.state.internalCurrentPage;
    this.setState(
      {
        internalCurrentPage: this.getValidCurrentPage(val)
      },
      () => {
        if (oldPage !== this.state.internalCurrentPage) {
          const onCurrentChange = this.props.onCurrentChange;
          onCurrentChange && onCurrentChange(this.state.internalCurrentPage);
        }
      }
    );
  }

  onSizeChange(val) {
    if (val !== this.state.internalPageSize) {
      val = parseInt(val, 10);

      this.setState(
        {
          internalPageSize: val
        },
        () => {
          this.setState({
            internalCurrentPage: this.getValidCurrentPage(
              this.state.internalCurrentPage
            )
          });
          const { onSizeChange } = this.props;
          onSizeChange && onSizeChange(val);
        }
      );
    }
  }

  render(){
    const { internalCurrentPage, internalPageSize } = this.state;

    const className = this.classNames({
      'ishow-pagination': true,
      'ishow-pagination__rightwrapper': false,
      'ishow-pagination--small': this.props.small
    });

    const children = [];
    const layout = this.props.layout || '';

    if (!layout) return null;

    const components = layout.split(',').map(item => item.trim());
    const TEMPLATE_MAP = {
      prev: (
        <Pre
          key="pre"
          internalCurrentPage={internalCurrentPage}
          prev={this.pre.bind(this)}
        />
      ),
      jumper: (
        <Jumper
          key="jumper"
          jumper={this.jumperToPage.bind(this)}
          internalPageCount={this.internalPageCount()}
          internalCurrentPage={internalCurrentPage}
        />
      ),
      pager: (
        <Pager
          key="pager"
          currentPage={internalCurrentPage}
          pageCount={this.internalPageCount()}
          onChange={this.handleCurrentChange.bind(this)}
        />
      ),
      next: (
        <Next
          key="next"
          internalCurrentPage={internalCurrentPage}
          internalPageCount={this.internalPageCount()}
          next={this.next.bind(this)}
        />
      ),
      sizes: (
        <Sizes
          key="sizes"
          internalPageSize={internalPageSize}
          pageSizes={this.props.pageSizes}
          onSizeChange={this.onSizeChange.bind(this)}
        />
      ),
      total: <Total key="total" total={this.state.total} />
    };

    components.forEach(compo => {
      if (compo !== '->') {
        children.push(TEMPLATE_MAP[compo]);
      }
    });

    return (
      <div style={this.style()} className={this.className(className)}>
        {children}
      </div>
    );
  }
}

Pagination.propTypes = {
  pageSize: PropTypes.number,
  small: PropTypes.bool,
  total: PropTypes.number,
  pageCount: PropTypes.number,
  currentPage: PropTypes.number,
  layout: PropTypes.string,
  pageSizes: PropTypes.array,

  //Event
  onCurrentChange: PropTypes.func,
  onSizeChange: PropTypes.func
};

Pagination.defaultProps = {
  small: false,
  pageSize: 10,
  currentPage: 1,
  layout: 'prev, pager, next, jumper, ->, total',
  pageSizes: [10, 20, 30, 40, 50, 100]
};
