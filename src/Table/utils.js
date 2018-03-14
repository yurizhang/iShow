// @flow
import * as React from 'react';

const _document = (document);

let scrollBarWidth;

export function getScrollBarWidth() {
  if (scrollBarWidth !== undefined) return scrollBarWidth;
  const dom = _document.createElement('div');
  const body = _document.body || dom;

  dom.style.visibility = 'hidden';
  dom.style.width = '100px';
  dom.style.position = 'absolute';
  dom.style.top = '-9999px';
  dom.style.overflow = 'scroll';

  body.appendChild(dom);

  const totalWidth = dom.offsetWidth;
  const widthWithoutScroll = dom.clientWidth;

  body.removeChild(dom);

  return totalWidth - widthWithoutScroll;
}

export function getValueByPath(data, path) {
  if (typeof path !== 'string') return null;
  return path.split('.').reduce((pre, cur) => (pre || {})[cur], data);
}

export function getRowIdentity(row, rowKey) {
  if (typeof rowKey === 'string') {
    return getValueByPath(row, rowKey);
  } else if (typeof rowKey === 'function') {
    return rowKey(row);
  }
}

export function getLeafColumns(columns) {
  const result = [];
  columns.forEach((column) => {
    if (column.subColumns) {
      result.push(...getLeafColumns(column.subColumns));
    } else {
      result.push(column);
    }
  });
  return result;
}

function convertChildrenToColumns(children) {
  return React.Children.map(children, (child) => {
    if (child.type.typeName !== 'TableColumn') {
      console.warn(`Table component's children must be TableColumn, but received ${child.type}`);
      return {};
    }

    const column = Object.assign({}, child.props);
    if (column.children) {
      column.subColumns = convertChildrenToColumns(column.children);
      delete column.children;
    }
    return column;
  })
}

export function getColumns(props) {
  return props.children ? convertChildrenToColumns(props.children) : props.columns || [];
}

export function convertToRows(columns) {
  let maxLevel = 1;

  function traverse(column, parent) {
    if (parent) {
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    } else {
      column.level = 1;
    }

    if (column.subColumns) {
      let colSpan = 0;
      column.subColumns.forEach((subColumn) => {
        traverse(subColumn, column);
        colSpan += subColumn.colSpan;
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  }

  columns.forEach((column) => {
    traverse(column);
  });

  const rows = [];
  for (let i = 0; i < maxLevel; i++) {
    rows.push([]);
  }

  const allColumns = [];
  const queue = columns.slice();
  for (let i = 0; queue[i]; i++) {
    allColumns.push(queue[i]);
    if (queue[i].subColumns) queue.push(...queue[i].subColumns);
  }

  allColumns.forEach((column) => {
    if (!column.subColumns) {
      column.rowSpan = maxLevel - column.level + 1;
    } else {
      column.rowSpan = 1;
    }
    rows[column.level - 1].push(column);
  });
  return rows;
}