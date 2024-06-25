// MODULES
import React from 'react';
import cn from 'classnames';

// CONFIG
import config from '../../config';

// CONTEXT
import { Context } from '../../context';

// STYLES
import style from './style.module.css';

class Modal extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);

    this.state = {
      modal: '',
    };

    this.on_click_button = this.on_click_button.bind(this);
    this.update = this.update.bind(this);

    this.ref_modal = React.createRef();
  }

  on_click_button(e) {
    this.setState({
      ...this.state,
      modal: 'CLOSED',
    });
  }

  update() {
    if (this.state.modal === 'OPEN') {
      return;
    }

    if (this.state.modal === 'DELETED') {
      return;
    }

    // delete modal display at the same time its closing transition ends
    const modal = this.ref_modal.current;

    if (!modal) {
      return;
    }

    const ms =
      Number(getComputedStyle(modal).transitionDuration.replace('s', '')) *
      1000;

    setTimeout(() => {
      this.setState({
        ...this.state,
        modal: 'DELETED',
      });
    }, ms);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        ...this.state,

        modal: 'OPEN',
      });
    }, this.props.countdown);
  }

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {}

  render() {
    return this.state.modal ? (
      <div
        ref={this.ref_modal}
        className={cn(
          style['modal'],
          this.state.modal === 'CLOSED' ? style['modalclosed'] : null,
          this.state.modal === 'DELETED' ? style['modaldeleted'] : null
        )}
      >
        <div
          className={cn(
            style['modal-box'],
            this.state.modal === 'CLOSED' ? style['modal-boxclosed'] : null
          )}
        >
          <div className={cn(style['modal-box-icon'])}>{this.props.icon}</div>

          <h3 className={cn(style['modal-box-title'])}>{this.props.title}</h3>

          <div
            className={cn(style['modal-box-desc'])}
            dangerouslySetInnerHTML={{ __html: this.props.desc }}
          ></div>

          <button
            onClick={(e) => this.on_click_button(e)}
            className={cn(style['modal-box-button'])}
          >
            Continue
          </button>
        </div>
      </div>
    ) : null;
  }
}

Modal.defaultProps = {
  countdown: 2000,
};

export default Modal;
