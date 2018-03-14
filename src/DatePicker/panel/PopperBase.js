import PropTypes from 'prop-types';
import {default as Component} from '../../Common/plugs/index.js'; //提供style, classname方法
import { PopperReactMixin } from '../../Common/utils';

export class PopperBase extends Component{
  static get propTypes() {
    return {
      //()=>HtmlElement
      getPopperRefElement: PropTypes.func,
      popperMixinOption: PropTypes.object
    }
  }

  constructor(props) {
    super(props)

    PopperReactMixin.call(this, () => this.refs.root, props.getPopperRefElement, Object.assign({
      boundariesPadding: 0,
      gpuAcceleration: false
    }, props.popperMixinOption));
  }
}