// MODULES
import React from 'react';
import cn from 'classnames';

// COMPONENTS
import Icon_check from '../icons/check';

// CONTEXT
import { Context } from '../../context';

// STYLES
import style from './style.module.css';

class Tokenomics extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};

    this.init = this.init.bind(this);

    // html element references
    this.ref_tokenomics = React.createRef();
    this.ref_canvas = React.createRef();
  }

  init() {
    const tokenomics = this.ref_tokenomics.current;
    const canvas = this.ref_canvas.current;

    const tokenomics_width = Number(
      getComputedStyle(tokenomics).width.replace('px', '')
    );
    const tokenomics_height = Number(
      getComputedStyle(tokenomics).height.replace('px', '')
    );

    canvas.width = tokenomics_width;
    canvas.height = tokenomics_height;

    const ctx = canvas.getContext('2d');

    ctx.lineWidth = 150;
    ctx.strokeStyle = '#ffbe98';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    const r = canvas.width / 2 - ctx.lineWidth / 2;
    ctx.arc(canvas.width / 2, canvas.height / 2, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <div ref={this.ref_tokenomics} className={cn(style['tokenomics'])}>
        <canvas
          ref={this.ref_canvas}
          className={cn(style['tokenomics-canvas'])}
        ></canvas>

        <img
          alt="panpa"
          loading="lazy"
          decoding="async"
          src="/favicon.ico"
          className={cn(style['tokenomics-img'])}
        />
      </div>
    );
  }
}

export default Tokenomics;
