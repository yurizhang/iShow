import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'throttle-debounce/debounce';
import BasePicker from './BasePicker';
import TimeRangePanel from './panel/TimeRangePanel'
import '../Common/css/Date-picker.css'

export default class TimeRangePicker extends BasePicker {
  static get propTypes() {
    let result = Object.assign({}, { rangeSeparator: PropTypes.string },
      BasePicker.propTypes)
    return result;
  }

  static get defaultProps() {
    let result = Object.assign({}, BasePicker.defaultProps)
    return result;
  }

  constructor(props) {
    super(props, 'timerange', {})
    this._onSelectionChange = debounce(200, this.onSelectionChange.bind(this))
  }

  onSelectionChange(start, end) {
    this.refs.inputRoot.refs.input.setSelectionRange(start, end);
    this.refs.inputRoot.refs.input.focus();
  }

  getFormatSeparator() {
    return this.props.rangeSeparator
  }

  pickerPanel(state, props) {
    return (
      <TimeRangePanel
        {...props}
        currentDates={state.value}
        onCancel={() => this.setState({ pickerVisible: false })}
        onPicked={this.onPicked.bind(this)}
        onSelectRangeChange={this._onSelectionChange}
      />
    )
  }
}
