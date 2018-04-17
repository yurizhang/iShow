// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {default as Component} from '../Common/plugs/index.js'; 
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import local from '../Common/locale';
import '../Common/css/Table.css';
// let tableIdSeed = 1;

export default class Table extends Component {
  static contextTypes = {
    store: PropTypes.any,
    layout: PropTypes.any,
  };

  static childContextTypes = {
    table: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {};

    // this.tableId = `ishow-table_${tableIdSeed++}_`;
    // this.tableId = tableIdSeed++;

    ['syncScroll'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  get bodyWrapperHeight() {
    const { layout, height, maxHeight } = this.props;
    const style = {};

    if (height) {
      style.height = layout.bodyHeight || '';
    } else if (maxHeight) {
      if (layout.headerHeight !== null) { // 非首次渲染
        style.maxHeight = maxHeight - layout.headerHeight - layout.footerHeight
      }
    }

    return style;
  }

  get bodyWidth(){
    const { layout } = this.props;
    const { bodyWidth, scrollY, gutterWidth } = layout;
    return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) : '';
  }

  get fixedHeight() {
    const { layout } = this.props;
    return {
      bottom: layout.scrollX ? layout.gutterWidth - 1 : 0
    };
  }

  get fixedBodyHeight() {
    const { layout, ...props } = this.props;
    const style = {};

    if (props.height) {
      style.height = layout.fixedBodyHeight || '';
    } else if (props.maxHeight) {
      if (layout.headerHeight !== null) {
        style.maxHeight = props.maxHeight - layout.headerHeight - layout.footerHeight - (layout.scrollX ? layout.gutterWidth : 0);
      }
    }

    return style;
  }

  getChildContext() {
    return {
      table: this
    }
  }

  syncScroll() {
    const { headerWrapper, footerWrapper, bodyWrapper, fixedBodyWrapper, rightFixedBodyWrapper } = this;
    if (headerWrapper) {
      headerWrapper.scrollLeft = bodyWrapper.scrollLeft;
    }
    if (footerWrapper) {
      footerWrapper.scrollLeft = bodyWrapper.scrollLeft;
    }

    if (fixedBodyWrapper) {
      fixedBodyWrapper.scrollTop = bodyWrapper.scrollTop;
    }
    if (rightFixedBodyWrapper) {
      rightFixedBodyWrapper.scrollTop = bodyWrapper.scrollTop;
    }
  }

  bindRef(key) {
    return (node) => { this[key] = node; }
  }

  render() {
    const { store, layout, ...props } = this.props;
    const { isHidden } = this.state;

    return (
      <div
        style={this.style({
          height: props.height,
          maxHeight: props.maxHeight,
        })}
        className={this.className('ishow-table', {
          'ishow-table--fit': props.fit,
          'ishow-table--striped': props.stripe,
          'ishow-table--border': props.border,
          'ishow-table--hidden': isHidden,
          'ishow-table--fluid-height': props.maxHeight,
          'ishow-table--enable-row-hover': !store.isComplex,
          'ishow-table--enable-row-transition': (store.data || []).length && (store.data || []).length < 100
        })}
        ref={this.bindRef('el')}
      >
        {props.showHeader && (
          <div className="ishow-table__header-wrapper" ref={this.bindRef('headerWrapper')}>
            <TableHeader
              {...this.props}
              style={{ width: '100%' || '' ,height:'100%'}}
            />
          </div>
        )}
        <div
          style={this.bodyWrapperHeight}
          className="ishow-table__body-wrapper"
          ref={this.bindRef('bodyWrapper')}
          onScroll={this.syncScroll}
        >
          <TableBody
            {...this.props}
            style={{ width: '100%',height:'100%'}}
        />
          {(!props.data || !props.data.length) && (
            <div
              style={{ width: this.bodyWidth }}
              className="ishow-table__empty-block"
            >
              <span className="ishow-table__empty-text">{props.emptyText ? props.emptyText:local.t('ishow.table.emptyText')}</span>
            </div>
          )}
        </div>
        {props.showSummary && (
          <div
            style={{ visibility: props.data && props.data.length ? 'visible' : 'hidden' }}
            className="ishow-table__footer-wrapper"
            ref={this.bindRef('footerWrapper')}
          >
            <TableFooter
              {...this.props}
              style={{ width: layout.bodyWidth || '' }}
            />
          </div>
        )}
        {!!store.fixedColumns.length && (
          <div
            style={Object.assign({}, this.fixedHeight, {
              width: layout.fixedWidth || ''
            })}
            className="ishow-table__fixed"
            ref={this.bindRef('fixedWrapper')}
          >
            {props.showHeader && (
              <div className="ishow-table__fixed-header-wrapper" ref={this.bindRef('fixedHeaderWrapper')}>
                <TableHeader
                  fixed="left"
                  {...this.props}
                  style={{ width: layout.fixedWidth || '' ,height:'100%'}}
                />
              </div>
            )}
            <div
              style={Object.assign({}, this.fixedBodyHeight, {
                top: layout.headerHeight || 0
              })}
              className="ishow-table__fixed-body-wrapper"
              ref={this.bindRef('fixedBodyWrapper')}
            >
              <TableBody
                fixed="left"
                {...this.props}
                style={{ width: layout.fixedWidth || '',height:'100%' }}
              />
            </div>
            {props.showSummary && (
              <div className="ishow-table__fixed-footer-wrapper" ref={this.bindRef('fixedFooterWrapper')}>
                <TableFooter
                  fixed="left"
                  {...this.props}
                  style={{ width: layout.fixedWidth || '' }}
                />
              </div>
            )}
          </div>
        )}
        {!!store.rightFixedColumns.length && (
          <div
            className="ishow-table__fixed-right"
            ref={this.bindRef('rightFixedWrapper')}
            style={Object.assign({}, {
              width: layout.rightFixedWidth || '',
              right: layout.scrollY ? (props.border ? layout.gutterWidth : (layout.gutterWidth || 1)) : ''
            }, this.fixedHeight)}
          >
            {props.showHeader && (
              <div className="ishow-table__fixed-header-wrapper" ref={this.bindRef('rightFixedHeaderWrapper')}>
                <TableHeader
                  fixed="right"
                  {...this.props}
                  style={{ width: layout.rightFixedWidth || '' }}
                />
              </div>
            )}
            <div
              className="ishow-table__fixed-body-wrapper"
              ref={this.bindRef('rightFixedBodyWrapper')}
              style={Object.assign({}, {
                top: layout.headerHeight
              }, this.fixedBodyHeight)}
            >
              <TableBody
                fixed="right"
                {...this.props}
                style={{ width: layout.rightFixedWidth || '' ,height:'100%'}}
              />
            </div>
            {props.showSummary && (
              <div
                className="ishow-table__fixed-footer-wrapper"
                ref={this.bindRef('rightFixedFooterWrapper')}
                style={{ visibility: props.data && props.data.length ? 'visible' : 'hidden' }}
              >
                <TableFooter
                  fixed="right"
                  {...this.props}
                  style={{ width: layout.rightFixedWidth || '' }}
                />
              </div>
            )}
          </div>
        )}
        {!!store.rightFixedColumns.length && (
          <div
            className="ishow-table__fixed-right-patch"
            style={{ width: layout.scrollY ? layout.gutterWidth : '0', height: layout.headerHeight }}
          />
        )}
        <div className="ishow-table__column-resize-proxy" ref={this.bindRef('resizeProxy')} style={{ visibility: 'hidden' }} />
      </div>
    )
  }
}
